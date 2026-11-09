import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from '../ThemeContext';
import { TELEFON, TELEFON_TEXT } from '../components/premium';
import { ZuerichZeit, Vertrauen, Anbindungen, Liniennetz, Ablauf, UeberMich, Kundenstimmen, Fragen, Schluss } from '../components/StartAbschnitte';
import './Start.css';

// Videos: Pexels (Pexels-Lizenz, frei nutzbar), gekürzt auf 12 s, 720p. Zu jedem Video gibt es ein Startbild (.jpg).
// Tagsüber zufällig eines der drei Tagesvideos
const TAG_VIDEOS = [
  'zuerich-grossmuenster', // Pexels 3717997
  'zuerich-limmat', // Pexels 7830799
  'zuerich-tram', // Pexels 34596708
];
// Von November bis Februar ab 16 Uhr bis 7 Uhr morgens: Tram mit Weihnachtsbeleuchtung (Pexels 5990402, 5 s)
const NACHT_VIDEO = 'zuerich-nacht';

// Zürcher Zeit, nicht die des Besuchers
const heroVideo = () => {
  const teile = new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', hour: 'numeric', month: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const wert = (typ) => Number(teile.find((t) => t.type === typ).value);
  const stunde = wert('hour');
  const monat = wert('month');
  const winter = monat >= 11 || monat <= 2;
  if (winter && (stunde >= 16 || stunde < 7)) return NACHT_VIDEO;
  return TAG_VIDEOS[Math.floor(Math.random() * TAG_VIDEOS.length)];
};

const Home = () => {
  const { mode } = useColorMode();
  const ruhig = useReducedMotion();
  const [kopfHoehe, setKopfHoehe] = useState(64);
  // Einmal pro Besuch auswählen, damit das Video beim Scrollen nicht wechselt.
  // Beim Vorrendern (Build) noch keins: sonst lädt der Browser vorab ein Video, das gar nicht gezeigt wird
  const [video] = useState(() => (typeof window === 'undefined' ? null : heroVideo()));
  // Startbild sofort zeigen (auch im vorgerenderten HTML), das Video erst nach dem Laden der Seite:
  // so ist das grösste Element ein leichtes WebP-Bild und nicht ein 3-MB-Video
  const bild = video || 'zuerich-limmat';
  const handy = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  const VIDEO = `/videos/${video}${handy ? '-m' : ''}.mp4`;
  const POSTER = `/videos/${bild}${handy ? '-m' : ''}.webp`;
  const [videoAn, setVideoAn] = useState(false);
  useEffect(() => {
    if (!video) return undefined;
    let t;
    const starten = () => { t = setTimeout(() => setVideoAn(true), 300); };
    if (document.readyState === 'complete') starten();
    else window.addEventListener('load', starten, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('load', starten); };
  }, [video]);

  // Höhe der Navigation messen: das Startbild schiebt sich darunter und füllt den ganzen Bildschirm
  useEffect(() => {
    const kopf = document.querySelector('header');
    if (!kopf) return undefined;
    const messen = () => setKopfHoehe(Math.round(kopf.getBoundingClientRect().height));
    messen();
    window.addEventListener('resize', messen);
    return () => window.removeEventListener('resize', messen);
  }, []);

  return (
    <div className={`m-root${mode === 'light' ? ' ist-hell' : ''}`}>
      <Helmet>
        <title>KI-Automatisierung für KMU in Winterthur & Zürich | MAPSOL</title>
        <meta 
          name="description" 
          content="KI-Automatisierung und Websites für KMU: Belege, E-Mails und Anfragen laufen von selbst. Vom gelernten Informatiker aus Neftenbach bei Winterthur." 
        />
        <meta 
          name="keywords" 
          content="KI-Automatisierung, KI-Beratung, Prozessautomatisierung, Website erstellen lassen, KMU, Winterthur, Zürich" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mapsol.ch/" />
        <meta property="og:title" content="KI-Automatisierung für KMU in Winterthur & Zürich | MAPSOL" />
        <meta property="og:description" content="KI-Automatisierung und Websites für KMU: Belege, E-Mails und Anfragen laufen von selbst. Vom gelernten Informatiker aus Neftenbach bei Winterthur." />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.mapsol.ch/" />
        <meta name="twitter:title" content="KI-Automatisierung für KMU in Winterthur & Zürich | MAPSOL" />
        <meta name="twitter:description" content="KI-Automatisierung und Websites für KMU: Belege, E-Mails und Anfragen laufen von selbst. Vom gelernten Informatiker aus Neftenbach bei Winterthur." />
        <meta name="twitter:image" content="https://www.mapsol.ch/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.mapsol.ch/" />
        
        {/* Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MAPSOL",
            "description": "KI-Automatisierung und Websites für KMU in Winterthur, Zürich und der Deutschschweiz",
            "url": "https://www.mapsol.ch",
            "telephone": "+41-76-310-15-12",
            "address": {
              "@type": "PostalAddress",
              "postalCode": "8413",
              "addressLocality": "Neftenbach",
              "addressRegion": "ZH",
              "addressCountry": "CH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "47.5286",
              "longitude": "8.6656"
            },
            "areaServed": ["Winterthur", "Zürich", "Kanton Zürich", "Deutschschweiz"],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.linkedin.com/company/mapsol",
              "https://github.com/BosnjakM"
            ]
          })}
        </script>
      </Helmet>

      {/* Startbild: Zürich-Video je nach Tageszeit */}
      <section className="m-hero" id="start" style={{ marginTop: -kopfHoehe }}>
        <img
          className="m-bg"
          src={`/videos/${bild}.webp`}
          srcSet={`/videos/${bild}-m.webp 720w, /videos/${bild}.webp 1280w`}
          sizes="100vw"
          fetchpriority="high"
          alt=""
          aria-hidden="true"
        />
        {video && videoAn && !ruhig && (
          <video className="m-bg" autoPlay muted loop playsInline preload="auto" poster={POSTER} aria-hidden="true">
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="m-schatten" aria-hidden="true" />
        <div className="m-wrap m-hero-in" style={{ paddingTop: kopfHoehe + 20 }}>
          <h1 className="m-h1 m-h1-auftritt">
            <span className="m-w" style={{ '--i': 0 }}><span>Weniger</span></span>{' '}
            <span className="m-w" style={{ '--i': 1 }}><span>KI-Gerede.</span></span>
            <br />
            <span className="m-w" style={{ '--i': 2 }}><span>Mehr</span></span>{' '}
            <span className="m-w" style={{ '--i': 3 }}><span className="m-verlauf">Informatik.</span></span>
          </h1>
          <p className="m-lead m-hero-lead">Websites und KI-Automatisierung für KMU, von einem gelernten Informatiker.</p>
          <div className="m-hero-unten">
            <RouterLink className="m-tlink m-tlink-gross" to="/kontakt">Erstgespräch vereinbaren <span className="m-pfeil" aria-hidden="true">→</span></RouterLink>
            <ZuerichZeit />
          </div>
        </div>
      </section>

      <Vertrauen />
      <Anbindungen />
      <Liniennetz />
      <Ablauf />
      <UeberMich />
      <Kundenstimmen />
      <Fragen />
      <Schluss telefon={TELEFON} telefonText={TELEFON_TEXT} />
    </div>
  );
};

export default Home;
