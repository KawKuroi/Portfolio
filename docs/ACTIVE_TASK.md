# ACTIVE_TASK — Conóceme sin bordes (como la referencia) + sin bordes blancos en Noche

### 1. Contexto y Archivos Afectados

Dos solicitudes relacionadas (ambas sobre **bordes**):

**A — Conóceme/persiana, igualar la referencia.** En el diseño original
`Portfolio_claude/portfolio/Sala - Kevin Herazo.html` la persiana se ve **sin bordes**: las
franjas van **pegadas** (sin separación) con una costura oscura casi negra; en la página
actual las franjas tienen un **hueco de 4px** que deja ver el fondo claro entre carátulas y se
lee como líneas/bordes. El usuario solo quiere cambiar **la separación de las franjas y el
borde**; el resto de la sección le gusta. (Referencia: `persiana.js` base = `gap:0` +
`.pslat{outline:1px solid rgba(6,8,11,.5)}`; la versión Astro usa `gap:4px` y sin costura.)

**B — Tema Noche sin bordes blancos.** En varias secciones, los marcos con `border:1px solid
var(--ink)` se ven como un **borde blanco/crema** en Noche (en Noche `--ink` es claro
`#ece4d4`). El usuario quiere quitarlos o que mantengan el color del borde del tema claro
(oscuro). Marcos afectados (mismo patrón en cuatro secciones):
- `Portada.astro` → `.portrait` (marco del retrato).
- `Trabajo.astro` → `.twg-frame` y `.twa-frame` (marcos de captura de proyecto).
- `Salida.astro` → `.cform` (marco del diálogo de contacto).
- `Persiana.astro` → marco exterior de la persiana (hoy ya suavizado a `--line` en Noche, pero
  `--line` en Noche sigue siendo crema → línea blanca tenue; el ajuste previo del 2026-06-17 no
  bastó).

Archivos a tocar (5):
- **src/styles/tokens.css** — definir el token de marco por tema.
- **src/components/Persiana.astro** — separación de franjas + costura + marco exterior.
- **src/components/scenes/Portada.astro** — marco del retrato.
- **src/components/scenes/Trabajo.astro** — marcos `.twg-frame` y `.twa-frame`.
- **src/components/scenes/Salida.astro** — marco del diálogo `.cform`.

No se tocan datos, scripts ni la estructura de escritorio. Las hairlines tenues `--line`/
`--line2` (divisores de Equipo, Portada, plaque, inputs, botones de contacto) **se conservan**:
son divisores sutiles de bajo opacidad, no los marcos blancos del reclamo (ver §2, deuda/alcance).

### 2. Evaluacion Critica

**Veredicto: buena idea, alineada con la referencia, PRD y GLOBAL.** Es un ajuste puramente
visual de bordes, sin tocar lógica, datos ni JS. Reduce dos fricciones reales: (A) la persiana
no coincide con la referencia que el usuario quiere imitar; (B) los marcos `--ink` se vuelven
blancos en Noche (ya hubo un parche parcial el 2026-06-17 que no resolvió del todo). No choca
con la rigidez del sistema (acento/tipografía/disposición fijos) ni con la regla "escritorio
congelado": las franjas y marcos existen igual en escritorio y móvil; solo cambia el color/gap.

**Problema de fondo:** `--ink` (color de tinta) se reutiliza como color de **marco**. En claro
funciona (marco oscuro sobre papel); en Noche `--ink` es claro y el marco sale blanco. La señal
correcta es separar el concepto "color de marco" del color de tinta, con un valor propio por
tema (oscuro en ambos, como hace la referencia con sus costuras casi negras).

Opciones para el color de marco en Noche:

- **A (recomendada) — Token semántico `--marco`.** Nuevo token en `tokens.css`: en Museo =
  `var(--ink)` (idéntico a hoy), en Noche = tono de tinta del tema **claro** semitransparente
  (`rgba(20,18,13,.55)`) → marco oscuro sutil, sin línea blanca, honra "mantener el color del
  borde del tema claro". Centraliza el arreglo (DRY) y reemplaza el parche por-elemento previo.
  Trade-off: añade un token al sistema (mínimo).
- **B — Override por elemento en Noche.** Repetir `:root[data-tema='Noche'] .x{border-color:…}`
  en cada componente (como el parche actual de la persiana). Sin token nuevo. Trade-off: cuatro
  reglas duplicadas, difícil de mantener y de mantener consistentes.
