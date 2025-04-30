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

const AGB = () => {
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
        <title>Allgemeine Geschäftsbedingungen - MAPSOL</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen von MAPSOL - Lesen Sie unsere AGB für die Nutzung unserer Dienstleistungen." />
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
                Allgemeine Geschäftsbedingungen
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
                  1. Geltungsbereich
                </Typography>
                <Typography variant="body1" paragraph>
                  Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge zwischen MAPSOL, vertreten durch Mark-Antonio Bosnjak (nachfolgend "Anbieter"), und seinen Kunden (nachfolgend "Auftraggeber") für die Erbringung von Webentwicklungs- und KI-Dienstleistungen.
                </Typography>
                <Typography variant="body1" paragraph>
                  Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
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
                  2. Vertragsschluss
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, sondern eine unverbindliche Aufforderung zur Bestellung dar. 
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Vertrag kommt durch die Annahme eines individuellen Angebots oder durch die Bestätigung eines Auftrags durch den Anbieter zustande. Angebote des Anbieters sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
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
                  3. Leistungsumfang
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Umfang der zu erbringenden Leistungen ergibt sich aus dem individuellen Angebot oder der Auftragsbestätigung. Änderungen oder Erweiterungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung.
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Anbieter bemüht sich, die vereinbarten Termine einzuhalten. Lieferfristen sind jedoch nur verbindlich, wenn sie vom Anbieter ausdrücklich schriftlich bestätigt wurden.
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
                  4. Mitwirkungspflichten des Auftraggebers
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Auftraggeber ist verpflichtet, dem Anbieter alle für die Durchführung des Auftrags notwendigen Informationen, Materialien und Zugangsdaten rechtzeitig zur Verfügung zu stellen.
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Auftraggeber stellt sicher, dass er über alle Rechte an den zur Verfügung gestellten Materialien verfügt und keine Rechte Dritter verletzt werden.
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
                  5. Vergütung und Zahlungsbedingungen
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Vergütung für die zu erbringenden Leistungen richtet sich nach dem individuellen Angebot oder der Auftragsbestätigung. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.
                </Typography>
                <Typography variant="body1" paragraph>
                  Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu zahlen, sofern nicht anders vereinbart. Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen.
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
                  6. Abnahme und Gewährleistung
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Auftraggeber ist verpflichtet, die erbrachten Leistungen unverzüglich zu prüfen und abzunehmen. Die Abnahme gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 14 Tagen nach Bereitstellung der Leistung Mängel schriftlich rügt.
                </Typography>
                <Typography variant="body1" paragraph>
                  Bei berechtigten Mängelrügen hat der Anbieter das Recht zur Nachbesserung. Schlägt die Nachbesserung fehl, kann der Auftraggeber Minderung verlangen oder vom Vertrag zurücktreten.
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
                  7. Haftung
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Anbieter haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, es sei denn, es handelt sich um die Verletzung einer wesentlichen Vertragspflicht.
                </Typography>
                <Typography variant="body1" paragraph>
                  Die Haftung ist in jedem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt und umfasst nicht entgangenen Gewinn oder mittelbare Schäden.
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
                  8. Urheberrechte und Nutzungsrechte
                </Typography>
                <Typography variant="body1" paragraph>
                  Alle im Rahmen der Leistungserbringung entstehenden urheberrechtlichen Nutzungsrechte an den erstellten Werken gehen erst nach vollständiger Zahlung der vereinbarten Vergütung auf den Auftraggeber über.
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Anbieter hat das Recht, auf erbrachte Leistungen als Referenz hinzuweisen und diese für eigene Werbezwecke zu nutzen, sofern nicht ausdrücklich anders vereinbart.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  9. Datenschutz
                </Typography>
                <Typography variant="body1" paragraph>
                  Der Anbieter erhebt, verarbeitet und nutzt personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen. Nähere Informationen finden sich in der Datenschutzerklärung des Anbieters.
                </Typography>
              </motion.div>
            </Box>

            <Box sx={{ my: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                  10. Schlussbestimmungen
                </Typography>
                <Typography variant="body1" paragraph>
                  Es gilt das Recht der Schweizerischen Eidgenossenschaft unter Ausschluss des UN-Kaufrechts.
                </Typography>
                <Typography variant="body1" paragraph>
                  Erfüllungsort und Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Zürich, Schweiz, soweit gesetzlich zulässig.
                </Typography>
                <Typography variant="body1" paragraph>
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
                </Typography>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AGB;
