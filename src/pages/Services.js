import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Seite, SeitenKopf, Abschnitt, Schritte, Fragen, Verwandt, Schluss, HauptLink, TelefonLink, Foto } from '../components/Seite';
import { SCHRITTE } from '../components/StartAbschnitte';

// Die vier Leistungen wie im Liniennetz der Startseite; die ids bleiben, weil andere Seiten darauf verlinken
const LEISTUNGEN = [
  {
    id: 'automation',
    bild: { id: 'photo-1570215171424-f74325192b55', alt: 'Arbeitsplatz mit Laptop, auf dem eine Auswertung läuft' },
    titel: 'KI-Automatisierung &',
    akzent: 'Schnittstellen.',
    text: 'Ich verbinde Bexio, Outlook, Excel oder Ihren Shop, damit Daten nicht mehr von Hand übertragen werden. Wiederkehrende Arbeit läuft im Hintergrund, Ihr Team prüft nur noch, wo es darauf ankommt.',
    liste: ['Programme verbinden, die Sie schon nutzen', 'Belege und Rechnungen von KI auslesen lassen', 'Anfragen automatisch erfassen und weiterleiten', 'Bestätigungen und Erinnerungen per Mail oder SMS', 'Daten zwischen Website, Buchhaltung und CRM abgleichen', 'Passend zu Ihren Abläufen, nicht umgekehrt'],
    links: [
      { text: 'Automatisierung für KMU', pfad: '/automatisierung-fuer-kmu' },
      { text: 'Ratgeber: Bexio automatisieren', pfad: '/ratgeber/bexio-automatisieren' },
    ],
  },
  {
    id: 'web',
    bild: { id: 'photo-1610569171388-dd6e3d27e340', alt: 'Person arbeitet am Laptop an einer Website' },
    titel: 'Websites, die',
    akzent: 'auffallen.',
    text: 'Ich gestalte und baue Ihren Auftritt so, dass er hängen bleibt und aus Besuchern Anfragen werden. Komplette KMU-Websites gibt es ab CHF 999 zum Fixpreis, in der Regel etwa zwei Wochen nach Erhalt Ihrer Inhalte online.',
    liste: ['Individuelles Design, passend zu Ihrem Betrieb', 'Perfekt auf dem Handy und schnell geladen', 'Für Google und KI-Suchen aufgebaut', 'Kontaktformular, Offertanfrage oder Online-Termin', 'Hilfe bei Texten und Bildern', 'Wächst mit, zum Beispiel mit Automatisierung'],
    links: [
      { text: 'Website erstellen lassen', pfad: '/website-erstellen-lassen' },
      { text: 'Kostenloser Website-Check', pfad: '/website-check' },
    ],
  },
  {
    id: 'training',
    bild: { id: 'photo-1517048676732-d65bc937f952', alt: 'Besprechung im Team am Tisch' },
    titel: 'Einführung &',
    akzent: 'Betreuung.',
    text: 'Eine Automatisierung ist erst fertig, wenn Ihr Team damit arbeitet. Ich richte alles ein, zeige, wie der Ablauf funktioniert, und bleibe danach Ihre Ansprechperson.',
    liste: ['Einrichtung und Test mit Ihren echten Daten', 'Einführung fürs Team: wie der Ablauf funktioniert', 'Dokumentation, damit nichts an einer Person hängt', 'Anpassungen, wenn sich bei Ihnen etwas ändert'],
    links: [
      { text: 'Erstgespräch vereinbaren', pfad: '/kontakt' },
      { text: 'KI-Automatisierung in Winterthur & Zürich', pfad: '/ki-automatisierung-winterthur' },
    ],
  },
  {
    id: 'sichtbarkeit',
    bild: { id: 'photo-1548345680-f5475ea5df84', alt: 'Smartphone mit Kartensuche nach einem lokalen Geschäft' },
    titel: 'Sichtbarkeit bei Google',
    akzent: 'und in KI-Suchen.',
    text: 'SEO, Google-Profil und Werbung, damit man Sie findet, auch in KI-Suchen wie ChatGPT. Wer in Ihrer Region nach Ihrer Leistung sucht, soll bei Ihnen landen.',
    liste: ['Lokales SEO für Ihre Region', 'Google-Unternehmensprofil einrichten und pflegen', 'Mehr Google-Bewertungen, ohne zu drängeln', 'Google-Werbung, wenn es sich lohnt'],
    links: [
      { text: 'SEO für KMU', pfad: '/seo-fuer-kmu' },
      { text: 'Google-Profil einrichten lassen', pfad: '/google-unternehmensprofil-einrichten-lassen' },
    ],
  },
];

