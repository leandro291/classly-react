import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, FormError } from './primitives'
import Button from '../../../../common/components/Button'

export default function DeleteModal({ title = 'Confirmar eliminación', confirmLabel = 'Eliminar', onConfirm, onClose, children }) {
  const { run, pending, error } = useAction()
  return (
    <ModalWrapper title={title} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <p className="text-sm text-ink-muted">{children}</p>
        <FormError error={error} />
        <div className="flex justify-end gap-2">
          <Button variant="text" size="sm" type="button" onClick={onClose}>Cancelar</Button>
          <button type="button" disabled={pending} onClick={() => run(onConfirm)} className="px-5 py-2 text-sm bg-danger hover:bg-danger-deep disabled:opacity-40 text-white rounded-lg transition-colors font-medium">{pending ? 'Procesando…' : confirmLabel}</button>
        </div>
      </div>
    </ModalWrapper>
  )
}
