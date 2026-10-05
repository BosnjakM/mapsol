import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GRADIENT, DUNKEL, EASE, gradientText, ctaSx, glasButtonSx, Aurora } from '../components/premium';

// Seite für unbekannte Adressen: noindex, damit Google sie nicht als Kopie der Startseite wertet
const ZIELE = [
  { text: 'Website erstellen lassen', pfad: '/website-erstellen-lassen' },
  { text: 'SEO für KMU', pfad: '/seo-fuer-kmu' },
  { text: 'Website für Handwerker', pfad: '/fuer-handwerker' },
  { text: 'Website für Garagen', pfad: '/fuer-garagen' },
  { text: 'Automatisierung für KMU', pfad: '/automatisierung-fuer-kmu' },
  { text: 'Ratgeber', pfad: '/ratgeber' },
];

const NichtGefunden = () => (
  <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
    <Helmet>
      <title>Seite nicht gefunden | MAPSOL</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <Aurora />
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: GRADIENT, zIndex: 3 }} />
    <Container
      maxWidth="md"
      sx={{
        position: 'relative',
        zIndex: 2,
        py: { xs: 10, md: 14 },
        textAlign: 'center',
        '@keyframes plFadeUp': { from: { opacity: 0, transform: 'translateY(26px)' }, to: { opacity: 1, transform: 'none' } },
        animation: `plFadeUp 1s ${EASE} both`,
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: { xs: '5rem', md: '8rem' }, lineHeight: 1, letterSpacing: '-0.06em', mb: 2, ...gradientText }}>404</Typography>
      <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.8rem' }, letterSpacing: '-0.035em', mb: 2 }}>
        Diese Seite gibt es nicht (mehr).
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: { md: '1.15rem' }, mb: 5 }}>
        Vielleicht suchen Sie eine dieser Seiten:
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {ZIELE.map((z) => (
          <Button key={z.pfad} component={RouterLink} to={z.pfad} sx={{ ...glasButtonSx, py: 1.1, fontSize: '0.95rem' }}>
            {z.text}
          </Button>
        ))}
      </Box>
      <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/" sx={ctaSx}>
        Zur Startseite
      </Button>
    </Container>
  </Box>
);

export default NichtGefunden;
