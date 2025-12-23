import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
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
      <Helmet>
        <title>MAPSOL | Professionelle Webentwicklung & KI-Lösungen</title>
        <meta 
          name="description" 
          content="MAPSOL bietet maßgeschneiderte Webentwicklung und KI-Lösungen für Ihr Unternehmen. Moderne Websites, E-Commerce-Plattformen, KI-Agenten und digitale Transformation. Jetzt kostenlos anfragen!" 
        />
        <meta 
          name="keywords" 
          content="Webentwicklung, Website erstellen, KI-Lösungen, E-Commerce, KI-Agenten, digitale Transformation, Softwareentwicklung, React, Firebase, Schweiz, Zürich" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mapsol.ch/" />
        <meta property="og:title" content="MAPSOL | Professionelle Webentwicklung & KI-Lösungen" />
        <meta property="og:description" content="MAPSOL bietet maßgeschneiderte Webentwicklung und KI-Lösungen für Ihr Unternehmen. Moderne Websites, E-Commerce-Plattformen und KI-Agenten." />
        <meta property="og:image" content="https://mapsol.ch/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mapsol.ch/" />
        <meta name="twitter:title" content="MAPSOL | Professionelle Webentwicklung & KI-Lösungen" />
        <meta name="twitter:description" content="MAPSOL bietet maßgeschneiderte Webentwicklung und KI-Lösungen für Ihr Unternehmen." />
        <meta name="twitter:image" content="https://mapsol.ch/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://mapsol.ch/" />
        
        {/* Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MAPSOL",
            "description": "Professionelle Webentwicklung und KI-Lösungen",
            "url": "https://mapsol.ch",
            "telephone": "+41-XXX-XXX-XXX",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zürich",
              "addressCountry": "CH"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "47.3769",
              "longitude": "8.5417"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.linkedin.com/company/mapsol",
              "https://github.com/mapsol"
            ]
          })}
        </script>
      </Helmet>
      
      {/* Hero Section with Gradient and Glass Morphism */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)',
          color: 'white',
          py: { xs: 6, sm: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '70vh', sm: '75vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated circles - hide some on mobile for better performance */}
        {!isMobile && (
          <>
            <FloatingElement
              animate={floatingAnimation}
              sx={{
                width: { xs: 80, sm: 120, md: 150 },
                height: { xs: 80, sm: 120, md: 150 },
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
                width: { xs: 100, sm: 150, md: 200 },
                height: { xs: 100, sm: 150, md: 200 },
                top: '60%',
                right: '10%',
                opacity: 0.2,
              }}
            />
          </>
        )}
        <FloatingElement
          animate={{
            ...floatingAnimation.animate,
            x: [0, -20, 0],
          }}
          sx={{
            width: { xs: 60, sm: 80, md: 100 },
            height: { xs: 60, sm: 80, md: 100 },
            bottom: '20%',
            left: '15%',
            opacity: 0.25,
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" direction={isTablet ? "column" : "row"}>
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
                    display: 'inline-block',
                    textAlign: { xs: 'center', md: 'left' },
                    width: { xs: '100%', md: 'auto' }
                  }}
                  onMouseMove={!isMobile ? handleMouseMove : undefined}
                  onTouchMove={isMobile ? handleMouseMove : undefined}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onTouchStart={() => setIsHovering(true)}
                  onTouchEnd={() => setIsHovering(false)}
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
                      fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' },
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
                      },
                      textAlign: { xs: 'center', md: 'left' }
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
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem' },
                    fontWeight: 400,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  KI-gestützte Plattformlösungen für die digitale Transformation Ihres Unternehmens
                </Typography>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size={isMobile ? "medium" : "large"}
                      endIcon={<ArrowForwardIcon />}
                      component={RouterLink}
                      to="/kontakt"
                      sx={{ 
                        mt: 2,
                        px: { xs: 3, md: 4 },
                        py: { xs: 1.4, md: 1.8 },
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        borderRadius: 100,
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Jetzt Beraten Lassen
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
            {!isMobile && (
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
                      Digitale Lösungen von morgen
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        mb: 2
                      }}
                    >
                      Wir kombinieren fortschrittliche KI-Technologie mit solider Webentwicklung, um innovative digitale Produkte zu schaffen.
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mt: 2,
                        mb: 1
                      }}
                    >
                      <CodeIcon sx={{ color: 'white', mr: 1 }} />
                      <Typography sx={{ color: 'white' }}>
                        Moderne Webanwendungen
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1
                      }}
                    >
                      <SmartToyIcon sx={{ color: 'white', mr: 1 }} />
                      <Typography sx={{ color: 'white' }}>
                        KI-gestützte Lösungen
                      </Typography>
                    </Box>
                  </GlassMorphism>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              align="center" 
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Unsere Services
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              color="textSecondary"
              sx={{ 
                mb: 6,
                mx: 'auto',
                maxWidth: '800px',
                fontSize: { xs: '1rem', md: '1.125rem' }
              }}
            >
              Maßgeschneiderte Webentwicklung mit Fokus auf Performance, Sicherheit und Benutzerfreundlichkeit für Ihren digitalen Erfolg
            </Typography>
          </motion.div>

          <Grid container spacing={3} justifyContent="center">
            {/* Web Development Card */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          backgroundColor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <CodeIcon sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        Web Entwicklung
                      </Typography>
                    </Box>
                    <Typography color="textSecondary" paragraph>
                      Responsive Webdesign, Progressive Web Apps und E-Commerce Lösungen, die Nutzer begeistern und Geschäftsziele erreichen.
                    </Typography>
                    <Button 
                      color="primary" 
                      endIcon={<ArrowForwardIcon />}
                      component={RouterLink}
                      to="/services"
                      sx={{ mt: 1 }}
                    >
                      Mehr erfahren
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* AI Solutions Card */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          backgroundColor: 'secondary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <SmartToyIcon sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        KI-Lösungen
                      </Typography>
                    </Box>
                    <Typography color="textSecondary" paragraph>
                      MAPSOL entwickelt KI-Lösungen, die Ihre Geschäftsprozesse automatisieren und Ihr Unternehmen zukunftssicher machen.
                    </Typography>
                    <Button 
                      color="secondary" 
                      endIcon={<ArrowForwardIcon />}
                      component={RouterLink}
                      to="/services"
                      sx={{ mt: 1 }}
                    >
                      Mehr erfahren
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Why Choose Us Card */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
              >
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <RocketLaunchIcon sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        Warum uns wählen
                      </Typography>
                    </Box>
                    <Typography color="textSecondary" paragraph>
                      MAPSOL verbindet technische Exzellenz mit strategischem Denken für Ihre digitale Transformation.
                    </Typography>
                    <Button 
                      color="inherit" 
                      endIcon={<ArrowForwardIcon />}
                      component={RouterLink}
                      to="/ueber-uns"
                      sx={{ mt: 1 }}
                    >
                      Mehr erfahren
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/kontakt"
                sx={{ 
                  px: { xs: 3, md: 5 },
                  py: { xs: 1.2, md: 1.5 },
                  borderRadius: 100
                }}
              >
                Kontaktieren Sie uns
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 