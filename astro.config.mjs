// @ts-check
import { defineConfig } from 'astro/config';

// Configuracion de Astro. Vite va incluido en Astro (no se anade aparte).
// Salida 100% estatica: sin adaptador ni React. Se despliega en Vercel (Hobby, gratis),
// que autodetecta Astro, ejecuta `astro build` y sirve dist/ desde su CDN global.
export default defineConfig({});
