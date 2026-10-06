import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ArtikelKarte, KategoriePille } from '../components/RatgeberKarte';
import { BLAU, GRADIENT, EASE, FOTO, ctaSx, glasButtonSx, useReveal, Aurora } from '../components/premium';
import Handy from '../components/Handy';
import { handyFuer } from './artikel/handy';

/*
 * Vorlage für Ratgeber-Artikel. Inhalte: src/pages/artikel/<slug>.json
 * Der <head> wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 */

const datumDe = (iso) => {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
};

const anker = (i) => `abschnitt-${i + 1}`;

const RatgeberArtikel = ({ artikel: a, alle = [] }) => {
  const theme = useTheme();
  const dunkel = theme.palette.mode === 'dark';
  const ref = useRef(null);
  const [aktiv, setAktiv] = useState(0);
  const f1 = BLAU;
  const handy = handyFuer(a);
  useReveal(ref);

  // Inhaltsverzeichnis: aktuellen Abschnitt hervorheben (letzter Abschnitt, dessen Anfang im oberen Drittel liegt)
  useEffect(() => {
    let rahmen = 0;
    const pruefen = () => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(() => {
        let i = 0;
        a.abschnitte.forEach((_, j) => {
          const el = document.getElementById(anker(j));
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) i = j;
        });
        setAktiv(i);
      });
    };
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => {
      cancelAnimationFrame(rahmen);
      window.removeEventListener('scroll', pruefen);
    };
  }, [a]);

  const springen = (e, i) => {
    const el = document.getElementById(anker(i));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${anker(i)}`);
  };

  const url = `https://www.mapsol.ch${a.pfad}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: a.titel,
        description: a.seo.beschreibung,
        datePublished: a.datum,
        dateModified: a.aktualisiert || a.datum,
        inLanguage: 'de-CH',
        mainEntityOfPage: url,
        image: 'https://www.mapsol.ch/og-image.jpg',
        author: { '@type': 'Person', name: 'Mark-Antonio Bosnjak', url: 'https://www.mapsol.ch/ueber-uns' },
        publisher: {
          '@type': 'Organization',
          name: 'MAPSOL',
          url: 'https://www.mapsol.ch',
          logo: { '@type': 'ImageObject', url: 'https://www.mapsol.ch/favicon.svg' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mapsol.ch/' },
          { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://www.mapsol.ch/ratgeber' },
          { '@type': 'ListItem', position: 3, name: a.titel, item: url },
        ],
      },
      ...(a.faqs && a.faqs.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: a.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  };
  const weitere = alle.filter((x) => x.pfad !== a.pfad).slice(0, 3);
  const text = { lineHeight: 1.85, fontSize: { xs: '1.04rem', md: '1.1rem' }, color: dunkel ? 'rgba(226,232,240,0.88)' : '#2a2f45' };

  return (
    <Box
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        '& [data-reveal]': { transition: `opacity .9s ${EASE}, transform .9s ${EASE}` },
        '& .pl-pre': { opacity: 0, transform: 'translateY(30px)' },
        '@keyframes plFadeUp': { from: { opacity: 0, transform: 'translateY(26px)' }, to: { opacity: 1, transform: 'none' } },
      }}
    >
      <Helmet>
        <title>{a.seo.titel}</title>
        <meta name="description" content={a.seo.beschreibung} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="MAPSOL" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={a.seo.titel} />
        <meta property="og:description" content={a.seo.beschreibung} />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* KOPF */}
      <Box component="header" sx={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Aurora staerke={dunkel ? 0.7 : 0.9} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 } }}>
          <Grid container spacing={{ xs: 0, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box component="nav" aria-label="Brotkrumen" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3, flexWrap: 'wrap', animation: `plFadeUp .9s ${EASE} both` }}>
                <Box component={RouterLink} to="/ratgeber" sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                  Ratgeber
                </Box>
                <ChevronRightIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                <KategoriePille kategorie={a.kategorie} />
              </Box>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontWeight: 800, fontSize: { xs: '2.2rem', sm: '2.9rem', md: '3.1rem', lg: '3.4rem' }, lineHeight: 1.08, letterSpacing: '-0.035em', mb: 3, animation: `plFadeUp 1s ${EASE} .06s both` }}
              >
                {a.titel}
              </Typography>
              <Box aria-hidden sx={{ width: 88, height: 6, borderRadius: 3, background: GRADIENT, mb: 3 }} />
              <Typography sx={{ fontSize: { xs: '1.08rem', md: '1.22rem' }, color: 'text.secondary', lineHeight: 1.65, mb: 4, animation: `plFadeUp 1s ${EASE} .12s both` }}>
                {a.einleitung}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, animation: `plFadeUp 1s ${EASE} .18s both` }}>
                <Box component="img" src={FOTO} alt="Mark-Antonio Bosnjak" width={44} height={44} sx={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', boxShadow: `0 0 0 2px ${alpha(f1, 0.3)}` }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>Mark-Antonio Bosnjak</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                    {datumDe(a.aktualisiert || a.datum)} · {a.lesezeit} Min. Lesezeit
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', animation: `plFadeUp 1s ${EASE} .2s both` }}>
              <Handy meldungen={handy.meldungen} zeile={handy.zeile} uhrzeit={handy.uhrzeit} hinweis="Beispiel" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* KURZFASSUNG */}
      {a.kurzfassung && (
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3, mt: { xs: 5, md: 7 } }}>
          <Box sx={{ borderRadius: '22px', overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', animation: `plFadeUp 1s ${EASE} .24s both` }}>
            <Box aria-hidden sx={{ height: 5, background: GRADIENT }} />
            <Box sx={{ p: { xs: 3, md: 4.5 } }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', mb: 2.5 }}>Das Wichtigste in Kürze</Typography>
              {a.kurzfassung.map((k, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.4, mb: i < a.kurzfassung.length - 1 ? 1.6 : 0 }}>
                  <CheckIcon sx={{ fontSize: 20, color: 'primary.main', mt: '3px', flexShrink: 0 }} />
                  <Typography sx={{ lineHeight: 1.6, fontSize: { md: '1.05rem' } }}>{k}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      )}

      {/* INHALT */}
      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 0, md: 6 }}>
          <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box component="nav" aria-label="Inhalt" sx={{ position: 'sticky', top: 110 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'text.secondary', mb: 2 }}>
                Inhalt
              </Typography>
              <Box sx={{ position: 'relative', borderLeft: '2px solid', borderColor: 'divider' }}>
                {a.abschnitte.map((s, i) => (
                  <Box
                    key={i}
                    component="a"
                    href={`#${anker(i)}`}
                    onClick={(e) => springen(e, i)}
                    sx={{
                      position: 'relative',
                      display: 'block',
                      pl: 2,
                      py: 0.9,
                      ml: '-2px',
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                      textDecoration: 'none',
                      fontWeight: aktiv === i ? 700 : 500,
                      color: aktiv === i ? 'text.primary' : 'text.secondary',
                      borderLeft: '2px solid',
                      borderColor: aktiv === i ? f1 : 'transparent',
                      transition: 'color .25s',
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {s.titel}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box component="article" sx={{ maxWidth: 760 }}>
              {a.abschnitte.map((s, i) => (
                <Box key={i} id={anker(i)} component="section" data-reveal sx={{ mb: { xs: 6, md: 7 }, scrollMarginTop: '100px' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em', mb: 1, color: 'primary.main' }}>
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Typography
                    component="h2"
                    sx={{ fontWeight: 800, mb: 2.5, letterSpacing: '-0.03em', lineHeight: 1.15, fontSize: { xs: '1.65rem', md: '2.15rem' } }}
                  >
                    {s.titel}
                  </Typography>
                  {(s.absaetze || []).map((t, j) => (
                    <Typography key={j} sx={{ ...text, mb: 2.2 }}>
                      {t}
                    </Typography>
                  ))}
                  {s.liste && (
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 2.5 }}>
                      {s.liste.map((l, j) => (
                        <Box component="li" key={j} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.6, mb: 1.4 }}>
                          <CheckIcon sx={{ fontSize: 21, color: 'primary.main', mt: '6px', flexShrink: 0 }} />
                          <Typography sx={{ ...text, lineHeight: 1.7 }}>{l}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                  {s.tabelle && (
                    <TableContainer
                      sx={{
                        mb: 2.5,
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Table sx={{ minWidth: 560 }}>
                        <TableHead>
                          <TableRow sx={{ bgcolor: alpha(f1, dunkel ? 0.12 : 0.06) }}>
                            {s.tabelle.kopf.map((k) => (
                              <TableCell key={k} sx={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.02em', py: 2 }}>
                                {k}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {s.tabelle.zeilen.map((z, j) => (
                            <TableRow key={j} sx={{ transition: 'background .2s', '&:hover': { bgcolor: alpha(f1, 0.05) }, '&:last-child td': { borderBottom: 0 } }}>
                              {z.map((c, k) => (
                                <TableCell key={k} sx={{ py: 2, fontWeight: k === 0 ? 700 : 400, color: k === 1 ? 'text.primary' : undefined, whiteSpace: k === 1 ? 'nowrap' : 'normal' }}>
                                  {c}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  {s.hinweis && (
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-start',
                        p: 2.2,
                        borderRadius: '16px',
                        bgcolor: alpha(f1, dunkel ? 0.12 : 0.06),
                        border: '1px solid',
                        borderColor: alpha(f1, 0.2),
                      }}
                    >
                      <InfoOutlinedIcon sx={{ fontSize: 20, color: f1, mt: '2px' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                        {s.hinweis}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}

              {/* CTA im Artikel */}
              {a.cta && (
                <Box
                  data-reveal
                  sx={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', bgcolor: dunkel ? 'background.paper' : alpha(f1, 0.05), border: '1px solid', borderColor: 'divider', p: { xs: 4, md: 6 }, my: { xs: 7, md: 9 } }}
                >
                  <Aurora staerke={0.6} />
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.3rem' }, letterSpacing: '-0.035em', lineHeight: 1.1, mb: 1.5 }}>
                      {a.cta.titel}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: { md: '1.1rem' }, lineHeight: 1.6, maxWidth: 560 }}>{a.cta.text}</Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} component={RouterLink} to="/kontakt" sx={ctaSx}>
                        Kostenloses Erstgespräch
                      </Button>
                      {a.cta.link && (
                        <Button size="large" component={RouterLink} to={a.cta.link.pfad} sx={glasButtonSx}>
                          {a.cta.link.text}
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}

              {a.faqs && a.faqs.length > 0 && (
                <Box component="section" sx={{ mb: 7 }}>
                  <Typography data-reveal component="h2" sx={{ fontWeight: 800, mb: 3, letterSpacing: '-0.03em', fontSize: { xs: '1.65rem', md: '2.15rem' } }}>
                    Häufige Fragen
                  </Typography>
                  {a.faqs.map((f, i) => (
                    <Box key={i} data-reveal>
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
                          '&.Mui-expanded': { borderColor: alpha(f1, 0.45) },
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 0.8 }}>
                          <Typography component="h3" sx={{ fontWeight: 700, fontSize: '1.03rem' }}>
                            {f.q}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pb: 3 }}>
                          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {f.a}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Autor */}
              <Box
                data-reveal
                sx={{ display: 'flex', gap: 2.5, alignItems: 'center', p: { xs: 2.5, md: 3 }, borderRadius: '22px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
              >
                <Box component="img" src={FOTO} alt="Mark-Antonio Bosnjak" width={56} height={56} loading="lazy" sx={{ width: 56, height: 56, flexShrink: 0, borderRadius: '50%', objectFit: 'cover' }} />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Geschrieben von{' '}
                  <Box component={RouterLink} to="/ueber-uns" sx={{ color: 'text.primary', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Mark-Antonio Bosnjak
                  </Box>
                  , Gründer von MAPSOL (Webentwicklung & Automatisierung, Zürich).
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* WEITERE ARTIKEL */}
      {weitere.length > 0 && (
        <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: dunkel ? 'background.paper' : '#f6f8fc' }}>
          <Container maxWidth="lg">
            <Box data-reveal sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              <Typography component="h2" sx={{ fontWeight: 800, letterSpacing: '-0.035em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.1 }}>
                Weitere Artikel
              </Typography>
              <Button component={RouterLink} to="/ratgeber" endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 700, borderRadius: 100, px: 2 }}>
                Alle Artikel
              </Button>
            </Box>
            <Grid container spacing={3}>
              {weitere.map((w, i) => (
                <Grid item xs={12} sm={6} md={4} key={w.pfad} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <ArtikelKarte a={w} ueberschrift="h3" />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RatgeberArtikel;
