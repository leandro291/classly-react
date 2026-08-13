import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import { FileChip } from './primitives'
import NavBar from './NavBar'

export default function MaterialPage({ material, course, color, onBack }) {
  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      <NavBar onBack={onBack} title={material.title} />
      <div className="h-3 w-full" style={{ backgroundColor: color }} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-[#e8eaed] overflow-hidden mb-6">
          <div className="px-6 py-6 border-b border-[#e8eaed]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fce8e6] flex items-center justify-center shrink-0">
                <svg width="24" height="24" fill="#d93025" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-medium text-[#202124]">{material.title}</h1>
                <p className="text-xs text-[#5f6368] mt-1">{`${course.teacher.first_name} ${course.teacher.last_name}`.trim()} · {formatDate(material.created_at)}</p>
              </div>
            </div>
          </div>
          {material.description && (
            <div className="px-6 py-5">
              <p className="text-sm text-[#202124] leading-relaxed">{material.description}</p>
            </div>
          )}
        </div>

        {material.archivo_materials.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[#5f6368] uppercase tracking-wide mb-3 px-1">Archivos adjuntos</p>
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
