import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

/*
 * Eigene Terminbuchung. Freie Zeiten & Buchung laufen über den MAPSOL-Server (Outlook-Kalender).
 * API: https://termin.mapsol.ch/public/termin/... (siehe mapsol-leadgen/leadgen/termine.py)
 */
const API = process.env.REACT_APP_TERMIN_API || 'https://termin.mapsol.ch';
const BRAND_GRADIENT = 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)';
const TAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

const tagLabel = (iso) => {
  const d = new Date(`${iso}T12:00:00`);
  return { wt: TAGE[d.getDay()], tag: d.getDate(), monat: MONATE[d.getMonth()] };
};

const Termin = () => {
  const [laden, setLaden] = useState(true);
  const [fehler, setFehler] = useState('');
  const [tage, setTage] = useState([]);
  const [aktiv, setAktiv] = useState(true);
  const [datum, setDatum] = useState(null);
  const [zeit, setZeit] = useState(null);
  const [art, setArt] = useState('video');
  const [form, setForm] = useState({ name: '', firma: '', email: '', telefon: '', nachricht: '', website_url: '' });
  const [senden, setSenden] = useState(false);
  const [erfolg, setErfolg] = useState(null);

  const holen = () => {
    setLaden(true);
    fetch(`${API}/public/termin/zeiten`)
      .then((r) => r.json())
      .then((d) => {
        setAktiv(d.aktiv !== false);
        setTage(d.tage || []);
        if (d.tage && d.tage.length) setDatum(d.tage[0].datum);
      })
      .catch(() => setFehler('Die freien Termine konnten nicht geladen werden.'))
      .finally(() => setLaden(false));
  };
  useEffect(holen, []);

  const zeiten = useMemo(() => (tage.find((t) => t.datum === datum) || {}).zeiten || [], [tage, datum]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const buchen = async (e) => {
    e.preventDefault();
    setFehler('');
    setSenden(true);
    try {
      const r = await fetch(`${API}/public/termin/buchen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, datum, zeit, art }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.fehler || 'Buchung fehlgeschlagen.');
      setErfolg(d);
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { method: 'terminbuchung' });
    } catch (err) {
      setFehler(err.message);
      if (/nicht mehr frei/.test(err.message)) {
        setZeit(null);
        holen();
      }
    } finally {
      setSenden(false);
    }
  };

  return (
    <Box>
      <Helmet>
        <title>Kostenloses Erstgespräch buchen | MAPSOL</title>
        <meta
          name="description"
          content="Buchen Sie direkt online ein kostenloses 15-minütiges Erstgespräch mit MAPSOL – per Videocall oder Telefon. Website, Online-Buchung oder Automatisierung für Ihr KMU."
        />
        <link rel="canonical" href="https://www.mapsol.ch/termin" />
        <meta property="og:title" content="Kostenloses Erstgespräch buchen | MAPSOL" />
        <meta property="og:image" content="https://www.mapsol.ch/og-image.jpg" />
      </Helmet>

      <Box sx={{ pt: { xs: 13, md: 17 }, pb: { xs: 8, md: 10 }, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: BRAND_GRADIENT }} />
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" fontWeight={800} sx={{ letterSpacing: '-0.02em', fontSize: { xs: '2.1rem', md: '3rem' }, mb: 1.5 }}>
            Kostenloses Erstgespräch buchen
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.15rem', mb: 1, lineHeight: 1.6 }}>
            15 Minuten, unverbindlich. Wir schauen gemeinsam an, was Ihr Betrieb braucht – Website, Online-Buchung oder
            Automatisierung – und Sie wissen danach, was es kostet.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', color: 'text.secondary', mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" /> 15 Minuten
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VideocamIcon fontSize="small" /> Videocall oder Telefon
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventAvailableIcon fontSize="small" /> Bestätigung per E-Mail
            </Box>
          </Box>

          {erfolg ? (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                Termin gebucht!
              </Typography>
              <Typography sx={{ fontSize: '1.15rem', mb: 2 }}>
                {erfolg.datum} um {erfolg.zeit} Uhr
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
                Sie erhalten gleich eine Kalendereinladung per E-Mail
                {art === 'telefon' ? '. Wir rufen Sie zur vereinbarten Zeit an.' : erfolg.teams ? ' mit dem Link zum Videocall.' : '. Den Link zum Videocall senden wir Ihnen vor dem Termin.'}
              </Typography>
              <Button component={RouterLink} to="/" sx={{ mt: 4, borderRadius: 100 }} variant="outlined">
                Zurück zur Startseite
              </Button>
            </Paper>
          ) : laden ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <CircularProgress />
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Freie Termine werden geladen …
              </Typography>
            </Box>
          ) : !aktiv || (!tage.length && !fehler) ? (
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              Aktuell sind keine Online-Termine verfügbar. Schreiben Sie uns an{' '}
              <a href="mailto:contact@mapsol.ch">contact@mapsol.ch</a> oder über das{' '}
              <RouterLink to="/kontakt">Kontaktformular</RouterLink> – wir melden uns innerhalb eines Arbeitstages.
            </Alert>
          ) : (
            <Box component="form" onSubmit={buchen}>
              {fehler && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                  {fehler}
                </Alert>
              )}

              {/* 1. Tag */}
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
                1. Tag wählen
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2, overflowX: 'auto', pb: 1.5, mb: 3 }}>
                {tage.map((t) => {
                  const l = tagLabel(t.datum);
                  const an = t.datum === datum;
                  return (
                    <Paper
                      key={t.datum}
                      elevation={0}
                      onClick={() => {
                        setDatum(t.datum);
                        setZeit(null);
                      }}
                      sx={{
                        minWidth: 78,
                        py: 1.5,
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: 3,
                        border: '2px solid',
                        borderColor: an ? 'primary.main' : 'divider',
                        bgcolor: an ? 'rgba(0,136,255,0.08)' : 'background.paper',
                        flexShrink: 0,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {l.wt}
                      </Typography>
                      <Typography variant="h5" fontWeight={800}>
                        {l.tag}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {l.monat}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>

              {/* 2. Uhrzeit */}
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>
                2. Uhrzeit wählen
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', mb: 4 }}>
                {zeiten.map((z) => (
                  <Button
                    key={z}
                    variant={z === zeit ? 'contained' : 'outlined'}
                    onClick={() => setZeit(z)}
                    sx={{ borderRadius: 100, px: 2.5, fontWeight: 700 }}
                  >
                    {z}
                  </Button>
                ))}
              </Box>

              {/* 3. Angaben */}
              {zeit && (
                <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
                    3. Ihre Angaben
                  </Typography>
                  <ToggleButtonGroup exclusive value={art} onChange={(_, v) => v && setArt(v)} sx={{ mb: 3 }}>
                    <ToggleButton value="video" sx={{ px: 2.5 }}>
                      <VideocamIcon sx={{ mr: 1 }} /> Videocall
                    </ToggleButton>
                    <ToggleButton value="telefon" sx={{ px: 2.5 }}>
                      <PhoneIcon sx={{ mr: 1 }} /> Telefon
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Vor- und Nachname" required fullWidth value={form.name} onChange={set('name')} autoComplete="name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Firma" fullWidth value={form.firma} onChange={set('firma')} autoComplete="organization" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="E-Mail" type="email" required fullWidth value={form.email} onChange={set('email')} autoComplete="email" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={art === 'telefon' ? 'Telefon (wir rufen Sie an)' : 'Telefon (optional)'}
                        required={art === 'telefon'}
                        fullWidth
                        value={form.telefon}
                        onChange={set('telefon')}
                        autoComplete="tel"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Worum geht es? (optional)"
                        placeholder="z. B. neue Website mit Online-Terminbuchung für unsere Garage"
                        fullWidth
                        multiline
                        minRows={3}
                        value={form.nachricht}
                        onChange={set('nachricht')}
                      />
                    </Grid>
                  </Grid>
                  {/* Honeypot gegen Spam-Bots */}
                  <Box sx={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                    <input tabIndex={-1} autoComplete="off" value={form.website_url} onChange={set('website_url')} name="website_url" />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={senden}
                    sx={{ mt: 3, borderRadius: 100, px: 5, py: 1.5, fontWeight: 700 }}
                  >
                    {senden ? 'Wird gebucht …' : `Termin am ${tagLabel(datum).tag}. ${tagLabel(datum).monat} um ${zeit} buchen`}
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Mit der Buchung erhalten Sie eine Kalendereinladung von contact@mapsol.ch. Ihre Angaben verwenden wir
                    nur für dieses Gespräch (siehe <RouterLink to="/datenschutz">Datenschutz</RouterLink>).
                  </Typography>
                </Paper>
              )}
            </Box>
          )}

          <Typography color="text.secondary" sx={{ mt: 6 }}>
            Lieber schreiben? <RouterLink to="/kontakt">Zum Kontaktformular</RouterLink> oder an{' '}
            <a href="mailto:contact@mapsol.ch">contact@mapsol.ch</a>.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Termin;
