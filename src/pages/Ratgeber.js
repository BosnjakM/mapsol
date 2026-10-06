import React, { useMemo, useRef, useState } from 'react';
import { Container, Typography, Box, Grid, Button, ButtonBase } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import { ARTIKEL } from './artikel';
import { ArtikelKarte, thema } from '../components/RatgeberKarte';
import Handy from '../components/Handy';
import { GRADIENT, EASE, TELEFON, TELEFON_TEXT, FOTO, ctaSx, glasButtonSx, useReveal, Aurora } from '../components/premium';

const KATEGORIEN = ['Alle', ...Array.from(new Set(ARTIKEL.map((a) => a.kategorie)))];

const Ratgeber = () => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const ref = useRef(null);
  const [filter, setFilter] = useState('Alle');
  useReveal(ref);

  // Handy im Kopf: die neuesten Artikel als Benachrichtigungen, antippen öffnet den Artikel
  const neueste = useMemo(
    () =>
      ARTIKEL.slice(0, 3)
        .map((a, i) => ({
          icon: thema(a.kategorie).icon,
          app: a.kategorie,
          titel: a.titel,
          text: `${a.lesezeit} Min. Lesezeit`,
          orange: i % 2 === 1,
          pfad: a.pfad,
        }))
        .reverse(), // der neueste Artikel kommt zuletzt und steht damit oben
    []
  );

  const liste = filter === 'Alle' ? ARTIKEL : ARTIKEL.filter((a) => a.kategorie === filter);
  const [erster, ...rest] = liste;

  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
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

      {/* KOPF */}
      <Box component="section" sx={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Aurora staerke={dunkel ? 0.8 : 1} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 7, md: 9 }, pb: { xs: 6, md: 8 } }}>
          <Grid container spacing={{ xs: 0, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography sx={{ fontWeight: 800, letterSpacing: '0.2em', fontSize: '0.78rem', textTransform: 'uppercase', color: 'primary.main', mb: 2.5, animation: `plFadeUp .9s ${EASE} both` }}>
                Wissen für KMU
              </Typography>
              <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.8rem' }, lineHeight: 1, letterSpacing: '-0.045em', maxWidth: 900, animation: `plFadeUp 1s ${EASE} .06s both` }}>
                Ratgeber für KMU
              </Typography>
              <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, my: { xs: 3, md: 3.5 } }} />
              <Typography sx={{ fontSize: { xs: '1.08rem', md: '1.25rem' }, lineHeight: 1.65, color: 'text.secondary', maxWidth: 680, mb: 5, animation: `plFadeUp 1s ${EASE} .12s both` }}>
                Ehrliche Antworten auf die Fragen, die uns Garagen, Coiffeure, Fahrschulen, Restaurants und andere Schweizer KMU am häufigsten stellen – zu Website,
                Online-Buchung, Google und Automatisierung.
              </Typography>

              {/* Filter */}
              <Box role="group" aria-label="Nach Kategorie filtern" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', animation: `plFadeUp 1s ${EASE} .18s both` }}>
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
                        color: aktiv ? '#fff' : 'text.primary',
                        border: '1px solid',
                        borderColor: aktiv ? 'primary.main' : 'divider',
                        bgcolor: aktiv ? 'primary.main' : 'background.paper',
                        transition: `all .25s ${EASE}`,
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      {k}
                    </ButtonBase>
                  );
                })}
              </Box>
            </Grid>
            <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', animation: `plFadeUp 1s ${EASE} .2s both` }}>
              <Handy meldungen={neueste} zeile="Neu im Ratgeber" wiederholen={false} deko={false} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ARTIKEL */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: dunkel ? 'transparent' : '#f6f8fc' }}>
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

      {/* SCHLUSS */}
      <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Box
            data-reveal
            sx={{ position: 'relative', overflow: 'hidden', textAlign: 'center', borderRadius: '32px', px: { xs: 3, md: 8 }, py: { xs: 7, md: 10 }, bgcolor: dunkel ? 'background.paper' : alpha('#0088ff', 0.05), border: '1px solid', borderColor: 'divider' }}
          >
            <Aurora staerke={0.7} />
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={FOTO} alt="" aria-hidden width={64} height={64} loading="lazy" sx={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', mb: 3, boxShadow: `0 0 0 3px ${alpha('#0088ff', 0.25)}` }} />
              <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' }, lineHeight: 1.1, letterSpacing: '-0.035em', mb: 2.5 }}>
                Lieber direkt fragen{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  statt lesen?
                </Box>
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.6, maxWidth: 600, mx: 'auto', mb: 5 }}>
                Im kostenlosen Erstgespräch beantworten wir Ihre Fragen persönlich – in 15 Minuten, unverbindlich.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, px: { xs: 4, sm: 5 }, py: 1.8, fontSize: '1.08rem' }}>
                  Kostenloses Erstgespräch
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

export default Ratgeber;
