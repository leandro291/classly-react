import JoinCodeForm from './JoinCodeForm'
import Button from '../../../../common/components/Button'

export function TeacherEmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" fill="var(--color-brand-tint)"/>
          <rect x="28" y="36" width="64" height="48" rx="6" fill="var(--color-brand)"/>
          <rect x="36" y="28" width="48" height="36" rx="4" fill="white"/>
          <rect x="44" y="36" width="32" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.4"/>
          <rect x="44" y="43" width="24" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.3"/>
          <rect x="44" y="50" width="28" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.3"/>
          <circle cx="60" cy="78" r="10" fill="white"/>
          <path d="M55 78h10M60 73v10" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="font-display text-2xl font-normal text-ink mb-2 text-center text-balance">
        Crea tu primera clase
      </h2>
      <p className="text-ink-muted text-sm text-center max-w-xs mb-6">
        Haz clic en <strong>+</strong> para crear una clase y empezar a publicar material y tareas.
      </p>
      <Button size="lg" onClick={onCreate}>
        Crear clase
      </Button>
    </div>
  )
}

export function EmptyState({ onJoin }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" fill="var(--color-brand-tint)"/>
          <rect x="30" y="38" width="60" height="44" rx="6" fill="var(--color-brand)"/>
          <rect x="38" y="30" width="44" height="32" rx="4" fill="white"/>
          <rect x="46" y="38" width="28" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.4"/>
          <rect x="46" y="44" width="20" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.3"/>
          <rect x="46" y="50" width="24" height="3" rx="1.5" fill="var(--color-brand)" opacity="0.3"/>
          <circle cx="60" cy="75" r="8" fill="white"/>
          <path d="M57 75l2 2 4-4" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="font-display text-2xl font-normal text-ink mb-2 text-center text-balance">
        Únete a tu primera clase
      </h2>
      <p className="text-ink-muted text-sm text-center max-w-xs mb-8">
        Pide el código de la clase a tu profesor y escríbelo aquí.
      </p>
      <div className="w-full max-w-xs"><JoinCodeForm onJoin={onJoin} /></div>
    </div>
  )
}
