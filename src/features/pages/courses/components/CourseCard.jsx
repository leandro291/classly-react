import { useState } from 'react'
import useClickOutside from '../../../../common/hooks/useClickOutside'

export default function CourseCard({ course, color, isTeacher, onClick, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useClickOutside(() => setMenuOpen(false))

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-[#e0e0e0] overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative h-24 px-4 pt-4 pb-2" style={{ backgroundColor: color }}>
        <div className="pr-8">
          <h3
            style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
            className="text-white text-lg font-medium leading-tight line-clamp-2"
          >
            {course.name}
          </h3>
          <p className="text-white/80 text-xs mt-0.5 truncate">{course.period}</p>
        </div>

        {isTeacher && (
          <div className="absolute top-2 right-2" ref={menuRef}>
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-[#e8eaed] w-40 py-1 z-50">
                <button
                  onClick={e => { e.stopPropagation(); setMenuOpen(false); onEdit?.() }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#202124] hover:bg-[#f1f3f4] transition-colors"
                >
                  <svg width="16" height="16" fill="#5f6368" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  Editar
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setMenuOpen(false); onDelete?.() }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#c5221f] hover:bg-[#fce8e6] transition-colors"
                >
                  <svg width="16" height="16" fill="#c5221f" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}

        {course.status === 'inactive' && (
          <span className="absolute bottom-2 right-3 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
            Inactivo
          </span>
        )}
      </div>

      <div className="px-4 py-3 border-b border-[#e8eaed]">
        <p className="text-xs text-[#5f6368] truncate">
          {`${course.teacher.first_name} ${course.teacher.last_name}`.trim() || course.teacher.email}
        </p>
        {course.description && (
          <p className="text-xs text-[#80868b] truncate mt-0.5">{course.description}</p>
        )}
      </div>

      <div className="px-4 py-3 flex items-center gap-1">
        <ActionIcon title="Personas">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </ActionIcon>
        <ActionIcon title="Carpeta">
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
        </ActionIcon>
        {!isTeacher && (
          <ActionIcon title="Tareas">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </ActionIcon>
        )}
      </div>
    </div>
  )
}

function ActionIcon({ title, children }) {
  return (
    <button title={title} className="p-1.5 rounded-full hover:bg-[#f1f3f4] transition-colors">
      <svg width="18" height="18" fill="#5f6368" viewBox="0 0 24 24">{children}</svg>
    </button>
  )
}
