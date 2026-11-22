/*
  Diccionario de internacionalizacion (i18n) del portafolio.

  Unica fuente de verdad del copy bilingue (espanol/ingles). El sitio se prerenderiza en dos
  rutas estaticas: `/` (es, por defecto) y `/en/` (en). Cada componente .astro lee su idioma de
  `Astro.currentLocale` y toma sus textos de `obtenerTextos(idioma)`; los scripts de cliente leen
  el idioma de `document.documentElement.lang` y usan este mismo modulo.

  COMO ANADIR/CAMBIAR TEXTO:
    1) Anade la clave a la interfaz `Textos`.
    2) Rellenala en `UI.es` y `UI.en`.
  El tipado es estricto: si falta una clave en un idioma, es error de compilacion. Asi una
  traduccion olvidada nunca llega a produccion.

  NOTA: solo se internacionaliza el COPY del producto. Los identificadores y comentarios del
  codigo siguen en espanol (ver GLOBAL.md). Nombres propios (persona, peliculas/libros/juegos/
  discos, marcas tecnicas) no se traducen.
*/

import type { Categoria } from '../data/favoritos';
import type { ClaveEscena } from '../data/escenas';

export type Idioma = 'es' | 'en';

export const IDIOMAS: readonly Idioma[] = ['es', 'en'];

/** Estructura del copy de una pagina en un idioma. */
export interface Textos {
  // ── Documento / SEO ──
  htmlTitle: string;
  metaDescription: string;
  jobTitle: string;
  knowsAbout: readonly string[];
  /** Locale para Open Graph (es_ES / en_US). */
  ogLocale: string;
  /** Locale alterno (el otro idioma) para og:locale:alternate. */
  ogLocaleAlt: string;

  // ── Etiquetas accesibles / aria ──
  aria: {
    cambiarTema: string;
    /** aria-label del boton de idioma (describe el idioma DESTINO). */
    cambiarIdioma: string;
    navegacion: string;
    /** Prefijo del aria de cada punto del riel ("Ir a " / "Go to "). */
    irA: string;
    filtro: string;
    indice: string;
    persiana: string;
    contacto: string;
    formulario: string;
    cerrar: string;
  };

  /** Codigo de dos letras del idioma DESTINO que muestra el boton (EN en es, ES en en). */
  langCodigoDestino: string;

  // ── Hint de scroll ──
  hint: { desliza: string; recorrer: string };

  /** Rotulos del riel, del indice de portada y de data-slate (uno por escena). */
  slates: Record<ClaveEscena, string>;

  // ── Portada ──
  portada: {
    kick: string;
    /** Va seguido del nombre de la empresa. */
    ahora: string;
    resumen: string;
    rol: string;
    retratoAlt: string;
    retratoPlaceholder: string;
  };

  // ── La experiencia ──
  experiencia: {
    /** Titulo con <em> (se inyecta con set:html). */
    tituloHtml: string;
    sub: string;
    periodo: string;
    cargo: string;
    resumen: string;
    herramientas: string;
    proyectoEtiqueta: string;
    proyecto: string;
    descripcion: string;
    confidencial: string;
  };

  // ── IA aplicada ──
  ia: {
    /** Titulo con <em> (se inyecta con set:html). */
    tituloHtml: string;
    sub: string;
    intro: string;
    flujoTitulo: string;
    flujo: readonly string[];
    herramientas: string;
  };

  // ── El trabajo ──
  trabajo: {
    /** Titulo con <em> (se inyecta con set:html). */
    tituloHtml: string;
    /** Palabra "proyectos"/"projects" para el conteo "N proyectos". */
    proyectos: string;
    pista: string;
    /** Prefijo del alt de las capturas ("Captura de " / "Screenshot of "). */
    capturaAlt: string;
    verEnLinea: string;
    repoFlecha: string;
  };

