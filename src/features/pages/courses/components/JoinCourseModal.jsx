import { useState } from 'react'

export default function JoinCourseModal({ onClose, onJoined }) {
  const [code, setCode] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (code.trim()) onJoined(code.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-normal text-[#202124] mb-1">
          Unirse a clase
        </h2>
        <p className="text-sm text-[#5f6368] mb-5">
          Pide el código a tu profesor. El código tiene 6 caracteres, como <strong>MAT001</strong>.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="Código de clase"
            className="w-full border border-[#dadce0] rounded-lg px-4 py-3 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all tracking-widest uppercase"
            autoFocus
          />
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!code.trim()}
              className="px-6 py-2 text-sm bg-[#1a73e8] text-white rounded-lg hover:bg-[#1557b0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Unirse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
