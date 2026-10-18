// El pizarrón: bloque de color con repisa de tiza abajo. Es la única superficie expresiva del sistema (DESIGN.md · Pizarrón).
// Sin overflow-hidden propio: quien lo redondea lo recorta, y los menús de la tarjeta no se cortan.
export default function Board({ color = 'var(--color-course-green)', chalk, className = '', children, ...props }) {
  return (
    <div className={`relative text-white ${className}`} style={{ backgroundColor: color }} {...props}>
      {children}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-black/20" />
      {chalk && <div aria-hidden="true" className="absolute bottom-[1px] right-[14%] h-1 w-7 rounded-full bg-white" />}
    </div>
  )
}
