import { useState, useRef } from 'react'
import { fileUrl } from '../../../../common/services/api'
import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, FormField, ModalActions, FileChip, SelectedFile } from './primitives'
import Icon from '../../../../common/components/Icon'

export default function TaskFormModal({ item, onSave, onClose }) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [due_date, setDueDate] = useState(item?.due_date ?? '')
  const [max_score, setMaxScore] = useState(item?.max_score ?? 20)
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)
  const { run, pending, error } = useAction()

  return (
    <ModalWrapper title={item ? 'Editar tarea' : 'Nueva tarea'} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); run(() => onSave({ title, description, due_date, max_score, file })) }} className="flex flex-col gap-4">
        <FormField label="Título" value={title} onChange={setTitle} required />
        <FormField label="Instrucciones" value={description} onChange={setDescription} multiline required />
        <div className="flex gap-3">
          <FormField label="Fecha límite" type="date" value={due_date} onChange={setDueDate} required className="flex-1" />
          <FormField label="Puntaje (máx 20)" type="number" min={0} max={20} value={max_score} onChange={v => setMaxScore(Number(v))} required className="w-28" />
        </div>

        <div>
          <p className="text-xs font-medium text-ink-muted mb-2">Archivo de apoyo (opcional)</p>
          {item?.file && !file && (
            <FileChip name={item.file} href={fileUrl(item.file)} small />
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
          {file ? (
            <SelectedFile name={file.name} onRemove={() => setFile(null)} className="mt-1.5" />
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-ink-muted border border-dashed border-field-line rounded-xl w-full justify-center py-3 hover:bg-canvas hover:border-brand transition-all mt-1">
              <Icon name="upload" className="text-ink-muted" />
              {item?.file ? 'Reemplazar archivo' : 'Subir archivo'}
            </button>
          )}
        </div>

        <ModalActions onClose={onClose} label={item ? 'Guardar' : 'Publicar'} disabled={!title.trim() || !due_date} pending={pending} error={error} />
      </form>
    </ModalWrapper>
  )
}
