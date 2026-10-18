// tone="light": mosaico blanco con la casa en el color de pizarrón, para ir sobre un Board
export default function Logo({ size = 32, tone = 'brand' }) {
  const light = tone === 'light'
  const bg = light ? 'white' : 'var(--color-brand)'
  const fg = light ? 'var(--color-course-green)' : 'white'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="shrink-0" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill={bg} />
      <path d="M10 28V14l10-6 10 6v14l-10 4-10-4z" fill={fg} opacity="0.9" />
      <rect x="15" y="19" width="10" height="9" fill={bg} />
      <rect x="17" y="14" width="6" height="5" rx="1" fill={fg} />
    </svg>
  )
}
