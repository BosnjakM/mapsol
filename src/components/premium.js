import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

/*
 * Gemeinsame Design-Bausteine der Landingpages und des Ratgebers.
 * Stil wie die Startseite: hell im Hellmodus, dunkel im Dunkelmodus, Blau und Orange als feste Akzente.
 * Bewusst ohne Leuchteffekte, Glas und Text-Farbverläufe.
 */

export const BLAU = '#0088ff';
export const ORANGE = '#ff5500';
// Verlauf nur noch für schmale Markenbalken (wie im Logo), nicht für Flächen oder Text
export const GRADIENT = `linear-gradient(90deg, ${BLAU} 0%, ${ORANGE} 100%)`;
export const DUNKEL = '#0a0a0f';
export const EASE = 'cubic-bezier(.16,1,.3,1)';
export const TELEFON = '+41763101512';
export const TELEFON_TEXT = '+41 76 310 15 12';
export const FOTO = '/images/foto.jpg';

// Hervorgehobene Wörter: festes Markenblau statt Farbverlauf
export const TEXT_GRADIENT = BLAU;
export const gradientText = { color: 'primary.main' };

// Hauptbutton wie in der Navigation: orange, ruhig, ohne Glanz-Animation
export const ctaSx = {
  px: { xs: 3, sm: 4 },
  py: 1.6,
  borderRadius: 100,
  fontWeight: 700,
  fontSize: '1.02rem',
  color: '#fff',
  bgcolor: ORANGE,
  boxShadow: 'none',
  textTransform: 'none',
  transition: `transform .2s ${EASE}, background-color .2s`,
  '& .MuiButton-endIcon': { transition: `transform .2s ${EASE}` },
  '&:hover': { bgcolor: '#e64d00', boxShadow: 'none', transform: 'translateY(-1px)' },
  '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
};

// Zweiter Button: umrandet, passt sich Hell- und Dunkelmodus an
export const glasButtonSx = {
  px: { xs: 3, sm: 4 },
  py: 1.5,
  borderRadius: 100,
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  color: 'text.primary',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'transparent',
  '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
};

// Elemente mit data-reveal blenden beim Scrollen weich ein. Ohne JavaScript (und für Google) bleibt alles sichtbar.
export function useReveal(ref) {
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
    // Bei Sprüngen (z. B. über das Inhaltsverzeichnis) übersprungene Elemente trotzdem zeigen
    let rahmen = 0;
    const pruefen = () => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(() => {
        root.querySelectorAll('.pl-pre').forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.remove('pl-pre');
            io.unobserve(el);
          }
        });
      });
    };
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(rahmen);
      window.removeEventListener('scroll', pruefen);
    };
  }, [ref]);
}

export const weniger = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lichtkegel, der beim Hovern der Maus folgt
export const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export const Kopf = ({ eyebrow, titel, text, hell, align = 'center' }) => (
  <Box data-reveal sx={{ textAlign: align, mb: { xs: 5, md: 7 }, maxWidth: align === 'center' ? 760 : 'none', mx: align === 'center' ? 'auto' : 0 }}>
    {eyebrow && (
      <Typography sx={{ fontWeight: 800, letterSpacing: '0.22em', fontSize: '0.78rem', textTransform: 'uppercase', mb: 2, color: 'primary.main' }}>
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
        color: 'text.primary',
      }}
    >
      {titel}
    </Typography>
    {text && (
      <Typography sx={{ fontSize: { xs: '1.02rem', md: '1.15rem' }, lineHeight: 1.65, color: 'text.secondary' }}>
        {text}
      </Typography>
    )}
  </Box>
);

// Früher dunkler Leucht-Hintergrund. Jetzt nur zwei feine Markenbänder (wie im LinkedIn-Banner), passend zu Hell und Dunkel.
export const Aurora = ({ staerke = 1 }) => (
  <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <Box
      sx={{
        position: 'absolute',
        top: { xs: 40, md: 70 },
        right: { xs: -260, md: -120 },
        width: { xs: 520, md: 760 },
        transform: 'rotate(-18deg)',
        opacity: 0.9 * staerke,
      }}
    >
      <Box sx={{ height: { xs: 22, md: 34 }, borderRadius: 100, background: `linear-gradient(90deg, transparent, ${BLAU}33 35%, ${BLAU}66)`, mb: { xs: 1.5, md: 2.5 } }} />
      <Box sx={{ height: { xs: 14, md: 22 }, width: '86%', ml: '10%', borderRadius: 100, background: `linear-gradient(90deg, transparent, ${ORANGE}2e 40%, ${ORANGE}59)` }} />
    </Box>
  </Box>
);

// Karte: Papierfarbe des Themes, feine Linie, kein Glas
export const glasKarte = {
  position: 'relative',
  borderRadius: '22px',
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 24px 60px -36px rgba(15,23,42,0.35)',
};
