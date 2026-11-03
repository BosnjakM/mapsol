import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Seite, Abschnitt, Reihen, Karten, Preis, Fragen, Verwandt, Schluss, HauptLink } from '../components/Seite';

// Seite für Garagen und Autohändler im Stil der Startseite: echtes Werkstatt-Foto oben, danach hell/dunkel nach Theme.
// Beispiel-Demos (Fantasienamen) auf demo.mapsol.ch
const demos = [
  {
    title: 'Alpenwerk Garage',
    description: 'Eleganter Auftritt mit starker Hero-Inszenierung und Occasionen-Galerie.',
    url: 'https://demo.mapsol.ch/alpenwerk-garage',
  },
  {
    title: 'Garage Nordstern',
    description: 'Klassische Garage: Services, Team und Kontakt klar auf einen Blick.',
    url: 'https://demo.mapsol.ch/garage-nordstern',
  },
  {
    title: 'Garage Seeblick',
    description: 'Moderner Betrieb-Look mit Fokus auf Vertrauen und Service.',
    url: 'https://demo.mapsol.ch/garage-seeblick',
  },
  {
    title: 'BoxDrive Werkstatt',
    description: 'Do-it-yourself-Garage mit Online-Boxenbuchung und frischem Design.',
    url: 'https://demo.mapsol.ch/boxdrive-werkstatt',
  },
];

const painPoints = [
  'Die Website ist veraltet oder es gibt gar keine',
  'Kunden finden Öffnungszeiten und Services nicht',
  'Keine Online-Terminbuchung für Service & Reifenwechsel',
  'Occasionen werden schlecht oder gar nicht präsentiert',
  'Auf dem Handy sieht die Seite kaputt aus',
  'Bei Google taucht die Garage kaum auf',
];

const features = [
  {
    title: 'Modern & mobil',
    text: 'Ein Auftritt, der auf Handy, Tablet und Desktop perfekt aussieht und Vertrauen schafft.',
  },
  {
    title: 'Occasionen-Galerie',
    text: 'Ihre Fahrzeuge werden ansprechend präsentiert – mit Bildern, Details und Anfrage-Button.',
  },
  {
    title: 'Online-Terminbuchung',
    text: 'Kunden buchen Service, Reifenwechsel oder Probefahrt direkt online – rund um die Uhr.',
  },
  {
    title: 'Bei Google gefunden',
    text: 'Lokal optimiert, damit Kunden aus Ihrer Region Sie finden – nicht die Konkurrenz.',
  },
  {
    title: 'Services klar dargestellt',
    text: 'Reparatur, Service, MFK, Reifen – alles verständlich, damit Kunden sofort wissen, was Sie bieten.',
  },
  {
    title: 'Anfragen aufs Handy',
    text: 'Kontaktanfragen landen direkt bei Ihnen – kein verpasster Kunde mehr.',
  },
];

const automationExamples = [
  {
    title: 'Termin-Anfrage automatisch',
    text: 'Kunde bucht online → Termin landet automatisch in Ihrem Kalender, Kunde bekommt eine Bestätigung per E-Mail/SMS.',
  },
  {
    title: 'Occasion synchronisieren',
    text: 'Neues Fahrzeug einmal erfassen → erscheint automatisch auf Website. Verkauft → automatisch entfernt.',
  },
  {
    title: 'Service-Erinnerungen',
    text: 'Kunden werden automatisch an den nächsten Service oder Reifenwechsel erinnert – bringt Wiederkehrer.',
  },
];

const steps = [
  { n: '01', title: 'Kostenloses Erstgespräch', text: '15 Minuten. Wir schauen an, was Ihre Garage braucht – unverbindlich.' },
  { n: '02', title: 'Vorschau in wenigen Tagen', text: 'Sie erhalten eine private Demo Ihrer neuen Website, bevor Sie sich entscheiden.' },
  { n: '03', title: 'Feinschliff & Inhalte', text: 'Wir passen Texte, Bilder und Farben an Ihre Garage an.' },
  { n: '04', title: 'Live in ca. 2 Wochen', text: 'Ihre Website geht online – inkl. Einweisung. Auf Wunsch mit Wartung.' },
];

