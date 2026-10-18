import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import Icon from '../../../../common/components/Icon'

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
          <div className="h-3" style={{ backgroundColor: color }} />
          <div className="p-4">
            <p className="text-xs text-ink-muted mb-1">Código de clase</p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-2xl font-medium tracking-widest text-ink">
                {course.registration_code}
              </p>
              <button type="button" onClick={copyCode} title="Copiar código" aria-label={copied ? 'Código copiado' : 'Copiar código'} className="p-1.5 rounded-full hover:bg-brand-tint transition-colors shrink-0">
                {copied
                  ? <Icon name="check" className="text-success" />
                  : <svg width="16" height="16" fill="var(--color-ink-muted)" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                }
              </button>
            </div>
            <hr className="my-3 border-hairline" />
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
          <div className="bg-white rounded-xl border border-hairline p-10 flex flex-col items-center text-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-4">
              <circle cx="40" cy="40" r="36" fill="var(--color-brand-tint)"/>
              <rect x="22" y="28" width="36" height="28" rx="4" fill="var(--color-brand)" opacity="0.15"/>
              <rect x="26" y="24" width="28" height="20" rx="3" fill="white" stroke="var(--color-brand)" strokeWidth="1.5"/>
              <rect x="30" y="30" width="16" height="2" rx="1" fill="var(--color-brand)" opacity="0.5"/>
              <rect x="30" y="35" width="12" height="2" rx="1" fill="var(--color-brand)" opacity="0.3"/>
              <circle cx="52" cy="52" r="10" fill="var(--color-brand)"/>
              <path d="M47 52h10M52 47v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="font-display text-base font-medium text-ink mb-1">
              {isTeacher ? 'Empieza a publicar' : 'Nada por aquí aún'}
            </p>
            <p className="text-sm text-ink-muted max-w-xs">
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
