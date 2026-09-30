import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
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
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/*
 * Vorlage für Ratgeber-Artikel. Inhalte: src/pages/ratgeber/<slug>.json
 * Der <head> wird zusätzlich beim Build vorgerendert (scripts/prerender-heads.js).
 */

const BRAND_GRADIENT = 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)';

const datumDe = (iso) => {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
};

const RatgeberArtikel = ({ artikel: a, alle = [] }) => {
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

  return (
    <Box>
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
      <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 5, md: 7 }, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: BRAND_GRADIENT }} />
        <Container maxWidth="md">
          <Box sx={{ mb: 2 }}>
            <Chip label="Ratgeber" component={RouterLink} to="/ratgeber" clickable size="small" sx={{ fontWeight: 600, mr: 1 }} />
            <Typography component="span" variant="body2" color="text.secondary">
              {datumDe(a.aktualisiert || a.datum)} · {a.lesezeit} Min. Lesezeit
            </Typography>
          </Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{ fontWeight: 800, fontSize: { xs: '2.1rem', md: '3.1rem' }, lineHeight: 1.1, letterSpacing: '-0.02em', mb: 3 }}
          >
            {a.titel}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, color: 'text.secondary', lineHeight: 1.6 }}>
            {a.einleitung}
          </Typography>
          {a.kurzfassung && (
            <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,136,255,0.04)' }}>
              <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                Das Wichtigste in Kürze
              </Typography>
              {a.kurzfassung.map((k, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <CheckCircleIcon color="primary" sx={{ fontSize: 20, mr: 1.5, mt: '2px' }} />
                  <Typography>{k}</Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Container>
      </Box>

      {/* INHALT */}
      <Container maxWidth="md" component="article" sx={{ pb: { xs: 6, md: 8 } }}>
        {a.abschnitte.map((s, i) => (
          <Box key={i} component="section" sx={{ mb: 5 }}>
            <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 2, letterSpacing: '-0.01em', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
              {s.titel}
            </Typography>
            {(s.absaetze || []).map((t, j) => (
              <Typography key={j} sx={{ lineHeight: 1.8, mb: 2, fontSize: '1.05rem' }}>
                {t}
              </Typography>
            ))}
            {s.liste && (
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                {s.liste.map((l, j) => (
                  <Typography component="li" key={j} sx={{ lineHeight: 1.75, mb: 1, fontSize: '1.05rem' }}>
                    {l}
                  </Typography>
                ))}
              </Box>
            )}
            {s.tabelle && (
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {s.tabelle.kopf.map((k) => (
                        <TableCell key={k} sx={{ fontWeight: 700 }}>
                          {k}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {s.tabelle.zeilen.map((z, j) => (
                      <TableRow key={j}>
                        {z.map((c, k) => (
                          <TableCell key={k}>{c}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {s.hinweis && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                {s.hinweis}
              </Typography>
            )}
          </Box>
        ))}

        {/* CTA im Artikel */}
        {a.cta && (
          <Paper
            elevation={0}
            sx={{ p: { xs: 3, md: 4 }, my: 6, borderRadius: 4, color: 'white', background: BRAND_GRADIENT }}
          >
            <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
              {a.cta.titel}
            </Typography>
            <Typography sx={{ opacity: 0.95, mb: 3 }}>{a.cta.text}</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="inherit"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/termin"
                sx={{ borderRadius: 100, bgcolor: 'white', color: 'primary.main', fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
              >
                Kostenloses Erstgespräch
              </Button>
              {a.cta.link && (
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={a.cta.link.pfad}
                  sx={{ borderRadius: 100, color: 'white', borderColor: 'rgba(255,255,255,0.6)', '&:hover': { borderColor: 'white' } }}
                >
                  {a.cta.link.text}
                </Button>
              )}
            </Box>
          </Paper>
        )}

        {a.faqs && a.faqs.length > 0 && (
          <Box component="section" sx={{ mb: 6 }}>
            <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
              Häufige Fragen
            </Typography>
            {a.faqs.map((f, i) => (
              <Accordion key={i} elevation={0} disableGutters sx={{ mb: 1.5, borderRadius: '8px !important', border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="h3" fontWeight={600}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 6 }}>
          Geschrieben von Mark-Antonio Bosnjak, Gründer von MAPSOL (Webentwicklung & Automatisierung, Zürich).
        </Typography>

        {weitere.length > 0 && (
          <Box component="section">
            <Typography component="h2" variant="h5" fontWeight={800} sx={{ mb: 2 }}>
              Weitere Artikel
            </Typography>
            {weitere.map((w) => (
              <Paper
                key={w.pfad}
                elevation={0}
                component={RouterLink}
                to={w.pfad}
                sx={{ display: 'block', p: 2.5, mb: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', textDecoration: 'none', color: 'inherit', '&:hover': { borderColor: 'primary.main' } }}
              >
                <Typography fontWeight={700}>{w.titel}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {w.seo.beschreibung}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RatgeberArtikel;
