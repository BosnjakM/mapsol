import React, { useRef, useState } from 'react';
import { Container, Typography, Box, Grid, Button, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import { ARTIKEL } from './artikel';
import { ArtikelKarte } from '../components/RatgeberKarte';
import { GRADIENT, DUNKEL, EASE, TELEFON, TELEFON_TEXT, gradientText, ctaSx, glasButtonSx, useReveal, Aurora } from '../components/premium';

const KATEGORIEN = ['Alle', ...Array.from(new Set(ARTIKEL.map((a) => a.kategorie)))];
const MINUTEN = ARTIKEL.reduce((summe, a) => summe + (a.lesezeit || 0), 0);

const Ratgeber = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const [filter, setFilter] = useState('Alle');
  useReveal(ref);

  const liste = filter === 'Alle' ? ARTIKEL : ARTIKEL.filter((a) => a.kategorie === filter);
  const [erster, ...rest] = liste;

  return (
    <Box
      ref={ref}
      sx={{
        '& [data-reveal]': { transition: `opacity .9s ${EASE}, transform .9s ${EASE}` },
        '& .pl-pre': { opacity: 0, transform: 'translateY(36px)' },
        '@keyframes plFadeUp': { from: { opacity: 0, transform: 'translateY(26px)' }, to: { opacity: 1, transform: 'none' } },
      }}
    >
      <Helmet>
        <title>Ratgeber für KMU: Website, Online-Buchung & Automatisierung | MAPSOL</title>
        <meta name="description" content="Praxisnahe Ratgeber für Schweizer KMU: Was eine Website kostet, wie Online-Terminbuchung funktioniert, wie Sie bei Google gefunden werden und was sich automatisieren lässt." />
        <link rel="canonical" href="https://www.mapsol.ch/ratgeber" />
        <meta property="og:title" content="Ratgeber für KMU | MAPSOL" />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
      </Helmet>

      {/* HERO */}
      <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden' }}>
        <Aurora />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: GRADIENT, zIndex: 3 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1.8,
              py: 0.8,
              mb: 3.5,
              borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.14)',
              bgcolor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              animation: `plFadeUp .9s ${EASE} both`,
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: GRADIENT }} />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)' }}>
              MAPSOL · Wissen für KMU
            </Typography>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.9rem', sm: '4rem', md: '5.4rem' },
              lineHeight: 0.98,
              letterSpacing: '-0.05em',
              mb: 3,
              maxWidth: 900,
              animation: `plFadeUp 1s ${EASE} .08s both`,
            }}
          >
            Ratgeber für{' '}
            <Box component="span" sx={gradientText}>
              KMU
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.08rem', md: '1.28rem' },
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 680,
              mb: 4,
              animation: `plFadeUp 1s ${EASE} .16s both`,
            }}
          >
            Ehrliche Antworten auf die Fragen, die uns Garagen, Coiffeure, Fahrschulen, Restaurants und andere Schweizer KMU am häufigsten stellen – zu Website,
            Online-Buchung, Google und Automatisierung.
          </Typography>

          <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, flexWrap: 'wrap', mb: 5.5, animation: `plFadeUp 1s ${EASE} .24s both` }}>
            {[
              [ARTIKEL.length, 'Artikel'],
              [MINUTEN, 'Minuten Lesezeit'],
              ['100 %', 'kostenlos, ohne Anmeldung'],
            ].map(([zahl, text]) => (
              <Box key={text}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.4rem' }, lineHeight: 1, letterSpacing: '-0.03em', ...gradientText }}>{zahl}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', mt: 0.5 }}>{text}</Typography>
              </Box>
            ))}
          </Box>

          {/* Filter */}
          <Box role="group" aria-label="Nach Kategorie filtern" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', animation: `plFadeUp 1s ${EASE} .32s both` }}>
            {KATEGORIEN.map((k) => {
              const aktiv = filter === k;
              return (
                <ButtonBase
                  key={k}
                  aria-pressed={aktiv}
                  onClick={() => setFilter(k)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 100,
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    color: '#fff',
                    border: '1px solid',
                    borderColor: aktiv ? 'transparent' : 'rgba(255,255,255,0.18)',
                    background: aktiv ? GRADIENT : 'rgba(255,255,255,0.05)',
                    boxShadow: aktiv ? '0 10px 30px -10px rgba(0,136,255,0.6)' : 'none',
                    transition: `all .3s ${EASE}`,
                    '&:hover': { borderColor: aktiv ? 'transparent' : 'rgba(255,255,255,0.4)' },
                  }}
                >
                  {k}
                </ButtonBase>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ARTIKEL */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: theme.palette.mode === 'dark' ? 'transparent' : '#f6f8fc' }}>
        <Container maxWidth="lg">
          {erster && (
            <Box key={`${filter}-gross`} sx={{ mb: 3, animation: `plFadeUp .7s ${EASE} both` }}>
              <ArtikelKarte a={erster} gross />
            </Box>
          )}
          <Grid container spacing={3}>
            {rest.map((a, i) => (
              <Grid item xs={12} sm={6} key={`${filter}-${a.pfad}`} sx={{ animation: `plFadeUp .7s ${EASE} ${0.06 * (i + 1)}s both` }}>
                <ArtikelKarte a={a} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden', py: { xs: 10, md: 14 }, textAlign: 'center' }}>
        <Aurora />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography data-reveal component="h2" sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.6rem' }, lineHeight: 1.05, letterSpacing: '-0.045em', mb: 2.5 }}>
            Lieber direkt fragen{' '}
            <Box component="span" sx={gradientText}>
              statt lesen?
            </Box>
          </Typography>
          <Typography data-reveal sx={{ color: 'rgba(255,255,255,0.72)', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.6, maxWidth: 600, mx: 'auto', mb: 5 }}>
            Im kostenlosen Erstgespräch beantworten wir Ihre Fragen persönlich – in 15 Minuten, unverbindlich.
          </Typography>
          <Box data-reveal sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, px: { xs: 4, sm: 5 }, py: 1.9, fontSize: '1.1rem' }}>
              Kostenloses Erstgespräch
            </Button>
            <Button size="large" startIcon={<PhoneIcon />} href={`tel:${TELEFON}`} sx={glasButtonSx}>
              {TELEFON_TEXT}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Ratgeber;