  // ── El equipo ──
  equipo: {
    tituloHtml: string;
    sub: string;
    stack: string;
    /** Fila IA del stack: lo unico de la lista que se traduce. */
    agentes: string;
    formacion: string;
    etiquetas: {
      lenguajes: string;
      backend: string;
      frontend: string;
      ia: string;
      bases: string;
      datosMl: string;
      cloud: string;
      versiones: string;
    };
    /** Textos de formacion que se traducen (los nombres propios/cursos se mantienen). */
    grado: string;
    presente: string;
    enCurso: string;
  };

  // ── Conoceme ──
  conoceme: {
    tituloHtml: string;
    sub: string;
    todo: string;
    nota: string;
    notaTactil: string;
    pausar: string;
    reproducir: string;
  };

  /** Etiqueta visible de cada categoria (la clave `c` se mantiene en espanol). */
  categorias: Record<Categoria, string>;

  // ── Contacto (Salida) ──
  salida: {
    frase: string;
    nota: string;
    form: {
      titulo: string;
      sub: string;
      nombre: string;
      opcional: string;
      correo: string;
      mensaje: string;
      enviar: string;
      prefieres: string;
    };
    estado: {
      enviando: string;
      ok: string;
      errGeneral: string;
      errRed: string;
      copiado: string;
    };
    web3: { subject: string; fromName: string; anonimo: string };
  };
}

