import { useState } from 'react'

export default function CourseFormModal({ course, onSave, onClose }) {
  const [name, setName] = useState(course?.name ?? '')
  const [description, setDescription] = useState(course?.description ?? '')
  const [period, setPeriod] = useState(course?.period ?? '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-normal text-[#202124] mb-5">
          {course ? 'Editar clase' : 'Crear clase'}
        </h2>
        <form onSubmit={e => { e.preventDefault(); onSave({ name, description, period }) }} className="flex flex-col gap-4">
          <FloatField label="Nombre de la clase" value={name} onChange={setName} required />
          <FloatField label="Sección / Periodo (ej: 2024-I)" value={period} onChange={setPeriod} required />
          <div className="relative">
            <textarea
              value={description} onChange={e => setDescription(e.target.value)}
              placeholder=" " rows={3}
              className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none"
            />
            <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">
              Descripción (opcional)
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit" disabled={!name.trim() || !period.trim()} className="px-6 py-2 text-sm bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 text-white rounded-lg transition-colors font-medium">
              {course ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FloatField({ label, value, onChange, required }) {
  return (
    <div className="relative">
      <input
        value={value} onChange={e => onChange(e.target.value)}
        required={required} placeholder=" "
        className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
      />
      <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">
        {label}
      </label>
    </div>
  )
}
