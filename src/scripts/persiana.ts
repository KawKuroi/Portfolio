/*
  Componente "persiana" (acordeon de caratulas) de la escena Conoceme.

  Las franjas se renderizan en build (Persiana.astro); este modulo aporta el comportamiento.

  ESCRITORIO (acordeon horizontal con autoplay):
    - Solo un MOVIMIENTO REAL del raton abre una franja. mouseenter no sirve: tambien salta
      cuando el scroll o la propia animacion mueven una franja bajo un cursor quieto, y eso
      dejaba la persiana detenida para siempre.
    - Cualquier interaccion da un reposo (REPOSO) y luego el autoplay se reanuda. No hay estado
      "hover" que pueda quedarse pegado (en tactil nunca llega el mouseleave).
    - Rueda/trackpad horizontal, arrastre tactil lateral y flechas izquierda/derecha con foco.
    - Boton de pausa (WCAG 2.2.2). Con prefers-reduced-motion arranca pausada y el boton permite
      reproducirla a proposito.

  MOVIL/TABLET (acordeon vertical con filtro por categoria, sin autoplay):
    - Al tocar se abre la franja y se mantiene bajo el dedo (anclaje.ts).
*/

import { anclar } from './anclaje';

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');
const ESCRITORIO = window.matchMedia('(min-width: 1025px)');

/** Pausa tras una interaccion antes de reanudar el autoplay. */
const REPOSO = 5000;
/** Desplazamiento lateral acumulado que cuenta como un paso. */
const PASO_LATERAL = 50;
/** Separacion minima entre pasos de rueda lateral. */
const ENTRE_PASOS = 180;

