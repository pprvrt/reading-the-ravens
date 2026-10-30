// Assembles the page from src/ into docs/index.html, a standalone HTML document.
// docs/ is the folder GitHub Pages serves (Settings → Pages → Deploy from a branch → main, /docs).
// No dependencies: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');

// Script order matters: engine → scenes → plates → init (init calls boot() and uses everything above).
const JS_ORDER = ['engine', 'scenes', 'plates', 'init'];

const head = read('src/head.html');
const body = read('src/body.html');
const js = JS_ORDER.map((n) => read(`src/js/${n}.js`)).join('');

const html =
  '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  head + '\n</head>\n<body>\n' + body +
  '\n<script>\n' + js + '\n</script>\n</body>\n</html>\n';

mkdirSync(new URL('docs/', root), { recursive: true });
writeFileSync(new URL('docs/index.html', root), html);
console.log(`docs/index.html  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
