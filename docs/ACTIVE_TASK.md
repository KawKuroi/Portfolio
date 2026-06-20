# ACTIVE_TASK — Internacionalización a inglés (ES/EN) + botón de idioma

### 1. Contexto y Archivos Afectados

**Solicitud.** Añadir inglés a todo el sitio: (a) un botón para cambiar de idioma **al lado del
botón de tema**, con la estética minimalista actual; (b) **detección automática del idioma del
dispositivo** por defecto; (c) **buen inglés** en todo el copy; (d) que el sistema quede
**fácilmente adaptable** (al cambiar o añadir texto, traducir sea trivial). Hoy todo el copy está
en español **hardcodeado** dentro de cada componente y de los datos; no existe ninguna capa i18n.

**Por qué se exceden los 5 archivos (justificado).** La i18n es transversal: cada archivo que
emite texto visible debe pasar a leer cadenas de un diccionario. No hay forma de acotarlo a 5 sin
dejar secciones en español. Archivos implicados (17):

- **Infraestructura (nueva):** `astro.config.mjs` (config i18n), `src/i18n/ui.ts` (diccionario +
  helpers, nuevo), `src/components/Pagina.astro` (composición compartida de la página, nuevo),
  `src/pages/index.astro` (ES), `src/pages/en/index.astro` (EN, nuevo).
- **Layout/SEO/detección:** `src/layouts/Base.astro` (lang, title/description por idioma,
  `og:locale`, `hreflang`, JSON-LD, script inline de detección/redirección), `public/sitemap.xml`.
- **Chrome:** `src/components/Plaque.astro` (botón de idioma + script), `src/components/Hint.astro`,
  `src/components/Rail.astro` y `src/scripts/navegacion.ts` (aria + etiquetas del riel).
- **Escenas:** `src/components/scenes/Portada.astro`, `Trabajo.astro`, `Equipo.astro`,
  `Conoceme.astro`, `Salida.astro` y `src/components/Persiana.astro`.
- **Datos:** `src/data/proyectos.ts` (campos de copy a `Record<Idioma,string>`). `favoritos.ts`
  **no cambia**: títulos/subtítulos son nombres propios; la etiqueta de categoría se traduce desde
  el diccionario manteniendo la clave (`c`) estable.

**Inventario de texto a traducir** (resumen): Portada (kick, rol, actos), encabezados de escena +
conteos (`El trabajo`, `El equipo y los créditos`, `Conóceme`, `stack · formación`, `N proyectos`,
`20 piezas · …`), pistas/notas (`// clic en una obra…`, nota de Conóceme, `links-nota`), Hint,
etiquetas del riel (`data-slate`), aria-labels, categorías (Cine/Juegos/Libros/Música), formulario
de contacto completo (título, sub, campos, botón, estados del envío, feedback "¡Copiado!"),
descripciones/estado/tags/año de los 4 proyectos, y metadatos SEO (title, description, jobTitle,
`og:locale`, `inLanguage`). Nombres propios (Kevin Axel Herazo Rolón, títulos de películas/libros/
juegos/discos, marcas técnicas) **no** se traducen.

**Restricciones del proyecto (GLOBAL/PRD/ARCHITECTURE).** Astro estático, **0 JS de framework**,
sin librerías nuevas (i18n nativo de Astro), Lighthouse ≥95, `prefers-color-scheme`/
`prefers-reduced-motion`. **Identificadores y comentarios del código siguen en español** (GLOBAL);
lo que se internacionaliza es el **copy del producto**. El **escritorio (≥1025px) está congelado**:
solo cambia el texto, no el layout (ojo a las líneas con `white-space:nowrap`, ver §2).

### 2. Evaluacion Critica

**Veredicto: buena idea y bien alineada, con un matiz de PRD.** Internacionalizar aporta valor
real (alcance internacional de un portafolio de ingeniería) y el usuario pide explícitamente un
sistema *mantenible*. El único choque es que el PRD declara "sitio en español"; este cambio lo
**actualiza** a bilingüe ES/EN con ES por defecto (se sincroniza el doc). No rompe la rigidez del
sistema (acento/tipografía/disposición fijos) ni el escritorio congelado.

**Decisión de fondo — cómo materializar la i18n en un sitio 100% estático sin JS de framework:**

