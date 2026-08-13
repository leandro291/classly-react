import { useState } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import { ModalWrapper, FileChip } from './primitives'

export default function GradeModal({ entrega, maxScore, onSave, onClose }) {
  const [grade, setGrade] = useState(entrega.score !== null && entrega.score !== undefined ? String(entrega.score) : '')
  const [comment, setComment] = useState(entrega.teacher_comment ?? '')

  const gradeNum = parseInt(grade, 10)
  const valid = !isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= maxScore

  return (
    <ModalWrapper title={`Calificar a ${entrega.student_name ?? entrega.student}`} onClose={onClose}>
      <div className="mb-5">
        <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-xl p-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center text-xs font-medium text-[#1a73e8] shrink-0">
            {(entrega.student_name ?? entrega.student)?.toString().split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#202124]">{entrega.student_name ?? entrega.student}</p>
            <p className="text-xs text-[#5f6368]">Entregado {formatDate(entrega.submitted_at)} · <span className={entrega.status === 'a_tiempo' ? 'text-[#1e8e3e]' : 'text-[#c5221f]'}>{entrega.status === 'a_tiempo' ? 'a tiempo' : 'tarde'}</span></p>
          </div>
        </div>

        {entrega.student_comment && (
          <div className="mb-3">
            <p className="text-xs font-medium text-[#5f6368] mb-1">Comentario del alumno</p>
            <p className="text-sm text-[#202124] bg-[#f1f3f4] rounded-xl px-3 py-2">{entrega.student_comment}</p>
          </div>
        )}

        {entrega.files && entrega.files.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-[#5f6368] mb-2">Archivos entregados</p>
            <div className="flex flex-col gap-1.5">
              {entrega.files.map((f, i) => <FileChip key={i} name={f} href={fileUrl(f)} small />)}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={e => { e.preventDefault(); if (valid) onSave(gradeNum, comment) }} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-[#5f6368] mb-2">Nota (0 – {maxScore})</label>
          <div className="flex items-center gap-3">
            <input
              type="number" min={0} max={maxScore} step={1} value={grade}
              onChange={e => setGrade(e.target.value)}
              placeholder="0"
              className="w-28 border border-[#dadce0] rounded-lg px-3 py-2.5 text-2xl font-bold text-[#202124] text-center outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
            />
            <span className="text-xl text-[#80868b] font-light">/ {maxScore}</span>
            {grade !== '' && !valid && (
              <span className="text-xs text-[#c5221f]">Fuera de rango</span>
            )}
          </div>
        </div>
        <div className="relative">
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder=" " rows={3}
            className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none" />
          <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">Comentario para el alumno (opcional)</label>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">Cancelar</button>
          <button type="submit" disabled={!valid} className="px-6 py-2 text-sm bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 text-white rounded-lg transition-colors font-medium">
            Guardar nota
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}
