# ROADMAP — Portfolio "Sala"

Fases de construcción. Cada cambio marca su checkbox; al cerrar una fase completa, se mueve
al histórico. Referencias: [PRD.md](./PRD.md), [ARCHITECTURE.md](./ARCHITECTURE.md).

## Fase activa

### Fase 5 — Pulido y despliegue en Vercel
- [x] Accesibilidad (aria-label/aria-pressed/aria-current/aria-hidden/aria-live) y foco visible.
- [x] `prefers-reduced-motion` en todas las animaciones (regla global + guardas en JS de
      navegación y persiana).
- [x] Revisión responsive (≤820px sin snap/riel/persiana en filas, ≤760px Equipo 1 col,
      ≤640px ajustes de plaque/padding).
- [x] Optimización: `lazy` en galería/persiana, `fetchpriority=high` en el retrato (LCP),
      contenedores con `aspect-ratio` (sin CLS), 0 JS de framework y un único CSS.
- [ ] **(req. usuario)** Conectar el repo `github.com/KawKuroi/Portfolio` a **Vercel** (Hobby) y publicar.
- [ ] **(req. usuario)** Verificar build en Vercel (`astro build` autodetectado, output `dist/`, sin adaptador).
- [ ] **(req. usuario)** Confirmar dominio `*.vercel.app` y *preview deployments* por push; auditar Lighthouse (≥95).

> El pulido de código está completo y verificado (`astro check`/`astro build` limpios). Los
> tres pasos restantes requieren la cuenta de Vercel del usuario (conexión OAuth en el panel
> de Vercel) y autorización para hacer `git push` a origin.

## Histórico de fases completadas

### Fase 4 — Persiana / Conóceme (2026-06-15)
- [x] Franjas (20) renderizadas en build desde FAVORITOS (gradiente `.pph`, img lazy +
      no-referrer, lomo vertical `.pspine`, caption `.pcap`); `persiana.ts` aporta el acordeón.
- [x] Acordeón (hover/clic abre, oscurece el resto `brightness .58`) + autoplay 2.6s con
      pausas (hover, pestaña oculta, fuera de viewport, `prefers-reduced-motion`).
- [x] Decoración de iconos por categoría (cine/juegos/libros/música) resuelta en build.
- [x] Comportamiento móvil (columnas → filas, lomo horizontal) y variables de color de
      categoría (`--p-cine/--p-juegos/--p-libros/--p-musica`).

### Fase 3 — "El trabajo" (disposición Galería, fija) (2026-06-15)
- [x] Disposición Galería (`#twGaleria`) renderizada en build desde PROYECTOS: botones a la
      izquierda + escenario a la derecha.
- [x] Selección SOLO por clic (script mínimo), fija; empieza en el proyecto 0; placa con
      título italic, descripción y meta (año · estado · Repo).
- [x] Placeholder `onerror` rayado "captura" para imágenes de proyecto faltantes.

### Fase 2 — Escenas estáticas (Portada, Equipo, Salida) (2026-06-15)
- [x] Portada: grid texto|retrato, actos con iconos (I/II/III), retrato 4/5 con `onerror`
      a placeholder (ic-portrait + "retrato") y caption.
- [x] Equipo: grid Stack (5 filas con icono) + Formación (5 ítems) con el copy exacto de §6.
- [x] Salida: frase serif italic + enlaces mono con icono (mail/tel/github/CV), primero `.solid`.
- [x] Tipografía editorial compartida (`.scene h1/h2/em`, `.sh`/`.acto`/`.conteo`) en global.css.

### Fase 1 — Layout y chrome global (2026-06-15)
- [x] Plaque superior fija con estilos (mono, tracking) y botón de tema funcional.
- [x] `tema.ts`: `fijarTema`/`alternarTema`/`temaActual`/`iniciarTema`, persistencia,
      evento `salathemechange` y `window.setSalaTheme`/`__salaTheme` + listener del SO.
- [x] Botón `#themeToggle` alterna Museo↔Noche y cambia icono sol/luna en sync (`aria-pressed`).
- [x] `navegacion.ts`: riel lateral generado por JS (un botón por escena) y escena activa
      (IntersectionObserver threshold .55, `aria-current`).
- [x] Navegación por teclado (↑/↓/←/→/PageUp/PageDown/Home/End) con guardas de foco
      (campos editables y meta/ctrl/alt).
- [x] Hint de scroll (aparece ~1.3s, se va al primer gesto o ~6.2s; oculto en móvil).
- [x] Sprite de iconos afinado (round caps/joins 1:1) y clase `.ic` definida en global.css.

### Fase 0 — Scaffold, documentación y assets (2026-06-15)
- [x] Proyecto Astro inicializado (Astro 6, Vite incluido).
- [x] Estructura `src/` (layout, index, componentes stub, scripts stub, estilos base).
- [x] `tokens.css` con los 2 temas (Museo/Noche) y acento `#2aa198`.
- [x] `data/proyectos.ts` (4 proyectos) y `data/favoritos.ts` (20 piezas) poblados del PRD.
- [x] Assets consolidados en `public/assets/` (cine, libros, música, juegos) + CV copiado.
- [x] Descargadas las 3 carátulas faltantes de juegos (Zelda TOTK, Elden Ring, RE2).
- [x] Documentación base en `/docs` (PRD, ARCHITECTURE, ROADMAP, CURRENT, GLOBAL).
- [x] Eliminado el panel de Tweaks y React: estructura rígida (Galería · aguamarino ·
      Clásica), solo el tema es variable. Tipografía reducida a Libre Baskerville.
- [x] Decidido el hosting: **Vercel** (plan Hobby, gratuito), salida estática sin adaptador.

**Pendiente del usuario (no bloquea):** `public/assets/me/retrato.png` y las 4 capturas en
`public/assets/projects/`. Mientras tanto, los `onerror`/gradientes degradan con gracia.
