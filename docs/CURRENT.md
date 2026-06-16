# CURRENT — Estado del proyecto

## Fase activa
- **Activo:** Fase 3 — "El trabajo" (disposición Galería, fija) (ver [ROADMAP.md](./ROADMAP.md)).
- **Estado general:** Fases 0, 1 y 2 completadas. Chrome global funcional + tres escenas
  estáticas maquetadas con el copy exacto del PRD: Portada (texto|retrato con `onerror`),
  Equipo (Stack + Formación) y Salida (frase + enlaces de contacto). Tipografía editorial
  compartida en global.css; layout propio de cada escena en su `<style>` scoped. `astro check`
  y `astro build` limpios, 0 JS de framework. Falta render dinámico de "El trabajo" (Galería)
  y la persiana de "Conóceme".

## Pendientes que aporta el usuario (no bloquean el desarrollo)
- `public/assets/me/retrato.png` — autorretrato (relación 4/5).
- `public/assets/projects/01-senas.png` — captura Traductor de Señas (3/2).
- `public/assets/projects/02-football.png` — captura Football Notificator (3/2).
- `public/assets/projects/03-noti.png` — captura Noti (3/2).
- `public/assets/projects/04-turismo.png` — captura App de Turismo (3/2).

Mientras falten, el `onerror` muestra placeholders y la maqueta no se rompe.

## Historial
- **2026-06-15** — Fase 2. Maquetadas las tres escenas estáticas con el copy exacto del PRD
  §6. Portada: grid texto|retrato, actos con iconos (I — El trabajo, II — El equipo, III —
  Conóceme), retrato 4/5 con `onerror` a placeholder y caption. Equipo: grid Stack (5 filas
  clave/valor con icono) + Formación (5 ítems con título y sub de dos columnas), colapsa en
  ≤760px. Salida: etiqueta, frase serif italic y enlaces mono con icono (mail/tel/github/CV;
  el primero relleno ink). Añadida tipografía editorial compartida (`.scene h1/h2/em`, `.sh`,
  `.acto`, `.conteo`) a global.css; el resto en `<style>` scoped por escena. Verificado con
  `astro check` (0 errores) y `astro build`.
- **2026-06-15** — Fase 1. Construido el chrome global. `tema.ts`: API de tema
  (`temaActual`/`fijarTema`/`alternarTema`/`iniciarTema`), persistencia en `localStorage`,
  evento `salathemechange`, `window.setSalaTheme`/`__salaTheme` y listener de
  `prefers-color-scheme` (sigue al SO mientras no haya elección manual). `navegacion.ts`:
  riel lateral generado por JS, escena activa con IntersectionObserver (threshold .55),
  teclado (↑/↓/←/→/PageUp/PageDown/Home/End con guardas de foco) y hint de scroll
  (1.3s/6.2s). Estilos del chrome (`.ic`, plaque, riel, hint) en `global.css`; botón del
  plaque cablea el tema y sincroniza el icono sol/luna. Sprite afinado con esquinas
  redondeadas. Verificado con `astro check` (0 errores) y `astro build`.
- **2026-06-15** — Fase 0. Inicializado el proyecto con Astro 6 (Vite incluido). Creada la
  estructura `src/` (Base.astro, index.astro, componentes y scripts stub, `tokens.css`/
  `global.css` con los 2 temas Museo/Noche y acento `#2aa198`). Poblados `data/proyectos.ts`
  (4 proyectos) y `data/favoritos.ts` (20 piezas) con los datos del PRD. Consolidados los
  assets en `public/assets/` (cine, libros, música y juegos), copiado el CV y descargadas las
  3 carátulas de juegos faltantes (Zelda TOTK, Elden Ring, Resident Evil 2). Migrado el PRD a
  `/docs` y creados ARCHITECTURE, ROADMAP, CURRENT y GLOBAL. Decisiones: stack Astro (no
  React/Babel en navegador), 2 temas en vez de 3 (se elimina Papel), assets 100% locales.
- **2026-06-15** — Eliminado el panel de Tweaks por completo y desinstalado React
  (`@astrojs/react`, `react`, `react-dom` y tipos). Estructura ahora rígida y no configurable
  por el visitante: disposición **Galería**, acento **aguamarino `#2aa198`** y tipografía
  **Clásica** fijos; el único ajuste variable es el tema (claro/oscuro). Reducida la carga de
  fuentes a solo **Libre Baskerville**. "El trabajo" mantiene solo la disposición Galería
  (se descartan Lista y Detalle). Decidido el hosting: **Vercel** (plan Hobby, gratuito),
  salida estática servida desde CDN, sin adaptador ni funciones serverless. Docs actualizados
  en consecuencia.