- **A (recomendada) — Enrutado i18n nativo de Astro: dos páginas prerenderizadas (`/` ES + `/en/`
  EN) + diccionario tipado.** Se activa `i18n` en `astro.config.mjs`, se extrae **todo** el copy a
  `src/i18n/ui.ts` (`Record<Idioma, …>` fuertemente tipado) y cada componente lee su idioma de
  `Astro.currentLocale`. El botón de idioma es un enlace a la URL hermana; la detección/redirección
  va en un script inline en `<head>` (igual patrón que el tema, sin parpadeo). **Pros:** ambos
  idiomas en HTML estático → SEO perfecto (`hreflang`, `lang`, canonical/`og` por idioma); 0 JS de
  framework; **el diccionario tipado hace que añadir/cambiar texto sea trivial y que falte una
  traducción sea error de compilación** (cumple "fácilmente adaptable"); escalable a más idiomas.
  **Trade-off:** refactor amplio (cada componente se parametriza) y una segunda ruta.
- **B — Una sola página + intercambio de texto por JS (`data-i18n`).** Se mantiene `/` en español y
  un script vanilla cambia `textContent`/atributos al activar EN. **Pros:** sin cambiar el enrutado.
  **Contras:** el HTML estático solo contiene español → **se pierde el SEO** que se construyó (la
  versión EN nunca se prerenderiza); riesgo de parpadeo (FOUC) español→inglés; hay que duplicar la
  lógica para **todas** las cadenas dinámicas de JS (placa de El trabajo, estados del formulario,
  "¡Copiado!"); más JS en runtime y más frágil de mantener (hay que acordarse de etiquetar cada
  texto). Va en contra del espíritu "0 JS de framework" y de "buen SEO".
- **C — Subdominio/host distinto para EN.** Descartada: complica el despliegue en Vercel sin
  beneficio frente a A para un sitio de una página.

**Recomendada: A.** Es la idiomática en Astro, conserva el SEO, mantiene 0 JS de framework y es la
más mantenible (justo lo que pide el usuario).

**Diseño del botón (estética minimalista).** Botón redondo gemelo del de tema (mismo tamaño 34px,
mismo borde `--line`, hover a `--ink`), colocado **a la izquierda del de tema** dentro de
`.lb-right`. Contenido: el **código del idioma destino** en mono (`EN` en la página ES, `ES` en la
EN), que es más claro que un globo (un globo no dice a qué idioma cambia) y encaja con el mono en
mayúsculas del plaque. `aria-label` traducido ("Switch to English" / "Cambiar a español"). No se
añaden iconos nuevos al sprite.

**Deuda técnica / riesgos previstos (concretos):**
1. **Líneas `nowrap` del escritorio.** El `.role` de la Portada está dimensionado (`~0.9vw`,
   `white-space:nowrap`) para que el español quepa bajo el H1. El inglés debe mantenerse **corto**
   (`Data · AI · Automation — Bogotá`) para no desbordar; el Tester lo verifica.
2. **Clave vs etiqueta de categoría.** `data-cat`/`data-f` y los selectores CSS `[data-cat='Cine']`
   usan la categoría como **clave**. Se mantiene la clave en español y solo se traduce la **etiqueta
   visible** (desde el diccionario). Igual con `data-slate`: pasa a ser etiqueta traducida, pero
   `navegacion.ts` lo usa como rótulo y por índice, no compara su valor, así que es seguro.
3. **Redirección por detección.** Solo en cliente (sitio estático). Regla: elección manual
   (localStorage `sala-lang`) manda; si no hay, sigue `navigator.language`; redirige una sola vez
   con `location.replace` (sin bucle: tras redirigir, el idioma de la página ya coincide). Los
   buscadores ven ambas páginas y los `hreflang`, así que no afecta al SEO.
4. **Cadenas en scripts de cliente** (Trabajo, Salida, navegacion): leen el idioma de
   `document.documentElement.lang` e importan el diccionario/datos → una sola fuente de verdad.
5. Sin impacto en rendimiento (sigue estático, un CSS, 0 framework) ni accesibilidad (aria
   traducido, foco visible conservado). Doc: actualizar PRD (idioma), ARCHITECTURE (sección i18n) y
   GLOBAL (matiz: copy bilingüe, identificadores en español).

### 3. Plan de Accion Detallado

> Implementa la **Opción A** (enrutado i18n nativo + diccionario tipado) con el botón de código de
> idioma. ES por defecto en `/`, EN en `/en/`.

**Bloque 0 — Infraestructura i18n**

- [x] **Paso 1: astro.config.mjs** Añadir `i18n: { defaultLocale: 'es', locales: ['es', 'en'],
  routing: { prefixDefaultLocale: false } }` para servir ES en `/` y EN en `/en/` y habilitar
  `Astro.currentLocale` y `getRelativeLocaleUrl`.
- [x] **Paso 2: src/i18n/ui.ts (nuevo)** Definir `export type Idioma = 'es' | 'en'`,
  `export const IDIOMAS`, el diccionario `export const UI: Record<Idioma, {...}>` con **todo** el
  copy estático (kick, rol, actos, encabezados y conteos de escena, hint, etiquetas del riel/aria,
  categorías, notas, formulario completo y feedback, defaults de SEO: title/description/jobTitle/
  knowsAbout/ogLocale) y los helpers `export function obtenerIdioma(locale?: string): Idioma`
  (coerción con respaldo 'es') y `export function obtenerTextos(idioma: Idioma)` (= `UI[idioma]`).
  Tipado estricto: cualquier clave faltante en un idioma es error de compilación.

