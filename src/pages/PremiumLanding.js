import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf, Abschnitt, Reihen, Karten, Schritte, Wissen, Preis, Fragen, Verwandt, Schluss, MobilLeiste, HauptLink, TelefonLink, Foto, Qualifikation } from '../components/Seite';
import { FOTO } from '../components/premium';

/*
 * Landingpage-Vorlage (z. B. /seo-fuer-kmu, /fuer-handwerker) im Stil der Startseite:
 * dunkel oder hell nach Schalter, feine Linien, eckig, Verlauf Blau→Orange als Akzent, Textlinks.
 * Inhalte kommen aus src/pages/landing/<name>.json – neue Seite = JSON-Datei + Eintrag in src/pages/landing/index.js.
 * Der <head> wird beim Build zusätzlich vorgerendert (scripts/prerender-heads.js).
 * Alle Texte stehen sofort im HTML (für Google). Bewegung kommt nur aus CSS.
 */

// Rechts im Kopfbereich: echte Person, Preis und direkter Kontakt
const Ansprechpartner = ({ preis, cta }) => (
  <div className="m-preis m-person">
    <div className="m-person-kopf">
      <img src={FOTO} alt="Mark-Antonio Bosnjak, Gründer von MAPSOL" width="64" height="64" />
      <div>
        <b>Mark-Antonio Bosnjak</b>
        <span>Gründer von MAPSOL · Ihr Ansprechpartner</span>
      </div>
    </div>
    <span className="m-label">{preis.label}</span>
    <p className="m-preis-betrag">{preis.betrag}</p>
    <ul className="m-haken">
      {preis.inklusive.slice(0, 3).map((x) => <li key={x}>{x}</li>)}
    </ul>
    <div className="m-person-links">
      <HauptLink gross={false}>{cta}</HauptLink>
      <TelefonLink />
    </div>
  </div>
);

const PremiumLanding = ({ daten: d }) => {
  const url = `https://www.mapsol.ch${d.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: d.seo.titel, description: d.seo.beschreibung, inLanguage: 'de-CH', isPartOf: { '@id': 'https://www.mapsol.ch/#website' } },
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
        // Regionale Seiten nennen ihre Orte, alle anderen gelten für die ganze Schweiz
        areaServed: d.seo.gebiete ? d.seo.gebiete.map((name) => ({ '@type': 'City', name })) : [{ '@type': 'Country', name: 'Switzerland' }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  // Abschnitte fortlaufend nummerieren, auch wenn eine Seite nicht alle hat
  let n = 0;
  const nr = () => String(++n).padStart(2, '0');

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

      <SeitenKopf
        rubrik={d.hero.kicker}
        titel={d.hero.titel.replace(/ –$/, '\u00a0–')}
        akzent={d.hero.akzent}
        text={d.hero.untertitel}
        punkte={d.hero.vorteile}
        links={<><HauptLink>{d.hero.cta}</HauptLink><a className="m-tlink" href="#preis">Preis ansehen</a></>}
        neben={<Ansprechpartner preis={d.preis} cta={d.hero.cta} />}
      />

      {d.laufband && (
        <div className="m-branchen">
          <div className="m-wrap m-branchen-in">
            {d.laufband.titel && <span className="m-label">{d.laufband.titel}</span>}
            <ul>
              {d.laufband.eintraege.map((e) => <li key={e.name}>{e.name}</li>)}
            </ul>
          </div>
        </div>
      )}

      {d.bild && (
        <div className="m-bildband">
          <div className="m-wrap">
            <Foto id={d.bild.id} alt={d.bild.alt} sizes="(max-width: 1312px) 100vw, 1312px" />
          </div>
        </div>
      )}

      <Abschnitt nr={nr()} label={d.probleme.eyebrow || 'Ausgangslage'} titel={d.probleme.titel} text={d.probleme.text} getoent>
        <Reihen eintraege={d.probleme.liste} />
      </Abschnitt>

      {d.statement && (
        <section className="m-sek m-aussage">
          <div className="m-wrap">
            <p className="m-aussage-text">
              {d.statement.vorher} <span className="m-verlauf">{d.statement.akzent}</span>
            </p>
          </div>
        </section>
      )}

      <Abschnitt nr={nr()} label={d.leistungen.eyebrow || 'Leistungen'} titel={d.leistungen.titel} text={d.leistungen.text}>
        <Karten eintraege={d.leistungen.liste} />
      </Abschnitt>

      {d.flow && (
        <Abschnitt nr={nr()} label={d.flow.eyebrow || 'Automatisierung'} titel={d.flow.titel} text={d.flow.text} getoent>
          <Schritte eintraege={d.flow.schritte} />
          {d.flow.link && (
            <div className="m-mehr">
              <HauptLink to={d.flow.link.pfad} gross={false}>{d.flow.link.text}</HauptLink>
            </div>
          )}
        </Abschnitt>
      )}

      {d.ratgeber && (
        <Abschnitt nr={nr()} label="Wissen" titel={d.ratgeber.titel}>
          <div className="m-versetzt"><Wissen abschnitte={d.ratgeber.abschnitte} /></div>
        </Abschnitt>
      )}

      {d.vertrauen && (
        <Abschnitt nr={nr()} label="Wer das für Sie baut" titel={d.vertrauen.titel} akzent={d.vertrauen.akzent}>
          <div className="m-versetzt"><Qualifikation /></div>
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
          <Verwandt eintraege={d.verwandt} />
        </div>
      </Abschnitt>

      <Schluss titel={d.cta.titel} akzent={d.cta.akzent} text={d.cta.text} cta={d.hero.cta} />

      <MobilLeiste cta={d.hero.ctaKurz || d.hero.cta} />
    </Seite>
  );
};

export default PremiumLanding;
