import { useState } from 'react'
import useClickOutside from '../../../../common/hooks/useClickOutside'
import Icon from '../../../../common/components/Icon'

export default function CourseCard({ course, color, isTeacher, onClick, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useClickOutside(() => setMenuOpen(false))

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-hairline overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative h-24 px-4 pt-4 pb-2" style={{ backgroundColor: color }}>
        <div className="pr-8 pointer-coarse:pr-10">
          <h3
      className="font-display text-white text-lg font-medium leading-tight">
            <button type="button" className="block text-left cursor-pointer line-clamp-2 [overflow-wrap:anywhere]">{course.name}</button>
          </h3>
          <p className="text-white text-xs mt-0.5 truncate">{course.period}</p>
        </div>

        {isTeacher && (
          <div className="absolute top-2 right-2" ref={menuRef}>
            <button
              type="button"
              aria-label={`Opciones de ${course.name}`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
              className="p-1.5 pointer-coarse:p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-hairline w-40 py-1 z-50">
                <button
                  onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit?.() }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-canvas transition-colors"
                >
                  <Icon name="edit" className="text-ink-muted" />
                  Editar
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete?.() }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger-text hover:bg-danger-tint transition-colors"
                >
                  <Icon name="trash" className="text-danger-text" />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}

        {course.status === 'inactive' && (
          <span className="absolute bottom-2 right-3 bg-black/25 text-white text-xs px-2 py-0.5 rounded-full">
            Inactivo
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <p className="text-xs text-ink-muted truncate">
          {`${course.teacher.first_name} ${course.teacher.last_name}`.trim() || course.teacher.email}
        </p>
        {course.description && (
          <p className="text-xs text-ink-muted truncate mt-0.5">{course.description}</p>
        )}
      </div>
    </div>
  )
}
