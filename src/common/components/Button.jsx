const VARIANT = {
  primary: 'bg-brand hover:bg-brand-dark text-white',
  text: 'text-brand hover:bg-brand-tint hover:text-brand-dark',
}
const SIZE = { sm: 'px-4 py-2', md: 'px-6 py-2', lg: 'px-5 py-2.5' }

// type="button" por defecto: los envíos de formulario piden type="submit" de forma explícita
export default function Button({ variant = 'primary', size = 'md', type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...props}
    />
  )
}
