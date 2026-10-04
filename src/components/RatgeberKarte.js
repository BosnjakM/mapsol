import React from 'react';
import { Typography, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BoltIcon from '@mui/icons-material/Bolt';
import ArticleIcon from '@mui/icons-material/Article';
import { BLAU, ORANGE, EASE, spot } from './premium';

/*
 * Ratgeber: Farbwelt pro Kategorie, gezeichnetes Titelbild (ohne Fotos) und Artikel-Karte.
 * Neue Kategorie = Eintrag in THEMEN (sonst gilt das MAPSOL-Blau/Orange).
 */

const THEMEN = {
  Website: { farben: ['#0088ff', '#8b5cf6'], icon: LanguageIcon },
  Google: { farben: ['#0ea5e9', '#22c55e'], icon: TravelExploreIcon },
  Garagen: { farben: ['#ff5500', '#ffb020'], icon: DirectionsCarIcon },
  'Online-Buchung': { farben: ['#8b5cf6', '#ff5500'], icon: EventAvailableIcon },
  Automatisierung: { farben: ['#06b6d4', '#8b5cf6'], icon: BoltIcon },
};

export const thema = (kategorie) => THEMEN[kategorie] || { farben: [BLAU, ORANGE], icon: ArticleIcon };

const glas = {
  bgcolor: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.14)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
};

// Kleine Abwandlung pro Artikel, damit Artikel derselben Kategorie nicht gleich aussehen
const VARIANTEN = [
  { blobA: { top: '-45%', left: '-15%' }, blobB: { bottom: '-55%', right: '-10%' }, drehung: 3 },
  { blobA: { top: '-30%', left: '35%' }, blobB: { bottom: '-60%', right: '45%' }, drehung: -4 },
  { blobA: { top: '20%', left: '-35%' }, blobB: { bottom: '25%', right: '-35%' }, drehung: 6 },
];
const variante = (schluessel = '') => VARIANTEN[[...schluessel].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 997, 7) % VARIANTEN.length];

export const Cover = ({ kategorie, gross = false, schluessel }) => {
  const t = thema(kategorie);
  const I = t.icon;
  const [a, b] = t.farben;
  const v = variante(schluessel || kategorie);
  return (
    <Box aria-hidden sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#0a0d16', width: '100%', height: '100%' }}>
      <Box className="rk-cover" sx={{ position: 'absolute', inset: 0, transition: `transform .8s ${EASE}` }}>
        <Box sx={{ position: 'absolute', width: '75%', height: '120%', ...v.blobA, borderRadius: '50%', background: a, opacity: 0.75, filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', width: '65%', height: '110%', ...v.blobB, borderRadius: '50%', background: b, opacity: 0.6, filter: 'blur(60px)' }} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: gross ? '44px 44px' : '32px 32px',
            maskImage: 'radial-gradient(ellipse 70% 80% at 60% 50%, #000 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 60% 50%, #000 20%, transparent 80%)',
          }}
        />
      </Box>

      {/* Icon */}
      <Box
        sx={{
          ...glas,
          position: 'absolute',
          left: '9%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: gross ? { xs: 72, md: 96 } : 64,
          height: gross ? { xs: 72, md: 96 } : 64,
          borderRadius: gross ? '26px' : '20px',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <I sx={{ fontSize: gross ? { xs: 36, md: 48 } : 32, color: '#fff' }} />
      </Box>

      {/* angedeutetes Dokument */}
      <Box
        sx={{
          ...glas,
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: `translateY(-50%) rotate(${v.drehung}deg)`,
          width: gross ? '44%' : '46%',
          borderRadius: '16px',
          p: gross ? 2.5 : 1.8,
        }}
      >
        <Box sx={{ height: gross ? 12 : 9, width: '70%', borderRadius: 6, background: `linear-gradient(90deg, ${a}, ${b})`, mb: 1.4 }} />
        {[92, 80, 86, 58].map((w, i) => (
          <Box key={i} sx={{ height: gross ? 8 : 6, width: `${w}%`, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.22)', mb: 1 }} />
        ))}
        <Box sx={{ display: 'flex', gap: 0.8, mt: 1.6 }}>
          <Box sx={{ height: gross ? 22 : 16, flex: 1, borderRadius: 2, bgcolor: alpha(a, 0.45) }} />
          <Box sx={{ height: gross ? 22 : 16, flex: 1, borderRadius: 2, bgcolor: alpha(b, 0.45) }} />
        </Box>
      </Box>
    </Box>
  );
};

export const KategoriePille = ({ kategorie, hell }) => {
  const [a, b] = thema(kategorie).farben;
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
      <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', background: `linear-gradient(135deg, ${a}, ${b})` }} />
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
      onMouseMove={spot}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: gross ? { xs: 'column', md: 'row' } : 'column',
        height: '100%',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '26px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: `transform .4s ${EASE}, box-shadow .4s ${EASE}, border-color .4s`,
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(380px circle at var(--mx, -999px) var(--my, -999px), ${alpha(farbe, 0.12)}, transparent 45%)`,
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: alpha(farbe, 0.45),
          boxShadow: `0 34px 80px -34px ${alpha(farbe, 0.55)}`,
        },
        '&:hover .rk-cover': { transform: 'scale(1.08)' },
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
