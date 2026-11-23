// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Configuracion de Astro. Vite va incluido en Astro (no se anade aparte).
// Salida 100% estatica: sin adaptador ni React. Se despliega en Vercel (Hobby, gratis),
// que autodetecta Astro, ejecuta `astro build` y sirve dist/ desde su CDN global.
//
// i18n: sitio bilingue. Espanol por defecto en `/` y EN en `/en/`
// (prefixDefaultLocale:false → la raiz no lleva prefijo). Habilita `Astro.currentLocale`
// y los helpers de `astro:i18n` (getRelativeLocaleUrl) para el boton de idioma.
//
// Tipografia: Fonts API nativa de Astro. Descarga las fuentes en build, las sirve desde el
// propio sitio (/_astro/fonts, cache inmutable) y genera respaldos con metricas ajustadas.
//
// compressHTML: Astro 7 cambio el valor por defecto a 'jsx', que elimina el espacio entre
// elementos en linea separados por un salto de linea ("usa↑↓para"). `true` conserva el
// comportamiento de Astro 6: colapsa el espacio en blanco a uno solo sin quitarlo.
//
// cssTarget: Vite 8 minifica el CSS con Lightning CSS y subio el objetivo por defecto a
// Safari 16.4 / Chrome 111. Con ese objetivo reescribe `max-width` a la sintaxis de rango
// (`width<=1024px`, que Safari 16.0-16.3 ignora: el movil veria la maqueta de escritorio) y
// quita el respaldo `100vh` antes de `100dvh`. Se fija el objetivo de Vite 7 para conservar
// el mismo soporte de navegadores que con Astro 6. `ios16` va aparte porque Lightning CSS
// trata iOS como otro navegador: sin el, borra `-webkit-text-size-adjust`.
export default defineConfig({
  compressHTML: true,
  vite: {
    build: {
      cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16', 'ios16'],
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--fuente-titular',
      weights: [400], // estatica: la variable pesa el doble y retrasaba el LCP movil
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--fuente-texto',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
