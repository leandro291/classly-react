// Tonos con ≥5:1 contra texto blanco (cabecera de clase e iniciales de avatar)
export const CARD_COLORS = [
  'var(--color-course-green)', 'var(--color-course-blue)', 'var(--color-course-orange)', 'var(--color-course-purple)',
  'var(--color-course-teal)', 'var(--color-course-red)', 'var(--color-course-amber)', 'var(--color-course-pink)',
]

// Color por id, no por posición: la clase conserva su color al recargar, borrar o agregar otras
export const courseColor = course => CARD_COLORS[course.id % CARD_COLORS.length]

export const CODE_LENGTH = 8

// Verde solo para "entregado a tiempo"; el retraso es una advertencia, no un error
export const ENTREGA_STATUS = {
  a_tiempo: { label: 'A tiempo', chip: 'bg-success-tint text-success-text', text: 'text-success-text' },
  tardia: { label: 'Con retraso', chip: 'bg-warning-tint text-warning-text', text: 'text-warning-text' },
}

export const AVATAR_COLORS = CARD_COLORS
