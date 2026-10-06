import React, { useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { BLAU, ORANGE, GRADIENT, EASE, TELEFON, TELEFON_TEXT, FOTO, ctaSx, glasButtonSx, useReveal, Kopf, Aurora } from '../components/premium';

// Gestaltung wie die übrigen Landingpages (src/components/premium.js): echtes Foto oben, danach hell/dunkel nach Theme.

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
    icon: <PhoneIphoneIcon sx={{ fontSize: 26 }} />,
    title: 'Modern & mobil',
    text: 'Ein Auftritt, der auf Handy, Tablet und Desktop perfekt aussieht und Vertrauen schafft.',
  },
  {
    icon: <DirectionsCarIcon sx={{ fontSize: 26 }} />,
    title: 'Occasionen-Galerie',
    text: 'Ihre Fahrzeuge werden ansprechend präsentiert – mit Bildern, Details und Anfrage-Button.',
  },
  {
    icon: <EventAvailableIcon sx={{ fontSize: 26 }} />,
    title: 'Online-Terminbuchung',
    text: 'Kunden buchen Service, Reifenwechsel oder Probefahrt direkt online – rund um die Uhr.',
  },
  {
    icon: <SearchIcon sx={{ fontSize: 26 }} />,
    title: 'Bei Google gefunden',
    text: 'Lokal optimiert, damit Kunden aus Ihrer Region Sie finden – nicht die Konkurrenz.',
  },
  {
    icon: <BuildIcon sx={{ fontSize: 26 }} />,
    title: 'Services klar dargestellt',
    text: 'Reparatur, Service, MFK, Reifen – alles verständlich, damit Kunden sofort wissen, was Sie bieten.',
  },
  {
    icon: <NotificationsActiveIcon sx={{ fontSize: 26 }} />,
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

const Garagen = () => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const ref = useRef(null);
  useReveal(ref);

  const abschnitt = { py: { xs: 9, md: 13 }, position: 'relative' };
  const getoent = dunkel ? 'background.paper' : '#f6f8fc';
  const karte = {
    height: '100%',
    p: { xs: 3.5, md: 4 },
    borderRadius: '20px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
  };

  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        '& [data-reveal]': { transition: `opacity .8s ${EASE}, transform .8s ${EASE}` },
        '& .pl-pre': { opacity: 0, transform: 'translateY(28px)' },
        '@keyframes gaFadeUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
      }}
    >
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

      {/* KOPFBEREICH: echtes Werkstatt-Foto */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: '86dvh', md: '92dvh' },
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-end' },
          color: '#fff',
          overflow: 'hidden',
          bgcolor: '#0a0a0f',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: { xs: '68% center', md: 'center 35%' },
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.55) 45%, rgba(10,10,15,0.92) 100%), linear-gradient(100deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.35) 60%, rgba(10,10,15,0.15) 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pb: { xs: 5, md: 10 }, pt: { xs: 12, md: 16 }, width: '100%' }}>
          <Box sx={{ animation: `gaFadeUp .9s ${EASE} both` }}>
            <Typography sx={{ fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.78rem', textTransform: 'uppercase', color: '#4da9ff', mb: 2.5 }}>
              Für Garagen und Autohändler
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.6rem' },
                lineHeight: { xs: 1.04, md: 1 },
                letterSpacing: '-0.035em',
                maxWidth: 780,
              }}
            >
              Die moderne Website
              <br />
              für Ihre Garage
            </Typography>
            <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, my: { xs: 3, md: 3.5 } }} />
            <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.86)', mb: 4, maxWidth: 540, lineHeight: 1.6 }}>
              Mehr Anfragen, Online-Terminbuchung, Occasionen online —
              Fixpreis, in rund 2 Wochen live.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={ctaSx}>
                Kostenloses Erstgespräch
              </Button>
              <Button
                size="large"
                endIcon={<LaunchIcon />}
                href="#demos"
                sx={{
                  ...glasButtonSx,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.4)',
                  '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                Live-Demos ansehen
              </Button>
            </Box>
            <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.9rem' }, color: 'rgba(255,255,255,0.7)', maxWidth: 640 }}>
              Fixpreis · ca. 2 Wochen · Occasionen & Terminbuchung · Zürich
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* PROBLEME */}
      <Box component="section" sx={abschnitt}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Kopf
                  eyebrow="Ausgangslage"
                  titel="Kennen Sie das aus Ihrer Garage?"
                  text="Viele Garagen und Autohändler in der Schweiz verlieren Anfragen – nicht wegen der Arbeit, sondern wegen einer veralteten oder fehlenden Website."
                  align="left"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {painPoints.map((point, i) => (
                <Box
                  key={i}
                  data-reveal
                  style={{ transitionDelay: `${i * 50}ms` }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2.5, py: 2.4, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: alpha(ORANGE, 0.12), color: ORANGE }}>
                    <CloseIcon sx={{ fontSize: 17 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.5 }}>{point}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* LEISTUNGEN */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="lg">
          <Kopf
            eyebrow="Leistungen"
            titel="Ihre Garage-Website – das ist drin"
            text="Speziell für Garagen und Autohändler: mobil, klar und darauf ausgelegt, mehr Termine und Fahrzeuganfragen zu holen."
          />
          <Grid container spacing={2.5}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={i} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <Box sx={{ ...karte, transition: `transform .3s ${EASE}, border-color .3s`, '&:hover': { transform: 'translateY(-3px)', borderColor: alpha(BLAU, 0.45) } }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: alpha(BLAU, dunkel ? 0.18 : 0.1),
                      color: 'primary.main',
                      mb: 2.5,
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em', mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {f.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BEISPIELE: kompakte Vorschau-Karten (kein Scroll-Konflikt) */}
      <Box component="section" id="demos" sx={{ ...abschnitt, scrollMarginTop: '80px' }}>
        <Container maxWidth="lg">
          <Kopf
            eyebrow="Beispiele"
            titel="Beispiel-Websites für Garagen"
            text="Fiktive Beispiel-Designs — keine Kundenreferenzen. Tippen zum Öffnen der Live-Demo."
          />
          <Grid container spacing={3}>
            {demos.map((demo, i) => (
              <Grid item xs={12} sm={6} key={i} data-reveal style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                <Box
                  component="a"
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    transition: `transform .3s ${EASE}, border-color .3s`,
                    '&:hover': { transform: 'translateY(-3px)', borderColor: alpha(BLAU, 0.45) },
                  }}
                >
                  <Box sx={{ position: 'relative', height: { xs: 180, md: 220 }, overflow: 'hidden', bgcolor: '#0a0a0f', borderBottom: '1px solid', borderColor: 'divider' }}>
                    {/* Verkleinerte Vorschau – pointerEvents none, damit die Seite normal scrollt */}
                    <Box
                      component="iframe"
                      src={demo.url}
                      title={demo.title}
                      loading="lazy"
                      tabIndex={-1}
                      sx={{
                        border: 'none',
                        width: '200%',
                        height: '200%',
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        pointerEvents: 'none',
                      }}
                    />
                    <Box sx={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', alignItems: 'center', gap: 0.6, px: 1.4, py: 0.6, borderRadius: 100, bgcolor: 'rgba(10,10,15,0.75)', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                      <LaunchIcon sx={{ fontSize: 15 }} />
                      Live öffnen
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 0.5 }}>
                      {demo.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                      {demo.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AUTOMATISIERUNG */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Kopf
                  eyebrow="Der MAPSOL-Unterschied"
                  titel="Nicht nur schön – sondern automatisch"
                  text="Andere bauen Ihnen eine Website. Wir verbinden sie mit Ihren Abläufen, damit im Hintergrund automatisch Arbeit erledigt wird – das spart Ihnen jede Woche Zeit."
                  align="left"
                />
                <Button component={RouterLink} to="/kontakt" endIcon={<ArrowForwardIcon />} sx={{ ...glasButtonSx, mt: { xs: -2, md: -3 } }}>
                  Automatisierung besprechen
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {automationExamples.map((ex, i) => (
                <Box key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }} sx={{ ...karte, height: 'auto', p: { xs: 3, md: 3.5 }, mb: 2, display: 'flex', gap: 2.5 }}>
                  <Box sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#fff', bgcolor: 'primary.main' }}>
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 0.5 }}>
                      {ex.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {ex.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PREIS + ABLAUF */}
      <Box component="section" sx={abschnitt}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5} data-reveal>
              <Box sx={{ borderRadius: '24px', overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: dunkel ? 'none' : '0 30px 70px -45px rgba(15,23,42,0.45)' }}>
                <Box aria-hidden sx={{ height: 6, background: GRADIENT }} />
                <Box sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'text.secondary', mb: 1.5 }}>
                    Garage-Website Schweiz
                  </Typography>
                  <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '2.6rem', md: '3.2rem' }, letterSpacing: '-0.04em', lineHeight: 1, mb: 1.5 }}>
                    ab CHF 999
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6 }}>
                    Fixpreis, keine versteckten Kosten. Optional mit Automatisierung & Wartung.
                  </Typography>
                  {['Individuelles, modernes Design', 'Occasionen-Galerie', 'Online-Terminbuchung', 'Google- & Handy-optimiert', 'Einweisung inklusive'].map((item) => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.3, mb: 1.5 }}>
                      <CheckIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                      <Typography sx={{ fontWeight: 500 }}>{item}</Typography>
                    </Box>
                  ))}
                  <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, mt: 3 }}>
                    Jetzt Angebot anfragen
                  </Button>
                  <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.85rem', color: 'text.secondary' }}>Erstgespräch kostenlos und unverbindlich</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Kopf eyebrow="Ablauf" titel="So läuft's ab" align="left" />
              <Box sx={{ position: 'relative' }}>
                <Box aria-hidden sx={{ position: 'absolute', left: 21, top: 12, bottom: 12, width: 2, bgcolor: 'divider' }} />
                {steps.map((step, i) => (
                  <Box key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }} sx={{ position: 'relative', display: 'flex', gap: 3, mb: 3.5 }}>
                    <Box sx={{ position: 'relative', width: 44, height: 44, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, color: '#fff', bgcolor: 'primary.main' }}>
                      {i + 1}
                    </Box>
                    <Box sx={{ pt: 0.4 }}>
                      <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 0.5 }}>
                        {step.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {step.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="md">
          <Kopf eyebrow="FAQ" titel="Häufige Fragen zur Garage-Website" />
          {faqs.map((faq, i) => (
            <Box key={i} data-reveal style={{ transitionDelay: `${Math.min(i, 4) * 50}ms` }}>
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  mb: 1.5,
                  borderRadius: '16px !important',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: alpha(BLAU, 0.45) },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Container>
      </Box>

      {/* INTERNE LINKS */}
      <Box component="section" sx={{ pt: { xs: 9, md: 11 }, pb: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography sx={{ color: 'text.secondary', mb: 2.5 }}>
            Sie möchten vor allem bei Google besser gefunden werden?{' '}
            <Box component={RouterLink} to="/seo-fuer-garagen" sx={{ color: 'primary.main', fontWeight: 700 }}>
              SEO für Garagen & Autohäuser →
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              ['Fahrschulen', '/fuer-fahrschulen'],
              ['Coiffeure', '/fuer-coiffeure'],
              ['Restaurants', '/fuer-restaurants'],
            ].map(([n, pfad]) => (
              <Chip
                key={pfad}
                label={`Website für ${n}`}
                component={RouterLink}
                to={pfad}
                clickable
                variant="outlined"
                sx={{ borderRadius: 100, px: 1, py: 2.4, fontWeight: 600, '&:hover': { borderColor: BLAU, color: BLAU } }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* SCHLUSS */}
      <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            data-reveal
            sx={{
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              borderRadius: '32px',
              px: { xs: 3, md: 8 },
              py: { xs: 7, md: 10 },
              bgcolor: dunkel ? 'background.paper' : alpha(BLAU, 0.05),
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Aurora staerke={0.7} />
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={FOTO} alt="" aria-hidden width={64} height={64} loading="lazy" sx={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', mb: 3, boxShadow: `0 0 0 3px ${alpha(BLAU, 0.25)}` }} />
              <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' }, lineHeight: 1.1, letterSpacing: '-0.035em', mb: 2.5 }}>
                Bereit für eine Website, die Kunden bringt?
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 620, mx: 'auto', mb: 5 }}>
                Kostenloses Erstgespräch – 15 Minuten, unverbindlich. Danach wissen Sie genau, was
                möglich ist und was es kostet.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, px: { xs: 4, sm: 5 }, py: 1.8, fontSize: '1.08rem' }}>
                  Jetzt Erstgespräch sichern
                </Button>
                <Button size="large" startIcon={<PhoneIcon />} href={`tel:${TELEFON}`} sx={glasButtonSx}>
                  {TELEFON_TEXT}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Garagen;
