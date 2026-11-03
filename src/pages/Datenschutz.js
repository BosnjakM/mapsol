import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf } from '../components/Seite';

const Datenschutz = () => {
  const stand = '6. Oktober 2026';

  return (
    <Seite>
      <Helmet>
        <title>Datenschutzerklärung | MAPSOL</title>
        <meta name="description" content="Datenschutzerklärung von MAPSOL - Erfahren Sie, wie wir Ihre persönlichen Daten schützen." />
        <link rel="canonical" href="https://www.mapsol.ch/datenschutz" />
      </Helmet>

      <SeitenKopf rubrik="Rechtliches" titel="" akzent="Datenschutz." text={`Wie ich mit Ihren Daten umgehe. Stand: ${stand}.`} />

      <section className="m-sek m-sek-fl">
        <div className="m-wrap">
          <div className="m-versetzt m-fliess m-recht">
            <section>
              <h2>
                1. Verantwortlicher
              </h2>
              <p>
                Mark-Antonio Bosnjak<br />
                Zürich, Switzerland<br />
                E-Mail: contact@mapsol.ch<br />
                Telefon: +41 76 310 15 12
              </p>
            </section>

            <section>
              <h2>
                2. Allgemeines zur Datenverarbeitung
              </h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten Ihre personenbezogenen Daten nur in Übereinstimmung mit den geltenden Datenschutzgesetzen. In dieser Datenschutzerklärung informieren wir Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
              </p>
              <p>
                Diese Website dient in erster Linie der Bereitstellung von Informationen über unser Unternehmen und unsere Dienstleistungen. Die Erhebung und Verarbeitung personenbezogener Daten beschränkt sich auf das notwendige Minimum.
              </p>
            </section>

            <section>
              <h2>
                3. Kontaktaufnahme
              </h2>
              <p>
                Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren, werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, gegebenenfalls Ihr Name und Ihre Telefonnummer) gespeichert, um Ihre Anfrage zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
              </p>
              <p>
                Nachrichten aus dem Kontaktformular werden über den Dienst EmailJS (emailjs.com) an unser E-Mail-Postfach weitergeleitet. Dabei werden Ihre Angaben im Formular (z.B. Name, E-Mail-Adresse, Telefonnummer und Nachricht) über die Server von EmailJS übermittelt, die sich ausserhalb der Schweiz befinden können, zum Beispiel in den USA. Unser E-Mail-Postfach wird über Microsoft 365 betrieben. Weitere Informationen: <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.emailjs.com/legal/privacy-policy/</a>
              </p>
            </section>

            <section>
              <h2>
                4. Externe Links
              </h2>
              <p>
                Unsere Website enthält Links zu externen Websites, insbesondere zu GitHub-Repositories. Wir haben keinen Einfluss auf den Inhalt und die Datenschutzpraktiken dieser Websites und sind dafür nicht verantwortlich. Wenn Sie auf einen Link zu GitHub oder anderen externen Websites klicken, beachten Sie bitte die jeweiligen Datenschutzerklärungen dieser Anbieter.
              </p>
              <p>
                GitHub (betrieben von Microsoft Corporation) hat seine eigene Datenschutzrichtlinie, die Sie unter <a href="https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement</a> einsehen können.
              </p>
            </section>

            <section>
              <h2>
                5. Hosting und Serverprotokolle
              </h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden die unten genannten Daten deshalb auch auf Servern von Vercel verarbeitet, die sich ausserhalb der Schweiz befinden können, insbesondere in den USA. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a>
              </p>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen in den Serverprotokollen gespeichert. Dies umfasst typischerweise die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite, den Browsertyp und die Browserversion, das Betriebssystem sowie den Referrer (die Webseite, von der aus Sie unsere Website besucht haben). Diese Daten werden ausschliesslich zu Zwecken der Systemsicherheit und zur Optimierung unseres Angebots verarbeitet und nicht mit anderen Datenquellen zusammengeführt.
              </p>
              <p>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage unseres berechtigten Interesses an der Gewährleistung eines stabilen und sicheren Betriebs unserer Website.
              </p>
            </section>

            <section>
              <h2>
                6. Cookies und Tracking
              </h2>
              <p>
                Wir verwenden Google Analytics 4, einen Webanalysedienst der Google LLC bzw. Google Ireland Limited, um zu verstehen, wie Besucherinnen und Besucher unsere Website nutzen (z.B. aufgerufene Seiten, Verweildauer, ungefährer Standort auf Länderebene, Gerätetyp). Dabei werden Cookies gesetzt. IP-Adressen werden von Google Analytics 4 nicht gespeichert. Die Daten können auch auf Servern in den USA verarbeitet werden. Die Auswertung erfolgt zur Verbesserung unseres Angebots (berechtigtes Interesse). Sie können die Erfassung verhindern, indem Sie Cookies in Ihrem Browser blockieren oder das Browser-Add-on von Google installieren: https://tools.google.com/dlpage/gaoptout. Weitere Informationen: https://policies.google.com/privacy. Daneben werden technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind (z.B. für die Sessionverwaltung).
              </p>
            </section>

            <section>
              <h2>
                7. Ihre Rechte
              </h2>
              <p>
                Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten sowie auf Berichtigung oder Löschung oder auf Einschränkung der Verarbeitung, soweit Ihnen dies gesetzlich zusteht. Ausserdem haben Sie das Recht auf Datenübertragbarkeit.
              </p>
              <p>
                Sie haben ausserdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </p>
            </section>

            <section>
              <h2>
                8. Änderungen der Datenschutzerklärung
              </h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Seite>
  );
};

export default Datenschutz;
