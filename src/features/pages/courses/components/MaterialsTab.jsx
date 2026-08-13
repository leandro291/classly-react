import formatDate from '../../../../common/utils/formatDate'
import { EmptySection, IconBtn } from './primitives'

export default function MaterialsTab({ materials, isTeacher, onOpen, onEdit, onDelete, onCreate }) {
  return (
    <div className="flex flex-col gap-4">
      {isTeacher && (
        <div className="flex justify-end">
          <button onClick={onCreate} className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            Nuevo material
          </button>
        </div>
      )}
      {materials.length === 0 ? (
        <EmptySection message={isTeacher ? 'Aún no has publicado material. Haz clic en "Nuevo material" para empezar.' : 'No hay material publicado aún.'} />
      ) : (
        <div className="flex flex-col gap-3">
          {materials.map(m => (
            <div key={m.id} className="bg-white rounded-xl border border-[#e8eaed] p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fce8e6] flex items-center justify-center shrink-0 cursor-pointer" onClick={() => onOpen(m)}>
                  <svg width="20" height="20" fill="#d93025" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpen(m)}>
                  <h3 className="text-sm font-medium text-[#202124]">{m.title}</h3>
                  {m.description && <p className="text-xs text-[#5f6368] mt-0.5 line-clamp-1">{m.description}</p>}
                  <p className="text-xs text-[#80868b] mt-1">{formatDate(m.created_at)} · {m.archivo_materials.length} archivo{m.archivo_materials.length !== 1 ? 's' : ''}</p>
                </div>
                {isTeacher ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <IconBtn title="Editar" onClick={() => onEdit(m)}>
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </IconBtn>
                    <IconBtn title="Eliminar" onClick={() => onDelete(m)} danger>
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </IconBtn>
                  </div>
                ) : (
                  <svg width="16" height="16" fill="#bdc1c6" viewBox="0 0 24 24" className="shrink-0 mt-1 cursor-pointer" onClick={() => onOpen(m)}><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
