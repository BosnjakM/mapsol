import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FOTO } from '../components/premium';
import { Seite, Fragen, ArtikelKacheln, Schluss, HauptLink, Foto } from '../components/Seite';

/*
 * Vorlage für Ratgeber-Artikel im Stil der Startseite. Inhalte: src/pages/artikel/<slug>.json
 * Der <head> wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 */

const datumDe = (iso) => {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
};

const anker = (i) => `abschnitt-${i + 1}`;

const RatgeberArtikel = ({ artikel: a, alle = [] }) => {
  const [aktiv, setAktiv] = useState(0);

  // Inhaltsverzeichnis: aktuellen Abschnitt hervorheben (letzter Abschnitt, dessen Anfang im oberen Drittel liegt)
  useEffect(() => {
    let rahmen = 0;
    const pruefen = () => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(() => {
        let i = 0;
        a.abschnitte.forEach((_, j) => {
          const el = document.getElementById(anker(j));
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) i = j;
        });
        setAktiv(i);
      });
    };
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => {
      cancelAnimationFrame(rahmen);
      window.removeEventListener('scroll', pruefen);
    };
  }, [a]);

  const springen = (e, i) => {
    const el = document.getElementById(anker(i));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${anker(i)}`);
  };

  const url = `https://www.mapsol.ch${a.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: a.titel,
        description: a.seo.beschreibung,
        datePublished: a.datum,
        dateModified: a.aktualisiert || a.datum,
        inLanguage: 'de-CH',
        mainEntityOfPage: url,
        image: 'https://www.mapsol.ch/og-image.jpg',
        author: { '@type': 'Person', name: 'Mark-Antonio Bosnjak', url: 'https://www.mapsol.ch/ueber-uns' },
        publisher: {
          '@type': 'Organization',
          name: 'MAPSOL',
          url: 'https://www.mapsol.ch',
          logo: { '@type': 'ImageObject', url: 'https://www.mapsol.ch/favicon.svg' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mapsol.ch/' },
          { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://www.mapsol.ch/ratgeber' },
          { '@type': 'ListItem', position: 3, name: a.titel, item: url },
        ],
      },
      ...(a.faqs && a.faqs.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: a.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  const weitere = alle.filter((x) => x.pfad !== a.pfad).slice(0, 3);

  return (
    <Seite>
      <Helmet>
        <title>{a.seo.titel}</title>
        <meta name="description" content={a.seo.beschreibung} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="MAPSOL" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={a.seo.titel} />
        <meta property="og:description" content={a.seo.beschreibung} />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Kopf: Titel links, Bild rechts */}
      <section className="m-sk m-artikel-kopf">
        <div className="m-wrap">
          <nav className="m-label m-sk-rubrik m-pfad" aria-label="Brotkrumen">
            <RouterLink to="/ratgeber">Ratgeber</RouterLink> <span aria-hidden="true">/</span> {a.kategorie}
          </nav>
          <div className={`m-artikel-kopf-in${a.bild ? ' hat-bild' : ''}`}>
            <div>
              <div className="m-artikel-meta-zeile">
                <span>{a.kategorie}</span>
                <span>{a.lesezeit} Min. Lesezeit</span>
                <span>{datumDe(a.aktualisiert || a.datum)}</span>
              </div>
              <h1 className="m-sk-titel m-artikel-titel">{a.titel}</h1>
              <p className="m-lead m-sk-lead">{a.einleitung}</p>
              <div className="m-autor-zeile">
                <img src={FOTO} alt="" width="40" height="40" />
                <span>Von <b>Mark-Antonio Bosnjak</b>, Applikationsentwickler EFZ</span>
              </div>
            </div>
            {a.bild && <Foto id={a.bild.id} alt={a.bild.alt} className="m-artikel-kopf-bild" sizes="(max-width: 980px) 92vw, 480px" vorne />}
          </div>
        </div>
      </section>

      <section className="m-sek m-sek-fl m-artikel-sek">
        <div className="m-wrap m-artikel-raster">
          {/* Inhaltsverzeichnis */}
          <nav className="m-toc" aria-label="Inhalt">
            <span className="m-label">Inhalt</span>
            <ol>
              {a.abschnitte.map((s, i) => (
                <li key={s.titel}>
                  <a href={`#${anker(i)}`} onClick={(e) => springen(e, i)} aria-current={aktiv === i ? 'true' : undefined}>
                    {s.titel}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="m-fliess m-artikel-inhalt">
            {a.kurzfassung && (
              <div className="m-panel m-kurz">
                <span className="m-label">Das Wichtigste in Kürze</span>
                <ul className="m-haken">
                  {a.kurzfassung.map((k) => <li key={k}>{k}</li>)}
                </ul>
              </div>
            )}

            {a.abschnitte.map((s, i) => (
              <section key={s.titel} id={anker(i)} className="m-artikel-abschnitt">
                <h2>{s.titel}</h2>
                {(s.absaetze || []).map((t, j) => <p key={j}>{t}</p>)}
                {s.liste && (
                  <ul className="m-haken m-artikel-haken">
                    {s.liste.map((l, j) => <li key={j}>{l}</li>)}
                  </ul>
                )}
                {s.tabelle && (
                  <div className="m-tabelle">
                    <table>
                      <thead>
                        <tr>{s.tabelle.kopf.map((k) => <th key={k} scope="col">{k}</th>)}</tr>
                      </thead>
                      <tbody>
                        {s.tabelle.zeilen.map((z, j) => (
                          <tr key={j}>{z.map((c, k) => <td key={k}>{c}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.hinweis && <p className="m-notiz">{s.hinweis}</p>}
              </section>
            ))}

            {/* Aufruf im Artikel */}
            {a.cta && (
              <div className="m-panel m-artikel-cta">
                <h2>{a.cta.titel}</h2>
                <p>{a.cta.text}</p>
                <div className="m-links">
                  <HauptLink gross={false}>Kostenloses Erstgespräch</HauptLink>
                  {a.cta.link && (
                    <RouterLink className="m-tlink" to={a.cta.link.pfad}>{a.cta.link.text} <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
                  )}
                </div>
              </div>
            )}

            {a.faqs && a.faqs.length > 0 && (
              <section className="m-artikel-abschnitt">
                <h2>Häufige Fragen</h2>
                <Fragen eintraege={a.faqs} />
              </section>
            )}

            {/* Über den Autor */}
            <aside className="m-panel m-autor-box" aria-label="Über den Autor">
              <img src={FOTO} alt="" width="72" height="72" loading="lazy" />
              <div>
                <span className="m-label">Über den Autor</span>
                <b>Mark-Antonio Bosnjak</b>
                <p>Applikationsentwickler EFZ, Studium Informatik HF und seit 2022 jeden Tag mit KI. Gründer von MAPSOL in Neftenbach ZH.</p>
                <RouterLink className="m-tlink" to="/ueber-uns">Mehr über mich <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
              </div>
            </aside>
          </article>
        </div>
      </section>

      {weitere.length > 0 && (
        <section className="m-sek">
          <div className="m-wrap">
            <div className="m-kopf">
              <span className="m-label">Weiterlesen</span>
              <h2 className="m-h2">Weitere <span className="m-verlauf">Ratgeber.</span></h2>
            </div>
            <ArtikelKacheln artikel={weitere} ueberschrift="h3" />
          </div>
        </section>
      )}

      <Schluss />
    </Seite>
  );
};

export default RatgeberArtikel;
