import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FOTO } from './premium';
import { ReactComponent as LogoAnthropic } from '../assets/logos/anthropic.svg';
import { ReactComponent as LogoClaude } from '../assets/logos/claude.svg';
import { ReactComponent as LogoOpenAI } from '../assets/logos/openai.svg';
import { ReactComponent as LogoN8n } from '../assets/logos/n8n.svg';
import { ReactComponent as LogoGoogle } from '../assets/logos/google.svg';
import { ReactComponent as LogoSearchConsole } from '../assets/logos/googlesearchconsole.svg';
import { ReactComponent as LogoAnalytics } from '../assets/logos/googleanalytics.svg';
import { ReactComponent as LogoGitHub } from '../assets/logos/github.svg';
import { ReactComponent as LogoVercel } from '../assets/logos/vercel.svg';

/* Abschnitte der Startseite: dunkel (oder hell über den Schalter), linksbündig auf einem Vier-Spalten-Raster,
   eckige Formen, Verlauf Blau→Orange wie im Logo als Akzent. Texte in Ich-Form. */

/* ---------- Live-Uhrzeit Zürich ---------- */
export const ZuerichZeit = () => {
  const [zeit, setZeit] = useState('');
  useEffect(() => {
    const stellen = () => {
      try {
        setZeit(new Date().toLocaleTimeString('de-CH', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        setZeit('');
      }
    };
    stellen();
    const id = setInterval(stellen, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="m-zeit"><i aria-hidden="true" />Zürich {zeit}</span>;
};

/* Kopf eines Abschnitts: Bezeichnung in der ersten Rasterspalte, Titel über die restlichen drei */
const Kopf = ({ nr, label, children, text }) => (
  <div className="m-kopf">
    <span className="m-label">{nr} — {label}</span>
    <div>
      <h2 className="m-h2">{children}</h2>
      {text && <p className="m-lead">{text}</p>}
    </div>
  </div>
);

/* MAPSOL-Chip (Logo) als Knotenpunkt der Netzkarte */
const Chip = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <linearGradient id="chip-verlauf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0088ff" />
        <stop offset="100%" stopColor="#ff5500" />
      </linearGradient>
    </defs>
    <rect x="40" y="0" width="8" height="20" fill="#0088ff" />
    <rect x="52" y="0" width="8" height="20" fill="#0088ff" />
    <rect x="0" y="40" width="20" height="8" fill="#0088ff" />
    <rect x="0" y="52" width="20" height="8" fill="#0088ff" />
    <rect x="80" y="40" width="20" height="8" fill="#ff5500" />
    <rect x="80" y="52" width="20" height="8" fill="#ff5500" />
    <rect x="40" y="80" width="8" height="20" fill="#ff5500" />
    <rect x="52" y="80" width="8" height="20" fill="#ff5500" />
    <rect x="20" y="20" width="60" height="60" rx="10" fill="url(#chip-verlauf)" />
    <path d="M30 30 L30 70 L40 70 L40 40 L50 60 L60 40 L60 70 L70 70 L70 30 L55 30 L50 45 L45 30 L30 30 Z" fill="#ffffff" />
  </svg>
);

/* ---------- Liniennetz: die vier Leistungen ---------- */
// Kartenraster 760 × 560, Knotenpunkt MAPSOL in der Mitte (380/280)
const STRECKEN = {
  3: 'M140 40 L560 460',
  4: 'M56 520 H140 L380 280',
  2: 'M56 280 H540 L680 140 V50',
  1: 'M380 40 V430 L470 520 H700',
};
const LINIENFARBE = { 1: '#FF5500', 2: '#0088FF', 3: 'var(--fg)', 4: '#7C828C' };
const BADGE_SCHRIFT = { 1: '#0A0A0F', 2: '#0A0A0F', 3: 'var(--bg)', 4: '#0A0A0F' };

const STATIONEN = [
  ['Website', 380, 40, 'r', 1], ['Google', 380, 150, 'r', 1], ['Anfrage', 380, 390, 'r', 1], ['Neuer Kunde', 700, 520, 't', 1],
  ['Outlook', 56, 280, 't', 2], ['Excel', 200, 280, 't', 2], ['Bexio', 540, 280, 'b', 2], ['Eigene Software', 610, 210, 'r', 2], ['Shop', 680, 50, 'r', 2],
  ['Ihr Team', 140, 40, 'l', 3], ['Grundlagen', 260, 160, 'l', 3], ['Workshop', 500, 400, 'r', 3], ['Im Alltag', 560, 460, 'r', 3],
  ['Suche', 56, 520, 't', 4], ['Bewertungen', 140, 520, 'b', 4], ['KI-Suche', 240, 420, 'r', 4],
];

const LINIEN = [
  { n: 1, titel: 'Websites, die auffallen', to: '/website-erstellen-lassen', text: 'Ich gestalte und baue Ihren Auftritt so, dass er hängen bleibt und aus Besuchern Anfragen werden.' },
  { n: 2, titel: 'KI-Automatisierung & Schnittstellen', to: '/automatisierung-fuer-kmu', text: 'Ich verbinde Bexio, Outlook, Excel oder Ihren Shop, damit Daten nicht mehr von Hand übertragen werden.' },
  { n: 3, titel: 'KI-Schulungen für Ihr Team', to: '/services#training', text: 'Ich zeige Ihrem Team, wie es KI sicher und sinnvoll nutzt, mit Beispielen aus Ihrem Alltag.' },
  { n: 4, titel: 'Sichtbarkeit', to: '/seo-fuer-kmu', text: 'SEO, Google-Profil und Werbung, damit man Sie findet, auch in KI-Suchen wie ChatGPT.' },
];

const Badge = ({ n }) => (
  <span className="m-badge" style={{ background: LINIENFARBE[n], color: BADGE_SCHRIFT[n] }}>{n}</span>
);

export const Liniennetz = () => {
  const [gewaehlt, setGewaehlt] = useState(0);
  const [hover, setHover] = useState(null);
  const aktiv = hover ?? gewaehlt;
  const sichtbar = (n) => (aktiv === 0 || aktiv === n ? 1 : 0.12);

  return (
    <section className="m-sek" id="leistungen">
      <div className="m-wrap m-raster">
        <Kopf nr="02" label="Was ich mache" text="Vier Leistungen, die zusammenhängen: Die Website holt die Kunden, die Automatisierung erledigt danach die Arbeit.">
          Alles läuft bei mir <span className="m-verlauf">zusammen.</span>
        </Kopf>
        <div className="m-netz">
          <div className="m-kartebox">
            <div className="m-karte" role="img" aria-label="Liniennetz: vier Leistungen laufen bei MAPSOL zusammen">
              <svg className="m-karte-svg" viewBox="0 0 760 560" aria-hidden="true">
                <defs>
                  <linearGradient id="netz-verlauf" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0088FF" />
                    <stop offset="100%" stopColor="#FF5500" />
                  </linearGradient>
                </defs>
                {[3, 4, 2, 1].map((n) => (
                  <path key={n} className="m-ln" d={STRECKEN[n]} pathLength="1" style={{ stroke: LINIENFARBE[n] }} opacity={sichtbar(n)} />
                ))}
                <rect x="340" y="240" width="80" height="80" fill="var(--bg)" stroke="url(#netz-verlauf)" strokeWidth="3" />
              </svg>
              <div className="m-knoten" aria-hidden="true"><Chip /></div>
              {STATIONEN.map(([name, x, y, seite, linie]) => (
                <div key={name} className={`m-st m-st-${seite}`} style={{ left: `${x / 7.6}%`, top: `${y / 5.6}%`, opacity: sichtbar(linie) }}>
                  <i aria-hidden="true" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="m-linien" onMouseLeave={() => setHover(null)}>
            {LINIEN.map((l) => (
              <div key={l.n} className={`m-linie${aktiv !== 0 && aktiv !== l.n ? ' ist-matt' : ''}`} onMouseEnter={() => setHover(l.n)}>
                <Badge n={l.n} />
                <div>
                  <button type="button" className="m-linie-titel" aria-pressed={gewaehlt === l.n} onClick={() => setGewaehlt(gewaehlt === l.n ? 0 : l.n)}>
                    {l.titel}
                  </button>
                  <p>{l.text}</p>
                  <RouterLink className="m-tlink" to={l.to}>Mehr erfahren</RouterLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Vertrauen: Google-Bewertung und Werkzeuge, mit denen ich arbeite ---------- */
// Nur Werkzeuge, die ich wirklich nutze. Logos von Simple Icons (CC0), einfarbig.
// Microsoft und bexio erlauben ihre Logos nur mit Lizenz bzw. für offizielle Partner: dort steht nur der Name.
const WERKZEUGE = [
  ['Anthropic', LogoAnthropic],
  ['Claude', LogoClaude],
  ['OpenAI', LogoOpenAI],
  ['n8n', LogoN8n],
  ['Microsoft Teams', null],
  ['Microsoft Outlook', null],
  ['Microsoft Excel', null],
  ['bexio', null],
  ['Google Search Console', LogoSearchConsole],
  ['Google Analytics', LogoAnalytics],
  ['GitHub', LogoGitHub],
  ['Vercel', LogoVercel],
];
const GOOGLE_BEWERTUNGEN = 'https://www.google.com/search?q=MAPSOL+Neftenbach+Bewertungen';

export const Vertrauen = () => (
  <section className="m-vertrauen" aria-label="Bewertungen und Technologien">
    <div className="m-wrap m-vertrauen-in">
      <div className="m-google">
        <span className="m-google-kopf"><LogoGoogle aria-hidden="true" fill="currentColor" />Google-Bewertungen</span>
        <p className="m-google-note"><b>5,0</b><span className="m-sterne-gross" aria-label="5 von 5 Sternen">★★★★★</span></p>
        <a className="m-tlink" href={GOOGLE_BEWERTUNGEN} target="_blank" rel="noopener noreferrer">Bewertungen ansehen <span className="m-pfeil" aria-hidden="true">→</span></a>
      </div>
      <div className="m-werkzeuge">
        <span className="m-label">MAPSOL für KI, Automatisierung und Web</span>
        <ul className="m-tools">
          {WERKZEUGE.map(([name, Logo]) => (
            <li key={name} className={Logo ? undefined : 'ohne-logo'}>
              {Logo && <Logo aria-hidden="true" fill="currentColor" />}
              <span>{name}</span>
            </li>
          ))}
        </ul>
        <p className="m-marken">Alle Marken und Logos gehören ihren Inhabern.</p>
      </div>
    </div>
  </section>
);

/* ---------- Was ich verbinde: sechs Beispielansichten, die zeigen, was automatisch laufen kann ---------- */
const Sterne = () => (
  <span className="m-sterne" aria-label="5 von 5 Sternen">
    {[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }}>★</i>)}
  </span>
);

const ANBINDUNGEN = [
  {
    titel: 'Mehr Google-Bewertungen',
    text: 'Nach jedem Auftrag geht automatisch eine Bitte um eine Bewertung raus. So werden Sie besser gefunden.',
    bild: (
      <div className="m-ui m-ui-google">
        <div className="m-g-kopf"><b>Garage Muster</b><span>Autowerkstatt · Winterthur</span></div>
        <div className="m-g-note"><span className="m-g-zahl">4,9</span><Sterne /><span className="m-g-anz">Rezensionen</span></div>
        <div className="m-g-neu"><i aria-hidden="true">S</i><div><b>Neue Bewertung</b><span>«Termin online gebucht, alles top.»</span></div></div>
      </div>
    ),
  },
  {
    titel: 'Bexio und Outlook verbunden',
    text: 'Ist eine Rechnung bezahlt, geht die Danke-Mail von selbst raus. Niemand muss etwas abtippen.',
    bild: (
      <div className="m-ui m-ui-verbindung">
        <div className="m-apps">
          <span className="m-app">Bexio</span>
          <span className="m-leitung" aria-hidden="true"><i /></span>
          <span className="m-app">Outlook</span>
        </div>
        <p className="m-ui-zeile"><span>Rechnung bezahlt</span><span aria-hidden="true">→</span><span>Danke-Mail an den Kunden</span></p>
      </div>
    ),
  },
  {
    titel: 'Termine bestätigen sich selbst',
    text: 'Kunden bekommen Bestätigung und Erinnerung per SMS, ohne dass Sie zum Telefon greifen.',
    bild: (
      <div className="m-ui m-ui-handy">
        <span className="m-ui-meta">SMS · gerade eben</span>
        <div className="m-bubble">Ihr Termin am Dienstag um 09:30 ist bestätigt. Bis bald! Garage Muster</div>
        <div className="m-bubble m-bubble-zwei">Erinnerung: morgen 09:30. Antworten Sie mit 1, um zu verschieben.</div>
      </div>
    ),
  },
  {
    titel: 'Belege ohne Abtippen',
    text: 'KI liest Betrag, Datum und Lieferant aus und legt den Beleg in Bexio ab. Sie prüfen nur noch.',
    bild: (
      <div className="m-ui m-ui-beleg">
        <div className="m-beleg">
          <b>Muster Holz AG</b>
          <span>Rechnung Nr. 2026-118</span>
          <span className="m-feld">Datum 03.11.2026</span>
          <span>Bretter Fichte, 24 Stk.</span>
          <span className="m-feld">Total CHF 248.40</span>
        </div>
        <span className="m-nach">KI liest aus <b>→ Bexio</b></span>
      </div>
    ),
  },
  {
    titel: 'Online buchen, rund um die Uhr',
    text: 'Termine bucht man direkt auf Ihrer Website, auch abends und am Wochenende.',
    bild: (
      <div className="m-ui m-ui-termin">
        <div className="m-tage">{['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((t) => <span key={t} className={t === 'Di' ? 'ist-an' : undefined}>{t}</span>)}</div>
        <div className="m-slots">{['08:00', '09:30', '11:00', '13:30', '15:00', '16:30'].map((z) => <span key={z} className={z === '09:30' ? 'ist-an' : undefined}>{z}</span>)}</div>
        <span className="m-buchen">Termin buchen</span>
      </div>
    ),
  },
  {
    titel: 'KI im Team, richtig genutzt',
    text: 'Ich zeige Ihrem Team, wie es KI für Mails, Offerten und Texte sicher einsetzt.',
    bild: (
      <div className="m-ui m-ui-chat">
        <div className="m-frage">Wie schreibe ich diese Absage freundlich?</div>
        <div className="m-antwort">Gerne, hier ein Vorschlag: «Vielen Dank für Ihr Interesse. Leider …»<span className="m-tippt" aria-hidden="true" /></div>
      </div>
    ),
  },
];

export const Anbindungen = () => (
  <section className="m-sek" id="anbindungen">
    <div className="m-wrap m-raster">
      <Kopf nr="01" label="Was ich verbinde">Das kann bei Ihnen <span className="m-verlauf">von selbst laufen.</span></Kopf>
      <div className="m-anb-raster">
        {ANBINDUNGEN.map((a) => (
          <article className="m-anb" key={a.titel}>
            <div className="m-anb-bild" aria-hidden="true">{a.bild}</div>
            <div className="m-anb-text">
              <h3>{a.titel}</h3>
              <p>{a.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="m-hinweis">Beispielansichten mit erfundenen Firmennamen.</p>
    </div>
  </section>
);

/* ---------- Ablauf: vier Schritte ---------- */
export const SCHRITTE = [
  ['Wir reden', 'Kostenlos und unverbindlich. Sie erzählen mir, wo Sie online und im Alltag Zeit verlieren.'],
  ['Ich zeige Ihnen einen Entwurf', 'Ihre neue Website oder der erste automatisierte Ablauf, an Ihren echten Daten. Bevor es grösser wird.'],
  ['Ich setze um und schule Ihr Team', 'Aufschalten, verbinden, erklären. Keine Blackbox: Sie verstehen, was die Technik tut.'],
  ['Ich bleibe dran', 'Ich passe an und baue aus, wenn Ihr Geschäft wächst. Sie haben immer dieselbe Ansprechperson.'],
];

export const Ablauf = () => (
  <section className="m-sek" id="ablauf">
    <div className="m-wrap m-raster">
      <Kopf nr="03" label="So arbeite ich">Klein anfangen. <span className="m-verlauf">Sauber ausbauen.</span></Kopf>
      <ol className="m-schritte">
        {SCHRITTE.map(([titel, text], i) => (
          <li key={titel}>
            <span className="m-schritt-nr">{String(i + 1).padStart(2, '0')}</span>
            <h3>{titel}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ---------- Über mich ---------- */
export const UeberMich = () => (
  <section className="m-sek m-sek-fl" id="ueber-mich">
    <div className="m-wrap m-raster m-ueber">
      <span className="m-label">04 — Über mich</span>
      <div className="m-foto">
        <img src={FOTO} alt="Mark-Antonio Bosnjak, Gründer von MAPSOL" loading="lazy" />
      </div>
      <div className="m-ueber-text">
        <h2 className="m-h2">Ich bin <span className="m-verlauf" style={{ whiteSpace: 'nowrap' }}>Mark-Antonio.</span></h2>
        <p className="m-gross">Ich bin gelernter Applikationsentwickler, studiere Informatik HF und arbeite seit 2022 jeden Tag mit KI. Bei mir bekommen Sie Design und Technik aus einer Hand.</p>
        <ul className="m-punkte m-ueber-punkte">
          {['Applikationsentwickler EFZ', 'Studium Informatik HF', 'KI seit 2022', '4 Zertifikate'].map((p) => <li key={p}>{p}</li>)}
        </ul>
        <p>Sie reden immer direkt mit mir, also mit der Person, die Ihre Website und Ihre Automatisierung auch baut. Ich erkläre, was die Technik tut, damit Ihr Team versteht, womit es arbeitet. Für grössere Webprojekte arbeite ich mit Laki Development zusammen.</p>
        <div className="m-links">
          <RouterLink className="m-tlink" to="/ueber-uns">Mehr über mich</RouterLink>
          <a className="m-tlink" href="https://www.linkedin.com/company/mapsol" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="m-tlink" href="https://www.laki-development.ch/?utm_source=mapsol&utm_medium=referral&utm_campaign=partner" target="_blank" rel="noopener noreferrer">Laki Development</a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Kundenstimmen: erscheinen erst, wenn es echte gibt ---------- */
// Eintrag: { text: '…', name: 'Vorname Nachname', firma: 'Firma, Ort' } – nur mit Einverständnis der Person
const STIMMEN = [];

export const Kundenstimmen = () => {
  if (STIMMEN.length === 0) return null;
  return (
    <section className="m-sek" id="stimmen">
      <div className="m-wrap m-raster">
        <Kopf nr="05" label="Kundenstimmen">Was andere <span className="m-verlauf">sagen.</span></Kopf>
        <div className="m-stimmen">
          {STIMMEN.map((s) => (
            <figure key={s.name} className="m-stimme">
              <blockquote>«{s.text}»</blockquote>
              <figcaption><b>{s.name}</b> · {s.firma}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Fragen ---------- */
const FRAGEN = [
  ['Brauchen wir dafür neue Software?', 'Meistens nicht. Ich verbinde die Programme, die Sie schon nutzen, zum Beispiel Bexio, Outlook oder Excel.'],
  ['Was kostet das?', 'Das Erstgespräch ist kostenlos. Danach bekommen Sie von mir eine Offerte für den ersten Schritt, bevor etwas gebaut wird.'],
  ['Was passiert mit unseren Daten?', 'Vor dem Start kläre ich mit Ihnen, welche Daten wohin gehen. Ich wähle die Dienste so, dass sie zum Schweizer Datenschutzgesetz passen.'],
  ['Was, wenn die KI einen Fehler macht?', 'Wo es darauf ankommt, prüft ein Mensch das Resultat, zum Beispiel bei Belegen oder Offerten. Die KI bereitet vor, Ihr Team entscheidet.'],
  ['Arbeiten Sie nur in Zürich?', 'Ich sitze in Neftenbach im Kanton Zürich. Gespräche und Schulungen gehen vor Ort oder per Video, in der ganzen Deutschschweiz.'],
];

export const Fragen = () => (
  <section className="m-sek" id="fragen">
    <div className="m-wrap m-raster">
      <Kopf nr="05" label="Fragen" text="Und falls Ihre Frage fehlt: Im Erstgespräch ist Zeit dafür.">Was KMU mich <span className="m-verlauf">zuerst fragen.</span></Kopf>
      <div className="m-fragen">
        {FRAGEN.map(([frage, antwort]) => (
          <details key={frage}>
            <summary>{frage}</summary>
            <p>{antwort}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Schluss ---------- */
export const Schluss = ({ telefon, telefonText }) => (
  <section className="m-sek m-schluss" id="kontakt">
    <div className="m-wrap m-raster">
      <span className="m-label">06 — Kontakt</span>
      <h2 className="m-h2 m-schluss-titel">Erzählen Sie mir, wo es bei Ihnen <span className="m-verlauf">hakt.</span></h2>
      <div className="m-schluss-links">
        <RouterLink className="m-tlink m-tlink-gross" to="/kontakt">Erstgespräch vereinbaren <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
        <a className="m-tlink" href={`tel:${telefon}`}>{telefonText}</a>
        <a className="m-tlink" href="mailto:contact@mapsol.ch">contact@mapsol.ch</a>
      </div>
    </div>
  </section>
);
