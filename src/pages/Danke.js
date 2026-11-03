import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf, HauptLink } from '../components/Seite';

const Danke = () => {
  React.useEffect(() => {
    // Kontaktanfrage als Conversion in Google Analytics zählen
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead');
  }, []);

  return (
    <Seite>
      <Helmet>
        <title>Danke | MAPSOL</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SeitenKopf
        rubrik="Nachricht gesendet"
        titel="Vielen"
        akzent="Dank!"
        text="Ihre Anfrage ist bei mir eingegangen. Ich schaue sie mir an und melde mich so schnell wie möglich, in der Regel innerhalb von 24 Stunden."
        links={<HauptLink to="/">Zurück zur Startseite</HauptLink>}
      />
    </Seite>
  );
};

export default Danke;
