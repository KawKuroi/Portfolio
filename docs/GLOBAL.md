# GLOBAL — Normas del proyecto

Norma máxima del repositorio. Aplica a todo el código, comentarios, documentación y mensajes.

## 1. Idioma
- **Español absoluto** en código, identificadores, comentarios, JSDoc, documentación y
  mensajes al usuario.
- Única excepción: los tokens del estándar **Conventional Commits 1.0.0** (`feat`, `fix`,
  `docs`, `refactor`, `BREAKING CHANGE`, etc.) van en inglés.
- Identificadores: variables/constantes en camelCase español (`temaActual`), funciones en
  camelCase español (`fijarTema`), clases en PascalCase español.
- **Copy del producto: bilingüe ES/EN** (español por defecto). El texto visible vive en el
  diccionario `src/i18n/ui.ts` (no hardcodeado en componentes) y se traduce a inglés; los
  **identificadores, claves y comentarios siguen en español**. Al añadir/cambiar texto, hacerlo
  en el diccionario y rellenar los dos idiomas (el tipado obliga). Ver ARCHITECTURE §10.

## 2. Estilo y tono
- **Cero emojis** en archivos, código, documentación o respuestas.
- Copy del producto: editorial, sobrio, cálido. Sin gradientes chillones (los gradientes
  solo como respaldo detrás de carátulas).

## 3. Stack y dependencias
- Stack: **Astro** (Vite incluido) + CSS/JS vanilla. **Sin React ni framework de UI** (0 JS
  de framework). Estructura rígida: Galería · aguamarino · Clásica; solo el tema es variable.
- No añadir bibliotecas externas sin justificación; preferir vanilla. Si surge una necesidad
  real, parar y consultar antes de instalar.
- TypeScript en modo `strict`; prohibido `any` en código nuevo.

## 4. Assets
- Único almacén: `public/assets/` (servido como `/assets/...`). No referenciar binarios
  desde otras rutas ni hacer búsquedas de archivos fuera de ahí.
- Toda imagen de contenido degrada con `onerror` (placeholder/gradiente). La maqueta nunca
  se rompe por un asset faltante.

## 5. Calidad y accesibilidad
- Respetar `prefers-color-scheme` (tema inicial) y `prefers-reduced-motion` (animaciones).
- Accesibilidad: `aria-label`/`aria-pressed`/`aria-hidden` donde corresponda; foco visible.
- Objetivo de rendimiento: build estático, 0 JS de framework, Lighthouse ≥95.

## 6. Despliegue
- Hosting: **Vercel** (plan Hobby, gratuito). Salida estática (`dist/`) servida desde CDN;
  sin adaptador ni funciones serverless. Build `astro build`, output `dist`.

## 7. Seguridad
- Sin secretos, claves ni tokens hardcodeados en el repo. Variables sensibles vía `.env`
  (ignorado por git).

## 8. Documentación
- `/docs` es la fuente de verdad: PRD (qué), ARCHITECTURE (cómo), ROADMAP (plan), CURRENT
  (estado), GLOBAL (normas). Mantenerlos al día al cerrar cada cambio.