- **C — Quitar el marco en Noche (border: none).** Lo más simple. Trade-off: el retrato y las
  capturas pierden definición de borde sobre el fondo oscuro; menos elegante que un marco oscuro
  sutil (la referencia conserva costura oscura, no la elimina).

Para la persiana (solicitud A) se replica la referencia: `gap:0` (franjas pegadas) +
`.pslat{outline:1px solid rgba(6,8,11,.5)}` (costura oscura, igual en ambos temas) y el marco
exterior pasa a `--marco`.

**Deuda técnica prevista:** baja. (1) Se retira el override Noche de la persiana (limpia deuda
previa). (2) Alcance acotado a marcos `--ink`; las hairlines `--line/--line2` se conservan a
propósito (divisores estructurales sutiles, estándar en tema oscuro; oscurecerlas borraría la
estructura de Equipo/Portada). Si el usuario también las quiere fuera, se amplía en otro ciclo.
(3) Sin impacto en rendimiento, accesibilidad ni datos. Doc: anotar en CURRENT (menor).

### 3. Plan de Accion Detallado

> Implementa la **Opción A** (token `--marco`) + réplica de la persiana de la referencia.

Bloque 1 — Token de marco (tokens.css)

- [x] **Paso 1: src/styles/tokens.css** Añadir el token `--marco`:
  en `:root` y en `:root[data-tema='Museo']` → `--marco: var(--ink);` (marco oscuro, idéntico a
  hoy); en `:root[data-tema='Noche']` y en el bloque `@media (prefers-color-scheme: dark)
  :root:not([data-tema])` → `--marco: rgba(20, 18, 13, .55);` (tono de tinta claro, oscuro y
  sutil sobre el fondo Noche, sin línea blanca).

Bloque 2 — Persiana: separación + costura + marco (Persiana.astro)

- [x] **Paso 2: src/components/Persiana.astro** En `.persiana`: cambiar `gap: 4px` → `gap: 0`
  (franjas pegadas como la referencia) y `border: 1px solid var(--ink)` →
  `border: 1px solid var(--marco)`.
- [x] **Paso 3: src/components/Persiana.astro** En `.pslat`: añadir
  `outline: 1px solid rgba(6, 8, 11, .5);` (costura oscura entre franjas, igual a la referencia;
  delinea las carátulas pegadas en ambos temas).
- [x] **Paso 4: src/components/Persiana.astro** Eliminar el bloque override
  `:global(:root[data-tema='Noche']) .persiana { border-color: var(--line); }` (su comentario
  incluido): ya lo cubre `--marco`.

Bloque 3 — Marcos `--ink` → `--marco` en el resto de secciones

- [x] **Paso 5: src/components/scenes/Portada.astro** En `.portrait`, `border: 1px solid
  var(--ink)` → `border: 1px solid var(--marco)`.
- [x] **Paso 6: src/components/scenes/Trabajo.astro** En `.twg-frame` y en `.twa-frame`,
  `border: 1px solid var(--ink)` → `border: 1px solid var(--marco)` (dos reglas).
- [x] **Paso 7: src/components/scenes/Salida.astro** En `.cform`, `border: 1px solid var(--ink)`
  → `border: 1px solid var(--marco)`.

### 4. Reporte de Pruebas

**Estado:** [APROBADO]

- Cumplimiento funcional: (A) la persiana pasa a `gap:0` con costura oscura por franja
  (`outline:1px solid rgba(6,8,11,.5)`), igual a la referencia → franjas pegadas, sin el hueco
  claro que se leía como borde. (B) Se añade el token `--marco` (Museo = `var(--ink)` idéntico a
  hoy; Noche = `rgba(20,18,13,.55)`, oscuro y sutil) y se aplica a retrato, `.twg-frame`,
  `.twa-frame`, `.cform` y el marco exterior de la persiana → en Noche ya no hay borde blanco. Se
  retiró el override Noche previo de la persiana. Las hairlines `--line/--line2` quedan intactas.
- Español en lo nuevo: comentarios en español, sin emojis.
- Seguridad: grep de secretos en lo modificado sin valores hardcodeados nuevos; la única
  coincidencia `access_key: WEB3FORMS_KEY` (Salida.astro:146) es preexistente y no se tocó en
  este ciclo; el resto son menciones de "tokens" en comentarios.
- Consola: `npm run check` (astro check) → 0 errores, 0 warnings, 0 hints en 20 archivos.
- Pendiente: validación visual en producción (cambio de UI).
