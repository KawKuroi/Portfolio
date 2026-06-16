/*
  Generador de assets de SEO/marca a partir de public/favicon.svg (marca "K").
  Produce, en public/: favicon.ico (16/32/48 con PNG embebido), favicon-16x16.png,
  favicon-32x32.png, apple-touch-icon.png (180), icon-192.png, icon-512.png (manifest)
  y og-image.png (1200x630, tarjeta social de respaldo, autocontenida).

  Herramienta puntual: `sharp` NO está en package.json (deps mínimas). Para regenerar:
  `npm i sharp --no-save && node scripts/gen-seo-assets.mjs`.
  Los binarios resultantes se commitean en public/ y Vercel los sirve como estáticos;
  no se ejecuta sharp en el despliegue.
*/
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const markSvg = readFileSync(join(pub, 'favicon.svg'));

// Rasteriza la marca a un PNG cuadrado. `flatten` rellena el fondo (sin transparencia)
// para apple-touch / iconos maskable; el favicon mantiene esquinas transparentes.
async function renderMark(size, { flatten = false } = {}) {
  let img = sharp(markSvg, { density: 1200 }).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (flatten) img = img.flatten({ background: '#16130e' });
  return img.png().toBuffer();
}

// Empaqueta varios PNG en un único .ico (formato ICO con datos PNG embebidos, soportado
// por navegadores y Windows desde Vista).
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icono
  header.writeUInt16LE(images.length, 4); // nº de imágenes
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach((im, i) => {
    const e = i * 16;
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, e + 0); // ancho (0 = 256)
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, e + 1); // alto
    dir.writeUInt8(0, e + 2); // colores en paleta
    dir.writeUInt8(0, e + 3); // reservado
    dir.writeUInt16LE(1, e + 4); // planos
    dir.writeUInt16LE(32, e + 6); // bits por píxel
    dir.writeUInt32LE(im.buf.length, e + 8); // tamaño de los datos
    dir.writeUInt32LE(offset, e + 12); // offset a los datos
    offset += im.buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((im) => im.buf)]);
}

// Tarjeta social 1200x630 (proporción 1.91:1). Estética del portafolio: fondo oscuro,
// acento aguamarino, tipografía serif. Texto convertido por librsvg con fuentes del sistema.
function ogSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#16130e"/>
  <rect x="44" y="44" width="1112" height="542" fill="none" stroke="#ece4d4" stroke-opacity="0.16" stroke-width="1.5"/>
  <text x="1118" y="538" font-family="Georgia, 'Times New Roman', serif" font-size="520" font-style="italic" fill="#2aa198" fill-opacity="0.10" text-anchor="end">K</text>
  <text x="96" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="26" letter-spacing="6" fill="#a89c87">PORTAFOLIO</text>
  <text x="92" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#ece4d4">Kevin Axel</text>
  <text x="92" y="392" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#ece4d4">Herazo Rol&#243;n</text>
  <rect x="96" y="428" width="120" height="5" fill="#2aa198"/>
  <text x="96" y="492" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-style="italic" fill="#a89c87">Ingenier&#237;a de Sistemas &#8212; Backend &#183; Datos &#183; IA</text>
  <text x="96" y="556" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="2" fill="#6b6457">portfolio-topaz-nu-46.vercel.app</text>
</svg>`;
}

const out = (name) => join(pub, name);

const tasks = [
  ['favicon-16x16.png', () => renderMark(16)],
  ['favicon-32x32.png', () => renderMark(32)],
  ['apple-touch-icon.png', () => renderMark(180, { flatten: true })],
  ['icon-192.png', () => renderMark(192, { flatten: true })],
  ['icon-512.png', () => renderMark(512, { flatten: true })],
  ['og-image.png', () => sharp(Buffer.from(ogSvg())).png().toBuffer()],
];

for (const [name, fn] of tasks) {
  writeFileSync(out(name), await fn());
  console.log('escrito', name);
}

const ico = buildIco([
  { size: 16, buf: await renderMark(16) },
  { size: 32, buf: await renderMark(32) },
  { size: 48, buf: await renderMark(48) },
]);
writeFileSync(out('favicon.ico'), ico);
console.log('escrito favicon.ico');
