/*
  Datos de "El trabajo" (escena III). Orden de exhibicion: Ethos, Noti, Traductor, Football y
  Turismo. Las capturas (1500x1000) viven en /assets/projects/*.webp. Cada proyecto se muestra
  con un unico boton a su repositorio de GitHub (sin demos en vivo, por decision del usuario).

  i18n: titulo, anio y descripcion son bilingues; tags (nombres de tecnologias), repo e img son
  neutros.
*/

import type { Idioma } from '../i18n/ui';

/** Cadena de copy en los dos idiomas del sitio. */
type Bilingue = Record<Idioma, string>;

export interface Proyecto {
  titulo: Bilingue;
  /** Tecnologias principales (se muestran separadas por comas). */
  tags: readonly string[];
  /** Mes y anio. */
  anio: Bilingue;
  /** URL del repositorio en GitHub. */
  repo: string;
  /** Ruta de la captura. */
  img: string;
  /** Descripcion corta (una o dos frases). */
  descripcion: Bilingue;
}

export const PROYECTOS: readonly Proyecto[] = [
  {
    titulo: { es: 'Ethos', en: 'Ethos' },
    tags: ['MCP', 'FastAPI', 'Next.js', 'Supabase', 'OAuth 2.1'],
    anio: { es: 'Jul 2026', en: 'Jul 2026' },
    repo: 'https://github.com/KawKuroi/Ethos',
    img: '/assets/projects/ethos.webp',
    descripcion: {
      es: 'Reúne tu historial de juegos, música, cine, anime y libros y se lo entrega a cualquier IA mediante un servidor MCP con OAuth 2.1. Incluye panel de estadísticas y pruebas exigidas en CI.',
      en: 'Brings together your games, music, film, anime and book history and serves it to any AI through an MCP server with OAuth 2.1. Includes a stats dashboard and tests enforced in CI.',
    },
  },
  {
    titulo: { es: 'Noti', en: 'Noti' },
    tags: ['Next.js', 'TypeScript', 'AI SDK', 'Supabase', 'Tauri'],
    anio: { es: 'Jun 2026', en: 'Jun 2026' },
    repo: 'https://github.com/KawKuroi/Noti',
    img: '/assets/projects/noti.webp',
    descripcion: {
      es: 'Recordatorios con notificaciones push y un asistente de IA por texto o voz que agenda lanzamientos desde fuentes verificadas. PWA y apps nativas.',
      en: 'Reminders with push notifications and an AI assistant by text or voice that schedules releases from verified sources. PWA and native apps.',
    },
  },
  {
    titulo: { es: 'Traductor de Lenguaje de Señas', en: 'Sign Language Translator' },
    tags: ['Spring Boot', 'FastAPI', 'MediaPipe', 'Docker'],
    anio: { es: 'Abr 2026', en: 'Apr 2026' },
    repo: 'https://github.com/KawKuroi/Sign_Language_Translator',
    img: '/assets/projects/traductor.webp',
    descripcion: {
      es: 'Reconoce en tiempo real el alfabeto de señas ASL desde la cámara, con 97 % de precisión. Microservicios con Spring Boot, FastAPI y Docker.',
      en: 'Recognises the ASL fingerspelling alphabet from the camera in real time, with 97% accuracy. Microservices with Spring Boot, FastAPI and Docker.',
    },
  },
  {
    titulo: { es: 'Football Notificator', en: 'Football Notificator' },
    tags: ['Python', 'Web Scraping', 'Google Forms'],
    anio: { es: 'May 2026', en: 'May 2026' },
    repo: 'https://github.com/KawKuroi/Football_notificator',
    img: '/assets/projects/futbol.webp',
    descripcion: {
      es: 'Bot que rastrea resultados y horarios y avisa cada día a cada usuario sobre los partidos de sus equipos.',
      en: "Bot that tracks scores and fixtures and alerts each user every day about their teams' matches.",
    },
  },
  {
    titulo: { es: 'App de Turismo', en: 'Tourism App' },
    tags: ['Kotlin', 'Firebase', 'Jetpack'],
    anio: { es: 'Nov 2024', en: 'Nov 2024' },
    repo: 'https://github.com/JeRamirez25/appTurismo',
    img: '/assets/projects/turismo.webp',
    descripcion: {
      es: 'App Android para descubrir lugares y armar rutas, con favoritos sincronizados en Firebase. Lideré el equipo técnico.',
      en: 'Android app to discover places and build routes, with favourites synced in Firebase. I led the technical team.',
    },
  },
];