const faqs = [
  {
    q: 'Was kostet eine Website für meine Garage?',
    a: 'Eine komplette Garage-Website gibt es zum Fixpreis ab CHF 999 – ohne versteckte Kosten. Den genauen Preis besprechen wir im kostenlosen Erstgespräch, abhängig vom Umfang (z. B. Occasionen-Galerie, Terminbuchung).',
  },
  {
    q: 'Wie lange dauert es, bis die Website online ist?',
    a: 'In der Regel ist Ihre Website in rund 2 Wochen live. Sie sehen vorab eine private Vorschau und entscheiden dann in Ruhe.',
  },
  {
    q: 'Ich habe kaum Zeit – wie viel Aufwand ist das für mich?',
    a: 'Sehr wenig. Wir übernehmen Design, Texte und Technik. Von Ihnen brauchen wir nur ein paar Infos und Bilder – den Rest machen wir.',
  },
  {
    q: 'Kann ich später Fahrzeuge oder Termine selbst verwalten?',
    a: 'Ja. Auf Wunsch richten wir alles so ein, dass Sie Occasionen und Termine selbst pflegen können – einfach und ohne technisches Wissen.',
  },
  {
    q: 'Bietet ihr auch Wartung an?',
    a: 'Ja. Auf Wunsch kümmern wir uns laufend um Updates, Sicherheit und kleine Anpassungen, damit Sie sich um nichts kümmern müssen.',
  },
];

const PREIS = {
  label: 'Garage-Website Schweiz',
  betrag: 'ab CHF 999',
  text: 'Fixpreis, keine versteckten Kosten. Optional mit Automatisierung & Wartung.',
  inklusive: ['Individuelles, modernes Design', 'Occasionen-Galerie', 'Online-Terminbuchung', 'Google- & Handy-optimiert', 'Einweisung inklusive'],
  cta: 'Jetzt Angebot anfragen',
};

const WEITERE = [
  { name: 'SEO für Garagen & Autohäuser', pfad: '/seo-fuer-garagen' },
  { name: 'Website für Fahrschulen', pfad: '/fuer-fahrschulen' },
  { name: 'Website für Coiffeure', pfad: '/fuer-coiffeure' },
  { name: 'Website für Restaurants', pfad: '/fuer-restaurants' },
];

const BILD = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2400&q=80';

