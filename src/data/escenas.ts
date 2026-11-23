/*
  Indice de escenas del carrete, en orden de documento. Unica fuente para el riel lateral y el
  menu de secciones movil. La clave es tambien el id del ancla y la clave de `slates`.
*/

export type ClaveEscena =
  | 'portada'
  | 'experiencia'
  | 'ia'
  | 'trabajo'
  | 'equipo'
  | 'conoceme'
  | 'contacto';

export const ESCENAS: readonly ClaveEscena[] = [
  'portada',
  'experiencia',
  'ia',
  'trabajo',
  'equipo',
  'conoceme',
  'contacto',
];
