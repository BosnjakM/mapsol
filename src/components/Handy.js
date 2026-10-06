import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BLAU, ORANGE, weniger } from './premium';

/*
 * Handy mit Sperrbildschirm, auf dem nacheinander Benachrichtigungen eintreffen (Ratgeber).
 * Die Benachrichtigungen erscheinen erst im Browser, nicht im vorgerenderten HTML –
 * Google sieht so nur den eigentlichen Seitentext.
 *
 * meldungen: [{ icon, app, titel, text, orange?, pfad? }] – mit pfad wird die Meldung zum Link.
 */

const ZEITEN = ['jetzt', 'vor 1 Min.', 'vor 4 Min.', 'vor 9 Min.', 'vor 15 Min.'];

const Meldung = ({ m, zeit }) => {
  const I = m.icon;
  const inhalt = (
    <Box
      sx={{
        display: 'flex',
        gap: 1.2,
        alignItems: 'flex-start',
        p: 1.3,
        borderRadius: '18px',
        bgcolor: 'rgba(255,255,255,0.14)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.12)',
        transition: 'background-color .2s',
        ...(m.pfad && { '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }),
      }}
    >
      <Box sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: '9px', display: 'grid', placeItems: 'center', bgcolor: m.orange ? ORANGE : BLAU }}>
        {I && <I sx={{ fontSize: 19, color: '#fff' }} />}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 0.2 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {m.app}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.64rem', whiteSpace: 'nowrap' }}>{zeit}</Typography>
        </Box>
        <Typography
          sx={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {m.titel}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.76rem', lineHeight: 1.3 }}>{m.text}</Typography>
      </Box>
    </Box>
  );
  return m.pfad ? (
    <Box component={RouterLink} to={m.pfad} sx={{ display: 'block', textDecoration: 'none', borderRadius: '18px' }}>
      {inhalt}
    </Box>
  ) : (
    inhalt
  );
};

const Handy = ({ meldungen, zeile, uhrzeit = '07:42', wiederholen = true, hinweis, deko = true }) => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (weniger()) {
      setN(meldungen.length);
      return undefined;
    }
    let i = 0;
    let iv = 0;
    const schritt = () => {
      i = i >= meldungen.length + 3 ? 0 : i + 1;
      if (!wiederholen && i > meldungen.length) {
        clearInterval(iv);
        return;
      }
      setN(Math.min(i, meldungen.length));
    };
    const start = setTimeout(() => {
      schritt();
      iv = setInterval(schritt, 1600);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(iv);
    };
  }, [meldungen, wiederholen]);

  const sichtbar = meldungen.slice(0, n).map((m, i) => ({ ...m, i })).reverse();

  return (
    <Box aria-hidden={deko || undefined} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: { md: 272, lg: 292 },
          height: { md: 548, lg: 584 },
          borderRadius: '46px',
          p: '10px',
          background: 'linear-gradient(160deg, #2a2d38, #0d0f15)',
          boxShadow: dunkel
            ? '0 50px 120px -30px rgba(0,0,0,0.9), inset 0 0 0 1.5px rgba(255,255,255,0.12)'
            : '0 50px 90px -40px rgba(15,23,42,0.6), inset 0 0 0 1.5px rgba(255,255,255,0.12)',
          transform: 'rotate(-2.5deg)',
        }}
      >
        {/* Seitentasten */}
        <Box sx={{ position: 'absolute', right: -3, top: 160, width: 3, height: 74, borderRadius: 2, bgcolor: '#1c1f27' }} />
        <Box sx={{ position: 'absolute', left: -3, top: 130, width: 3, height: 42, borderRadius: 2, bgcolor: '#1c1f27' }} />
        <Box sx={{ position: 'absolute', left: -3, top: 184, width: 3, height: 42, borderRadius: 2, bgcolor: '#1c1f27' }} />

        <Box
          sx={{
            position: 'relative',
            height: '100%',
            borderRadius: '37px',
            overflow: 'hidden',
            background: `radial-gradient(120% 70% at 20% 0%, ${BLAU}73, transparent 60%), radial-gradient(90% 60% at 100% 100%, ${ORANGE}59, transparent 60%), #0a0c14`,
            px: 1.4,
            pt: 1.5,
          }}
        >
          <Box sx={{ mx: 'auto', width: 92, height: 26, borderRadius: 100, bgcolor: '#000', mb: 2.5 }} />
          <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', fontWeight: 600 }}>{zeile}</Typography>
          <Typography sx={{ textAlign: 'center', color: '#fff', fontWeight: 300, fontSize: '3.6rem', lineHeight: 1.05, letterSpacing: '-0.02em', mb: 2.5 }}>{uhrzeit}</Typography>

          <AnimatePresence initial={false}>
            {sichtbar.map((m, pos) => (
              <motion.div
                key={m.i}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{ marginBottom: 8 }}
              >
                <Meldung m={m} zeit={ZEITEN[Math.min(pos, ZEITEN.length - 1)]} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Unterer Rand wie beim Sperrbildschirm */}
          <Box sx={{ position: 'absolute', left: 22, right: 22, bottom: 30, display: 'flex', justifyContent: 'space-between' }}>
            {[0, 1].map((k) => (
              <Box key={k} sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }} />
            ))}
          </Box>
          <Box sx={{ position: 'absolute', left: '50%', bottom: 9, width: 110, height: 4, ml: '-55px', borderRadius: 4, bgcolor: 'rgba(255,255,255,0.7)' }} />
        </Box>
      </Box>
      {hinweis && <Typography sx={{ mt: 3.5, fontSize: '0.72rem', color: 'text.disabled' }}>{hinweis}</Typography>}
    </Box>
  );
};

export default Handy;
