# ARCHITECTURE — Portfolio "Sala"

Decisiones técnicas y mapa del proyecto. El "qué" del producto está en [PRD.md](./PRD.md);
aquí va el "cómo".

## 1. Decisión de stack y rendimiento

- **Astro** (compilación AOT). Todo el sitio es HTML + CSS estáticos; el JS de cliente es
  vanilla y mínimo. Reemplaza el enfoque original de React + Babel-standalone transpilando
  en el navegador (lo más lento posible para el visitante).
- **Vite va incluido en Astro.** No se instala ni configura Vite por separado; Astro lo usa
  para dev server (HMR), bundling y optimización de assets.
- **Sin React ni framework de UI.** La estructura es rígida (Galería · aguamarino · Clásica);
  el único ajuste variable es el tema. No hay panel de Tweaks, así que no se envía JS de
  framework.
- **Objetivo:** Lighthouse Performance ≥95; 0 JS de framework (solo scripts vanilla puntuales).

## 2. Árbol del proyecto

```
src/
├─ layouts/Base.astro          # documento, SEO/meta (OG/Twitter/JSON-LD), fuentes, tema, .reel + slots
├─ pages/index.astro           # compone chrome (slot "chrome") + las 5 escenas
├─ components/
│  ├─ IconSprite.astro         # sprite SVG con los <symbol> ic-*
│  ├─ Plaque.astro             # barra superior fija + boton de tema
│  ├─ Rail.astro               # riel lateral (poblado por navegacion.ts)
│  ├─ Hint.astro               # hint de scroll
│  ├─ Persiana.astro           # mount + fallback estatico desde FAVORITOS
│  └─ scenes/                  # Portada, Trabajo, Equipo, Conoceme, Salida
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
├─ favicon.svg                 # marca "K" vectorial (navegadores modernos)
├─ favicon.ico                 # 16/32/48 con PNG embebido (buscadores; Google ignora SVG)
├─ favicon-16x16.png · favicon-32x32.png
├─ apple-touch-icon.png        # 180x180 (iOS "añadir a inicio")
├─ icon-192.png · icon-512.png # iconos del manifest (any maskable)
├─ og-image.png                # tarjeta social 1200x630 (OG/Twitter)
├─ site.webmanifest · robots.txt · sitemap.xml
└─ assets/                     # único almacén de binarios -> URLs /assets/...

scripts/
└─ gen-seo-assets.mjs          # genera con sharp los iconos, el .ico y la tarjeta OG
```

## 3. Carga de JS

- **Estático por defecto:** layout, componentes `.astro` y escenas no envían JS.
- **Scripts de cliente** (Astro `<script>`, vanilla): navegación del carrete y persiana. Se
  importan desde sus módulos en `src/scripts/` y Astro los empaqueta/optimiza.
- **Sin JS de framework:** no hay islands ni React (se quitó el panel de Tweaks).
- **Script de tema:** inline `is:inline` en el `<head>` (Base.astro). No se bundlea ni se
  difiere — debe correr síncrono antes del primer pintado para evitar parpadeo.

## 4. Flujo del tema (anti-parpadeo)

1. `<head>` (inline): lee `localStorage['sala-theme']`; si no hay, sigue
   `prefers-color-scheme`. Fija `data-tema` en `<html>` y `--clay/--teal` = `#2aa198`.
2. `tokens.css` define los colores por `:root[data-tema='Museo'|'Noche']`.
3. `tema.ts` (Fase 1) expone `setSalaTheme(name)`: persiste en localStorage y emite
   `salathemechange`.
4. El botón del plaque (`#themeToggle`) escucha `salathemechange` para mantener el icono
   sol/luna en sync.

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

### Hosting: Vercel (plan Hobby, gratuito)

- **Por qué Vercel:** sitio estático servido desde su **CDN global** (carga instantánea),
  HTTPS automático, dominio `*.vercel.app` gratis (o dominio propio sin coste) y *preview
  deployments* en cada push. El plan Hobby cubre de sobra un sitio como este.
- **Sin adaptador.** Al ser salida 100% estática no se usa `@astrojs/vercel` ni funciones
  serverless: Vercel autodetecta Astro, ejecuta `astro build` y publica `dist/`. Así no se
  consumen las cuotas de cómputo del free tier → se mantiene **totalmente gratis**.
- **Configuración:** Build Command `astro build` (autodetectado), Output Directory `dist`,
  Install Command `npm install`. No hace falta `vercel.json` para lo básico; si se quieren
  cabeceras de caché personalizadas para `/assets/*`, se añade más adelante.
- **Flujo:** conectar el repositorio Git a Vercel; cada push a la rama principal publica a
  producción y cada rama/PR genera un preview. Detalle operativo en el ROADMAP (Fase 6).

## 9. SEO y metadatos sociales

- **Dónde:** todo en el `<head>` de `Base.astro`, parametrizado por props
  (`titulo`, `descripcion`, `imagen`, `canonical`). La constante `SITIO` fija la URL
  pública; si cambia el dominio se edita en un solo sitio. `new URL(ruta, SITIO)` deriva
  las URLs **absolutas** que exigen Open Graph y los datos estructurados.
- **Etiquetas:** `description` + `canonical`; **Open Graph** (`og:type/site_name/locale/url/
  title/description/image` + `image:width/height/alt`); **Twitter Card**
  (`summary_large_image` + `title/description/image/image:alt`); **theme-color** con dos
  valores por `prefers-color-scheme` (claro `#fbfaf7` / oscuro `#16130e`).
- **Datos estructurados:** JSON-LD `@graph` con `Person` (identidad, `sameAs` a GitHub y
  LinkedIn) + `WebSite`, enlazados por `@id`. Se inyecta con `set:html` + `is:inline`
  (datos estáticos y controlados → sin riesgo de inyección).
- **Iconos:** `.ico` (PNG embebido 16/32/48) y PNG 16/32 para buscadores, SVG para
  navegadores modernos, `apple-touch-icon` 180 para iOS y `site.webmanifest` (iconos
  192/512 `any maskable`) para Android.
- **Tarjeta social:** `og-image.png` 1200x630 (proporción 1.91:1) con la estética de la
  Sala. Tanto la tarjeta como los iconos se generan con `scripts/gen-seo-assets.mjs`
  (sharp) desde `favicon.svg`; los binarios se commitean y Vercel los sirve estáticos
  (no se ejecuta sharp en el despliegue).
- **Indexación:** `robots.txt` (permite todo + apunta al sitemap) y `sitemap.xml`
  (la única URL del sitio).
- **Notas:** `og:locale` = `es_ES` por máxima compatibilidad de plataformas;
  `twitter:site/creator` se omite (no hay handle de X confirmado del usuario).
