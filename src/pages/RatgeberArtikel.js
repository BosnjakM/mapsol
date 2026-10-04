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
import BoltIcon from '@mui/icons-material/Bolt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ArtikelKarte, KategoriePille, thema } from '../components/RatgeberKarte';
import { DUNKEL, EASE, gradientText, ctaSx, glasButtonSx, useReveal, Aurora } from '../components/premium';

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
  const [f1, f2] = thema(a.kategorie).farben;
  const verlauf = `linear-gradient(135deg, ${f1}, ${f2})`;
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
      <Box component="header" sx={{ position: 'relative', bgcolor: DUNKEL, color: '#fff', overflow: 'hidden' }}>
        <Aurora farben={[f1, f2]} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: verlauf, zIndex: 3 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, pt: { xs: 7, md: 11 }, pb: a.kurzfassung ? { xs: 14, md: 17 } : { xs: 8, md: 11 } }}>
          <Box
            component="nav"
            aria-label="Brotkrumen"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3.5, flexWrap: 'wrap', animation: `plFadeUp .9s ${EASE} both` }}
          >
            <Box
              component={RouterLink}
              to="/ratgeber"
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', '&:hover': { color: '#fff' } }}
            >
              Ratgeber
            </Box>
            <ChevronRightIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }} />
            <KategoriePille kategorie={a.kategorie} hell />
          </Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.3rem', sm: '3rem', md: '3.9rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              mb: 3,
              animation: `plFadeUp 1s ${EASE} .08s both`,
            }}
          >
            {a.titel}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '1.1rem', md: '1.28rem' }, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, mb: 4, animation: `plFadeUp 1s ${EASE} .16s both` }}
          >
            {a.einleitung}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, animation: `plFadeUp 1s ${EASE} .24s both` }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                color: '#fff',
                background: verlauf,
                boxShadow: '0 0 0 3px rgba(255,255,255,0.12)',
              }}
            >
              MB
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 }}>Mark-Antonio Bosnjak</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                {datumDe(a.aktualisiert || a.datum)} · {a.lesezeit} Min. Lesezeit
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* KURZFASSUNG (überlappt den Kopf) */}
      {a.kurzfassung && (
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3, mt: { xs: -9, md: -11 } }}>
          <Box
            sx={{
              p: '1.5px',
              borderRadius: '26px',
              background: verlauf,
              boxShadow: `0 40px 90px -40px ${alpha(f1, 0.7)}`,
              animation: `plFadeUp 1s ${EASE} .3s both`,
            }}
          >
            <Box sx={{ borderRadius: '25px', bgcolor: 'background.paper', p: { xs: 3, md: 4.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.3, mb: 2.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '11px', display: 'grid', placeItems: 'center', background: verlauf }}>
                  <BoltIcon sx={{ fontSize: 20, color: '#fff' }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.15rem' }}>Das Wichtigste in Kürze</Typography>
              </Box>
              {a.kurzfassung.map((k, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.6, mb: i < a.kurzfassung.length - 1 ? 1.6 : 0 }}>
                  <Box sx={{ width: 22, height: 22, flexShrink: 0, mt: '2px', borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: alpha(f1, 0.14) }}>
                    <CheckIcon sx={{ fontSize: 14, color: f1 }} />
                  </Box>
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
                      borderImage: aktiv === i ? `${verlauf} 1` : 'none',
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
                  <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em', mb: 1, background: verlauf, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
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
                          <Box sx={{ width: 24, height: 24, flexShrink: 0, mt: '4px', borderRadius: '8px', display: 'grid', placeItems: 'center', background: verlauf }}>
                            <CheckIcon sx={{ fontSize: 15, color: '#fff' }} />
                          </Box>
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
                        boxShadow: `0 24px 60px -40px ${alpha(f1, 0.6)}`,
                      }}
                    >
                      <Table sx={{ minWidth: 560 }}>
                        <TableHead>
                          <TableRow sx={{ background: `linear-gradient(90deg, ${alpha(f1, 0.12)}, ${alpha(f2, 0.08)})` }}>
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
                  sx={{ position: 'relative', overflow: 'hidden', borderRadius: '28px', bgcolor: DUNKEL, color: '#fff', p: { xs: 4, md: 6 }, my: { xs: 7, md: 9 } }}
                >
                  <Aurora farben={[f1, f2]} staerke={0.9} />
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography component="p" sx={{ fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.3rem' }, letterSpacing: '-0.035em', lineHeight: 1.1, mb: 1.5 }}>
                      {a.cta.titel}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, fontSize: { md: '1.1rem' }, lineHeight: 1.6, maxWidth: 560 }}>{a.cta.text}</Typography>
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
                    Häufige{' '}
                    <Box component="span" sx={gradientText}>
                      Fragen
                    </Box>
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
                          '&.Mui-expanded': { borderColor: alpha(f1, 0.4), boxShadow: `0 20px 50px -30px ${alpha(f1, 0.5)}` },
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
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    color: '#fff',
                    background: verlauf,
                  }}
                >
                  MB
                </Box>
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
        <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: dunkel ? 'rgba(255,255,255,0.02)' : '#f6f8fc' }}>
          <Container maxWidth="lg">
            <Box data-reveal sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              <Typography component="h2" sx={{ fontWeight: 800, letterSpacing: '-0.035em', fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.1 }}>
                Weitere{' '}
                <Box component="span" sx={gradientText}>
                  Artikel
                </Box>
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
