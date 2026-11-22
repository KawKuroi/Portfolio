/*
  Animaciones de entrada de las escenas.

  El contenido es visible por defecto: este modulo solo anade .entro cuando el elemento
  [data-entra] llega al viewport, y la animacion vive en CSS dentro de
  prefers-reduced-motion: no-preference. Si el script falla, no queda nada oculto.
*/

/** Anima una sola vez cada bloque [data-entra] al hacerse visible. */
export function iniciarEntradas(): void {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('entro');
        observador.unobserve(entrada.target);
      }
    },
    // El margen descarta la escena vecina que solo toca el borde al estar ajustada.
    { rootMargin: '-2px 0px' },
  );
  document.querySelectorAll('[data-entra]').forEach((bloque) => observador.observe(bloque));
}
