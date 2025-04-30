import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, useTheme, useMediaQuery, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
  background: 'rgba(255, 255, 255, 0.95)',
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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [particles, setParticles] = useState(
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
      id: 'ai',
      title: 'KI-Agenten',
      icon: <SmartToyIcon fontSize="large" />,
      description: 'Intelligente KI-Lösungen, die Ihre Geschäftsprozesse automatisieren und optimieren.',
      color: '#8b5cf6',
      features: [
        'Maßgeschneiderte KI-Modelle',
        'Chatbots für Kundenservice',
        'Automatisierung von Routineaufgaben',
        'Datenanalyse und Prognosen',
        'KI-gestützte Entscheidungshilfen',
        'Integration in bestehende Systeme'
      ],
      cta: 'KI-Lösung entwickeln'
    },
    {
      id: 'training',
      title: 'Training',
      icon: <SchoolIcon fontSize="large" />,
      description: 'Schulungen und Workshops, die Ihr Team fit für die digitale Zukunft machen.',
      color: '#f59e0b',
      features: [
        'Entwickler-Workshops',
        'KI-Grundlagen für Entscheider',
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
        <meta name="description" content="Entdecken Sie unsere Dienstleistungen: Webentwicklung, KI-Agenten, Consulting und Training für Ihre digitale Transformation." />
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
              variant="h5" 
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
              Unser Prozess
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
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
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