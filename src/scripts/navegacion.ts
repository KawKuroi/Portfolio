/*
  Navegacion del carrete: riel lateral, teclado, hint de scroll y escena activa.

    - El riel se renderiza en build (Rail.astro); aqui se marca el punto activo y se navega.
    - Escena activa: la que cruza la linea media del viewport. Funciona aunque una escena sea
      mas alta que la pantalla, cosa que un umbral de visibilidad del 55% no garantiza.
    - Teclado (solo escritorio): flechas, AvPag/RePag, Inicio/Fin y espacio. Las pulsaciones
      seguidas se ACUMULAN sobre el destino pendiente: partir de la escena visible hacia que,
      durante el scroll suave, varias pulsaciones apuntaran al mismo sitio y pareciera congelado.
    - Rueda/trackpad (solo escritorio): un gesto = una escena. No se deja al navegador porque
      con `scroll-snap: mandatory` un desplazamiento menor de media pantalla vuelve al punto de
      partida: la rueda (pasos de ~100px) y el trackpad suave no avanzaban nunca.
    - Tactil ancho (portatil tactil, tablet horizontal): un deslizamiento = una escena, por la
      misma razon que la rueda.
    - Una escena mas alta que el viewport se recorre por dentro antes de saltar a la siguiente.
    - En movil/tablet el scroll es el nativo: no se intercepta ninguna tecla.
*/

const ESCRITORIO = window.matchMedia('(min-width: 1025px)');
const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Tiempo sin eventos de scroll para dar un desplazamiento por terminado. */
const SCROLL_QUIETO = 180;
/** Margen para el primer evento de scroll tras pedir un desplazamiento. */
const ARRANQUE = 500;

/** Pausa entre eventos de rueda que separa un gesto del siguiente. */
const FIN_GESTO = 200;
/** Ventana en la que se suman desplazamientos muy pequenos. */
const VENTANA_ACUMULADO = 400;
/** Desplazamiento minimo (px) para contar como intencion de avanzar. */
const UMBRAL_RUEDA = 8;
/** Tiempo minimo entre dos pasos dentro de un mismo gesto continuo. */
const REPETICION = 700;
/** Recorrido minimo del dedo para contar como deslizamiento entre escenas. */
const UMBRAL_TACTIL = 30;

let escenas: HTMLElement[] = [];
let puntos: HTMLAnchorElement[] = [];
let indiceActivo = 0;
/** Escena hacia la que se esta desplazando, mientras dura el movimiento. */
let destinoPendiente: number | null = null;
let esperaFin = 0;
let iniciado = false;

const comportamiento = (): ScrollBehavior => (REDUCE.matches ? 'instant' : 'smooth');

/** Marca la escena activa en el riel. */
function marcarActiva(indice: number): void {
  indiceActivo = indice;
  puntos.forEach((punto, i) => {
    const activo = i === indice;
    punto.classList.toggle('on', activo);
    if (activo) punto.setAttribute('aria-current', 'true');
    else punto.removeAttribute('aria-current');
  });
}

/** Indice de la escena que cruza la linea media del viewport. */
function escenaEnPantalla(): number {
  const linea = window.innerHeight / 2;
  const indice = escenas.findIndex((escena) => escena.getBoundingClientRect().bottom > linea);
  return indice < 0 ? escenas.length - 1 : indice;
}

/** Suelta el destino pendiente y vuelve a leer la escena real. */
function soltarDestino(): void {
  window.clearTimeout(esperaFin);
  if (destinoPendiente === null) return;
  destinoPendiente = null;
  marcarActiva(escenaEnPantalla());
}

/** Desplaza el carrete hasta la escena indicada. */
function irA(indice: number): void {
  const destino = Math.max(0, Math.min(escenas.length - 1, indice));
  const escena = escenas[destino];
  if (!escena) return;

  // Un foco que se queda en la escena anterior capturaria las siguientes teclas.
  const foco = document.activeElement;
  if (foco instanceof HTMLElement && foco.closest('.scene') && !escena.contains(foco)) foco.blur();

  destinoPendiente = destino;
  marcarActiva(destino);
  window.clearTimeout(esperaFin);
  esperaFin = window.setTimeout(soltarDestino, ARRANQUE);
  escena.scrollIntoView({ behavior: comportamiento(), block: 'start' });
}

/** Avanza (1) o retrocede (-1): primero dentro de una escena alta, luego a la vecina. */
function avanzar(sentido: 1 | -1, carrete: HTMLElement): void {
  if (destinoPendiente !== null) {
    irA(destinoPendiente + sentido);
    return;
  }
  const oculto = ocultoEnEscena(sentido, carrete);
  if (oculto > 4) {
    const paso = Math.min(oculto, carrete.clientHeight * 0.8);
    carrete.scrollBy({ top: paso * sentido, behavior: comportamiento() });
    return;
  }
  irA(indiceActivo + sentido);
}

