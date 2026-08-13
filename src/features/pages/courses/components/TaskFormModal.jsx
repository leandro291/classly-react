import { useState, useRef } from 'react'
import { fileUrl } from '../../../../common/services/api'
import { ModalWrapper, FormField, ModalActions, FileChip } from './primitives'

export default function TaskFormModal({ item, onSave, onClose }) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [due_date, setDueDate] = useState(item?.due_date ?? '')
  const [max_score, setMaxScore] = useState(item?.max_score ?? 20)
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)

  return (
    <ModalWrapper title={item ? 'Editar tarea' : 'Nueva tarea'} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); onSave({ title, description, due_date, max_score, file }) }} className="flex flex-col gap-4">
        <FormField label="Título" value={title} onChange={setTitle} required />
        <div className="relative">
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder=" " rows={3} required
            className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none" />
          <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">Instrucciones</label>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input type="date" value={due_date} onChange={e => setDueDate(e.target.value)} required
              className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all" />
            <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] pointer-events-none">Fecha de entrega</label>
          </div>
          <div className="w-28 relative">
            <input type="number" min={0} max={20} value={max_score} onChange={e => setMaxScore(Number(e.target.value))} required
              className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all" />
            <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] pointer-events-none">Puntaje (máx 20)</label>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-[#5f6368] mb-2">Archivo de apoyo (opcional)</p>
          {item?.file && !file && (
            <FileChip name={item.file} href={fileUrl(item.file)} small />
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]) }} />
          {file ? (
            <div className="flex items-center gap-2 border border-[#dadce0] rounded-lg px-3 py-1.5 text-xs text-[#5f6368] mt-1.5">
              <svg width="13" height="13" fill="#5f6368" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
              <span className="flex-1 truncate">{file.name}</span>
              <button type="button" onClick={() => setFile(null)} className="hover:text-[#c5221f]">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-[#5f6368] border border-dashed border-[#dadce0] rounded-xl w-full justify-center py-3 hover:bg-[#f1f3f4] hover:border-[#1a73e8] transition-all mt-1">
              <svg width="16" height="16" fill="#5f6368" viewBox="0 0 24 24"><path d="M9 16v-6h6v6h4l-7 7-7-7h4zm-4 6v2h14v-2H5z"/></svg>
              {item?.file ? 'Reemplazar archivo' : 'Subir archivo'}
            </button>
          )}
        </div>

        <ModalActions onClose={onClose} label={item ? 'Guardar' : 'Publicar'} disabled={!title.trim() || !due_date} />
      </form>
    </ModalWrapper>
  )
}