/** Activa el acordeon, los gestos, el filtro y el autoplay de una persiana concreta. */
function iniciarUnaPersiana(persiana: HTMLElement): void {
  const slats = Array.from(persiana.querySelectorAll<HTMLElement>('.pslat'));
  if (slats.length === 0) return;

  const escena = persiana.closest<HTMLElement>('.scene');
  const boton = escena?.querySelector<HTMLButtonElement>('[data-pausa]');
  const chips = Array.from(escena?.querySelectorAll<HTMLButtonElement>('.cf-chip') ?? []);
  const velocidad = Number(persiana.dataset.speed ?? '2600') || 2600;

  let abierta = Number(persiana.dataset.open ?? '0') || 0;
  let filtro = persiana.dataset.filtro ?? 'all';
  let temporizador = 0;
  let enViewport = false;
  let conFocoTeclado = false;
  /** Eleccion explicita del usuario con el boton; null = segun el sistema. */
  let eleccion: boolean | null = null;

  persiana.style.setProperty('--avance', `${velocidad}ms`);

  // El filtro solo aplica al acordeon vertical; en escritorio se ven todas.
  const esVisible = (slat: HTMLElement): boolean =>
    ESCRITORIO.matches || filtro === 'all' || slat.dataset.cat === filtro;

  /** Abre la franja `indice` y cierra las demas. */
  const abrir = (indice: number): void => {
    abierta = indice;
    slats.forEach((slat, j) => slat.classList.toggle('open', j === abierta));
  };

  /** Abre la siguiente franja visible en el sentido dado (con ciclo). */
  const pasar = (sentido: 1 | -1): void => {
    for (let k = 1; k <= slats.length; k++) {
      const indice = (abierta + sentido * k + slats.length * k) % slats.length;
      const slat = slats[indice];
      if (slat && esVisible(slat)) {
        abrir(indice);
        return;
      }
    }
  };

  const quiereMovimiento = (): boolean => eleccion ?? !REDUCE.matches;

  const puedeReproducir = (): boolean =>
    ESCRITORIO.matches && enViewport && !conFocoTeclado && !document.hidden && quiereMovimiento();

  /**
   * Unico punto que programa el autoplay: cada llamada sustituye a la anterior.
   * La barra de avance solo se muestra cuando la espera es la del ciclo normal.
   */
  const programar = (espera = velocidad): void => {
    window.clearTimeout(temporizador);
    const puede = puedeReproducir();
    persiana.toggleAttribute('data-avanza', puede && espera === velocidad);
    if (!puede) return;
    temporizador = window.setTimeout(() => {
      pasar(1);
      programar();
    }, espera);
  };

  const reposar = (): void => programar(REPOSO);

  // ── Raton: solo cuenta si las coordenadas cambian de verdad ──
  let ultimoX = Number.NaN;
  let ultimoY = Number.NaN;

  persiana.addEventListener('pointermove', (evento) => {
    if (!ESCRITORIO.matches || evento.pointerType !== 'mouse') return;
    if (evento.clientX === ultimoX && evento.clientY === ultimoY) return;
    const slat = (evento.target as Element).closest<HTMLElement>('.pslat');
    const indice = slat ? slats.indexOf(slat) : -1;
    if (indice >= 0 && indice !== abierta) abrir(indice);
    reposar();
  });
  // Se registra en window para conocer la posicion previa aunque este fuera de la persiana.
  window.addEventListener(
    'pointermove',
    (evento) => {
      ultimoX = evento.clientX;
      ultimoY = evento.clientY;
    },
    { passive: true },
  );

  persiana.addEventListener('pointerleave', (evento) => {
    // En tactil el "leave" llega al levantar el dedo: ahi manda el reposo del toque.
    if (evento.pointerType === 'mouse') programar();
  });

  slats.forEach((slat, indice) => {
    slat.addEventListener('click', () => {
      if (indice !== abierta) {
        if (!ESCRITORIO.matches) anclar(slat);
        abrir(indice);
      }
      reposar();
    });
  });

  // ── Gestos laterales (escritorio y pantallas tactiles anchas) ──
  let acumulado = 0;
  let ultimoPaso = 0;
  let ultimaRueda = 0;

  persiana.addEventListener(
    'wheel',
    (evento) => {
      if (!ESCRITORIO.matches || Math.abs(evento.deltaX) <= Math.abs(evento.deltaY)) return;
      // Evita que el gesto lateral navegue atras/adelante en el historial.
      evento.preventDefault();
      const ahora = performance.now();
      if (ahora - ultimaRueda > ENTRE_PASOS) acumulado = 0;
      ultimaRueda = ahora;
      acumulado += evento.deltaX;
      if (Math.abs(acumulado) >= PASO_LATERAL && ahora - ultimoPaso > ENTRE_PASOS) {
        pasar(acumulado > 0 ? 1 : -1);
        acumulado = 0;
        ultimoPaso = ahora;
      }
      reposar();
    },
    { passive: false },
  );

  let inicioToque: number | null = null;
  persiana.addEventListener('pointerdown', (evento) => {
    inicioToque = evento.pointerType === 'mouse' ? null : evento.clientX;
  });
  persiana.addEventListener('pointercancel', () => {
    inicioToque = null;
  });
  persiana.addEventListener('pointerup', (evento) => {
    if (inicioToque === null || !ESCRITORIO.matches) return;
    const recorrido = evento.clientX - inicioToque;
    inicioToque = null;
    if (Math.abs(recorrido) < PASO_LATERAL) return;
    pasar(recorrido < 0 ? 1 : -1);
    reposar();
  });

  // ── Teclado ──
  persiana.addEventListener('keydown', (evento) => {
    if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
    evento.preventDefault(); // navegacion.ts respeta defaultPrevented
    pasar(evento.key === 'ArrowRight' ? 1 : -1);
    reposar();
  });
  persiana.addEventListener('focus', () => {
    conFocoTeclado = persiana.matches(':focus-visible');
    programar();
  });
  persiana.addEventListener('blur', () => {
    conFocoTeclado = false;
    programar();
  });

  // ── Boton de pausa: cambia de etiqueta, por eso no lleva aria-pressed ──
  const sincronizarBoton = (): void => {
    if (!boton) return;
    const activo = quiereMovimiento();
    const etiqueta = boton.querySelector('span');
    const icono = boton.querySelector('use');
    if (etiqueta) etiqueta.textContent = (activo ? boton.dataset.pausar : boton.dataset.reproducir) ?? '';
    icono?.setAttribute('href', activo ? '#ic-pause' : '#ic-play');
  };
  boton?.addEventListener('click', () => {
    eleccion = !quiereMovimiento();
    sincronizarBoton();
    programar();
  });

  // ── Filtro por categoria (movil/tablet) ──
  const abrirPrimeraVisible = (): void => {
    const indice = slats.findIndex(esVisible);
    if (indice >= 0) abrir(indice);
  };
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filtro = chip.dataset.f ?? 'all';
      persiana.dataset.filtro = filtro;
      chips.forEach((otro) => {
        const activo = otro === chip;
        otro.classList.toggle('on', activo);
        otro.setAttribute('aria-pressed', String(activo));
      });
      abrirPrimeraVisible();
    });
  });

  // ── Cambios de contexto: todos pasan por programar() ──
  document.addEventListener('visibilitychange', () => programar());
  REDUCE.addEventListener('change', () => {
    sincronizarBoton();
    programar();
  });
  ESCRITORIO.addEventListener('change', () => {
    const actual = slats[abierta];
    if (!actual || !esVisible(actual)) abrirPrimeraVisible();
    programar();
  });

  new IntersectionObserver(
    (entradas) => {
      const entrada = entradas[entradas.length - 1];
      if (!entrada) return;
      const visible = entrada.isIntersecting && entrada.intersectionRatio >= 0.2;
      if (visible === enViewport) return;
      enViewport = visible;
      programar();
    },
    { threshold: [0, 0.2, 0.5] },
  ).observe(persiana);

  // Precarga las caratulas una pantalla antes: `lazy` dentro de un carrete con scroll propio
  // espera a que sean visibles y se veia el degradado de respaldo.
  if (ESCRITORIO.matches && escena) {
    const precarga = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((entrada) => entrada.isIntersecting)) return;
        persiana.querySelectorAll('img').forEach((img) => {
          img.loading = 'eager';
        });
        precarga.disconnect();
      },
      { root: document.querySelector('.reel'), rootMargin: '100% 0px' },
    );
    precarga.observe(escena);
  }

  abrir(abierta);
  sincronizarBoton();
}

/** Punto de entrada: arranca todas las persianas presentes en la pagina. */
export function iniciarPersianas(): void {
  document.querySelectorAll<HTMLElement>('.persiana').forEach((persiana) => {
    iniciarUnaPersiana(persiana);
  });
}
