# CURRENT — Estado del proyecto

## Fase activa
- **Activo:** Fase 1 — Layout y chrome global (ver [ROADMAP.md](./ROADMAP.md)).
- **Estado general:** Fase 0 completada. Scaffold de Astro funcionando, datos y assets
  consolidados, documentación base creada. Listo para construir el chrome global.

## Pendientes que aporta el usuario (no bloquean el desarrollo)
- `public/assets/me/retrato.png` — autorretrato (relación 4/5).
- `public/assets/projects/01-senas.png` — captura Traductor de Señas (3/2).
- `public/assets/projects/02-football.png` — captura Football Notificator (3/2).
- `public/assets/projects/03-noti.png` — captura Noti (3/2).
- `public/assets/projects/04-turismo.png` — captura App de Turismo (3/2).

Mientras falten, el `onerror` muestra placeholders y la maqueta no se rompe.

## Historial
- **2026-06-15** — Fase 0. Inicializado el proyecto con Astro 6 + @astrojs/react (React 19;
  Vite incluido en Astro). Creada la estructura `src/` (Base.astro, index.astro, componentes
  y scripts stub, `tokens.css`/`global.css` con los 2 temas Museo/Noche y acento `#2aa198`).
  Poblados `data/proyectos.ts` (4 proyectos) y `data/favoritos.ts` (20 piezas) con los datos
  del PRD. Consolidados los assets en `public/assets/` (cine, libros, música y juegos),
  copiado el CV y descargadas las 3 carátulas de juegos faltantes (Zelda TOTK, Elden Ring,
  Resident Evil 2). Migrado el PRD a `/docs` y creados ARCHITECTURE, ROADMAP, CURRENT y
  GLOBAL. Decisiones: stack Astro (no React/Babel en navegador), 2 temas en vez de 3 (se
  elimina Papel), assets 100% locales, React solo como island del panel de Tweaks.
