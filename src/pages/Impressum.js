import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf } from '../components/Seite';

const Impressum = () => {
  return (
    <Seite>
      <Helmet>
        <title>Impressum | MAPSOL</title>
        <meta name="description" content="Impressum von MAPSOL - Rechtliche Informationen und Kontaktdaten." />
        <link rel="canonical" href="https://www.mapsol.ch/impressum" />
      </Helmet>

      <SeitenKopf rubrik="Rechtliches" titel="" akzent="Impressum." text="Rechtliche Informationen und Kontaktdaten." />

      <section className="m-sek m-sek-fl">
        <div className="m-wrap">
          <div className="m-versetzt m-fliess m-recht">
            <section>
              <h2>
                Kontaktinformationen
              </h2>
              <p>
                Mark-Antonio Bosnjak
                <br />
                Zürich, Switzerland
              </p>
            </section>

            <section>
              <h2>
                Kontakt
              </h2>
              <p>
                Telefon: +41 76 310 15 12
                <br />
                E-Mail: contact@mapsol.ch
              </p>
            </section>

            <section>
              <h2>
                Haftungsausschluss
              </h2>
              <p>
                Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen.
              </p>
              <p>
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2>
                Copyright
              </h2>
              <p>
                Die Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts
                bedürfen der schriftlichen Zustimmung des Autors bzw. Erstellers.
              </p>
            </section>

            <section>
              <h2>
                Datenschutz
              </h2>
              <p>
                Informationen zum Datenschutz finden Sie in unserer <RouterLink to="/datenschutz">Datenschutzerklärung</RouterLink>.
              </p>
            </section>

            <section>
              <h2>
                Externe Links
              </h2>
              <p>
                Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Seite>
  );
};

export default Impressum;
