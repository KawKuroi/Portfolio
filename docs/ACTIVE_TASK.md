# ACTIVE_TASK — Aclarar que el correo abre un formulario (Escena Contacto)

### 1. Contexto y Archivos Afectados

Solicitud: en la escena de Contacto (Salida) no queda claro que el enlace del correo, al
hacer clic, abre un formulario dentro de la página para enviar el mensaje. Hay que
replantear esa pieza para que la acción quede evidente.

Estado actual: el enlace `.solid` muestra la dirección literal `kevinaxelhr18@gmail.com`
con el icono `ic-mail`. Ese patrón (dirección + sobre) se lee como un `mailto:` clásico:
el visitante espera abrir su cliente de correo, no un formulario embebido. El JS sí abre un
`<dialog>` con formulario (Web3Forms) y deja `mailto:` como respaldo sin JS, pero nada en la
etiqueta anuncia ese comportamiento.

- **src/components/scenes/Salida.astro** — escena Contacto. Único archivo a tocar:
  (a) la `<nav class="links">` con el enlace del correo (`.solid [data-form-open]`);
  (b) opcionalmente, una nota guía mono bajo los enlaces; (c) estilos scoped si la nota
  necesita formato. El `<dialog>`, el JS y el respaldo `mailto:` se conservan intactos.

No hay cambios de datos ni de otras escenas. El PRD (§6, Escena 5) describe la Salida con el
correo como `mailto:`; si se cambia la etiqueta visible, conviene anotarlo, pero el PRD ya
está algo desfasado respecto al formulario actual (no menciona el dialog), así que la
sincronización de doc es menor y opcional en este ciclo.

### 2. Evaluacion Critica

**Veredicto: buena idea, alineada con PRD y arquitectura.** Es un ajuste de claridad/UX de
bajo riesgo: copy + un atributo de accesibilidad, sin JS nuevo, sin dependencias, sin tocar
el flujo de envío. Mejora una fricción real (el usuario no descubre el formulario). No choca
con GLOBAL (español, sin emojis, tono editorial) ni con el stack (vanilla).

**Problema de fondo:** el enlace comunica un *destino* (una dirección de correo) cuando en
realidad dispara una *acción* (abrir un formulario). La señal correcta es convertirlo en una
llamada a la acción y reforzarlo para lectores de pantalla.

Opciones:

- **A (recomendada) — CTA de acción + nota guía.** Cambiar el texto del enlace de la
  dirección a una acción ("Escríbeme") y añadir bajo los enlaces una nota mono breve, al
  estilo editorial del sitio (`// …`), que diga que el correo abre un formulario sin salir
  del sitio. Sumar `aria-haspopup="dialog"` al enlace. Doble señal (etiqueta + nota) y
  accesibilidad correcta. Trade-off: la dirección literal deja de verse en primer plano,
  pero sigue dentro del formulario ("¿Prefieres el correo directo?", con copiar).
- **B — Solo relabel autoexplicativo.** Cambiar el texto a algo como "Abrir formulario de
  contacto" + `aria-haspopup="dialog"`, sin nota extra. Mínimo cambio; la etiqueta sola
  explica. Trade-off: más larga y menos editorial; sin refuerzo.
- **C — Conservar el correo visible + sub-etiqueta.** Mantener `kevinaxelhr18@gmail.com`
  como texto y añadir un segundo renglón "abre un formulario" dentro del botón. Conserva la
  dirección a la vista. Trade-off: el botón pasa a dos renglones y rompe la fila uniforme de
  enlaces; visualmente más ruidoso.

**Deuda técnica prevista:** mínima. (1) Desfase doc: el PRD §6 todavía describe el correo
como `mailto:` simple y no menciona el formulario; este ciclo lo puede alinear en una línea.
(2) Mantenibilidad: añadir una nota guía agrega copy que habrá que cuidar al traducir/editar;
es texto estático, sin lógica. Sin impacto en rendimiento, seguridad ni accesibilidad
(esta última mejora con `aria-haspopup`).

### 3. Plan de Accion Detallado

> Implementa la **Opción A adaptada** (decisión del usuario: conservar el correo visible):
> se mantiene la dirección literal como etiqueta del enlace y se aclara el comportamiento con
> una nota guía mono + `aria-haspopup`. El texto exacto de la nota se confirma en el gate.

Bloque 1 — Reforzar la pieza del correo (sin quitar la dirección)

- [x] **Paso 1: src/components/scenes/Salida.astro** En la `<nav class="links">`, en el
  enlace `<a class="solid" href="mailto:…" data-form-open>`: conservar el texto visible
  `kevinaxelhr18@gmail.com` y el icono `ic-mail`, y añadir el atributo
  `aria-haspopup="dialog"` (anuncia a lectores de pantalla que abre un diálogo). Conservar
  `class="solid"`, `href="mailto:…"` (respaldo sin JS) y `data-form-open`.
- [x] **Paso 2: src/components/scenes/Salida.astro** Añadir, justo después de la
  `</nav>` de `.links`, una nota guía mono breve:
  `<p class="links-nota">// el correo abre un formulario para enviarme tu mensaje aquí mismo</p>`.

Bloque 2 — Estilos de la nota

- [x] **Paso 3: src/components/scenes/Salida.astro** En el `<style>` scoped, añadir la
  regla `.links-nota` (familia `--mono`, tamaño ~10.5px, `letter-spacing`, color `--faint`,
  `margin-top` pequeño y `text-align:center`) acorde a la estética sobria; sin emojis.

Bloque 3 — Sincronizar documentación (menor)

- [x] **Paso 4: docs/PRD.md** En §6, Escena 5 (Salida), actualizar la línea del correo para
  reflejar que el enlace abre un formulario de contacto (Web3Forms) con respaldo `mailto:`,
  en vez de describirlo como `mailto:` simple.

### 4. Reporte de Pruebas

**Estado:** [APROBADO]

- Cumplimiento funcional: el correo conserva la dirección visible y el icono; se añadió
  `aria-haspopup="dialog"` y la nota mono `// el correo abre un formulario para enviarme tu
  mensaje aquí mismo`. El `<dialog>`, el JS y el respaldo `mailto:` quedan intactos. PRD §6
  Escena 5 sincronizado.
- Español en contenido nuevo: correcto, tono editorial, sin emojis.
- Seguridad: grep de secretos en el archivo modificado sin valores hardcodeados nuevos; la
  única coincidencia es `access_key: WEB3FORMS_KEY` (referencia a variable). La clave
  Web3Forms es preexistente y pública por diseño (documentada en el código), no introducida
  en este ciclo.
- Consola: `npm run check` (astro check) → 0 errores, 0 warnings, 0 hints en 21 archivos.
- Pendiente: validación visual en producción (cambio de UI).
