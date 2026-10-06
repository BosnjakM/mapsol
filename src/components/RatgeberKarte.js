import React from 'react';
import { Typography, Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BoltIcon from '@mui/icons-material/Bolt';
import ArticleIcon from '@mui/icons-material/Article';
import { BLAU, ORANGE, EASE } from './premium';

/*
 * Ratgeber: Akzentfarbe und Symbol pro Kategorie, ruhiges Titelbild in Markenfarben und Artikel-Karte.
 * Nur MAPSOL-Blau und -Orange, passend zu Hell- und Dunkelmodus.
 */

const THEMEN = {
  Website: { farben: [BLAU, ORANGE], icon: LanguageIcon },
  Google: { farben: [BLAU, ORANGE], icon: TravelExploreIcon },
  Garagen: { farben: [ORANGE, BLAU], icon: DirectionsCarIcon },
  'Online-Buchung': { farben: [ORANGE, BLAU], icon: EventAvailableIcon },
  Automatisierung: { farben: [BLAU, ORANGE], icon: BoltIcon },
};

export const thema = (kategorie) => THEMEN[kategorie] || { farben: [BLAU, ORANGE], icon: ArticleIcon };

// Kleine Abwandlung pro Artikel, damit Artikel derselben Kategorie nicht gleich aussehen
const VARIANTEN = [
  { oben: '18%', drehung: -16 },
  { oben: '30%', drehung: -22 },
  { oben: '10%', drehung: -12 },
];
const variante = (schluessel = '') => VARIANTEN[[...schluessel].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 997, 7) % VARIANTEN.length];

export const Cover = ({ kategorie, gross = false, schluessel }) => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const t = thema(kategorie);
  const I = t.icon;
  const [a, b] = t.farben;
  const v = variante(schluessel || kategorie);
  return (
    <Box aria-hidden sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', bgcolor: dunkel ? alpha(a, 0.1) : alpha(a, 0.06), borderBottom: '1px solid', borderColor: 'divider' }}>
      {/* Markenbänder wie im Logo-Banner */}
      <Box className="rk-cover" sx={{ position: 'absolute', top: v.oben, right: '-18%', width: '95%', transform: `rotate(${v.drehung}deg)`, transition: `transform .8s ${EASE}` }}>
        <Box sx={{ height: gross ? 34 : 24, borderRadius: 100, background: `linear-gradient(90deg, transparent, ${alpha(a, 0.35)} 35%, ${alpha(a, 0.7)})`, mb: gross ? 2.5 : 1.6 }} />
        <Box sx={{ height: gross ? 22 : 15, width: '85%', ml: '12%', borderRadius: 100, background: `linear-gradient(90deg, transparent, ${alpha(b, 0.3)} 40%, ${alpha(b, 0.6)})` }} />
      </Box>
      {/* Symbol der Kategorie */}
      <Box
        sx={{
          position: 'absolute',
          left: '9%',
          bottom: gross ? '14%' : '16%',
          width: gross ? { xs: 64, md: 84 } : 56,
          height: gross ? { xs: 64, md: 84 } : 56,
          borderRadius: gross ? '22px' : '16px',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <I sx={{ fontSize: gross ? { xs: 32, md: 42 } : 28, color: a }} />
      </Box>
    </Box>
  );
};

export const KategoriePille = ({ kategorie, hell }) => {
  const [a] = thema(kategorie).farben;
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.8,
        px: 1.3,
        py: 0.45,
        borderRadius: 100,
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: hell ? '#fff' : 'text.primary',
        bgcolor: hell ? 'rgba(255,255,255,0.1)' : alpha(a, 0.1),
        border: '1px solid',
        borderColor: hell ? 'rgba(255,255,255,0.18)' : alpha(a, 0.25),
      }}
    >
      <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: a }} />
      {kategorie}
    </Box>
  );
};

export const ArtikelKarte = ({ a, gross = false, ueberschrift = 'h2' }) => {
  const [farbe] = thema(a.kategorie).farben;
  return (
    <Box
      component={RouterLink}
      to={a.pfad}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: gross ? { xs: 'column', md: 'row' } : 'column',
        height: '100%',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '22px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: `transform .3s ${EASE}, border-color .3s`,
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: alpha(farbe, 0.5),
        },
        '&:hover .rk-cover': { transform: 'translateX(-12px)' },
        '&:hover .rk-pfeil': { transform: 'translateX(5px)' },
      }}
    >
      <Box sx={{ flex: gross ? { md: '0 0 50%' } : 'none', height: gross ? { xs: 220, md: 'auto' } : 200, minHeight: gross ? { md: 360 } : undefined }}>
        <Cover kategorie={a.kategorie} gross={gross} schluessel={a.pfad} />
      </Box>
      <Box sx={{ p: { xs: 3, md: gross ? 5.5 : 3.5 }, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: gross ? 'center' : 'flex-start' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
          {gross && (
            <Box component="span" sx={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: ORANGE }}>
              Neu
            </Box>
          )}
          <KategoriePille kategorie={a.kategorie} />
          <Typography component="span" variant="body2" color="text.secondary">
            {a.lesezeit} Min. Lesezeit
          </Typography>
        </Box>
        <Typography
          component={ueberschrift}
          sx={{ fontWeight: 800, fontSize: gross ? { xs: '1.55rem', md: '2.2rem' } : '1.28rem', lineHeight: 1.18, letterSpacing: '-0.025em', mb: 1.5 }}
        >
          {a.titel}
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.6, mb: 3, fontSize: gross ? { md: '1.08rem' } : '0.97rem' }}>
          {a.seo.beschreibung}
        </Typography>
        <Box sx={{ mt: gross ? 0 : 'auto', display: 'flex', alignItems: 'center', gap: 0.8, fontWeight: 700, color: farbe }}>
          Weiterlesen
          <ArrowForwardIcon className="rk-pfeil" sx={{ fontSize: 18, transition: `transform .3s ${EASE}` }} />
        </Box>
      </Box>
    </Box>
  );
};