const Garagen = () => (
  <Seite>
    <Helmet>
      <title>Website für Garagen Schweiz | Webdesign Autohandel Zürich | MAPSOL</title>
      <meta
        name="description"
        content="Professionelle Website für Garagen und Autohändler in der Schweiz: Occasionen-Galerie, Online-Terminbuchung, mobil & Google-optimiert. Fixpreis ab CHF 999, in ca. 2 Wochen live. MAPSOL Zürich."
      />
      <meta
        name="keywords"
        content="Website Garage Schweiz, Webdesign Garage Zürich, Website Autohandel, Garage Website erstellen lassen, Occasionen Website, Online Terminbuchung Garage, Webdesign Autogarage, Website Werkstatt Schweiz, Garage Homepage"
      />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="geo.region" content="CH-ZH" />
      <meta name="geo.placename" content="Zürich" />
      <link rel="canonical" href="https://www.mapsol.ch/fuer-garagen" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_CH" />
      <meta property="og:site_name" content="MAPSOL" />
      <meta property="og:url" content="https://www.mapsol.ch/fuer-garagen" />
      <meta property="og:title" content="Website für Garagen & Autohändler | MAPSOL Zürich" />
      <meta
        property="og:description"
        content="Garage-Website mit Occasionen-Galerie und Online-Terminbuchung. Fixpreis ab CHF 999, in ca. 2 Wochen live."
      />
      <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Website für Garagen & Autohändler | MAPSOL" />
      <meta
        name="twitter:description"
        content="Professionelle Garage-Websites aus Zürich – Fixpreis, Terminbuchung, Occasionen online."
      />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': 'https://www.mapsol.ch/fuer-garagen',
              url: 'https://www.mapsol.ch/fuer-garagen',
              name: 'Website für Garagen & Autohändler | MAPSOL Zürich',
              description:
                'Professionelle Website für Garagen und Autohändler in der Schweiz mit Occasionen-Galerie und Online-Terminbuchung.',
              inLanguage: 'de-CH',
              isPartOf: { '@id': 'https://www.mapsol.ch/#website' },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mapsol.ch/' },
                { '@type': 'ListItem', position: 2, name: 'Website für Garagen', item: 'https://www.mapsol.ch/fuer-garagen' },
              ],
            },
            {
              '@type': 'Service',
              name: 'Website für Garagen und Autohändler',
              serviceType: 'Webdesign & Website-Erstellung für Garagen',
              provider: {
                '@type': 'LocalBusiness',
                name: 'MAPSOL',
                url: 'https://www.mapsol.ch',
                telephone: '+41-76-310-15-12',
                email: 'contact@mapsol.ch',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Zürich',
                  addressCountry: 'CH',
                },
              },
              areaServed: [
                { '@type': 'Country', name: 'Switzerland' },
                { '@type': 'AdministrativeArea', name: 'Zürich' },
              ],
              offers: {
                '@type': 'Offer',
                priceCurrency: 'CHF',
                price: '999',
                priceValidUntil: '2027-12-31',
                availability: 'https://schema.org/InStock',
                url: 'https://www.mapsol.ch/fuer-garagen',
                description: 'Garage-Website Fixpreis ab CHF 999 inkl. Occasionen-Galerie und Terminbuchung',
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            },
          ],
        })}
      </script>
    </Helmet>

    {/* Kopfbereich: echtes Werkstatt-Foto */}
    <section className="m-bildkopf m-bildkopf-garage">
      <img className="m-bg" src={BILD} alt="" aria-hidden="true" fetchpriority="high" />
      <div className="m-schatten" aria-hidden="true" />
      <div className="m-wrap m-bildkopf-in">
        <span className="m-label m-sk-rubrik">Für Garagen und Autohändler</span>
        <h1 className="m-sk-titel">Die moderne Website <span className="m-verlauf">für Ihre Garage</span></h1>
        <p className="m-lead m-sk-lead">Mehr Anfragen, Online-Terminbuchung, Occasionen online. Fixpreis, in rund 2 Wochen live.</p>
        <div className="m-sk-links">
          <HauptLink>Kostenloses Erstgespräch</HauptLink>
          <a className="m-tlink" href="#demos">Live-Demos ansehen</a>
        </div>
        <p className="m-bildkopf-fuss">Fixpreis · ca. 2 Wochen · Occasionen & Terminbuchung · Zürich</p>
      </div>
    </section>

    <Abschnitt nr="01" label="Ausgangslage" titel="Kennen Sie das aus Ihrer Garage?" text="Viele Garagen und Autohändler in der Schweiz verlieren Anfragen – nicht wegen der Arbeit, sondern wegen einer veralteten oder fehlenden Website.">
      <Reihen eintraege={painPoints.map((titel) => ({ titel }))} />
    </Abschnitt>

    <Abschnitt nr="02" label="Leistungen" titel="Ihre Garage-Website –" akzent="das ist drin." text="Speziell für Garagen und Autohändler: mobil, klar und darauf ausgelegt, mehr Termine und Fahrzeuganfragen zu holen." getoent>
      <Karten eintraege={features.map((f) => ({ titel: f.title, text: f.text }))} />
    </Abschnitt>

    <Abschnitt id="demos" nr="03" label="Beispiele" titel="Beispiel-Websites für Garagen" text="Fiktive Beispiel-Designs, keine Kundenreferenzen. Tippen zum Öffnen der Live-Demo.">
      <ul className="m-demos">
        {demos.map((demo) => (
          <li className="m-demo" key={demo.url}>
            <span className="m-demo-bild" aria-hidden="true">
              <iframe src={demo.url} title={demo.title} loading="lazy" tabIndex={-1} />
            </span>
            <div className="m-demo-text">
              <h3>{demo.title}</h3>
              <p>{demo.description}</p>
              <a className="m-tlink m-demo-link" href={demo.url} target="_blank" rel="noopener noreferrer">Live öffnen <span className="m-pfeil" aria-hidden="true">↗</span></a>
            </div>
          </li>
        ))}
      </ul>
    </Abschnitt>

    <Abschnitt nr="04" label="Automatisierung" titel="Nicht nur schön," akzent="sondern automatisch." text="Ich verbinde Ihre Website mit Ihren Abläufen, damit im Hintergrund automatisch Arbeit erledigt wird. Das spart Ihnen jede Woche Zeit." getoent>
      <Reihen eintraege={automationExamples} />
      <div className="m-versetzt m-mehr">
        <HauptLink gross={false}>Automatisierung besprechen</HauptLink>
      </div>
    </Abschnitt>

    <Abschnitt id="preis" nr="05" label="Preis und Ablauf" titel="So läuft's" akzent="ab.">
      <div className="m-preis-block">
        <Preis preis={PREIS} />
        <Reihen eintraege={steps.map((s) => ({ titel: s.title, text: s.text }))} versetzt={false} />
      </div>
    </Abschnitt>

    <Abschnitt nr="06" label="Fragen" titel="Häufige Fragen zur Garage-Website" getoent>
      <Fragen eintraege={faqs} />
      <div className="m-versetzt">
        <Verwandt titel="Auch interessant" eintraege={WEITERE} />
      </div>
    </Abschnitt>

    <Schluss
      titel="Bereit für eine Website, die Kunden"
      akzent="bringt?"
      text="Kostenloses Erstgespräch, 15 Minuten, unverbindlich. Danach wissen Sie genau, was möglich ist und was es kostet."
    />
  </Seite>
);

export default Garagen;
