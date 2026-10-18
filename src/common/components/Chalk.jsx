import { useId } from 'react'

// Trazos de tiza: contorno blanco con borde irregular (feDisplacementMap). Decorativos; el texto de la pizarra lleva el significado.
function Chalk({ width, height, className = '', children }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true" className={className}>
      <filter id={id} x="-5%" y="-40%" width="110%" height="180%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
      </filter>
      <g filter={`url(#${id})`} stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{children}</g>
    </svg>
  )
}

// Subrayado que se dibuja una vez al montar (.chalk-draw en index.css)
export function ChalkUnderline({ className }) {
  return (
    <Chalk width={200} height={14} className={className}>
      <path d="M4 9C40 3 80 12 120 6S185 5 196 8" pathLength="1" className="chalk-draw" />
    </Chalk>
  )
}

export function ChalkPlus({ className }) {
  return (
    <Chalk width={64} height={64} className={className}>
      <path d="M32 6C48 5 59 17 58 32C57 48 46 59 31 58C16 57 5 46 6 31C7 17 17 7 32 6Z" />
      <path d="M32 20V44M20 32H44" />
    </Chalk>
  )
}

// Ocho casillas: el largo del código de clase
export function ChalkSlots({ className }) {
  return (
    <Chalk width={320} height={30} className={className}>
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${6 + i * 39} ${i % 2 ? 22 : 20}H${32 + i * 39}`} />
      ))}
    </Chalk>
  )
}
