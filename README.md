<h1 align="center">Classly</h1>
<p align="center">Aula virtual inspirada en Google Classroom. Los profesores publican material y tareas; los estudiantes se unen con un código y entregan sus trabajos.</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <a href="https://classly-react.vercel.app"><img src="https://img.shields.io/badge/Ver_demo-2F81F7?style=for-the-badge&logo=vercel&logoColor=white" alt="Ver demo"></a>
  <a href="https://github.com/leandro291/classly-django"><img src="https://img.shields.io/badge/Backend-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Backend"></a>
</p>

## Tabla de contenidos

- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Flujo de la aplicación](#flujo-de-la-aplicación)
- [Explicación detallada por módulo](#explicación-detallada-por-módulo)
  - [Punto de entrada](#1-punto-de-entrada)
  - [Configuración y enrutado](#2-configuración-y-enrutado)
  - [Capa común (common)](#3-capa-común-common)
  - [Autenticación (features/auth)](#4-autenticación-featuresauth)
  - [Cursos (features/courses)](#5-cursos-featurescourses)
- [Manejo de datos y API](#manejo-de-datos-y-api)
- [Configuración del proyecto](#configuración-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)

## Tecnologías

| Tecnología | Uso |
|---|---|
| **React 19** | Librería de UI (componentes funcionales + hooks) |
| **Vite 8** | Bundler y servidor de desarrollo con HMR |
| **React Router DOM 7** | Navegación entre páginas |
| **Tailwind CSS 4** | Estilos utilitarios (vía plugin `@tailwindcss/vite`) |
| **Oxlint** | Linter |

## Estructura del proyecto

```
├── index.html                    # HTML raíz donde se monta React
├── vite.config.js                # Configuración de Vite (React + Tailwind)
├── .env                          # Variables de entorno (URL de la API)
├── .oxlintrc.json                # Reglas del linter
└── src/
    ├── main.jsx                  # Punto de entrada de la aplicación
    ├── index.css                 # Estilos globales (fuentes, tema, animaciones)
    ├── app/
    │   └── pages.jsx             # Re-exportación de páginas (barrel)
    ├── router/
    │   ├── App.jsx               # Proveedores globales + BrowserRouter
    │   ├── index.jsx             # Definición de rutas
    │   └── ProtectedRoute.jsx    # Guard para rutas privadas
    ├── common/
    │   ├── components/Toast.jsx  # Sistema de notificaciones
    │   ├── hooks/useClickOutside.js
    │   ├── services/api.js       # Cliente HTTP + gestión de sesión
    │   └── utils/formatDate.js
    └── features/
        ├── auth/                 # Autenticación (login/registro)
        │   ├── hooks/useAuth.jsx
        │   ├── services/authService.js
        │   └── pages/LoginPage.jsx
        └── courses/              # Funcionalidad de cursos
            ├── pages/
            │   ├── Dashboard.jsx        # Lista de clases
            │   └── CourseDetail.jsx     # Detalle de un curso
            ├── components/              # ~20 componentes de UI
            ├── services/courseService.js
            └── utils/constants.js
```

## Flujo de la aplicación

1. El usuario entra a `/`. Si no está autenticado, `ProtectedRoute` lo redirige a `/login`.
2. En `/login` puede iniciar sesión o registrarse (estudiante/profesor). Al autenticarse se guardan tokens y datos del usuario en `localStorage` y se navega a `/`.
3. En el **Dashboard** ve la grilla de clases activas. Un profesor puede **crear/editar/eliminar** clases; un estudiante puede **unirse** con un código de 8 caracteres.
4. Al hacer clic en una clase se va a `/curso/:id`, donde hay 3 pestañas:
   - **Novedades**: feed con código de la clase y contenido reciente.
   - **Material**: publicaciones de archivos por el profesor.
   - **Tareas**: tareas con fecha de entrega, estado (vencida/hoy/mañana), entregas y notas.
5. Dentro de una tarea, el estudiante entrega (comentario + archivos) y el profesor revisa las entregas y califica.

## Explicación detallada por módulo

### 1. Punto de entrada

**`src/main.jsx`** — Monta la aplicación en el elemento `#root` usando `createRoot` (React 19) y la envuelve en `<StrictMode>`. Importa los estilos globales `index.css`.

**`src/index.css`** — Importa las fuentes (Roboto y Google Sans) y Tailwind. Define el tema con `@theme` (colores `brand` y `brand-dark`, tipografías), estilos base de `body`, scrollbars personalizados y la animación `fadeSlideIn` (usada por las clases `.page-enter`).

### 2. Configuración y enrutado

**`src/router/App.jsx`** — Componente raíz. Estructura los proveedores globales en orden:

```jsx
<BrowserRouter>
  <AuthProvider>        // estado de autenticación (usuario)
    <ToastProvider>     // notificaciones globales
      <AppRoutes />     // rutas de la aplicación
```

**`src/router/index.jsx`** — Define las rutas:

| Ruta | Componente | Protegida |
|---|---|---|
| `/login` | `LoginPage` | No |
| `/` | `Dashboard` | Sí |
| `/curso/:id` | `CourseDetail` | Sí |
| `*` | Redirección a `/` | — |

**`src/router/ProtectedRoute.jsx`** — Componente guard: lee el usuario del contexto de autenticación. Si no existe, redirige a `/login` con `<Navigate replace>`; si existe, renderiza `children`.

**`src/app/pages.jsx`** — Archivo *barrel* que re-exporta las tres páginas (LoginPage, Dashboard, CourseDetail) para mantener las rutas limpias.

### 3. Capa común (`common`)

**`src/common/services/api.js`** — Núcleo de la comunicación con el backend. Contiene:

- **Claves de sesión**: `classly_access`, `classly_refresh`, `classly_user` en `localStorage`.
- `getBase()`: devuelve la URL base de la API (`VITE_API_URL` desde `.env`, o `http://localhost:8000` como fallback). Elimina la `/` final.
- `fileUrl(file)`: convierte una ruta de archivo relativa en URL absoluta (si ya es `http(s)` la deja igual).
- `authHeaders()`: agrega el header `Authorization: Bearer <token>` si existe token.
- `handleResponse(res, fallback)`: normaliza la respuesta. Devuelve `null` en `204`, lanza `Error` con mensaje legible si la respuesta no es `ok` (extrae `detail`, primer elemento de array, o valores de objeto aplanados).
- **Gestión de sesión**: `saveTokens`, `saveUser`, `getUser`, `clearSession`, `isLoggedIn`.
- **Funciones por recurso** (todas `async`, usan `fetch`):
  - *Auth*: `login`, `register`.
  - *Courses*: `getCourses`, `createCourse`, `updateCourse` (PATCH), `deleteCourse`, `joinCourse`.
  - *Materials*: `getMaterials`, `createMaterial`, `updateMaterial`, `deleteMaterial` (usan `FormData` para subir archivos con el campo `archivos`).
  - *Tareas*: `getTareas`, `createTarea`, `updateTarea`, `deleteTarea` (campo `file_upload`).
  - *Entregas*: `getEntregas`, `createEntrega`, `updateEntrega`, `deleteEntrega`, `gradeEntrega`.

**`src/common/components/Toast.jsx`** — Sistema de notificaciones mediante Context. Expone el hook `useToast()` que devuelve `toast(message, type)` con tipos `success`, `error` e `info`. Las notificaciones se apilan en la parte inferior central, se auto-eliminan a los 3 s y tienen animación de entrada/salida (opacidad + traslación).

**`src/common/hooks/useClickOutside.js`** — Hook que devuelve una `ref` para asignar a un elemento. Escucha `mousedown` globalmente y ejecuta el callback si el clic ocurre fuera del elemento (se usa para cerrar menús). Usa `handlerRef` para no volver a suscribir el listener en cada render.

**`src/common/utils/formatDate.js`** — Formatea una fecha con `toLocaleDateString('es-PE', ...)` (día numérico, mes corto, año). Devuelve cadena vacía si no recibe fecha.

### 4. Autenticación (`features/auth`)

**`src/features/pages/auth/hooks/useAuth.jsx`** — Contexto de autenticación:
- `AuthProvider`: mantiene `user` en estado (inicializado desde `getUser()` del localStorage). Expone `login(user)` (guarda usuario + actualiza estado) y `logout()` (limpia la sesión).
- `useAuth()`: hook para consumir el contexto. Lanza error si se usa fuera del `AuthProvider`.

**`src/features/pages/auth/services/authService.js`** — Orquesta la autenticación:
- `loginUser(email, password)`: llama a `api.login`, guarda los tokens con `saveTokens` y decodifica el **payload del JWT** (parte central con `atob` + `JSON.parse`) para construir el objeto de usuario `{ id, first_name, last_name, email, rol, username }`. Si falla el decode, crea un objeto con datos básicos.
- `registerUser(data)`: registra y luego inicia sesión automáticamente.

**`src/features/pages/auth/pages/LoginPage.jsx`** — Página de login/registro con diseño estilo Material:
- Estado local: `mode` ('login'|'register'), `loading`, `error` y `form` (email, password, username, first_name, last_name, telephone, rol).
- En modo registro muestra campos adicionales y selector de rol (estudiante/profesor).
- `handleSubmit`: previene el envío por defecto, llama a `loginUser` o `registerUser`, guarda el usuario en el contexto (`login()`) y navega a `/`. En caso de error muestra el mensaje en un recuadro rojo.
- Componente auxiliar `Field`: input con *floating label* (label animado que se mueve sobre el borde usando clases `peer` de Tailwind).

### 5. Cursos (`features/courses`)

#### Páginas

**`Dashboard.jsx`** — Vista principal. Funcionalidades:
- Carga los cursos con `getCourses()` en `useEffect` (con flag `active` para evitar *setState* tras desmontar). Filtra solo cursos con `status === 'active'`.
- Header con logo, botón `+` (menú contextual con `useClickOutside`), y avatar de usuario con menú (datos + cerrar sesión).
- Según el rol:
  - **Profesor**: el menú `+` abre `CourseFormModal` para crear; las tarjetas tienen menú de editar/eliminar. Si no hay clases muestra `TeacherEmptyState`.
  - **Estudiante**: el menú `+` abre `JoinCourseModal` (unirse con código de 8 caracteres). Si no hay clases muestra `EmptyState` con input de código.
- `openCourse(course, i)`: navega a `/curso/:id` pasando el curso y un color (de `CARD_COLORS`, rotando con `i % length`) por el **estado del router** (`state`).
- Handlers `handleSaveCourse`, `handleDeleteCourse`, `handleJoined` que llaman a la API y refrescan la lista, mostrando toasts de resultado.

**`CourseDetail.jsx`** — Vista de un curso (controlador central de la funcionalidad del curso). Puntos clave:
- **Estado**: `view` (course / material / task), `tab` (stream/materials/tasks), `modal` (actúa como *un solo slot* para el modal activo), `materials`, `tareas`, `entregasByTarea` (mapa `{tareaId: entregas}`).
- **Recuperación de datos**: en `useEffect` carga materiales y tareas en paralelo con `Promise.all`, luego dispara `loadEntregas` por cada tarea. La función `loadEntregas` normaliza las entregas con `normalizeEntrega` (convierte `archivos` → `files` y `student` → `student_name`).
- **Guard**: si llega sin `state.course` (recarga directa de la URL), redirige a `/`.
- **Navegación interna**: al abrir un material/tarea se cambia `view`, y se renderiza `MaterialPage`/`TaskPage` (con datos *en vivo* re-buscados por id). Esto da una transición tipo "sub-página".
- **Handlers** de CRUD:
  - `handleSaveMaterial` / `handleDeleteMaterial`.
  - `handleSaveTask` / `handleDeleteTask` (re-sincronizan tareas y entregas).
  - `handleGrade(entregaId, tareaId, score, comment)`: califica y recarga las entregas de esa tarea.
  - `handleEditEntrega`, `handleDeleteEntrega` (toman la entrega propia, la primera del array).
  - `handleEntregar(tarea, comment, files)`: crea la entrega y vuelve a la vista de curso.
- **Render**: cabecera de color con nombre del curso, barra de pestañas sticky (debajo del navbar sticky `top-16`), y render condicional por tab con los componentes de sección. Los modales se renderizan según `modal.type`.

#### Servicios y constantes

**`courseService.js`** — Simplemente re-exporta todas las funciones de `common/services/api.js` para agrupar el acceso a datos del feature.

**`utils/constants.js`** — Paletas de colores: `CARD_COLORS` (8 colores para tarjetas de curso y cabeceras) y `AVATAR_COLORS` (colores para avatares de estudiantes).

#### Componentes de UI

**Estructura/Barra:**
- **`NavBar.jsx`**: header sticky con botón de volver (flecha) y logo/título.

**Tarjetas y estados:**
- **`CourseCard.jsx`**: tarjeta de clase con cabecera de color, nombre, periodo, menú de 3 puntos para profesor (editar/eliminar, cerrado con `useClickOutside`), badges de estado inactivo, y fila de iconos (personas, carpeta, tareas).
- **`EmptyStates.jsx`**: `TeacherEmptyState` (invita a crear la primera clase) y `EmptyState` (formulario de código de 8 caracteres para estudiantes). Ambos con ilustraciones SVG.
- **`MenuOption.jsx`**: elemento de menú con icono (school/login) y etiqueta.

**Primitivas reutilizables (`primitives.jsx`):**
- `ModalWrapper`: contenedor de modal (overlay oscuro + tarjeta centrada con scroll).
- `FormField`: input con *floating label*.
- `ModalActions`: botones Cancelar/Confirmar.
- `FileChip`: ficha de archivo (ícono + nombre + flecha de descarga). Si tiene `href` es un `<a target="_blank">`.
- `IconBtn`: botón circular con icono (variante `danger` roja).
- `EmptySection`: mensaje de "sin contenido".

**Pestañas del curso:**
- **`StreamTab.jsx`**: panel de novedades. Columna lateral con código de clase (botón copiar con `navigator.clipboard`), contadores de material y tareas. Columna principal con feeds de "Próximas entregas" y "Material reciente" (hasta 3 ítems) o un estado vacío.
- **`MaterialsTab.jsx`**: lista de materiales. Botón "Nuevo material" solo para profesor; por ítem muestra ícono, título, descripción, fecha, y acciones editar/eliminar (profesor) o flecha (estudiante).
- **`TasksTab.jsx`**: lista de tareas con lógica de vencimiento: calcula `overdue` y `daysLeft`, muestra badges de color (vencida/rojo, ≤3 días/ámbar, normal/azul). Para estudiante marca si está entregada y si fue "Entregada" o "Tardía"; para profesor muestra conteo de entregas y calificadas.

**Páginas de detalle (sub-vistas):**
- **`MaterialPage.jsx`**: vista completa de un material: encabezado con autor y fecha, descripción y lista de archivos (`FileChip`).
- **`TaskPage.jsx`**: vista de una tarea. Muestra instrucciones, archivo del profesor y un panel lateral:
  - **Profesor**: `TeacherSubmissionList` con todas las entregas.
  - **Estudiante sin entrega**: formulario de entrega (comentario + archivos múltiples con previsualización y quitar).
  - **Estudiante con entrega**: estado (a tiempo/tardía), calificación y comentario del profesor, archivos, y botones editar/retirar.
- **`TeacherSubmissionList.jsx`**: lista de entregas para el profesor con estadísticas (entregas/calificadas/pendientes), buscador por nombre, filtro Todos/Pendientes/Calificadas, y avatares con color derivado del nombre (`avatarColor` con hash). Cada tarjeta abre el modal de calificación.

**Modales de formulario:**
- **`CourseFormModal.jsx`**: crear/editar clase (nombre, sección/periodo, descripción). Botón deshabilitado si faltan nombre/periodo.
- **`MaterialFormModal.jsx`**: crear/editar material (título, descripción, archivos múltiples). Al editar muestra los archivos existentes.
- **`TaskFormModal.jsx`**: crear/editar tarea (título, instrucciones, fecha de entrega, puntaje máximo 20, archivo de apoyo opcional).

**Modales de confirmación:**
- **`DeleteCourseModal.jsx`**: confirma eliminación de una clase (avisa que borra material y tareas).
- **`DeleteModal.jsx`**: confirmación genérica de eliminación (material/tarea).
- **`DeleteEntregaModal.jsx`**: confirma retirar la propia entrega.
- **`GradeModal.jsx`**: calificar a un estudiante. Muestra datos de la entrega (comentario y archivos del alumno), input de nota (0–`maxScore`) con validación en vivo, y comentario opcional del profesor.
- **`EditEntregaModal.jsx`**: editar la entrega propia (cambiar comentario y agregar archivos).

## Manejo de datos y API

- Todas las llamadas pasan por `src/common/services/api.js` usando `fetch`.
- **Autenticación**: JWT. `Authorization: Bearer <access>` en cada petición (excepto login/register). El access token se guarda en `localStorage`.
- **Carga de datos en los componentes**: `useEffect` + `Promise.all` para peticiones paralelas, con flag `active` para evitar actualizar estado desmontado. Los errores se reportan con toasts.
- **Entregas**: se mantienen en un diccionario `entregasByTarea` porque hay una entrega por (tarea, estudiante). La entrega propia del estudiante es la primera del array.
- **Archivos**: se suben con `FormData` (campos `archivos` para material, `file_upload` para tareas y entregas). Las URLs de archivos se resuelven con `fileUrl()`.

## Configuración del proyecto

Requisitos: Node.js (20+) y npm.

1. Instalar dependencias:

```bash
npm install
```

2. Crear un archivo `.env` con la URL de la API (opcional, hay fallback a `http://localhost:8000`):

```env
VITE_API_URL=https://classly-django.onrender.com
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilación de producción a `dist/` |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Analiza el código con Oxlint |
