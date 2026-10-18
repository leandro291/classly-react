export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="shrink-0" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="var(--color-brand)" />
      <path d="M10 28V14l10-6 10 6v14l-10 4-10-4z" fill="white" opacity="0.9" />
      <rect x="15" y="19" width="10" height="9" fill="var(--color-brand)" />
      <rect x="17" y="14" width="6" height="5" rx="1" fill="white" />
    </svg>
  )
}
