/*
  Genera las variantes WebP de las caratulas de "Conoceme".

  Los originales de public/assets/{movies,books,videogames,music} son la fuente y no se
  modifican. Las variantes van a public/assets/caratulas/<carpeta>/<nombre>-<ancho>.webp y son
  las que sirve Persiana.astro (srcset). Al anadir o cambiar una caratula, volver a ejecutar:

    node scripts/optimizar-caratulas.mjs

  Herramienta puntual: sharp llega con Astro y no se ejecuta en el despliegue; las variantes
  se versionan como cualquier otro estatico.
*/
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const CARPETAS = ['movies', 'books', 'videogames', 'music'];
const ANCHOS = [480, 900];

let pesoOriginal = 0;
const pesoVariantes = Object.fromEntries(ANCHOS.map((ancho) => [ancho, 0]));

for (const carpeta of CARPETAS) {
  const destino = join(ASSETS, 'caratulas', carpeta);
  await mkdir(destino, { recursive: true });
  for (const archivo of await readdir(join(ASSETS, carpeta))) {
    if (!/\.(jpe?g|png|webp)$/i.test(archivo)) continue;
    const origen = join(ASSETS, carpeta, archivo);
    pesoOriginal += (await stat(origen)).size;
    for (const ancho of ANCHOS) {
      const salida = join(destino, `${parse(archivo).name}-${ancho}.webp`);
      const info = await sharp(origen)
        .resize({ width: ancho, withoutEnlargement: true })
        .webp({ quality: 74, effort: 6 })
        .toFile(salida);
      pesoVariantes[ancho] += info.size;
    }
  }
}

const enKb = (bytes) => `${Math.round(bytes / 1024)} KB`;
console.log(`originales: ${enKb(pesoOriginal)}`);
for (const ancho of ANCHOS) console.log(`variantes ${ancho}: ${enKb(pesoVariantes[ancho])}`);
