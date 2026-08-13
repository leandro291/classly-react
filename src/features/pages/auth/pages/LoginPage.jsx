import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginUser, registerUser } from '../services/authService'

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
    <div className="min-h-screen bg-[#f1f3f4] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#1a73e8"/>
              <path d="M10 28V14l10-6 10 6v14l-10 4-10-4z" fill="white" opacity="0.9"/>
              <rect x="15" y="19" width="10" height="9" fill="#1a73e8"/>
              <rect x="17" y="14" width="6" height="5" rx="1" fill="white"/>
            </svg>
            <span style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-3xl font-medium text-[#202124]">
              Classly
            </span>
          </div>
          <p className="text-[#5f6368] text-sm">Tu aula virtual</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6">
            <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-normal text-[#202124] mb-1">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>
            <p className="text-sm text-[#5f6368] mb-6">
              {mode === 'login' ? 'Usa tu cuenta de Classly' : 'Únete a Classly'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === 'register' && (
                <>
                  <div className="flex gap-3">
                    <Field label="Nombre" value={form.first_name} onChange={v => update('first_name', v)} />
                    <Field label="Apellido" value={form.last_name} onChange={v => update('last_name', v)} />
                  </div>
                  <Field label="Usuario" value={form.username} onChange={v => update('username', v)} />
                  <Field label="Teléfono" value={form.telephone} onChange={v => update('telephone', v)} type="tel" />
                </>
              )}

              <Field label="Correo electrónico" value={form.email} onChange={v => update('email', v)} type="email" />
              <Field label="Contraseña" value={form.password} onChange={v => update('password', v)} type="password" />

              {mode === 'register' && (
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1 font-medium">Rol</label>
                  <div className="flex gap-3">
                    {['student', 'teacher'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => update('rol', r)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                          form.rol === r
                            ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]'
                            : 'border-[#dadce0] text-[#5f6368] hover:border-[#1a73e8]'
                        }`}
                      >
                        {r === 'student' ? 'Estudiante' : 'Profesor'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-[#fce8e6] text-[#c5221f] text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                {loading ? 'Cargando…' : mode === 'login' ? 'Siguiente' : 'Crear cuenta'}
              </button>
            </form>
          </div>

          <div className="bg-[#f8f9fa] px-5 sm:px-8 py-4 border-t border-[#e8eaed] text-center">
            {mode === 'login' ? (
              <p className="text-sm text-[#5f6368]">
                ¿No tienes cuenta?{' '}
                <button onClick={() => { setMode('register'); setError('') }} className="text-[#1a73e8] font-medium hover:underline">
                  Regístrate
                </button>
              </p>
            ) : (
              <p className="text-sm text-[#5f6368]">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => { setMode('login'); setError('') }} className="text-[#1a73e8] font-medium hover:underline">
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

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full border border-[#dadce0] rounded-lg px-3 pt-5 pb-2 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
      />
      <label className="absolute left-3 top-1.5 text-[10px] text-[#5f6368] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#1a73e8] transition-all pointer-events-none">
        {label}
      </label>
    </div>
  )
}
