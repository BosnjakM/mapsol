import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ARTIKEL } from './artikel';
import { Seite, ArtikelKachel, ArtikelKacheln, Schluss } from '../components/Seite';

const KATEGORIEN = ['Alle', ...Array.from(new Set(ARTIKEL.map((a) => a.kategorie)))];
const anzahl = (k) => (k === 'Alle' ? ARTIKEL.length : ARTIKEL.filter((a) => a.kategorie === k).length);

const Ratgeber = () => {
  const [filter, setFilter] = useState('Alle');
  // Der neueste Artikel steht oben gross, darum unten bei «Alle» nicht noch einmal
  const [neuester, ...rest] = ARTIKEL;
  const liste = filter === 'Alle' ? rest : ARTIKEL.filter((a) => a.kategorie === filter);

  return (
    <Seite>
      <Helmet>
        <title>Ratgeber für KMU: Website, Online-Buchung & Automatisierung | MAPSOL</title>
        <meta name="description" content="Praxisnahe Ratgeber für Schweizer KMU: Was eine Website kostet, wie Online-Terminbuchung funktioniert, wie Sie bei Google gefunden werden und was sich automatisieren lässt." />
        <link rel="canonical" href="https://www.mapsol.ch/ratgeber" />
        <meta property="og:title" content="Ratgeber für KMU | MAPSOL" />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
      </Helmet>

      <section className="m-sk m-ratgeber-kopf">
        <div className="m-wrap">
          <span className="m-label m-sk-rubrik">Wissen für KMU</span>
          <div className="m-ratgeber-kopf-in">
            <div>
              <h1 className="m-sk-titel">Ratgeber für <span className="m-verlauf">KMU.</span></h1>
              <p className="m-lead m-sk-lead">Ehrliche Antworten auf die Fragen, die mir Garagen, Coiffeure, Fahrschulen, Restaurants und andere Schweizer KMU am häufigsten stellen: zu Website, Online-Buchung, Google und Automatisierung.</p>
              <ul className="m-punkte">
                <li>{ARTIKEL.length} Artikel</li>
                <li>Kostenlos, ohne Anmeldung</li>
                <li>Geschrieben von einem Informatiker</li>
              </ul>
            </div>
            <div className="m-ratgeber-neu">
              <span className="m-label">Neu im Ratgeber</span>
              <ArtikelKachel a={neuester} gross />
            </div>
          </div>
        </div>
      </section>

      <section className="m-sek m-sek-fl m-ratgeber">
        <div className="m-wrap">
          <div className="m-filter" role="group" aria-label="Nach Kategorie filtern">
            {KATEGORIEN.map((k) => (
              <button type="button" key={k} aria-pressed={filter === k} onClick={() => setFilter(k)}>
                {k} <small>{anzahl(k)}</small>
              </button>
            ))}
          </div>
          <ArtikelKacheln artikel={liste} />
        </div>
      </section>

      <Schluss titel="Lieber direkt fragen" akzent="statt lesen?" text="Im kostenlosen Erstgespräch beantworte ich Ihre Fragen persönlich, in 15 Minuten und unverbindlich." />
    </Seite>
  );
};

export default Ratgeber;
