# PRD — Portfolio Kevin Axel Herazo Rolón

> Documento de producto del portafolio interactivo, reconstruido sobre **Astro**.
> Producto final: un sitio de una sola página, en español, con la metáfora de una **sala de
> museo / cine**: el visitante "recorre salas" haciendo scroll vertical con *snap*. Estética
> editorial, papel tostado, acento aguamarino, tipografía con serifas.
> Nombre del proyecto: **portfolio**.

---

## 0. Cambios de stack frente a la versión original

La versión original era un único HTML que cargaba **React 18 + Babel-standalone** y
transpilaba JSX **en el navegador** (`type="text/babel"`) — el enfoque más lento posible
para el visitante. Esta versión migra a **Astro**:

- Todo el sitio se compila de antemano (AOT): HTML + CSS estáticos, **0 JS de framework**.
- **Astro ya usa Vite** por debajo; no se añade ni configura Vite por separado.
- **Sin React ni panel de Tweaks.** La estructura es rígida y no la cambia el visitante:
  disposición **Galería**, acento **aguamarino `#2aa198`** y tipografía **Clásica** (Libre
  Baskerville) son fijos. El único ajuste variable es el tema.
- **Se elimina** el requisito de CDN con `integrity` pineado (era propio del enfoque
  standalone).
- **Dos temas**: Museo (claro) y Noche (oscuro). Se elimina el tema *Papel*. El visitante
  alterna claro/oscuro con el botón del plaque; por defecto sigue al sistema.
- **Todos los assets son locales** bajo `public/assets/` y se sirven como `/assets/...`
  (cine, juegos, libros y música incluidos; ya no hay imágenes remotas).
- **Despliegue en Vercel** (plan Hobby, gratuito): salida estática servida desde su CDN
  global. Al ser 100% estático no requiere adaptador ni funciones serverless.

---

## 1. Resumen del producto

Portafolio personal de un Ingeniero de Sistemas (backend · datos · IA). Es un *single-page*
que se navega como un carrete de escenas a pantalla completa (`scroll-snap`), cada una es
una "sala":

1. **Portada** — nombre, rol, retrato.
2. **I · El trabajo** — 4 proyectos, en 3 disposiciones intercambiables (Lista / Galería / Detalle).
3. **II · El equipo y los créditos** — stack técnico y formación.
4. **III · Conóceme** — "persiana" (acordeón de carátulas) con 20 piezas favoritas (cine, juegos, libros, música).
5. **Salida** — datos de contacto / libro de visitas.

Incluye: barra superior tipo *plaque* de galería, riel de navegación lateral con puntos,
*hint* de scroll, conmutador de tema claro/oscuro y navegación por teclado. La estructura es
fija (Galería · aguamarino · Clásica); no hay panel de personalización.

**Idioma:** todo el copy en español (incluye acentos y "Música").
**Tono:** editorial, sobrio, cálido. Sin emojis, sin gradientes chillones (los gradientes
solo se usan como *fallback* detrás de carátulas).

---

## 2. Estructura del proyecto (Astro)

```
portfolio/
├─ docs/                       # PRD, ARCHITECTURE, ROADMAP, CURRENT, GLOBAL
├─ public/
│  ├─ favicon.svg
│  └─ assets/                  # único almacén de assets (servidos como /assets/...)
│     ├─ CV-Kevin-Herazo.pdf
│     ├─ me/retrato.png
│     ├─ projects/ 01-senas.png 02-football.png 03-noti.png 04-turismo.png
│     ├─ movies/  mulholland.jpg interestellar.jpg cidade.jpg akira.jpg blade.jpg
│     ├─ books/   hacedor.jpg juramentada.jpg 1984.jpg el_extranjero.jpg ceguera.jpg
│     ├─ videogames/ ff9.jpg rdr2.jpg totk.jpg elden.jpg re2.jpg
│     └─ music/   in_rainbows.jpg mm_food.jpg data.jpg dtmf.jpg artaud.jpg
├─ src/
│  ├─ layouts/Base.astro       # documento, fuentes, tema anti-parpadeo, sprite, carrete
│  ├─ pages/index.astro        # compone chrome + 5 escenas
│  ├─ components/
│  │  ├─ Plaque.astro Rail.astro Hint.astro IconSprite.astro
│  │  ├─ Persiana.astro
│  │  └─ scenes/Portada.astro Trabajo.astro Equipo.astro Conoceme.astro Salida.astro
│  ├─ data/proyectos.ts        # PROYECTOS (datos de El trabajo)
│  ├─ data/favoritos.ts        # FAVORITOS (20 piezas de la persiana)
│  ├─ scripts/tema.ts navegacion.ts persiana.ts
│  └─ styles/tokens.css global.css
├─ astro.config.mjs            # salida estatica, sin integraciones
├─ tsconfig.json  package.json
```

