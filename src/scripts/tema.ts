/*
  Gestion de tema (Museo claro / Noche oscuro).

  Es el unico ajuste variable del sitio (la disposicion, el acento y la tipografia son fijos).

  IMPORTANTE: el resolutor anti-parpadeo corre INLINE en el <head> (ver Base.astro)
  para fijar data-tema antes del primer pintado. Este modulo expone la API publica
  que usa el boton sol/luna del plaque.

  Implementacion completa en Fase 1 del ROADMAP. Firma prevista:

    export type Tema = 'Museo' | 'Noche';
    export function temaActual(): Tema;
    export function fijarTema(tema: Tema): void;   // persiste en localStorage y emite 'salathemechange'
    export function alternarTema(): Tema;          // Museo <-> Noche

  Eventos:
    - 'salathemechange' (CustomEvent<Tema>) al cambiar de tema.
    - Listener de matchMedia('(prefers-color-scheme: dark)') que sigue al SO
      mientras el usuario no haya elegido tema manualmente.
*/

export type Tema = 'Museo' | 'Noche';

export const TEMAS: readonly Tema[] = ['Museo', 'Noche'];

// TODO(Fase 1): implementar temaActual / fijarTema / alternarTema + listeners.
