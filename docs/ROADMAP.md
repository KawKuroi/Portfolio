# ROADMAP — Portfolio "Sala"

Fases de construcción. Cada cambio marca su checkbox; al cerrar una fase completa, se mueve
al histórico. Referencias: [PRD.md](./PRD.md), [ARCHITECTURE.md](./ARCHITECTURE.md).

## Fase activa

### Fase 1 — Layout y chrome global
- [ ] Plaque superior fija con estilos (mono, tracking) y botón de tema funcional.
- [ ] `tema.ts`: `setSalaTheme`, `alternarTema`, persistencia y evento `salathemechange`.
- [ ] Botón `#themeToggle` alterna Museo↔Noche y cambia icono sol/luna en sync.
- [ ] `navegacion.ts`: generar riel lateral (un botón por escena) y escena activa
      (IntersectionObserver threshold .55).
- [ ] Navegación por teclado (↑/↓/←/→/PageUp/PageDown/Home/End) con guardas de foco.
- [ ] Hint de scroll (aparece ~1.3s, se va al primer scroll/tecla o ~6.2s; oculto en móvil).
- [ ] Afinar geometrías del sprite de iconos (1:1 con el PRD).

## Próximas fases

### Fase 2 — Escenas estáticas (Portada, Equipo, Salida)
- [ ] Portada: grid texto|retrato, actos con iconos, retrato con `onerror` placeholder.
- [ ] Equipo: grid Stack (5 filas) + Formación (5 ítems) con el copy exacto de §6.
- [ ] Salida: frase serif italic + enlaces mono con icono (mail/tel/github/CV).

### Fase 3 — "El trabajo" (3 disposiciones)
- [ ] Disposición Lista (`#twLista`).
- [ ] Disposición Galería (`#twGaleria`, default, selección por clic fija).
- [ ] Disposición Detalle (`#twDetalle`, fade-up por IntersectionObserver).
- [ ] CSS de selección por `data-trabajo`.

### Fase 4 — Persiana / Conóceme
- [ ] `persiana.ts`: construir franjas desde FAVORITOS (gradiente, img, lomo, caption).
- [ ] Acordeón (hover abre, oscurece el resto) + autoplay 2.6s con pausas.
- [ ] Decoración de iconos por categoría (cine/juegos/libros/música).
- [ ] Comportamiento móvil (columnas → filas) y `prefers-reduced-motion`.

### Fase 5 — Panel de Tweaks (island React)
- [ ] Shell `TweaksPanel.tsx` (useTweaks + controles Radio/Select/Color/Section).
- [ ] `SalaTweaks.tsx`: Disposición, Tema (Museo·Noche), Acento, Tipografía en vivo.
- [ ] Presets de tipografía (Sala/Editorial/Moderno/Plex/Clásica).
- [ ] Sincronización con el botón de tema (`salathemechange`).

### Fase 6 — Pulido y despliegue
- [ ] Accesibilidad (aria-label/aria-pressed/aria-hidden) y foco visible.
- [ ] `prefers-reduced-motion` en todas las animaciones.
- [ ] Revisión responsive completa (≤820px y ≤640px).
- [ ] Optimización de imágenes y auditoría Lighthouse (≥95 Performance).
- [ ] Definir hosting estático y desplegar.

## Histórico de fases completadas

### Fase 0 — Scaffold, documentación y assets (2026-06-15)
- [x] Proyecto Astro inicializado (Astro 6 + @astrojs/react + React 19, Vite incluido).
- [x] Estructura `src/` (layout, index, componentes stub, scripts stub, estilos base).
- [x] `tokens.css` con los 2 temas (Museo/Noche) y acento `#2aa198`.
- [x] `data/proyectos.ts` (4 proyectos) y `data/favoritos.ts` (20 piezas) poblados del PRD.
- [x] Assets consolidados en `public/assets/` (cine, libros, música, juegos) + CV copiado.
- [x] Descargadas las 3 carátulas faltantes de juegos (Zelda TOTK, Elden Ring, RE2).
- [x] Documentación base en `/docs` (PRD, ARCHITECTURE, ROADMAP, CURRENT, GLOBAL).

**Pendiente del usuario (no bloquea):** `public/assets/me/retrato.png` y las 4 capturas en
`public/assets/projects/`. Mientras tanto, los `onerror`/gradientes degradan con gracia.