/** Sincroniza la escena activa con el scroll, como mucho una vez por fotograma. */
function observarScroll(carrete: HTMLElement): void {
  let programado = false;

  const alDesplazar = (): void => {
    if (destinoPendiente !== null) {
      window.clearTimeout(esperaFin);
      esperaFin = window.setTimeout(soltarDestino, SCROLL_QUIETO);
      return;
    }
    if (programado) return;
    programado = true;
    requestAnimationFrame(() => {
      programado = false;
      const indice = escenaEnPantalla();
      if (destinoPendiente === null && indice !== indiceActivo) marcarActiva(indice);
    });
  };

  // El carrete se desplaza en escritorio; el documento, en movil/tablet.
  carrete.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar, { passive: true });
  // Tocar cancela el destino programado (la rueda la gestiona activarRueda).
  window.addEventListener('touchstart', soltarDestino, { passive: true });

  marcarActiva(escenaEnPantalla());
}

/** Pixeles que quedan ocultos de la escena activa en el sentido dado. */
function ocultoEnEscena(sentido: 1 | -1, carrete: HTMLElement): number {
  const actual = escenas[indiceActivo];
  if (!actual) return 0;
  const { top, bottom } = actual.getBoundingClientRect();
  return sentido === 1 ? bottom - carrete.clientHeight : -top;
}

/**
 * Rueda y trackpad: un gesto avanza una escena y su inercia se ignora. Dentro de un gesto
 * continuo solo hay otro paso si cambia el sentido, si empieza un impulso nuevo (el delta
 * crece de golpe) o si se sigue girando una rueda de muescas (delta grande y constante).
 */
function activarRueda(carrete: HTMLElement): void {
  let ultimoEvento = 0;
  let ultimoPaso = 0;
  let ultimaMagnitud = 0;
  let valle = 0;
  let ultimoSentido = 0;
  let acumulado = 0;
  let consumido = false;

  window.addEventListener(
    'wheel',
    (evento) => {
      if (!ESCRITORIO.matches || evento.defaultPrevented || evento.ctrlKey || evento.shiftKey) return;
      // Lateral: es de la persiana o del navegador.
      if (evento.deltaY === 0 || Math.abs(evento.deltaX) > Math.abs(evento.deltaY)) return;
      if (document.querySelector('dialog[open]')) return;
      // Con la pagina ampliada a pellizco la rueda sirve para moverse por ella.
      if ((window.visualViewport?.scale ?? 1) > 1.01) return;

      const ahora = performance.now();
      const sentido = evento.deltaY > 0 ? 1 : -1;
      // Firefox informa en lineas (modo 1); algun dispositivo, en paginas (modo 2).
      const factor = evento.deltaMode === 1 ? 16 : evento.deltaMode === 2 ? carrete.clientHeight : 1;
      const magnitud = Math.abs(evento.deltaY) * factor;

      const pausa = ahora - ultimoEvento;
      const desdePaso = ahora - ultimoPaso;
      const giro = sentido !== ultimoSentido && magnitud >= UMBRAL_RUEDA;
      // Se compara con el punto mas bajo de la inercia: un impulso nuevo sube en rampa.
      const impulso = magnitud >= 40 && magnitud > valle * 3;
      const muescas = magnitud >= 50 && magnitud === ultimaMagnitud;

      if (pausa > FIN_GESTO || giro || (desdePaso > REPETICION && (impulso || muescas))) {
        consumido = false;
      }
      if (pausa > VENTANA_ACUMULADO || sentido !== ultimoSentido) acumulado = 0;
      ultimoEvento = ahora;
      ultimaMagnitud = magnitud;
      valle = desdePaso > REPETICION ? Math.min(valle, magnitud) : magnitud;
      ultimoSentido = sentido;

      // Escena mas alta que la pantalla: scroll nativo hasta llegar a su borde.
      if (destinoPendiente === null) {
        indiceActivo = escenaEnPantalla();
        if (ocultoEnEscena(sentido, carrete) > 4) {
          consumido = true;
          ultimoPaso = ahora;
          return;
        }
      }

      evento.preventDefault();
      if (consumido) return;
      acumulado += magnitud;
      if (acumulado < UMBRAL_RUEDA) return;
      acumulado = 0;
      consumido = true;
      ultimoPaso = ahora;
      valle = magnitud;
      irA((destinoPendiente ?? indiceActivo) + sentido);
    },
    { passive: false },
  );
}

/**
 * Deslizamiento vertical en pantallas tactiles anchas. El dedo arrastra de forma nativa y al
 * soltar se completa el viaje a la escena vecina; sin esto el ajuste la devolvia al origen.
 */
