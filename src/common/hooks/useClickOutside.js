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
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [])

  return ref
}
