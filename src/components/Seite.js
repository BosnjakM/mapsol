import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '../ThemeContext';
import { TELEFON, TELEFON_TEXT, FOTO } from './premium';
import '../pages/Start.css';
import './Seite.css';

/*
 * Bausteine für alle Unterseiten im Stil der Startseite (Nov. 2026):
 * gleiche Farben, Schrift, feine Linien, eckige Formen und Textlinks mit Verlauf-Unterstrich.
 * Alles rendert ohne Browser (Vorrendern beim Build), Bewegung kommt nur aus CSS.
 */

// Zwei Firmen, ein Team: runde Fotos von Mark-Antonio und Lazar (Laki Development)
const LAKI_LINK = 'https://www.laki-development.ch/?utm_source=mapsol&utm_medium=referral&utm_campaign=partner';
export const Team = () => (
  <div className="m-team">
    <div className="m-team-bilder" aria-hidden="true">
      <img src="/images/team/mark.jpg" alt="" width="56" height="56" loading="lazy" />
      <img src="/images/team/lazar.jpg" alt="" width="56" height="56" loading="lazy" />
    </div>
    <div className="m-team-text">
      <strong>Mark-Antonio &amp; Lazar</strong>
      <span>MAPSOL &amp; <a href={LAKI_LINK} target="_blank" rel="noopener noreferrer">Laki Development</a></span>
    </div>
  </div>
);

// Text mit Links im Format [Text](https://…); externe Links öffnen in einem neuen Tab
export const MitLinks = ({ text }) => text.split(/(\[[^\]]+\]\([^)]+\))/).map((teil, i) => {
  const m = teil.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!m) return teil;
  return m[2].startsWith('http')
    ? <a key={i} className="m-tlink" href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>
    : <RouterLink key={i} className="m-tlink" to={m[2]}>{m[1]}</RouterLink>;
});

const nummer = (i) => String(i + 1).padStart(2, '0');

// Fotos: eigene Bilder (Pfad mit «/») oder Unsplash (kostenlose Unsplash-Lizenz, «photo-…»-Kennung).
// Unsplash liefert jede Grösse selbst, der Browser nimmt per srcset die passende für Handy, Tablet oder Desktop.
const UNSPLASH = 'https://images.unsplash.com/';
const BREITEN = [480, 800, 1200, 1800];
const unsplash = (id, w) => `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=70`;
// Eigene Bilder liegen als «name-1920.jpg» und «name-960.jpg» in public/images
const eigeneGroessen = (id) => (id.includes('-1920.') ? `${id.replace('-1920.', '-960.')} 960w, ${id} 1920w` : undefined);

