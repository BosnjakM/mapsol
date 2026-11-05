import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, SeitenKopf, Abschnitt, Karten, Zahlen, Laufbahn, Schluss, HauptLink } from '../components/Seite';
import { FOTO } from '../components/premium';

const LAKI = 'https://www.laki-development.ch/?utm_source=mapsol&utm_medium=referral&utm_campaign=partner';
const LINKEDIN = 'https://www.linkedin.com/in/mark-antonio-bosnjak/';

// Angaben wie auf LinkedIn (Stand Nov. 2026)
const ZAHLEN = [
  ['6 Jahre', 'in der Informatik, seit der Lehre 2020'],
  ['4 Jahre', 'Informatik-Lehre bei Netcetera'],
  ['seit 2022', 'jeden Tag mit KI am Arbeiten'],
  ['4', 'Zertifikate, von Scrum bis KI'],
];

const UNTERSCHIED = [
  { label: 'Ausbildung', titel: 'Gelernter Informatiker', text: 'Vier Jahre Lehre als Applikationsentwickler EFZ bei Netcetera in Zürich, mit Berufsschule an der BBW Winterthur.' },
  { label: 'Studium', titel: 'Informatik HF', text: 'Seit Oktober 2025 studiere ich an der ABB Technikerschule zum dipl. Informatiker HF. Was ich dort lerne, kommt direkt in Ihre Projekte.' },
  { label: 'Praxis', titel: 'Software für KMU gebaut', text: 'Als Softwareentwickler habe ich Webapplikationen, Datenbanken und Schnittstellen für Kundenprojekte entwickelt. Genau das braucht eine Automatisierung, die hält.' },
  { label: 'KI', titel: 'Seit 2022 im Alltag', text: 'Ich arbeite seit 2022 jeden Tag mit KI. Ich weiss, wo sie viel Zeit spart, und wo ein Mensch das Resultat prüfen muss.' },
];

const LAUFBAHN = [
  { zeit: '2020 – 2024', titel: 'Lehre Applikationsentwickler EFZ', ort: 'Netcetera, Zürich · Berufsschule BBW Winterthur', text: 'Vier Jahre Softwareentwicklung im Team, von der Anforderung bis zur fertigen Anwendung.' },
  { zeit: 'seit 2022', titel: 'KI im Arbeitsalltag', text: 'Seitdem gehört KI fest zu meiner Arbeit: beim Programmieren, beim Schreiben und beim Automatisieren von Abläufen.' },
  { zeit: '2024', titel: 'Gründung von MAPSOL', ort: 'Freelancer Software Developer', text: 'Websites, Webapplikationen und KI-gestützte Abläufe, zuerst neben der Anstellung.' },
  { zeit: '2025 – 2026', titel: 'Softwareentwickler', ort: 'KMU Informatik Support, Zug', text: 'Webapplikationen, Datenbanken und Schnittstellen für kundenspezifische Projekte.' },
  { zeit: 'seit 2025', titel: 'Studium dipl. Informatiker HF', ort: 'ABB Technikerschule', text: 'Abschluss voraussichtlich 2028.' },
  { zeit: '2026', titel: 'Selbständig mit MAPSOL', text: 'KI-Automatisierung und Websites für KMU in der Deutschschweiz.' },
];

const ZERTIFIKATE = [
  { label: 'Anthropic · 2026', titel: 'AI Fluency: Framework & Foundations', text: 'Wirksamer, sicherer und verantwortungsvoller Umgang mit KI im Arbeitsalltag.' },
  { label: 'Scrum Alliance · 2024', titel: 'Scrum Master Certified (SMC)', text: 'Projekte in kurzen Schritten mit regelmässigem Feedback umsetzen. Gültig bis 2027.' },
  { label: 'mITSM · 2024', titel: 'ITIL® Foundation', text: 'Zuverlässiger Betrieb und Support von IT-Diensten nach bewährtem Standard. Gültig bis 2027.' },
  { label: 'SAP · 2026', titel: 'Basic ABAP Programming', text: 'Grundlagen der Programmierung im SAP-Umfeld, das viele grössere Firmen nutzen.' },
];

