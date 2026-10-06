import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid, Button, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import SpeedIcon from '@mui/icons-material/Speed';
import InsightsIcon from '@mui/icons-material/Insights';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BoltIcon from '@mui/icons-material/Bolt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WorkIcon from '@mui/icons-material/Work';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import HandymanIcon from '@mui/icons-material/Handyman';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import YardIcon from '@mui/icons-material/Yard';
import RoofingIcon from '@mui/icons-material/Roofing';
import ConstructionIcon from '@mui/icons-material/Construction';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalculateIcon from '@mui/icons-material/Calculate';
import GridViewIcon from '@mui/icons-material/GridView';
import { BLAU, ORANGE, GRADIENT, EASE, TELEFON, TELEFON_TEXT, FOTO, ctaSx, glasButtonSx, useReveal, Kopf, Aurora } from '../components/premium';

/*
 * Landingpage-Vorlage (z. B. /seo-fuer-kmu, /fuer-handwerker), im Stil der Startseite:
 * hell/dunkel nach Theme, Blau und Orange als feste Akzente, echtes Foto statt nachgebauter Geräte.
 * Inhalte kommen aus src/pages/landing/<name>.json – neue Seite = JSON-Datei + Eintrag in src/pages/landing/index.js.
 * Der <head> wird beim Build zusätzlich vorgerendert (scripts/prerender-heads.js).
 * Alle Texte stehen sofort im HTML (für Google). Animationen laufen erst im Browser.
 */

const ICONS = {
  suche: SearchIcon,
  ort: PlaceIcon,
  schnell: SpeedIcon,
  messbar: InsightsIcon,
  begriffe: TravelExploreIcon,
  seiten: ArticleIcon,
  bewertungen: StarIcon,
  offerte: RequestQuoteIcon,
  galerie: PhotoLibraryIcon,
  termin: EventAvailableIcon,
  automatisch: BoltIcon,
  anfrage: NotificationsActiveIcon,
  handy: PhoneIphoneIcon,
  jobs: WorkIcon,
  mail: MarkEmailReadIcon,
  telefon: PhoneIcon,
  handwerk: HandymanIcon,
  schreiner: CarpenterIcon,
  maler: FormatPaintIcon,
  elektriker: ElectricalServicesIcon,
  sanitaer: PlumbingIcon,
  garten: YardIcon,
  dach: RoofingIcon,
  bau: ConstructionIcon,
  auto: DirectionsCarIcon,
  coiffeur: ContentCutIcon,
  restaurant: RestaurantIcon,
  schule: SchoolIcon,
  laden: StorefrontIcon,
  praxis: LocalHospitalIcon,
  treuhand: CalculateIcon,
  bento: GridViewIcon,
};
const Icon = ({ name, ...props }) => {
  const C = ICONS[name] || CheckIcon;
  return <C {...props} />;
};


// Rechts im Kopfbereich: echte Person, Preis und direkter Kontakt statt nachgebauter Geräte
const AnsprechpartnerKarte = ({ preis, cta, dunkel }) => (
  <Box sx={{ position: 'relative', maxWidth: 430, mx: 'auto' }}>
    <Box
      sx={{
        borderRadius: '24px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: dunkel ? 'none' : '0 30px 70px -42px rgba(15,23,42,0.45)',
      }}
    >
      <Box aria-hidden sx={{ height: 6, background: GRADIENT }} />
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
          <Box
            component="img"
            src={FOTO}
            alt="Mark-Antonio Bosnjak, Gründer von MAPSOL"
            width={72}
            height={72}
            loading="eager"
            sx={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: `0 0 0 3px ${alpha(BLAU, 0.25)}` }}
          />
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.3 }}>Mark-Antonio Bosnjak</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>Gründer von MAPSOL · Ihr Ansprechpartner</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'text.secondary', mb: 0.5 }}>
          {preis.label}
        </Typography>
        <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', md: '2.5rem' }, letterSpacing: '-0.03em', lineHeight: 1.1, mb: 2.5 }}>
          {preis.betrag}
        </Typography>
        {preis.inklusive.slice(0, 3).map((item) => (
          <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.3, mb: 1.2 }}>
            <CheckIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography sx={{ fontSize: '0.98rem' }}>{item}</Typography>
          </Box>
        ))}
        <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, mt: 3 }}>
          {cta}
        </Button>
        <Button fullWidth size="large" startIcon={<PhoneIcon />} href={`tel:${TELEFON}`} sx={{ ...glasButtonSx, mt: 1.2 }}>
          {TELEFON_TEXT}
        </Button>
      </Box>
    </Box>
  </Box>
);

