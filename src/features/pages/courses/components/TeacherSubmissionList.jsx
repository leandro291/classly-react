import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { AVATAR_COLORS } from '../utils/constants'

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
        <svg width="40" height="40" fill="#dadce0" viewBox="0 0 24 24" className="mx-auto mb-2"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <p className="text-sm text-[#5f6368]">Ningún alumno ha entregado aún.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 bg-[#e8f0fe] rounded-xl px-3 py-2 text-center">
          <p className="text-lg font-bold text-[#1a73e8]">{entregas.length}</p>
          <p className="text-[10px] text-[#5f6368]">Entregas</p>
        </div>
        <div className="flex-1 bg-[#e6f4ea] rounded-xl px-3 py-2 text-center">
          <p className="text-lg font-bold text-[#1e8e3e]">{gradedCount}</p>
          <p className="text-[10px] text-[#5f6368]">Calificadas</p>
        </div>
        <div className="flex-1 bg-[#fef7e0] rounded-xl px-3 py-2 text-center">
          <p className="text-lg font-bold text-[#b06000]">{entregas.length - gradedCount}</p>
          <p className="text-[10px] text-[#5f6368]">Pendientes</p>
        </div>
      </div>

      <div className="relative">
        <svg width="15" height="15" fill="#80868b" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar alumno..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-[#dadce0] rounded-lg outline-none focus:border-[#1a73e8] transition-colors"
        />
      </div>

      <div className="flex gap-1 bg-[#f1f3f4] rounded-lg p-0.5">
        {[['all', 'Todos'], ['pending', 'Pendientes'], ['graded', 'Calificadas']].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`flex-1 text-[11px] font-medium py-1 rounded-md transition-all ${filter === key ? 'bg-white text-[#1a73e8] shadow-sm' : 'text-[#5f6368]'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-0.5">
        {filtered.length === 0 ? (
          <p className="text-xs text-[#5f6368] text-center py-4">Sin resultados</p>
        ) : filtered.map(e => (
          <div key={e.id} className="border border-[#e8eaed] rounded-xl p-3 hover:border-[#1a73e8] hover:bg-[#fafbff] transition-all cursor-pointer" onClick={() => onGrade(e)}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: avatarColor(studentDisplay(e)?.toString() ?? '') }}>
                {studentDisplay(e)?.toString().split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#202124] truncate font-medium">{studentDisplay(e)}</p>
                <p className="text-[11px] text-[#80868b]">{formatDate(e.submitted_at)}</p>
              </div>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${e.status === 'a_tiempo' ? 'bg-[#e6f4ea] text-[#1e8e3e]' : 'bg-[#fce8e6] text-[#c5221f]'}`}>
                {e.status === 'a_tiempo' ? 'A tiempo' : 'Tardía'}
              </span>
            </div>
            <div className="flex items-center justify-between pl-10">
              {e.score !== null && e.score !== undefined
                ? <span className="text-sm font-bold text-[#1a73e8]">{e.score}<span className="text-xs font-normal text-[#80868b]">/{maxScore}</span></span>
                : <span className="text-xs text-[#f29900] font-medium">Sin calificar</span>
              }
              <span className="text-[11px] text-[#1a73e8]">
                {e.score !== null && e.score !== undefined ? 'Editar →' : 'Calificar →'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
