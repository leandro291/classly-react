import { ModalWrapper } from './primitives'

export default function DeleteEntregaModal({ onConfirm, onClose }) {
  return (
    <ModalWrapper title="¿Retirar entrega?" onClose={onClose}>
      <p className="text-sm text-[#5f6368] mb-6">
        Tu entrega será eliminada. Podrás volver a entregar si la tarea no ha vencido.
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">Cancelar</button>
        <button onClick={onConfirm} className="px-5 py-2 text-sm bg-[#d93025] hover:bg-[#b31412] text-white rounded-lg transition-colors font-medium">Retirar</button>
      </div>
    </ModalWrapper>
  )
}
