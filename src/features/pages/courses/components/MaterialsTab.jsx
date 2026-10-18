import formatDate from '../../../../common/utils/formatDate'
import { EmptySection, IconBtn } from './primitives'
import Icon from '../../../../common/components/Icon'
import Button from '../../../../common/components/Button'

export default function MaterialsTab({ materials, isTeacher, onOpen, onEdit, onDelete, onCreate }) {
  return (
    <div className="flex flex-col gap-4">
      {isTeacher && (
        <div className="flex justify-end">
          <Button size="lg" onClick={onCreate} className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <Icon name="add" size={18} className="text-white" />
            Nuevo material
          </Button>
        </div>
      )}
      {materials.length === 0 ? (
        <EmptySection message={isTeacher ? 'Aún no has publicado material. Haz clic en "Nuevo material" para empezar.' : 'No hay material publicado aún.'} />
      ) : (
        <div className="flex flex-col gap-3">
          {materials.map(m => (
            <div key={m.id} className="bg-white rounded-xl border border-hairline p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-danger-tint flex items-center justify-center shrink-0 cursor-pointer" onClick={() => onOpen(m)}>
                  <Icon name="doc" size={20} className="text-danger" />
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpen(m)}>
                  <h3 className="text-sm font-medium text-ink"><button type="button" className="text-left cursor-pointer [overflow-wrap:anywhere]">{m.title}</button></h3>
                  {m.description && <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">{m.description}</p>}
                  <p className="text-xs text-ink-muted mt-1">{formatDate(m.created_at)} · {m.archivo_materials.length} archivo{m.archivo_materials.length !== 1 ? 's' : ''}</p>
                </div>
                {isTeacher ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <IconBtn title="Editar" icon="edit" onClick={() => onEdit(m)} />
                    <IconBtn title="Eliminar" icon="trash" onClick={() => onDelete(m)} danger />
                  </div>
                ) : (
                  <svg width="16" height="16" fill="var(--color-field-border)" viewBox="0 0 24 24" className="shrink-0 mt-1 cursor-pointer" onClick={() => onOpen(m)}><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
