/*
  Datos de "El trabajo" (escena I). Orden de exhibicion: Noti (en progreso, en linea) primero,
  luego Traductor, Football y Turismo. Las rutas de imagen apuntan a /assets/projects/*.webp
  (normalizadas). Si una falta, el onerror del render muestra un placeholder rayado "captura".
*/

export interface Proyecto {
  /** Titulo del proyecto. */
  titulo: string;
  /** Id del icono del sprite SVG (sin el #). */
  icono: string;
  /** Tecnologias como cadena separada por " · ". */
  tags: string;
  /** Tecnologias como lista (chips en la disposicion Detalle). */
  chips: string[];
  /** Anio o fecha mostrada. */
  anio: string;
  /** Estado corto (97%, En progreso, Diario, Lead...). */
  estado: string;
  /** URL del repositorio. */
  repo: string;
  /** URL de la version publicada en linea (opcional; marca el proyecto como "en linea"). */
  demo?: string;
  /** Ruta de la captura. */
  img: string;
  /** Descripcion larga. */
  descripcion: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    titulo: 'Noti — PWA de notificaciones',
    icono: 'ic-server',
    tags: 'TypeScript · PWA · TMDB · Push API',
    chips: ['TypeScript', 'PWA', 'TMDB', 'Push API'],
    anio: '2025 — Actual',
    estado: 'En progreso',
    repo: 'https://github.com/KawKuroi/Noti',
    demo: 'https://noti-seven-peach.vercel.app/',
    img: '/assets/projects/noti.webp',
    descripcion:
      'App web progresiva que avisa de estrenos de cine y series con datos de TMDB. Notificaciones push nativas, instalable y con soporte offline. En desarrollo activo: la sigo ampliando con nuevas categorías y vistas.',
  },
  {
    titulo: 'Traductor de Lenguaje de Señas',
    icono: 'ic-spark',
    tags: 'Spring Boot · FastAPI · IA · Docker · Microservicios',
    chips: ['Spring Boot', 'FastAPI', 'IA', 'Docker', 'Microservicios'],
    anio: 'Abr 2026',
    estado: '97%',
    repo: 'https://github.com/KawKuroi/Sign_Language_Translator',
    img: '/assets/projects/traductor.webp',
    descripcion:
      'Reconoce señas en tiempo real y las traduce a texto. Arquitectura de microservicios: Spring Boot orquesta la API y un servicio FastAPI sirve el modelo de visión, todo empaquetado en Docker. 97% de precisión en validación.',
  },
  {
    titulo: 'Football Notificator',
    icono: 'ic-code',
    tags: 'Python · Web Scraping · Automatización',
    chips: ['Python', 'Web Scraping', 'Automatización'],
    anio: 'May 2026',
    estado: 'Diario',
    repo: 'https://github.com/KawKuroi/Football_notificator',
    img: '/assets/projects/futbol.webp',
    descripcion:
      'Bot que rastrea resultados y horarios por web scraping y envía una notificación automática cada día. Pensado para no perderse un partido del equipo.',
  },
  {
    titulo: 'App de Turismo',
    icono: 'ic-cloud',
    tags: 'Kotlin · Firebase · NoSQL · Jetpack',
    chips: ['Kotlin', 'Firebase', 'NoSQL', 'Jetpack'],
    anio: 'Nov 2024',
    estado: 'Lead',
    repo: 'https://github.com/JeRamirez25/appTurismo',
    img: '/assets/projects/turismo.webp',
    descripcion:
      'App Android para descubrir sitios turísticos: mapa, fichas de lugares y favoritos sincronizados en Firebase. Lideré el equipo técnico; construida con Jetpack y base de datos NoSQL.',
  },
];
