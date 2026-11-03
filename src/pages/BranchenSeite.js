import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, Abschnitt, Reihen, Karten, Wissen, Preis, Fragen, Verwandt, Schluss, HauptLink } from '../components/Seite';

/*
 * Vorlage für Branchen-Landingpages (/fuer-fahrschulen, /fuer-coiffeure, …) im Stil der Startseite.
 * Inhalte kommen aus src/pages/branchen/<name>.json – neue Branche = neue JSON-Datei + Route in App.js.
 * Der <head> (Titel, Beschreibung, canonical) wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 * Oben ein echtes Foto der Branche wie das Zürich-Video auf der Startseite, danach hell/dunkel nach Theme.
 */

// «Titel – Zusatz» wird zu Titel plus Zusatz im Verlauf
const teilen = (titel) => {
  const [vorne, ...rest] = titel.split(' – ');
  return { vorne, hinten: rest.join(' – ') };
};

// Letztes Wort einer Frage im Verlauf, z. B. «… von selbst füllt?»
const schlussTeilen = (satz) => {
  const i = satz.lastIndexOf(' ');
  return i < 0 ? { titel: '', akzent: satz } : { titel: satz.slice(0, i), akzent: satz.slice(i + 1) };
};

const BranchenSeite = ({ daten: d }) => {
  const url = `https://www.mapsol.ch${d.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: d.seo.titel,
        description: d.seo.beschreibung,
        inLanguage: 'de-CH',
        isPartOf: { '@id': 'https://www.mapsol.ch/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mapsol.ch/' },
          { '@type': 'ListItem', position: 2, name: d.seo.breadcrumb, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: d.seo.breadcrumb,
        serviceType: d.seo.serviceType,
        provider: {
          '@type': 'LocalBusiness',
          name: 'MAPSOL',
          url: 'https://www.mapsol.ch',
          telephone: '+41-76-310-15-12',
          email: 'contact@mapsol.ch',
          address: { '@type': 'PostalAddress', addressLocality: 'Zürich', addressCountry: 'CH' },
        },
        areaServed: [
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'AdministrativeArea', name: 'Zürich' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  // Abschnitte fortlaufend nummerieren, auch wenn eine Branche nicht alle hat
  let n = 0;
  const nr = () => String(++n).padStart(2, '0');
  const titel = teilen(d.hero.titel);
  const schluss = schlussTeilen(d.cta);
  const hatDemos = d.demos && d.demos.length > 0;

  return (
    <Seite>
      <Helmet>
        <title>{d.seo.titel}</title>
        <meta name="description" content={d.seo.beschreibung} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="MAPSOL" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={d.seo.titel} />
        <meta property="og:description" content={d.seo.beschreibung} />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Kopfbereich: echtes Foto der Branche */}
      <section className="m-bildkopf">
        <img className="m-bg" src={d.hero.bild} alt="" aria-hidden="true" fetchpriority="high" />
        <div className="m-schatten" aria-hidden="true" />
        <div className="m-wrap m-bildkopf-in">
          <span className="m-label m-sk-rubrik">{d.hero.kicker}</span>
          <h1 className="m-sk-titel">
            {titel.vorne}
            {titel.hinten && <>{'\u00a0– '}<span className="m-verlauf">{titel.hinten}</span></>}
          </h1>
          <p className="m-lead m-sk-lead">{d.hero.untertitel}</p>
          <div className="m-sk-links">
            <HauptLink>Kostenloses Erstgespräch</HauptLink>
            {hatDemos && <a className="m-tlink" href="#demos">Beispiel ansehen</a>}
          </div>
          {d.hero.fusszeile && <p className="m-bildkopf-fuss">{d.hero.fusszeile}</p>}
        </div>
      </section>

      <Abschnitt nr={nr()} label="Ausgangslage" titel={d.probleme.titel} text={d.probleme.text}>
        <Reihen eintraege={d.probleme.liste.map((p) => (typeof p === 'string' ? { titel: p } : p))} />
      </Abschnitt>

      <Abschnitt nr={nr()} label="Leistungen" titel={d.leistungen.titel} text={d.leistungen.text} getoent>
        <Karten eintraege={d.leistungen.liste} />
      </Abschnitt>

      {d.ratgeber && (
        <Abschnitt nr={nr()} label="Wissen" titel={d.ratgeber.titel}>
          <div className="m-versetzt"><Wissen abschnitte={d.ratgeber.abschnitte} /></div>
        </Abschnitt>
      )}

      {hatDemos && (
        <Abschnitt id="demos" nr={nr()} label="Beispiele" titel={d.demosTitel || 'Beispiel-Websites'} text="Fiktive Beispiel-Designs, keine Kundenreferenzen. Antippen zum Öffnen." getoent>
          <ul className="m-demos">
            {d.demos.map((demo) => (
              <li className="m-demo" key={demo.url}>
                <span className="m-demo-bild" aria-hidden="true">
                  <iframe src={demo.url} title={demo.titel} loading="lazy" tabIndex={-1} />
                </span>
                <div className="m-demo-text">
                  <h3>{demo.titel}</h3>
                  <p>{demo.text}</p>
                  <a className="m-tlink m-demo-link" href={demo.url} target="_blank" rel="noopener noreferrer">Beispiel öffnen <span className="m-pfeil" aria-hidden="true">↗</span></a>
                </div>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {d.automatisierung && (
        <Abschnitt nr={nr()} label="Automatisierung" titel={d.automatisierung.titel} text={d.automatisierung.text}>
          <Reihen eintraege={d.automatisierung.beispiele} />
        </Abschnitt>
      )}

      <Abschnitt id="preis" nr={nr()} label="Preis und Ablauf" titel="So einfach" akzent="geht's." getoent>
        <div className="m-preis-block">
          <Preis preis={d.preis} />
          <Reihen eintraege={d.ablauf} versetzt={false} />
        </div>
      </Abschnitt>

      <Abschnitt nr={nr()} label="Fragen" titel={d.faqTitel || 'Häufige Fragen'}>
        <Fragen eintraege={d.faqs} />
        <div className="m-versetzt">
          <Verwandt titel="Weitere Branchen" eintraege={d.verwandt} />
        </div>
      </Abschnitt>

      <Schluss
        titel={schluss.titel}
        akzent={schluss.akzent}
        text="Kostenloses Erstgespräch, 15 Minuten, unverbindlich. Danach wissen Sie genau, was möglich ist und was es kostet."
      />
    </Seite>
  );
};

export default BranchenSeite;
