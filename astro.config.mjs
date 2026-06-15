// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Configuracion de Astro. Vite va incluido en Astro (no se anade aparte).
// React solo se usa como island diferido para el panel de Tweaks.
export default defineConfig({
  integrations: [react()],
});
