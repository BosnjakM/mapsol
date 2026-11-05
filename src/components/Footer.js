import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '../ThemeContext';
import Logo from './Logo';
import { TELEFON, TELEFON_TEXT } from './premium';
import '../pages/Start.css';
import './Seite.css';

// Fusszeile im Stil der Startseite: ruhige Linkspalten, feine Linien, Textlinks
const SPALTEN = [
  {
    titel: 'Leistungen',
    links: [
      { name: 'KI-Automatisierung für KMU', pfad: '/automatisierung-fuer-kmu' },
      { name: 'KI in Winterthur & Zürich', pfad: '/ki-automatisierung-winterthur' },
      { name: 'Website erstellen lassen', pfad: '/website-erstellen-lassen' },
      { name: 'SEO für KMU', pfad: '/seo-fuer-kmu' },
      { name: 'Google-Profil einrichten', pfad: '/google-unternehmensprofil-einrichten-lassen' },
      { name: 'Website-Check', pfad: '/website-check' },
    ],
  },
  {
    titel: 'Branchen',
    links: [
      { name: 'Garagen', pfad: '/fuer-garagen' },
      { name: 'SEO für Garagen', pfad: '/seo-fuer-garagen' },
      { name: 'Handwerker', pfad: '/fuer-handwerker' },
      { name: 'Arztpraxen', pfad: '/fuer-arztpraxen' },
      { name: 'Fahrschulen', pfad: '/fuer-fahrschulen' },
      { name: 'Coiffeure', pfad: '/fuer-coiffeure' },
      { name: 'Restaurants', pfad: '/fuer-restaurants' },
    ],
  },
  {
    titel: 'MAPSOL',
    links: [
      { name: 'Über uns', pfad: '/ueber-uns' },
      { name: 'Ratgeber', pfad: '/ratgeber' },
      { name: 'Kontakt', pfad: '/kontakt' },
    ],
  },
  {
    titel: 'Rechtliches',
    links: [
      { name: 'Impressum', pfad: '/impressum' },
      { name: 'Datenschutz', pfad: '/datenschutz' },
      { name: 'AGB', pfad: '/agb' },
    ],
  },
];

const Footer = () => {
  const { mode } = useColorMode();
  const hell = mode === 'light';
  return (
    <footer className={`m-root m-fuss${hell ? ' ist-hell' : ''}`}>
      <div className="m-wrap">
        <div className="m-fuss-oben">
          <div className="m-fuss-marke">
            <Logo hell={!hell} />
            <p>KI-Automatisierung und Websites für KMU in der Schweiz.</p>
            <div className="m-fuss-kontakt">
              <a className="m-tlink" href="mailto:contact@mapsol.ch">contact@mapsol.ch</a>
              <a className="m-tlink" href={`tel:${TELEFON}`}>{TELEFON_TEXT}</a>
            </div>
          </div>
          {SPALTEN.map((s) => (
            <nav className="m-fuss-spalte" key={s.titel} aria-label={s.titel}>
              <span className="m-label">{s.titel}</span>
              <ul>
                {s.links.map((l) => (
                  <li key={l.pfad}><RouterLink to={l.pfad}>{l.name}</RouterLink></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="m-fuss-unten">
          <span>© {new Date().getFullYear()} Mark-Antonio Bosnjak</span>
          <span>
            In Partnerschaft mit{' '}
            <a href="https://www.laki-development.ch/?utm_source=mapsol&utm_medium=referral&utm_campaign=partner" target="_blank" rel="noopener noreferrer">Laki Development</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
