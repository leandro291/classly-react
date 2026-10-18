import { useId, useState } from 'react'
import useAction from '../../../../common/hooks/useAction'
import { CODE_LENGTH } from '../utils/constants'
import { FormError } from './primitives'
import Button from '../../../../common/components/Button'

export default function JoinCodeForm({ onJoin, onCancel }) {
  const [code, setCode] = useState('')
  const { run, pending, error } = useAction()
  const hintId = useId()

  function handleSubmit(e) {
    e.preventDefault()
    if (code.length === CODE_LENGTH) run(() => onJoin(code))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        value={code}
        onChange={e => setCode(e.target.value.replace(/\s/g, '').slice(0, CODE_LENGTH))}
        placeholder="Sw97QYlQ"
        aria-label="Código de clase"
        aria-describedby={hintId}
        autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false}
        className="w-full border border-field-border rounded-lg px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all tracking-[0.25em] text-center font-medium font-mono bg-white"
      />
      <p id={hintId} className="text-xs text-ink-muted">
        {code.length}/{CODE_LENGTH} · Son letras y números; distingue mayúsculas de minúsculas.
      </p>
      <FormError error={error} />
      <div className="flex justify-end gap-2 pt-1">
        {onCancel && (
          <Button variant="text" size="sm" onClick={onCancel}>Cancelar</Button>
        )}
        <Button type="submit" size="lg" disabled={code.length !== CODE_LENGTH || pending} className={onCancel ? '' : 'w-full'}>
          {pending ? 'Uniéndote…' : 'Unirse a la clase'}
        </Button>
      </div>
    </form>
  )
}
