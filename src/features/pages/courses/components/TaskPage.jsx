import { useState, useRef } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import useAction from '../../../../common/hooks/useAction'
import { ENTREGA_STATUS } from '../utils/constants'
import { FileChip, FormError, LoadError, DueChip, SelectedFile } from './primitives'
import NavBar from './NavBar'
import TeacherSubmissionList from './TeacherSubmissionList'
import Icon from '../../../../common/components/Icon'
import Button from '../../../../common/components/Button'

export default function TaskPage({ tarea, course, color, isTeacher, entrega, studentEntregas, entregasStatus, onRetry, onBack, onSubmit, onGrade, onEditEntrega, onDeleteEntrega, children }) {
  const [student_comment, setComment] = useState(entrega?.student_comment ?? '')
  const [files, setFiles] = useState([])
  const { run, pending, error } = useAction()
  const fileRef = useRef(null)

  const ready = entregasStatus === 'ready'
  const status = ENTREGA_STATUS[entrega?.status] ?? ENTREGA_STATUS.a_tiempo
  const canSubmit = student_comment.trim() || files.length > 0

  return (
    <div className="min-h-dvh bg-canvas">
      <NavBar onBack={onBack} title={tarea.title} />
      <div className="h-3 w-full" style={{ backgroundColor: color }} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-hairline overflow-hidden">
            <div className="px-6 py-6 border-b border-hairline">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-tint flex items-center justify-center shrink-0">
                  <Icon name="task" size={24} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-xl font-medium text-ink text-balance [overflow-wrap:anywhere]">{tarea.title}</h1>
                  <p className="text-xs text-ink-muted mt-1">{`${course.teacher.first_name} ${course.teacher.last_name}`.trim()} · {formatDate(tarea.created_at)}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-ink-muted">Fecha límite: <strong>{formatDate(tarea.due_date)}</strong></span>
                    <span className="text-xs text-ink-muted">·</span>
                    <span className="text-xs text-ink-muted">{tarea.max_score} puntos</span>
                    <DueChip date={tarea.due_date} />
                    {!isTeacher && entrega && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success-tint text-success-text">Entregada</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-base text-ink leading-relaxed whitespace-pre-line [overflow-wrap:anywhere] text-pretty">{tarea.description}</p>
            </div>
          </div>

          {tarea.file && (
            <div>
              <p className="text-sm font-medium text-ink-muted mb-2 px-1">Archivo del profesor</p>
              <FileChip name={tarea.file} href={fileUrl(tarea.file)} accent="var(--color-brand)" bg="var(--color-brand-tint)" />
            </div>
          )}
        </div>

        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-hairline overflow-hidden">
            <div className="px-5 py-4 border-b border-hairline">
              <h2 className="font-display text-sm font-medium text-ink">
                {isTeacher ? (ready ? `Entregas (${studentEntregas.length})` : 'Entregas') : entrega || !ready ? 'Tu entrega' : 'Entregar tarea'}
              </h2>
            </div>
            <div className="px-5 py-5">
              {entregasStatus === 'loading' ? (
                <p role="status" className="text-sm text-ink-muted">{isTeacher ? 'Cargando entregas…' : 'Cargando tu entrega…'}</p>
              ) : entregasStatus === 'error' ? (
                <LoadError message={isTeacher ? 'No se pudieron cargar las entregas.' : 'No se pudo cargar tu entrega.'} onRetry={onRetry} />
              ) : isTeacher ? (
                <TeacherSubmissionList entregas={studentEntregas} maxScore={tarea.max_score} onGrade={onGrade} />
              ) : entrega ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="check" size={18} className={status.text} />
                      <span className={`text-sm font-medium ${status.text}`}>Entregada · {status.label.toLowerCase()}</span>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" title="Editar entrega" aria-label="Editar entrega" onClick={onEditEntrega} className="p-1.5 rounded-full hover:bg-brand-tint text-ink-muted hover:text-brand transition-colors pointer-coarse:p-3.5">
                        <Icon name="edit" size={15} />
                      </button>
                      <button type="button" title="Retirar entrega" aria-label="Retirar entrega" onClick={onDeleteEntrega} className="p-1.5 rounded-full hover:bg-danger-tint text-ink-muted hover:text-danger-text transition-colors pointer-coarse:p-3.5">
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </div>

                  {entrega.score !== null && entrega.score !== undefined ? (
                    <div className="bg-brand-tint rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-brand-dark font-medium mb-0.5">Calificación</p>
                        {entrega.teacher_comment && (
                          <p className="text-xs text-ink mt-1">{entrega.teacher_comment}</p>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-brand-dark tabular-nums">
                        {entrega.score}<span className="text-sm font-normal text-ink-muted">/{tarea.max_score}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="bg-warning-tint rounded-xl px-4 py-3">
                      <p className="text-xs text-warning-text font-medium">Sin calificar todavía</p>
                    </div>
                  )}

                  {entrega.student_comment && (
                    <p className="text-sm text-ink bg-canvas rounded-xl px-3 py-2 whitespace-pre-line [overflow-wrap:anywhere]">
                      {entrega.student_comment}
                    </p>
                  )}
                  {(entrega.files ?? []).map((f, i) => (
                    <a key={i} href={fileUrl(f)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-ink-muted bg-canvas rounded-lg px-3 py-2 hover:bg-brand-tint transition-colors no-underline">
                      <Icon name="file" size={13} className="text-ink-muted" />
                      <span className="truncate">{f}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); run(async () => { await onSubmit(student_comment, files); setFiles([]) }) }}>
                  <fieldset disabled={pending} className="flex flex-col gap-3 min-w-0">
                    <textarea value={student_comment} onChange={e => setComment(e.target.value)} placeholder="Comentario para el profesor" aria-label="Comentario para el profesor" rows={3} className="w-full border border-field-border rounded-xl px-3 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-none" />
                    <input ref={fileRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files)]) }} />
                    <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 text-sm text-ink-muted border border-field-line rounded-xl px-3 py-2.5 hover:bg-canvas transition-colors">
                      <svg width="16" height="16" fill="var(--color-ink-muted)" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                      Adjuntar archivos
                    </button>
                    {files.map((f, i) => (
                      <SelectedFile key={i} name={f.name} onRemove={() => setFiles(p => p.filter((_, idx) => idx !== i))} />
                    ))}
                    <FormError error={error && `${error} Tu comentario y tus archivos se conservaron.`} />
                    {!canSubmit && <p className="text-xs text-ink-muted">Adjunta un archivo o escribe un comentario para entregar.</p>}
                    <Button type="submit" size="lg" disabled={!canSubmit} className="w-full">
                      {pending ? 'Entregando…' : 'Entregar'}
                    </Button>
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      {children}
    </div>
  )
}
