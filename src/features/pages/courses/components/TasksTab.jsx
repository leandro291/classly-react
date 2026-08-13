import formatDate from '../../../../common/utils/formatDate'
import { EmptySection, IconBtn } from './primitives'

export default function TasksTab({ tareas, entregas, studentEntregas, isTeacher, onOpen, onEdit, onDelete, onCreate }) {
  const now = new Date()
  return (
    <div className="flex flex-col gap-4">
      {isTeacher && (
        <div className="flex justify-end">
          <button onClick={onCreate} className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            Nueva tarea
          </button>
        </div>
      )}
      {tareas.length === 0 ? (
        <EmptySection message={isTeacher ? 'Aún no has publicado tareas.' : 'No hay tareas publicadas aún.'} />
      ) : (
        <div className="flex flex-col gap-3">
          {tareas.map(t => {
            const due = new Date(t.due_date)
            const overdue = due < now
            const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            const entregada = entregas.find(e => e.tareaId === t.id)
            const sEntregas = studentEntregas[t.id] ?? []
            const graded = sEntregas.filter(e => e.score !== null && e.score !== undefined).length

            return (
              <div key={t.id} className="bg-white rounded-xl border border-[#e8eaed] p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer ${!isTeacher && entregada ? 'bg-[#e6f4ea]' : 'bg-[#e8f0fe]'}`} onClick={() => onOpen(t)}>
                    {!isTeacher && entregada
                      ? <svg width="20" height="20" fill="#1e8e3e" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      : <svg width="20" height="20" fill="#1a73e8" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                    }
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpen(t)}>
                    <div className="flex flex-wrap items-start justify-between gap-1.5">
                      <h3 className="text-sm font-medium text-[#202124] flex-1 min-w-0">{t.title}</h3>
                      <span className="text-xs font-medium shrink-0 px-2 py-0.5 rounded-full" style={{ backgroundColor: overdue ? '#fce8e6' : daysLeft <= 3 ? '#fef7e0' : '#e8f0fe', color: overdue ? '#c5221f' : daysLeft <= 3 ? '#b06000' : '#1a73e8' }}>
                        {overdue ? (isTeacher ? 'Cerrada' : 'Vencida') : daysLeft === 0 ? 'Hoy' : daysLeft === 1 ? 'Mañana' : `${daysLeft} días`}
                      </span>
                    </div>
                    <p className="text-xs text-[#5f6368] mt-0.5 line-clamp-1">{t.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-[#80868b]">Entrega: {formatDate(t.due_date)} · {t.max_score} pts</p>
                      {isTeacher && sEntregas.length > 0 && (
                        <>
                          <span className="text-xs text-[#80868b]">·</span>
                          <span className="text-xs text-[#1a73e8] font-medium">{sEntregas.length} entrega{sEntregas.length !== 1 ? 's' : ''}</span>
                          {graded > 0 && <span className="text-xs text-[#1e8e3e] font-medium">· {graded} calificada{graded !== 1 ? 's' : ''}</span>}
                        </>
                      )}
                      {!isTeacher && entregada && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#1e8e3e]">
                          {entregada.status === 'a_tiempo' ? 'Entregada' : 'Tardía'}
                        </span>
                      )}
                    </div>
                  </div>
                  {isTeacher && (
                    <div className="flex items-center gap-1 shrink-0">
                      <IconBtn title="Editar" onClick={() => onEdit(t)}>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </IconBtn>
                      <IconBtn title="Eliminar" onClick={() => onDelete(t)} danger>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </IconBtn>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
