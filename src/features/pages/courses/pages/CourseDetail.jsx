import { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../../../common/components/Toast'
import { courseColor } from '../utils/constants'
import {
  getCourses,
  getMaterials, createMaterial, updateMaterial, deleteMaterial,
  getTareas, createTarea, updateTarea, deleteTarea,
  getEntregas, createEntrega, updateEntrega, deleteEntrega, gradeEntrega,
} from '../services/courseService'
import NavBar from '../components/NavBar'
import StreamTab from '../components/StreamTab'
import MaterialsTab from '../components/MaterialsTab'
import TasksTab from '../components/TasksTab'
import MaterialPage from '../components/MaterialPage'
import TaskPage from '../components/TaskPage'
import { LoadError } from '../components/primitives'
import GradeModal from '../components/GradeModal'
import MaterialFormModal from '../components/MaterialFormModal'
import TaskFormModal from '../components/TaskFormModal'
import DeleteModal from '../components/DeleteModal'
import EditEntregaModal from '../components/EditEntregaModal'
import Button from '../../../../common/components/Button'

function normalizeEntrega(e) {
  const st = e.student
  const student_name = typeof st === 'string'
    ? st
    : typeof st === 'object' && st
      ? `${st.first_name ?? ''} ${st.last_name ?? ''}`.trim() || st.username
      : `Estudiante #${st}`
  return {
    ...e,
    files: (e.archivos ?? []).map(a => a.file),
    student_name,
  }
}

// La clase viaja en location.state desde el panel; si se abre por URL (recarga, enlace) se busca en la API.
export default function CourseDetail() {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [course, setCourse] = useState(() => (state?.course?.id === Number(id) ? state.course : null))
  const [status, setStatus] = useState(course ? 'ready' : 'loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (course) return
    let active = true
    getCourses()
      .then(list => {
        if (!active) return
        const found = (list || []).find(c => c.id === Number(id) && c.status === 'active')
        if (found) setCourse(found)
        else setStatus('missing')
      })
      .catch(() => { if (active) setStatus('error') })
    return () => { active = false }
  }, [id, course, attempt])

  if (course) return <CourseView key={course.id} course={course} />
  return (
    <div className="min-h-dvh bg-canvas">
      <NavBar onBack={() => navigate('/')} />
      <main className="max-w-md mx-auto px-4 py-24 flex justify-center text-center">
        {status === 'loading' && <p role="status" className="text-sm text-ink-muted">Cargando la clase…</p>}
        {status === 'error' && <LoadError message="No se pudo cargar la clase." onRetry={() => { setStatus('loading'); setAttempt(a => a + 1) }} />}
        {status === 'missing' && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-ink-muted">Esta clase no existe o ya no tienes acceso.</p>
            <Button variant="text" size="sm" onClick={() => navigate('/', { replace: true })}>Volver a mis clases</Button>
          </div>
        )}
      </main>
    </div>
  )
}

const TAB_PATH = { stream: '', materials: 'material', tasks: 'tareas' }

