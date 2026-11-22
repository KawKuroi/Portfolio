/*
  Indice de escenas del carrete, en orden de documento. Unica fuente para el riel lateral,
  el indice de la portada y los numeros de acto de cada encabezado.
*/

export type ClaveEscena =
  | 'portada'
  | 'experiencia'
  | 'ia'
  | 'trabajo'
  | 'equipo'
  | 'conoceme'
  | 'contacto';

export interface Escena {
  /** Clave del diccionario (slates) e id del ancla en el documento. */
  clave: ClaveEscena;
  /** Numero de acto en romanos; la portada y el contacto no llevan. */
  acto?: string;
  /** Id del icono del sprite (sin el #). */
  icono?: string;
}

export const ESCENAS: readonly Escena[] = [
  { clave: 'portada' },
  { clave: 'experiencia', acto: 'I', icono: 'ic-briefcase' },
  { clave: 'ia', acto: 'II', icono: 'ic-spark' },
  { clave: 'trabajo', acto: 'III', icono: 'ic-code' },
  { clave: 'equipo', acto: 'IV', icono: 'ic-server' },
  { clave: 'conoceme', acto: 'V', icono: 'ic-film' },
  { clave: 'contacto' },
];
