import formatDate from '../../../../common/utils/formatDate'
import { ENTREGA_STATUS } from '../utils/constants'
import { EmptySection, IconBtn, DueChip } from './primitives'
import Icon from '../../../../common/components/Icon'
import Button from '../../../../common/components/Button'

export default function TasksTab({ tareas, entregas, studentEntregas, isTeacher, onOpen, onEdit, onDelete, onCreate }) {
  return (
    <div className="flex flex-col gap-4">
      {isTeacher && (
        <div className="flex justify-end">
          <Button size="lg" onClick={onCreate} className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <Icon name="add" size={18} className="text-white" />
            Nueva tarea
          </Button>
        </div>
      )}
      {tareas.length === 0 ? (
        <EmptySection message={isTeacher ? 'Aún no has publicado tareas.' : 'No hay tareas publicadas aún.'} />
      ) : (
        <div className="flex flex-col gap-3">
          {tareas.map(t => {
            const entregada = entregas.find(e => e.tareaId === t.id)
            const sEntregas = studentEntregas[t.id] ?? []
            const graded = sEntregas.filter(e => e.score !== null && e.score !== undefined).length

            return (
              <div key={t.id} className="bg-white rounded-xl border border-hairline p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer ${!isTeacher && entregada ? 'bg-success-tint' : 'bg-brand-tint'}`} onClick={() => onOpen(t)}>
                    {!isTeacher && entregada
                      ? <Icon name="check" size={20} className="text-success" />
                      : <Icon name="task" size={20} className="text-brand" />
                    }
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpen(t)}>
                    <div className="flex flex-wrap items-start justify-between gap-1.5">
                      <h3 className="text-sm font-medium text-ink flex-1 min-w-0"><button type="button" className="text-left cursor-pointer [overflow-wrap:anywhere]">{t.title}</button></h3>
                      <DueChip date={t.due_date} />
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">{t.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-ink-muted">Fecha límite: {formatDate(t.due_date)} · {t.max_score} pts</p>
                      {isTeacher && sEntregas.length > 0 && (
                        <>
                          <span className="text-xs text-ink-muted">·</span>
                          <span className="text-xs text-brand font-medium">{sEntregas.length} entrega{sEntregas.length !== 1 ? 's' : ''}</span>
                          {graded > 0 && <span className="text-xs text-success-text font-medium">· {graded} calificada{graded !== 1 ? 's' : ''}</span>}
                        </>
                      )}
                      {!isTeacher && entregada && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${(ENTREGA_STATUS[entregada.status] ?? ENTREGA_STATUS.a_tiempo).chip}`}>
                          {entregada.status === 'tardia' ? 'Entregada con retraso' : 'Entregada'}
                        </span>
                      )}
                    </div>
                  </div>
                  {isTeacher && (
                    <div className="flex items-center gap-1 shrink-0">
                      <IconBtn title="Editar" icon="edit" onClick={() => onEdit(t)} />
                      <IconBtn title="Eliminar" icon="trash" onClick={() => onDelete(t)} danger />
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