export const Foto = ({ id, alt = '', sizes = '100vw', className = '', vorne = false }) => {
  if (!id) return null;
  const eigen = id.startsWith('/');
  return (
    <figure className={`m-bildrahmen${className ? ` ${className}` : ''}`}>
      <img
        src={eigen ? id : unsplash(id, 1200)}
        srcSet={eigen ? eigeneGroessen(id) : BREITEN.map((w) => `${unsplash(id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        alt={alt}
        loading={vorne ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  );
};

// Rahmen: Farben für Hell und Dunkel wie auf der Startseite
export const Seite = ({ children }) => {
  const { mode } = useColorMode();
  return <div className={`m-root m-seite${mode === 'light' ? ' ist-hell' : ''}`}>{children}</div>;
};

export const HauptLink = ({ to = '/kontakt', children = 'Erstgespräch vereinbaren', gross = true }) => (
  <RouterLink className={`m-tlink${gross ? ' m-tlink-gross' : ''}`} to={to}>
    {children} <span className="m-pfeil" aria-hidden="true">→</span>
  </RouterLink>
);

export const TelefonLink = () => <a className="m-tlink" href={`tel:${TELEFON}`}>{TELEFON_TEXT}</a>;

export const MailLink = () => <a className="m-tlink" href="mailto:contact@mapsol.ch">contact@mapsol.ch</a>;

// Kopfbereich: Rubrik, grosse Überschrift mit Verlaufswort, Einleitung, Links und optional etwas daneben
export const SeitenKopf = ({ rubrik, titel, akzent, text, punkte, links, neben }) => (
  <section className={`m-sk${neben ? ' hat-neben' : ''}`}>
    <div className="m-wrap">
      <span className="m-label m-sk-rubrik">{rubrik}</span>
      <div className="m-sk-in">
        <div className="m-sk-text">
          <h1 className="m-sk-titel">
            {titel}
            {akzent && <>{titel ? ' ' : ''}<span className="m-verlauf">{akzent}</span></>}
          </h1>
          {text && <p className="m-lead m-sk-lead">{text}</p>}
          {punkte && punkte.length > 0 && (
            <ul className="m-punkte">
              {punkte.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          {links && <div className="m-sk-links">{links}</div>}
        </div>
        {neben && <div className="m-sk-neben">{neben}</div>}
      </div>
    </div>
  </section>
);

// Abschnitt mit Kopf wie auf der Startseite: Nummer und Rubrik links, Überschrift rechts
export const Abschnitt = ({ id, nr, label, titel, akzent, text, getoent, children }) => (
  <section className={`m-sek${getoent ? ' m-sek-fl' : ''}`} id={id}>
    <div className="m-wrap">
      {titel && (
        <div className="m-kopf">
          <span className="m-label">{nr ? `${nr} — ${label}` : label}</span>
          <div>
            <h2 className="m-h2">
              {titel}
              {akzent && <> <span className="m-verlauf">{akzent}</span></>}
            </h2>
            {text && <p className="m-lead">{text}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  </section>
);

// Nummerierte Zeilen, z. B. Probleme oder Ablauf
export const Reihen = ({ eintraege, versetzt = true }) => (
  <ol className={`m-reihen${versetzt ? ' m-versetzt' : ''}`}>
    {eintraege.map((e, i) => (
      <li key={e.titel}>
        <span className="m-reihen-nr">{nummer(i)}</span>
        <div>
          <h3>{e.titel}</h3>
          {e.text && <p>{e.text}</p>}
        </div>
      </li>
    ))}
  </ol>
);

// Kacheln mit Titel, Text und optional einem Link
export const Karten = ({ eintraege, spalten = 3 }) => (
  <ul className={`m-karten m-karten-${spalten}`}>
    {eintraege.map((e) => (
      <li className="m-kk" key={e.titel}>
        {e.label && <span className="m-label">{e.label}</span>}
        <h3>{e.titel}</h3>
        {e.text && <p>{e.text}</p>}
        {e.liste && (
          <ul className="m-haken">
            {e.liste.map((x) => <li key={x}>{x}</li>)}
          </ul>
        )}
        {e.link && (
          e.link.extern ? (
            <a className="m-tlink" href={e.link.pfad} target="_blank" rel="noopener noreferrer">{e.link.text} <span className="m-pfeil" aria-hidden="true">↗</span></a>
          ) : (
            <RouterLink className="m-tlink" to={e.link.pfad}>{e.link.text} <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
          )
        )}
      </li>
    ))}
  </ul>
);

// Vier Schritte nebeneinander wie «So arbeite ich» auf der Startseite
export const Schritte = ({ eintraege }) => (
  <ol className="m-schritte">
    {eintraege.map((s, i) => (
      <li key={s.titel}>
        <span className="m-schritt-nr">{nummer(i)}</span>
        <h3>{s.titel}</h3>
        <p>{s.text}</p>
      </li>
    ))}
  </ol>
);

// Fragen zum Aufklappen; die Antworten stehen trotzdem im HTML (für Google)
export const Fragen = ({ eintraege }) => (
  <div className="m-fragen">
    {eintraege.map((f) => (
      <details key={f.q}>
        <summary>{f.q}</summary>
        <p><MitLinks text={f.a} /></p>
      </details>
    ))}
  </div>
);

// Preis mit Verlaufslinie oben
export const Preis = ({ preis }) => (
  <div className="m-preis">
    <span className="m-label">{preis.label}</span>
    <p className="m-preis-betrag">{preis.betrag}</p>
    {preis.text && <p className="m-preis-text">{preis.text}</p>}
    <ul className="m-haken">
      {preis.inklusive.map((x) => <li key={x}>{x}</li>)}
    </ul>
    <HauptLink gross={false}>{preis.cta || 'Angebot anfragen'}</HauptLink>
    <p className="m-hinweis">{preis.hinweis || 'Erstgespräch kostenlos und unverbindlich'}</p>
  </div>
);

// Längerer Text mit Zwischentiteln (Ratgeber-Inhalt der Landingpages)
export const Wissen = ({ abschnitte }) => (
  <div className="m-wissen">
    {abschnitte.map((a) => (
      <div key={a.titel}>
        <h3>{a.titel}</h3>
        {a.text.map((t, i) => <p key={i}><MitLinks text={t} /></p>)}
      </div>
    ))}
  </div>
);

// Weiterführende Seiten als Linkliste
export const Verwandt = ({ titel = 'Das könnte Sie auch interessieren', eintraege }) => {
  if (!eintraege || eintraege.length === 0) return null;
  return (
    <nav className="m-verwandt" aria-label={titel}>
      <span className="m-label">{titel}</span>
      <ul>
        {eintraege.map((v) => (
          <li key={v.pfad}>
            <RouterLink to={v.pfad}>{v.name}<span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Wer das baut: kurze Vorstellung mit belegten Qualifikationen statt Schlagworten
export const Qualifikation = () => (
  <div className="m-quali">
    <img src={FOTO} alt="Mark-Antonio Bosnjak, Gründer von MAPSOL" width="120" height="150" loading="lazy" />
    <div>
      <p className="m-gross">Ich bin Mark-Antonio Bosnjak: gelernter Applikationsentwickler, Informatik-Student und seit 2022 jeden Tag mit KI am Arbeiten. Ich baue Ihre Abläufe selbst und bleibe danach Ihre Ansprechperson.</p>
      <ul className="m-punkte">
        {['Applikationsentwickler EFZ', 'Studium Informatik HF', 'KI seit 2022', 'Zertifikat AI Fluency (Anthropic)'].map((p) => <li key={p}>{p}</li>)}
      </ul>
      <div className="m-links">
        <HauptLink to="/ueber-uns" gross={false}>Mehr über mich</HauptLink>
      </div>
    </div>
  </div>
);

// Kennzahlen in einer Zeile, z. B. Jahre Erfahrung
export const Zahlen = ({ eintraege }) => (
  <div className="m-zahlen-band">
    <div className="m-wrap">
      <ul className="m-zahlen">
        {eintraege.map(([wert, text]) => (
          <li key={text}>
            <b>{wert}</b>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Lebenslauf als Zeitstrahl: Zeitraum links, Station rechts
export const Laufbahn = ({ eintraege }) => (
  <ol className="m-laufbahn m-versetzt">
    {eintraege.map((e) => (
      <li key={e.titel}>
        <span className="m-laufbahn-zeit">{e.zeit}</span>
        <div className="m-laufbahn-text">
          <h3>{e.titel}</h3>
          {e.ort && <span className="m-laufbahn-ort">{e.ort}</span>}
          {e.text && <p>{e.text}</p>}
        </div>
      </li>
    ))}
  </ol>
);

// Ratgeber-Artikel als Kachel mit Bild; «gross» für den neuesten Artikel im Kopfbereich
export const ArtikelKachel = ({ a, gross = false, ueberschrift = 'h2' }) => {
  const Titel = ueberschrift;
  return (
    <RouterLink className={`m-kachel${gross ? ' ist-gross' : ''}`} to={a.pfad}>
      {a.bild && (
        <Foto
          id={a.bild.id}
          className="m-kachel-bild"
          sizes={gross ? '(max-width: 980px) 92vw, 520px' : '(max-width: 640px) 92vw, (max-width: 980px) 46vw, 400px'}
          vorne={gross}
        />
      )}
      <div className="m-kachel-text">
        <span className="m-label">{a.kategorie} · {a.lesezeit} Min.</span>
        <Titel>{a.titel}</Titel>
        <p>{a.seo.beschreibung}</p>
        <span className="m-tlink">Weiterlesen <span className="m-pfeil" aria-hidden="true">→</span></span>
      </div>
    </RouterLink>
  );
};

export const ArtikelKacheln = ({ artikel, ueberschrift }) => (
  <ul className="m-kacheln">
    {artikel.map((a) => (
      <li key={a.pfad}><ArtikelKachel a={a} ueberschrift={ueberschrift} /></li>
    ))}
  </ul>
);

// Schluss wie auf der Startseite, Überschrift je Seite anpassbar
export const Schluss = ({ label = 'Kontakt', titel = 'Erzählen Sie mir, wo es bei Ihnen', akzent = 'hakt.', text, cta }) => (
  <section className="m-sek m-schluss">
    <div className="m-wrap">
      <span className="m-label">{label}</span>
      <h2 className={`m-h2 m-schluss-titel${`${titel} ${akzent}`.length > 44 ? ' ist-lang' : ''}`}>
        {titel} <span className="m-verlauf">{akzent}</span>
      </h2>
      {text && <p className="m-lead">{text}</p>}
      <div className="m-schluss-links">
        <HauptLink>{cta}</HauptLink>
        <TelefonLink />
        <MailLink />
      </div>
    </div>
  </section>
);

// Handy: feste Leiste unten, sobald der Kopfbereich weg ist (nicht ganz unten, dort steht der Schluss)
export const MobilLeiste = ({ cta = 'Erstgespräch vereinbaren' }) => {
  const [an, setAn] = useState(false);
  useEffect(() => {
    const pruefen = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setAn(y > 560 && y < max - 520);
    };
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => window.removeEventListener('scroll', pruefen);
  }, []);
  return (
    <div className={`m-leiste${an ? ' ist-an' : ''}`} aria-hidden={!an}>
      <RouterLink className="m-tlink" to="/kontakt" tabIndex={an ? 0 : -1}>{cta} <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
      <a className="m-leiste-tel" href={`tel:${TELEFON}`} tabIndex={an ? 0 : -1}>Anrufen</a>
    </div>
  );
};
