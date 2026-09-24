/*
 * Nach dem Build: für jede Seite eine eigene HTML-Datei mit passendem <head> erzeugen
 * (Titel, Beschreibung, canonical, Open Graph). Google & Social-Media sehen so schon im rohen HTML
 * die richtigen Angaben – nicht nur nach dem Ausführen von JavaScript.
 * Die Werte werden direkt aus den <Helmet>-Blöcken der Seiten gelesen (eine Quelle der Wahrheit).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = process.env.BUILD_PATH ? path.resolve(process.env.BUILD_PATH) : path.join(ROOT, 'build');
const ROUTES = {
  '/ueber-uns': 'UeberUns',
  '/services': 'Services',
  '/demos': 'Demos',
  '/fuer-garagen': 'Garagen',
  '/kontakt': 'Kontakt',
  '/impressum': 'Impressum',
  '/agb': 'AGB',
  '/datenschutz': 'Datenschutz',
};
// Neue Branchen-Seiten automatisch mitnehmen (src/pages/branchen/*.json)
const BRANCHEN_DIR = path.join(ROOT, 'src', 'pages', 'branchen');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function helmetTags(src) {
  const start = src.indexOf('<Helmet>');
  const end = src.indexOf('</Helmet>', start);
  if (start < 0 || end < 0) return null;
  const block = src.slice(start, end);
  const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const tags = [];
  const re = /<(meta|link)\b([\s\S]*?)\/>/g;
  let m;
  while ((m = re.exec(block))) {
    const attrs = {};
    const are = /([\w:-]+)="([^"]*)"/g;
    let a;
    while ((a = are.exec(m[2]))) attrs[a[1]] = a[2].replace(/\s+/g, ' ').trim();
    if (Object.keys(attrs).length) tags.push({ tag: m[1], attrs });
  }
  return { title: title && title.replace(/\s+/g, ' ').trim(), tags };
}

function kopf(basis, info) {
  let html = basis;
  if (info.title) html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(info.title)}</title>`);
  const zeilen = [];
  for (const { tag, attrs } of info.tags) {
    if (tag === 'meta' && attrs.name === 'description') {
      html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(attrs.content)}"/>`);
      continue;
    }
    if (tag === 'meta' && attrs.name === 'robots') {
      html = html.replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${esc(attrs.content)}"/>`);
      continue;
    }
    if (tag === 'meta' && attrs.name === 'keywords') continue;
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
    zeilen.push(`<${tag} ${a}${tag === 'meta' ? '/' : ''}>`);
  }
  return html.replace('</head>', zeilen.join('') + '</head>');
}

function main() {
  const basis = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  const routen = { ...ROUTES };
  if (fs.existsSync(BRANCHEN_DIR)) {
    for (const f of fs.readdirSync(BRANCHEN_DIR).filter((x) => x.endsWith('.json'))) {
      const d = JSON.parse(fs.readFileSync(path.join(BRANCHEN_DIR, f), 'utf8'));
      routen[d.pfad] = { json: d };
    }
  }
  let n = 0;
  for (const [route, quelle] of Object.entries(routen)) {
    let info;
    if (typeof quelle === 'string') {
      info = helmetTags(fs.readFileSync(path.join(ROOT, 'src', 'pages', `${quelle}.js`), 'utf8'));
    } else {
      const d = quelle.json;
      const url = `https://www.mapsol.ch${d.pfad}`;
      info = {
        title: d.seo.titel,
        tags: [
          { tag: 'meta', attrs: { name: 'description', content: d.seo.beschreibung } },
          { tag: 'link', attrs: { rel: 'canonical', href: url } },
          { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
          { tag: 'meta', attrs: { property: 'og:url', content: url } },
          { tag: 'meta', attrs: { property: 'og:title', content: d.seo.titel } },
          { tag: 'meta', attrs: { property: 'og:description', content: d.seo.beschreibung } },
          { tag: 'meta', attrs: { property: 'og:image', content: 'https://www.mapsol.ch/og-image.jpg' } },
        ],
      };
    }
    if (!info) { console.warn(`! Kein <Helmet> für ${route}`); continue; }
    const ziel = path.join(BUILD, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(ziel), { recursive: true });
    fs.writeFileSync(ziel, kopf(basis, info));
    n++;
  }
  console.log(`prerender-heads: ${n} Seiten mit eigenem <head> erzeugt.`);
}

main();
