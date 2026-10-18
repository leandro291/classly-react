import { useEffect, useRef } from 'react'

export default function useClickOutside(onClickOutside) {
  const ref = useRef(null)
  const handlerRef = useRef(onClickOutside)
  handlerRef.current = onClickOutside

  useEffect(() => {
    function listener(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handlerRef.current()
      }
    }
    const onKey = e => { if (e.key === 'Escape') handlerRef.current() }
    document.addEventListener('mousedown', listener)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return ref
}
