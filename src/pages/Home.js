import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, useMediaQuery, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WorkIcon from '@mui/icons-material/Work';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useColorMode } from '../ThemeContext';

const GlassMorphism = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const FloatingElement = styled(motion.div)(() => ({
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  backdropFilter: 'blur(5px)',
}));

// Removed TitleParticle - cleaner design without particles

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Rotating words for the hero subtitle
const rotatingWords = ['Webentwicklung', 'Workflow-Automatisierung', 'n8n-Integrationen', 'Digitale Transformation'];

const Home = () => {
  const theme = useTheme();
  const { mode } = useColorMode();
  const isDark = mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollY, setScrollY] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  
  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate hero subtitle words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <Box>
      <Helmet>
        <title>MAPSOL | Professionelle Webentwicklung & Automatisierung</title>
        <meta 
          name="description" 
          content="MAPSOL bietet maßgeschneiderte Webentwicklung und Workflow-Automatisierung für Ihr Unternehmen. Moderne Websites, E-Commerce-Plattformen und Prozessautomatisierung, die Zeit spart und Fehler reduziert. Jetzt kostenlos anfragen!" 
        />
        <meta 
          name="keywords" 
          content="Webentwicklung, Website erstellen, Automatisierung, Workflow-Automatisierung, Prozessautomatisierung, E-Commerce, digitale Transformation, Softwareentwicklung, React, Firebase, Schweiz, Zürich, make.com, n8n" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mapsol.ch/" />
        <meta property="og:title" content="MAPSOL | Professionelle Webentwicklung & Automatisierung" />
        <meta property="og:description" content="MAPSOL bietet maßgeschneiderte Webentwicklung und Workflow-Automatisierung für Ihr Unternehmen. Moderne Websites, E-Commerce-Plattformen und Prozessautomatisierung, die Zeit spart." />
        <meta property="og:image" content="https://mapsol.ch/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mapsol.ch/" />
        <meta name="twitter:title" content="MAPSOL | Professionelle Webentwicklung & Automatisierung" />
        <meta name="twitter:description" content="MAPSOL bietet maßgeschneiderte Webentwicklung und Workflow-Automatisierung für Ihr Unternehmen. Zeit sparen, Fehler reduzieren." />
        <meta name="twitter:image" content="https://mapsol.ch/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://mapsol.ch/" />
        
        {/* Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MAPSOL",
            "description": "Professionelle Webentwicklung und Workflow-Automatisierung für Ihr Unternehmen",
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
      
      {/* Hero Section */}
      <Box
        sx={{
          background: isDark 
            ? 'linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)'
            : 'linear-gradient(135deg, #0088ff 0%, #ff5500 100%)',
          color: 'white',
          py: { xs: 6, sm: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '70vh', sm: '75vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '70%',
            height: '150%',
            background: 'radial-gradient(circle, rgba(0, 136, 255, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '50%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255, 85, 0, 0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          },
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
                transform: `translateY(${scrollY * 0.3}px)`,
                transition: 'transform 0.1s ease-out',
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
                transform: `translateY(${scrollY * 0.2}px)`,
                transition: 'transform 0.1s ease-out',
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
            transform: `translateY(${scrollY * 0.25}px)`,
            transition: 'transform 0.1s ease-out',
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
                >
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
                
                <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ 
                      opacity: 0.9,
                      fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem' },
                      fontWeight: 400,
                    }}
                  >
                    Massgeschneiderte Lösungen für{' '}
                    <Box component="span" sx={{ position: 'relative', display: 'inline-block', minWidth: { xs: 200, sm: 280, md: 340 }, textAlign: 'left' }}>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                          style={{ 
                            display: 'inline-block',
                            fontWeight: 600,
                            borderBottom: '2px solid rgba(0, 136, 255, 0.6)',
                            paddingBottom: '2px',
                          }}
                        >
                          {rotatingWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </Box>
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
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
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0088ff 0%, #0066cc 100%)',
                        boxShadow: '0 4px 20px rgba(0, 136, 255, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                        textTransform: 'none',
                        letterSpacing: 0.5,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0099ff 0%, #0077dd 100%)',
                          boxShadow: '0 8px 30px rgba(0, 136, 255, 0.45)',
                          transform: 'translateY(-2px)',
                        },
                        '& .MuiButton-endIcon': {
                          transition: 'transform 0.3s ease',
                        },
                        '&:hover .MuiButton-endIcon': {
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      Jetzt Beraten Lassen
                    </Button>
                  </motion.div>
                </Box>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: { xs: 2, md: 4 }, 
                      mt: { xs: 4, md: 5 },
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      flexWrap: 'wrap',
                    }}
                  >
                    {[
                      { icon: <WorkIcon sx={{ fontSize: 18 }} />, text: '10+ Projekte' },
                      { icon: <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />, text: '100% Einsatz' },
                      { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, text: 'Zürich, CH' },
                    ].map((stat, i) => (
                      <Box 
                        key={i}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.75,
                          opacity: 0.85,
                          fontSize: { xs: '0.85rem', md: '0.95rem' },
                        }}
                      >
                        {stat.icon}
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
                          {stat.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.1s ease-out',
                  }}
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
                      Wir kombinieren moderne Automatisierungstechnologie mit solider Webentwicklung, um innovative digitale Lösungen zu schaffen, die Ihre Prozesse vereinfachen und Zeit sparen.
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
                        Workflow-Automatisierung
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
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '48px',
                  height: '3px',
                  background: '#0088ff',
                  borderRadius: '2px',
                  margin: '16px auto 0',
                }
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
            {[
              {
                icon: <CodeIcon />,
                color: '#0088ff',
                title: 'Web Entwicklung',
                desc: 'Responsive Webdesign, Progressive Web Apps und E-Commerce Lösungen, die Nutzer begeistern und Geschäftsziele erreichen.',
                link: '/services',
              },
              {
                icon: <SmartToyIcon />,
                color: '#ff5500',
                title: 'Workflow-Automatisierung',
                desc: 'Geschäftsprozesse mit n8n und make.com automatisieren -- zuverlässig, skalierbar und massgeschneidert für Ihr Unternehmen.',
                link: '/services',
              },
              {
                icon: <RocketLaunchIcon />,
                color: '#8b5cf6',
                title: 'Warum MAPSOL',
                desc: 'Technische Expertise kombiniert mit strategischem Denken. Persönliche Betreuung von der Analyse bis zur Umsetzung.',
                link: '/ueber-uns',
              },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: card.color,
                        boxShadow: `0 8px 30px ${card.color}18`,
                        transform: 'translateY(-6px)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          backgroundColor: `${card.color}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2.5,
                          color: card.color,
                          '& .MuiSvgIcon-root': { fontSize: 24 },
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography color="textSecondary" variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
                        {card.desc}
                      </Typography>
                      <Button 
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                        component={RouterLink}
                        to={card.link}
                        sx={{ 
                          color: card.color,
                          fontWeight: 600,
                          textTransform: 'none',
                          p: 0,
                          '&:hover': { background: 'transparent', gap: 1 },
                        }}
                      >
                        Mehr erfahren
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* About Me Section */}
          <Box sx={{ mt: 12, mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Gradient border glow behind the image */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 260, md: 300 },
                        height: { xs: 260, md: 300 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0, 136, 255, 0.15), rgba(255, 85, 0, 0.15))',
                        filter: 'blur(30px)',
                      }}
                    />
                    <Box
                      component="img"
                      src="/images/1770121964096.png"
                      alt="Mark-Antonio Bosnjak"
                      sx={{
                        width: { xs: 220, md: 260 },
                        height: { xs: 220, md: 260 },
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        border: '4px solid white',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 600, 
                      letterSpacing: 2,
                      fontSize: '0.8rem',
                    }}
                  >
                    Über mich
                  </Typography>
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    fontWeight="bold" 
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Mark-Antonio Bosnjak
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    sx={{ mb: 2, lineHeight: 1.8, maxWidth: 560 }}
                  >
                    Ich bin Gründer von MAPSOL und spezialisiert auf moderne Webentwicklung und Workflow-Automatisierung. 
                    Mit Fokus auf n8n, make.com und React entwickle ich Lösungen, die Prozesse vereinfachen und messbaren Mehrwert schaffen.
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="textSecondary" 
                    sx={{ mb: 3, lineHeight: 1.8, maxWidth: 560 }}
                  >
                    Aus Zürich heraus arbeite ich eng mit meinen Kunden zusammen -- von der ersten Analyse bis zur laufenden Optimierung.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <motion.a
                      href="https://github.com/BosnjakM"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      style={{ color: 'inherit' }}
                    >
                      <GitHubIcon sx={{ fontSize: 24, color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/mark-antonio-bosnjak/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      style={{ color: 'inherit' }}
                    >
                      <LinkedInIcon sx={{ fontSize: 24, color: 'text.secondary', '&:hover': { color: '#0077b5' } }} />
                    </motion.a>
                    <Button
                      component={RouterLink}
                      to="/ueber-uns"
                      variant="text"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ ml: 1, fontWeight: 600 }}
                    >
                      Mehr erfahren
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </motion.div>
          </Box>

          {/* CTA Section */}
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 10, 
              mb: 2,
              py: 6,
              px: 3,
              borderRadius: 4,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0, 136, 255, 0.12) 0%, rgba(255, 85, 0, 0.12) 100%)'
                : 'linear-gradient(135deg, rgba(0, 136, 255, 0.06) 0%, rgba(255, 85, 0, 0.06) 100%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Bereit für den nächsten Schritt?
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                Lassen Sie uns in einem unverbindlichen Gespräch besprechen, wie wir Ihre Prozesse optimieren können.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/kontakt"
                  sx={{ 
                    px: { xs: 4, md: 5 },
                    py: { xs: 1.5, md: 1.8 },
                    borderRadius: 100,
                    fontSize: '1.05rem',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 0,
                      height: 0,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'width 0.6s, height 0.6s',
                    },
                    '&:hover::before': {
                      width: 300,
                      height: 300,
                    },
                    '&:hover': {
                      boxShadow: '0 15px 35px rgba(0, 136, 255, 0.4)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Kontaktieren Sie uns</span>
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 