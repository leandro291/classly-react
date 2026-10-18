import { useState } from 'react'
import FormField from '../../../../common/components/FormField'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginUser, registerUser } from '../services/authService'
import Logo from '../../../../common/components/Logo'
import Button from '../../../../common/components/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
    telephone: '',
    rol: 'student',
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        const userInfo = await loginUser(form.email, form.password)
        login(userInfo)
      } else {
        const userInfo = await registerUser(form)
        login(userInfo)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Logo size={40} />
            <span className="font-display text-3xl font-medium text-ink">
              Classly
            </span>
          </div>
          <p className="text-ink-muted text-sm">Tu aula virtual</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6">
            <h2 className="font-display text-xl font-normal text-ink mb-1">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>
            <p className="text-sm text-ink-muted mb-6">
              {mode === 'login' ? 'Usa tu cuenta de Classly' : 'Únete a Classly'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'register' && (
                <>
                  <div className="flex gap-3">
                    <FormField label="Nombre" value={form.first_name} onChange={v => update('first_name', v)} />
                    <FormField label="Apellido" value={form.last_name} onChange={v => update('last_name', v)} />
                  </div>
                  <FormField label="Usuario" value={form.username} onChange={v => update('username', v)} />
                  <FormField label="Teléfono" value={form.telephone} onChange={v => update('telephone', v)} type="tel" />
                </>
              )}

              <FormField label="Correo electrónico" value={form.email} onChange={v => update('email', v)} type="email" />
              <FormField label="Contraseña" value={form.password} onChange={v => update('password', v)} type="password" />

              {mode === 'register' && (
                <div>
                  <label className="block text-xs text-ink-muted mb-1 font-medium">Rol</label>
                  <div className="flex gap-3">
                    {['student', 'teacher'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => update('rol', r)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                          form.rol === r
                            ? 'border-brand bg-brand-tint text-brand-dark'
                            : 'border-field-line text-ink-muted hover:border-brand'
                        }`}
                      >
                        {r === 'student' ? 'Estudiante' : 'Profesor'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-danger-tint text-danger-text text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" disabled={loading} className="mt-2">
                {loading ? 'Cargando…' : mode === 'login' ? 'Siguiente' : 'Crear cuenta'}
              </Button>
            </form>
          </div>

          <div className="bg-surface-subtle px-5 sm:px-8 py-4 border-t border-hairline text-center">
            {mode === 'login' ? (
              <p className="text-sm text-ink-muted">
                ¿No tienes cuenta?{' '}
                <button onClick={() => { setMode('register'); setError('') }} className="text-brand font-medium hover:underline">
                  Regístrate
                </button>
              </p>
            ) : (
              <p className="text-sm text-ink-muted">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => { setMode('login'); setError('') }} className="text-brand font-medium hover:underline">
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
