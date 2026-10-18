const DAY = 24 * 60 * 60 * 1000

// El backend manda due_date como 'YYYY-MM-DD'; new Date() lo toma como UTC y en Perú mostraría el día anterior
export function parseDate(str) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str)
  return m ? new Date(+m[1], m[2] - 1, +m[3]) : new Date(str)
}

export default function formatDate(dateStr) {
  if (!dateStr) return ''
  return parseDate(dateStr).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
}

// La fecha límite cuenta completa: la tarea vence al terminar ese día
export function dueInfo(dateStr, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const days = Math.round((parseDate(dateStr) - today) / DAY)
  if (days < 0) return { label: 'Vencida', tone: 'late' }
  if (days === 0) return { label: 'Vence hoy', tone: 'soon' }
  if (days === 1) return { label: 'Vence mañana', tone: 'soon' }
  return { label: `Vence en ${days} días`, tone: days <= 3 ? 'soon' : 'ok' }
}