**Carga de JS (Astro):**
- Script inline en `<head>` (Base.astro) que **resuelve el tema antes del primer pintado**.
- Scripts de cliente de Astro (vanilla) para navegación (riel, teclado, hint) y persiana.
- No se envía JS de framework (sin React).

---

## 3. Tipografía (Google Fonts)

La tipografía es **fija**: preset "Clásica" = todo **Libre Baskerville** (serifa). Se carga
una sola familia con un único `<link>`:

`Libre Baskerville` (ital 400/700).

Variables de fuente (`:root`): `--serif`, `--sans`, `--mono` — las tres apuntan a Libre
Baskerville. No hay cambio de tipografía en runtime (cargar una sola familia mejora la carga).

---

## 4. Sistema de diseño (tokens) — `src/styles/tokens.css`

### 4.1 Variables base (`:root`)
```
--paper / --wall / --ink / --soft / --faint        /* superficies y tinta */
--clay / --teal  = #2aa198 (aguamarino, acento real por defecto)
--amber = #c08a2e
--line / --line2                                    /* hairlines */
--serif / --sans / --mono = Libre Baskerville (ver §3)
--ease = cubic-bezier(.22,1,.36,1);  --bar = clamp(30px,5vh,52px)  /* alto del plaque */
```
> El acento es **fijo**: aguamarino `#2aa198` (`--clay` y `--teal` apuntan a él). Los
> editoriales `#b5503a`/`#3f8f87` quedan como respaldo no usado.

### 4.2 Temas (atributo `data-tema` en `<html>`)
Dos temas. Cada uno redefine paper/wall/ink/soft/faint/line/line2:

| Token | **Museo** (claro, default escritorio) | **Noche** (oscuro) |
|---|---|---|
| --paper | #fbfaf7 | #16130e |
| --wall  | #f1efe8 | #1d1812 |
| --ink   | #14120d | #ece4d4 |
| --soft  | #6b6457 | #a89c87 |
| --faint | #a39c8d | #736b5b |
| --line  | rgba(20,18,13,.16) | rgba(236,228,212,.22) |
| --line2 | rgba(20,18,13,.075) | rgba(236,228,212,.10) |

**Lógica de tema (script inline en `<head>`, corre antes de pintar):**
- Si hay `localStorage['sala-theme']` válido (`Museo`/`Noche`) → usarlo.
- Si no, seguir el dispositivo: `prefers-color-scheme: dark` → **Noche**, si no → **Museo**.
- Fija `data-tema="<Nombre>"` en `<html>` y `--clay`/`--teal` a `#2aa198`.
- API pública (Fase 1): `window.setSalaTheme(name)` persiste en `localStorage` y dispara el
  evento `salathemechange` (detalle = nombre). Expone `window.__salaTheme`.
- Listener de `matchMedia('(prefers-color-scheme: dark)')`: si el usuario **no** ha elegido
  tema manualmente, cambia Museo↔Noche al cambiar el SO.

### 4.3 Iconos (sprite SVG inline) — `IconSprite.astro`
Un `<svg width="0" height="0">` con `<symbol>` line-icons (stroke, sin relleno). Clase
`.ic` = `1em`, `stroke:currentColor`, `stroke-width:1.6`. IDs:
`ic-film, ic-game, ic-book, ic-music, ic-code, ic-server, ic-spark, ic-chart, ic-cloud,
ic-mail, ic-phone, ic-github, ic-doc, ic-chevron, ic-portrait, ic-sun, ic-moon`.

---

## 5. Layout / chrome global

### 5.1 Plaque superior (`.lb.top`) — fija, z-index 80
- Izquierda: `K. Herazo · **Portafolio**` (mono, mayúsculas, tracking ancho).
- Derecha: `Kevin Herazo — 2026` + botón redondo `#themeToggle` (icono `ic-sun`/`ic-moon`).
- Alto = `--bar`. `pointer-events:none` salvo enlaces/botón.

### 5.2 Riel lateral (`.rail`) — fijo derecha, centrado vertical, z-index 85
- Se genera por JS: un botón por escena (etiqueta `data-slate` + punto).
- Punto activo en color acento con halo. Etiqueta al hover. Click → scroll suave.
- Oculto en `max-width:820px`.

