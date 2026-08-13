import { ModalWrapper } from './primitives'

export default function DeleteModal({ label, onConfirm, onClose }) {
  return (
    <ModalWrapper title="Confirmar eliminación" onClose={onClose}>
      <p className="text-sm text-[#5f6368] mb-6">{label} Esta acción no se puede deshacer.</p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">Cancelar</button>
        <button onClick={onConfirm} className="px-5 py-2 text-sm bg-[#d93025] hover:bg-[#b31412] text-white rounded-lg transition-colors font-medium">Eliminar</button>
      </div>
    </ModalWrapper>
  )
}