function CourseView({ course }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { '*': rest } = useParams()
  const { toast } = useToast()
  const { user: currentUser } = useAuth()

  // Ruta bajo /curso/:id → '' | 'material' | 'tareas' | 'material/:id' | 'tarea/:id'
  const [section, itemId] = (rest || '').split('/')
  const tab = section === 'material' ? 'materials' : section === 'tareas' ? 'tasks' : 'stream'
  const view = itemId && (section === 'tarea' || section === 'material') ? { type: section === 'tarea' ? 'task' : 'material', id: Number(itemId) } : { type: 'course' }
  const base = `/curso/${course.id}`
  const go = (sub, opts) => navigate(sub ? `${base}/${sub}` : base, opts)
  const openTab = key => go(TAB_PATH[key], { replace: true })
  // Atrás real si hubo navegación dentro de la app; si entró por enlace, a la lista de su sección
  const leave = () => (location.key !== 'default' ? navigate(-1) : go(section === 'tarea' ? 'tareas' : 'material', { replace: true }))

  const [modal, setModal] = useState(null)
  const [materials, setMaterials] = useState([])
  const [tareas, setTareas] = useState([])
  const [entregasByTarea, setEntregasByTarea] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const color = courseColor(course)
  const isTeacher = currentUser?.rol === 'teacher'

  const loadEntregas = useCallback(async (tareaId) => {
    try {
      const data = await getEntregas(tareaId)
      setEntregasByTarea(prev => ({ ...prev, [tareaId]: (data || []).map(normalizeEntrega) }))
    } catch {
      // null = falló la carga; distinto de [] (sin entregas) para no mostrar el formulario por error
      setEntregasByTarea(prev => ({ ...prev, [tareaId]: null }))
    }
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([getMaterials(course.id), getTareas(course.id)])
      .then(([mats, tasks]) => {
        if (!active) return
        setMaterials(mats || [])
        setTareas(tasks || [])
        setEntregasByTarea({})
        ;(tasks || []).forEach(t => loadEntregas(t.id))
      })
      .catch(() => { if (active) setLoadError(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [course.id, loadEntregas, attempt])

  function retryLoad() {
    setLoadError(false)
    setLoading(true)
    setAttempt(a => a + 1)
  }

  // Los handlers de modal dejan propagar el error: el modal lo muestra en línea y sigue abierto con lo escrito.
  // Cierran el modal solo cuando la escritura salió bien; el refresco posterior falla aparte, con toast.
  const refreshFailed = () => toast('No se pudo actualizar la lista', 'error')

  async function handleSaveMaterial(data) {
    if (modal?.type === 'create-material') {
      await createMaterial(course.id, data)
      toast('Material publicado')
    } else if (modal?.type === 'edit-material') {
      await updateMaterial(modal.item.id, data)
      toast('Material actualizado')
    }
    setModal(null)
    getMaterials(course.id).then(m => setMaterials(m || [])).catch(refreshFailed)
  }

  async function handleDeleteMaterial(item) {
    await deleteMaterial(item.id)
    setMaterials(prev => prev.filter(m => m.id !== item.id))
    toast('Material eliminado', 'info')
    setModal(null)
  }

  async function handleSaveTask(data) {
    if (modal?.type === 'create-task') {
      await createTarea(course.id, data)
      toast('Tarea publicada')
    } else if (modal?.type === 'edit-task') {
      await updateTarea(modal.item.id, data)
      toast('Tarea actualizada')
    }
    setModal(null)
    getTareas(course.id).then(tasks => {
      setTareas(tasks || [])
      const ids = (tasks || []).map(t => t.id)
      setEntregasByTarea(prev => Object.fromEntries(ids.map(id => [id, prev[id]])))
      ids.forEach(id => loadEntregas(id))
    }).catch(refreshFailed)
  }

  async function handleDeleteTask(item) {
    await deleteTarea(item.id)
    setTareas(prev => prev.filter(t => t.id !== item.id))
    setEntregasByTarea(prev => {
      const next = { ...prev }
      delete next[item.id]
      return next
    })
    toast('Tarea eliminada', 'info')
    setModal(null)
  }

  async function handleGrade(entregaId, tareaId, score, teacher_comment) {
    await gradeEntrega(entregaId, { score, teacher_comment })
    toast('Nota guardada')
    setModal(null)
    await loadEntregas(tareaId)
  }

  async function handleEditEntrega(tareaId, student_comment, files) {
    const my = entregasByTarea[tareaId]?.[0]
    await updateEntrega(my.id, { student_comment, files })
    toast('Entrega actualizada')
    setModal(null)
    await loadEntregas(tareaId)
  }

  async function handleDeleteEntrega(tareaId) {
    const my = entregasByTarea[tareaId]?.[0]
    await deleteEntrega(my.id)
    toast('Entrega retirada', 'info')
    setModal(null)
    await loadEntregas(tareaId)
  }

  // El error sube a TaskPage, que lo muestra junto al formulario. Tras entregar se queda en la tarea y ve su entrega.
  async function handleEntregar(tarea, student_comment, files) {
    await createEntrega(tarea.id, { student_comment, files })
    toast('Tarea entregada')
    await loadEntregas(tarea.id)
  }

  if (view.type === 'material') {
    const live = materials.find(m => m.id === view.id)
    if (!live) return <ItemShell loading={loading} message={loadError ? 'No se pudo cargar la clase.' : 'Este material ya no existe.'} onBack={leave} />
    return (
      <div className="page-enter">
        <MaterialPage
          material={live} course={course} color={color}
          onBack={leave}
        />
      </div>
    )
  }

  if (view.type === 'task') {
    const live = tareas.find(t => t.id === view.id)
    if (!live) return <ItemShell loading={loading} message={loadError ? 'No se pudo cargar la clase.' : 'Esta tarea ya no existe.'} onBack={leave} />
    const list = entregasByTarea[live.id]
    const taskEntregas = list ?? []
    const entregasStatus = list === undefined ? 'loading' : list === null ? 'error' : 'ready'
    const myEntrega = isTeacher ? undefined : taskEntregas[0]
    return (
      <div className="page-enter">
      <TaskPage
        tarea={live} course={course} color={color} isTeacher={isTeacher}
        entrega={myEntrega}
        studentEntregas={taskEntregas}
        entregasStatus={entregasStatus}
        onRetry={() => loadEntregas(live.id)}
        onBack={leave}
        onSubmit={(student_comment, files) => handleEntregar(live, student_comment, files)}
        onGrade={(e) => setModal({ type: 'grade', entrega: e, maxScore: live.max_score })}
        onEditEntrega={() => myEntrega && setModal({ type: 'edit-entrega', entrega: myEntrega, tareaId: live.id })}
        onDeleteEntrega={() => setModal({ type: 'delete-entrega', tareaId: live.id })}
      >
        {modal?.type === 'grade' && (
          <GradeModal
            entrega={modal.entrega} maxScore={modal.maxScore}
            onSave={(score, teacher_comment) => handleGrade(modal.entrega.id, live.id, score, teacher_comment)}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === 'edit-entrega' && (
          <EditEntregaModal
            entrega={modal.entrega}
            onSave={(student_comment, files) => handleEditEntrega(modal.tareaId, student_comment, files)}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === 'delete-entrega' && (
          <DeleteModal
            title="¿Retirar entrega?" confirmLabel="Retirar"
            onConfirm={() => handleDeleteEntrega(modal.tareaId)}
            onClose={() => setModal(null)}
          >
            Tu entrega será eliminada. Podrás volver a entregar si la tarea no ha vencido.
          </DeleteModal>
        )}
      </TaskPage>
      </div>
    )
  }

  const teacherName = `${course.teacher.first_name} ${course.teacher.last_name}`.trim()
  const myEntregas = isTeacher
    ? []
    : Object.entries(entregasByTarea).flatMap(([tareaId, list]) =>
        (list ?? []).map(e => ({ ...e, tareaId: Number(tareaId) }))
      )

  return (
    <div className="min-h-dvh bg-canvas">
      <NavBar onBack={() => navigate('/')} />

      <div className="relative h-36 sm:h-52 px-4 sm:px-8 flex flex-col justify-end pb-4 sm:pb-6" style={{ backgroundColor: color }}>
        <h1 className="font-display text-white text-xl sm:text-3xl font-medium mb-1 leading-tight text-balance [overflow-wrap:anywhere]">{course.name}</h1>
        <p className="text-white text-xs sm:text-sm [overflow-wrap:anywhere]">{teacherName} · {course.period}</p>
        {course.description && <p className="text-white text-xs sm:text-sm mt-0.5 line-clamp-1 [overflow-wrap:anywhere]">{course.description}</p>}
      </div>

      <div className="bg-white border-b border-hairline sticky top-16 z-20">
        <div className="max-w-4xl mx-auto flex overflow-x-auto scrollbar-none">
          {[
            { key: 'stream', label: 'Novedades' },
            { key: 'materials', label: 'Material' },
            { key: 'tasks', label: 'Tareas' },
          ].map(t => (
            <button
              key={t.key}
              type="button"
              aria-current={tab === t.key ? 'page' : undefined}
              onClick={() => openTab(t.key)}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink hover:bg-canvas'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div role="status" className="flex items-center justify-center py-24 text-sm text-ink-muted">Cargando…</div>
        ) : loadError ? (
          <div className="flex justify-center py-24"><LoadError message="No se pudo cargar la clase." onRetry={retryLoad} /></div>
        ) : (
          <>
            {tab === 'stream' && (
              <StreamTab
                course={course} color={color} materials={materials} tareas={tareas} isTeacher={isTeacher}
                onGoMaterials={() => openTab('materials')}
                onGoTasks={() => openTab('tasks')}
                onOpenMaterial={m => go(`material/${m.id}`)}
                onOpenTarea={t => go(`tarea/${t.id}`)}
              />
            )}
            {tab === 'materials' && (
              <MaterialsTab
                materials={materials} isTeacher={isTeacher}
                onOpen={m => go(`material/${m.id}`)}
                onEdit={m => setModal({ type: 'edit-material', item: m })}
                onDelete={m => setModal({ type: 'delete-material', item: m })}
                onCreate={() => setModal({ type: 'create-material' })}
              />
            )}
            {tab === 'tasks' && (
              <TasksTab
                tareas={tareas} entregas={myEntregas} studentEntregas={entregasByTarea} isTeacher={isTeacher}
                onOpen={t => go(`tarea/${t.id}`)}
                onEdit={t => setModal({ type: 'edit-task', item: t })}
                onDelete={t => setModal({ type: 'delete-task', item: t })}
                onCreate={() => setModal({ type: 'create-task' })}
              />
            )}
          </>
        )}
      </main>

      {modal?.type === 'create-material' && <MaterialFormModal onSave={handleSaveMaterial} onClose={() => setModal(null)} />}
      {modal?.type === 'edit-material' && <MaterialFormModal item={modal.item} onSave={handleSaveMaterial} onClose={() => setModal(null)} />}
      {modal?.type === 'create-task' && <TaskFormModal onSave={handleSaveTask} onClose={() => setModal(null)} />}
      {modal?.type === 'edit-task' && <TaskFormModal item={modal.item} onSave={handleSaveTask} onClose={() => setModal(null)} />}
      {modal?.type === 'delete-material' && <DeleteModal title={`¿Eliminar "${modal.item.title}"?`} onConfirm={() => handleDeleteMaterial(modal.item)} onClose={() => setModal(null)}>Esta acción no se puede deshacer.</DeleteModal>}
      {modal?.type === 'delete-task' && <DeleteModal title={`¿Eliminar "${modal.item.title}"?`} onConfirm={() => handleDeleteTask(modal.item)} onClose={() => setModal(null)}>Se eliminarán también las entregas y notas de esta tarea. Esta acción no se puede deshacer.</DeleteModal>}
    </div>
  )
}

function ItemShell({ loading, message, onBack }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <NavBar onBack={onBack} />
      <main className="max-w-md mx-auto px-4 py-24 text-center">
        {loading
          ? <p role="status" className="text-sm text-ink-muted">Cargando…</p>
          : <p className="text-sm text-ink-muted">{message}</p>}
      </main>
    </div>
  )
}
