---
target: panel de clases (Dashboard) y vista de entrega (TaskPage)
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:/home/lenadro29/Escritorio/refac/classly/classly-react/src/features/pages/courses"
timestamp: 2026-10-18T15-54-17Z
slug: src-features-pages-courses
---
Method: dual-agent (A: design review · B: detector). Sin navegador (backend autenticado, sin credenciales): juzgado desde el codigo.

## Design Health Score (21/40, Aceptable)
1 Visibilidad de estado 2 (entrega optimista) | 2 Lenguaje real 3 | 3 Control y libertad 2 (sin Esc, Atras sale de la clase) | 4 Consistencia 2 (chips distintos entre lista y detalle) | 5 Prevencion de errores 2 | 6 Reconocimiento 3 | 7 Flexibilidad 2 | 8 Estetica minimalista 3 | 9 Recuperacion de errores 1 | 10 Ayuda 1

## Design Specificity Verdict
Pasa por mandato del brief (replica fiel de Classroom), floja en caracter propio. Detector: 17 avisos advisory design-system-font-size, 8 reales (TeacherSubmissionList 10/11px, CourseCard.jsx:56), 9 falsos positivos (etiqueta flotante de 10px documentada). La revision ademas vio uppercase tracking-wide, font-bold y #f29900 como texto, contra DESIGN.md.

## Priority Issues
- [P0] Entregar miente cuando falla y no se recupera (TaskPage.jsx:121, CourseDetail.jsx:191-193). harden
- [P1] Fecha limite y estado no estan donde se decide; chips discrepan; iconos inertes en CourseCard.jsx:72-82; Math.ceil hace inalcanzable "Hoy". clarify
- [P1] Entrada a clase: 6 caracteres (JoinCourseModal.jsx:19) contra 8 (EmptyStates.jsx:58); toUpperCase; slice antes de trim; getCourses fallido muestra estado vacio. clarify
- [P1] Navegacion movil pierde el trabajo: view y tab en estado local, F5 redirige, formulario antes que la consigna. adapt
- [P2] Calificar: parseInt acepta decimales pero step=1 los bloquea; un modal por alumno; "Pendientes" ambiguo. harden

## Persona Red Flags
Casey: pierde comentario y archivos con Atras, sin comprobante, check verde ante fallo. Jordan: iconos inertes, "+" y avatar sin etiqueta, vacio falso si falla la carga. Alex: un modal por alumno, sin Esc ni Siguiente. Camila (estudiante peruana en celular): codigo de WhatsApp con espacios, sin hora en la fecha limite.

## Minor Observations
Insignia Inactivo es codigo muerto; color de curso por posicion; FileChip rojo por defecto; EditEntregaModal no muestra archivos actuales; modal de eliminar dice "no se puede deshacer" con soft-delete.

## Questions
Entrar a la clase en "Por hacer"? Que recibo merece la entrega? Nota con decimales? Calificar como cola?
