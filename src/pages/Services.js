import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import PageHero from '../components/PageHero';
import GradientCta from '../components/GradientCta';
import { useColorMode } from '../ThemeContext';

const ServiceCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'accent',
})(({ theme, accent }) => ({
  padding: theme.spacing(3.5),
  height: '100%',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 24px rgba(0, 0, 0, 0.25)'
    : '0 4px 24px rgba(0, 136, 255, 0.06)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: accent,
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 32px rgba(0, 0, 0, 0.35)'
      : '0 12px 36px rgba(0, 136, 255, 0.12)',
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(1.5),
  borderLeft: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(0, 136, 255, 0.35)' : 'rgba(0, 136, 255, 0.2)'}`,
}));

const Services = () => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const serviceData = [
    {
      id: 'web',
      title: 'Webentwicklung',
      accent: 'linear-gradient(90deg, #0088ff, #00aaff)',
      description: 'Moderne Websites, die Ihr Unternehmen professionell präsentieren und Anfragen bringen.',
      features: [
        'Responsive für alle Geräte',
        'Schnell und suchmaschinenfreundlich',
        'Kontaktformular & klare Struktur',
        'Auf Ihr Unternehmen zugeschnitten',
      ],
      cta: 'Website anfragen',
    },
    {
      id: 'automation',
      title: 'Workflow-Automatisierung',
      accent: 'linear-gradient(90deg, #0088ff, #ff5500)',
      description: 'Wir verbinden Ihre Tools und automatisieren wiederkehrende Abläufe — weniger manuelle Arbeit, weniger Fehler.',
      features: [
        'CRM, E-Mail und Datenbanken anbinden',
        'Wiederkehrende Aufgaben automatisieren',
        'Daten zwischen Systemen synchronisieren',
        'Massgeschneidert für Ihre Prozesse',
      ],
      cta: 'Automatisierung anfragen',
    },
    {
      id: 'training',
      title: 'Training',
      accent: 'linear-gradient(90deg, #ff5500, #ff8844)',
      description: 'Schulungen und Workshops für Teams — auf Anfrage.',
      features: [
        'Web- und Automatisierungs-Grundlagen',
        'Massgeschneidert für Ihr Team',
        'Hands-on Sessions',
      ],
      cta: 'Training anfragen',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Beratung', description: 'Wir klären Ihre Ziele und den besten Weg.' },
    { step: '02', title: 'Umsetzung', description: 'Wir bauen, testen und liefern — Schritt für Schritt.' },
    { step: '03', title: 'Launch', description: 'Go-Live mit Dokumentation und kurzer Einweisung.' },
    { step: '04', title: 'Support', description: 'Wir bleiben erreichbar für Anpassungen und Fragen.' },
  ];

  const automationExamples = [
    { title: 'CRM & E-Mail', description: 'Leads automatisch erfassen, Follow-ups planen, Status synchronisieren.' },
    { title: 'Daten-Synchronisation', description: 'Daten zwischen Website, CRM und Buchhaltung automatisch abgleichen.' },
    { title: 'Lead-Qualifizierung', description: 'Neue Anfragen bewerten und qualifizierte Leads direkt weiterleiten.' },
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <Helmet>
        <title>Services | MAPSOL</title>
        <meta name="description" content="MAPSOL Services: Webentwicklung, Workflow-Automatisierung und Training. Modern AI Platform Solutions aus Zürich." />
      </Helmet>

      <PageHero
        eyebrow="MAPSOL"
        title="Services"
        subtitle="Webentwicklung und Workflow-Automatisierung — klar umrissen, direkt umsetzbar."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={3}>
          {serviceData.map((service, index) => (
            <Grid item xs={12} md={4} key={service.id} id={service.id} sx={{ scrollMarginTop: '90px' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <ServiceCard accent={service.accent}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      mb: 2,
                      opacity: 0.12,
                      color: 'primary.main',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.75, minHeight: 48 }}>
                    {service.description}
                  </Typography>
                  <Box sx={{ flex: 1, mb: 3, mt: 1 }}>
                    {service.features.map((feature, i) => (
                      <FeatureItem key={i}>
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </FeatureItem>
                    ))}
                  </Box>
                  <Button
                    component={RouterLink}
                    to="/kontakt"
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    fullWidth
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    {service.cta}
                  </Button>
                </ServiceCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: isDark
            ? 'rgba(0, 136, 255, 0.04)'
            : 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" component="h2" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 5 }}>
            So arbeiten wir
          </Typography>
          <Grid container spacing={2}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      textAlign: 'center',
                      background: 'background.paper',
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: '#fff',
                        background: 'linear-gradient(135deg, #0088ff, #ff5500)',
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
          Beispiele für Automatisierung
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.75 }}>
          Typische Abläufe, die wir für Kunden umsetzen.
        </Typography>
        <Grid container spacing={2}>
          {automationExamples.map((example, index) => (
            <Grid item xs={12} key={example.title}>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    pl: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: index % 2 === 0 ? '#0088ff' : '#ff5500',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0, 136, 255, 0.08)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {example.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {example.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md">
        <GradientCta
          title="Interesse?"
          description="15 Minuten Erstgespräch — unverbindlich."
          buttonText="Kostenloses Erstgespräch"
        />
      </Container>
    </Box>
  );
};

export default Services;
