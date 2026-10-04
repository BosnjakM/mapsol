import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

/*
 * Gemeinsame Design-Bausteine der modernen Seiten (Landingpages, Ratgeber):
 * Farben, Verläufe, Buttons, dunkler Hintergrund (Aurora), Einblenden beim Scrollen.
 */

export const BLAU = '#0088ff';
export const ORANGE = '#ff5500';
export const GRADIENT = `linear-gradient(135deg, ${BLAU} 0%, ${ORANGE} 100%)`;
export const DUNKEL = '#05060a';
export const EASE = 'cubic-bezier(.16,1,.3,1)';
export const TELEFON = '+41763101512';
export const TELEFON_TEXT = '+41 76 310 15 12';

// Blau → Violett → Orange: ohne graue Mitte, die ein direkter Blau-Orange-Verlauf hätte
export const TEXT_GRADIENT = `linear-gradient(90deg, #2b9bff 0%, #8b5cf6 48%, ${ORANGE} 100%)`;
export const gradientText = {
  background: TEXT_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

export const ctaSx = {
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

export const glasButtonSx = {
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
export const Aurora = ({ staerke = 1, farben = [BLAU, ORANGE] }) => (
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
        background: farben[0],
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
        background: farben[1],
        opacity: 0.3 * staerke,
        filter: 'blur(120px)',
        animation: 'plFloatB 18s ease-in-out infinite alternate',
        '@keyframes plFloatB': { to: { transform: 'translate(-160px, -80px) scale(1.1)' } },
      }}
    />
  </Box>
);

export const glasKarte = {
  position: 'relative',
  borderRadius: '22px',
  bgcolor: 'rgba(16,18,28,0.72)',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(18px)',
  boxShadow: '0 40px 100px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
};
