# ARCHITECTURE — Portafolio

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
├─ og-image-v2.png             # tarjeta social 1200x630 (OG/Twitter; sufijo versionado)
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

El sitio tiene **dos modos** separados por un corte en **1024px**:

- **Escritorio (≥1025px):** carrete con `scroll-snap` vertical (`.reel` a `100vh`), escenas
  de pantalla completa centradas, riel lateral y hint de teclado visibles, plaque **fija**.
  Esta experiencia está **congelada** (el usuario la quiere intacta); no se toca.
- **Móvil/Tablet (≤1024px):** el carrete pasa a **flujo vertical normal** (`.reel` a
  `height:auto`, sin snap), las escenas miden su contenido (sin `100vh`) con padding compacto
  (`--pad`), el riel y el hint se ocultan y el plaque pasa a **sticky** (en flujo, con el
  nombre a la izquierda). La estructura interna de cada escena se reorganiza siguiendo el
  **documento de referencia móvil** del usuario (acordeones, filtros, etc.).
  - **Refinamiento tablet (700–1024px):** más aire (`--pad:44px`) y disposiciones a dos
    columnas donde la referencia lo indica.
  - **Teléfono (<700px):** una columna, disposiciones plegables.

El corte de 1024px y el flujo base viven en `global.css` (`.reel`/`.scene`/plaque/riel/hint)
y `tokens.css` (`--pad`). Cada escena añade sus propias reglas `@media (max-width:1024px)`
(y subcortes en 700px) en su `<style>` scoped. La reestructuración móvil/tablet se ejecuta por
fases (ver [ROADMAP.md](./ROADMAP.md)).

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
- **Tarjeta social:** `og-image-v2.png` 1200x630 (proporción 1.91:1) con la estética del
  portafolio. El sufijo versionado (`-v2`) invalida la caché de los scrapers al cambiar la
  tarjeta: súbelo (v3…) y actualiza `imagen` en `Base.astro`. Tanto la tarjeta como los
  iconos se generan con `scripts/gen-seo-assets.mjs`
  (sharp) desde `favicon.svg`; los binarios se commitean y Vercel los sirve estáticos
  (no se ejecuta sharp en el despliegue).
- **Indexación:** `robots.txt` (permite todo + apunta al sitemap) y `sitemap.xml`
  (las dos URLs del sitio, `/` y `/en/`, con `xhtml:link` alternate por idioma).
- **Notas:** `og:locale` se emite por idioma (`es_ES`/`en_US`) con `og:locale:alternate`;
  `twitter:site/creator` se omite (no hay handle de X confirmado del usuario). Las alternativas
  de idioma (`hreflang`) van en el `<head>`; detalle del sistema bilingüe en §10.

## 10. Internacionalización (i18n)

Sitio **bilingüe ES/EN** con el i18n **nativo de Astro**, sin librerías ni JS de framework.

- **Enrutado:** `astro.config.mjs` declara `i18n: { defaultLocale: 'es', locales: ['es','en'],
  routing: { prefixDefaultLocale: false } }`. Se prerenderizan **dos páginas estáticas**: `/` (es)
  y `/en/` (en). Ambas comparten la composición `src/components/Pagina.astro`; `src/pages/
  index.astro` y `src/pages/en/index.astro` solo la montan. Cada componente `.astro` resuelve su
  idioma con `Astro.currentLocale`.
- **Diccionario:** `src/i18n/ui.ts` es la **única fuente de verdad** del copy
  (`UI: Record<Idioma, Textos>`), con `obtenerIdioma()` (coerción con respaldo `es`) y
  `obtenerTextos()`. Tipado estricto: una clave faltante en un idioma es **error de compilación**,
  así no se publica una traducción olvidada. Añadir/cambiar texto = editar el diccionario.
- **Datos:** `src/data/proyectos.ts` lleva los campos de copy como `Record<Idioma,string>`
  (titulo, tags, anio, estado, descripcion). `favoritos.ts` no se traduce (nombres propios); solo
  la **etiqueta** de categoría se traduce desde el diccionario, manteniendo la **clave** `c`
  (`Cine/Juegos/Libros/Música`) estable para CSS (`[data-cat]`) y el filtro (`data-f`).
- **Detección (cliente, sitio estático):** un script `is:inline` en el `<head>` de `Base.astro`
  resuelve el idioma antes del pintado: elección manual (`localStorage['sala-lang']`) manda; si no,
  sigue `navigator.language`; si difiere del idioma servido, redirige una sola vez con
  `location.replace` (sin bucle: tras redirigir ya coincide). Mismo patrón anti-parpadeo que el tema.
- **Conmutador:** botón `#langToggle` en el plaque (a la derecha del de tema), un `<a>` a la
  ruta hermana vía `getRelativeLocaleUrl`; al pulsar persiste la elección en `localStorage`.
- **Scripts de cliente** (Trabajo, Salida, navegación): leen el idioma de
  `document.documentElement.lang` e importan `src/i18n/ui.ts` (y los datos) → una sola fuente.
- **SEO:** `<html lang>` por página, `title`/`description`/JSON-LD (`inLanguage`, `jobTitle`,
  `knowsAbout`) y `og:locale` (+ `og:locale:alternate`) por idioma, `hreflang` (es/en/x-default)
  en el `<head>` y ambas URLs en `sitemap.xml`.
