# CURRENT — Estado del proyecto

## Fase activa
- **Activo:** Iniciativa **Reestructuración responsive móvil/tablet** (ver
  [ROADMAP.md](./ROADMAP.md)). El usuario rehízo la adaptación móvil/tablet en un documento de
  referencia propio; interesa la **estructura/organización de la información**, no colores ni
  detalles de diseño. **Escritorio (≥1025px) intacto**; la nueva estructura aplica **≤1024px**.
  Fase **M0 (cimientos)** cerrada; siguiente: **M1 (Portada)**.
- **Estado general:** Las 5 fases + SEO + ajustes de contenido cerradas. Sitio construido en
  Astro (0 JS de framework), desplegado en Vercel (estático desde CDN). Fotos reales ya
  integradas (retrato + 4 capturas en `.webp`). El formulario de contacto está **activo**
  (access key de Web3Forms ya pegada en `Salida.astro`). Verificado: `astro check`/`build`
  limpios. Última auditoría **Lighthouse móvil: Performance 99 · Accessibility 95 · Best
  Practices 96 · SEO 100** (previa a integrar las fotos; conviene re-auditar tras el deploy).

## Pendiente del usuario (no bloquea el build)
- (Opcional) Sustituir el retrato por un headshot editorial: la foto actual es una toma nocturna
  casual y se nota más ahora que la imagen es más grande.
- Autorizar el push de la iniciativa responsive cuando esté lista para publicar.

## Historial
- **2026-06-17** — Reestructuración responsive móvil/tablet · **Fase M0 (cimientos)**. Se mueve
  el corte responsive de 820px a **1024px** y se separa el sitio en dos modos: escritorio
  (≥1025px) conserva el carrete con `scroll-snap`, riel y plaque fija (intacto); móvil/tablet
  (≤1024px) pasa a **flujo vertical** (`.reel` a `height:auto`, sin snap), las escenas miden su
  contenido (sin `min-height:100vh`) con padding compacto vía `--pad` (20px teléfono, 44px
  tablet), se ocultan riel y hint, y el plaque pasa a **sticky** mostrando el nombre a la
  izquierda (`.lb-name`) y ocultando la meta de la derecha (`.lb-meta`). Arreglados dos colapsos
  que el flujo provocaba: la persiana de Conóceme y la altura de El trabajo (sus `@media`
  pasan a 1024px; El trabajo añade `min-height:0`). Verificado con capturas headless (Chrome) en
  390/768/1024/1440: escritorio pixel-idéntico y móvil/tablet fluyendo compactos sin secciones
  rotas. `astro check`/`astro build` limpios (0 errores).
- **2026-06-16** — Cache-busting de la tarjeta social. Renombrada `og-image.png` →
  `og-image-v2.png` y actualizada la referencia (`imagen` en `Base.astro` + generador + docs).
  Las plataformas sociales cachean la imagen por URL; el sufijo versionado fuerza a que
  re-lean la tarjeta nueva tras el deploy. Al volver a cambiarla, subir el sufijo (v3…).
- **2026-06-16** — Limpieza de "Sala" en el SEO. La tarjeta social `og-image.png` mostraba el
  eyebrow "PORTAFOLIO · SALA" (lo que aparecía en la previsualización de OpenGraph); regenerada
  a solo "PORTAFOLIO" con `scripts/gen-seo-assets.mjs` (`sharp` se instala bajo demanda con
  `npm i sharp --no-save`, ya no está en `package.json`). Retirada "Sala" también de la
  `description` de `package.json`, del comentario de cabecera de `Base.astro` y de los
  encabezados/§9 de `ARCHITECTURE`. **Se mantienen** los identificadores internos del codename
  (`sala-theme`/`setSalaTheme`/`salathemechange`), no visibles, para no resetear el tema
  guardado de los visitantes. Verificado: `astro check`/`build` limpios (0 errores).
- **2026-06-16** — Ajustes de contenido, contacto y limpieza de la metáfora de "salas".
  Portada: retirado el caption redundante del retrato y agrandada la imagen (`clamp(250–416px)`;
  móvil 280px). El trabajo: eliminada la línea "En sala · obra NN" sobre el título; el indicador
  "en línea" pasó a un punto verde con pulso junto a "Ver en línea" (solo proyectos con `demo`
  → Noti); fecha de Noti corregida a "May 2026". Conóceme: corregido el color de los títulos de
  la persiana en modo Noche (usaban `var(--paper)`, casi negro → invisibles; ahora claro fijo
  `#fbfaf7` en ambos temas, lo correcto sobre el gradiente oscuro). Contacto (antes "Salida"):
  nueva frase **"Contáctame."**, el teléfono copia al portapapeles con feedback "¡Copiado!" y el
  correo abre un formulario (`<dialog>` con honeypot anti-spam) que envía vía **Web3Forms** (sin
  backend; `mailto:`/`tel:` de respaldo sin JS). Retiradas las referencias visibles a "salas"
  (hint, `aria-label` del riel, nota de Conóceme, placa de proyectos, `<title>` → "— Portafolio",
  `data-slate` de la última sección → "Contacto"); se mantienen los identificadores internos del
  codename (`sala-theme`, `setSalaTheme`, `salathemechange`) por no ser visibles y para no perder
  el tema guardado de los visitantes. Añadido icono `ic-close` al sprite. Verificado:
  `astro check`/`build` limpios (0 errores).
