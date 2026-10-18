import { useState } from 'react'
import FormField from '../../../../common/components/FormField'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginUser, registerUser } from '../services/authService'
import Logo from '../../../../common/components/Logo'
import Board from '../../../../common/components/Board'
import { ChalkUnderline } from '../../../../common/components/Chalk'
import Button from '../../../../common/components/Button'

// Cuentas de demostración creadas por `seed_demo` en el backend
const DEMO_PASSWORD = '123'
const DEMOS = [
  { email: 'profesor@example.com', label: 'Entrar como profesor' },
  { email: 'alumno@example.com', label: 'Entrar como alumno' },
]

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

  async function handleSubmit(e, demo) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (demo) {
        login(await loginUser(demo, DEMO_PASSWORD))
      } else if (mode === 'login') {
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
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[1fr_minmax(0,34rem)]">
      <Board chalk className="min-h-48 lg:min-h-dvh flex flex-col justify-end lg:justify-center px-6 pb-10 pt-8 lg:p-16">
        <div className="flex items-center gap-3">
          <Logo size={56} tone="light" />
          <span className="font-display text-5xl lg:text-8xl font-medium">Classly</span>
        </div>
        <ChalkUnderline className="mt-2 w-48 lg:w-[26rem]" />
        <p className="font-display text-xl lg:text-4xl mt-4 text-balance">Tu aula virtual</p>
        <p className="hidden lg:block text-base mt-6 max-w-sm text-balance">Material, tareas, entregas y notas de cada clase, en un solo lugar.</p>
      </Board>

      <div className="relative -mt-6 lg:mt-0 px-4 pb-8 lg:p-10 flex items-start lg:items-center justify-center">
      <div className="w-full max-w-sm">
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
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
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

            {mode === 'login' && (
              <div className="mt-5 pt-5 border-t border-hairline">
                <p className="text-xs text-ink-muted mb-3">¿Solo quieres ver cómo funciona? Prueba la demo:</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {DEMOS.map(d => (
                    <Button key={d.email} variant="text" disabled={loading}
                      onClick={e => handleSubmit(e, d.email)}
                      className="flex-1 border border-field-line">
                      {d.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface-subtle px-5 sm:px-8 py-4 border-t border-hairline text-center">
            {mode === 'login' ? (
              <p className="text-sm text-ink-muted">
                ¿No tienes cuenta?{' '}
                <button onClick={() => { setMode('register'); setError('') }} className="text-brand-dark font-medium hover:underline">
                  Regístrate
                </button>
              </p>
            ) : (
              <p className="text-sm text-ink-muted">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => { setMode('login'); setError('') }} className="text-brand-dark font-medium hover:underline">
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
