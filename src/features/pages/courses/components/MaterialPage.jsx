import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import { FileChip } from './primitives'
import NavBar from './NavBar'
import Icon from '../../../../common/components/Icon'

export default function MaterialPage({ material, course, color, onBack }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <NavBar onBack={onBack} title={material.title} />
      <div className="h-3 w-full" style={{ backgroundColor: color }} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-hairline overflow-hidden mb-6">
          <div className="px-6 py-6 border-b border-hairline">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-danger-tint flex items-center justify-center shrink-0">
                <Icon name="doc" size={24} className="text-danger" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-xl font-medium text-ink text-balance [overflow-wrap:anywhere]">{material.title}</h1>
                <p className="text-xs text-ink-muted mt-1">{`${course.teacher.first_name} ${course.teacher.last_name}`.trim()} · {formatDate(material.created_at)}</p>
              </div>
            </div>
          </div>
          {material.description && (
            <div className="px-6 py-5">
              <p className="text-base text-ink leading-relaxed whitespace-pre-line [overflow-wrap:anywhere] text-pretty">{material.description}</p>
            </div>
          )}
        </div>

        {material.archivo_materials.length > 0 && (
          <div>
            <p className="text-sm font-medium text-ink-muted mb-3 px-1">Archivos adjuntos</p>
            <div className="flex flex-col gap-2">
              {material.archivo_materials.map(a => (
                <FileChip key={a.id} name={a.file} href={fileUrl(a.file)} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
