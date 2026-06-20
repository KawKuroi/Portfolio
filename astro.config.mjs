// @ts-check
import { defineConfig } from 'astro/config';

// Configuracion de Astro. Vite va incluido en Astro (no se anade aparte).
// Salida 100% estatica: sin adaptador ni React. Se despliega en Vercel (Hobby, gratis),
// que autodetecta Astro, ejecuta `astro build` y sirve dist/ desde su CDN global.
//
// i18n: sitio bilingue. Espanol por defecto en `/` y EN en `/en/`
// (prefixDefaultLocale:false → la raiz no lleva prefijo). Habilita `Astro.currentLocale`
// y los helpers de `astro:i18n` (getRelativeLocaleUrl) para el boton de idioma.
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
