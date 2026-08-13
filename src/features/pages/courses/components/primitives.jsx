export function ModalWrapper({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-normal text-[#202124] mb-5">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export function FormField({ label, value, onChange, required }) {
  return (
    <div className="relative">
      <input value={value} onChange={e => onChange(e.target.value)} required={required} placeholder=" "
        className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all" />
      <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">{label}</label>
    </div>
  )
}

export function ModalActions({ onClose, label, disabled }) {
  return (
    <div className="flex justify-end gap-2 pt-1">
      <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">Cancelar</button>
      <button type="submit" disabled={disabled} className="px-6 py-2 text-sm bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 text-white rounded-lg transition-colors font-medium">{label}</button>
    </div>
  )
}

export function FileChip({ name, href, accent = '#d93025', bg = '#fce8e6', small }) {
  const content = (
    <>
      <div className={`rounded-xl flex items-center justify-center shrink-0 ${small ? 'w-7 h-7' : 'w-10 h-10'}`} style={{ backgroundColor: bg }}>
        <svg width={small ? 14 : 20} height={small ? 14 : 20} fill={accent} viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
      </div>
      <span className={`flex-1 text-[#202124] truncate ${small ? 'text-xs' : 'text-sm'}`}>{name}</span>
      {href && (
        <svg width={small ? 14 : 20} height={small ? 14 : 20} fill="#5f6368" viewBox="0 0 24 24" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
      )}
    </>
  )
  const cls = `flex items-center gap-3 border border-[#e8eaed] rounded-xl hover:shadow-sm cursor-pointer transition-all group ${small ? 'px-3 py-2' : 'px-5 py-4'}`
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} no-underline`}>{content}</a>
  return <div className={cls}>{content}</div>
}

export function IconBtn({ title, onClick, danger, children }) {
  return (
    <button title={title} onClick={e => { e.stopPropagation(); onClick() }}
      className={`p-1.5 rounded-full transition-colors ${danger ? 'hover:bg-[#fce8e6] text-[#5f6368] hover:text-[#c5221f]' : 'hover:bg-[#e8f0fe] text-[#5f6368] hover:text-[#1a73e8]'}`}>
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">{children}</svg>
    </button>
  )
}

export function EmptySection({ message }) {
  return <div className="text-center py-20 text-[#5f6368] text-sm">{message}</div>
}
