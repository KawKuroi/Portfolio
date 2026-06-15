/*
  Datos de "El trabajo" (escena I). Orden de prioridad: Traductor, Noti, Football, Turismo.
  Las rutas de imagen apuntan a /assets/projects/* (capturas pendientes de aportar por el
  usuario; mientras falten, el onerror del render mostrara un placeholder rayado "captura").
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
  /** Estado corto (97%, Push, Diario, Lead...). */
  estado: string;
  /** URL del repositorio. */
  repo: string;
  /** Ruta de la captura. */
  img: string;
  /** Descripcion larga. */
  descripcion: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    titulo: 'Traductor de Lenguaje de Señas',
    icono: 'ic-spark',
    tags: 'Spring Boot · FastAPI · IA · Docker · Microservicios',
    chips: ['Spring Boot', 'FastAPI', 'IA', 'Docker', 'Microservicios'],
    anio: 'Abr 2026',
    estado: '97%',
    repo: 'https://github.com/KawKuroi/Sign_Language_Translator',
    img: '/assets/projects/01-senas.png',
    descripcion:
      'Reconoce señas en tiempo real y las traduce a texto. Arquitectura de microservicios: Spring Boot orquesta la API y un servicio FastAPI sirve el modelo de visión, todo empaquetado en Docker. 97% de precisión en validación.',
  },
  {
    titulo: 'Noti — PWA de notificaciones',
    icono: 'ic-server',
    tags: 'TypeScript · PWA · TMDB · Push API',
    chips: ['TypeScript', 'PWA', 'TMDB', 'Push API'],
    anio: '2025',
    estado: 'Push',
    repo: 'https://github.com/KawKuroi/Noti',
    img: '/assets/projects/03-noti.png',
    descripcion:
      'App web progresiva que avisa de estrenos de cine y series con datos de TMDB. Notificaciones push nativas, instalable y con soporte offline.',
  },
  {
    titulo: 'Football Notificator',
    icono: 'ic-code',
    tags: 'Python · Web Scraping · Automatización',
    chips: ['Python', 'Web Scraping', 'Automatización'],
    anio: 'May 2026',
    estado: 'Diario',
    repo: 'https://github.com/KawKuroi/Football_notificator',
    img: '/assets/projects/02-football.png',
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
    img: '/assets/projects/04-turismo.png',
    descripcion:
      'App Android para descubrir sitios turísticos: mapa, fichas de lugares y favoritos sincronizados en Firebase. Lideré el equipo técnico; construida con Jetpack y base de datos NoSQL.',
  },
];