**Bloque 1 — Datos localizados**

- [x] **Paso 3: src/data/proyectos.ts** Cambiar a `Record<Idioma, string>` los campos de copy
  (`titulo`, `tags`, `anio`, `estado`, `descripcion`) en la interfaz `Proyecto` y en los 4 objetos,
  con su traducción EN (descripciones reescritas en buen inglés; `titulo`: "Sign Language
  Translator", "Tourism App", etc.; `estado`: "In progress"/"Daily"…; `anio`: "Apr 2026"…). El
  resto de campos (icono, chips, repo, demo, img) sin cambios.

**Bloque 2 — Layout, SEO y detección**

- [x] **Paso 4: src/layouts/Base.astro** (1) Resolver `const idioma = obtenerIdioma(
  Astro.currentLocale)` y poner `<html lang={idioma}>`. (2) Defaults de `titulo`/`descripcion` y la
  cadena `jobTitle`/`knowsAbout`/`inLanguage` del JSON-LD desde el diccionario según idioma;
  `og:locale` = `es_ES`/`en_US` + `og:locale:alternate`. (3) Añadir `<link rel="alternate"
  hreflang="es" href="<SITIO>/">`, `hreflang="en" href="<SITIO>/en/">` y `hreflang="x-default"`;
  `canonical` ya deriva de la ruta. (4) Añadir un **script inline** (junto al del tema, antes del
  pintado) que lee `localStorage['sala-lang']`; si no hay, usa `navigator.language`; si el idioma
  deseado difiere de `document.documentElement.lang`, hace `location.replace('/en/' o '/')`.
- [x] **Paso 5: public/sitemap.xml** Añadir la URL `/en/` (con `xhtml:link` alternate si aplica) para
  que ambos idiomas se indexen.

**Bloque 3 — Páginas (rutas ES/EN)**

- [x] **Paso 6: src/components/Pagina.astro (nuevo)** Mover aquí la composición actual de
  `index.astro` (Plaque/Rail/Hint dentro de Base + las 5 escenas + el `<script>` de
  `iniciarNavegacion`). Los componentes leen su idioma de `Astro.currentLocale`.
- [x] **Paso 7: src/pages/index.astro** Reducir a `import Pagina` + `<Pagina />` (ruta ES `/`).
- [x] **Paso 8: src/pages/en/index.astro (nuevo)** `import Pagina` + `<Pagina />` (ruta EN `/en/`).

**Bloque 4 — Chrome (plaque + idioma, hint, riel)**

- [x] **Paso 9: src/components/Plaque.astro** Añadir, **a la izquierda del `#themeToggle`** dentro de
  `.lb-right`, un enlace botón `#langToggle` (clase compartida con el de tema) con el código del
  idioma destino (`EN`/`ES`) y `aria-label` traducido; `href` a la URL hermana
  (`getRelativeLocaleUrl`). En el `<script>`, al hacer clic persistir la elección en
  `localStorage['sala-lang']` (deja navegar el enlace). Traducir el `aria-label` "Cambiar tema".
- [x] **Paso 10: src/components/Hint.astro** Sustituir el copy por `t` (leer `Astro.currentLocale`):
  "Desliza o usa … para recorrer el portafolio" / "Swipe or use … to move through the portfolio".
- [x] **Paso 11: src/components/Rail.astro + src/scripts/navegacion.ts** `aria-label` del riel desde
  el diccionario (Rail por `currentLocale`); en `navegacion.ts`, el prefijo "Ir a "/"Go to " del
  aria de cada punto se lee de `UI[idioma]` con `idioma` desde `document.documentElement.lang`.

**Bloque 5 — Escenas (texto)**

- [x] **Paso 12: src/components/scenes/Portada.astro** kick, rol (EN corto, ver §2 riesgo 1), actos
  (I/II/III + nombres), `alt` y placeholder "retrato" desde `t`. `data-slate`/`data-screen-label`
  traducidos. El H1 (nombre propio) no cambia.
- [x] **Paso 13: src/components/scenes/Trabajo.astro** Encabezado, conteo "N proyectos"/"N projects",
  pista "// clic…", `alt` "Captura de…"/"Screenshot of…", "Ver en línea"/"View live", "Repo"/"Repo
  →" desde `t`; render lee `proyecto.campo[idioma]`. En **ambos `<script>`** leer `const idioma`
  desde `document.documentElement.lang` y volcar la placa con los campos `[idioma]` de `PROYECTOS`.
  `data-slate` traducido.
- [x] **Paso 14: src/components/scenes/Equipo.astro** Encabezado, "stack · formación", "Stack"/
  "Formación", etiquetas de filas (Lenguajes/Backend/IA/Datos · ML/Cloud/Control de versiones) y la
  Formación (títulos genéricos como "En curso"/"Actual" traducidos; "U. Jorge Tadeo Lozano" y marcas
  se mantienen) desde `t`. `data-slate` traducido.
- [x] **Paso 15: src/components/scenes/Conoceme.astro** Encabezado "Conóceme", subtítulo "20 piezas
  · …", `aria-label` del filtro y chips (Todo/Cine/…); **mantener `data-f` con la clave en español**
  para casar con `data-cat`. La nota "// aquí están las piezas…" desde `t`. `data-slate` traducido.
- [x] **Paso 16: src/components/Persiana.astro** La etiqueta visible de la categoría (`{f.c}`) pasa a
  `t.categorias[f.c]`; `data-cat={f.c}` (clave) **sin cambios**. `alt` ya deriva de t/datos propios.
- [x] **Paso 17: src/components/scenes/Salida.astro** Frase "Contáctame."/"Let's talk.", `aria-label`,
  `links-nota`, y todo el formulario (`Escríbeme`, sub, `Nombre (opcional)`, `Correo`, `Mensaje`,
  `Enviar`, "¿Prefieres el correo directo?", "Cerrar") desde `t`. En el `<script>`, leer `idioma` de
  `document.documentElement.lang` y tomar de `UI[idioma]` los textos dinámicos ("¡Copiado!",
  "Enviando…", mensajes de éxito/error) y el `subject`/`from_name` de Web3Forms. `data-slate`
  traducido. La access key y la lógica de envío no cambian.

**Bloque 6 — Documentación**

- [x] **Paso 18: docs (PRD, ARCHITECTURE, GLOBAL)** PRD: el sitio pasa a **bilingüe ES/EN** (ES por
  defecto), con resumen del sistema i18n. ARCHITECTURE: nueva sección "Internacionalización"
  (enrutado nativo `/` + `/en/`, diccionario `src/i18n/ui.ts`, detección inline, `hreflang`).
  GLOBAL: matizar que el **copy del producto es bilingüe** mientras que **identificadores y
  comentarios siguen en español**.

### 4. Reporte de Pruebas

**Estado:** [APROBADO]

- **Cumplimiento funcional.** (a) Botón de idioma `#langToggle` en el plaque a la **izquierda** del
  de tema, redondo gemelo (34px, mismo borde/hover), con el código del idioma destino en mono y
  `aria-label` traducido. (b) **Detección automática**: script inline en `<head>` que sigue
  `navigator.language` salvo elección manual en `localStorage['sala-lang']`, con redirección única.
  (c) **Inglés completo** vía diccionario tipado `src/i18n/ui.ts` (todo el copy, SEO, aria, datos de
  proyectos). (d) **Adaptable**: añadir/cambiar texto = editar el diccionario; clave faltante en un
  idioma = error de compilación. Verificado en el build: `dist/index.html` (`lang="es"`, botón → `/en/`
  "EN", "El trabajo") y `dist/en/index.html` (`lang="en"`, botón → `/` "ES", "The work", "Systems
  Engineering"); `hreflang` es/en/x-default y `og:locale`+alternate en ambas; ambas URLs en el sitemap.
- **Convención de idioma.** Identificadores y comentarios nuevos en español (`obtenerIdioma`,
  `obtenerTextos`, `idioma`, `otroIdioma`, `textos`, tipos `Idioma`/`Textos`/`Bilingue`); las claves
  de categoría y `data-*` se mantienen en español. Lo bilingüe son solo los **valores** de copy del
  producto (permitido). Sin emojis. TypeScript `strict`, sin `any` nuevo.
- **Seguridad.** Grep de secretos en lo modificado: sin credenciales nuevas. La única coincidencia
  (`access_key: WEB3FORMS_KEY`, Salida.astro) es **preexistente** (clave pública de Web3Forms por
  diseño, ya en el repo); este ciclo solo cambió `subject`/`from_name` alrededor.
- **Consola.** `npm run check` (astro check) → **0 errores, 0 warnings, 0 hints** (23 archivos).
  `npm run build` → OK, **2 páginas** estáticas (`/` y `/en/`), 0 JS de framework.
- **Riesgo de layout (escritorio).** El `.role` de la Portada va en `nowrap`; el inglés
  (`Data · AI · Automation — Bogotá`) es más corto que el español, así que no desborda.
- **Pendiente:** validación visual del usuario en producción (cambio de UI).
