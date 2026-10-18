import { useState, useRef } from 'react'
import { fileUrl } from '../../../../common/services/api'
import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, FormField, ModalActions, FileChip, SelectedFile } from './primitives'
import Icon from '../../../../common/components/Icon'

export default function MaterialFormModal({ item, onSave, onClose }) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [files, setFiles] = useState([])
  const fileRef = useRef(null)
  const { run, pending, error } = useAction()

  return (
    <ModalWrapper title={item ? 'Editar material' : 'Nuevo material'} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); run(() => onSave({ title, description, files })) }} className="flex flex-col gap-4">
        <FormField label="Título" value={title} onChange={setTitle} required />
        <FormField label="Descripción (opcional)" value={description} onChange={setDescription} multiline />

        <div>
          <p className="text-xs font-medium text-ink-muted mb-2">
            {item ? 'Reemplazar archivos (opcional)' : 'Archivos adjuntos'}
          </p>
          {item && item.archivo_materials.length > 0 && files.length === 0 && (
            <div className="flex flex-col gap-1.5 mb-2">
              {item.archivo_materials.map(a => <FileChip key={a.id} name={a.file} href={fileUrl(a.file)} small />)}
            </div>
          )}
          <input ref={fileRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files)]) }} />
          <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-ink-muted border border-dashed border-field-line rounded-xl w-full justify-center py-3 hover:bg-canvas hover:border-brand transition-colors">
            <Icon name="upload" size={18} className="text-ink-muted" />
            Subir archivos
          </button>
          {files.map((f, i) => (
            <SelectedFile key={i} name={f.name} onRemove={() => setFiles(p => p.filter((_, idx) => idx !== i))} className="mt-1.5" />
          ))}
        </div>

        <ModalActions onClose={onClose} label={item ? 'Guardar' : 'Publicar'} disabled={!title.trim()} pending={pending} error={error} />
      </form>
    </ModalWrapper>
  )
}
