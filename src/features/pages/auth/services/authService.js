import { login, register, saveTokens } from '../../../../common/services/api'

export async function loginUser(email, password) {
  const { access, refresh } = await login(email, password)
  saveTokens(access, refresh)
  let userInfo
  try {
    const payload = JSON.parse(atob(access.split('.')[1]))
    userInfo = {
      id: payload.user_id,
      first_name: payload.first_name || email.split('@')[0],
      last_name: payload.last_name || '',
      email,
      rol: payload.rol || 'student',
      username: payload.username || email,
    }
  } catch {
    userInfo = { id: 0, first_name: email.split('@')[0], last_name: '', email, rol: 'student', username: email }
  }
  return userInfo
}

export async function registerUser(data) {
  const regUser = await register(data)
  await loginUser(data.email, data.password)
  return {
    id: regUser.id,
    first_name: regUser.first_name,
    last_name: regUser.last_name,
    email: regUser.email,
    rol: regUser.rol,
    username: regUser.username,
  }
}
