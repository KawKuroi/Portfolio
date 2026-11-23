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
export default defineConfig({
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
