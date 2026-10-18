import JoinCodeForm from './JoinCodeForm'
import Button from '../../../../common/components/Button'
import Board from '../../../../common/components/Board'
import { ChalkPlus, ChalkSlots, ChalkUnderline } from '../../../../common/components/Chalk'

export function TeacherEmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center py-10 sm:py-16 px-4">
      <Board chalk className="w-full max-w-md rounded-xl overflow-hidden px-6 pt-9 pb-12 flex flex-col items-center text-center">
        <ChalkPlus className="mb-4" />
        <h2 className="font-display text-3xl font-medium text-balance">Crea tu primera clase</h2>
        <ChalkUnderline className="w-40 mt-1" />
      </Board>
      <p className="text-ink-muted text-sm text-center max-w-xs mt-6 mb-5">
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
    <div className="flex flex-col items-center py-10 sm:py-16 px-4">
      <Board chalk className="w-full max-w-md rounded-xl overflow-hidden px-6 pt-9 pb-12 flex flex-col items-center text-center">
        <ChalkSlots className="mb-5 max-w-full" />
        <h2 className="font-display text-3xl font-medium text-balance">Únete a tu primera clase</h2>
        <ChalkUnderline className="w-40 mt-1" />
      </Board>
      <p className="text-ink-muted text-sm text-center max-w-xs mt-6 mb-6">
        Pide el código de la clase a tu profesor y escríbelo aquí.
      </p>
      <div className="w-full max-w-xs"><JoinCodeForm onJoin={onJoin} /></div>
    </div>
  )
}