- **2026-06-16** — Fase 6: SEO y metadatos sociales. `Base.astro` ahora emite el set completo
  de meta para social/buscadores: Open Graph, Twitter Card `summary_large_image`, `canonical`,
  `description` (todo parametrizado por props con la constante `SITIO` y URLs absolutas),
  `theme-color` claro/oscuro y JSON-LD (`Person` + `WebSite`). Añadidos iconos para buscadores
  e iOS/Android (`favicon.ico` con PNG 16/32/48 embebido, `favicon-16/32.png`,
  `apple-touch-icon` 180, `site.webmanifest` con iconos 192/512 maskable), `robots.txt`,
  `sitemap.xml` y la tarjeta social `og-image.png` 1200x630. Iconos y tarjeta generados con
  `scripts/gen-seo-assets.mjs` (sharp) desde `favicon.svg`; los binarios se commitean y Vercel
  los sirve estáticos. Responde al informe de OpenGraph (34/100): cubre todos los ERROR/WARNING
  (og:image, og:url, twitter:card/image, canonical, apple-touch-icon, favicon .ico/.png) y los
  TIP (og:site_name, og:locale, JSON-LD, theme-color, manifest); `twitter:site` se omite (sin
  handle de X confirmado). Verificado: `astro check`/`build` limpios y `<head>` de `dist/` con
  todas las URLs absolutas. **Pendiente de publicar:** push a `main` para que Vercel redespliegue
  y re-auditar en opengraph.xyz.
- **2026-06-16** — Despliegue y auditoría. Publicado en Vercel (Hobby) en
  `portfolio-topaz-nu-46.vercel.app`; build `astro build` autodetectado, output `dist/`, sin
  adaptador. Verificado el sitio en vivo (sirve las 5 salas y los enlaces de contacto) y
  auditado con Lighthouse móvil: Performance 99, Accessibility 95, Best Practices 96, SEO 100.
  Hallazgos no bloqueantes: 404 de los 5 assets pendientes (bajan Best Practices) y contraste
  del texto `--faint` heredado del diseño original (limita Accessibility). Cierra la Fase 5.
- **2026-06-16** — Fidelidad de diseño. Comparado el código 1:1 con el HTML original de Claude
  Design (`Sala - Kevin Herazo.html`) y re-skinneadas las 5 escenas + el chrome para coincidir:
  encabezados de escena horizontales (`.sh` con acto · título · línea · conteo), Portada con
  actos en fila y rol en mayúsculas (H1 weight 500), hint como chip oscuro arriba-derecha con
  teclas `<kbd>`, toggle de tema con icono del tema vigente (sol claro / luna Noche) en acento,
  Galería con número serif grande + barra de acento `::before` y placa con estado italic y
  "Repo" subrayado, Equipo con claves en mayúsculas y separadores superiores, Salida con botones
  cuadrados de hover relleno, y la persiana estirada para llenar el alto de la escena. Tokens,
  temas (Museo/Noche) y acento `#2aa198` ya coincidían. Verificado visualmente con capturas
  (Chrome headless) en desktop 1440 y móvil 390. `astro check`/`astro build` limpios.
- **2026-06-15** — Fase 5 (pulido). Accesibilidad: `aria-live="polite"` en la placa de la
  Galería para anunciar la obra seleccionada (el resto de aria ya estaba). Responsive: añadido
  el breakpoint ≤640px (plaque y padding de escena). Rendimiento: `fetchpriority="high"` en el
  retrato (LCP); galería y persiana ya en `lazy`; contenedores con `aspect-ratio` evitan CLS;
  `prefers-reduced-motion` cubierto por regla global + guardas en navegación/persiana. Build
  verificado: `dist/` estático, 0 archivos JS de framework, un único CSS. Pendiente: conectar
  y publicar en Vercel (requiere la cuenta del usuario) y auditar Lighthouse en el preview.
- **2026-06-15** — Fase 4. "Conóceme": persiana (acordeón de 20 carátulas). Las franjas se
  renderizan en build desde `FAVORITOS` (gradiente de respaldo `.pph`, carátula `.pimg` lazy +
  no-referrer con `onerror`, lomo vertical `.pspine` y caption `.pcap` con chip de categoría +
  icono, título italic y subtítulo mono). `persiana.ts` aporta el acordeón: hover/clic abre la
  franja y oscurece el resto, con autoplay cada 2.6s que se pausa al hover, al ocultar la
  pestaña, fuera del viewport y con `prefers-reduced-motion`. Iconos por categoría resueltos en
  build; variables de color por categoría en el mount; móvil pasa columnas→filas con lomo
  horizontal. Estilo de `.note` y crecimiento de la escena añadidos. Verificado con
  `astro check` (0 errores) y `astro build`.
- **2026-06-15** — Fase 3. "El trabajo" en disposición Galería (única). El render se genera
  en build desde `PROYECTOS` (4 obras): lista de botones `.twg-item` (num, título, tags, año)
  a la izquierda y escenario a la derecha con marco 3/2, obras superpuestas `.ph` (fade+scale)
  y placa `.twg-plate` (obra NN, título italic, descripción, meta año · estado · Repo). Un
  `<script>` mínimo (importa `PROYECTOS`) hace la selección por clic, fija, empezando en la
  obra 0; cada imagen degrada con `onerror` a un placeholder rayado "captura". Verificado con
  `astro check` (0 errores) y `astro build`.
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