export const UI: Record<Idioma, Textos> = {
  es: {
    htmlTitle: 'Kevin Axel Herazo Rolón — Portafolio',
    metaDescription:
      'Kevin Axel Herazo Rolón, practicante de Tecnología en Makro Supermayorista. Automatización de procesos, datos e IA aplicada con MCP, skills y agentes.',
    jobTitle: 'Practicante de Tecnología',
    knowsAbout: [
      'Automatización de procesos',
      'Backend',
      'Ingeniería de datos',
      'Inteligencia artificial',
      'Model Context Protocol',
      'Agentes de IA',
    ],
    ogLocale: 'es_ES',
    ogLocaleAlt: 'en_US',

    aria: {
      cambiarTema: 'Cambiar tema',
      cambiarIdioma: 'Switch to English',
      navegacion: 'Navegación del portafolio',
      irA: 'Ir a ',
      filtro: 'Filtrar por categoría',
      indice: 'Índice',
      persiana: 'Piezas favoritas; usa las flechas izquierda y derecha',
      contacto: 'Contacto',
      formulario: 'Formulario de contacto',
      cerrar: 'Cerrar',
    },

    langCodigoDestino: 'EN',

    hint: { desliza: 'Desliza o usa', recorrer: 'para recorrer el portafolio' },

    slates: {
      portada: 'Portada',
      experiencia: 'La experiencia',
      ia: 'IA aplicada',
      trabajo: 'El trabajo',
      equipo: 'El equipo',
      conoceme: 'Conóceme',
      contacto: 'Contacto',
    },

    portada: {
      kick: 'Ingeniería de Sistemas · Bogotá',
      ahora: 'Practicante de Tecnología en',
      resumen:
        'Convierto procesos manuales en automatizaciones confiables y construyo herramientas con IA: servidores MCP, skills y agentes.',
      rol: 'Automatización · Datos · Inteligencia artificial',
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'retrato',
    },

    experiencia: {
      tituloHtml: 'La <em>experiencia</em>',
      sub: 'práctica empresarial',
      periodo: '2026 — Actual · Bogotá',
      cargo: 'Practicante de Tecnología, Soporte a Operaciones',
      resumen:
        'Doy soporte a la operación diaria (monitoreo, diagnóstico y documentación de incidentes) y automatizo los procesos repetitivos del área.',
      herramientas: 'Herramientas de la práctica',
      proyectoEtiqueta: 'Proyecto principal',
      proyecto: 'Centro de Automatizaciones',
      descripcion:
        'Diseño y desarrollo de una plataforma propia para que los informes operativos que se hacían a mano se ejecuten de forma programada, trazable y verificable.',
      confidencial: '// detalles internos omitidos por confidencialidad',
    },

    ia: {
      tituloHtml: 'IA <em>aplicada</em>',
      sub: 'mcp · skills · agentes',
      intro:
        'Construyo las herramientas que usan los modelos, les doy el contexto justo y verifico lo que producen.',
      flujoTitulo: 'Cómo trabajo con agentes',
      flujo: ['Contexto', 'Plan', 'Implementación', 'Verificación', 'Aprobación humana'],
      herramientas: 'Herramientas de IA',
    },

    trabajo: {
      tituloHtml: 'El <em>trabajo</em>',
      proyectos: 'proyectos',
      pista: '// clic en una obra para verla en grande',
      capturaAlt: 'Captura de ',
      verEnLinea: 'Ver en línea',
      repoFlecha: 'Repo →',
    },

    equipo: {
      tituloHtml: 'El <em>equipo</em> y los <em>créditos</em>',
      sub: 'stack · formación',
      stack: 'Stack',
      agentes: 'Agentes',
      formacion: 'Formación',
      etiquetas: {
        lenguajes: 'Lenguajes',
        backend: 'Backend',
        frontend: 'Frontend',
        ia: 'IA',
        bases: 'Bases de datos',
        datosMl: 'Datos / ML',
        cloud: 'Cloud',
        versiones: 'Versiones',
      },
      grado: 'Ingeniería de Sistemas',
      presente: '2022 — Actual',
      enCurso: 'En curso',
    },

    conoceme: {
      tituloHtml: '<em>Conóceme</em>',
      sub: '20 piezas · cine · juegos · libros · música',
      todo: 'Todo',
      nota: '// aquí están las piezas que me formaron el gusto —composición, ritmo y color. Pasa el cursor sobre una franja para abrirla.',
      notaTactil: '// las piezas que me formaron el gusto. Toca una franja para abrirla.',
      pausar: 'Pausar',
      reproducir: 'Reproducir',
    },

    categorias: {
      Cine: 'Cine',
      Juegos: 'Juegos',
      Libros: 'Libros',
      Música: 'Música',
    },

    salida: {
      frase: 'Contáctame.',
      nota: '// el correo abre un formulario para enviarme tu mensaje aquí mismo',
      form: {
        titulo: 'Escríbeme',
        sub: 'Cuéntame tu idea y te respondo al correo que dejes.',
        nombre: 'Nombre',
        opcional: '(opcional)',
        correo: 'Correo',
        mensaje: 'Mensaje',
        enviar: 'Enviar',
        prefieres: '¿Prefieres el correo directo?',
      },
      estado: {
        enviando: 'Enviando…',
        ok: '¡Mensaje enviado! Te respondo pronto.',
        errGeneral: 'No se pudo enviar. Escríbeme directo al correo.',
        errRed: 'No se pudo enviar. Revisa tu conexión o escríbeme al correo.',
        copiado: '¡Copiado!',
      },
      web3: {
        subject: 'Nuevo mensaje desde el portafolio',
        fromName: 'Portafolio · Kevin Herazo',
        anonimo: 'Anónimo',
      },
    },
  },

  en: {
    htmlTitle: 'Kevin Axel Herazo Rolón — Portfolio',
    metaDescription:
      'Kevin Axel Herazo Rolón, Technology Intern at Makro Supermayorista. Process automation, data and applied AI with MCP, skills and agents.',
    jobTitle: 'Technology Intern',
    knowsAbout: [
      'Process automation',
      'Backend',
      'Data engineering',
      'Artificial intelligence',
      'Model Context Protocol',
      'AI agents',
    ],
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_ES',

    aria: {
      cambiarTema: 'Switch theme',
      cambiarIdioma: 'Cambiar a español',
      navegacion: 'Portfolio navigation',
      irA: 'Go to ',
      filtro: 'Filter by category',
      indice: 'Contents',
      persiana: 'Favourite pieces; use the left and right arrows',
      contacto: 'Contact',
      formulario: 'Contact form',
      cerrar: 'Close',
    },

    langCodigoDestino: 'ES',

    hint: { desliza: 'Swipe or use', recorrer: 'to move through the portfolio' },

    slates: {
      portada: 'Cover',
      experiencia: 'Experience',
      ia: 'Applied AI',
      trabajo: 'The work',
      equipo: 'The team',
      conoceme: 'About me',
      contacto: 'Contact',
    },

    portada: {
      kick: 'Systems Engineering · Bogotá',
      ahora: 'Technology Intern at',
      resumen:
        'I turn manual processes into reliable automations and build tools with AI: MCP servers, skills and agents.',
      rol: 'Automation · Data · Artificial intelligence',
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'portrait',
    },

    experiencia: {
      tituloHtml: 'The <em>experience</em>',
      sub: 'internship',
      periodo: '2026 — Present · Bogotá',
      cargo: 'Technology Intern, Operations Support',
      resumen:
        'I support daily operations (monitoring, incident diagnosis and documentation) and automate the repetitive processes of the department.',
      herramientas: 'Internship tools',
      proyectoEtiqueta: 'Main project',
      proyecto: 'Automation Hub',
      descripcion:
        'Design and development of an in-house platform so that operational reports once produced by hand run on schedule, traceably and verifiably.',
      confidencial: '// internal details omitted for confidentiality',
    },

    ia: {
      tituloHtml: 'Applied <em>AI</em>',
      sub: 'mcp · skills · agents',
      intro:
        'I build the tools models use, give them just the right context and verify what they produce.',
      flujoTitulo: 'How I work with agents',
      flujo: ['Context', 'Plan', 'Implementation', 'Verification', 'Human approval'],
      herramientas: 'AI tools',
    },

    trabajo: {
      tituloHtml: 'The <em>work</em>',
      proyectos: 'projects',
      pista: '// click a piece to see it large',
      capturaAlt: 'Screenshot of ',
      verEnLinea: 'View live',
      repoFlecha: 'Repo →',
    },

    equipo: {
      tituloHtml: 'The <em>team</em> &amp; <em>credits</em>',
      sub: 'stack · education',
      stack: 'Stack',
      agentes: 'Agents',
      formacion: 'Education',
      etiquetas: {
        lenguajes: 'Languages',
        backend: 'Backend',
        frontend: 'Frontend',
        ia: 'AI',
        bases: 'Databases',
        datosMl: 'Data / ML',
        cloud: 'Cloud',
        versiones: 'Versioning',
      },
      grado: 'Systems Engineering',
      presente: '2022 — Present',
      enCurso: 'In progress',
    },

    conoceme: {
      tituloHtml: '<em>About me</em>',
      sub: '20 pieces · film · games · books · music',
      todo: 'All',
      nota: '// these are the pieces that shaped my taste —composition, rhythm and colour. Hover over a strip to open it.',
      notaTactil: '// the pieces that shaped my taste. Tap a strip to open it.',
      pausar: 'Pause',
      reproducir: 'Play',
    },

    categorias: {
      Cine: 'Film',
      Juegos: 'Games',
      Libros: 'Books',
      Música: 'Music',
    },

    salida: {
      frase: "Let's talk.",
      nota: '// the email opens a form to send me your message right here',
      form: {
        titulo: 'Write to me',
        sub: "Tell me your idea and I'll reply to the email you leave.",
        nombre: 'Name',
        opcional: '(optional)',
        correo: 'Email',
        mensaje: 'Message',
        enviar: 'Send',
        prefieres: 'Prefer email directly?',
      },
      estado: {
        enviando: 'Sending…',
        ok: "Message sent! I'll reply soon.",
        errGeneral: "Couldn't send. Email me directly.",
        errRed: "Couldn't send. Check your connection or email me.",
        copiado: 'Copied!',
      },
      web3: {
        subject: 'New message from the portfolio',
        fromName: 'Portfolio · Kevin Herazo',
        anonimo: 'Anonymous',
      },
    },
  },
};

/** Coerce un locale desconocido (p. ej. Astro.currentLocale) a un Idioma valido. */
export function obtenerIdioma(locale?: string | null): Idioma {
  return locale === 'en' ? 'en' : 'es';
}

/** Devuelve el diccionario del idioma indicado. */
export function obtenerTextos(idioma: Idioma): Textos {
  return UI[idioma];
}
