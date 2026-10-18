import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import { ENTREGA_STATUS } from '../utils/constants'
import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, ModalActions, FormField, FileChip } from './primitives'

export default function GradeModal({ entrega, maxScore, onSave, onClose }) {
  const { run, pending, error } = useAction()
  const [grade, setGrade] = useState(entrega.score !== null && entrega.score !== undefined ? String(entrega.score) : '')
  const [comment, setComment] = useState(entrega.teacher_comment ?? '')

  const gradeNum = parseInt(grade, 10)
  const valid = !isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= maxScore
  const studentName = entrega.student_name ?? (typeof entrega.student === 'object' ? entrega.student?.username : entrega.student)

  return (
    <ModalWrapper title={`Calificar a ${studentName}`} onClose={onClose}>
      <div className="mb-5">
        <div className="flex items-center gap-3 bg-surface-subtle rounded-xl p-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-brand-tint flex items-center justify-center text-xs font-medium text-brand-dark shrink-0">
            {studentName?.toString().split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink">{studentName}</p>
            <p className="text-xs text-ink-muted">Entregado {formatDate(entrega.submitted_at)} · <span className={(ENTREGA_STATUS[entrega.status] ?? ENTREGA_STATUS.a_tiempo).text}>{(ENTREGA_STATUS[entrega.status] ?? ENTREGA_STATUS.a_tiempo).label.toLowerCase()}</span></p>
          </div>
        </div>

        {entrega.student_comment && (
          <div className="mb-3">
            <p className="text-xs font-medium text-ink-muted mb-1">Comentario del alumno</p>
            <p className="text-sm text-ink bg-canvas rounded-xl px-3 py-2 whitespace-pre-line [overflow-wrap:anywhere]">{entrega.student_comment}</p>
          </div>
        )}

        {entrega.files && entrega.files.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-ink-muted mb-2">Archivos entregados</p>
            <div className="flex flex-col gap-1.5">
              {entrega.files.map((f, i) => <FileChip key={i} name={f} href={fileUrl(f)} small />)}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={e => { e.preventDefault(); if (valid) run(() => onSave(gradeNum, comment)) }} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-ink-muted mb-2">Nota (0 – {maxScore})</label>
          <div className="flex items-center gap-3">
            <input
              type="number" min={0} max={maxScore} step={1} value={grade}
              onChange={e => setGrade(e.target.value)}
              placeholder="0"
              className="w-28 border border-field-border rounded-lg px-3 py-2.5 text-2xl font-bold text-ink text-center tabular-nums outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-[border-color,box-shadow]"
            />
            <span className="text-xl text-ink-muted tabular-nums">/ {maxScore}</span>
            {grade !== '' && !valid && (
              <span role="alert" className="text-xs text-danger-text">Ingresa un número entero entre 0 y {maxScore}.</span>
            )}
          </div>
        </div>
        <FormField label="Comentario para el alumno (opcional)" value={comment} onChange={setComment} multiline />
        <ModalActions onClose={onClose} label="Guardar nota" disabled={!valid} pending={pending} error={error} />
      </form>
    </ModalWrapper>
  )
}
