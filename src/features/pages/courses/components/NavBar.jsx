export default function NavBar({ onBack, title }) {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-4 gap-4 sticky top-0 z-30">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-[#f1f3f4] transition-colors">
        <svg width="20" height="20" fill="#5f6368" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
      <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#1a73e8"/>
          <path d="M10 28V14l10-6 10 6v14l-10 4-10-4z" fill="white" opacity="0.9"/>
          <rect x="15" y="19" width="10" height="9" fill="#1a73e8"/>
          <rect x="17" y="14" width="6" height="5" rx="1" fill="white"/>
        </svg>
        {title
          ? <span style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-base font-medium text-[#202124] truncate max-w-xs">{title}</span>
          : <span style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-medium text-[#202124] hidden sm:block">Classly</span>
        }
      </div>
    </header>
  )
}
