/*
  Datos de "Conoceme" (escena III) — 20 piezas favoritas para la persiana.
  Orden exacto: Cine (5), Juegos (5), Libros (5), Musica (5).

  POLITICA DE ASSETS: todas las caratulas se sirven localmente desde /assets/*
  (cine, juegos, libros y musica). El gradiente `g` es el respaldo visible si la
  caratula no carga (el onerror oculta la img). Los gradientes se autoran aqui
  porque el favs.js original no esta en el repo; se afinan en Fase 4 del ROADMAP.
*/

export type Categoria = 'Cine' | 'Juegos' | 'Libros' | 'Música';

export interface Favorito {
  /** Categoria de la pieza. */
  c: Categoria;
  /** Titulo. */
  t: string;
  /** Subtitulo (autor/director/estudio/artista + anio). */
  s: string;
  /** Ruta local de la caratula. */
  img: string;
  /** Gradiente de respaldo si la caratula no carga. */
  g: string;
  /** Pieza ancha (ocupa mas en la persiana). */
  wide?: boolean;
}

export const FAVORITOS: Favorito[] = [
  // --- Cine ---
  {
    c: 'Cine',
    t: 'Mulholland Drive',
    s: 'David Lynch · 2001',
    img: '/assets/movies/mulholland.jpg',
    g: 'linear-gradient(135deg, #2b1a23 0%, #6e2a3c 55%, #b5503a 100%)',
    wide: true,
  },
  {
    c: 'Cine',
    t: 'Interstellar',
    s: 'Christopher Nolan · 2014',
    img: '/assets/movies/interestellar.jpg',
    g: 'linear-gradient(135deg, #0b1620 0%, #1f3a4d 60%, #6c8aa0 100%)',
  },
  {
    c: 'Cine',
    t: 'Cidade de Deus',
    s: 'Fernando Meirelles · 2002',
    img: '/assets/movies/cidade.jpg',
    g: 'linear-gradient(135deg, #2a1c10 0%, #8a5a1e 55%, #c08a2e 100%)',
  },
  {
    c: 'Cine',
    t: 'Akira',
    s: 'Katsuhiro Otomo · 1988',
    img: '/assets/movies/akira.jpg',
    g: 'linear-gradient(135deg, #2a0e12 0%, #8a1a22 55%, #d8453a 100%)',
  },
  {
    c: 'Cine',
    t: 'Blade Runner',
    s: 'Ridley Scott · 1982',
    img: '/assets/movies/blade.jpg',
    g: 'linear-gradient(135deg, #14171f 0%, #3a2a4d 55%, #6e5a8a 100%)',
  },

  // --- Juegos ---
  {
    c: 'Juegos',
    t: 'Final Fantasy IX',
    s: 'Square · 2000',
    img: '/assets/videogames/ff9.jpg',
    g: 'linear-gradient(135deg, #161e2a 0%, #2f4a6e 55%, #6f8ec0 100%)',
  },
  {
    c: 'Juegos',
    t: 'Red Dead Redemption 2',
    s: 'Rockstar · 2018',
    img: '/assets/videogames/rdr2.jpg',
    g: 'linear-gradient(135deg, #2a160f 0%, #7a3a20 55%, #c0682e 100%)',
  },
  {
    c: 'Juegos',
    t: 'Zelda: Tears of the Kingdom',
    s: 'Nintendo · 2023',
    img: '/assets/videogames/totk.jpg',
    g: 'linear-gradient(135deg, #13201c 0%, #2f6e57 55%, #6fc09a 100%)',
  },
  {
    c: 'Juegos',
    t: 'Elden Ring',
    s: 'FromSoftware · 2022',
    img: '/assets/videogames/elden.jpg',
    g: 'linear-gradient(135deg, #1c160b 0%, #6e5a1e 55%, #c8a23a 100%)',
  },
  {
    c: 'Juegos',
    t: "Baldur's Gate 3",
    s: 'Larian · 2023',
    img: '/assets/videogames/baldursgate3.jpg',
    g: 'linear-gradient(135deg, #0d0f16 0%, #3a2a4d 55%, #b58a3a 100%)',
  },

  // --- Libros ---
  {
    c: 'Libros',
    t: 'El hacedor',
    s: 'Jorge Luis Borges · 1960',
    img: '/assets/books/hacedor.jpg',
    g: 'linear-gradient(135deg, #1c1813 0%, #4d3f2a 55%, #8a7a57 100%)',
  },
  {
    c: 'Libros',
    t: 'Juramentada',
    s: 'Brandon Sanderson · 2017',
    img: '/assets/books/juramentada.jpg',
    g: 'linear-gradient(135deg, #101a20 0%, #2a4a57 55%, #4f8f87 100%)',
  },
  {
    c: 'Libros',
    t: 'El nombre del viento',
    s: 'Patrick Rothfuss · 2007',
    img: '/assets/books/el_nombre_del_viento.jpg',
    g: 'linear-gradient(135deg, #0d0f08 0%, #2a3315 55%, #c8862e 100%)',
  },
  {
    c: 'Libros',
    t: 'El extranjero',
    s: 'Albert Camus · 1942',
    img: '/assets/books/el_extranjero.jpg',
    g: 'linear-gradient(135deg, #14171f 0%, #2f4a6e 55%, #6f8ec0 100%)',
  },
  {
    c: 'Libros',
    t: 'Ensayo sobre la ceguera',
    s: 'José Saramago · 1995',
    img: '/assets/books/ceguera.jpg',
    g: 'linear-gradient(135deg, #1a1a17 0%, #45453c 55%, #9c9484 100%)',
  },

  // --- Musica ---
  {
    c: 'Música',
    t: 'In Rainbows',
    s: 'Radiohead · 2007',
    img: '/assets/music/in_rainbows.jpg',
    g: 'linear-gradient(135deg, #2a1606 0%, #8a4a1e 55%, #d8a23a 100%)',
  },
  {
    c: 'Música',
    t: 'MM..FOOD',
    s: 'MF DOOM · 2004',
    img: '/assets/music/mm_food.jpg',
    g: 'linear-gradient(135deg, #2a1c0d 0%, #6e4a1e 55%, #c0892e 100%)',
  },
  {
    c: 'Música',
    t: 'Data',
    s: 'Tainy · 2023',
    img: '/assets/music/data.jpg',
    g: 'linear-gradient(135deg, #0d1620 0%, #1f3a57 55%, #4f6fc0 100%)',
  },
  {
    c: 'Música',
    t: 'Debí Tirar Más Fotos',
    s: 'Bad Bunny · 2025',
    img: '/assets/music/dtmf.jpg',
    g: 'linear-gradient(135deg, #16201a 0%, #2f6e4a 55%, #6fc08a 100%)',
  },
  {
    c: 'Música',
    t: 'Artaud',
    s: 'Spinetta · 1973',
    img: '/assets/music/artaud.jpg',
    g: 'linear-gradient(135deg, #201410 0%, #6e3a2a 55%, #c0682e 100%)',
  },
];
