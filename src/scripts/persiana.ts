/*
  Componente "persiana" (acordeon de caratulas) de la escena Conoceme.

  Implementacion completa en Fase 4 del ROADMAP. Responsabilidades previstas:

    - Construir cada .persiana desde FAVS_DATA (src/data/favoritos.ts).
    - Cada pieza = figure.pslat con fondo gradiente (.pph), img (lazy, no-referrer),
      lomo vertical (.pspine) y caption (.pcap: chip de categoria, titulo, subtitulo).
    - Acordeon: la franja .open crece (flex-grow var(--p-grow,8)), se aclara y muestra
      el caption; las demas quedan oscurecidas (brightness .58).
    - Autoplay cada data-speed ms (2600 en la Sala). Se pausa al hover, al ocultar
      pestana (visibilitychange) y fuera de viewport (IntersectionObserver).
    - Color por categoria desde --p-cine/--p-juegos/--p-libros/--p-musica.
    - Decoracion de iconos por categoria (Cine/Juegos/Libros/Musica).
    - Movil (<=820px): columnas -> filas; lomo horizontal.
    - Respeta prefers-reduced-motion (sin autoplay).
*/

export {};

// TODO(Fase 4): implementar construccion, acordeon, autoplay y decoracion de iconos.
