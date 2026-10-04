import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, Box, Grid, Button, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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

/*
 * Moderne Landingpage-Vorlage (z. B. /seo-fuer-kmu, /fuer-handwerker).
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

const BLAU = '#0088ff';
const ORANGE = '#ff5500';
const GRADIENT = `linear-gradient(135deg, ${BLAU} 0%, ${ORANGE} 100%)`;
const DUNKEL = '#05060a';
const EASE = 'cubic-bezier(.16,1,.3,1)';
const TELEFON = '+41763101512';
const TELEFON_TEXT = '+41 76 310 15 12';

// Blau → Violett → Orange: ohne graue Mitte, die ein direkter Blau-Orange-Verlauf hätte
const TEXT_GRADIENT = `linear-gradient(90deg, #2b9bff 0%, #8b5cf6 48%, ${ORANGE} 100%)`;
const gradientText = {
  background: TEXT_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const ctaSx = {
  position: 'relative',
  overflow: 'hidden',
  px: { xs: 3, sm: 4 },
  py: 1.7,
  borderRadius: 100,
  fontWeight: 700,
  fontSize: '1.05rem',
  color: '#fff',
  background: 'linear-gradient(135deg, #ff7a2e 0%, #ff5500 55%, #ff3d00 100%)',
  boxShadow: '0 12px 32px -8px rgba(255,85,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)',
  transition: `transform .25s ${EASE}, box-shadow .25s ${EASE}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-120%',
    width: '60%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)',
    animation: 'plShine 5s ease-in-out infinite',
  },
  '@keyframes plShine': { '0%': { left: '-120%' }, '55%, 100%': { left: '160%' } },
  '& .MuiButton-endIcon': { transition: `transform .25s ${EASE}` },
  '&:hover': {
    background: 'linear-gradient(135deg, #ff7a2e 0%, #ff5500 55%, #ff3d00 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 18px 44px -10px rgba(255,85,0,0.75), inset 0 1px 0 rgba(255,255,255,0.3)',
  },
  '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
};

const glasButtonSx = {
  px: { xs: 3, sm: 4 },
  py: 1.6,
  borderRadius: 100,
  fontWeight: 600,
  fontSize: '1rem',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.22)',
  bgcolor: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(10px)',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.4)' },
};

// Elemente mit data-reveal blenden beim Scrollen weich ein. Ohne JavaScript (und für Google) bleibt alles sichtbar.
function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const els = Array.from(root.querySelectorAll('[data-reveal]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92
    );
    els.forEach((el) => el.classList.add('pl-pre'));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.remove('pl-pre');
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

const weniger = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lichtkegel, der beim Hovern der Maus folgt
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const Kopf = ({ eyebrow, titel, text, hell, align = 'center' }) => (
  <Box data-reveal sx={{ textAlign: align, mb: { xs: 5, md: 7 }, maxWidth: align === 'center' ? 760 : 'none', mx: align === 'center' ? 'auto' : 0 }}>
    {eyebrow && (
      <Typography sx={{ fontWeight: 800, letterSpacing: '0.22em', fontSize: '0.78rem', textTransform: 'uppercase', mb: 2, ...gradientText }}>
        {eyebrow}
      </Typography>
    )}
    <Typography
      component="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3.1rem' },
        lineHeight: 1.08,
        letterSpacing: '-0.035em',
        mb: text ? 2 : 0,
        color: hell ? '#fff' : 'text.primary',
      }}
    >
      {titel}
    </Typography>
    {text && (
      <Typography sx={{ fontSize: { xs: '1.02rem', md: '1.15rem' }, lineHeight: 1.65, color: hell ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>
        {text}
      </Typography>
    )}
  </Box>
);

// Dunkler Hintergrund mit Farbflächen und Raster (Hero, Automatisierung, Schluss)
const Aurora = ({ staerke = 1 }) => (
  <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 75%)',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        width: { xs: 380, md: 620 },
        height: { xs: 380, md: 620 },
        top: { xs: -140, md: -220 },
        left: { xs: -160, md: -120 },
        borderRadius: '50%',
        background: BLAU,
        opacity: 0.38 * staerke,
        filter: 'blur(110px)',
        animation: 'plFloatA 16s ease-in-out infinite alternate',
        '@keyframes plFloatA': { to: { transform: 'translate(140px, 90px) scale(1.15)' } },
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        width: { xs: 340, md: 560 },
        height: { xs: 340, md: 560 },
        bottom: { xs: -160, md: -260 },
        right: { xs: -160, md: -100 },
        borderRadius: '50%',
        background: ORANGE,
        opacity: 0.3 * staerke,
        filter: 'blur(120px)',
        animation: 'plFloatB 18s ease-in-out infinite alternate',
        '@keyframes plFloatB': { to: { transform: 'translate(-160px, -80px) scale(1.1)' } },
      }}
    />
  </Box>
);

const glasKarte = {
  position: 'relative',
  borderRadius: '22px',
  bgcolor: 'rgba(16,18,28,0.72)',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(18px)',
  boxShadow: '0 40px 100px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
};

// Illustration: Google-Suche, bei der der eigene Betrieb nach oben rutscht
const RankingVisual = ({ begriffe }) => {
  const [qi, setQi] = useState(0);
  const [zeichen, setZeichen] = useState(begriffe[0].length);
  const [oben, setOben] = useState(true);

  useEffect(() => {
    if (weniger()) return undefined;
    const q = begriffe[qi];
    let c = 0;
    setZeichen(0);
    setOben(false);
    const tipp = setInterval(() => {
      c += 1;
      setZeichen(c);
      if (c >= q.length) clearInterval(tipp);
    }, 70);
    const t1 = setTimeout(() => setOben(true), q.length * 70 + 1000);
    const t2 = setTimeout(() => setQi((qi + 1) % begriffe.length), q.length * 70 + 5200);
    return () => {
      clearInterval(tipp);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [qi, begriffe]);

  const reihe = oben ? ['du', 'a', 'b'] : ['a', 'b', 'du'];

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 470, mx: 'auto' }}>
      <Box sx={{ ...glasKarte, p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: 'flex', gap: 0.8, mb: 2 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c, opacity: 0.85 }} />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            px: 2,
            py: 1.3,
            mb: 2,
            borderRadius: 100,
            bgcolor: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <SearchIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.6)' }} />
          <Typography sx={{ color: '#fff', fontSize: '0.98rem', fontWeight: 500 }}>
            {begriffe[qi].slice(0, zeichen)}
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: '2px',
                height: '1.05em',
                ml: '2px',
                verticalAlign: 'text-bottom',
                bgcolor: BLAU,
                animation: 'plBlink 1s steps(1) infinite',
                '@keyframes plBlink': { '50%': { opacity: 0 } },
              }}
            />
          </Typography>
        </Box>

        {/* Mini-Karte */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 92, sm: 110 },
            mb: 1.5,
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: '#0d1422',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 30% 60%, rgba(0,136,255,0.18), transparent 50%)',
            backgroundSize: '22px 22px, 22px 22px, 100% 100%',
          }}
        >
          <Box sx={{ position: 'absolute', top: '58%', left: 0, right: 0, height: 6, bgcolor: 'rgba(255,255,255,0.07)', transform: 'rotate(-6deg)' }} />
          {[
            { l: '22%', t: '30%', du: false },
            { l: '68%', t: '22%', du: false },
            { l: '46%', t: '52%', du: true },
          ].map((p, i) => (
            <Box key={i} sx={{ position: 'absolute', left: p.l, top: p.t, transform: 'translate(-50%, -100%)' }}>
              {p.du && oben && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: -6,
                    width: 34,
                    height: 34,
                    ml: '-17px',
                    mb: '-14px',
                    borderRadius: '50%',
                    border: `2px solid ${ORANGE}`,
                    animation: 'plPing 1.6s ease-out infinite',
                    '@keyframes plPing': { from: { transform: 'scale(0.4)', opacity: 1 }, to: { transform: 'scale(1.8)', opacity: 0 } },
                  }}
                />
              )}
              <PlaceIcon sx={{ fontSize: p.du ? 34 : 26, color: p.du ? ORANGE : 'rgba(255,255,255,0.35)', filter: p.du ? 'drop-shadow(0 4px 12px rgba(255,85,0,0.6))' : 'none' }} />
            </Box>
          ))}
        </Box>

        <LayoutGroup>
          {reihe.map((id, i) => {
            const du = id === 'du';
            return (
              <motion.div key={id} layout transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.4,
                    mb: 1,
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: du ? 'rgba(255,85,0,0.55)' : 'rgba(255,255,255,0.07)',
                    bgcolor: du ? 'rgba(255,85,0,0.1)' : 'rgba(255,255,255,0.03)',
                    boxShadow: du && oben ? '0 10px 40px -10px rgba(255,85,0,0.55)' : 'none',
                    transition: 'box-shadow .5s, border-color .5s',
                  }}
                >
                  <Typography sx={{ width: 22, fontWeight: 800, color: du ? ORANGE : 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>{i + 1}</Typography>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {du ? (
                      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Ihr Betrieb</Typography>
                    ) : (
                      <Box sx={{ height: 10, width: id === 'a' ? '62%' : '48%', borderRadius: 5, bgcolor: 'rgba(255,255,255,0.16)', my: 0.5 }} />
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2, mt: 0.6 }}>
                      {[0, 1, 2, 3, 4].map((s) => (
                        <StarIcon key={s} sx={{ fontSize: 13, color: du ? '#fbbc04' : 'rgba(255,255,255,0.2)' }} />
                      ))}
                      <Box sx={{ ml: 1, height: 7, width: 54, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
                    </Box>
                  </Box>
                  {du && (
                    <Box
                      sx={{
                        px: 1.2,
                        py: 0.5,
                        borderRadius: 100,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#fff',
                        background: GRADIENT,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Anrufen
                    </Box>
                  )}
                </Box>
              </motion.div>
            );
          })}
        </LayoutGroup>
      </Box>

      <AnimatePresence>
        {oben && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', left: -12, bottom: -26 }}
          >
            <Box sx={{ ...glasKarte, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: 1.3, px: 2, py: 1.3 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: '10px', display: 'grid', placeItems: 'center', background: GRADIENT }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2 }}>Neuer Anruf über Google</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem' }}>gerade eben</Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <Typography sx={{ position: 'absolute', right: 6, bottom: -26, fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Illustration</Typography>
    </Box>
  );
};

// Illustration: Handy, auf dem Anfragen und Bestätigungen eintreffen
const AnfragenVisual = ({ meldungen }) => {
  const [n, setN] = useState(meldungen.length);

  useEffect(() => {
    if (weniger()) return undefined;
    let i = 0;
    setN(0);
    const iv = setInterval(() => {
      i = i >= meldungen.length + 2 ? 0 : i + 1;
      setN(Math.min(i, meldungen.length));
    }, 1700);
    return () => clearInterval(iv);
  }, [meldungen]);

  const sichtbar = meldungen.slice(0, n).map((m, i) => ({ ...m, i })).reverse();

  return (
    <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        aria-hidden
        sx={{ position: 'absolute', width: 300, height: 300, top: '18%', borderRadius: '50%', background: GRADIENT, filter: 'blur(90px)', opacity: 0.35 }}
      />
      <Box
        sx={{
          position: 'relative',
          width: { xs: 268, sm: 292 },
          height: { xs: 540, sm: 580 },
          borderRadius: '46px',
          p: '10px',
          background: 'linear-gradient(160deg, #2a2d38, #0d0f15)',
          boxShadow: '0 50px 120px -30px rgba(0,0,0,0.9), inset 0 0 0 1.5px rgba(255,255,255,0.12)',
          transform: { md: 'rotate(-3deg)' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            borderRadius: '37px',
            overflow: 'hidden',
            background: 'radial-gradient(120% 70% at 20% 0%, rgba(0,136,255,0.45), transparent 60%), radial-gradient(90% 60% at 100% 100%, rgba(255,85,0,0.35), transparent 60%), #0a0c14',
            px: 1.4,
            pt: 1.5,
          }}
        >
          <Box sx={{ mx: 'auto', width: 92, height: 26, borderRadius: 100, bgcolor: '#000', mb: 3 }} />
          <Typography sx={{ textAlign: 'center', color: '#fff', fontWeight: 300, fontSize: '3.4rem', lineHeight: 1, letterSpacing: '-0.02em' }}>07:42</Typography>
          <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', mb: 3 }}>Dienstag, auf der Baustelle</Typography>
          <AnimatePresence initial={false}>
            {sichtbar.map((m) => (
              <motion.div
                key={m.i}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.2,
                    alignItems: 'flex-start',
                    p: 1.3,
                    mb: 1,
                    borderRadius: '18px',
                    bgcolor: 'rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '9px', display: 'grid', placeItems: 'center', background: GRADIENT }}>
                    <Icon name={m.icon} sx={{ fontSize: 18, color: '#fff' }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', lineHeight: 1.25 }}>{m.titel}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.76rem', lineHeight: 1.3 }}>{m.text}</Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Box>
      <Typography sx={{ position: 'absolute', right: 6, bottom: -26, fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Beispiel</Typography>
    </Box>
  );
};

const Laufband = ({ titel, eintraege }) => (
  <Box sx={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.08)', py: 2.5 }}>
    {titel && (
      <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, mb: 2 }}>
        {titel}
      </Typography>
    )}
    <Box
      sx={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: 'plMarquee 38s linear infinite',
          '@keyframes plMarquee': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {[...eintraege, ...eintraege].map((e, i) => (
          <Box
            key={i}
            aria-hidden={i >= eintraege.length ? true : undefined}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: { xs: 2.5, md: 4 }, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}
          >
            <Icon name={e.icon} sx={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }} />
            <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>{e.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

const SPANS = [8, 4, 4, 8, 6, 6];

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

  const karte = {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '24px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.paper',
    transition: `transform .35s ${EASE}, box-shadow .35s ${EASE}, border-color .35s`,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: `radial-gradient(420px circle at var(--mx, -999px) var(--my, -999px), ${alpha(BLAU, dunkel ? 0.16 : 0.1)}, transparent 45%)`,
    },
    '&:hover': {
      transform: 'translateY(-6px)',
      borderColor: alpha(BLAU, 0.4),
      boxShadow: `0 30px 70px -30px ${alpha(BLAU, 0.45)}`,
    },
  };

  const abschnittHell = { py: { xs: 9, md: 14 }, position: 'relative' };
  const getoent = dunkel ? 'rgba(255,255,255,0.02)' : '#f6f8fc';

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
      <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden' }}>
        <Aurora />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: GRADIENT, zIndex: 3 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 7, md: 11 }, pb: { xs: 9, md: 12 } }}>
          <Grid container spacing={{ xs: 7, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
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
                <Box sx={{ position: 'relative', width: 8, height: 8 }}>
                  <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', bgcolor: ORANGE }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      bgcolor: ORANGE,
                      animation: 'plPuls 2s ease-out infinite',
                      '@keyframes plPuls': { from: { transform: 'scale(1)', opacity: 0.8 }, to: { transform: 'scale(3)', opacity: 0 } },
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)' }}>
                  MAPSOL · {d.hero.kicker}
                </Typography>
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.6rem', sm: '3.6rem', md: '4.7rem' },
                  lineHeight: { xs: 1.04, md: 0.98 },
                  letterSpacing: '-0.045em',
                  mb: 3,
                  animation: `plFadeUp 1s ${EASE} .08s both`,
                }}
              >
                {d.hero.titel}{' '}
                <Box component="span" sx={{ ...gradientText, backgroundSize: '200% auto', animation: 'plVerlauf 6s ease-in-out infinite alternate', '@keyframes plVerlauf': { to: { backgroundPosition: '100% center' } } }}>
                  {d.hero.akzent}
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1.08rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: 590,
                  mb: 4.5,
                  animation: `plFadeUp 1s ${EASE} .16s both`,
                }}
              >
                {d.hero.untertitel}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4.5, animation: `plFadeUp 1s ${EASE} .24s both` }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={ctaSx}>
                  {d.hero.cta}
                </Button>
                <Button size="large" href="#preis" sx={glasButtonSx}>
                  Preis ansehen
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.2, sm: 2.5 }, animation: `plFadeUp 1s ${EASE} .32s both` }}>
                {d.hero.vorteile.map((v) => (
                  <Box key={v} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'rgba(0,136,255,0.18)' }}>
                      <CheckIcon sx={{ fontSize: 13, color: '#5cb6ff' }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{v}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={5} sx={{ animation: `plFadeUp 1.2s ${EASE} .3s both` }}>
              {d.hero.visual === 'anfragen' ? (
                <AnfragenVisual meldungen={d.hero.meldungen} />
              ) : (
                <RankingVisual begriffe={d.hero.suchbegriffe} />
              )}
            </Grid>
          </Grid>
        </Container>
        {d.laufband && <Laufband titel={d.laufband.titel} eintraege={d.laufband.eintraege} />}
      </Box>

      {/* PROBLEME */}
      <Box component="section" sx={abschnittHell}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Kopf eyebrow={d.probleme.eyebrow} titel={d.probleme.titel} text={d.probleme.text} align="left" />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              {d.probleme.liste.map((p, i) => (
                <Box
                  key={i}
                  data-reveal
                  style={{ transitionDelay: `${i * 60}ms` }}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, py: 2.6, borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      flexShrink: 0,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: alpha(ORANGE, 0.12),
                      color: ORANGE,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
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

      {/* STATEMENT */}
      {d.statement && (
        <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: getoent }}>
          <Container maxWidth="md">
            <Typography
              data-reveal
              component="p"
              sx={{ textAlign: 'center', fontWeight: 800, fontSize: { xs: '1.9rem', sm: '2.6rem', md: '3.4rem' }, lineHeight: 1.12, letterSpacing: '-0.04em' }}
            >
              {d.statement.vorher}{' '}
              <Box component="span" sx={gradientText}>
                {d.statement.akzent}
              </Box>
            </Typography>
          </Container>
        </Box>
      )}

      {/* LEISTUNGEN (Bento) */}
      <Box component="section" sx={abschnittHell}>
        <Container maxWidth="lg">
          <Kopf eyebrow={d.leistungen.eyebrow} titel={d.leistungen.titel} text={d.leistungen.text} />
          <Grid container spacing={2.5}>
            {d.leistungen.liste.map((f, i) => {
              const span = SPANS[i] || 4;
              const gross = span >= 8;
              return (
                <Grid item xs={12} sm={6} md={span} key={i} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <Box
                    onMouseMove={spot}
                    sx={{
                      ...karte,
                      p: { xs: 3.5, md: gross ? 5 : 4 },
                      ...(gross && {
                        background: dunkel
                          ? `linear-gradient(135deg, ${alpha(BLAU, 0.14)}, ${alpha(ORANGE, 0.08)})`
                          : `linear-gradient(135deg, ${alpha(BLAU, 0.07)}, ${alpha(ORANGE, 0.05)})`,
                      }),
                    }}
                  >
                    <Box
                      sx={{
                        width: gross ? 60 : 52,
                        height: gross ? 60 : 52,
                        borderRadius: '16px',
                        display: 'grid',
                        placeItems: 'center',
                        background: GRADIENT,
                        color: '#fff',
                        mb: 2.5,
                        boxShadow: `0 12px 28px -10px ${alpha(BLAU, 0.6)}`,
                      }}
                    >
                      <Icon name={f.icon} sx={{ fontSize: gross ? 30 : 26 }} />
                    </Box>
                    <Typography component="h3" sx={{ fontWeight: 800, fontSize: gross ? { xs: '1.3rem', md: '1.6rem' } : '1.2rem', letterSpacing: '-0.02em', mb: 1 }}>
                      {f.titel}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.65, fontSize: gross ? { md: '1.05rem' } : undefined, maxWidth: 560 }}>
                      {f.text}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* AUTOMATISIERUNG (Ablauf-Diagramm) */}
      {d.flow && (
        <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden', py: { xs: 9, md: 14 } }}>
          <Aurora staerke={0.7} />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Kopf eyebrow={d.flow.eyebrow} titel={d.flow.titel} text={d.flow.text} hell />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'stretch' } }}>
              {d.flow.schritte.map((s, i) => (
                <React.Fragment key={i}>
                  <Box data-reveal style={{ transitionDelay: `${i * 120}ms` }} sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ ...glasKarte, height: '100%', p: 3, borderRadius: '22px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', display: 'grid', placeItems: 'center', background: GRADIENT }}>
                          <Icon name={s.icon} sx={{ fontSize: 24, color: '#fff' }} />
                        </Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                          {String(i + 1).padStart(2, '0')}
                        </Typography>
                      </Box>
                      <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.8 }}>
                        {s.titel}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.93rem', lineHeight: 1.55 }}>{s.text}</Typography>
                    </Box>
                  </Box>
                  {i < d.flow.schritte.length - 1 && (
                    <Box
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        alignSelf: 'center',
                        width: { xs: 2, md: 44 },
                        height: { xs: 36, md: 2 },
                        backgroundImage: {
                          xs: `linear-gradient(180deg, transparent, ${BLAU}, ${ORANGE}, transparent)`,
                          md: `linear-gradient(90deg, transparent, ${BLAU}, ${ORANGE}, transparent)`,
                        },
                        backgroundSize: { xs: '100% 200%', md: '200% 100%' },
                        animation: { xs: 'plFlussY 1.6s linear infinite', md: 'plFlussX 1.6s linear infinite' },
                        '@keyframes plFlussX': { from: { backgroundPosition: '100% 0' }, to: { backgroundPosition: '-100% 0' } },
                        '@keyframes plFlussY': { from: { backgroundPosition: '0 100%' }, to: { backgroundPosition: '0 -100%' } },
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
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

      {/* RATGEBER-TEXT (Tiefe für Google) */}
      {d.ratgeber && (
        <Box component="section" sx={abschnittHell}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 2, md: 8 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                  <Kopf eyebrow="Wissen" titel={d.ratgeber.titel} align="left" />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                {d.ratgeber.abschnitte.map((a, i) => (
                  <Box key={i} data-reveal sx={{ mb: 5 }}>
                    <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', md: '1.45rem' }, letterSpacing: '-0.02em', mb: 1.5 }}>
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
      <Box component="section" id="preis" sx={{ ...abschnittHell, bgcolor: getoent, scrollMarginTop: '80px' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={5} data-reveal>
              <Box
                sx={{
                  position: 'relative',
                  p: '2px',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  boxShadow: `0 40px 90px -30px ${alpha(BLAU, 0.55)}`,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-60%',
                    background: `conic-gradient(from 0deg, ${BLAU}, ${ORANGE}, ${BLAU}, ${ORANGE}, ${BLAU})`,
                    animation: 'plDreh 7s linear infinite',
                  },
                  '@keyframes plDreh': { to: { transform: 'rotate(360deg)' } },
                }}
              >
                <Box sx={{ position: 'relative', borderRadius: '28px', bgcolor: DUNKEL, color: '#fff', p: { xs: 4, md: 5 }, overflow: 'hidden' }}>
                  <Box aria-hidden sx={{ position: 'absolute', width: 260, height: 260, top: -120, right: -100, borderRadius: '50%', background: BLAU, filter: 'blur(80px)', opacity: 0.4 }} />
                  <Typography sx={{ position: 'relative', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', mb: 1.5 }}>
                    {d.preis.label}
                  </Typography>
                  <Typography component="p" sx={{ position: 'relative', fontWeight: 800, fontSize: { xs: '2.8rem', md: '3.4rem' }, letterSpacing: '-0.04em', lineHeight: 1, mb: 1.5 }}>
                    {d.preis.betrag}
                  </Typography>
                  <Typography sx={{ position: 'relative', color: 'rgba(255,255,255,0.7)', mb: 3.5, lineHeight: 1.6 }}>{d.preis.text}</Typography>
                  {d.preis.inklusive.map((item) => (
                    <Box key={item} sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1.4, mb: 1.6 }}>
                      <Box sx={{ width: 22, height: 22, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', background: GRADIENT }}>
                        <CheckIcon sx={{ fontSize: 14, color: '#fff' }} />
                      </Box>
                      <Typography sx={{ fontWeight: 500 }}>{item}</Typography>
                    </Box>
                  ))}
                  <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, mt: 3 }}>
                    {d.preis.cta || 'Angebot anfragen'}
                  </Button>
                  <Typography sx={{ position: 'relative', textAlign: 'center', mt: 2, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                    {d.preis.hinweis || 'Erstgespräch kostenlos und unverbindlich'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Kopf eyebrow="Ablauf" titel="So einfach geht's" align="left" />
              <Box sx={{ position: 'relative', pl: { xs: 0.5, md: 1 } }}>
                <Box aria-hidden sx={{ position: 'absolute', left: { xs: 22, md: 26 }, top: 12, bottom: 12, width: 2, background: `linear-gradient(180deg, ${BLAU}, ${ORANGE})`, opacity: 0.35 }} />
                {d.ablauf.map((s, i) => (
                  <Box key={i} data-reveal style={{ transitionDelay: `${i * 90}ms` }} sx={{ position: 'relative', display: 'flex', gap: 3, mb: 3.5 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: 46,
                        height: 46,
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        color: '#fff',
                        background: GRADIENT,
                        boxShadow: `0 0 0 6px ${dunkel ? DUNKEL : '#f6f8fc'}`,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
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
      <Box component="section" sx={abschnittHell}>
        <Container maxWidth="md">
          <Kopf eyebrow="FAQ" titel={d.faqTitel} />
          {d.faqs.map((faq, i) => (
            <Box key={i} data-reveal style={{ transitionDelay: `${Math.min(i, 4) * 50}ms` }}>
              <Accordion
                elevation={0}
                disableGutters
                sx={{
                  mb: 1.5,
                  borderRadius: '18px !important',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: alpha(BLAU, 0.4), boxShadow: `0 20px 50px -30px ${alpha(BLAU, 0.5)}` },
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

      {/* SCHLUSS-CTA */}
      <Box component="section" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden', py: { xs: 11, md: 16 }, textAlign: 'center' }}>
        <Aurora />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            data-reveal
            component="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '2.3rem', sm: '3rem', md: '4rem' }, lineHeight: 1.05, letterSpacing: '-0.045em', mb: 2.5 }}
          >
            {d.cta.titel}{' '}
            <Box component="span" sx={gradientText}>
              {d.cta.akzent}
            </Box>
          </Typography>
          <Typography data-reveal sx={{ color: 'rgba(255,255,255,0.72)', fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.6, maxWidth: 620, mx: 'auto', mb: 5 }}>
            {d.cta.text}
          </Typography>
          <Box data-reveal sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={{ ...ctaSx, px: { xs: 4, sm: 5 }, py: 1.9, fontSize: '1.1rem' }}>
              {d.hero.cta}
            </Button>
            <Button size="large" startIcon={<PhoneIcon />} href={`tel:${TELEFON}`} sx={glasButtonSx}>
              {TELEFON_TEXT}
            </Button>
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
          bgcolor: 'rgba(8,10,16,0.82)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 20px 50px -10px rgba(0,0,0,0.6)',
          transform: leiste ? 'translateY(0)' : 'translateY(160%)',
          transition: `transform .45s ${EASE}`,
        }}
      >
        <Button variant="contained" component={RouterLink} to="/kontakt" endIcon={<ArrowForwardIcon />} sx={{ ...ctaSx, flex: 1, py: 1.3, fontSize: '0.95rem', px: 2 }}>
          {d.hero.ctaKurz || d.hero.cta}
        </Button>
        <IconButton component="a" href={`tel:${TELEFON}`} aria-label="Anrufen" sx={{ width: 50, height: 50, color: '#fff', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
          <PhoneIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PremiumLanding;
