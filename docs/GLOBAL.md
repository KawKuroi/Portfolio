# GLOBAL — Normas del proyecto

Norma máxima del repositorio. Aplica a todo el código, comentarios, documentación y mensajes.

## 1. Idioma
- **Español absoluto** en código, identificadores, comentarios, JSDoc, documentación y
  mensajes al usuario.
- Única excepción: los tokens del estándar **Conventional Commits 1.0.0** (`feat`, `fix`,
  `docs`, `refactor`, `BREAKING CHANGE`, etc.) van en inglés.
- Identificadores: variables/constantes en camelCase español (`temaActual`), funciones en
  camelCase español (`fijarTema`), clases en PascalCase español.

## 2. Estilo y tono
- **Cero emojis** en archivos, código, documentación o respuestas.
- Copy del producto: editorial, sobrio, cálido. Sin gradientes chillones (los gradientes
  solo como respaldo detrás de carátulas).

## 3. Stack y dependencias
- Stack: **Astro** (Vite incluido) + CSS/JS vanilla. React solo como island del panel de
  Tweaks (`@astrojs/react`).
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
- Objetivo de rendimiento: build estático, ~0 JS fuera del island de Tweaks, Lighthouse ≥95.

## 6. Seguridad
- Sin secretos, claves ni tokens hardcodeados en el repo. Variables sensibles vía `.env`
  (ignorado por git).

## 7. Documentación
- `/docs` es la fuente de verdad: PRD (qué), ARCHITECTURE (cómo), ROADMAP (plan), CURRENT
  (estado), GLOBAL (normas). Mantenerlos al día al cerrar cada cambio.
