---
name: Classly
description: Aula virtual familiar y funcional: superficies blancas, un solo azul de acción y una cabecera de color por clase.
colors:
  google-blue: "#1a73e8"
  google-blue-deep: "#1557b0"
  blue-tint: "#e8f0fe"
  ink: "#202124"
  ink-muted: "#5f6368"
  field-border: "#80868b"
  scrollbar: "#bdc1c6"
  field-line: "#dadce0"
  hairline: "#e8eaed"
  canvas: "#f1f3f4"
  surface: "#ffffff"
  surface-subtle: "#f8f9fa"
  success: "#1e8e3e"
  success-text: "#137333"
  success-tint: "#e6f4ea"
  danger: "#d93025"
  danger-deep: "#b31412"
  danger-text: "#c5221f"
  danger-tint: "#fce8e6"
  warning-text: "#9a5400"
  warning-tint: "#fef7e0"
  course-green: "#1a7d37"
  course-blue: "#1568d6"
  course-orange: "#ab5307"
  course-purple: "#7627bb"
  course-teal: "#007a6d"
  course-red: "#cc2d23"
  course-amber: "#965f00"
  course-pink: "#cb187e"
typography:
  display:
    fontFamily: "Google Sans, Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.33
  headline:
    fontFamily: "Google Sans, Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  title:
    fontFamily: "Google Sans, Roboto, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.google-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.google-blue-deep}"
  button-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.google-blue}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-text-hover:
    backgroundColor: "{colors.blue-tint}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
  button-danger-hover:
    backgroundColor: "{colors.danger-deep}"
  card-course:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "20px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "20px 12px 8px"
  chip-status:
    backgroundColor: "{colors.blue-tint}"
    textColor: "{colors.google-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: Classly

## Overview

**Creative North Star: "El Pizarrón Amable"**

Classly es un aula virtual calma y familiar, heredera declarada de Google Classroom. Las superficies son blancas sobre un lienzo gris claro, el texto es tinta casi negra, y un único azul de acción (Azul Google) marca todo lo que se puede pulsar o está seleccionado. El color vistoso no decora la interfaz: vive en el pizarrón (un bloque de color con repisa de tiza), que es lo que le da identidad a cada clase, al login y a los estados vacíos, y deja el resto neutro.

La densidad es media y funcional: tarjetas con borde fino, filas de lista con icono circular, pestañas subrayadas. La interfaz está pensada para que un estudiante encuentre una tarea y su fecha, o un profesor califique una entrega, sin que el diseño pida atención. Se confirma como rechazo visual: nada de gradientes, glassmorphism ni tableros oscuros tipo SaaS.

**Key Characteristics:**
- Un solo acento de acción (Azul Google) sobre superficies blancas y lienzo gris.
- El pizarrón (un bloque de color con repisa de tiza) como única superficie expresiva: cabecera de clase, tarjeta del panel, código de clase, estados vacíos y portada del login.
- Bordes finos como separador en reposo; la sombra responde a hover, menús y modales.
- Esquinas redondeadas (8px controles, 12px tarjetas, píldoras para estados).
- Etiquetas flotantes en los campos, texto de apoyo en gris medio.

## Colors

Paleta de dos neutros grises, un azul de acción y cuatro semánticos pastel, más una paleta de ocho colores de curso que rota por posición.

