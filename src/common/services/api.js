const ACCESS_KEY = 'classly_access'
const REFRESH_KEY = 'classly_refresh'
const USER_KEY = 'classly_user'

export const getBase = () => (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export const fileUrl = file => (file && /^https?:\/\//.test(file) ? file : `${getBase()}${file}`)

const authHeaders = () => {
  const token = localStorage.getItem(ACCESS_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse(res, fallback) {
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const msg =
      data && typeof data.detail === 'string' ? data.detail
      : Array.isArray(data) ? data[0]
      : data && typeof data === 'object' ? Object.values(data).flat().join(' ')
      : null
    throw new Error(msg || fallback)
  }
  return data
}

export function saveTokens(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access)
  localStorage.setItem(REFRESH_KEY, refresh)
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isLoggedIn() {
  return !!localStorage.getItem(ACCESS_KEY)
}

// Auth

export async function login(email, password) {
  const res = await fetch(`${getBase()}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.')
  return res.json()
}

export async function register(data) {
  const res = await fetch(`${getBase()}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = Object.values(err).flat().join(' ') || 'Error al registrar usuario.'
    throw new Error(msg)
  }
  return res.json()
}

// Courses

export async function getCourses() {
  const res = await fetch(`${getBase()}/api/course/`, { headers: { ...authHeaders() } })
  return handleResponse(res, 'Error al cargar cursos')
}

export async function createCourse(data) {
  const res = await fetch(`${getBase()}/api/course/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  return handleResponse(res, 'Error al crear curso')
}

export async function updateCourse(id, data) {
  const res = await fetch(`${getBase()}/api/course/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  return handleResponse(res, 'Error al actualizar el curso')
}

export async function deleteCourse(id) {
  const res = await fetch(`${getBase()}/api/course/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Error al eliminar el curso')
}

export async function joinCourse(registration_code) {
  const res = await fetch(`${getBase()}/api/course/join/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ registration_code }),
  })
  if (!res.ok) throw new Error('Código inválido o ya estás inscrito en este curso.')
  return res.json()
}

// Materials

export async function getMaterials(courseId) {
  const res = await fetch(`${getBase()}/api/course/${courseId}/material/`, { headers: { ...authHeaders() } })
  return handleResponse(res, 'Error al cargar material')
}

export async function createMaterial(courseId, { title, description, files = [] }) {
  const form = new FormData()
  form.append('title', title)
  if (description) form.append('description', description)
  files.forEach(f => form.append('archivos', f))
  const res = await fetch(`${getBase()}/api/course/${courseId}/material/`, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al publicar material')
}

export async function updateMaterial(id, { title, description, files = [] }) {
  const form = new FormData()
  form.append('title', title)
  if (description) form.append('description', description)
  files.forEach(f => form.append('archivos', f))
  const res = await fetch(`${getBase()}/api/material/${id}/`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al actualizar material')
}

export async function deleteMaterial(id) {
  const res = await fetch(`${getBase()}/api/material/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Error al eliminar material')
}

// Tareas

export async function getTareas(courseId) {
  const res = await fetch(`${getBase()}/api/course/${courseId}/tarea/`, { headers: { ...authHeaders() } })
  return handleResponse(res, 'Error al cargar tareas')
}

export async function createTarea(courseId, { title, description, due_date, max_score, file }) {
  const form = new FormData()
  form.append('title', title)
  form.append('description', description)
  form.append('due_date', due_date)
  form.append('max_score', max_score)
  if (file) form.append('file_upload', file)
  const res = await fetch(`${getBase()}/api/course/${courseId}/tarea/`, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al publicar tarea')
}

export async function updateTarea(id, { title, description, due_date, max_score, file }) {
  const form = new FormData()
  form.append('title', title)
  form.append('description', description)
  form.append('due_date', due_date)
  form.append('max_score', max_score)
  if (file) form.append('file_upload', file)
  const res = await fetch(`${getBase()}/api/tarea/${id}/`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al actualizar tarea')
}

export async function deleteTarea(id) {
  const res = await fetch(`${getBase()}/api/tarea/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Error al eliminar tarea')
}

// Entregas

export async function getEntregas(tareaId) {
  const res = await fetch(`${getBase()}/api/tarea/${tareaId}/entrega/`, { headers: { ...authHeaders() } })
  return handleResponse(res, 'Error al cargar entregas')
}

export async function createEntrega(tareaId, { student_comment, files = [] }) {
  const form = new FormData()
  if (student_comment) form.append('student_comment', student_comment)
  files.forEach(f => form.append('file_upload', f))
  const res = await fetch(`${getBase()}/api/tarea/${tareaId}/entrega/`, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al entregar la tarea')
}

export async function updateEntrega(id, { student_comment, files = [] }) {
  const form = new FormData()
  if (student_comment !== undefined) form.append('student_comment', student_comment)
  files.forEach(f => form.append('file_upload', f))
  const res = await fetch(`${getBase()}/api/entrega/${id}/`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
    body: form,
  })
  return handleResponse(res, 'Error al actualizar la entrega')
}

export async function deleteEntrega(id) {
  const res = await fetch(`${getBase()}/api/entrega/${id}/`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Error al retirar la entrega')
}

export async function gradeEntrega(id, { score, teacher_comment }) {
  const res = await fetch(`${getBase()}/api/entrega/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ score, teacher_comment }),
  })
  return handleResponse(res, 'Error al guardar la nota')
}