const GRUNDSAETZE = [
  { titel: 'Persönlich und direkt', text: 'Eine Ansprechperson von der ersten Idee bis nach dem Start. Kein Weiterreichen, keine Hotline.' },
  { titel: 'Verständlich statt Fachchinesisch', text: 'Ich erkläre, was die Technik tut. Sie sollen verstehen, womit Ihr Team arbeitet und wofür Sie bezahlen.' },
  { titel: 'Klein anfangen', text: 'Zuerst ein Entwurf oder ein einzelner Ablauf an Ihren echten Daten. Ausgebaut wird, wenn es sich lohnt.' },
];

// Für Google und KI-Suchen: wer hinter MAPSOL steht und welche Abschlüsse er hat
const nachweis = (name, kategorie, aussteller) => ({
  '@type': 'EducationalOccupationalCredential',
  name,
  credentialCategory: kategorie,
  recognizedBy: { '@type': 'Organization', name: aussteller },
});
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.mapsol.ch/ueber-uns#person',
  name: 'Mark-Antonio Bosnjak',
  jobTitle: 'Gründer von MAPSOL',
  url: 'https://www.mapsol.ch/ueber-uns',
  image: 'https://www.mapsol.ch/images/foto.jpg',
  worksFor: { '@type': 'Organization', name: 'MAPSOL', url: 'https://www.mapsol.ch' },
  alumniOf: [{ '@type': 'EducationalOrganization', name: 'BBW Berufsschule Winterthur' }],
  knowsAbout: ['Webentwicklung', 'Applikationsentwicklung', 'KI-Automatisierung', 'Suchmaschinenoptimierung', 'Schnittstellen'],
  hasCredential: [
    nachweis('Applikationsentwickler EFZ', 'Eidgenössisches Fähigkeitszeugnis', 'BBW Berufsschule Winterthur'),
    nachweis('AI Fluency: Framework & Foundations', 'Zertifikat', 'Anthropic'),
    nachweis('Scrum Master Certified (SMC)', 'Zertifikat', 'Scrum Alliance'),
    nachweis('ITIL Foundation', 'Zertifikat', 'mITSM GmbH'),
    nachweis('Basic ABAP Programming', 'Zertifikat', 'SAP'),
  ],
  sameAs: [LINKEDIN, 'https://github.com/BosnjakM'],
};

