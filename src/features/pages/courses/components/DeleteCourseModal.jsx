export default function DeleteCourseModal({ course, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-normal text-[#202124] mb-2">
          ¿Eliminar clase?
        </h2>
        <p className="text-sm text-[#5f6368] mb-6">
          Se eliminará <strong>"{course.name}"</strong> junto con todo su material y tareas. Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#1a73e8] hover:bg-[#e8f0fe] rounded-lg transition-colors font-medium">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-5 py-2 text-sm bg-[#d93025] hover:bg-[#b31412] text-white rounded-lg transition-colors font-medium">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
