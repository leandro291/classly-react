import { useId } from 'react'

// Campo con etiqueta flotante. La etiqueta queda a 12px arriba y baja a 14px cuando el campo está vacío y sin foco.
export default function FormField({ label, value, onChange, multiline, className = '', ...props }) {
  const id = useId()
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className={`relative ${className}`}>
      <Tag
        id={id} value={value} onChange={e => onChange(e.target.value)} placeholder=" "
        rows={multiline ? 3 : undefined}
        className={`peer w-full border border-field-border rounded-lg px-3 pt-6 pb-2 text-sm text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${multiline ? 'resize-none' : ''}`}
        {...props}
      />
      <label htmlFor={id} className="absolute left-3 top-1.5 text-xs text-ink-muted peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand transition-all pointer-events-none">{label}</label>
    </div>
  )
}