### Primary
- **Azul Google** (#1a73e8): botones primarios, enlaces, anillo de foco, pestaña activa, selección, avatar de usuario. Se usa en acciones, nunca como relleno decorativo de fondo.
- **Azul Google Profundo** (#1557b0): estado hover del botón primario y texto azul sobre Azul Tinta Pálida (el #1a73e8 no llega a 4.5:1 sobre ese fondo).
- **Azul Tinta Pálida** (#e8f0fe): fondo de hover de botones de texto, chip de estado "normal", círculo de icono de tarea, selección de rol.

### Secondary
- **Verde Éxito** (#1e8e3e, para iconos) y **Verde Texto** (#137333, para texto y toast de éxito) con **Verde Pálido** (#e6f4ea): entregado a tiempo. El verde se reserva para "entregado"; ningún plazo es verde.
- **Rojo Alerta** (#d93025), **Rojo Profundo** (#b31412) y **Rojo Texto** (#c5221f) con **Rojo Pálido** (#fce8e6): botón destructivo (y su hover), texto de error y fondo de aviso/vencida.
- **Ámbar Texto** (#9a5400) con **Ámbar Pálido** (#fef7e0): tareas que vencen en 3 días o menos, entrega con retraso, "sin calificar".

### Tertiary
- **Colores de Curso**: Verde (#1a7d37), Azul (#1568d6), Naranja (#ab5307), Violeta (#7627bb), Verde Azulado (#007a6d), Rojo (#cc2d23), Ámbar (#965f00) y Rosa (#cb187e). Todos dan ≥5:1 con texto blanco. Se asignan por `id` de la clase (estable al recargar o al borrar otras) y llenan la cabecera de cada clase, la franja del panel de código y el avatar de alumno.

### Neutral
- **Tinta** (#202124): texto principal y títulos.
- **Tinta Apagada** (#5f6368): texto secundario, iconos en reposo, etiquetas.
- **Borde de Campo** (#80868b): borde de inputs y textareas (3.7:1 sobre blanco, mínimo de componente). Ya no existe un tercer nivel de tinta para texto: los metadatos usan Tinta Apagada.
- **Línea de Campo** (#dadce0): borde de botones de selección; decorativo, no delimita campos.
- **Hilo** (#e8eaed): bordes de tarjetas, divisores, cabecera de pestañas.
- **Lienzo** (#f1f3f4): fondo de página y hover de filas y menús.
- **Superficie** (#ffffff): tarjetas, cabecera, modales.
- **Superficie Sutil** (#f8f9fa): pie del login y hover de filas de feed.
- **Scrollbar** (#bdc1c6): pulgar del scrollbar. Los chevrons usan Borde de Campo.

### Named Rules
**The One Voice Rule.** El Azul Google es el único acento de acción en pantalla; el resto del color es semántico (éxito, alerta, peligro) o es color de curso. Un segundo acento de acción no existe.

**The Pizarrón Rule.** El color a sangre completa solo aparece en un pizarrón: un bloque de color con repisa oscura abajo (6px, negro al 20 %), título en Google Sans blanco y, en los grandes, un subrayado y marcas de tiza. En una clase el pizarrón lleva el color de la clase; fuera de una clase (login, estados vacíos del panel) lleva Verde Curso, el verde de pizarra. Nunca en botones, enlaces ni texto del cuerpo, y la acción sigue siendo solo azul.

## Typography

**Display Font:** Google Sans (con Roboto, sans-serif de respaldo)
**Body Font:** Roboto (con sans-serif de respaldo)

**Character:** Google Sans da a títulos y nombres de clase un tono amable y redondeado; Roboto mantiene el cuerpo neutro y legible a tamaños pequeños. El contraste se logra por familia y peso, no por escala extrema.

### Hierarchy
- **Display** (400, 1.5rem / 24px, 1.33): títulos de estados vacíos ("Crea tu primera clase"). Hero de curso sube a 1.875rem (30px) con peso 500 en pantallas ≥ sm.
- **Headline** (400, 1.25rem / 20px, 1.4): título de modal; marca "Classly" en la cabecera (peso 500).
- **Title** (500, 1.125rem / 18px, 1.25): nombre de clase en tarjeta; encabezados de bloque de feed a 1rem (16px).
- **Body** (400, 0.875rem / 14px, 1.43): texto de lista, campos, botones (peso 500 en botones).
- **Label** (500, 0.75rem / 12px, 1.33): metadatos, chips de estado, pestañas en móvil. Etiqueta flotante a 12px cuando el campo está lleno o enfocado (14px en reposo); no hay texto bajo 12px. La consigna de tareas y material se lee a 16px, con saltos de línea respetados.

### Named Rules
**The Two Voices Rule.** Google Sans solo para títulos y marca; Roboto para todo lo demás. Los pesos en uso son 400 y 500 (Roboto suma 700 solo en cifras destacadas); no hay mayúsculas forzadas. El código de clase va en monoespaciada para distinguir I, l y 1. Las cifras (notas, contadores) usan numerales tabulares y el texto del usuario corta palabras largas en vez de desbordar. Las fuentes se cargan por `<link>` con solo los pesos usados.

## Layout

Fondo de página en Lienzo, contenido en columna centrada. El panel de clases usa un contenedor ancho (max-w-6xl) con rejilla de 1 a 4 columnas (1 en móvil, 2 desde 640px, 3 desde 1024px, 4 desde 1280px) y separación de 20px. La vista de una clase usa un contenedor más estrecho (max-w-4xl) con cabecera de color a sangre completa, barra de pestañas pegajosa y columna de contenido; el panel de código pasa a una barra lateral de 256px solo desde 1024px y va después del contenido en móvil. El login es una columna de 384px (max-w-sm) centrada.

El ritmo es de 4px con pasos recurrentes de 8, 12, 16, 20 y 24px: padding de tarjeta 16–20px, separación de filas 12px, padding horizontal de página 16px (24px desde sm). La cabecera superior es pegajosa de 64px. La pestaña de la clase se pega a 64px bajo ella.

## Elevation & Depth

Sistema plano con bordes: en reposo las superficies se separan con borde fino de Hilo sobre el Lienzo gris, y la sombra es una respuesta, no un estado base. Excepciones observadas: la cabecera superior y la tarjeta de clase llevan una sombra mínima en reposo. La profundidad por encima de eso sube solo con interacción (hover) o con capas flotantes (menús, modales, toasts).

### Shadow Vocabulary
- **Reposo mínimo** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): cabecera superior y tarjeta de clase (`shadow-sm`). En tarjetas de tarea y chips de archivo solo aparece al hacer hover.
- **Hover de tarjeta** (`shadow-md`): tarjeta de clase al pasar el cursor.
- **Menú flotante** (`shadow-xl` + borde Hilo): menús de usuario, agregar y de tarjeta.
- **Toast** (`shadow-lg`): notificaciones.
- **Modal** (`shadow-2xl` sobre velo `bg-black/40`): diálogos.

### Named Rules
**The Border-First Rule.** Una superficie nueva se separa con borde de 1px (#e8eaed), y solo gana sombra al responder a una interacción o al flotar sobre otra capa.

## Shapes

Lenguaje de esquinas redondeadas con tres escalones: 8px para controles (botones, inputs, ítems de menú, mensajes de error), 12px para tarjetas y chips de archivo, 16px para modales y la tarjeta de login. Los estados y los controles circulares (avatares, botones de icono, círculos de icono de lista) usan píldora completa. Los bordes son de 1px; el estado seleccionado cambia el color de borde y fondo, no el grosor. Los iconos son glifos Material rellenos y monocromos, de 16 a 22px.

## Components

Los componentes compartidos viven en `src/common/components/`: `Button` (variantes `primary` y `text`, tamaños `sm`, `md`, `lg`), `FormField` (etiqueta flotante, input o textarea), `Icon` (los iconos que se repiten, por nombre; el color sale de `text-*`), `Logo`, `Board` (el pizarrón), `Chalk` (trazos de tiza) y `Toast`. En `courses/components/primitives.jsx` están los que dependen del dominio: `ModalWrapper`, `ModalActions`, `FileChip`, `SelectedFile`, `IconBtn`, `DueChip`, `FormError` y `LoadError`.

### Buttons
- **Shape:** esquina de 8px.
- **Primary:** fondo Azul Google, texto blanco, 14px peso 500, padding 10px 24px (8px 24px en modales). **Hover:** Azul Google Profundo. **Disabled:** opacidad 40–60% sin cambiar color.
- **Text (Cancelar, secundario):** sin fondo, texto Azul Google peso 500, padding 8px 16px; hover con fondo Azul Tinta Pálida.
- **Danger (Eliminar):** fondo Rojo Alerta, hover Rojo Profundo, mismo tamaño que primario.
- **Icon button:** círculo (padding 6px), icono gris; hover con fondo Azul Tinta Pálida y icono azul (acción normal) o fondo Rojo Pálido e icono rojo (peligro).

### Chips
- **Estado:** píldora de 12px/500, padding 2px 8px. Variantes: azul (a tiempo), ámbar (≤3 días), rojo (vencida/cerrada), verde (entregada).
- **Rol:** misma píldora; en el registro, botones de selección de 8px con borde Línea de Campo que pasan a borde azul y fondo Azul Tinta Pálida al elegirse.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** Superficie sobre Lienzo.
- **Shadow Strategy:** véase Elevation & Depth; borde de Hilo.
- **Border:** 1px #e8eaed (la tarjeta de clase usa #e0e0e0, una excepción aislada).
- **Internal Padding:** 16px en tarjeta de clase y panel de código, 20px en filas de tarea y bloques de feed.

### Inputs / Fields
- **Style:** borde 1px Línea de Campo, fondo blanco, esquina de 8px, texto de 14px, padding 20px 12px 8px para dejar espacio a la etiqueta flotante.
- **Focus:** el borde y un anillo de 1px pasan a Azul Google; la etiqueta sube a 12px y se pinta azul.
- **Error / Disabled:** el error es un bloque de Rojo Pálido con texto Rojo Texto sobre el formulario, no por campo. El campo de código de clase es centrado con espaciado de letras de 0.25em.

### Navigation
- **Cabecera superior:** blanca, 64px, pegajosa, con logo azul de 32px y nombre "Classly" (oculto en móvil), botón "+" y avatar circular con iniciales sobre Azul Google.
- **Pestañas de clase:** barra blanca con borde inferior Hilo; pestaña activa con subrayado de 2px Azul Google y texto azul, inactiva en Tinta Apagada con hover de fondo Lienzo. Desplazable en horizontal en móvil sin barra.

### Signature Component: Pizarrón
Bloque de color con **repisa** (franja de 6px en negro al 20 %) pegada abajo y, en los grandes, un trozo de tiza apoyado en ella. El texto va en blanco sólido. Los trazos de tiza (subrayado que se dibuja una vez, el signo más, las ocho casillas del código) son SVG blancos con borde irregular (`feDisplacementMap`), decorativos y `aria-hidden`; el significado lo lleva el texto. Se usa en: **cabecera de clase** (mínimo 176px en móvil, 240px desde sm; título de 30px a 48px con subrayado), **tarjeta del panel** (96px, solo repisa), **código de clase** (panel con el código en monoespaciada 30px), **estados vacíos** (panel con marca de tiza y título de 30px) y **portada del login** (mitad izquierda en escritorio, banda superior en móvil, wordmark de hasta 96px). Es el único lugar donde la interfaz es vistosa. Componentes: `Board` y `Chalk` en `src/common/components/`. El subrayado respeta `prefers-reduced-motion`.

### Modales
Velo negro al 40%, panel blanco de 16px de esquina, ancho máximo de 448px (max-w-md), padding 24px, título en Google Sans 20px, acciones alineadas a la derecha (texto + primario).

## Motion

El movimiento confirma y orienta; nunca decora lo que se ve decenas de veces al día.

- **Curva única:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` y duración por defecto de 150ms, ambas en `@theme`; todo `transition-*` las hereda. Nada usa `ease-in`.
- **Pulsar:** `press` (utilidad en `index.css`) hace `scale(0.97)` en `:active`, solo si el control está habilitado. Lo llevan `Button`, `IconBtn`, los iconos de la barra y las tarjetas, y el botón de eliminar.
- **Entradas:** el modal (`<dialog>`) entra con opacidad y escala 0.96→1 en 200ms desde el centro; los menús (`.pop-in`) entran desde su esquina de origen (`origin-top-right`) en 150ms, nunca desde escala 0. Las salidas son inmediatas.
- **Etiqueta flotante:** sube con `translate` + `scale` (14px→12px efectivos), solo propiedades de GPU.
- **Sin `transition-all`:** cada transición nombra sus propiedades.
- **Subrayado de tiza:** 450ms, una sola vez al montar.
- **Movimiento reducido:** se conservan opacidad y color; se quitan escala y desplazamiento.

## Do's and Don'ts

### Do:
- **Do** usar Azul Google (#1a73e8) como único color de acción; el hover es #1557b0.
- **Do** separar superficies nuevas con borde de 1px #e8eaed y reservar la sombra para hover, menús y modales.
- **Do** usar 8px de esquina en controles, 12px en tarjetas y 16px en modales.
- **Do** poner el color de curso solo en la cabecera de la clase, rotándolo por orden de la lista.
- **Do** usar Google Sans (token `font-display`) para títulos y Roboto para el cuerpo, con pesos 400 y 500.
- **Do** usar etiqueta flotante en cada campo de formulario y texto de apoyo en Tinta Apagada (#5f6368).

### Don't:
- **Don't** usar gradientes, glassmorphism ni fondos oscuros tipo tablero SaaS.
- **Don't** introducir un segundo acento de acción distinto del Azul Google; el rojo, verde y ámbar son solo semánticos.
- **Don't** pintar botones, enlaces ni texto con el color de curso.
- **Don't** añadir sombra en reposo a tarjetas nuevas ni subir de `shadow-md` en elementos no flotantes.
- **Don't** usar pesos mayores de 500 ni texto en mayúsculas para jerarquía.
- **Don't** escribir colores como hex sueltos: todos los colores de este documento son tokens de `@theme` en `src/index.css` (`bg-brand`, `text-ink-muted`, `border-hairline`, `text-danger-text`…; los de clase se usan como `var(--color-course-green)`). Si falta un color, se agrega al token que corresponde; no se inventa una variante (por eso #e0e0e0 y #fafbff se fundieron en Hilo y Superficie Sutil).
