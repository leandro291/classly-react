import { ModalWrapper } from './primitives'
import JoinCodeForm from './JoinCodeForm'

export default function JoinCourseModal({ onClose, onJoined }) {
  return (
    <ModalWrapper title="Unirse a clase" onClose={onClose}>
      <p className="text-sm text-ink-muted mb-5">Pide el código de la clase a tu profesor.</p>
      <JoinCodeForm onJoin={onJoined} onCancel={onClose} />
    </ModalWrapper>
  )
}