### 5.3 Hint de scroll (`.hint`)
Aparece a ~1.3s, se va al primer scroll/tecla o a ~6.2s. Texto:
`Desliza o usa [↑][↓] para recorrer las salas`. Oculto en móvil.

### 5.4 Carrete y escenas
- `.reel`: `height:100vh; overflow-y:scroll; scroll-snap-type:y mandatory; scroll-behavior:smooth;` scrollbar oculto.
- `.scene`: `min-height:100vh; scroll-snap-align:start; scroll-snap-stop:always;` flex column centrado; padding superior = `--bar` + holgura.
- `.wrap`: `max-width:1140px; margin:0 auto;`.
- **Móvil (≤820px):** se desactiva el snap; `.reel`/`.scene` pasan a flujo normal.

### 5.5 Navegación (`src/scripts/navegacion.ts`)
- `IntersectionObserver` (threshold .55) marca la escena activa → punto activo en el riel.
- Teclado: `↑/←/PageUp` retrocede, `↓/→/PageDown` avanza, `Home`/`End` extremos. Ignora si
  el foco está en input/textarea/select/contenteditable o con meta/ctrl/alt.

---

## 6. Contenido por escena

Cada `<section class="scene">` lleva `data-slate="<etiqueta riel>"` y
`data-screen-label="<idem>"`. "El trabajo" se muestra siempre en disposición Galería (fija).

### Escena 1 — Portada (`data-slate="Portada"`)
Grid 2 columnas (texto | retrato), colapsa a 1 col en ≤820px.
- Kick (mono, acento): **"Ingeniería de Sistemas"**
- H1 (serif italic en apellido): **"Kevin Axel"** / *"Herazo Rolón"* (apellido en `<em>` color acento).
- Rol (mono): **"Backend · Datos · Inteligencia Artificial — Bogotá"**
- Lista de actos (mono, con iconos): `ic-server` **I** — El trabajo · `ic-code` **II** — El
  equipo · `ic-film` **III** — Conóceme.
- Retrato: `<figure class="portrait">` con `img src="/assets/me/retrato.png"`, `onerror`
  añade clase `empty` (placeholder `ic-portrait` + "retrato"). Caption: **"Kevin A. Herazo
  R. · autorretrato"**. Marco con borde `--ink`, sombra, `aspect-ratio:4/5`.

### Escena 2 — I · El trabajo (`data-slate="El trabajo"`, `class="scene-trabajo"`)
Encabezado (`.sh`): acto **I**, título **"El *trabajo*"** (trabajo en italic teal), conteo
**"4 proyectos"**. Un contenedor `#twGaleria` (`.tw-galeria`) que rellena el render con la
disposición Galería (ver §7).

### Escena 3 — II · El equipo y los créditos (`data-slate="El equipo"`)
Encabezado: acto **II**, **"El *equipo* y los *créditos*"** (em teal), subtítulo
**"stack · formación"**. Grid 2 columnas (`.two`), colapsa en ≤760px.

**Columna Stack** (`.eh` = "Stack"), filas clave/valor (`.grp`, icono en la clave):
| Clave (icono) | Valor |
|---|---|
| Lenguajes (`ic-code`) | Python · Java · SQL · MongoDB |
| Backend (`ic-server`) | Spring Boot · Django · DRF · FastAPI |
| IA (`ic-spark`) | Claude · Gemini · Agentes · Skills · MCP |
| Datos / ML (`ic-chart`) | TensorFlow · Pandas · NumPy · Power BI |
| Cloud (`ic-cloud`) | Google Cloud · Vercel · Supabase |
| Control de versiones (`ic-github`) | Docker · Git · GitHub |

**Columna Formación** (`.eh` = "Formación"), ítems (`.ei` → título `.t`, sub `.s` con dos spans):
| Título | Izq. | Der. |
|---|---|---|
| U. Jorge Tadeo Lozano | Ingeniería de Sistemas | 2022 — Actual |
| Data Analytics | Google · Coursera | En curso |
| API Design & Fundamentals | Google Cloud · Apigee | ✓ |
| API Development | Google Cloud · Apigee | ✓ |
| API Security · OAuth / JWT | Google Cloud · Apigee | ✓ |

