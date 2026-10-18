import Logo from '../../../../common/components/Logo'
export default function NavBar({ onBack, title }) {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-4 gap-4 sticky top-0 z-30">
      <button type="button" onClick={onBack} aria-label="Volver" className="press p-2 pointer-coarse:p-3 rounded-full hover:bg-canvas">
        <svg width="20" height="20" fill="var(--color-ink-muted)" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
      <div className="flex items-center gap-2 min-w-0">
        <Logo />
        {title
          ? <span className="font-display text-base font-medium text-ink truncate">{title}</span>
          : <span className="font-display text-xl font-medium text-ink hidden sm:block">Classly</span>
        }
      </div>
    </header>
  )
}
