# ARCHITECTURE — Portfolio "Sala"

Decisiones técnicas y mapa del proyecto. El "qué" del producto está en [PRD.md](./PRD.md);
aquí va el "cómo".

## 1. Decisión de stack y rendimiento

- **Astro** (compilación AOT). Todo el sitio es HTML + CSS estáticos; el JS se envía solo
  donde hace falta. Reemplaza el enfoque original de React + Babel-standalone transpilando
  en el navegador (lo más lento posible para el visitante).
- **Vite va incluido en Astro.** No se instala ni configura Vite por separado; Astro lo usa
  para dev server (HMR), bundling y optimización de assets.
- **React solo como island** (`@astrojs/react`, React 19) para el panel de Tweaks, hidratado
  con `client:idle`. El resto del sitio no carga React.
- **Objetivo:** Lighthouse Performance ≥95; First Load JS ~0 fuera del island de Tweaks.

## 2. Árbol del proyecto

```
src/
├─ layouts/Base.astro          # documento, fuentes, tema anti-parpadeo, sprite, .reel + slots
├─ pages/index.astro           # compone chrome (slot "chrome") + las 5 escenas
├─ components/
│  ├─ IconSprite.astro         # sprite SVG con los <symbol> ic-*
│  ├─ Plaque.astro             # barra superior fija + boton de tema
│  ├─ Rail.astro               # riel lateral (poblado por navegacion.ts)
│  ├─ Hint.astro               # hint de scroll
│  ├─ Persiana.astro           # mount + fallback estatico desde FAVORITOS
│  ├─ scenes/                  # Portada, Trabajo, Equipo, Conoceme, Salida
│  ├─ TweaksPanel.tsx          # shell React del panel
│  └─ SalaTweaks.tsx           # island React (client:idle)
├─ data/
│  ├─ proyectos.ts             # PROYECTOS (tipado Proyecto)
│  └─ favoritos.ts             # FAVORITOS (tipado Favorito, 20 piezas)
├─ scripts/
│  ├─ tema.ts                  # API de tema (setSalaTheme, eventos)
│  ├─ navegacion.ts            # riel, teclado, hint, escena activa
│  └─ persiana.ts              # acordeon + autoplay de la persiana
└─ styles/
   ├─ tokens.css               # variables :root + temas Museo/Noche
   └─ global.css               # reset, carrete .reel, escenas .scene, reduced-motion

public/
├─ favicon.svg
└─ assets/                     # único almacén de binarios -> URLs /assets/...
```

## 3. Modelo de islands y carga de JS

- **Estático por defecto:** layout, componentes `.astro` y escenas no envían JS.
- **Scripts de cliente** (Astro `<script>`): navegación del carrete y persiana. Se importan
  desde sus módulos en `src/scripts/` y Astro los empaqueta/optimiza.
- **Island React:** `SalaTweaks` se monta con `client:idle` en el slot `chrome`; React solo
  se descarga/hidrata cuando el navegador está ocioso.
- **Script de tema:** inline `is:inline` en el `<head>` (Base.astro). No se bundlea ni se
  difiere — debe correr síncrono antes del primer pintado para evitar parpadeo.

## 4. Flujo del tema (anti-parpadeo)

1. `<head>` (inline): lee `localStorage['sala-theme']`; si no hay, sigue
   `prefers-color-scheme`. Fija `data-tema` en `<html>` y `--clay/--teal` = `#2aa198`.
2. `tokens.css` define los colores por `:root[data-tema='Museo'|'Noche']`.
3. `tema.ts` (Fase 1) expone `setSalaTheme(name)`: persiste en localStorage y emite
   `salathemechange`.
4. El botón del plaque y el island de Tweaks escuchan `salathemechange` para mantenerse en
   sync.

## 5. Convención de assets

- **Único almacén:** `public/assets/`. Servido como `/assets/...`. No se referencian binarios
  fuera de aquí.
- Subcarpetas: `me/`, `projects/`, `movies/`, `books/`, `videogames/`, `music/`, más el CV.
- Toda `<img>` de contenido lleva `onerror` que degrada a placeholder/gradiente; la maqueta
  nunca se rompe por un asset faltante.
- Imágenes de la persiana: `loading="lazy"` + `referrerpolicy="no-referrer"`.

## 6. Datos

- `data/proyectos.ts` y `data/favoritos.ts` son la única fuente de verdad de contenido
  dinámico; las escenas y scripts los importan. Cambiar contenido = editar estos archivos.

## 7. Responsividad

- Escritorio: carrete con `scroll-snap` vertical, riel lateral visible.
- Móvil (≤820px): se desactiva el snap y el riel; las escenas fluyen en vertical normal; la
  persiana pasa de columnas a filas.

## 8. Build y despliegue

- `npm run dev` (Vite/Astro), `npm run build` → `dist/` estático, `npm run preview`.
- `npm run check` (astro check) para tipos y diagnósticos.
- Salida 100% estática: desplegable en cualquier hosting estático (Vercel, Netlify, GitHub
  Pages). Se define el target concreto en la fase de despliegue del ROADMAP.
