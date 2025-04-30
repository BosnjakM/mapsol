import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const GlassMorphism = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const FloatingElement = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  backdropFilter: 'blur(5px)',
}));

const TitleParticle = styled(motion.div)(({ size, color }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: color,
  borderRadius: '50%',
  pointerEvents: 'none',
  filter: 'blur(1px)',
  boxShadow: `0 0 8px ${color}`,
}));

const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Home = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Handle mouse movement over title
  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    
    // Create new particle on mouse move if hovering
    if (isHovering && Math.random() > 0.6) {
      // Only create particles occasionally to avoid too many
      const newParticle = {
        id: Date.now(),
        x,
        y,
        size: Math.random() * 5 + 2, // 2-7px
        duration: Math.random() * 0.8 + 0.5, // 0.5-1.3s
        color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(224, 242, 255, 0.9)'
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Clean up particles after their animation is complete
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, newParticle.duration * 1000 + 10);
    }
  };

  return (
    <Box>
      {/* Hero Section with Gradient and Glass Morphism */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated circles */}
        <FloatingElement
          animate={floatingAnimation}
          sx={{
            width: 150,
            height: 150,
            top: '10%',
            left: '5%',
            opacity: 0.3,
          }}
        />
        <FloatingElement
          animate={{
            ...floatingAnimation.animate,
            x: [0, 30, 0],
          }}
          sx={{
            width: 200,
            height: 200,
            top: '60%',
            right: '10%',
            opacity: 0.2,
          }}
        />
        <FloatingElement
          animate={{
            ...floatingAnimation.animate,
            x: [0, -20, 0],
          }}
          sx={{
            width: 100,
            height: 100,
            bottom: '20%',
            left: '15%',
            opacity: 0.25,
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Interactive title with particle effect */}
                <Box 
                  sx={{ 
                    mb: 3, 
                    position: 'relative',
                    display: 'inline-block'
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Particles that follow cursor movement */}
                  {particles.map((particle) => (
                    <TitleParticle
                      key={particle.id}
                      size={particle.size}
                      color={particle.color}
                      initial={{ 
                        x: particle.x, 
                        y: particle.y,
                        opacity: 0.8,
                        scale: 1
                      }}
                      animate={{ 
                        x: particle.x + (Math.random() * 40 - 20),
                        y: particle.y + (Math.random() * 40 - 20),
                        opacity: 0,
                        scale: 0
                      }}
                      transition={{ 
                        duration: particle.duration,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '3.2rem', md: '5rem' },
                      textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      lineHeight: 1.1,
                      letterSpacing: '0.1em',
                      background: 'linear-gradient(90deg, #ffffff, #e0f2ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      cursor: 'default',
                      userSelect: 'none',
                      transition: 'text-shadow 0.3s ease',
                      '&:hover': {
                        textShadow: '0 2px 15px rgba(255,255,255,0.5)'
                      }
                    }}
                  >
                    MAPSOL
                  </Typography>
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    fontSize: { xs: '1.3rem', md: '1.6rem' },
                    fontWeight: 400,
                  }}
                >
                  KI-gestützte Plattformlösungen für die digitale Transformation Ihres Unternehmens
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    component={RouterLink}
                    to="/kontakt"
                    sx={{ 
                      mt: 2,
                      px: 4,
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 100,
                      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    Jetzt Beraten Lassen
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <GlassMorphism>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    Warum uns wählen?
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {[
                      '✓ Moderne Technologien',
                      '✓ Maßgeschneiderte Lösungen',
                      '✓ Schnelle Entwicklung',
                      '✓ Persönliche Betreuung'
                    ].map((item, index) => (
                      <Typography 
                        key={index} 
                        variant="body1" 
                        sx={{ 
                          mb: 1.5,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </GlassMorphism>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Unsere Dienstleistungen
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Maßgeschneiderte Webentwicklung mit Fokus auf Performance, Sicherheit und Benutzerfreundlichkeit für Ihren digitalen Erfolg
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: "Responsive Webdesign",
                description: "Nutzerfreundliche Designs, die auf allen Geräten optimal funktionieren und eine hervorragende Benutzererfahrung bieten.",
                icon: <CodeIcon sx={{ fontSize: 40 }} />,
                color: "#4f46e5"
              },
              {
                title: "Progressive Web Apps",
                description: "Schnelle, zuverlässige und ansprechende Webanwendungen, die wie native Apps funktionieren und offline nutzbar sind.",
                icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
                color: "#10b981"
              },
              {
                title: "E-Commerce Lösungen",
                description: "Leistungsstarke Online-Shops mit sicherer Zahlungsabwicklung, Bestandsverwaltung und Kundenverwaltung.",
                icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
                color: "#f59e0b"
              }
            ].map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      display: 'flex', 
                      flexDirection: 'column',
                      p: 3,
                      borderRadius: 4,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '50%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: 'white',
                        bgcolor: service.color,
                        boxShadow: `0 8px 20px ${service.color}40`,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                        {service.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AI Section */}
      <Box sx={{ py: 12, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              KI-Lösungen
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              MAPSOL entwickelt KI-Lösungen, die Ihre Geschäftsprozesse automatisieren und Ihr Unternehmen zukunftssicher machen
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: "Maßgeschneiderte KI-Modelle",
                description: "Entwicklung und Training von individuellen KI-Modellen für Ihre spezifischen Geschäftsanforderungen.",
                icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
                color: "#4f46e5"
              },
              {
                title: "Intelligente Chatbots",
                description: "Implementierung von intelligenten Konversationssystemen für Kundenservice, Lead-Generierung und Support.",
                icon: <CodeIcon sx={{ fontSize: 40 }} />,
                color: "#10b981"
              },
              {
                title: "Datenanalyse & Prognosen",
                description: "Fortschrittliche Datenanalyse und Prognosemodelle zur Unterstützung Ihrer Geschäftsentscheidungen.",
                icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
                color: "#f59e0b"
              }
            ].map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      display: 'flex', 
                      flexDirection: 'column',
                      p: 3,
                      borderRadius: 4,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: '50%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: 'white',
                        bgcolor: service.color,
                        boxShadow: `0 8px 20px ${service.color}40`,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                        {service.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                  Warum MAPSOL?
                </Typography>
                <Typography variant="h6" paragraph color="text.secondary">
                  MAPSOL verbindet technische Exzellenz mit strategischem Denken für Ihre digitale Transformation
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  {[
                    {
                      title: "Agile Entwicklung",
                      description: "Wir arbeiten in kurzen Entwicklungszyklen und liefern regelmäßig funktionsfähige Software mit kontinuierlicher Verbesserung und Anpassung."
                    },
                    {
                      title: "Zukunftssichere Technologien",
                      description: "Wir setzen auf moderne Frameworks und skalierbare Architekturen, die Ihr Unternehmen langfristig unterstützen und mit Ihrem Geschäft wachsen."
                    },
                    {
                      title: "Transparente Kommunikation",
                      description: "Klare und offene Kommunikation in allen Projektphasen für gegenseitiges Verständnis und erfolgreiche Zusammenarbeit."
                    }
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      borderRadius: 4,
                      top: -16,
                      left: -16,
                      zIndex: -1,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      bgcolor: 'secondary.main',
                      opacity: 0.05,
                      borderRadius: 4,
                      top: 16,
                      left: 16,
                      zIndex: -1,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                    alt="Team collaboration"
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 12, 
          background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Bereit für Ihre digitale Transformation?
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 6, opacity: 0.9 }}>
              Lassen Sie uns gemeinsam an Ihrem Erfolg arbeiten. Kontaktieren Sie uns noch heute für ein unverbindliches Beratungsgespräch.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/kontakt"
                sx={{ 
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 100,
                  bgcolor: 'white',
                  color: 'primary.main',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: 'white',
                  }
                }}
              >
                Kontakt Aufnehmen
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 