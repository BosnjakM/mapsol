import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, useTheme, Divider, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BuildIcon from '@mui/icons-material/Build';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import InsightsIcon from '@mui/icons-material/Insights';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(0, 136, 255, 0.03) 0%, rgba(255, 85, 0, 0.03) 100%)',
  zIndex: -1,
}));

const Particle = styled(motion.div)(({ theme, size, color }) => ({
  position: 'fixed',
  width: size,
  height: size,
  borderRadius: '50%',
  background: color,
  opacity: 0.3,
  pointerEvents: 'none',
  zIndex: 0,
}));

const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: 16,
  background: theme.palette.mode === 'dark' ? 'rgba(18, 18, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme, bgColor }) => ({
  width: 70,
  height: 70,
  borderRadius: '20%',
  background: bgColor || theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
}));

const Dot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1.5),
}));

const Services = () => {
  const theme = useTheme();
  const [particles] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: i % 2 === 0 
        ? 'rgba(0, 136, 255, 0.15)'
        : 'rgba(255, 85, 0, 0.1)'
    }))
  );

  const serviceData = [
    {
      id: 'web',
      title: 'Webentwicklung',
      icon: <CodeIcon fontSize="large" />,
      description: 'Moderne und responsive Webseiten mit den neuesten Technologien, die Ihr Unternehmen perfekt präsentieren.',
      color: '#0088ff',
      features: [
        'Responsive Design für alle Geräte',
        'Benutzerfreundliche Oberflächen',
        'Optimierte Performance',
        'SEO-freundliche Strukturen',
        'Content Management Systeme',
        'E-Commerce Lösungen'
      ],
      cta: 'Website erstellen lassen'
    },
    {
      id: 'automation',
      title: 'Workflow-Automatisierung',
      icon: <SettingsIcon fontSize="large" />,
      description: 'Wir automatisieren Ihre Geschäftsprozesse mit n8n und make.com -- zuverlässig, skalierbar und massgeschneidert auf Ihre Anforderungen.',
      color: '#8b5cf6',
      features: [
        'n8n Self-Hosted Workflows für volle Datenkontrolle',
        'Integration Ihrer bestehenden Tools (CRM, E-Mail, Datenbanken)',
        'Automatisierung wiederkehrender Aufgaben',
        'Automatische Daten-Synchronisation zwischen Systemen',
        'Automatisierte E-Mail-Kampagnen und Benachrichtigungen',
        'Massgeschneiderte Workflows für Ihre Prozesse',
        'make.com-Integrationen für spezifische Anwendungsfälle'
      ],
      cta: 'Automatisierung entwickeln'
    },
    {
      id: 'training',
      title: 'Training',
      icon: <SchoolIcon fontSize="large" />,
      description: 'Schulungen und Workshops, die Ihr Team fit für die digitale Zukunft machen.',
      color: '#f59e0b',
      features: [
        'Entwickler-Workshops',
        'Automatisierungs-Grundlagen für Entscheider',
        'Web-Technologien Schulungen',
        'Maßgeschneiderte Lernprogramme',
        'Hands-on Trainings',
        'Zertifizierungsvorbereitung'
      ],
      cta: 'Training buchen'
    }
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', pb: 10 }}>
      <Helmet>
        <title>Services - MAPSOL</title>
        <meta name="description" content="Entdecken Sie unsere Dienstleistungen: Webentwicklung, Workflow-Automatisierung, Consulting und Training für Ihre digitale Transformation. Zeit sparen, Prozesse optimieren." />
      </Helmet>
      
      {/* Background */}
      <GradientBackground />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0
          }}
          animate={{ 
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 15 - 7.5)}%`],
            y: [`${particle.y}%`, `${particle.y + (Math.random() * 15 - 7.5)}%`],
            opacity: [0, 0.3, 0.2, 0.3, 0]
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 2, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #0088ff, #ff5500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Unsere Services
            </Typography>
            <Typography 
              variant="h6" 
              color="textSecondary" 
              sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
            >
              Maßgeschneiderte Lösungen für die digitale Transformation Ihres Unternehmens
            </Typography>
          </Box>
        </motion.div>
        
        {/* Services Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }} justifyContent="center">
          {serviceData.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <ServiceCard id={service.id}>
                  <IconWrapper bgColor={service.color}>
                    {service.icon}
                  </IconWrapper>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {service.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 3, flex: 1 }}>
                    {service.features.map((feature, i) => (
                      <FeatureItem key={i}>
                        <Dot />
                        <Typography variant="body2">
                          {feature}
                        </Typography>
                      </FeatureItem>
                    ))}
                  </Box>
                  
                  {service.id === 'automation' && (
                    <Box sx={{ mt: 2, p: 2.5, bgcolor: 'rgba(139, 92, 246, 0.05)', borderRadius: 2, border: '1px solid rgba(139, 92, 246, 0.1)' }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Unsere Plattformen
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: 'rgba(139, 92, 246, 0.08)', borderRadius: 2 }}>
                          <Typography variant="body2" fontWeight={600} color="text.primary">n8n</Typography>
                          <Typography variant="caption" color="text.secondary">Self-Hosted</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: 'rgba(139, 92, 246, 0.08)', borderRadius: 2 }}>
                          <Typography variant="body2" fontWeight={600} color="text.primary">make.com</Typography>
                          <Typography variant="caption" color="text.secondary">Cloud</Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                        n8n als zentrale Plattform für maximale Datenkontrolle und Flexibilität -- ergänzt durch make.com für spezifische Integrationen.
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      component={RouterLink}
                      to="/kontakt"
                      variant="outlined"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                      sx={{ borderRadius: 8 }}
                    >
                      {service.cta}
                    </Button>
                  </Box>
                </ServiceCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* Why Choose Us for Automation Section */}
        <Box my={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Warum brauchen Sie uns für Automatisierung?
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Jeder kann make.com oder n8n öffnen. Aber nicht jeder kann die richtigen Workflows designen, 
              komplexe Integrationen umsetzen und langfristig optimieren.
            </Typography>
          </motion.div>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              {
                icon: <TrackChangesIcon />,
                color: '#0088ff',
                title: 'Strategie & Analyse',
                description: 'Wir analysieren Ihre Prozesse, identifizieren Automatisierungspotenziale und entwickeln eine maßgeschneiderte Strategie. Nicht jeder Prozess sollte automatisiert werden - wir finden die richtigen.'
              },
              {
                icon: <BuildIcon />,
                color: '#ff5500',
                title: 'Komplexe Integrationen',
                description: 'Wir verbinden Systeme, die nicht "out-of-the-box" zusammenarbeiten. API-Integrationen, Custom-Connectors, Daten-Transformationen - das ist unsere Expertise.'
              },
              {
                icon: <BoltIcon />,
                color: '#f59e0b',
                title: 'Optimierung & Performance',
                description: 'Wir optimieren Workflows für Geschwindigkeit und Zuverlässigkeit. Fehlerbehandlung, Retry-Logik, Monitoring - damit Ihre Automatisierung auch unter Last funktioniert.'
              },
              {
                icon: <ShieldIcon />,
                color: '#10b981',
                title: 'Sicherheit & Wartung',
                description: 'Wir implementieren Sicherheitsstandards, dokumentieren alles und bieten langfristige Wartung. Automatisierungen müssen gepflegt werden - wir sind Ihr Partner.'
              },
              {
                icon: <InsightsIcon />,
                color: '#8b5cf6',
                title: 'Monitoring & Reporting',
                description: 'Wir setzen Monitoring auf, damit Sie sehen, was läuft. Dashboards, Alerts, Reports - Transparenz über Ihre automatisierten Prozesse.'
              },
              {
                icon: <ScheduleIcon />,
                color: '#0088ff',
                title: 'Zeit & Ressourcen',
                description: 'Sie sparen Zeit, die Sie sonst mit Trial & Error verbringen würden. Wir bringen Erfahrung mit - Sie bekommen schneller bessere Ergebnisse.'
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      background: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '14px',
                        backgroundColor: `${item.color}14`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        color: item.color,
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How We Create Automations Section */}
        <Box my={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Wie wir Automatisierungen erstellen
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Unser strukturierter Prozess von der Analyse bis zur Wartung
            </Typography>
          </motion.div>
          
          {/* Video Placeholder - Falls du ein Video erstellst, hier einfügen */}
          {/* 
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(0, 0, 0, 0.02)',
                border: '2px dashed rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Video: So erstellen wir Automatisierungen
              </Typography>
              <Box
                component="iframe"
                src="HIER_DEIN_VIDEO_URL_EINFÜGEN"
                sx={{
                  width: '100%',
                  maxWidth: 800,
                  height: 450,
                  border: 'none',
                  borderRadius: 2,
                  mx: 'auto',
                  display: 'block',
                }}
              />
            </Paper>
          </Box>
          */}
          
          <Grid container spacing={4}>
            {[
              {
                step: 1,
                title: "Prozess-Analyse",
                description: "Wir analysieren Ihre aktuellen Prozesse, identifizieren manuelle Schritte und Bottlenecks. Gemeinsam definieren wir Ziele und Erfolgsmetriken.",
                details: ["Prozess-Mapping", "Schwachstellen-Identifikation", "ROI-Berechnung", "Ziel-Definition"]
              },
              {
                step: 2,
                title: "Workflow-Design",
                description: "Wir designen den optimalen Workflow: Welche Tools werden verbunden? Welche Daten fließen wohin? Wie werden Fehler behandelt?",
                details: ["System-Integration Planung", "Datenfluss-Design", "Fehlerbehandlung", "Sicherheitskonzept"]
              },
              {
                step: 3,
                title: "Umsetzung & Testing",
                description: "Wir setzen den Workflow in make.com/n8n um, testen gründlich mit echten Daten und optimieren Performance.",
                details: ["Workflow-Erstellung", "API-Integrationen", "Test-Szenarien", "Performance-Optimierung"]
              },
              {
                step: 4,
                title: "Launch & Monitoring",
                description: "Wir starten die Automatisierung, richten Monitoring ein und dokumentieren alles. Sie sehen sofort, was passiert.",
                details: ["Go-Live", "Monitoring-Setup", "Dokumentation", "Schulung"]
              },
              {
                step: 5,
                title: "Optimierung & Wartung",
                description: "Wir überwachen die Performance, optimieren kontinuierlich und passen an, wenn sich Ihre Prozesse ändern.",
                details: ["Performance-Analyse", "Kontinuierliche Optimierung", "Updates & Anpassungen", "Support"]
              }
            ].map((step, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      background: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, #0088ff, #ff5500)',
                        borderRadius: '4px 0 0 4px',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
                      <Box
                        sx={{
                          minWidth: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0088ff, #ff5500)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.5rem',
                          flexShrink: 0,
                        }}
                      >
                        {step.step}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {step.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                          {step.details.map((detail, i) => (
                            <Chip
                              key={i}
                              label={detail}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(0, 136, 255, 0.1)',
                                color: 'primary.main',
                                fontWeight: 500,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Process Section */}
        <Box my={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Unser allgemeiner Prozess
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {[
              {
                step: 1,
                title: "Beratung & Planung",
                description: "Wir analysieren Ihre Anforderungen und entwickeln gemeinsam mit Ihnen ein maßgeschneidertes Konzept."
              },
              {
                step: 2,
                title: "Design & Entwicklung",
                description: "Wir setzen Ihr Projekt mit modernsten Technologien und Best Practices um."
              },
              {
                step: 3,
                title: "Test & Optimierung",
                description: "Wir testen gründlich und optimieren, um höchste Qualität und Performance zu gewährleisten."
              },
              {
                step: 4,
                title: "Launch & Support",
                description: "Nach dem erfolgreichen Start stehen wir Ihnen weiterhin mit Support und Wartung zur Seite."
              }
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      position: 'relative',
                      borderRadius: 4,
                      overflow: 'hidden',
                      textAlign: 'center',
                      background: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '5px',
                        background: 'linear-gradient(90deg, #0088ff, #ff5500)'
                      }}
                    />
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        opacity: 0.1, 
                        position: 'absolute', 
                        top: -20, 
                        right: -10,
                        fontSize: '8rem',
                        fontWeight: 900,
                        color: theme.palette.primary.main
                      }}
                    >
                      {step.step}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ position: 'relative' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ position: 'relative' }}>
                      {step.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Automation Examples Section */}
        <Box my={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              textAlign="center"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Typische Automatisierungen, die wir erstellen
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Konkrete Beispiele, wie Automatisierung Ihr Business verbessert
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {[
              {
                title: "CRM & E-Mail Integration",
                description: "Neue Leads aus dem CRM werden automatisch in E-Mail-Kampagnen eingetragen, Follow-ups werden geplant und Status-Updates synchronisiert.",
                benefits: ["5 Stunden/Woche gespart", "30% mehr Follow-ups", "Keine manuellen Fehler"]
              },
              {
                title: "E-Commerce Bestellabwicklung",
                description: "Bestellungen werden automatisch verarbeitet: Inventar aktualisiert, Versandlabels erstellt, Kunden benachrichtigt, Rechnungen versendet.",
                benefits: ["Sofortige Bearbeitung", "100% korrekte Labels", "Zufriedenere Kunden"]
              },
              {
                title: "Datenbank-Synchronisation",
                description: "Daten zwischen verschiedenen Systemen (z.B. Website, CRM, Buchhaltung) werden automatisch synchronisiert - keine doppelte Eingabe mehr.",
                benefits: ["Echtzeit-Sync", "Keine Duplikate", "Immer aktuelle Daten"]
              },
              {
                title: "Social Media Automation",
                description: "Blog-Posts werden automatisch auf Social Media geteilt, Kommentare werden kategorisiert und wichtige Interaktionen werden an Sie weitergeleitet.",
                benefits: ["Konsistente Posts", "Zeitersparnis", "Bessere Reichweite"]
              },
              {
                title: "Reporting & Analytics",
                description: "Tägliche/ wöchentliche Reports werden automatisch generiert, wichtige Metriken werden analysiert und Alerts bei Auffälligkeiten versendet.",
                benefits: ["Immer aktuelle Zahlen", "Proaktive Alerts", "Bessere Entscheidungen"]
              },
              {
                title: "Lead-Qualifizierung",
                description: "Neue Leads werden automatisch bewertet, qualifizierte Leads werden an Sales weitergeleitet und Follow-up-Sequenzen gestartet.",
                benefits: ["Bessere Lead-Qualität", "Schnellere Reaktion", "Mehr Conversions"]
              }
            ].map((example, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      background: 'background.paper',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                        borderColor: 'primary.main',
                      }
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {example.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {example.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {example.benefits.map((benefit, i) => (
                        <Chip
                          key={i}
                          icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
                          label={benefit}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderColor: 'rgba(0, 136, 255, 0.3)',
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" mt={12} mb={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(0, 136, 255, 0.08) 0%, rgba(255, 85, 0, 0.08) 100%)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Bereit für Ihr nächstes Projekt?
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
                Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
              </Typography>
              <Button 
                component={RouterLink}
                to="/kontakt"
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 100,
                  boxShadow: '0 4px 14px rgba(0, 136, 255, 0.4)'
                }}
              >
                Kontakt aufnehmen
              </Button>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 