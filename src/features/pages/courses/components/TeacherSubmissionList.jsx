import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { AVATAR_COLORS, ENTREGA_STATUS } from '../utils/constants'
import Icon from '../../../../common/components/Icon'

function avatarColor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function studentDisplay(e) {
  return e.student_name ?? (typeof e.student === 'object' ? e.student?.username : e.student)
}

export default function TeacherSubmissionList({ entregas, maxScore, onGrade }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = entregas.filter(e => {
    const studentName = studentDisplay(e)?.toString() ?? ''
    const matchSearch = studentName.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'graded' ? e.score !== null && e.score !== undefined : e.score === null || e.score === undefined)
    return matchSearch && matchFilter
  })

  const gradedCount = entregas.filter(e => e.score !== null && e.score !== undefined).length

  if (entregas.length === 0) {
    return (
      <div className="text-center py-6">
        <Icon name="task" size={40} className="text-field-line mx-auto mb-2" />
        <p className="text-sm text-ink-muted">Ningún alumno ha entregado aún.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 bg-brand-tint rounded-xl px-1 py-2 text-center">
          <p className="text-lg font-bold text-brand-dark tabular-nums">{entregas.length}</p>
          <p className="text-xs text-ink-muted">Entregas</p>
        </div>
        <div className="flex-1 bg-success-tint rounded-xl px-1 py-2 text-center">
          <p className="text-lg font-bold text-success-text tabular-nums">{gradedCount}</p>
          <p className="text-xs text-ink-muted">Calificadas</p>
        </div>
        <div className="flex-1 bg-warning-tint rounded-xl px-1 py-2 text-center">
          <p className="text-lg font-bold text-warning-text tabular-nums">{entregas.length - gradedCount}</p>
          <p className="text-xs text-ink-muted">Sin calificar</p>
        </div>
      </div>

      <div className="relative">
        <svg width="15" height="15" fill="var(--color-field-border)" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar alumno..."
          aria-label="Buscar alumno"
          className="w-full pl-9 pr-3 py-2 text-xs border border-field-border rounded-lg outline-none focus:border-brand transition-colors"
        />
      </div>

      <div className="flex gap-1 bg-canvas rounded-lg p-0.5">
        {[['all', 'Todas'], ['pending', 'Sin calificar'], ['graded', 'Calificadas']].map(([key, label]) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}
            className={`flex-1 text-xs font-medium py-1 rounded-md transition-colors ${filter === key ? 'bg-white text-brand shadow-sm' : 'text-ink-muted'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-0.5">
        {filtered.length === 0 ? (
          <p className="text-xs text-ink-muted text-center py-4">{search ? `Ningún alumno coincide con "${search}".` : 'Ninguna entrega en este filtro.'}</p>
        ) : filtered.map(e => (
          <div key={e.id} className="border border-hairline rounded-xl p-3 hover:border-brand hover:bg-surface-subtle transition-colors cursor-pointer" onClick={() => onGrade(e)}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: avatarColor(studentDisplay(e)?.toString() ?? '') }}>
                {studentDisplay(e)?.toString().split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink truncate font-medium">
                  <button type="button" aria-label={`${e.score !== null && e.score !== undefined ? 'Editar nota de' : 'Calificar a'} ${studentDisplay(e)}`} className="block w-full text-left truncate cursor-pointer">{studentDisplay(e)}</button>
                </p>
                <p className="text-xs text-ink-muted">{formatDate(e.submitted_at)}</p>
              </div>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full shrink-0 ${(ENTREGA_STATUS[e.status] ?? ENTREGA_STATUS.a_tiempo).chip}`}>
                {(ENTREGA_STATUS[e.status] ?? ENTREGA_STATUS.a_tiempo).label}
              </span>
            </div>
            <div className="flex items-center justify-between pl-10">
              {e.score !== null && e.score !== undefined
                ? <span className="text-sm font-bold text-brand tabular-nums">{e.score}<span className="text-xs font-normal text-ink-muted">/{maxScore}</span></span>
                : <span className="text-xs text-warning-text font-medium">Sin calificar</span>
              }
              <span className="text-xs text-brand">
                {e.score !== null && e.score !== undefined ? 'Editar →' : 'Calificar →'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