// Branchen als ruhige Liste statt Laufband
const Branchen = ({ titel, eintraege }) => (
  <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: { xs: 3, md: 3.5 } }}>
    <Container maxWidth="lg">
      {titel && (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, mb: 2 }}>
          {titel}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        {eintraege.map((e) => (
          <Box
            key={e.name}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.8, py: 0.9, borderRadius: 100, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
          >
            <Icon name={e.icon} sx={{ fontSize: 19, color: 'primary.main' }} />
            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>{e.name}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

const PremiumLanding = ({ daten: d }) => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const ref = useRef(null);
  const [leiste, setLeiste] = useState(false);
  useReveal(ref);

  useEffect(() => {
    const pruefen = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setLeiste(y > 560 && y < max - 420);
    };
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => window.removeEventListener('scroll', pruefen);
  }, []);

  const url = `https://www.mapsol.ch${d.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: d.seo.titel, description: d.seo.beschreibung, inLanguage: 'de-CH', isPartOf: { '@id': 'https://www.mapsol.ch/#website' } },
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
        areaServed: [{ '@type': 'Country', name: 'Switzerland' }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  const abschnitt = { py: { xs: 9, md: 13 }, position: 'relative' };
  const getoent = dunkel ? 'background.paper' : '#f6f8fc';
  const iconKachel = (groesse = 48) => ({
    width: groesse,
    height: groesse,
    borderRadius: '14px',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    bgcolor: alpha(BLAU, dunkel ? 0.18 : 0.1),
    color: 'primary.main',
  });
  const karte = {
    height: '100%',
    p: { xs: 3.5, md: 4 },
    borderRadius: '20px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    transition: `transform .3s ${EASE}, border-color .3s`,
    '&:hover': { transform: 'translateY(-3px)', borderColor: alpha(BLAU, 0.45) },
  };

  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        '& [data-reveal]': { transition: `opacity .8s ${EASE}, transform .8s ${EASE}` },
        '& .pl-pre': { opacity: 0, transform: 'translateY(28px)' },
        '@keyframes plFadeUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
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

      {/* KOPFBEREICH */}
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
        <Aurora staerke={dunkel ? 0.8 : 1} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 6, md: 10 }, pb: { xs: 7, md: 10 } }}>
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.78rem', textTransform: 'uppercase', color: 'primary.main', mb: 2.5, animation: `plFadeUp .8s ${EASE} both` }}>
                {d.hero.kicker}
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                  lineHeight: { xs: 1.08, md: 1.04 },
                  letterSpacing: '-0.035em',
                  animation: `plFadeUp .9s ${EASE} .06s both`,
                }}
              >
                {d.hero.titel}{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {d.hero.akzent}
                </Box>
              </Typography>
              <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, my: { xs: 3, md: 3.5 } }} />
              <Typography sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.65, color: 'text.secondary', maxWidth: 600, mb: 4, animation: `plFadeUp .9s ${EASE} .12s both` }}>
                {d.hero.untertitel}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4, animation: `plFadeUp .9s ${EASE} .18s both` }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={ctaSx}>
                  {d.hero.cta}
                </Button>
                <Button size="large" href="#preis" sx={glasButtonSx}>
                  Preis ansehen
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.2, sm: 3 } }}>
                {d.hero.vorteile.map((v) => (
                  <Box key={v} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <CheckIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography sx={{ fontSize: '0.93rem', fontWeight: 600, color: 'text.secondary' }}>{v}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ animation: `plFadeUp 1s ${EASE} .2s both` }}>
              <AnsprechpartnerKarte preis={d.preis} cta={d.hero.cta} dunkel={dunkel} />
            </Grid>
          </Grid>
        </Container>
        {d.laufband && <Branchen titel={d.laufband.titel} eintraege={d.laufband.eintraege} />}
      </Box>

      {/* PROBLEME */}
      <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Kopf eyebrow={d.probleme.eyebrow} titel={d.probleme.titel} text={d.probleme.text} align="left" />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {d.probleme.liste.map((p, i) => (
                <Box key={i} data-reveal style={{ transitionDelay: `${i * 50}ms` }} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, py: 2.6, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: alpha(ORANGE, 0.12), color: ORANGE }}>
                    <CloseIcon sx={{ fontSize: 17 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.15rem' }, mb: 0.4 }}>{p.titel}</Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {p.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* AUSSAGE */}
      {d.statement && (
        <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
          <Container maxWidth="md">
            <Typography data-reveal component="p" sx={{ textAlign: 'center', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' }, lineHeight: 1.15, letterSpacing: '-0.035em' }}>
              {d.statement.vorher}{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {d.statement.akzent}
              </Box>
            </Typography>
            <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, mx: 'auto', mt: 4 }} />
          </Container>
        </Box>
      )}

      {/* LEISTUNGEN */}
      <Box component="section" sx={{ ...abschnitt, pt: d.statement ? { xs: 2, md: 4 } : abschnitt.py }}>
        <Container maxWidth="lg">
          <Kopf eyebrow={d.leistungen.eyebrow} titel={d.leistungen.titel} text={d.leistungen.text} />
          <Grid container spacing={2.5}>
            {d.leistungen.liste.map((f, i) => (
              <Grid item xs={12} sm={6} md={4} key={i} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <Box sx={karte}>
                  <Box sx={{ ...iconKachel(), mb: 2.5 }}>
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

      {/* ABLAUF / AUTOMATISIERUNG */}
      {d.flow && (
        <Box component="section" sx={{ ...abschnitt, bgcolor: getoent }}>
          <Container maxWidth="lg">
            <Kopf eyebrow={d.flow.eyebrow} titel={d.flow.titel} text={d.flow.text} />
            <Grid container spacing={2.5}>
              {d.flow.schritte.map((s, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <Box sx={{ ...karte, '&:hover': {} }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                      <Box sx={iconKachel(44)}>
                        <Icon name={s.icon} sx={{ fontSize: 22 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em', color: alpha(BLAU, dunkel ? 0.45 : 0.3) }}>
                        {String(i + 1).padStart(2, '0')}
                      </Typography>
                    </Box>
                    <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.8 }}>
                      {s.titel}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {s.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {d.flow.link && (
              <Box data-reveal sx={{ textAlign: 'center', mt: 6 }}>
                <Button component={RouterLink} to={d.flow.link.pfad} endIcon={<ArrowForwardIcon />} sx={glasButtonSx}>
                  {d.flow.link.text}
                </Button>
              </Box>
            )}
          </Container>
        </Box>
      )}

      {/* RATGEBER-TEXT */}
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

      {/* PREIS + ABLAUF */}
      <Box component="section" id="preis" sx={{ ...abschnitt, bgcolor: getoent, scrollMarginTop: '80px' }}>
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
                    {d.preis.cta || 'Angebot anfragen'}
                  </Button>
                  <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.85rem', color: 'text.secondary' }}>{d.preis.hinweis || 'Erstgespräch kostenlos und unverbindlich'}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Kopf eyebrow="Ablauf" titel="So einfach geht's" align="left" />
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

          {d.verwandt && d.verwandt.length > 0 && (
            <Box data-reveal sx={{ textAlign: 'center', mt: 8 }}>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>Das könnte Sie auch interessieren:</Typography>
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
                {d.cta.titel}{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {d.cta.akzent}
                </Box>
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 620, mx: 'auto', mb: 5 }}>
                {d.cta.text}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, px: { xs: 4, sm: 5 }, py: 1.8, fontSize: '1.08rem' }}>
                  {d.hero.cta}
                </Button>
                <Button size="large" startIcon={<PhoneIcon />} href={`tel:${TELEFON}`} sx={glasButtonSx}>
                  {TELEFON_TEXT}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mobile: feste Leiste unten */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          left: 12,
          right: 12,
          bottom: 'calc(12px + env(safe-area-inset-bottom))',
          zIndex: 1200,
          gap: 1,
          p: 0.8,
          borderRadius: 100,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 16px 40px -16px rgba(15,23,42,0.45)',
          transform: leiste ? 'translateY(0)' : 'translateY(160%)',
          transition: `transform .45s ${EASE}`,
        }}
      >
        <Button variant="contained" component={RouterLink} to="/kontakt" endIcon={<ArrowForwardIcon />} sx={{ ...ctaSx, flex: 1, py: 1.2, fontSize: '0.95rem', px: 2 }}>
          {d.hero.ctaKurz || d.hero.cta}
        </Button>
        <IconButton component="a" href={`tel:${TELEFON}`} aria-label="Anrufen" sx={{ width: 48, height: 48, color: 'primary.main', border: '1px solid', borderColor: 'divider' }}>
          <PhoneIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PremiumLanding;
