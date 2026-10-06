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
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { BLAU, ORANGE, GRADIENT, EASE, TELEFON, TELEFON_TEXT, FOTO, ctaSx, glasButtonSx, useReveal, Kopf, Aurora } from '../components/premium';

/*
 * Vorlage für Branchen-Landingpages (/fuer-fahrschulen, /fuer-coiffeure, …).
 * Inhalte kommen aus src/pages/branchen/<name>.json – neue Branche = neue JSON-Datei + Route in App.js.
 * Der <head> (Titel, Beschreibung, canonical) wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 * Gestaltung wie die übrigen Landingpages (src/components/premium.js): echtes Foto oben, danach hell/dunkel nach Theme.
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

const Icon = ({ name, ...props }) => {
  const C = ICONS[name] || CheckCircleIcon;
  return <C {...props} />;
};

const BranchenSeite = ({ daten: d }) => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const ref = useRef(null);
  useReveal(ref);
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
        '@keyframes bsFadeUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
      }}
    >
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

      {/* KOPFBEREICH: echtes Foto der Branche */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: '82dvh', md: '86dvh' },
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-end' },
          color: '#fff',
          overflow: 'hidden',
          bgcolor: '#0a0a0f',
        }}
      >
        <Box
          aria-hidden
          sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${d.hero.bild})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }}
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pb: { xs: 5, md: 10 }, pt: { xs: 12, md: 16 } }}>
          <Box sx={{ animation: `bsFadeUp .9s ${EASE} both` }}>
            <Typography sx={{ fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.78rem', textTransform: 'uppercase', color: '#4da9ff', mb: 2.5 }}>
              {d.hero.kicker}
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.4rem', sm: '3.3rem', md: '4.3rem' },
                lineHeight: { xs: 1.06, md: 1.02 },
                letterSpacing: '-0.035em',
                maxWidth: 820,
              }}
            >
              {d.hero.titel}
            </Typography>
            <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, my: { xs: 3, md: 3.5 } }} />
            <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.86)', mb: 4, maxWidth: 600, lineHeight: 1.6 }}>
              {d.hero.untertitel}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={ctaSx}>
                Kostenloses Erstgespräch
              </Button>
              {d.demos && d.demos.length > 0 && (
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
                  Beispiel ansehen
                </Button>
              )}
            </Box>
            <Typography sx={{ fontSize: { xs: '0.82rem', md: '0.9rem' }, color: 'rgba(255,255,255,0.7)', maxWidth: 640 }}>
              {d.hero.fusszeile}
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
                <Kopf eyebrow="Ausgangslage" titel={d.probleme.titel} text={d.probleme.text} align="left" />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {d.probleme.liste.map((p, i) => (
                <Box
                  key={i}
                  data-reveal
                  style={{ transitionDelay: `${i * 50}ms` }}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2.5, py: 2.4, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: alpha(ORANGE, 0.12), color: ORANGE }}>
                    <CloseIcon sx={{ fontSize: 17 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.5 }}>{p}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* LEISTUNGEN */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="lg">
          <Kopf eyebrow="Leistungen" titel={d.leistungen.titel} text={d.leistungen.text} />
          <Grid container spacing={2.5}>
            {d.leistungen.liste.map((f, i) => (
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
                    <Icon name={f.icon} sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em', mb: 1 }}>
                    {f.titel}
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

      {/* RATGEBER-TEXT (SEO-Inhalt mit Tiefe) */}
      {d.ratgeber && (
        <Box component="section" sx={abschnitt}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 2, md: 8 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                  <Kopf eyebrow="Wissen" titel={d.ratgeber.titel} align="left" />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                {d.ratgeber.abschnitte.map((a, i) => (
                  <Box key={i} data-reveal sx={{ mb: 5, pl: { md: 3 }, borderLeft: { md: '2px solid' }, borderColor: { md: 'divider' } }}>
                    <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.4rem' }, letterSpacing: '-0.02em', mb: 1.5 }}>
                      {a.titel}
                    </Typography>
                    {a.text.map((t, j) => (
                      <Typography key={j} color="text.secondary" sx={{ lineHeight: 1.8, mb: 1.5, fontSize: { md: '1.05rem' } }}>
                        {t}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* DEMOS */}
      {d.demos && d.demos.length > 0 && (
        <Box component="section" id="demos" sx={{ ...abschnitt, bgcolor: getoent, scrollMarginTop: '80px' }}>
          <Container maxWidth="lg">
            <Kopf eyebrow="Beispiele" titel={d.demosTitel || 'Beispiel-Websites'} text="Fiktive Beispiel-Designs – keine Kundenreferenzen. Antippen zum Öffnen." />
            <Grid container spacing={3} justifyContent="center">
              {d.demos.map((demo, i) => (
                <Grid item xs={12} sm={6} key={i} data-reveal>
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
                    <Box sx={{ position: 'relative', height: { xs: 180, md: 220 }, overflow: 'hidden', bgcolor: '#0a0a0f' }}>
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
                    <Box sx={{ p: 3 }}>
                      <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 0.5 }}>
                        {demo.titel}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                        {demo.text}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* AUTOMATISIERUNG */}
      {d.automatisierung && (
        <Box component="section" sx={abschnitt}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 4, md: 8 }}>
              <Grid item xs={12} md={5}>
                <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                  <Kopf eyebrow="Der MAPSOL-Unterschied" titel={d.automatisierung.titel} text={d.automatisierung.text} align="left" />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                {d.automatisierung.beispiele.map((ex, i) => (
                  <Box key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }} sx={{ ...karte, height: 'auto', p: { xs: 3, md: 3.5 }, mb: 2, display: 'flex', gap: 2.5 }}>
                    <Box sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#fff', bgcolor: 'primary.main' }}>
                      {i + 1}
                    </Box>
                    <Box>
                      <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 0.5 }}>
                        {ex.titel}
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
      )}

      {/* PREIS + ABLAUF */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5} data-reveal>
              <Box sx={{ borderRadius: '24px', overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', boxShadow: dunkel ? 'none' : '0 30px 70px -45px rgba(15,23,42,0.45)' }}>
                <Box aria-hidden sx={{ height: 6, background: GRADIENT }} />
                <Box sx={{ p: { xs: 4, md: 5 } }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'text.secondary', mb: 1.5 }}>
                    {d.preis.label}
                  </Typography>
                  <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '2.6rem', md: '3.2rem' }, letterSpacing: '-0.04em', lineHeight: 1, mb: 1.5 }}>
                    {d.preis.betrag}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6 }}>
                    {d.preis.text}
                  </Typography>
                  {d.preis.inklusive.map((item) => (
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
                {d.ablauf.map((s, i) => (
                  <Box key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }} sx={{ position: 'relative', display: 'flex', gap: 3, mb: 3.5 }}>
                    <Box sx={{ position: 'relative', width: 44, height: 44, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 800, color: '#fff', bgcolor: 'primary.main' }}>
                      {i + 1}
                    </Box>
                    <Box sx={{ pt: 0.4 }}>
                      <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 0.5 }}>
                        {s.titel}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {s.text}
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
      <Box component="section" sx={abschnitt}>
        <Container maxWidth="md">
          <Kopf eyebrow="FAQ" titel={d.faqTitel} />
          {d.faqs.map((faq, i) => (
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
                  <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}

          {/* WEITERE BRANCHEN (interne Verlinkung) */}
          {d.verwandt && d.verwandt.length > 0 && (
            <Box data-reveal sx={{ textAlign: 'center', mt: 8 }}>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>Auch für andere Branchen:</Typography>
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {d.verwandt.map((v) => (
                  <Chip
                    key={v.pfad}
                    label={v.name}
                    component={RouterLink}
                    to={v.pfad}
                    clickable
                    variant="outlined"
                    sx={{ borderRadius: 100, px: 1, py: 2.4, fontWeight: 600, '&:hover': { borderColor: BLAU, color: BLAU } }}
                  />
                ))}
              </Box>
            </Box>
          )}
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
                {d.cta}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 620, mx: 'auto', mb: 5 }}>
                Kostenloses Erstgespräch – 15 Minuten, unverbindlich. Danach wissen Sie genau, was möglich ist und was es kostet.
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

export default BranchenSeite;
