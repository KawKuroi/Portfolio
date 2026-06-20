/*
  Datos de "El trabajo" (escena I). Orden de exhibicion: Noti (en progreso, en linea) primero,
  luego Traductor, Football y Turismo. Las rutas de imagen apuntan a /assets/projects/*.webp
  (normalizadas). Si una falta, el onerror del render muestra un placeholder rayado "captura".

  i18n: los campos de copy (titulo, tags, anio, estado, descripcion) son bilingues
  (Record<Idioma, string>); el render y los scripts eligen el idioma vigente. El resto de campos
  (icono, chips, repo, demo, img) son neutros. Nombres propios/marcas no se traducen.
*/

import type { Idioma } from '../i18n/ui';

/** Cadena de copy en los dos idiomas del sitio. */
type Bilingue = Record<Idioma, string>;

export interface Proyecto {
  /** Titulo del proyecto. */
  titulo: Bilingue;
  /** Id del icono del sprite SVG (sin el #). */
  icono: string;
  /** Tecnologias como cadena separada por " · ". */
  tags: Bilingue;
  /** Tecnologias como lista (chips en la disposicion Detalle). */
  chips: string[];
  /** Anio o fecha mostrada. */
  anio: Bilingue;
  /** Estado corto (97%, En progreso, Diario, Lead...). */
  estado: Bilingue;
  /** URL del repositorio. */
  repo: string;
  /** URL de la version publicada en linea (opcional; marca el proyecto como "en linea"). */
  demo?: string;
  /** Ruta de la captura. */
  img: string;
  /** Descripcion larga. */
  descripcion: Bilingue;
}

export const PROYECTOS: Proyecto[] = [
  {
    titulo: { es: 'Noti — PWA de notificaciones', en: 'Noti — Notifications PWA' },
    icono: 'ic-server',
    tags: { es: 'TypeScript · PWA · TMDB · Push API', en: 'TypeScript · PWA · TMDB · Push API' },
    chips: ['TypeScript', 'PWA', 'TMDB', 'Push API'],
    anio: { es: 'May 2026', en: 'May 2026' },
    estado: { es: 'En progreso', en: 'In progress' },
    repo: 'https://github.com/KawKuroi/Noti',
    demo: 'https://noti-seven-peach.vercel.app/',
    img: '/assets/projects/noti.webp',
    descripcion: {
      es: 'App web progresiva que avisa de estrenos de cine y series con datos de TMDB. Notificaciones push nativas, instalable y con soporte offline. En desarrollo activo: la sigo ampliando con nuevas categorías y vistas.',
      en: 'Progressive web app that alerts you to film and series releases using TMDB data. Native push notifications, installable and offline-ready. In active development: I keep extending it with new categories and views.',
    },
  },
  {
    titulo: { es: 'Traductor de Lenguaje de Señas', en: 'Sign Language Translator' },
    icono: 'ic-spark',
    tags: {
      es: 'Spring Boot · FastAPI · IA · Docker · Microservicios',
      en: 'Spring Boot · FastAPI · AI · Docker · Microservices',
    },
    chips: ['Spring Boot', 'FastAPI', 'IA', 'Docker', 'Microservicios'],
    anio: { es: 'Abr 2026', en: 'Apr 2026' },
    estado: { es: '97%', en: '97%' },
    repo: 'https://github.com/KawKuroi/Sign_Language_Translator',
    img: '/assets/projects/traductor.webp',
    descripcion: {
      es: 'Reconoce señas en tiempo real y las traduce a texto. Arquitectura de microservicios: Spring Boot orquesta la API y un servicio FastAPI sirve el modelo de visión, todo empaquetado en Docker. 97% de precisión en validación.',
      en: 'Recognises sign language in real time and translates it to text. Microservices architecture: Spring Boot orchestrates the API and a FastAPI service serves the vision model, all packaged in Docker. 97% accuracy in validation.',
    },
  },
  {
    titulo: { es: 'Football Notificator', en: 'Football Notificator' },
    icono: 'ic-code',
    tags: {
      es: 'Python · Web Scraping · Automatización',
      en: 'Python · Web Scraping · Automation',
    },
    chips: ['Python', 'Web Scraping', 'Automatización'],
    anio: { es: 'May 2026', en: 'May 2026' },
    estado: { es: 'Diario', en: 'Daily' },
    repo: 'https://github.com/KawKuroi/Football_notificator',
    img: '/assets/projects/futbol.webp',
    descripcion: {
      es: 'Bot que rastrea resultados y horarios por web scraping y envía una notificación automática cada día. Pensado para no perderse un partido del equipo.',
      en: "Bot that tracks scores and fixtures via web scraping and sends an automatic notification every day. Made so you never miss your team's match.",
    },
  },
  {
    titulo: { es: 'App de Turismo', en: 'Tourism App' },
    icono: 'ic-cloud',
    tags: { es: 'Kotlin · Firebase · NoSQL · Jetpack', en: 'Kotlin · Firebase · NoSQL · Jetpack' },
    chips: ['Kotlin', 'Firebase', 'NoSQL', 'Jetpack'],
    anio: { es: 'Nov 2024', en: 'Nov 2024' },
    estado: { es: 'Lead', en: 'Lead' },
    repo: 'https://github.com/JeRamirez25/appTurismo',
    img: '/assets/projects/turismo.webp',
    descripcion: {
      es: 'App Android para descubrir sitios turísticos: mapa, fichas de lugares y favoritos sincronizados en Firebase. Lideré el equipo técnico; construida con Jetpack y base de datos NoSQL.',
      en: 'Android app to discover tourist spots: map, place cards and favourites synced in Firebase. I led the technical team; built with Jetpack and a NoSQL database.',
    },
  },
];