### Escena 4 — III · Conóceme (`data-slate="Conóceme"`, `class="act-persiana"`)
Encabezado: acto **III**, **"*Conóceme*"** (em), subtítulo **"20 piezas · cine · juegos ·
libros · música"**.
- `<div class="persiana" data-speed="2600"></div>` → la rellena `persiana.ts`.
- Nota (`.note`, mono): `// la última sala de la muestra: aquí están las piezas que me
  formaron el gusto —composición, ritmo y color. Pasá el cursor sobre una franja para abrirla.`
- Variables de categoría: `--p-cine:var(--clay); --p-juegos:var(--amber);
  --p-libros:var(--teal); --p-musica:#4f6fc0;`. Borde `--ink`.
- Móvil (≤820px): persiana apilada vertical (`--p-h:auto`).

### Escena 5 — Salida (`data-slate="Salida"`, `class="fin"`)
Centrada.
- Etiqueta (`.end`, acento): **"Salida · libro de visitas"**
- Frase grande (serif italic, `.q`): **"Hagamos el próximo."**
- Enlaces (`.links`, mono, con icono; el primero `.solid` = relleno ink):
  - `mailto:kevinaxelhr18@gmail.com` (`ic-mail`) — **kevinaxelhr18@gmail.com**
  - `tel:+573001908759` (`ic-phone`) — **+57 3001908759**
  - `https://github.com/KawKuroi` (`ic-github`, target _blank) — **github.com/KawKuroi**
  - `/assets/CV-Kevin-Herazo.pdf` (`ic-doc`, target _blank) — **CV**

---

## 7. "El trabajo" — datos y 3 disposiciones

### 7.1 Fuente de datos — `src/data/proyectos.ts`
Orden: Traductor de Lenguaje de Señas · Noti · Football Notificator · App de Turismo.
Cada proyecto: `titulo, icono, tags, chips[], anio, estado, repo, img, descripcion`. Las
imágenes apuntan a `/assets/projects/0N-*.png`. Toda `img` lleva `onerror` que añade `empty`
al contenedor → placeholder rayado con etiqueta "captura". Datos exactos en el archivo.

### 7.2 Disposición **Galería** (`#twGaleria`, `.tw-galeria`) — disposición fija (única)
Grid 2 col: botones a la izquierda + escenario a la derecha.
- Izquierda: botones `.twg-item` (num, título, tags, año). El activo (`.on`) lleva barra
  acento. Pista: `// clic en una obra para verla en grande`.
- Derecha: marco `.twg-frame` (aspect 3/2) con imágenes superpuestas (`.ph`), solo la activa
  visible (fade+scale). Debajo, placa `.twg-plate`: `En sala · obra NN`, título italic,
  descripción, meta (año · estado · Repo).
- **Selección SOLO por clic**, fija hasta el siguiente clic. Empieza en el proyecto 0.
- La escena crece (`height:auto; min-height:100vh`).

> Las disposiciones Lista y Detalle se eliminaron junto con el panel de Tweaks; la Galería
> es ahora la única.

---

## 8. Persiana / Conóceme — datos y comportamiento

### 8.1 Datos — `src/data/favoritos.ts` (`FAVORITOS`, 20 piezas)
Cada ítem: `{ c:categoría, t:título, s:subtítulo, img:url local, g:gradiente fallback, [wide:true] }`.
Categorías y orden exactos:

**Cine** (5): Mulholland Drive — David Lynch · 2001 *(wide)*; Interstellar — Christopher
Nolan · 2014; Cidade de Deus — Fernando Meirelles · 2002; Akira — Katsuhiro Otomo · 1988;
Blade Runner — Ridley Scott · 1982. → `/assets/movies/*.jpg`.

**Juegos** (5): Final Fantasy IX — Square · 2000; Red Dead Redemption 2 — Rockstar · 2018;
Zelda: Tears of the Kingdom — Nintendo · 2023; Elden Ring — FromSoftware · 2022; Resident
Evil 2 — Capcom · 2019. → `/assets/videogames/ff9.jpg rdr2.jpg totk.jpg elden.jpg re2.jpg`.

**Libros** (5): El hacedor — Jorge Luis Borges · 1960; Juramentada — Brandon Sanderson ·
2017; 1984 — George Orwell · 1949; El extranjero — Albert Camus · 1942; Ensayo sobre la
ceguera — José Saramago · 1995. → `/assets/books/*.jpg`.

**Música** (5): In Rainbows — Radiohead · 2007; MM..FOOD — MF DOOM · 2004; Data — Tainy ·
2023; Debí Tirar Más Fotos — Bad Bunny · 2025; Cementerio Club — Spinetta · Artaud · 1973.
→ `/assets/music/in_rainbows.jpg mm_food.jpg data.jpg dtmf.jpg artaud.jpg`.

