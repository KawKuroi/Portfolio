/*
  Navegacion del carrete: riel lateral, teclado, hint de scroll y escena activa.

    - Genera el riel lateral (un boton por escena: etiqueta + punto) desde las escenas
      presentes en el carrete (.scene[data-slate]).
    - IntersectionObserver (threshold .55) marca la escena activa y sincroniza el riel.
    - Teclado: Up/Left/PageUp retrocede, Down/Right/PageDown avanza, Home/End extremos.
      Ignora si el foco esta en un campo editable o con meta/ctrl/alt.
    - Hint de scroll: aparece a ~1.3s, se oculta al primer gesto o a ~6.2s. Oculto en movil.
*/

interface Escena {
  el: HTMLElement;
  etiqueta: string;
}

let escenas: Escena[] = [];
let botones: HTMLButtonElement[] = [];
let indiceActivo = 0;
let iniciado = false;

/** Consulta de movimiento reducido: desactiva el scroll suave si el usuario lo prefiere. */
const reduceMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Recoge las escenas del carrete en orden de documento. */
function recogerEscenas(): Escena[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.scene[data-slate]')).map((el) => ({
    el,
    etiqueta: el.dataset.slate ?? '',
  }));
}

/** Desplaza el carrete hasta la escena indicada (respeta prefers-reduced-motion). */
function irA(indice: number): void {
  const destino = Math.max(0, Math.min(escenas.length - 1, indice));
  escenas[destino]?.el.scrollIntoView({
    behavior: reduceMovimiento.matches ? 'auto' : 'smooth',
    block: 'start',
  });
}

/** Construye los botones del riel a partir de las escenas. */
function construirRiel(): void {
  const riel = document.querySelector<HTMLElement>('[data-rail]');
  if (!riel) return;
  riel.replaceChildren();
  botones = escenas.map((escena, indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'rail-dot';
    boton.setAttribute('aria-label', `Ir a ${escena.etiqueta}`);

    const etiqueta = document.createElement('span');
    etiqueta.className = 'rail-label';
    etiqueta.textContent = escena.etiqueta;

    const punto = document.createElement('span');
    punto.className = 'rail-pip';
    punto.setAttribute('aria-hidden', 'true');

    boton.append(etiqueta, punto);
    boton.addEventListener('click', () => irA(indice));
    riel.append(boton);
    return boton;
  });
}

/** Marca visualmente la escena activa en el riel. */
function marcarActiva(indice: number): void {
  indiceActivo = indice;
  botones.forEach((boton, i) => {
    const activo = i === indice;
    boton.classList.toggle('on', activo);
    if (activo) boton.setAttribute('aria-current', 'true');
    else boton.removeAttribute('aria-current');
  });
}

/** Observa que escena ocupa al menos el 55% del viewport para sincronizar el riel. */
function observarEscenas(): void {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const indice = escenas.findIndex((escena) => escena.el === entrada.target);
        if (indice >= 0) marcarActiva(indice);
      }
    },
    { threshold: 0.55 },
  );
  escenas.forEach((escena) => observador.observe(escena.el));
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
function activarTeclado(): void {
  window.addEventListener('keydown', (evento) => {
    if (evento.metaKey || evento.ctrlKey || evento.altKey) return;
    if (enCampoEditable(evento.target)) return;

    let destino: number | null = null;
    switch (evento.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'PageUp':
        destino = indiceActivo - 1;
        break;
      case 'ArrowDown':
      case 'ArrowRight':
      case 'PageDown':
        destino = indiceActivo + 1;
        break;
      case 'Home':
        destino = 0;
        break;
      case 'End':
        destino = escenas.length - 1;
        break;
      default:
        return;
    }
    evento.preventDefault();
    irA(destino);
  });
}

/** Hint de scroll: aparece a ~1.3s y se va al primer gesto o a ~6.2s. */
function activarHint(): void {
  const hint = document.querySelector<HTMLElement>('[data-hint]');
  if (!hint) return;

  const reel = document.querySelector<HTMLElement>('.reel');
  const gestos: Array<[EventTarget, string]> = [
    [reel ?? window, 'scroll'],
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

/** Punto de entrada: construye el chrome de navegacion y activa sus comportamientos. */
export function iniciarNavegacion(): void {
  if (iniciado) return;
  escenas = recogerEscenas();
  if (escenas.length === 0) return;
  iniciado = true;
  construirRiel();
  observarEscenas();
  activarTeclado();
  activarHint();
}
