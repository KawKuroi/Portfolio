/*
  Anclaje de acordeones en flujo movil: al abrir un panel se cierra el de arriba y la cabecera
  pulsada se iria fuera de pantalla. Durante la transicion se compensa el desplazamiento para
  que se quede bajo el dedo.
*/

/** Mantiene `elemento` en la misma posicion del viewport durante `duracion` ms. */
export function anclar(elemento: HTMLElement, duracion = 480): void {
  const posicion = elemento.getBoundingClientRect().top;
  const fin = performance.now() + duracion;
  let cancelado = false;

  // Si el usuario empieza a desplazarse, manda el usuario.
  const cancelar = (): void => {
    cancelado = true;
  };
  window.addEventListener('touchmove', cancelar, { passive: true, once: true });
  window.addEventListener('wheel', cancelar, { passive: true, once: true });

  const ajustar = (): void => {
    if (!cancelado) {
      const diferencia = elemento.getBoundingClientRect().top - posicion;
      if (Math.abs(diferencia) >= 1) window.scrollBy({ top: diferencia, behavior: 'instant' });
      if (performance.now() < fin) {
        requestAnimationFrame(ajustar);
        return;
      }
    }
    window.removeEventListener('touchmove', cancelar);
    window.removeEventListener('wheel', cancelar);
  };
  requestAnimationFrame(ajustar);
}
