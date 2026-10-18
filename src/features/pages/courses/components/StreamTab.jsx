import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import Icon from '../../../../common/components/Icon'
import Board from '../../../../common/components/Board'
import { ChalkUnderline } from '../../../../common/components/Chalk'

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
        <div className="bg-white rounded-xl border border-hairline overflow-hidden">
          <Board color={color} className="px-4 pt-4 pb-5">
            <p className="text-xs">Código de clase</p>
            <div className="flex items-center justify-between gap-2 mt-1">
              <p className="font-mono text-3xl font-medium tracking-widest [overflow-wrap:anywhere]">
                {course.registration_code}
              </p>
              <button type="button" onClick={copyCode} title="Copiar código" aria-label={copied ? 'Código copiado' : 'Copiar código'} className="press p-1.5 pointer-coarse:p-3 rounded-full hover:bg-white/15 shrink-0">
                <Icon key={copied ? 'ok' : 'copy'} name={copied ? 'check' : 'copy'} className="pop-in" />
              </button>
            </div>
          </Board>
          <div className="p-4">
            <button onClick={onGoMaterials} className="w-full flex items-center justify-between py-2 text-sm text-ink-muted hover:text-brand transition-colors">
              <span>Material del curso</span>
              <span className="text-lg font-medium text-brand tabular-nums">{materials.length}</span>
            </button>
            <button onClick={onGoTasks} className="w-full flex items-center justify-between py-2 text-sm text-ink-muted hover:text-brand transition-colors">
              <span>{isTeacher ? 'Tareas publicadas' : 'Tareas'}</span>
              <span className="text-lg font-medium text-brand tabular-nums">{tareas.length}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex-1 flex flex-col gap-4">
        {tareas.length > 0 && (
          <div className="bg-white rounded-xl border border-hairline p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-medium text-ink">
                Tareas recientes
              </h3>
              <button onClick={onGoTasks} className="text-sm text-brand hover:underline">Ver todas</button>
            </div>
            {tareas.slice(0, 3).map(t => (
              <FeedRow key={t.id} icon="task" title={t.title} sub={`Fecha límite: ${formatDate(t.due_date)} · ${t.max_score} pts`} onClick={() => onOpenTarea(t)} />
            ))}
          </div>
        )}
        {materials.length > 0 && (
          <div className="bg-white rounded-xl border border-hairline p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base font-medium text-ink">Material reciente</h3>
              <button onClick={onGoMaterials} className="text-sm text-brand hover:underline">Ver todo</button>
            </div>
            {materials.slice(0, 3).map(m => (
              <FeedRow key={m.id} icon="file" title={m.title} sub={`${formatDate(m.created_at)} · ${m.archivo_materials.length} archivo${m.archivo_materials.length !== 1 ? 's' : ''}`} onClick={() => onOpenMaterial(m)} />
            ))}
          </div>
        )}
        {materials.length === 0 && tareas.length === 0 && (
          <Board chalk color={color} className="rounded-xl overflow-hidden px-6 pt-10 pb-14 flex flex-col items-center text-center">
            <p className="font-display text-3xl font-medium text-balance">
              {isTeacher ? 'Empieza a publicar' : 'Nada por aquí aún'}
            </p>
            <ChalkUnderline className="w-40 mt-1 mb-3" />
            <p className="text-sm max-w-xs">
              {isTeacher
                ? 'Ve a la pestaña Material o Tareas para crear tu primer contenido.'
                : 'Tu profesor aún no ha publicado material ni tareas.'}
            </p>
          </Board>
        )}
      </div>
    </div>
  )
}

function FeedRow({ icon, title, sub, onClick }) {
  const isTask = icon === 'task'
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 py-3 border-b border-canvas last:border-0 text-left hover:bg-surface-subtle -mx-2 px-2 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isTask ? 'bg-brand-tint' : 'bg-danger-tint'}`}>
        {isTask
          ? <Icon name="task" size={15} className="text-brand" />
          : <Icon name="doc" size={15} className="text-danger" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{title}</p>
        <p className="text-xs text-ink-muted mt-0.5">{sub}</p>
      </div>
      <Icon name="chevron" className="text-field-border" />
    </button>
  )
}
