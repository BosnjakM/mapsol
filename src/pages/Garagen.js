import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const BRAND_GRADIENT = 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)';
const SECTION_TITLE = {
  fontWeight: 800,
  fontSize: { xs: '1.85rem', md: '2.6rem' },
  letterSpacing: '-0.02em',
  mb: 1.5,
};
const SECTION_SUB = {
  color: 'text.secondary',
  maxWidth: 680,
  mx: 'auto',
  mb: 6,
  fontSize: { xs: '1rem', md: '1.1rem' },
  lineHeight: 1.6,
};

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
    icon: <PhoneIphoneIcon fontSize="large" />,
    title: 'Modern & mobil',
    text: 'Ein Auftritt, der auf Handy, Tablet und Desktop perfekt aussieht und Vertrauen schafft.',
  },
  {
    icon: <DirectionsCarIcon fontSize="large" />,
    title: 'Occasionen-Galerie',
    text: 'Ihre Fahrzeuge werden ansprechend präsentiert – mit Bildern, Details und Anfrage-Button.',
  },
  {
    icon: <EventAvailableIcon fontSize="large" />,
    title: 'Online-Terminbuchung',
    text: 'Kunden buchen Service, Reifenwechsel oder Probefahrt direkt online – rund um die Uhr.',
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: 'Bei Google gefunden',
    text: 'Lokal optimiert, damit Kunden aus Ihrer Region Sie finden – nicht die Konkurrenz.',
  },
  {
    icon: <BuildIcon fontSize="large" />,
    title: 'Services klar dargestellt',
    text: 'Reparatur, Service, MFK, Reifen – alles verständlich, damit Kunden sofort wissen, was Sie bieten.',
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" />,
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
  return (
    <Box>
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

      {/* HERO — full-bleed, cinematic */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100dvh',
          height: '100dvh',
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-end' },
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: { xs: '68% center', md: 'center 35%' },
            transform: 'scale(1.04)',
            animation: 'heroZoom 18s ease-out forwards',
            '@keyframes heroZoom': {
              from: { transform: 'scale(1.08)' },
              to: { transform: 'scale(1)' },
            },
          }}
        />
        {/* Dark gradient overlay for readability */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,6,10,0.45) 0%, rgba(5,6,10,0.55) 40%, rgba(5,6,10,0.88) 100%), linear-gradient(105deg, rgba(5,6,10,0.82) 0%, rgba(5,6,10,0.35) 55%, rgba(5,6,10,0.2) 100%)',
          }}
        />
        {/* Brand accent line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: BRAND_GRADIENT,
            zIndex: 2,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            pb: { xs: 4, md: 10 },
            pt: { xs: 10, md: 16 },
            width: '100%',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: '0.28em',
                fontSize: { xs: '0.75rem', md: '0.85rem' },
                mb: 2.5,
                background: BRAND_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MAPSOL
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.6rem', sm: '3.6rem', md: '5rem' },
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                mb: 2.5,
                maxWidth: 780,
                textShadow: '0 4px 40px rgba(0,0,0,0.45)',
              }}
            >
              Die moderne Website
              <br />
              für Ihre Garage
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: '1.05rem', md: '1.25rem' },
                opacity: 0.88,
                mb: 4,
                maxWidth: 520,
                lineHeight: 1.5,
              }}
            >
              Mehr Anfragen, Online-Terminbuchung, Occasionen online —
              Fixpreis, in rund 2 Wochen live.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/kontakt"
                sx={{
                  px: 4,
                  py: 1.6,
                  borderRadius: 100,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  boxShadow: '0 12px 32px rgba(255,85,0,0.35)',
                }}
              >
                Kostenloses Erstgespräch
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<LaunchIcon />}
                href="#demos"
                sx={{
                  px: 4,
                  py: 1.6,
                  borderRadius: 100,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.45)',
                  fontWeight: 600,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                Live-Demos ansehen
              </Button>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                opacity: 0.65,
                letterSpacing: '0.02em',
                maxWidth: 640,
              }}
            >
              Fixpreis · ca. 2 Wochen · Occasionen & Terminbuchung · Zürich
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* PAIN POINTS */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
            Kennen Sie das aus Ihrer Garage?
          </Typography>
          <Typography align="center" sx={SECTION_SUB}>
            Viele Garagen und Autohändler in der Schweiz verlieren Anfragen – nicht wegen der Arbeit,
            sondern wegen einer veralteten oder fehlenden Website.
          </Typography>
          <Grid container spacing={2}>
            {painPoints.map((point, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      transition: 'border-color 0.2s, background 0.2s',
                      '&:hover': { borderColor: 'rgba(255,85,0,0.35)', bgcolor: 'rgba(255,85,0,0.03)' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,85,0,0.12)',
                        color: 'secondary.main',
                        display: 'grid',
                        placeItems: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography fontWeight={500}>{point}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(0,136,255,0.04)' }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
            Ihre Garage-Website – das ist drin
          </Typography>
          <Typography align="center" sx={SECTION_SUB}>
            Speziell für Garagen und Autohändler: mobil, klar und darauf ausgelegt, mehr Termine und
            Fahrzeuganfragen zu holen.
          </Typography>
          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 36px rgba(0,0,0,0.08)' },
                    }}
                  >
                    <CardContent sx={{ p: 3.5 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: BRAND_GRADIENT,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography component="h3" variant="h6" fontWeight={700} gutterBottom>
                        {f.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                        {f.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* LIVE DEMOS — kompakte Vorschau-Karten (kein Scroll-Konflikt) */}
      <Box component="section" id="demos" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: '80px' }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
            Beispiel-Websites für Garagen
          </Typography>
          <Typography align="center" sx={SECTION_SUB}>
            Fiktive Beispiel-Designs — keine Kundenreferenzen. Tippen zum Öffnen der Live-Demo.
          </Typography>
          <Grid container spacing={3}>
            {demos.map((demo, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card
                    elevation={0}
                    component="a"
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: { xs: 180, md: 220 },
                        overflow: 'hidden',
                        bgcolor: '#0b1220',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {/* Scaled preview — pointerEvents none = kein Scroll-Salat */}
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
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                          p: 1.5,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)',
                        }}
                      >
                        <Chip
                          size="small"
                          icon={<LaunchIcon sx={{ color: 'white !important', fontSize: '16px !important' }} />}
                          label="Live öffnen"
                          sx={{ bgcolor: 'rgba(0,0,0,0.65)', color: 'white', fontWeight: 600 }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography component="h3" variant="h6" fontWeight={700} gutterBottom>
                        {demo.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {demo.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AUTOMATION UPSELL */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(255,85,0,0.04)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip
                icon={<AutorenewIcon />}
                label="Der MAPSOL-Unterschied"
                color="secondary"
                sx={{ mb: 2, fontWeight: 600 }}
              />
              <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '1.85rem', md: '2.4rem' }, letterSpacing: '-0.02em' }}>
                Nicht nur schön – sondern automatisch
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Andere bauen Ihnen eine Website. Wir verbinden sie mit Ihren Abläufen, damit im
                Hintergrund automatisch Arbeit erledigt wird – das spart Ihnen jede Woche Zeit.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/kontakt"
                sx={{ borderRadius: 100, px: 3, py: 1.2, mt: 1 }}
              >
                Automatisierung besprechen
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {automationExamples.map((ex, i) => (
                  <Grid item xs={12} key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                          {ex.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ex.text}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PRICE + PROCESS */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3.5, md: 4.5 },
                  height: '100%',
                  borderRadius: 4,
                  color: 'white',
                  background: BRAND_GRADIENT,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 50px rgba(0,136,255,0.25)',
                }}
              >
                <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.5, fontWeight: 700 }}>
                  Garage-Website Schweiz
                </Typography>
                <Typography component="p" variant="h3" fontWeight={800} sx={{ my: 1 }}>
                  ab CHF 999
                </Typography>
                <Typography sx={{ opacity: 0.95, mb: 3 }}>
                  Fixpreis, keine versteckten Kosten. Optional mit Automatisierung & Wartung.
                </Typography>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 3 }} />
                {['Individuelles, modernes Design', 'Occasionen-Galerie', 'Online-Terminbuchung', 'Google- & Handy-optimiert', 'Einweisung inklusive'].map(
                  (item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <CheckCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      <Typography>{item}</Typography>
                    </Box>
                  )
                )}
                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<ArrowForwardIcon />}
                  component={RouterLink}
                  to="/kontakt"
                  sx={{
                    mt: 'auto',
                    borderRadius: 100,
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                  }}
                >
                  Jetzt Angebot anfragen
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
                So läuft's ab
              </Typography>
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        lineHeight: 1,
                        color: 'transparent',
                        background: BRAND_GRADIENT,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        minWidth: 56,
                      }}
                    >
                      {step.n}
                    </Typography>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.text}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(0,136,255,0.04)' }}>
        <Container maxWidth="md">
          <Typography component="h2" variant="h3" align="center" sx={{ ...SECTION_TITLE, mb: 5 }}>
            Häufige Fragen zur Garage-Website
          </Typography>
          {faqs.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              disableGutters
              sx={{
                mb: 1.5,
                borderRadius: '8px !important',
                border: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* FINAL CTA */}
      <Box
        component="section"
        sx={{ background: BRAND_GRADIENT, color: 'white', py: { xs: 8, md: 12 }, px: 2, textAlign: 'center' }}
      >
        <Container maxWidth="md">
          <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.02em' }}>
            Bereit für eine Website, die Kunden bringt?
          </Typography>
          <Typography sx={{ fontWeight: 400, opacity: 0.95, mb: 4, maxWidth: 600, mx: 'auto', fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
            Kostenloses Erstgespräch – 15 Minuten, unverbindlich. Danach wissen Sie genau, was
            möglich ist und was es kostet.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            endIcon={<ArrowForwardIcon />}
            component={RouterLink}
            to="/kontakt"
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 100,
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
            }}
          >
            Jetzt Erstgespräch sichern
          </Button>
          <Typography sx={{ mt: 3, opacity: 0.9 }}>
            Oder direkt anrufen:{' '}
            <Box
              component="a"
              href="tel:+41763101512"
              sx={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              +41 76 310 15 12
            </Box>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Garagen;