const FRAGEN = [
  { q: 'Kann ich nur eine Leistung buchen?', a: 'Ja. Viele starten mit einer Website oder mit einem einzelnen Ablauf, der automatisch läuft. Ausbauen können Sie später, wenn es sich lohnt.' },
  { q: 'Was kostet das?', a: 'Das Erstgespräch ist kostenlos. Websites gibt es ab CHF 999 zum Fixpreis. Für Automatisierungen bekommen Sie von mir eine Offerte für den ersten Schritt, bevor etwas gebaut wird.' },
  { q: 'Brauchen wir dafür neue Software?', a: 'Meistens nicht. Ich verbinde die Programme, die Sie schon nutzen, zum Beispiel Bexio, Outlook oder Excel.' },
  { q: 'Arbeiten Sie mit Partnern?', a: 'Für grössere Webprojekte arbeite ich mit Laki Development aus Winterthur zusammen. Ihre Ansprechperson bleibe trotzdem immer ich.' },
];

const BRANCHEN = [
  { name: 'Website für Garagen', pfad: '/fuer-garagen' },
  { name: 'Website für Handwerker', pfad: '/fuer-handwerker' },
  { name: 'Website für Arztpraxen', pfad: '/fuer-arztpraxen' },
  { name: 'Website für Fahrschulen', pfad: '/fuer-fahrschulen' },
  { name: 'Website für Coiffeure', pfad: '/fuer-coiffeure' },
  { name: 'Website für Restaurants', pfad: '/fuer-restaurants' },
];

const Services = () => (
  <Seite>
    <Helmet>
      <title>Leistungen | MAPSOL</title>
      <meta name="description" content="MAPSOL Leistungen: KI-Automatisierung und Schnittstellen, Websites, Einführung und Betreuung sowie Sichtbarkeit bei Google. Für KMU in der Deutschschweiz." />
      <link rel="canonical" href="https://www.mapsol.ch/services" />
    </Helmet>

    <SeitenKopf
      rubrik="Leistungen"
      titel="Alles, was Ihr KMU online"
      akzent="weiterbringt."
      text="Ich verbinde Ihre Programme mit KI, baue Websites, die auffallen, und sorge dafür, dass man Sie findet. Alles aus einer Hand, mit einer Ansprechperson."
      links={<><HauptLink /><TelefonLink /></>}
    />

    <section className="m-sek m-sek-fl m-leistungen">
      <div className="m-wrap">
        {LEISTUNGEN.map((l, i) => (
          <article className="m-leistung" id={l.id} key={l.id}>
            <span className="m-leistung-nr">{String(i + 1).padStart(2, '0')}</span>
            <div className="m-leistung-in">
              <div>
                <h2 className="m-h2 m-leistung-titel">{l.titel} <span className="m-verlauf">{l.akzent}</span></h2>
                <p className="m-gross">{l.text}</p>
                <ul className="m-haken m-haken-2">
                  {l.liste.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <div className="m-links">
                  {l.links.map((k) => (
                    <RouterLink className="m-tlink" to={k.pfad} key={k.pfad}>{k.text} <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
                  ))}
                </div>
              </div>
              <Foto id={l.bild.id} alt={l.bild.alt} className="m-leistung-bild" sizes="(max-width: 1100px) 92vw, 380px" />
            </div>
          </article>
        ))}
      </div>
    </section>

    <Abschnitt nr="05" label="So arbeite ich" titel="Klein anfangen." akzent="Sauber ausbauen.">
      <Schritte eintraege={SCHRITTE.map(([titel, text]) => ({ titel, text }))} />
    </Abschnitt>

    <Abschnitt nr="06" label="Fragen" titel="Gut zu wissen," akzent="bevor wir starten." getoent>
      <Fragen eintraege={FRAGEN} />
      <div className="m-versetzt">
        <Verwandt titel="Lösungen für Ihre Branche" eintraege={BRANCHEN} />
      </div>
    </Abschnitt>

    <Schluss />
  </Seite>
);

export default Services;
