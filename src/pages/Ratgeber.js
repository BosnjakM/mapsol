import React from 'react';
import { Container, Typography, Box, Paper, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ARTIKEL } from './artikel';

const BRAND_GRADIENT = 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)';

const Ratgeber = () => (
  <Box>
    <Helmet>
      <title>Ratgeber für KMU: Website, Online-Buchung & Automatisierung | MAPSOL</title>
      <meta name="description" content="Praxisnahe Ratgeber für Schweizer KMU: Was eine Website kostet, wie Online-Terminbuchung funktioniert, wie Sie bei Google gefunden werden und was sich automatisieren lässt." />
      <link rel="canonical" href="https://www.mapsol.ch/ratgeber" />
      <meta property="og:title" content="Ratgeber für KMU | MAPSOL" />
      <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
    </Helmet>
    <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 10 }, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: BRAND_GRADIENT }} />
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" fontWeight={800} sx={{ mb: 2, letterSpacing: '-0.02em', fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
          Ratgeber für KMU
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: '1.15rem', mb: 6, lineHeight: 1.6 }}>
          Ehrliche Antworten auf die Fragen, die uns Garagen, Coiffeure, Fahrschulen, Restaurants und andere
          Schweizer KMU am häufigsten stellen – zu Website, Online-Buchung, Google und Automatisierung.
        </Typography>
        {ARTIKEL.map((a) => (
          <Paper
            key={a.pfad}
            elevation={0}
            component={RouterLink}
            to={a.pfad}
            sx={{
              display: 'block',
              p: { xs: 3, md: 3.5 },
              mb: 2.5,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform .2s, box-shadow .2s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' },
            }}
          >
            <Chip label={a.kategorie} size="small" sx={{ mb: 1.5, fontWeight: 600 }} />
            <Typography component="h2" variant="h5" fontWeight={800} sx={{ mb: 1 }}>
              {a.titel}
            </Typography>
            <Typography color="text.secondary">{a.seo.beschreibung}</Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 1.5, fontWeight: 600 }}>
              Weiterlesen · {a.lesezeit} Min.
            </Typography>
          </Paper>
        ))}
      </Container>
    </Box>
  </Box>
);

export default Ratgeber;
