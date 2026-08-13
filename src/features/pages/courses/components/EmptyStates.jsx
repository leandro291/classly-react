import { useState } from 'react'

export function TeacherEmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" fill="#e8f0fe"/>
          <rect x="28" y="36" width="64" height="48" rx="6" fill="#1a73e8"/>
          <rect x="36" y="28" width="48" height="36" rx="4" fill="white"/>
          <rect x="44" y="36" width="32" height="3" rx="1.5" fill="#1a73e8" opacity="0.4"/>
          <rect x="44" y="43" width="24" height="3" rx="1.5" fill="#1a73e8" opacity="0.3"/>
          <rect x="44" y="50" width="28" height="3" rx="1.5" fill="#1a73e8" opacity="0.3"/>
          <circle cx="60" cy="78" r="10" fill="white"/>
          <path d="M55 78h10M60 73v10" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-2xl font-normal text-[#202124] mb-2 text-center">
        Crea tu primera clase
      </h2>
      <p className="text-[#5f6368] text-sm text-center max-w-xs mb-6">
        Haz clic en <strong>+</strong> para crear una clase y empezar a publicar material y tareas.
      </p>
      <button onClick={onCreate} className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
        Crear clase
      </button>
    </div>
  )
}

export function EmptyState({ onJoin }) {
  const [code, setCode] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = code.trim()
    if (trimmed.length === 8) onJoin(trimmed)
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" fill="#e8f0fe"/>
          <rect x="30" y="38" width="60" height="44" rx="6" fill="#1a73e8"/>
          <rect x="38" y="30" width="44" height="32" rx="4" fill="white"/>
          <rect x="46" y="38" width="28" height="3" rx="1.5" fill="#1a73e8" opacity="0.4"/>
          <rect x="46" y="44" width="20" height="3" rx="1.5" fill="#1a73e8" opacity="0.3"/>
          <rect x="46" y="50" width="24" height="3" rx="1.5" fill="#1a73e8" opacity="0.3"/>
          <circle cx="60" cy="75" r="8" fill="white"/>
          <path d="M57 75l2 2 4-4" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-2xl font-normal text-[#202124] mb-2 text-center">
        Únete a tu primera clase
      </h2>
      <p className="text-[#5f6368] text-sm text-center max-w-xs mb-8">
        Ingresa el código de 8 caracteres que te compartió tu profesor.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xs">
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.slice(0, 8))}
          placeholder="Sw97QYlQ"
          maxLength={8}
          className="flex-1 border border-[#dadce0] rounded-lg px-4 py-3 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all tracking-[0.25em] text-center font-medium bg-white"
          autoFocus
        />
        <button
          type="submit"
          disabled={code.trim().length !== 8}
          className="bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-5 rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          Unirse
        </button>
      </form>
    </div>
  )
}
