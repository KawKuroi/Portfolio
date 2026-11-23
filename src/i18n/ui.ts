/*
  Diccionario de internacionalizacion (i18n) del portafolio.

  Unica fuente de verdad del copy bilingue (espanol/ingles). El sitio se prerenderiza en dos
  rutas estaticas: `/` (es, por defecto) y `/en/` (en). Cada componente .astro lee su idioma de
  `Astro.currentLocale` y toma sus textos de `obtenerTextos(idioma)`.

  COMO ANADIR/CAMBIAR TEXTO:
    1) Anade la clave a la interfaz `Textos`.
    2) Rellenala en `UI.es` y `UI.en`.
  El tipado es estricto: si falta una clave en un idioma, es error de compilacion.

  ESTILO DEL COPY (preferencia del usuario): frases cortas y concretas, sin rayas ni guiones,
  sin puntos medios como separador y sin notas que empiecen por "//".
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
    /** Boton del menu de secciones (movil). */
    menu: string;
    persiana: string;
    carrusel: string;
    contacto: string;
    formulario: string;
    cerrar: string;
  };

  /** Codigo de dos letras del idioma DESTINO que muestra el boton (EN en es, ES en en). */
  langCodigoDestino: string;

  // ── Hint de scroll ──
  hint: { desliza: string; recorrer: string };

  /** Rotulos del riel, del menu movil y de data-slate (uno por escena). */
  slates: Record<ClaveEscena, string>;

  // ── Portada ──
  portada: {
    kick: string;
    resumen: string;
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
    iaEtiqueta: string;
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
    /** Prefijo del alt de las capturas ("Captura de " / "Screenshot of "). */
    capturaAlt: string;
    github: string;
  };

  // ── El equipo ──
  equipo: {
    tituloHtml: string;
    sub: string;
    stack: string;
    /** Palabras del stack que se traducen. */
    agentes: string;
    eventosWindows: string;
    formacion: string;
    etiquetas: {
      lenguajes: string;
      backend: string;
      frontend: string;
      ia: string;
      automatizacion: string;
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
    htmlTitle: 'Portafolio de Kevin Axel Herazo Rolón',
    metaDescription:
      'Kevin Axel Herazo Rolón, practicante de Tecnología en Makro Supermayorista. Automatización de procesos e inteligencia artificial aplicada: agentes, servidores MCP, Copilot Studio y Power Automate.',
    jobTitle: 'Practicante de Tecnología',
    knowsAbout: [
      'Automatización de procesos',
      'Agentes de IA',
      'Model Context Protocol',
      'Copilot Studio',
      'Power Automate',
      'Backend',
      'Ingeniería de datos',
    ],
    ogLocale: 'es_ES',
    ogLocaleAlt: 'en_US',

    aria: {
      cambiarTema: 'Cambiar tema',
      cambiarIdioma: 'Switch to English',
      navegacion: 'Navegación del portafolio',
      irA: 'Ir a ',
      menu: 'Secciones',
      persiana: 'Piezas favoritas. Usa las flechas izquierda y derecha',
      carrusel: 'Desliza para ver más',
      contacto: 'Contacto',
      formulario: 'Formulario de contacto',
      cerrar: 'Cerrar',
    },

    langCodigoDestino: 'EN',

    hint: { desliza: 'Desliza o usa', recorrer: 'para recorrer el portafolio' },

    slates: {
      portada: 'Inicio',
      experiencia: 'La experiencia',
      ia: 'IA aplicada',
      trabajo: 'El trabajo',
      equipo: 'El equipo',
      conoceme: 'Conóceme',
      contacto: 'Contacto',
    },

    portada: {
      kick: 'Ingeniería de Sistemas en Bogotá',
      resumen:
        'Automatizo procesos y construyo con inteligencia artificial: agentes, servidores MCP, chatbots y flujos que llegan a producción.',
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'retrato',
    },

    experiencia: {
      tituloHtml: 'La <em>experiencia</em>',
      sub: 'práctica empresarial',
      periodo: 'Desde 2026 en Bogotá',
      cargo: 'Practicante de Tecnología, Soporte a Operaciones',
      resumen:
        'Automatizo los procesos del área con Python, Power Automate y Copilot Studio, y llevo la IA al trabajo diario del equipo.',
      herramientas: 'Herramientas de la práctica',
      proyectoEtiqueta: 'Proyecto principal',
      proyecto: 'Centro de Automatizaciones',
      descripcion:
        'Plataforma propia, alojada en un servidor local, que automatiza la operación del área: entrega reportes, abre casos de soporte y conecta los sistemas de la empresa.',
      iaEtiqueta: 'Proyectos con IA',
    },

    ia: {
      tituloHtml: 'IA <em>aplicada</em>',
      sub: 'agentes, MCP y automatización',
      intro:
        'Construyo con IA de principio a fin, desde agentes y servidores MCP hasta chatbots y automatizaciones en producción. Sigo cada lanzamiento y lo pruebo en proyectos reales.',
      flujoTitulo: 'Cómo trabajo con agentes',
      flujo: ['Contexto', 'Plan', 'Implementación', 'Verificación', 'Aprobación humana'],
      herramientas: 'Herramientas de IA',
    },

    trabajo: {
      tituloHtml: 'El <em>trabajo</em>',
      proyectos: 'proyectos',
      capturaAlt: 'Captura de ',
      github: 'Ver en GitHub',
    },

    equipo: {
      tituloHtml: 'El <em>equipo</em> y los <em>créditos</em>',
      sub: 'stack y formación',
      stack: 'Stack',
      agentes: 'agentes',
      eventosWindows: 'eventos de Windows',
      formacion: 'Formación',
      etiquetas: {
        lenguajes: 'Lenguajes',
        backend: 'Backend',
        frontend: 'Frontend',
        ia: 'IA',
        automatizacion: 'Automatización',
        bases: 'Bases de datos',
        datosMl: 'Datos y ML',
        cloud: 'Cloud',
        versiones: 'Versiones',
      },
      grado: 'Ingeniería de Sistemas',
      presente: 'Desde 2022',
      enCurso: 'En curso',
    },

    conoceme: {
      tituloHtml: '<em>Conóceme</em>',
      sub: '20 piezas favoritas',
      nota: 'Las piezas que formaron mi gusto. Pasa el cursor sobre una franja para abrirla.',
      notaTactil: 'Las piezas que formaron mi gusto. Desliza para ver las 20.',
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
      nota: 'El correo abre un formulario para escribirme desde aquí.',
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
        fromName: 'Portafolio de Kevin Herazo',
        anonimo: 'Anónimo',
      },
    },
  },

  en: {
    htmlTitle: "Kevin Axel Herazo Rolón's portfolio",
    metaDescription:
      'Kevin Axel Herazo Rolón, Technology Intern at Makro Supermayorista. Process automation and applied artificial intelligence: agents, MCP servers, Copilot Studio and Power Automate.',
    jobTitle: 'Technology Intern',
    knowsAbout: [
      'Process automation',
      'AI agents',
      'Model Context Protocol',
      'Copilot Studio',
      'Power Automate',
      'Backend',
      'Data engineering',
    ],
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_ES',

    aria: {
      cambiarTema: 'Switch theme',
      cambiarIdioma: 'Cambiar a español',
      navegacion: 'Portfolio navigation',
      irA: 'Go to ',
      menu: 'Sections',
      persiana: 'Favourite pieces. Use the left and right arrows',
      carrusel: 'Swipe to see more',
      contacto: 'Contact',
      formulario: 'Contact form',
      cerrar: 'Close',
    },

    langCodigoDestino: 'ES',

    hint: { desliza: 'Swipe or use', recorrer: 'to move through the portfolio' },

    slates: {
      portada: 'Home',
      experiencia: 'Experience',
      ia: 'Applied AI',
      trabajo: 'The work',
      equipo: 'The team',
      conoceme: 'About me',
      contacto: 'Contact',
    },

    portada: {
      kick: 'Systems Engineering in Bogotá',
      resumen:
        'I automate processes and build with artificial intelligence: agents, MCP servers, chatbots and flows that reach production.',
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'portrait',
    },

    experiencia: {
      tituloHtml: 'The <em>experience</em>',
      sub: 'internship',
      periodo: 'Since 2026 in Bogotá',
      cargo: 'Technology Intern, Operations Support',
      resumen:
        "I automate the department's processes with Python, Power Automate and Copilot Studio, and bring AI into the team's daily work.",
      herramientas: 'Internship tools',
      proyectoEtiqueta: 'Main project',
      proyecto: 'Automation Hub',
      descripcion:
        "In-house platform, hosted on a local server, that automates the department's operations: it delivers reports, opens support cases and connects the company's systems.",
      iaEtiqueta: 'AI projects',
    },

    ia: {
      tituloHtml: 'Applied <em>AI</em>',
      sub: 'agents, MCP and automation',
      intro:
        'I build with AI end to end, from agents and MCP servers to chatbots and automations in production. I follow every release and test it on real projects.',
      flujoTitulo: 'How I work with agents',
      flujo: ['Context', 'Plan', 'Implementation', 'Verification', 'Human approval'],
      herramientas: 'AI tools',
    },

    trabajo: {
      tituloHtml: 'The <em>work</em>',
      proyectos: 'projects',
      capturaAlt: 'Screenshot of ',
      github: 'View on GitHub',
    },

    equipo: {
      tituloHtml: 'The <em>team</em> and <em>credits</em>',
      sub: 'stack and education',
      stack: 'Stack',
      agentes: 'agents',
      eventosWindows: 'Windows events',
      formacion: 'Education',
      etiquetas: {
        lenguajes: 'Languages',
        backend: 'Backend',
        frontend: 'Frontend',
        ia: 'AI',
        automatizacion: 'Automation',
        bases: 'Databases',
        datosMl: 'Data and ML',
        cloud: 'Cloud',
        versiones: 'Versioning',
      },
      grado: 'Systems Engineering',
      presente: 'Since 2022',
      enCurso: 'In progress',
    },

    conoceme: {
      tituloHtml: '<em>About me</em>',
      sub: '20 favourite pieces',
      nota: 'The pieces that shaped my taste. Hover over a strip to open it.',
      notaTactil: 'The pieces that shaped my taste. Swipe to see all 20.',
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
      nota: 'The email opens a form to write to me from here.',
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
        fromName: "Kevin Herazo's portfolio",
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
