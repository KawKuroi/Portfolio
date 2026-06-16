/*
  Gestion de tema (Museo claro / Noche oscuro).

  Es el unico ajuste variable del sitio (la disposicion, el acento y la tipografia son fijos).

  IMPORTANTE: el resolutor anti-parpadeo corre INLINE en el <head> (ver Base.astro) para
  fijar data-tema antes del primer pintado. Este modulo expone la API publica que usa el
  boton sol/luna del plaque y mantiene el tema en sintonia con el sistema operativo.

  API publica:
    - temaActual(): Tema                 // lee el tema vigente de <html data-tema>
    - fijarTema(tema): void              // aplica + persiste + emite 'salathemechange'
    - alternarTema(): Tema               // Museo <-> Noche
    - iniciarTema(): void                // expone window.setSalaTheme y sigue al SO
    - window.setSalaTheme(tema)          // alias global de fijarTema (contrato del PRD)
    - window.__salaTheme                 // tema vigente expuesto globalmente

  Eventos:
    - 'salathemechange' (CustomEvent<Tema>, detalle = nombre) al cambiar de tema.
*/

export type Tema = 'Museo' | 'Noche';

export const TEMAS: readonly Tema[] = ['Museo', 'Noche'];

/** Clave de persistencia en localStorage. */
const CLAVE = 'sala-theme';

/** Acento real fijo del sitio (aguamarino). */
const ACENTO = '#2aa198';

declare global {
  interface Window {
    __salaTheme?: Tema;
    setSalaTheme?: (tema: Tema) => void;
  }
}

let iniciado = false;

/** Comprueba que un valor desconocido sea un nombre de tema valido. */
function esTema(valor: unknown): valor is Tema {
  return valor === 'Museo' || valor === 'Noche';
}

/** Aplica el tema al documento y emite el evento, sin tocar localStorage. */
function aplicar(tema: Tema): void {
  const raiz = document.documentElement;
  raiz.setAttribute('data-tema', tema);
  // El acento se mantiene fijo (aguamarino) en cualquier tema.
  raiz.style.setProperty('--clay', ACENTO);
  raiz.style.setProperty('--teal', ACENTO);
  window.__salaTheme = tema;
  raiz.dispatchEvent(new CustomEvent<Tema>('salathemechange', { detail: tema }));
}

/** Lee el tema vigente desde <html data-tema>, con respaldo a Museo. */
export function temaActual(): Tema {
  const actual = document.documentElement.getAttribute('data-tema');
  return esTema(actual) ? actual : 'Museo';
}

/** Aplica el tema, lo persiste (eleccion manual) y emite 'salathemechange'. */
export function fijarTema(tema: Tema): void {
  if (!esTema(tema)) return;
  try {
    localStorage.setItem(CLAVE, tema);
  } catch {
    // localStorage puede fallar en modo privado: el tema sigue aplicado en memoria.
  }
  aplicar(tema);
}

/** Alterna Museo <-> Noche y devuelve el tema resultante. */
export function alternarTema(): Tema {
  const siguiente: Tema = temaActual() === 'Noche' ? 'Museo' : 'Noche';
  fijarTema(siguiente);
  return siguiente;
}

/** True si el usuario ya eligio un tema manualmente (hay clave en localStorage). */
function hayEleccionManual(): boolean {
  try {
    return esTema(localStorage.getItem(CLAVE));
  } catch {
    return false;
  }
}

/**
 * Sigue a `prefers-color-scheme` mientras el usuario no haya elegido tema manualmente.
 * Aplica el cambio sin persistir, para no marcar una eleccion que el usuario no hizo.
 */
function seguirSistema(): void {
  const consulta = window.matchMedia('(prefers-color-scheme: dark)');
  consulta.addEventListener('change', (evento) => {
    if (hayEleccionManual()) return;
    aplicar(evento.matches ? 'Noche' : 'Museo');
  });
}

/**
 * Punto de entrada del modulo de tema. Expone la API global (window.setSalaTheme /
 * window.__salaTheme) y arranca el seguimiento del sistema. Idempotente.
 */
export function iniciarTema(): void {
  if (iniciado) return;
  iniciado = true;
  window.setSalaTheme = fijarTema;
  if (!esTema(window.__salaTheme)) window.__salaTheme = temaActual();
  seguirSistema();
}
