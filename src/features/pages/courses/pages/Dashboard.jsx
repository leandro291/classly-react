import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../../../common/components/Toast'
import useClickOutside from '../../../../common/hooks/useClickOutside'
import { courseColor } from '../utils/constants'
import { getCourses, createCourse, updateCourse, deleteCourse, joinCourse } from '../services/courseService'
import CourseCard from '../components/CourseCard'
import CourseFormModal from '../components/CourseFormModal'
import DeleteModal from '../components/DeleteModal'
import JoinCourseModal from '../components/JoinCourseModal'
import MenuOption from '../components/MenuOption'
import { TeacherEmptyState, EmptyState } from '../components/EmptyStates'
import { LoadError } from '../components/primitives'
import Icon from '../../../../common/components/Icon'
import Logo from '../../../../common/components/Logo'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const isTeacher = user.rol === 'teacher'

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [courseModal, setCourseModal] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showJoinCourse, setShowJoinCourse] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const menuRef = useClickOutside(() => setShowMenu(false))
  const userMenuRef = useClickOutside(() => setShowUserMenu(false))

  function activeCourses(data) {
    return (data || []).filter(c => c.status === 'active')
  }

  useEffect(() => {
    let active = true
    getCourses()
      .then(data => { if (active) setCourses(activeCourses(data)) })
      .catch(() => { if (active) setLoadError(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [attempt])

  function retryLoad() {
    setLoadError(false)
    setLoading(true)
    setAttempt(a => a + 1)
  }

  // Los errores de escritura suben al modal/formulario, que los muestra en línea y conserva lo escrito.
  function reloadCourses() {
    getCourses().then(data => setCourses(activeCourses(data))).catch(() => toast('No se pudo actualizar las clases', 'error'))
  }

  async function handleJoined(code) {
    await joinCourse(code)
    setShowJoinCourse(false)
    toast('Te uniste a la clase')
    reloadCourses()
  }

  async function handleSaveCourse(data) {
    if (courseModal?.type === 'create') {
      await createCourse(data)
      toast('Clase creada')
    } else if (courseModal?.type === 'edit') {
      await updateCourse(courseModal.course.id, data)
      toast('Clase actualizada')
    }
    setCourseModal(null)
    reloadCourses()
  }

  async function handleDeleteCourse(course) {
    await deleteCourse(course.id)
    setCourses(prev => prev.filter(c => c.id !== course.id))
    toast('Clase eliminada', 'info')
    setCourseModal(null)
  }

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
  const fullName = `${user.first_name} ${user.last_name}`

  function openCourse(course) {
    navigate(`/curso/${course.id}`, { state: { course } })
  }

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="bg-white shadow-sm h-16 flex items-center px-4 gap-4 sticky top-0 z-30">

        <div className="flex items-center gap-2 mr-4">
          <Logo />
          <span className="font-display text-xl font-medium text-ink hidden sm:block">
            Classly
          </span>
        </div>

        <div className="flex-1" />

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowMenu(v => !v)}
            className="p-2 pointer-coarse:p-3 rounded-full hover:bg-canvas transition-colors"
            title="Agregar"
            aria-label="Agregar"
            aria-haspopup="menu"
            aria-expanded={showMenu}
          >
            <Icon name="add" size={22} className="text-ink-muted" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-hairline w-52 py-1 z-50">
              {isTeacher ? (
                <MenuOption
                  icon="school"
                  label="Crear clase"
                  onClick={() => { setCourseModal({ type: 'create' }); setShowMenu(false) }}
                />
              ) : (
                <MenuOption
                  icon="login"
                  label="Unirse a clase"
                  onClick={() => { setShowJoinCourse(true); setShowMenu(false) }}
                />
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setShowUserMenu(v => !v)}
            aria-label="Cuenta"
            aria-haspopup="menu"
            aria-expanded={showUserMenu}
            className="w-9 h-9 pointer-coarse:w-11 pointer-coarse:h-11 rounded-full bg-brand text-white text-sm font-medium flex items-center justify-center hover:ring-2 hover:ring-brand/30 transition-all"
          >
            {initials}
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-hairline w-56 sm:w-64 py-2 z-50">
              <div className="px-4 py-3 border-b border-hairline">
                <p className="text-sm font-medium text-ink">{fullName}</p>
                <p className="text-xs text-ink-muted">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-brand-tint text-brand-dark font-medium">
                  {isTeacher ? 'Profesor' : 'Estudiante'}
                </span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-canvas transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div role="status" className="flex items-center justify-center py-24 text-sm text-ink-muted">Cargando clases…</div>
        ) : loadError ? (
          <div className="flex justify-center py-24"><LoadError message="No se pudieron cargar tus clases." onRetry={retryLoad} /></div>
        ) : courses.length === 0 ? (
          isTeacher
            ? <TeacherEmptyState onCreate={() => setCourseModal({ type: 'create' })} />
            : <EmptyState onJoin={handleJoined} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                color={courseColor(course)}
                isTeacher={isTeacher}
                onClick={() => openCourse(course)}
                onEdit={isTeacher ? () => setCourseModal({ type: 'edit', course }) : undefined}
                onDelete={isTeacher ? () => setCourseModal({ type: 'delete', course }) : undefined}
              />
            ))}
          </div>
        )}
      </main>

      {showJoinCourse && (
        <JoinCourseModal onClose={() => setShowJoinCourse(false)} onJoined={handleJoined} />
      )}

      {(courseModal?.type === 'create' || courseModal?.type === 'edit') && (
        <CourseFormModal
          course={courseModal.type === 'edit' ? courseModal.course : undefined}
          onSave={handleSaveCourse}
          onClose={() => setCourseModal(null)}
        />
      )}

      {courseModal?.type === 'delete' && (
        <DeleteModal
          title="¿Eliminar clase?"
          onConfirm={() => handleDeleteCourse(courseModal.course)}
          onClose={() => setCourseModal(null)}
        >
          Se eliminará <strong>"{courseModal.course.name}"</strong> junto con todo su material y tareas. Esta acción no se puede deshacer.
        </DeleteModal>
      )}
    </div>
  )
}
