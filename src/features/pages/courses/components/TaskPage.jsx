import { useState, useRef } from 'react'
import formatDate from '../../../../common/utils/formatDate'
import { fileUrl } from '../../../../common/services/api'
import { FileChip } from './primitives'
import NavBar from './NavBar'
import TeacherSubmissionList from './TeacherSubmissionList'

export default function TaskPage({ tarea, course, color, isTeacher, entrega, studentEntregas, onBack, onSubmit, onGrade, onEditEntrega, onDeleteEntrega, children }) {
  const [student_comment, setComment] = useState(entrega?.student_comment ?? '')
  const [files, setFiles] = useState([])
  const [submitted, setSubmitted] = useState(!!entrega)
  const fileRef = useRef(null)

  const due = new Date(tarea.due_date)
  const now = new Date()
  const overdue = due < now
  const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-[#f1f3f4]">
      <NavBar onBack={onBack} title={tarea.title} />
      <div className="h-3 w-full" style={{ backgroundColor: color }} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        <div className="order-2 lg:order-1 flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#e8eaed] overflow-hidden">
            <div className="px-6 py-6 border-b border-[#e8eaed]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e8f0fe] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" fill="#1a73e8" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-xl font-medium text-[#202124]">{tarea.title}</h1>
                  <p className="text-xs text-[#5f6368] mt-1">{`${course.teacher.first_name} ${course.teacher.last_name}`.trim()} · {formatDate(tarea.created_at)}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-[#5f6368]">Entrega: <strong>{formatDate(tarea.due_date)}</strong></span>
                    <span className="text-xs text-[#5f6368]">·</span>
                    <span className="text-xs text-[#5f6368]">{tarea.max_score} puntos</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: overdue ? '#fce8e6' : daysLeft <= 3 ? '#fef7e0' : '#e6f4ea', color: overdue ? '#c5221f' : daysLeft <= 3 ? '#b06000' : '#1e8e3e' }}>
                      {overdue ? 'Vencida' : daysLeft === 0 ? 'Hoy' : daysLeft === 1 ? 'Mañana' : `${daysLeft} días`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-[#202124] leading-relaxed">{tarea.description}</p>
            </div>
          </div>

          {tarea.file && (
            <div>
              <p className="text-xs font-medium text-[#5f6368] uppercase tracking-wide mb-2 px-1">Archivo del profesor</p>
              <FileChip name={tarea.file} href={fileUrl(tarea.file)} accent="#1a73e8" bg="#e8f0fe" />
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-[#e8eaed] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e8eaed]">
              <h2 style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }} className="text-sm font-medium text-[#202124]">
                {isTeacher ? `Entregas (${studentEntregas.length})` : submitted ? 'Tu entrega' : 'Entregar tarea'}
              </h2>
            </div>
            <div className="px-5 py-5">
              {isTeacher ? (
                <TeacherSubmissionList entregas={studentEntregas} maxScore={tarea.max_score} onGrade={onGrade} />
              ) : submitted ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" fill="#1e8e3e" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      <span className="text-sm font-medium text-[#1e8e3e]">
                        {entrega?.status === 'tardia' ? 'Tardía' : 'A tiempo'}
                      </span>
                    </div>
                    {entrega && (
                      <div className="flex gap-1">
                        <button title="Editar entrega" onClick={onEditEntrega} className="p-1.5 rounded-full hover:bg-[#e8f0fe] text-[#5f6368] hover:text-[#1a73e8] transition-colors">
                          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>
                        <button title="Retirar entrega" onClick={onDeleteEntrega} className="p-1.5 rounded-full hover:bg-[#fce8e6] text-[#5f6368] hover:text-[#c5221f] transition-colors">
                          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {entrega && entrega.score !== null && entrega.score !== undefined && (
                    <div className="bg-[#e8f0fe] rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#1a73e8] font-medium mb-0.5">Calificación</p>
                        {entrega.teacher_comment && (
                          <p className="text-xs text-[#3c4043] mt-1">{entrega.teacher_comment}</p>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-[#1a73e8]">
                        {entrega.score}<span className="text-sm font-normal text-[#5f6368]">/{tarea.max_score}</span>
                      </span>
                    </div>
                  )}
                  {entrega && (entrega.score === null || entrega.score === undefined) && (
                    <div className="bg-[#fef7e0] rounded-xl px-4 py-3">
                      <p className="text-xs text-[#b06000] font-medium">Pendiente de calificación</p>
                    </div>
                  )}

                  {entrega?.student_comment && (
                    <p className="text-sm text-[#202124] bg-[#f1f3f4] rounded-xl px-3 py-2">
                      {entrega.student_comment}
                    </p>
                  )}
                  {(entrega?.files ?? []).map((f, i) => (
                    <a key={i} href={fileUrl(f)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#5f6368] bg-[#f1f3f4] rounded-lg px-3 py-2 hover:bg-[#e8f0fe] transition-colors no-underline">
                      <svg width="13" height="13" fill="#5f6368" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
                      <span className="truncate">{f}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); onSubmit(student_comment, files); setSubmitted(true) }} className="flex flex-col gap-3">
                  <textarea value={student_comment} onChange={e => setComment(e.target.value)} placeholder="Comentario para el profesor (opcional)" rows={3} className="w-full border border-[#dadce0] rounded-xl px-3 py-2.5 text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all resize-none" />
                  <input ref={fileRef} type="file" multiple className="hidden" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files)]) }} />
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 text-sm text-[#5f6368] border border-[#dadce0] rounded-xl px-3 py-2.5 hover:bg-[#f1f3f4] transition-colors">
                    <svg width="16" height="16" fill="#5f6368" viewBox="0 0 24 24"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
                    Adjuntar archivos
                  </button>
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 border border-[#dadce0] rounded-lg px-3 py-1.5 text-xs text-[#5f6368]">
                      <svg width="13" height="13" fill="#5f6368" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
                      <span className="flex-1 truncate">{f.name}</span>
                      <button type="button" onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))} className="hover:text-[#c5221f]">
                        <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                      </button>
                    </div>
                  ))}
                  <button type="submit" disabled={!student_comment.trim() && files.length === 0} className="w-full bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-colors text-sm">
                    Entregar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      {children}
    </div>
  )
}
