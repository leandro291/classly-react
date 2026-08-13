import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useToast } from '../../../../common/components/Toast'
import useClickOutside from '../../../../common/hooks/useClickOutside'
import { CARD_COLORS } from '../utils/constants'
import { getCourses, createCourse, updateCourse, deleteCourse, joinCourse } from '../services/courseService'
import CourseCard from '../components/CourseCard'
import CourseFormModal from '../components/CourseFormModal'
import DeleteCourseModal from '../components/DeleteCourseModal'
import JoinCourseModal from '../components/JoinCourseModal'
import MenuOption from '../components/MenuOption'
import { TeacherEmptyState, EmptyState } from '../components/EmptyStates'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const isTeacher = user.rol === 'teacher'

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
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
      .catch(() => toast('Error al cargar las clases', 'error'))
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [toast])

  async function handleJoined(code) {
    setShowJoinCourse(false)
    try {
      await joinCourse(code)
      const data = await getCourses()
      setCourses(activeCourses(data))
      toast('Te uniste a la clase')
    } catch {
      toast('Código inválido o ya estás inscrito en este curso.', 'error')
    }
  }

  async function handleSaveCourse(data) {
    try {
      if (courseModal?.type === 'create') {
        await createCourse(data)
        toast('Clase creada')
      } else if (courseModal?.type === 'edit') {
        await updateCourse(courseModal.course.id, data)
        toast('Clase actualizada')
      }
      const coursesData = await getCourses()
      setCourses(activeCourses(coursesData))
    } catch {
      toast('No se pudo guardar la clase', 'error')
    }
    setCourseModal(null)
  }

  async function handleDeleteCourse(course) {
    try {
      await deleteCourse(course.id)
      setCourses(prev => prev.filter(c => c.id !== course.id))
      toast('Clase eliminada', 'info')
    } catch {
      toast('No se pudo eliminar la clase', 'error')
    }
    setCourseModal(null)
  }

  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
  const fullName = `${user.first_name} ${user.last_name}`

  function openCourse(course, i) {
    const color = CARD_COLORS[i % CARD_COLORS.length]
    navigate(`/curso/${course.id}`, { state: { course, color } })
  }

  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      <header className="bg-white shadow-sm h-16 flex items-center px-4 gap-4 sticky top-0 z-30">

        <div className="flex items-center gap-2 mr-4">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#1a73e8"/>
            <path d="M10 28V14l10-6 10 6v14l-10 4-10-4z" fill="white" opacity="0.9"/>
            <rect x="15" y="19" width="10" height="9" fill="#1a73e8"/>
            <rect x="17" y="14" width="6" height="5" rx="1" fill="white"/>
          </svg>
          <span style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-medium text-[#202124] hidden sm:block">
            Classly
          </span>
        </div>

        <div className="flex-1" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(v => !v)}
            className="p-2 rounded-full hover:bg-[#f1f3f4] transition-colors"
            title="Agregar"
          >
            <svg width="22" height="22" fill="#5f6368" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-[#e8eaed] w-52 py-1 z-50">
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
            onClick={() => setShowUserMenu(v => !v)}
            className="w-9 h-9 rounded-full bg-[#1a73e8] text-white text-sm font-medium flex items-center justify-center hover:ring-2 hover:ring-[#1a73e8]/30 transition-all"
          >
            {initials}
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-[#e8eaed] w-56 sm:w-64 py-2 z-50">
              <div className="px-4 py-3 border-b border-[#e8eaed]">
                <p className="text-sm font-medium text-[#202124]">{fullName}</p>
                <p className="text-xs text-[#5f6368]">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-[#e8f0fe] text-[#1a73e8] font-medium">
                  {isTeacher ? 'Profesor' : 'Estudiante'}
                </span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2.5 text-sm text-[#202124] hover:bg-[#f1f3f4] transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-sm text-[#5f6368]">Cargando clases…</div>
        ) : courses.length === 0 ? (
          isTeacher
            ? <TeacherEmptyState onCreate={() => setCourseModal({ type: 'create' })} />
            : <EmptyState onJoin={handleJoined} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                color={CARD_COLORS[i % CARD_COLORS.length]}
                isTeacher={isTeacher}
                onClick={() => openCourse(course, i)}
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
        <DeleteCourseModal
          course={courseModal.course}
          onConfirm={() => handleDeleteCourse(courseModal.course)}
          onClose={() => setCourseModal(null)}
        />
      )}
    </div>
  )
}
