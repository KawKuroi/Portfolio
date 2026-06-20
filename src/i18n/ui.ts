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
    contacto: string;
    formulario: string;
    cerrar: string;
  };

  /** Codigo de dos letras del idioma DESTINO que muestra el boton (EN en es, ES en en). */
  langCodigoDestino: string;

  // ── Hint de scroll ──
  hint: { desliza: string; recorrer: string };

  /** Rotulos del riel / data-slate (uno por escena). */
  slates: {
    portada: string;
    trabajo: string;
    equipo: string;
    conoceme: string;
    contacto: string;
  };

  // ── Portada ──
  portada: {
    kick: string;
    rol: string;
    actos: { trabajo: string; equipo: string; conoceme: string };
    retratoAlt: string;
    retratoPlaceholder: string;
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
    repo: string;
    repoFlecha: string;
  };

  // ── El equipo ──
  equipo: {
    tituloHtml: string;
    sub: string;
    stack: string;
    formacion: string;
    etiquetas: {
      lenguajes: string;
      backend: string;
      ia: string;
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
      'Portafolio de Kevin Axel Herazo Rolón — Ingeniería de Sistemas: backend, datos e inteligencia artificial.',
    jobTitle: 'Ingeniero de Sistemas',
    knowsAbout: ['Backend', 'Ingeniería de datos', 'Inteligencia artificial'],
    ogLocale: 'es_ES',
    ogLocaleAlt: 'en_US',

    aria: {
      cambiarTema: 'Cambiar tema',
      cambiarIdioma: 'Switch to English',
      navegacion: 'Navegación del portafolio',
      irA: 'Ir a ',
      filtro: 'Filtrar por categoría',
      contacto: 'Contacto',
      formulario: 'Formulario de contacto',
      cerrar: 'Cerrar',
    },

    langCodigoDestino: 'EN',

    hint: { desliza: 'Desliza o usa', recorrer: 'para recorrer el portafolio' },

    slates: {
      portada: 'Portada',
      trabajo: 'El trabajo',
      equipo: 'El equipo',
      conoceme: 'Conóceme',
      contacto: 'Contacto',
    },

    portada: {
      kick: 'Ingeniería de Sistemas',
      rol: 'Datos · Inteligencia Artificial · Automatizaciones — Bogotá',
      actos: { trabajo: 'El trabajo', equipo: 'El equipo', conoceme: 'Conóceme' },
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'retrato',
    },

    trabajo: {
      tituloHtml: 'El <em>trabajo</em>',
      proyectos: 'proyectos',
      pista: '// clic en una obra para verla en grande',
      capturaAlt: 'Captura de ',
      verEnLinea: 'Ver en línea',
      repo: 'Repo',
      repoFlecha: 'Repo →',
    },

    equipo: {
      tituloHtml: 'El <em>equipo</em> y los <em>créditos</em>',
      sub: 'stack · formación',
      stack: 'Stack',
      formacion: 'Formación',
      etiquetas: {
        lenguajes: 'Lenguajes',
        backend: 'Backend',
        ia: 'IA',
        datosMl: 'Datos / ML',
        cloud: 'Cloud',
        versiones: 'Control de versiones',
      },
      grado: 'Ingeniería de Sistemas',
      presente: '2022 — Actual',
      enCurso: 'En curso',
    },

    conoceme: {
      tituloHtml: '<em>Conóceme</em>',
      sub: '20 piezas · cine · juegos · libros · música',
      todo: 'Todo',
      nota: '// aquí están las piezas que me formaron el gusto —composición, ritmo y color. Pasá el cursor sobre una franja para abrirla.',
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
      'Portfolio of Kevin Axel Herazo Rolón — Systems Engineering: backend, data and artificial intelligence.',
    jobTitle: 'Systems Engineer',
    knowsAbout: ['Backend', 'Data engineering', 'Artificial intelligence'],
    ogLocale: 'en_US',
    ogLocaleAlt: 'es_ES',

    aria: {
      cambiarTema: 'Switch theme',
      cambiarIdioma: 'Cambiar a español',
      navegacion: 'Portfolio navigation',
      irA: 'Go to ',
      filtro: 'Filter by category',
      contacto: 'Contact',
      formulario: 'Contact form',
      cerrar: 'Close',
    },

    langCodigoDestino: 'ES',

    hint: { desliza: 'Swipe or use', recorrer: 'to move through the portfolio' },

    slates: {
      portada: 'Cover',
      trabajo: 'Work',
      equipo: 'Team',
      conoceme: 'About',
      contacto: 'Contact',
    },

    portada: {
      kick: 'Systems Engineering',
      rol: 'Data · AI · Automation — Bogotá',
      actos: { trabajo: 'The work', equipo: 'The team', conoceme: 'About me' },
      retratoAlt: 'Kevin Axel Herazo Rolón',
      retratoPlaceholder: 'portrait',
    },

    trabajo: {
      tituloHtml: 'The <em>work</em>',
      proyectos: 'projects',
      pista: '// click a piece to see it large',
      capturaAlt: 'Screenshot of ',
      verEnLinea: 'View live',
      repo: 'Repo',
      repoFlecha: 'Repo →',
    },

    equipo: {
      tituloHtml: 'The <em>team</em> &amp; <em>credits</em>',
      sub: 'stack · education',
      stack: 'Stack',
      formacion: 'Education',
      etiquetas: {
        lenguajes: 'Languages',
        backend: 'Backend',
        ia: 'AI',
        datosMl: 'Data / ML',
        cloud: 'Cloud',
        versiones: 'Version control',
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