function activarTactil(carrete: HTMLElement): void {
  let inicio: { x: number; y: number; escena: number; arriba: boolean; abajo: boolean } | null = null;

  window.addEventListener(
    'touchstart',
    (evento) => {
      inicio = null;
      const dedo = evento.touches.length === 1 ? evento.touches[0] : undefined;
      if (!dedo || !ESCRITORIO.matches || document.querySelector('dialog[open]')) return;
      if ((window.visualViewport?.scale ?? 1) > 1.01) return;
      indiceActivo = escenaEnPantalla();
      inicio = {
        x: dedo.clientX,
        y: dedo.clientY,
        escena: indiceActivo,
        // Solo se salta si la escena no tiene mas contenido en ese sentido.
        arriba: ocultoEnEscena(-1, carrete) <= 4,
        abajo: ocultoEnEscena(1, carrete) <= 4,
      };
    },
    { passive: true },
  );

  window.addEventListener(
    'touchend',
    (evento) => {
      const dedo = evento.changedTouches[0];
      if (!inicio || !dedo) return;
      const { x, y, escena, arriba, abajo } = inicio;
      inicio = null;
      const dx = x - dedo.clientX;
      const dy = y - dedo.clientY;
      if (Math.abs(dy) < UMBRAL_TACTIL || Math.abs(dy) <= Math.abs(dx)) return;
      const sentido = dy > 0 ? 1 : -1;
      if (!(sentido === 1 ? abajo : arriba)) return;
      // Tras el touchend, para sustituir la inercia nativa.
      requestAnimationFrame(() => irA(escena + sentido));
    },
    { passive: true },
  );
}

/** El riel navega sin ensuciar el historial con un hash por salto. */
function activarRiel(): void {
  puntos.forEach((punto, indice) => {
    punto.addEventListener('click', (evento) => {
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey) return;
      evento.preventDefault();
      irA(indice);
    });
  });
}

/** True si el foco esta en un campo editable (no debe robar las flechas). */
function enCampoEditable(objetivo: EventTarget | null): boolean {
  if (!(objetivo instanceof HTMLElement)) return false;
  const etiqueta = objetivo.tagName;
  return (
    etiqueta === 'INPUT' ||
    etiqueta === 'TEXTAREA' ||
    etiqueta === 'SELECT' ||
    objetivo.isContentEditable
  );
}

/** Navegacion por teclado entre escenas. */
function activarTeclado(carrete: HTMLElement): void {
  window.addEventListener('keydown', (evento) => {
    if (!ESCRITORIO.matches || evento.defaultPrevented) return;
    if (evento.metaKey || evento.ctrlKey || evento.altKey) return;
    if (enCampoEditable(evento.target)) return;
    // Con el formulario abierto, las teclas son del dialogo.
    if (document.querySelector('dialog[open]')) return;

    let accion: () => void;
    switch (evento.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        accion = () => avanzar(-1, carrete);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
      case 'PageDown':
        accion = () => avanzar(1, carrete);
        break;
      case ' ':
        // Sobre un boton o enlace, el espacio conserva su funcion.
        if (evento.target !== document.body && evento.target !== carrete) return;
        accion = () => avanzar(evento.shiftKey ? -1 : 1, carrete);
        break;
      case 'Home':
        accion = () => irA(0);
        break;
      case 'End':
        accion = () => irA(escenas.length - 1);
        break;
      default:
        return;
    }
    evento.preventDefault();
    // Mantener pulsada una tecla no debe atravesar todo el portafolio.
    if (!evento.repeat) accion();
  });
}

/** Hint de scroll: aparece a ~1.3s y se va al primer gesto o a ~6.2s. */
function activarHint(carrete: HTMLElement): void {
  const hint = document.querySelector<HTMLElement>('[data-hint]');
  if (!hint) return;

  const gestos: Array<[EventTarget, string]> = [
    [carrete, 'scroll'],
    [window, 'keydown'],
    [window, 'wheel'],
    [window, 'touchmove'],
  ];

  let oculto = false;
  let tAparece = 0;
  let tAuto = 0;

  const ocultar = (): void => {
    if (oculto) return;
    oculto = true;
    window.clearTimeout(tAparece);
    window.clearTimeout(tAuto);
    hint.classList.remove('show');
    hint.setAttribute('aria-hidden', 'true');
    for (const [destino, tipo] of gestos) destino.removeEventListener(tipo, ocultar);
  };

  tAparece = window.setTimeout(() => {
    if (oculto) return;
    hint.classList.add('show');
    hint.setAttribute('aria-hidden', 'false');
  }, 1300);
  tAuto = window.setTimeout(ocultar, 6200);

  for (const [destino, tipo] of gestos) {
    destino.addEventListener(tipo, ocultar, { passive: true });
  }
}

/** Punto de entrada: activa los comportamientos de navegacion. */
export function iniciarNavegacion(): void {
  if (iniciado) return;
  const carrete = document.querySelector<HTMLElement>('.reel');
  escenas = Array.from(document.querySelectorAll<HTMLElement>('.scene[data-slate]'));
  if (!carrete || escenas.length === 0) return;
  iniciado = true;
  puntos = Array.from(document.querySelectorAll<HTMLAnchorElement>('.rail-dot'));
  activarRiel();
  observarScroll(carrete);
  activarTeclado(carrete);
  activarRueda(carrete);
  activarTactil(carrete);
  activarHint(carrete);
}
