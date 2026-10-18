import { useState } from 'react'
import useAction from '../../../../common/hooks/useAction'
import { ModalWrapper, FormField, ModalActions } from './primitives'

export default function CourseFormModal({ course, onSave, onClose }) {
  const [name, setName] = useState(course?.name ?? '')
  const [description, setDescription] = useState(course?.description ?? '')
  const [period, setPeriod] = useState(course?.period ?? '')
  const { run, pending, error } = useAction()

  return (
    <ModalWrapper title={course ? 'Editar clase' : 'Crear clase'} onClose={onClose}>
      <form onSubmit={e => { e.preventDefault(); run(() => onSave({ name, description, period })) }} className="flex flex-col gap-4">
        <FormField label="Nombre de la clase" value={name} onChange={setName} required />
        <FormField label="Sección / Periodo (ej: 2024-I)" value={period} onChange={setPeriod} required />
        <FormField label="Descripción (opcional)" value={description} onChange={setDescription} multiline />
        <ModalActions onClose={onClose} label={course ? 'Guardar' : 'Crear'} disabled={!name.trim() || !period.trim()} pending={pending} error={error} />
      </form>
    </ModalWrapper>
  )
}
