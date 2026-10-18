import { useEffect, useId, useRef } from 'react'
import Icon from '../../../../common/components/Icon'
export { default as FormField } from '../../../../common/components/FormField'
import { dueInfo } from '../../../../common/utils/formatDate'
import Button from '../../../../common/components/Button'

export function ModalWrapper({ title, onClose, children }) {
  const ref = useRef(null)
  const titleId = useId()

  // <dialog> modal: foco atrapado, fondo inerte y aria-modal los da el navegador
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    dialog.showModal()
    return () => { dialog.close(); opener?.focus?.() }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={e => { e.preventDefault(); onClose() }}
      onMouseDown={e => { if (e.target === ref.current) onClose() }}
      className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[90dvh] p-0 text-inherit bg-white rounded-2xl shadow-2xl backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 id={titleId} className="font-display text-xl font-normal text-ink mb-5 text-balance [overflow-wrap:anywhere]">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}

export function FormError({ error }) {
  return error ? <p role="alert" className="text-sm text-danger-text">{error}</p> : null
}

export function LoadError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <p role="alert" className="text-sm text-danger-text">{message}</p>
      <Button variant="text" size="sm" type="button" onClick={onRetry}>Reintentar</Button>
    </div>
  )
}

export function ModalActions({ onClose, label, disabled, pending, error }) {
  return (
    <>
      <FormError error={error} />
      <div className="flex justify-end gap-2 pt-1">
        <Button variant="text" size="sm" type="button" onClick={onClose}>Cancelar</Button>
        <Button type="submit" disabled={disabled || pending}>{pending ? 'Procesando…' : label}</Button>
      </div>
    </>
  )
}

export function FileChip({ name, href, accent = 'var(--color-danger)', bg = 'var(--color-danger-tint)', small }) {
  const size = small ? 14 : 20
  const content = (
    <>
      <div className={`rounded-xl flex items-center justify-center shrink-0 ${small ? 'w-7 h-7' : 'w-10 h-10'}`} style={{ backgroundColor: bg }}>
        <Icon name="file" size={size} style={{ color: accent }} />
      </div>
      <span className={`flex-1 text-ink truncate ${small ? 'text-xs' : 'text-sm'}`}>{name}</span>
      {href && <Icon name="download" size={size} className="text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />}
    </>
  )
  const cls = `flex items-center gap-3 border border-hairline rounded-xl hover:shadow-sm cursor-pointer transition-all group ${small ? 'px-3 py-2' : 'px-5 py-4'}`
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} no-underline`}>{content}</a>
  return <div className={cls}>{content}</div>
}

export function SelectedFile({ name, onRemove, className = '' }) {
  return (
    <div className={`flex items-center gap-2 border border-field-line rounded-lg px-3 py-1.5 text-xs text-ink-muted ${className}`}>
      <Icon name="file" size={13} />
      <span className="flex-1 truncate">{name}</span>
      <button type="button" aria-label={`Quitar ${name}`} onClick={onRemove} className="p-1.5 -m-1.5 hover:text-danger-text">
        <Icon name="close" size={13} />
      </button>
    </div>
  )
}

export function IconBtn({ title, icon, onClick, danger }) {
  return (
    <button type="button" title={title} aria-label={title} onClick={e => { e.stopPropagation(); onClick() }}
      className={`p-1.5 pointer-coarse:p-3.5 rounded-full transition-colors ${danger ? 'hover:bg-danger-tint text-ink-muted hover:text-danger-text' : 'hover:bg-brand-tint text-ink-muted hover:text-brand'}`}>
      <Icon name={icon} />
    </button>
  )
}

const DUE_TONE = {
  late: 'bg-danger-tint text-danger-text',
  soon: 'bg-warning-tint text-warning-text',
  ok: 'bg-canvas text-ink-muted',
}

export function DueChip({ date }) {
  const { label, tone } = dueInfo(date)
  return <span className={`text-xs font-medium shrink-0 px-2 py-0.5 rounded-full ${DUE_TONE[tone]}`}>{label}</span>
}

export function EmptySection({ message }) {
  return <div className="text-center py-20 text-ink-muted text-sm">{message}</div>
}
