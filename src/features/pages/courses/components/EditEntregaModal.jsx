import { useState, useRef } from 'react'
import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, ModalActions, FormField, SelectedFile } from './primitives'
import Icon from '../../../../common/components/Icon'

export default function EditEntregaModal({ entrega, onSave, onClose }) {
  const [student_comment, setComment] = useState(entrega.student_comment)
  const [files, setFiles] = useState([])
  const fileRef = useRef(null)
  const { run, pending, error } = useAction()

  return (
    <ModalWrapper title="Editar entrega" onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); run(() => onSave(student_comment, files)) }} className="flex flex-col gap-4">
        <FormField label="Comentario (opcional)" value={student_comment} onChange={setComment} multiline />
        <div>
          <p className="text-xs font-medium text-ink-muted mb-2">Archivos</p>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files)]) }} />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-ink-muted border border-dashed border-field-line rounded-xl w-full justify-center py-3 hover:bg-canvas hover:border-brand transition-colors">
            <Icon name="upload" className="text-ink-muted" />
            Agregar archivos
          </button>
          {files.map((f, i) => (
            <SelectedFile key={i} name={f.name} onRemove={() => setFiles(p => p.filter((_, idx) => idx !== i))} className="mt-1.5" />
          ))}
        </div>
        <ModalActions onClose={onClose} label="Guardar cambios" pending={pending} error={error} />
      </form>
    </ModalWrapper>
  )
}
