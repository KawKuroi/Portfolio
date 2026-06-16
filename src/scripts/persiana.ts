/*
  Componente "persiana" (acordeon de caratulas) de la escena Conoceme.

  Las franjas se renderizan en build desde FAVORITOS (ver Persiana.astro, fallback estatico);
  este modulo aporta el comportamiento:

    - Acordeon: la franja .open crece (flex-grow var(--p-grow,8)), se aclara y muestra el
      caption; las demas quedan oscurecidas. El lomo (.pspine) solo se ve cerrada.
    - Hover/clic abre la franja apuntada. El hover ademas pausa el autoplay.
    - Autoplay cada data-speed ms (2600). Se pausa al hover, al ocultar la pestana
      (visibilitychange), fuera de viewport (IntersectionObserver) y con prefers-reduced-motion.
    - data-open = indice inicial.

  La decoracion de iconos por categoria (Cine/Juegos/Libros/Musica) se resuelve en build
  dentro del chip .pcat (Persiana.astro), por lo que aqui no hace falta tocar el DOM del chip.
*/

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Activa el acordeon y el autoplay de una persiana concreta. */
function iniciarUnaPersiana(persiana: HTMLElement): void {
  const slats = Array.from(persiana.querySelectorAll<HTMLElement>('.pslat'));
  if (slats.length === 0) return;

  const velocidad = Number(persiana.dataset.speed ?? '2600') || 2600;
  let abierta = Number(persiana.dataset.open ?? '0') || 0;
  let timer = 0;
  let enViewport = true;
  let hover = false;

  /** Abre la franja `i` (con ciclo) y cierra las demas. */
  const abrir = (i: number): void => {
    abierta = ((i % slats.length) + slats.length) % slats.length;
    slats.forEach((slat, j) => slat.classList.toggle('open', j === abierta));
  };

  const avanzar = (): void => abrir(abierta + 1);

  const puedeReproducir = (): boolean =>
    !REDUCE.matches && enViewport && !hover && !document.hidden;

  const parar = (): void => {
    if (timer) {
      window.clearInterval(timer);
      timer = 0;
    }
  };

  const reproducir = (): void => {
    parar();
    if (puedeReproducir()) timer = window.setInterval(avanzar, velocidad);
  };

  // Hover abre la franja y pausa; clic la fija (util en tactil).
  slats.forEach((slat, i) => {
    slat.addEventListener('mouseenter', () => {
      hover = true;
      parar();
      abrir(i);
    });
    slat.addEventListener('click', () => abrir(i));
  });

  persiana.addEventListener('mouseleave', () => {
    hover = false;
    reproducir();
  });

  // Pausa al ocultar la pestana.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) parar();
    else reproducir();
  });

  // Pausa fuera del viewport.
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        enViewport = entrada.isIntersecting;
        if (enViewport) reproducir();
        else parar();
      }
    },
    { threshold: 0.2 },
  );
  observador.observe(persiana);

  abrir(abierta);
  reproducir();
}

/** Punto de entrada: arranca todas las persianas presentes en la pagina. */
export function iniciarPersianas(): void {
  document.querySelectorAll<HTMLElement>('.persiana').forEach((persiana) => {
    iniciarUnaPersiana(persiana);
  });
}
