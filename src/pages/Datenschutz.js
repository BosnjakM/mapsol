import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)',
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

const Datenschutz = () => {
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      size: Math.random() * 15 + 5, // 5-20px
      duration: Math.random() * 20 + 10, // 10-30s
      delay: Math.random() * 5,
      color: i % 2 === 0 
        ? 'rgba(79, 70, 229, 0.15)' // primary
        : 'rgba(16, 185, 129, 0.1)' // secondary
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      overflow: 'hidden',
      pb: 10
    }}>
      <Helmet>
        <title>Datenschutzerklärung - MAPSOL</title>
        <meta name="description" content="Datenschutzerklärung von MAPSOL - Erfahren Sie, wie wir Ihre persönlichen Daten schützen." />
      </Helmet>
      
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
              background: 'background.paper',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
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
                Datenschutzerklärung
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Divider sx={{ my: 3 }} />
            </motion.div>
            
            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  1. Verantwortlicher
                </Typography>
                <Typography variant="body1" paragraph>
                  Mark-Antonio Bosnjak<br />
                  Zürich, Switzerland<br />
                  E-Mail: contact@mapsol.ch<br />
                  Telefon: +41 76 310 15 12
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
                  2. Allgemeines zur Datenverarbeitung
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten Ihre personenbezogenen Daten nur in Übereinstimmung mit den geltenden Datenschutzgesetzen. In dieser Datenschutzerklärung informieren wir Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
                </Typography>
                <Typography variant="body1" paragraph>
                  Diese Website dient in erster Linie der Bereitstellung von Informationen über unser Unternehmen und unsere Dienstleistungen. Die Erhebung und Verarbeitung personenbezogener Daten beschränkt sich auf das notwendige Minimum.
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
                  3. Kontaktaufnahme
                </Typography>
                <Typography variant="body1" paragraph>
                  Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren, werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, gegebenenfalls Ihr Name und Ihre Telefonnummer) gespeichert, um Ihre Anfrage zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
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
                  4. Externe Links
                </Typography>
                <Typography variant="body1" paragraph>
                  Unsere Website enthält Links zu externen Websites, insbesondere zu GitHub-Repositories. Wir haben keinen Einfluss auf den Inhalt und die Datenschutzpraktiken dieser Websites und sind dafür nicht verantwortlich. Wenn Sie auf einen Link zu GitHub oder anderen externen Websites klicken, beachten Sie bitte die jeweiligen Datenschutzerklärungen dieser Anbieter.
                </Typography>
                <Typography variant="body1" paragraph>
                  GitHub (betrieben von Microsoft Corporation) hat seine eigene Datenschutzrichtlinie, die Sie unter <a href="https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement</a> einsehen können.
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
                  5. Hosting und Serverprotokolle
                </Typography>
                <Typography variant="body1" paragraph>
                  Beim Besuch unserer Website werden automatisch Informationen in den Serverprotokollen gespeichert. Dies umfasst typischerweise die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite, den Browsertyp und die Browserversion, das Betriebssystem sowie den Referrer (die Webseite, von der aus Sie unsere Website besucht haben). Diese Daten werden ausschließlich zu Zwecken der Systemsicherheit und zur Optimierung unseres Angebots verarbeitet und nicht mit anderen Datenquellen zusammengeführt.
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage unseres berechtigten Interesses an der Gewährleistung eines stabilen und sicheren Betriebs unserer Website.
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
                  6. Cookies und Tracking
                </Typography>
                <Typography variant="body1" paragraph>
                  Unsere Website verwendet keine Tracking-Cookies, Analyse-Tools oder andere Tracking-Technologien zur Überwachung des Nutzerverhaltens. Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind (z.B. für die Sessionverwaltung).
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  7. Ihre Rechte
                </Typography>
                <Typography variant="body1" paragraph>
                  Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten sowie auf Berichtigung oder Löschung oder auf Einschränkung der Verarbeitung, soweit Ihnen dies gesetzlich zusteht. Außerdem haben Sie das Recht auf Datenübertragbarkeit.
                </Typography>
                <Typography variant="body1" paragraph>
                  Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  8. Änderungen der Datenschutzerklärung
                </Typography>
                <Typography variant="body1" paragraph>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </Typography>
                <Typography variant="body1" paragraph>
                  Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
                </Typography>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Datenschutz;