> Los gradientes `g` son el respaldo visible si la carátula no carga (`onerror` oculta el
> `img`). Se autoran en `favoritos.ts` (el `favs.js` original no se conserva).

### 8.2 Componente persiana — `src/scripts/persiana.ts`
- Construye cada `.persiana` desde `FAVORITOS`. Cada pieza = `figure.pslat` con fondo
  gradiente (`.pph`), `img` (lazy, no-referrer), lomo vertical (`.pspine`) y caption (`.pcap`:
  chip de categoría `.pcat`, título `.pt` serif, sub `.ps` mono).
- **Acordeón:** la franja abierta (`.open`) crece (`flex-grow:var(--p-grow,8)`), se aclara y
  muestra el caption; las demás quedan oscurecidas (brightness .58). Lomo visible solo cerrada.
- **Autoplay:** avanza cada `data-speed` ms (2600). Se pausa al hover, al ocultar pestaña
  (`visibilitychange`) y fuera de viewport (`IntersectionObserver`). `data-open` = índice inicial.
- Color de categoría: lee `--p-cine/--p-juegos/--p-libros/--p-musica` del mount.
- Móvil (≤820px): columnas → filas; lomo horizontal.

### 8.3 Decoración de iconos
Tras construir la persiana, reemplaza el punto del chip `.pcat` por el line-icon de su
categoría (`Cine→ic-film, Juegos→ic-game, Libros→ic-book, Música→ic-music`).

---

## 9. Conmutador de tema

Único ajuste variable del sitio. El botón redondo del plaque (`#themeToggle`) alterna
**Noche ↔ Museo** vía `setSalaTheme`, cambia el icono sol/luna y persiste la elección en
`localStorage['sala-theme']`. Sin elección manual, el tema sigue a `prefers-color-scheme`.

No hay panel de Tweaks: la disposición (Galería), el acento (aguamarino `#2aa198`) y la
tipografía (Clásica) son fijos.

---

## 10. Detalles técnicos a respetar

- `<html lang="es">`. `<title>Kevin Axel Herazo Rolón — Sala</title>`.
- Imágenes con `onerror` → placeholder (nunca rota la maqueta si falta un asset).
- Respeto a `prefers-reduced-motion` en persiana, detalle y hint.
- Accesibilidad: `aria-label` en riel/botones, `aria-pressed` en items de galería,
  `aria-hidden` en sprite/hint.
- Sin librerías de UI: todo es Astro + vanilla JS + CSS (0 JS de framework).
- Móvil: se desactiva snap y riel; secciones en flujo normal.

---

## 11. Assets

Todos los binarios viven en `public/assets/` (único almacén; no se buscan en otros sitios):
- `me/retrato.png` — autorretrato (portada, 4/5). **Pendiente: lo aporta el usuario.**
- `projects/01-senas.png 02-football.png 03-noti.png 04-turismo.png` — capturas (3/2).
  **Pendiente: las aporta el usuario.**
- `movies/*.jpg` (5), `books/*.jpg` (5), `videogames/*.jpg` (5), `music/*.jpg` (5) — presentes.
- `CV-Kevin-Herazo.pdf` — presente (enlazado en la Salida).

> Mientras falten retrato y capturas, los `onerror`/gradientes degradan con gracia.

---

## 12. Criterios de aceptación
1. Cinco escenas con snap vertical; riel lateral sincronizado; teclado ↑/↓/Home/End.
2. Portada, Equipo y Salida con el copy exacto de §6.
3. "El trabajo" con los **4 proyectos** y texto exacto de §7, en disposición **Galería**
   (fija, única), con selección por clic.
4. "Conóceme" con la persiana de **20 piezas** (orden y datos de §8), autoplay 2.6s, hover
   abre, iconos por categoría.
5. Tema sigue al dispositivo, botón sol/luna alterna Museo↔Noche, persistencia en
   localStorage, sin parpadeo inicial.
6. Estructura rígida: disposición Galería, acento aguamarino `#2aa198` y tipografía Clásica
   fijos; sin panel de personalización. Tokens y temas de §4 idénticos.
7. Todo en español, sin emojis, degradación elegante de imágenes.
8. **Rendimiento:** build estático de Astro; 0 JS de framework; objetivo Lighthouse ≥95 en
   Performance.
9. **Despliegue:** publicado en Vercel (plan Hobby, gratuito) como sitio estático servido
   desde CDN, sin adaptador ni funciones serverless.
