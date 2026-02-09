import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, useTheme, useMediaQuery, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SpeedIcon from '@mui/icons-material/Speed';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, rgba(0, 136, 255, 0.03) 0%, rgba(0, 136, 255, 0.03) 100%)',
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

const ValueCard = styled(motion.div)(({ theme, bgColor }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  background: bgColor || theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  position: 'relative',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const TeamMemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 20,
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: theme.spacing(2),
  maxWidth: 380,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 136, 255, 0.15)',
  },
}));

const SocialIcon = styled(motion.a)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

const UeberUns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      size: Math.random() * 15 + 5, // 5-20px
      duration: Math.random() * 20 + 10, // 10-30s
      delay: Math.random() * 5,
      color: i % 2 === 0 
        ? 'rgba(0, 136, 255, 0.15)' // primary
        : 'rgba(255, 85, 0, 0.1)' // secondary
    }));
    
    setParticles(newParticles);
  }, []);

  // Team values data
  const values = [
    {
      title: "Innovation",
      description: "Moderne Technologien",
      longDesc: "Wir setzen auf neueste Technologien und Frameworks, um zukunftsfähige Lösungen zu entwickeln.",
      icon: <AutoAwesomeIcon fontSize="large" />,
      color: '#0088ff',
    },
    {
      title: "Präzision",
      description: "Qualität & Präzision",
      longDesc: "Jede Zeile Code wird mit Sorgfalt und Präzision geschrieben, um höchste Qualität zu gewährleisten.",
      icon: <CodeIcon fontSize="large" />,
      color: '#2563eb',
    },
    {
      title: "Leidenschaft",
      description: "Begeisterung für digitale Lösungen",
      longDesc: "Unsere Leidenschaft für Technologie treibt uns an, innovative Lösungen für komplexe Probleme zu finden.",
      icon: <EmojiObjectsIcon fontSize="large" />,
      color: '#8b5cf6',
    },
    {
      title: "Effizienz",
      description: "Optimierte Prozesse & Performance",
      longDesc: "Wir optimieren kontinuierlich unsere Arbeitsabläufe und den Code, um schnelle und ressourcenschonende Anwendungen zu erstellen.",
      icon: <SpeedIcon fontSize="large" />,
      color: '#ff5500',
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Mark-Antonio Bosnjak",
      role: "Gründer & Entwickler",
      avatar: "/images/1770121964096.png",
      bio: "Spezialisiert auf moderne Webentwicklung und Workflow-Automatisierung mit n8n und make.com. Ich entwickle massgeschneiderte digitale Lösungen, die Prozesse vereinfachen und messbaren Mehrwert schaffen.",
      social: {
        github: "https://github.com/BosnjakM",
        linkedin: "https://www.linkedin.com/in/mark-antonio-bosnjak/"
      }
    }
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', pb: 10 }}>
      <Helmet>
        <title>Über uns - MAPSOL</title>
        <meta name="description" content="Lernen Sie das Team hinter MAPSOL kennen - ein motiviertes Team von Softwareentwicklern in Zürich, spezialisiert auf Webentwicklung und Workflow-Automatisierung." />
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
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6, position: 'relative', zIndex: 1 }}>
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
              Über uns
            </Typography>
            <Typography 
              variant="h5" 
              color="textSecondary" 
              sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
            >
              Ein kleines, motiviertes Team aus Zürich mit großen Ideen für die digitale Zukunft
            </Typography>
          </Box>
        </motion.div>
        
        {/* Our Values - Puzzle-like Layout */}
        <Box mb={10}>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="bold" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Unsere Werte
          </Typography>
          
          <Grid container spacing={isMobile ? 2 : 3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                  whileHover={{ 
                    translateY: -10,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <ValueCard bgColor={value.color}>
                    <IconWrapper>
                      {value.icon}
                    </IconWrapper>
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      {value.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 'auto' }}>
                      {value.longDesc}
                    </Typography>
                  </ValueCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Our Story */}
        <Box mb={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                  Unsere Geschichte
                </Typography>
                <Typography variant="body1" paragraph>
                  MAPSOL entstand aus der Überzeugung, dass gute Softwareentwicklung und durchdachte Automatisierung Unternehmen spürbar voranbringen. Was als Nebenprojekt begann, hat sich zu einem fokussierten Angebot für Webentwicklung und Workflow-Automatisierung entwickelt.
                </Typography>
                <Typography variant="body1" paragraph>
                  Heute unterstützen wir Unternehmen dabei, ihre digitalen Prozesse zu optimieren -- von modernen Webanwendungen mit React bis hin zu komplexen Automatisierungs-Workflows mit n8n und make.com. Unser Ziel: Lösungen, die zuverlässig funktionieren und echten Mehrwert schaffen.
                </Typography>
                <Typography variant="body1">
                  Als agiles Team in Zürich arbeiten wir eng mit unseren Kunden zusammen, reagieren schnell auf Anforderungen und liefern Qualität ohne Umwege.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'background.paper',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Unsere Expertise
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Webentwicklung
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Moderne, responsive Websites und Webanwendungen mit React, Angular und Vue.js. Performance und Benutzerfreundlichkeit stehen bei uns an erster Stelle.
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Automatisierung mit n8n & make.com
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Professionelle Workflow-Automatisierung mit n8n (self-hosted) und make.com. Von der Prozessanalyse bis zur laufenden Optimierung.
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Workflow-Automatisierung
                    </Typography>
                    <Typography variant="body2">
                      Automatisierung von Geschäftsprozessen durch Integration Ihrer bestehenden Tools. Wir verbinden Ihre Systeme, synchronisieren Daten automatisch und optimieren Workflows, damit Sie sich auf das Wesentliche konzentrieren können.
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        
        {/* Team Section */}
        <Box mb={6}>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="bold" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Unser Team
          </Typography>
          
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <TeamMemberCard>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ 
                      width: 160, 
                      height: 160, 
                      mb: 3,
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 20px rgba(0, 136, 255, 0.2)',
                    }}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    color="primary" 
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {member.bio}
                  </Typography>
                  
                  <Box mt={2} display="flex" justifyContent="center">
                    <SocialIcon 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      component={motion.a}
                      whileHover={{ scale: 1.2 }}
                    >
                      <GitHubIcon />
                    </SocialIcon>
                    <SocialIcon 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      component={motion.a}
                      whileHover={{ scale: 1.2 }}
                    >
                      <LinkedInIcon />
                    </SocialIcon>
                  </Box>
                </TeamMemberCard>
              </motion.div>
            ))}
          </Box>
        </Box>
        
        {/* Call to Action */}
        <Box textAlign="center" mt={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography variant="h5" gutterBottom fontWeight="medium">
              Bereit, mit uns zusammenzuarbeiten?
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
              Lassen Sie uns gemeinsam Ihre Ideen in die Realität umsetzen. Wir freuen uns darauf, Ihr Projekt kennenzulernen.
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
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default UeberUns; 