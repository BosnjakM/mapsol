/*
 * Nach dem Build (und nach prerender-heads.js): rendert jede Seite einmal mit React auf dem Server
 * und schreibt den fertigen Inhalt in <div id="root">. Google sieht damit Text, Überschriften und
 * Links schon im rohen HTML – ohne JavaScript ausführen zu müssen.
 * Im Browser übernimmt danach die normale React-App (src/index.js) wie bisher.
 *
 * Kommt es bei einer Seite zu einem Fehler, bleibt sie einfach wie vorher (leeres root) –
 * der Build bricht deswegen nie ab.
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = process.env.BUILD_PATH ? path.resolve(process.env.BUILD_PATH) : path.join(ROOT, 'build');
const AUSLASSEN = new Set(['static', 'demos', 'images']); // Unterordner hier nicht durchsuchen

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

// --- src/*.js beim require() mit Babel (JSX) übersetzen -------------------------------------
const babel = require('@babel/core');
const altJs = Module._extensions['.js'];
Module._extensions['.js'] = function (mod, filename) {
  if (!filename.startsWith(SRC)) return altJs(mod, filename);
  const { code } = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    babelrc: false,
    configFile: false,
    presets: [
      [require.resolve('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }],
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
  });
  mod._compile(code, filename);
};
// Bilder/CSS, falls je importiert: nur den Pfad zurückgeben
for (const ext of ['.css', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif']) {
  Module._extensions[ext] = (mod, filename) => { mod.exports = '/' + path.basename(filename); };
}

function routenAusBuild() {
  const routen = ['/'];
  (function lauf(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const r = rel + '/' + e.name;
      if (fs.existsSync(path.join(dir, e.name, 'index.html'))) routen.push(r);
      // In /demos liegen die statischen Demo-Websites – nicht anfassen
      if (!(rel === '' && AUSLASSEN.has(e.name))) lauf(path.join(dir, e.name), r);
    }
  })(BUILD, '');
  return routen;
}

function main() {
  let React, renderToString, StaticRouter, App;
  try {
    React = require('react');
    ({ renderToString } = require('react-dom/server'));
    ({ StaticRouter } = require('react-router-dom/server'));
    App = require(path.join(SRC, 'App.js')).default;
  } catch (e) {
    console.warn('prerender-content: übersprungen (App konnte nicht geladen werden):', e.message);
    return;
  }

  let ok = 0;
  for (const route of routenAusBuild()) {
    const datei = path.join(BUILD, route === '/' ? '' : route.slice(1), 'index.html');
    try {
      const html = renderToString(
        React.createElement(App, { Router: StaticRouter, routerProps: { location: route } })
      );
      const seite = fs.readFileSync(datei, 'utf8');
      if (!seite.includes('<div id="root"></div>')) continue;
      fs.writeFileSync(datei, seite.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
      ok++;
    } catch (e) {
      console.warn(`! prerender-content: ${route} übersprungen – ${e.message}`);
    }
  }
  console.log(`prerender-content: ${ok} Seiten mit fertigem Inhalt erzeugt.`);
}

main();
