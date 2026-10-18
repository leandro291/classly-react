import { useId } from 'react'

// Campo con etiqueta flotante. La etiqueta es de 14px y sube escalada a 12px (translate + scale: solo propiedades de GPU) cuando el campo tiene texto o foco.
export default function FormField({ label, value, onChange, multiline, className = '', ...props }) {
  const id = useId()
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className={`relative ${className}`}>
      <Tag
        id={id} value={value} onChange={e => onChange(e.target.value)} placeholder=" "
        rows={multiline ? 3 : undefined}
        className={`peer w-full border border-field-border rounded-lg px-3 pt-6 pb-2 text-sm text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-[border-color,box-shadow] ${multiline ? 'resize-none' : ''}`}
        {...props}
      />
      <label htmlFor={id} className="absolute left-3 top-[18px] origin-top-left text-sm text-ink-muted -translate-y-3 scale-[0.857] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-[0.857] peer-focus:text-brand transition-[translate,scale,color] pointer-events-none">{label}</label>
    </div>
  )
}
