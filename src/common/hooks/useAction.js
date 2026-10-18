import { useRef, useState } from 'react'

const OFFLINE = /fetch|network|load failed/i

export default function useAction() {
  const busy = useRef(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  async function run(fn) {
    if (busy.current) return false
    busy.current = true
    setPending(true)
    setError(null)
    try {
      await fn()
      return true
    } catch (err) {
      // fetch sin red lanza TypeError con mensaje en inglés
      const offline = err instanceof TypeError && OFFLINE.test(err.message)
      setError(offline ? 'Sin conexión. Revisa tu red e inténtalo de nuevo.' : err?.message || 'No se pudo completar la acción. Inténtalo de nuevo.')
      return false
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  return { run, pending, error }
}