const UeberUns = () => (
  <Seite>
    <Helmet>
      <title>Über uns | MAPSOL</title>
      <meta name="description" content="Mark-Antonio Bosnjak, Gründer von MAPSOL: Applikationsentwickler EFZ, Studium Informatik HF, seit 2022 mit KI. KI-Automatisierung und Websites für KMU aus dem Kanton Zürich." />
      <link rel="canonical" href="https://www.mapsol.ch/ueber-uns" />
      <script type="application/ld+json">{JSON.stringify(PERSON)}</script>
    </Helmet>

    <SeitenKopf
      rubrik="Über uns"
      titel="Ich bin"
      akzent={<span className="m-nowrap">Mark-Antonio.</span>}
      text="Gelernter Applikationsentwickler, Informatik-Student und seit 2022 jeden Tag mit KI am Arbeiten. Ich baue Websites und KI-Automatisierungen für KMU, mit echtem Informatik-Handwerk statt Schlagworten."
      punkte={['Applikationsentwickler EFZ', 'Studium Informatik HF', 'KI seit 2022', 'Neftenbach ZH']}
      links={<HauptLink />}
      neben={(
        <div className="m-portrait">
          <img src={FOTO} alt="Mark-Antonio Bosnjak, Gründer von MAPSOL" width="640" height="800" />
        </div>
      )}
    />

    <Zahlen eintraege={ZAHLEN} />

    <Abschnitt
      nr="01"
      label="Was mich unterscheidet"
      titel="Über KI reden viele."
      akzent="Ich habe Informatik gelernt."
      text="Hinter jeder Automatisierung steckt Software. Damit sie zuverlässig läuft, braucht es mehr als ein paar Klicks in einem KI-Tool: saubere Schnittstellen, Datenschutz und jemanden, der versteht, was im Hintergrund passiert."
      getoent
    >
      <Karten eintraege={UNTERSCHIED} spalten={4} />
    </Abschnitt>

    <Abschnitt nr="02" label="Laufbahn" titel="Mein Weg" akzent="bis hierhin.">
      <Laufbahn eintraege={LAUFBAHN} />
    </Abschnitt>

    <div className="m-bildband">
      <div className="m-wrap">
        <div className="m-pitch">
          <div className="m-pitch-text">
            <span className="m-label">Pitch 2026</span>
            <p className="m-pitch-titel">
              <span className="m-pitch-marke"><img src="/mapsol-logo-icon.svg" alt="" width="34" height="34" />MAPSOL</span>
              <span className="m-pitch-x" aria-hidden="true">×</span><span className="m-nur-sr"> und </span>
              <span className="m-pitch-marke"><img src="/images/team/laki-logo.svg" alt="" width="34" height="34" />Laki Development</span>
            </p>
            <p>Zwei Firmen, ein gemeinsamer Auftritt.</p>
          </div>
          <div className="m-pitch-bilder">
            <figure>
              <img src="/images/team/pitch-mark-1200.jpg" srcSet="/images/team/pitch-mark-600.jpg 600w, /images/team/pitch-mark-1200.jpg 1200w" sizes="(max-width: 900px) 100vw, 480px"
                alt="Mark-Antonio Bosnjak präsentiert vor der Folie «Weniger KI-Gerede. Mehr Informatik.»" width="1200" height="900" loading="lazy" decoding="async" />
              <figcaption>Mark-Antonio Bosnjak · MAPSOL</figcaption>
            </figure>
            <figure>
              <img src="/images/team/pitch-lazar-1200.jpg" srcSet="/images/team/pitch-lazar-600.jpg 600w, /images/team/pitch-lazar-1200.jpg 1200w" sizes="(max-width: 900px) 100vw, 480px"
                alt="Lazar Petrovic präsentiert eine Folie von Laki Development zu Google Ads" width="1200" height="900" loading="lazy" decoding="async" />
              <figcaption>Lazar Petrovic · Laki Development</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <Abschnitt nr="03" label="Zertifikate" titel="Geprüft," akzent="nicht nur behauptet." text="Die Nachweise finden Sie auf meinem LinkedIn-Profil." getoent>
      <Karten eintraege={ZERTIFIKATE} spalten={2} />
      <div className="m-mehr">
        <a className="m-tlink" href={LINKEDIN} target="_blank" rel="noopener noreferrer">Nachweise auf LinkedIn <span className="m-pfeil" aria-hidden="true">↗</span></a>
      </div>
    </Abschnitt>

    <Abschnitt nr="04" label="So arbeite ich" titel="Drei Dinge," akzent="auf die Sie zählen können.">
      <Karten eintraege={GRUNDSAETZE} />
    </Abschnitt>

    <Abschnitt nr="05" label="Partner" titel="Zwei Firmen." akzent="Ein Team." getoent>
      <div className="m-duo">
        <div className="m-duo-text m-fliess">
          <p className="m-gross">MAPSOL und Laki Development sind Partnerfirmen aus dem Kanton Zürich. Wir arbeiten gemeinsam an Projekten, prüfen die Arbeit des anderen und vertreten uns bei Ferien oder Engpässen.</p>
          <p>Hinter Laki Development aus Winterthur steht Lazar Petrovic, Informatiker und Software Engineer. Gemeinsam setzen wir auch grössere Projekte um, zum Beispiel wenn eine Website mit <a className="m-tlink" href="https://www.laki-development.ch/google-ads-agentur?utm_source=mapsol&utm_medium=referral&utm_campaign=partner" target="_blank" rel="noopener noreferrer">Google-Werbung</a> oder einem <a className="m-tlink" href="https://www.laki-development.ch/buchungssystem?utm_source=mapsol&utm_medium=referral&utm_campaign=partner" target="_blank" rel="noopener noreferrer">Buchungssystem</a> kombiniert wird.</p>
          <p>Für Sie bleibt es einfach: eine Ansprechperson, ein Angebot.</p>
        </div>
        <div className="m-duo-karten">
          <article className="m-person">
            <img
              src="/images/team/mark-praesentation-800.jpg"
              srcSet="/images/team/mark-praesentation-480.jpg 480w, /images/team/mark-praesentation-800.jpg 800w, /images/team/mark-praesentation-960.jpg 960w"
              sizes="(max-width: 760px) 100vw, 400px"
              alt="Mark-Antonio Bosnjak erklärt mit Mikrofon eine Folie zur automatischen Belegerfassung"
              width="1080" height="1350" loading="lazy" decoding="async"
            />
            <div className="m-person-text">
              <span className="m-label">MAPSOL</span>
              <h3>Mark-Antonio Bosnjak</h3>
              <p>KI-Automatisierung &amp; Websites · Neftenbach</p>
              <ul className="m-haken">
                <li>Applikationsentwickler EFZ</li>
                <li>Studium Informatik HF</li>
                <li>Scrum Master · ITIL® · SAP ABAP</li>
              </ul>
              <div className="m-links">
                <a className="m-tlink" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn <span className="m-pfeil" aria-hidden="true">↗</span></a>
                <a className="m-tlink" href="https://github.com/BosnjakM" target="_blank" rel="noopener noreferrer">GitHub <span className="m-pfeil" aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
          <article className="m-person">
            <img
              src="/images/team/lazar-praesentation-800.jpg"
              srcSet="/images/team/lazar-praesentation-480.jpg 480w, /images/team/lazar-praesentation-800.jpg 800w, /images/team/lazar-praesentation-1080.jpg 1080w"
              sizes="(max-width: 760px) 100vw, 400px"
              alt="Lazar Petrovic spricht vor einer projizierten Folie von Laki Development"
              width="1080" height="1350" loading="lazy" decoding="async"
            />
            <div className="m-person-text">
              <span className="m-label">Laki Development</span>
              <h3>Lazar Petrovic</h3>
              <p>Software, Google Ads &amp; Websites · Winterthur</p>
              <ul className="m-haken">
                <li>6 Jahre Software Engineering bei Google Schweiz</li>
                <li><span><a href="https://skillshop.credential.net/8a8b8f3a-697c-49a9-a9d7-2d07f4991046" target="_blank" rel="noopener noreferrer">Google-Ads-zertifiziert</a> · Search 2026</span></li>
                <li><span><a href="https://skillshop.credential.net/8973f96a-5b57-4df3-b920-d2779b7a7541" target="_blank" rel="noopener noreferrer">Google-Analytics-zertifiziert</a> · 2026</span></li>
              </ul>
              <div className="m-links">
                <a className="m-tlink" href={LAKI} target="_blank" rel="noopener noreferrer">laki-development.ch <span className="m-pfeil" aria-hidden="true">↗</span></a>
                <a className="m-tlink" href="https://www.linkedin.com/company/laki-development/" target="_blank" rel="noopener noreferrer">LinkedIn <span className="m-pfeil" aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Abschnitt>

    <Schluss titel="Lust auf ein" akzent="Gespräch?" text="15 Minuten reichen, um zu klären, ob und wie ich Ihnen helfen kann." />
  </Seite>
);

export default UeberUns;
