import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import PageHero from '../components/PageHero';
import GradientCta from '../components/GradientCta';
import { useColorMode } from '../ThemeContext';

const UeberUns = () => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  const teamMembers = [
    {
      name: 'Mark-Antonio Bosnjak',
      role: 'Gründer & Entwickler',
      avatar: '/images/foto.jpg',
      bio: 'Spezialisiert auf moderne Webentwicklung und Workflow-Automatisierung. Ich entwickle massgeschneiderte digitale Lösungen, die Prozesse vereinfachen und messbaren Mehrwert schaffen.',
      social: {
        github: 'https://github.com/BosnjakM',
        linkedin: 'https://www.linkedin.com/in/mark-antonio-bosnjak/',
      },
    },
  ];

  const highlights = [
    { label: 'Standort', value: 'Zürich, CH' },
    { label: 'Fokus', value: 'Web & Automatisierung' },
    { label: 'Arbeitsweise', value: 'Persönlich & direkt' },
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <Helmet>
        <title>Über uns - MAPSOL</title>
        <meta
          name="description"
          content="Lernen Sie MAPSOL kennen — Modern AI Platform Solutions aus Zürich, spezialisiert auf Webentwicklung und Workflow-Automatisierung."
        />
        <link rel="canonical" href="https://www.mapsol.ch/ueber-uns" />
      </Helmet>

      <PageHero
        eyebrow="MAPSOL"
        title="Über uns"
        subtitle="Modern AI Platform Solutions — Webentwicklung und Automatisierung aus Zürich, persönlich betreut."
      />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 5 } }}>
        <Grid container spacing={2}>
          {highlights.map((item, i) => (
            <Grid item xs={12} sm={4} key={item.label}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: isDark ? 'background.paper' : '#fafcff',
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0.5 }}>
                    {item.value}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ pb: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: isDark
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 40px rgba(0, 136, 255, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 120,
                height: 120,
                background: 'linear-gradient(135deg, rgba(0,136,255,0.08), rgba(255,85,0,0.06))',
                borderRadius: '0 0 0 100%',
              }}
            />
            <Typography variant="h5" component="h2" fontWeight={700} color="primary.main" gutterBottom sx={{ position: 'relative' }}>
              Unsere Geschichte
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.85, position: 'relative' }}>
              MAPSOL entstand aus der Überzeugung, dass gute Softwareentwicklung und durchdachte
              Automatisierung Unternehmen spürbar voranbringen. Was als Nebenprojekt begann, ist heute
              ein fokussiertes Angebot für Webentwicklung und Workflow-Automatisierung.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.85, position: 'relative' }}>
              Wir unterstützen Unternehmen dabei, digitale Prozesse zu optimieren — von modernen Websites
              bis hin zu Automatisierungen, die manuelle Arbeit reduzieren. Unser Ziel: Lösungen, die
              zuverlässig funktionieren und echten Mehrwert schaffen.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, position: 'relative' }}>
              Aus Zürich arbeiten wir eng mit unseren Kunden zusammen, reagieren schnell auf Anforderungen
              und liefern Qualität ohne Umwege. Zusammen mit unserem Partner Laki Development aus Winterthur
              setzen wir auch grössere Projekte um – Sie haben trotzdem immer einen festen Ansprechpartner.
            </Typography>
          </Paper>
        </motion.div>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[
            {
              title: 'Webentwicklung',
              text: 'Moderne, responsive Websites — klar strukturiert, schnell und auf Ihr Unternehmen zugeschnitten.',
              accent: '#0088ff',
            },
            {
              title: 'Workflow-Automatisierung',
              text: 'Tools verbinden, Abläufe automatisieren — von der Analyse bis zur laufenden Betreuung.',
              accent: '#ff5500',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 28px rgba(0, 136, 255, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ width: 32, height: 3, borderRadius: 1, bgcolor: item.accent, mb: 2 }} />
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {item.text}
                  </Typography>
                </Paper>
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
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h5" component="h2" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
            Unser Team
          </Typography>

          {teamMembers.map((member) => (
            <Paper
              key={member.name}
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 3,
                boxShadow: isDark
                  ? '0 8px 32px rgba(0,0,0,0.25)'
                  : '0 12px 40px rgba(0, 136, 255, 0.08)',
              }}
            >
              <Box
                sx={{
                  p: '3px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0088ff, #ff5500)',
                  flexShrink: 0,
                }}
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 128, height: 128, border: '3px solid', borderColor: 'background.paper' }}
                >
                  {member.name.charAt(0)}
                </Avatar>
              </Box>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6" fontWeight={700}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#0088ff', fontWeight: 600, mb: 1.5 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
                  {member.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                  <Button
                    component="a"
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                  >
                    GitHub
                  </Button>
                  <Button
                    component="a"
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                  >
                    LinkedIn
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}

          <Typography variant="h5" component="h2" fontWeight={700} sx={{ mt: 7, mb: 4, display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <HandshakeOutlinedIcon sx={{ color: '#0088ff' }} /> Unser Partner
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 3,
              boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.25)' : '0 12px 40px rgba(0, 136, 255, 0.08)',
            }}
          >
            <Box
              sx={{
                width: 134, height: 134, flexShrink: 0, borderRadius: 4,
                background: 'linear-gradient(135deg, #0b1630 0%, #1d3a7a 100%)',
                color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, letterSpacing: 2, lineHeight: 1.1, textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: 34 }}>LAKI</Box>
              <Box sx={{ fontSize: 11, letterSpacing: 3, opacity: 0.75, mt: 0.5 }}>DEVELOPMENT</Box>
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h6" fontWeight={700}>
                Laki Development
              </Typography>
              <Typography variant="body2" sx={{ color: '#0088ff', fontWeight: 600, mb: 1.5 }}>
                Websites, Google-Werbung & Buchungssysteme · Winterthur
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
                Hinter Laki Development steht Lazar Petrovic, Informatiker und Software Engineer. Gemeinsam setzen
                wir auch grössere Projekte um – zum Beispiel, wenn eine Website mit Google-Werbung oder einem
                Buchungssystem kombiniert wird. Für Sie bleibt es einfach: ein fester Ansprechpartner, ein Angebot.
              </Typography>
              <Button
                component="a"
                href="https://www.laki-development.ch/?utm_source=mapsol&utm_medium=referral&utm_campaign=partner"
                target="_blank"
                rel="noopener"
                size="small"
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                laki-development.ch
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: { xs: 6, md: 8 } }}>
        <GradientCta
          title="Lust auf ein Gespräch?"
          description="15 Minuten reichen — wir klären, ob und wie wir helfen können."
          buttonText="Kostenloses Erstgespräch"
        />
      </Container>
    </Box>
  );
};

export default UeberUns;
