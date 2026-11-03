import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf, Verwandt, HauptLink } from '../components/Seite';

// Seite für unbekannte Adressen: noindex, damit Google sie nicht als Kopie der Startseite wertet
const ZIELE = [
  { name: 'Website erstellen lassen', pfad: '/website-erstellen-lassen' },
  { name: 'SEO für KMU', pfad: '/seo-fuer-kmu' },
  { name: 'Website für Handwerker', pfad: '/fuer-handwerker' },
  { name: 'Website für Garagen', pfad: '/fuer-garagen' },
  { name: 'Automatisierung für KMU', pfad: '/automatisierung-fuer-kmu' },
  { name: 'Ratgeber', pfad: '/ratgeber' },
];

const NichtGefunden = () => (
  <Seite>
    <Helmet>
      <title>Seite nicht gefunden | MAPSOL</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <SeitenKopf
      rubrik="Fehler 404"
      titel="Diese Seite gibt es"
      akzent="nicht (mehr)."
      text="Vielleicht hat sich die Adresse geändert. Hier geht es weiter:"
      links={<HauptLink to="/">Zur Startseite</HauptLink>}
    />
    <section className="m-sek m-sek-fl">
      <div className="m-wrap">
        <Verwandt titel="Beliebte Seiten" eintraege={ZIELE} />
      </div>
    </section>
  </Seite>
);

export default NichtGefunden;
