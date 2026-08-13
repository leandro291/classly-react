import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'

export default function StreamTab({ course, color, materials, tareas, isTeacher, onGoMaterials, onGoTasks, onOpenMaterial, onOpenTarea }) {
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard.writeText(course.registration_code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="order-2 lg:order-1 lg:w-64 shrink-0">
        <div className="bg-white rounded-xl border border-[#e8eaed] overflow-hidden">
          <div className="h-3" style={{ backgroundColor: color }} />
          <div className="p-4">
            <p className="text-xs text-[#5f6368] mb-1">Código de clase</p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-2xl font-medium tracking-widest text-[#202124]" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
                {course.registration_code}
              </p>
              <button onClick={copyCode} title="Copiar código" className="p-1.5 rounded-full hover:bg-[#e8f0fe] transition-colors shrink-0">
                {copied
                  ? <svg width="16" height="16" fill="#1e8e3e" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  : <svg width="16" height="16" fill="#5f6368" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                }
              </button>
            </div>
            <hr className="my-3 border-[#e8eaed]" />
            <button onClick={onGoMaterials} className="w-full flex items-center justify-between py-2 text-sm text-[#5f6368] hover:text-[#1a73e8] transition-colors">
              <span>Material del curso</span>
              <span className="text-lg font-medium text-[#1a73e8]">{materials.length}</span>
            </button>
            <button onClick={onGoTasks} className="w-full flex items-center justify-between py-2 text-sm text-[#5f6368] hover:text-[#1a73e8] transition-colors">
              <span>{isTeacher ? 'Tareas publicadas' : 'Tareas pendientes'}</span>
              <span className="text-lg font-medium text-[#1a73e8]">{tareas.length}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex-1 flex flex-col gap-4">
        {tareas.length > 0 && (
          <div className="bg-white rounded-xl border border-[#e8eaed] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-base font-medium text-[#202124]">
                {isTeacher ? 'Tareas recientes' : 'Próximas entregas'}
              </h3>
              <button onClick={onGoTasks} className="text-sm text-[#1a73e8] hover:underline">Ver todas</button>
            </div>
            {tareas.slice(0, 3).map(t => (
              <FeedRow key={t.id} icon="task" title={t.title} sub={`Entrega: ${formatDate(t.due_date)} · ${t.max_score} pts`} onClick={() => onOpenTarea(t)} />
            ))}
          </div>
        )}
        {materials.length > 0 && (
          <div className="bg-white rounded-xl border border-[#e8eaed] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-base font-medium text-[#202124]">Material reciente</h3>
              <button onClick={onGoMaterials} className="text-sm text-[#1a73e8] hover:underline">Ver todo</button>
            </div>
            {materials.slice(0, 3).map(m => (
              <FeedRow key={m.id} icon="file" title={m.title} sub={`${formatDate(m.created_at)} · ${m.archivo_materials.length} archivo${m.archivo_materials.length !== 1 ? 's' : ''}`} onClick={() => onOpenMaterial(m)} />
            ))}
          </div>
        )}
        {materials.length === 0 && tareas.length === 0 && (
          <div className="bg-white rounded-xl border border-[#e8eaed] p-10 flex flex-col items-center text-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-4">
              <circle cx="40" cy="40" r="36" fill="#e8f0fe"/>
              <rect x="22" y="28" width="36" height="28" rx="4" fill="#1a73e8" opacity="0.15"/>
              <rect x="26" y="24" width="28" height="20" rx="3" fill="white" stroke="#1a73e8" strokeWidth="1.5"/>
              <rect x="30" y="30" width="16" height="2" rx="1" fill="#1a73e8" opacity="0.5"/>
              <rect x="30" y="35" width="12" height="2" rx="1" fill="#1a73e8" opacity="0.3"/>
              <circle cx="52" cy="52" r="10" fill="#1a73e8"/>
              <path d="M47 52h10M52 47v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-base font-medium text-[#202124] mb-1">
              {isTeacher ? 'Empieza a publicar' : 'Nada por aquí aún'}
            </p>
            <p className="text-sm text-[#5f6368] max-w-xs">
              {isTeacher
                ? 'Ve a la pestaña Material o Tareas para crear tu primer contenido.'
                : 'Tu profesor aún no ha publicado material ni tareas.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function FeedRow({ icon, title, sub, onClick }) {
  const isTask = icon === 'task'
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 py-3 border-b border-[#f1f3f4] last:border-0 text-left hover:bg-[#f8f9fa] -mx-2 px-2 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isTask ? 'bg-[#e8f0fe]' : 'bg-[#fce8e6]'}`}>
        {isTask
          ? <svg width="15" height="15" fill="#1a73e8" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          : <svg width="15" height="15" fill="#d93025" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#202124] truncate">{title}</p>
        <p className="text-xs text-[#5f6368] mt-0.5">{sub}</p>
      </div>
      <svg width="16" height="16" fill="#bdc1c6" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </button>
  )
}
