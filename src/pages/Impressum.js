import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Link, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const Particle = styled(motion.div)(({ theme, size, color }) => ({
  position: 'fixed',
  width: size,
  height: size,
  borderRadius: '50%',
  background: color,
  opacity: 0.4,
  pointerEvents: 'none',
  zIndex: 0,
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
  zIndex: -1,
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  position: 'relative',
  display: 'inline-block',
  padding: '0.2rem 0',
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: theme.palette.primary.dark,
    '&::after': {
      width: '100%',
    },
  },
}));

const LinkButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  marginRight: '12px',
  marginTop: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  },
}));

const Impressum = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate more random particles
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      size: Math.random() * 20 + 5, // 5-25px
      duration: Math.random() * 20 + 10, // 10-30s
      delay: Math.random() * 5,
      color: i % 2 === 0 
        ? 'rgba(79, 70, 229, 0.25)' // primary with higher opacity
        : 'rgba(16, 185, 129, 0.2)' // secondary with higher opacity
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      overflow: 'hidden',
      pb: 10,
      zIndex: 0
    }}>
      {/* Background with gradient */}
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
            opacity: [0, 0.5, 0.3, 0.5, 0]
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
      
      <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              zIndex: 2
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Impressum
              </Typography>
            </motion.div>
            
            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Kontaktinformationen
                </Typography>
                <Typography variant="body1" paragraph>
                  Mark-Antonio Bosnjak
                  <br />
                  Zürich, Switzerland
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Kontakt
                </Typography>
                <Typography variant="body1" paragraph>
                  Telefon: +41 76 310 15 12
                  <br />
                  E-Mail: facility.mapsol@gmail.com
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Haftungsausschluss
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. 
                  Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
                  können wir jedoch keine Gewähr übernehmen.
                </Typography>
                <Typography variant="body1" paragraph>
                  Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Copyright
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Die Vervielfältigung, 
                  Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts 
                  bedürfen der schriftlichen Zustimmung des Autors bzw. Erstellers.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Datenschutz
                </Typography>
                <Typography variant="body1" paragraph>
                  Informationen zum Datenschutz finden Sie in unserer <StyledLink to="/datenschutz">Datenschutzerklärung</StyledLink>.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  Externe Links
                </Typography>
                <Typography variant="body1" paragraph>
                  Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </Typography>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Impressum; 