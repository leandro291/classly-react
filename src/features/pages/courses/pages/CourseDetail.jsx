import { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../../../common/components/Toast'
import {
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
import GradeModal from '../components/GradeModal'
import MaterialFormModal from '../components/MaterialFormModal'
import TaskFormModal from '../components/TaskFormModal'
import DeleteModal from '../components/DeleteModal'
import EditEntregaModal from '../components/EditEntregaModal'
import DeleteEntregaModal from '../components/DeleteEntregaModal'

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

export default function CourseDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user: currentUser } = useAuth()

  const [view, setView] = useState({ type: 'course' })
  const [tab, setTab] = useState('stream')
  const [modal, setModal] = useState(null)
  const [materials, setMaterials] = useState([])
  const [tareas, setTareas] = useState([])
  const [entregasByTarea, setEntregasByTarea] = useState({})
  const [loading, setLoading] = useState(true)

  const course = state?.course
  const color = state?.color
  const isTeacher = currentUser?.rol === 'teacher'

  const loadEntregas = useCallback(async (tareaId) => {
    try {
      const data = await getEntregas(tareaId)
      setEntregasByTarea(prev => ({ ...prev, [tareaId]: (data || []).map(normalizeEntrega) }))
    } catch {
      setEntregasByTarea(prev => ({ ...prev, [tareaId]: [] }))
    }
  }, [])

  useEffect(() => {
    if (!course) return
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
      .catch(() => toast('Error al cargar el curso', 'error'))
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [course, loadEntregas, toast])

  if (!course) {
    return <Navigate to="/" replace />
  }

  async function handleSaveMaterial(data) {
    try {
      if (modal?.type === 'create-material') {
        await createMaterial(course.id, data)
        toast('Material publicado')
      } else if (modal?.type === 'edit-material') {
        await updateMaterial(modal.item.id, data)
        toast('Material actualizado')
      }
      setMaterials(await getMaterials(course.id))
    } catch {
      toast('No se pudo guardar el material', 'error')
    }
    setModal(null)
  }

  async function handleDeleteMaterial(item) {
    try {
      await deleteMaterial(item.id)
      setMaterials(prev => prev.filter(m => m.id !== item.id))
      toast('Material eliminado', 'info')
      if (view.type === 'material' && view.item.id === item.id) setView({ type: 'course' })
    } catch {
      toast('No se pudo eliminar el material', 'error')
    }
    setModal(null)
  }

  async function handleSaveTask(data) {
    try {
      if (modal?.type === 'create-task') {
        await createTarea(course.id, data)
        toast('Tarea publicada')
      } else if (modal?.type === 'edit-task') {
        await updateTarea(modal.item.id, data)
        toast('Tarea actualizada')
      }
      const tasks = await getTareas(course.id)
      setTareas(tasks || [])
      const ids = (tasks || []).map(t => t.id)
      setEntregasByTarea(prev => Object.fromEntries(ids.map(id => [id, prev[id] ?? []])))
      ids.forEach(id => loadEntregas(id))
    } catch {
      toast('No se pudo guardar la tarea', 'error')
    }
    setModal(null)
  }

  async function handleDeleteTask(item) {
    try {
      await deleteTarea(item.id)
      setTareas(prev => prev.filter(t => t.id !== item.id))
      setEntregasByTarea(prev => {
        const next = { ...prev }
        delete next[item.id]
        return next
      })
      toast('Tarea eliminada', 'info')
      if (view.type === 'task' && view.item.id === item.id) setView({ type: 'course' })
    } catch {
      toast('No se pudo eliminar la tarea', 'error')
    }
    setModal(null)
  }

  async function handleGrade(entregaId, tareaId, score, teacher_comment) {
    try {
      await gradeEntrega(entregaId, { score, teacher_comment })
      toast('Nota guardada')
      await loadEntregas(tareaId)
    } catch {
      toast('No se pudo guardar la nota', 'error')
    }
    setModal(null)
  }

  async function handleEditEntrega(tareaId, student_comment, files) {
    const my = (entregasByTarea[tareaId] ?? [])[0]
    try {
      await updateEntrega(my.id, { student_comment, files })
      toast('Entrega actualizada')
      await loadEntregas(tareaId)
    } catch {
      toast('No se pudo actualizar la entrega', 'error')
    }
    setModal(null)
  }

  async function handleDeleteEntrega(tareaId) {
    const my = (entregasByTarea[tareaId] ?? [])[0]
    try {
      await deleteEntrega(my.id)
      toast('Entrega retirada', 'info')
      await loadEntregas(tareaId)
    } catch {
      toast('No se pudo retirar la entrega', 'error')
    }
    setModal(null)
  }

  async function handleEntregar(tarea, student_comment, files) {
    try {
      await createEntrega(tarea.id, { student_comment, files })
      toast('Tarea entregada')
      await loadEntregas(tarea.id)
      setView({ type: 'course' })
    } catch (err) {
      toast(err?.message || 'No se pudo entregar la tarea', 'error')
    }
  }

  if (view.type === 'material') {
    const live = materials.find(m => m.id === view.item.id) ?? view.item
    return (
      <div className="page-enter">
        <MaterialPage
          material={live} course={course} color={color}
          onBack={() => setView({ type: 'course' })}
        />
      </div>
    )
  }

  if (view.type === 'task') {
    const live = tareas.find(t => t.id === view.item.id) ?? view.item
    const taskEntregas = entregasByTarea[live.id] ?? []
    const myEntrega = isTeacher ? undefined : taskEntregas[0]
    return (
      <div className="page-enter">
      <TaskPage
        tarea={live} course={course} color={color} isTeacher={isTeacher}
        currentUser={currentUser}
        entrega={myEntrega}
        studentEntregas={taskEntregas}
        onBack={() => setView({ type: 'course' })}
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
          <DeleteEntregaModal
            onConfirm={() => handleDeleteEntrega(modal.tareaId)}
            onClose={() => setModal(null)}
          />
        )}
      </TaskPage>
      </div>
    )
  }

  const teacherName = `${course.teacher.first_name} ${course.teacher.last_name}`.trim()
  const myEntregas = isTeacher
    ? []
    : Object.entries(entregasByTarea).flatMap(([tareaId, list]) =>
        list.map(e => ({ ...e, tareaId: Number(tareaId) }))
      )

  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      <NavBar onBack={() => navigate('/')} />

      <div className="relative h-36 sm:h-52 px-4 sm:px-8 flex flex-col justify-end pb-4 sm:pb-6" style={{ backgroundColor: color }}>
        <h1 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-white text-xl sm:text-3xl font-medium mb-1 leading-tight">{course.name}</h1>
        <p className="text-white/80 text-xs sm:text-sm">{teacherName} · {course.period}</p>
        {course.description && <p className="text-white/70 text-xs sm:text-sm mt-0.5 line-clamp-1">{course.description}</p>}
      </div>

      <div className="bg-white border-b border-[#e8eaed] sticky top-16 z-20">
        <div className="max-w-4xl mx-auto flex overflow-x-auto scrollbar-none">
          {[
            { key: 'stream', label: 'Novedades' },
            { key: 'materials', label: 'Material' },
            { key: 'tasks', label: 'Tareas' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? 'border-[#1a73e8] text-[#1a73e8]' : 'border-transparent text-[#5f6368] hover:text-[#202124] hover:bg-[#f1f3f4]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-sm text-[#5f6368]">Cargando…</div>
        ) : (
          <>
            {tab === 'stream' && (
              <StreamTab
                course={course} color={color} materials={materials} tareas={tareas} isTeacher={isTeacher}
                onGoMaterials={() => setTab('materials')}
                onGoTasks={() => setTab('tasks')}
                onOpenMaterial={m => setView({ type: 'material', item: m })}
                onOpenTarea={t => setView({ type: 'task', item: t })}
              />
            )}
            {tab === 'materials' && (
              <MaterialsTab
                materials={materials} isTeacher={isTeacher}
                onOpen={m => setView({ type: 'material', item: m })}
                onEdit={m => setModal({ type: 'edit-material', item: m })}
                onDelete={m => setModal({ type: 'delete-material', item: m })}
                onCreate={() => setModal({ type: 'create-material' })}
              />
            )}
            {tab === 'tasks' && (
              <TasksTab
                tareas={tareas} entregas={myEntregas} studentEntregas={entregasByTarea} isTeacher={isTeacher}
                onOpen={t => setView({ type: 'task', item: t })}
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
      {modal?.type === 'delete-material' && <DeleteModal label={`¿Eliminar "${modal.item.title}"?`} onConfirm={() => handleDeleteMaterial(modal.item)} onClose={() => setModal(null)} />}
      {modal?.type === 'delete-task' && <DeleteModal label={`¿Eliminar "${modal.item.title}"?`} onConfirm={() => handleDeleteTask(modal.item)} onClose={() => setModal(null)} />}
    </div>
  )
}
