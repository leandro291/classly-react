# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Profesores y estudiantes de un aula virtual, en español (es-PE). El profesor crea clases, publica material y tareas y califica entregas; el estudiante se une con un código de 8 caracteres, consulta material y entrega tareas. Hoy el proyecto es un portafolio/demo con usuarios de prueba, sin una institución real detrás.

## Product Purpose

Aula virtual que replica el flujo esencial de Google Classroom: clase por código, material, tareas con fecha límite, entrega con archivos y calificación. Éxito: un estudiante encuentra su tarea y la entrega, y un profesor revisa y califica, sin fricción. Como portafolio, también demuestra un stack completo (React + Django) funcionando de punta a punta.

## Positioning

Réplica fiel y simple a propósito de Classroom: el mismo flujo sin cuenta Google ni dependencias externas. No pretende diferenciarse por funcionalidad.

## Operating Context

Roles `teacher` y `student` con permisos distintos. Un estudiante se inscribe con el código de la clase; entrega una sola vez por tarea (estado `a_tiempo` o `tardia`). Las notas van de 0 a 20. Las clases eliminadas pasan a `inactive` y no se muestran. Los archivos se suben a Cloudinary. Frontend en Vercel, API Django REST con JWT (access 1 h, refresh 30 días).

## Capabilities and Constraints

- Rutas: `/login` (inicio de sesión y registro con rol), `/` (panel de clases), `/curso/:id` (pestañas Novedades, Material y Tareas).
- Teacher: crear, editar y eliminar clases, material y tareas; ver entregas y calificar con puntaje y comentario.
- Student: unirse a una clase, ver material y tareas, entregar, editar o retirar su entrega.
- Sin notificaciones por correo, chat ni calendario: no existen hoy y no se asumen.
- Idioma: solo español (es-PE); fechas con `toLocaleDateString('es-PE')`. Sin i18n multiidioma.
- Decisión abierta: si habrá más de una institución o solo el demo.

## Brand Commitments

Nombre "Classly", subtítulo "Tu aula virtual".

## Evidence on Hand

Demo en https://classly-react.vercel.app y backend en https://github.com/leandro291/classly-django. No hay testimonios, métricas de uso ni cifras de clientes; no inventarlos.

## Product Principles

- Fidelidad al flujo de Classroom antes que novedad: lo familiar reduce la fricción.
- Cada rol ve solo lo que necesita hacer: el estudiante entrega, el profesor revisa.
- Fecha límite y estado de entrega siempre visibles donde se decide qué hacer.
- Simplicidad deliberada: no sumar funciones que Classroom no tenga sin una razón.

## Accessibility & Inclusion

Requisito explícito: WCAG AA (contraste, foco visible, navegación por teclado). Móvil primero: el flujo del estudiante, sobre todo la entrega de tareas, debe funcionar bien en pantalla pequeña. Todo el copy en español peruano.
