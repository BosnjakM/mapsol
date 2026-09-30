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
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import PlaceIcon from '@mui/icons-material/Place';
import SmsIcon from '@mui/icons-material/Sms';

/*
 * Vorlage für Branchen-Landingpages (/fuer-fahrschulen, /fuer-coiffeure, …).
 * Inhalte kommen aus src/pages/branchen/<name>.json – neue Branche = neue JSON-Datei + Route in App.js.
 * Der <head> (Titel, Beschreibung, canonical) wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 */

const ICONS = {
  handy: PhoneIphoneIcon,
  termin: EventAvailableIcon,
  google: SearchIcon,
  anfragen: NotificationsActiveIcon,
  bewertungen: StarIcon,
  schnell: SpeedIcon,
  menu: RestaurantMenuIcon,
  schere: ContentCutIcon,
  auto: DirectionsCarIcon,
  schule: SchoolIcon,
  ort: PlaceIcon,
  sms: SmsIcon,
};

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

const Icon = ({ name }) => {
  const C = ICONS[name] || CheckCircleIcon;
  return <C fontSize="large" />;
};

const BranchenSeite = ({ daten: d }) => {
  const url = `https://www.mapsol.ch${d.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: d.seo.titel,
        description: d.seo.beschreibung,
        inLanguage: 'de-CH',
        isPartOf: { '@id': 'https://www.mapsol.ch/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mapsol.ch/' },
          { '@type': 'ListItem', position: 2, name: d.seo.breadcrumb, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: d.seo.breadcrumb,
        serviceType: d.seo.serviceType,
        provider: {
          '@type': 'LocalBusiness',
          name: 'MAPSOL',
          url: 'https://www.mapsol.ch',
          telephone: '+41-76-310-15-12',
          email: 'contact@mapsol.ch',
          address: { '@type': 'PostalAddress', addressLocality: 'Zürich', addressCountry: 'CH' },
        },
        areaServed: [
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'AdministrativeArea', name: 'Zürich' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <Box>
      <Helmet>
        <title>{d.seo.titel}</title>
        <meta name="description" content={d.seo.beschreibung} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="MAPSOL" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={d.seo.titel} />
        <meta property="og:description" content={d.seo.beschreibung} />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '88dvh', md: '92dvh' },
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-end' },
          color: 'white',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${d.hero.bild})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            animation: 'heroZoom 18s ease-out forwards',
            '@keyframes heroZoom': { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,6,10,0.45) 0%, rgba(5,6,10,0.55) 40%, rgba(5,6,10,0.9) 100%), linear-gradient(105deg, rgba(5,6,10,0.82) 0%, rgba(5,6,10,0.35) 55%, rgba(5,6,10,0.2) 100%)',
          }}
        />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: BRAND_GRADIENT, zIndex: 2 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pb: { xs: 4, md: 10 }, pt: { xs: 12, md: 16 } }}>
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
              MAPSOL · {d.hero.kicker}
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem' },
                lineHeight: 1,
                letterSpacing: '-0.03em',
                mb: 2.5,
                maxWidth: 820,
                textShadow: '0 4px 40px rgba(0,0,0,0.45)',
              }}
            >
              {d.hero.titel}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.25rem' }, opacity: 0.9, mb: 4, maxWidth: 580, lineHeight: 1.5 }}>
              {d.hero.untertitel}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/termin"
                sx={{ px: 4, py: 1.6, borderRadius: 100, fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 12px 32px rgba(255,85,0,0.35)' }}
              >
                Kostenloses Erstgespräch
              </Button>
              {d.demos && d.demos.length > 0 && (
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
                  Beispiel ansehen
                </Button>
              )}
            </Box>
            <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, opacity: 0.7, maxWidth: 640 }}>
              {d.hero.fusszeile}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* PROBLEME */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
            {d.probleme.titel}
          </Typography>
          <Typography align="center" sx={SECTION_SUB}>
            {d.probleme.text}
          </Typography>
          <Grid container spacing={2}>
            {d.probleme.liste.map((p, i) => (
              <Grid item xs={12} sm={6} key={i}>
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
                  <Typography fontWeight={500}>{p}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* LEISTUNGEN */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(0,136,255,0.04)' }}>
        <Container maxWidth="lg">
          <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
            {d.leistungen.titel}
          </Typography>
          <Typography align="center" sx={SECTION_SUB}>
            {d.leistungen.text}
          </Typography>
          <Grid container spacing={3}>
            {d.leistungen.liste.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  elevation={0}
                  sx={{ height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
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
                      <Icon name={f.icon} />
                    </Box>
                    <Typography component="h3" variant="h6" fontWeight={700} gutterBottom>
                      {f.titel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {f.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* RATGEBER-TEXT (SEO-Inhalt mit Tiefe) */}
      {d.ratgeber && (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="md">
            <Typography component="h2" variant="h3" sx={{ ...SECTION_TITLE, mb: 3 }}>
              {d.ratgeber.titel}
            </Typography>
            {d.ratgeber.abschnitte.map((a, i) => (
              <Box key={i} sx={{ mb: 4 }}>
                <Typography component="h3" variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
                  {a.titel}
                </Typography>
                {a.text.map((t, j) => (
                  <Typography key={j} color="text.secondary" sx={{ lineHeight: 1.75, mb: 1.5 }}>
                    {t}
                  </Typography>
                ))}
              </Box>
            ))}
          </Container>
        </Box>
      )}

      {/* DEMOS */}
      {d.demos && d.demos.length > 0 && (
        <Box component="section" id="demos" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(255,85,0,0.03)', scrollMarginTop: '80px' }}>
          <Container maxWidth="lg">
            <Typography component="h2" variant="h3" align="center" sx={SECTION_TITLE}>
              {d.demosTitel || 'Beispiel-Websites'}
            </Typography>
            <Typography align="center" sx={SECTION_SUB}>
              Fiktive Beispiel-Designs – keine Kundenreferenzen. Antippen zum Öffnen.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {d.demos.map((demo, i) => (
                <Grid item xs={12} sm={6} key={i}>
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
                      '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: { xs: 180, md: 220 }, overflow: 'hidden', bgcolor: '#0b1220' }}>
                      <Box
                        component="iframe"
                        src={demo.url}
                        title={demo.titel}
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
                    </Box>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography component="h3" variant="h6" fontWeight={700} gutterBottom>
                        {demo.titel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {demo.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* AUTOMATISIERUNG */}
      {d.automatisierung && (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={5}>
                <Chip icon={<AutorenewIcon />} label="Der MAPSOL-Unterschied" color="secondary" sx={{ mb: 2, fontWeight: 600 }} />
                <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '1.85rem', md: '2.4rem' }, letterSpacing: '-0.02em' }}>
                  {d.automatisierung.titel}
                </Typography>
                <Typography color="text.secondary">{d.automatisierung.text}</Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                {d.automatisierung.beispiele.map((ex, i) => (
                  <Paper key={i} elevation={0} sx={{ p: 3, mb: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {ex.titel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ex.text}
                    </Typography>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* PREIS + ABLAUF */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'rgba(0,136,255,0.04)' }}>
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
                  {d.preis.label}
                </Typography>
                <Typography component="p" variant="h3" fontWeight={800} sx={{ my: 1 }}>
                  {d.preis.betrag}
                </Typography>
                <Typography sx={{ opacity: 0.95, mb: 3 }}>{d.preis.text}</Typography>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 3 }} />
                {d.preis.inklusive.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
                    <Typography>{item}</Typography>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<ArrowForwardIcon />}
                  component={RouterLink}
                  to="/kontakt"
                  sx={{ mt: 'auto', borderRadius: 100, bgcolor: 'white', color: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                >
                  Jetzt Angebot anfragen
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 4, letterSpacing: '-0.02em' }}>
                So läuft's ab
              </Typography>
              {d.ablauf.map((s, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 3, mb: 3 }}>
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
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {s.titel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography component="h2" variant="h3" align="center" sx={{ ...SECTION_TITLE, mb: 5 }}>
            {d.faqTitel}
          </Typography>
          {d.faqs.map((faq, i) => (
            <Accordion
              key={i}
              elevation={0}
              disableGutters
              sx={{ mb: 1.5, borderRadius: '8px !important', border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="h3" fontWeight={600}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* WEITERE BRANCHEN (interne Verlinkung) */}
      {d.verwandt && d.verwandt.length > 0 && (
        <Box component="section" sx={{ pb: { xs: 8, md: 10 } }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>Auch für andere Branchen:</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
              {d.verwandt.map((v) => (
                <Chip key={v.pfad} label={v.name} component={RouterLink} to={v.pfad} clickable variant="outlined" />
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* FINAL CTA */}
      <Box component="section" sx={{ background: BRAND_GRADIENT, color: 'white', py: { xs: 8, md: 12 }, px: 2, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.02em' }}>
            {d.cta}
          </Typography>
          <Typography sx={{ opacity: 0.95, mb: 4, maxWidth: 600, mx: 'auto', fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
            Kostenloses Erstgespräch – 15 Minuten, unverbindlich. Danach wissen Sie genau, was möglich ist und was es kostet.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            endIcon={<ArrowForwardIcon />}
            component={RouterLink}
            to="/termin"
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 100,
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.92)' },
            }}
          >
            Jetzt Erstgespräch sichern
          </Button>
          <Typography sx={{ mt: 3, opacity: 0.9 }}>
            Oder direkt anrufen:{' '}
            <Box component="a" href="tel:+41763101512" sx={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              +41 76 310 15 12
            </Box>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default BranchenSeite;
