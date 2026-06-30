import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';

const Datenschutz = () => {
  const stand = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Box sx={{ pb: 10 }}>
      <Helmet>
        <title>Datenschutzerklärung | MAPSOL</title>
        <meta name="description" content="Datenschutzerklärung von MAPSOL - Erfahren Sie, wie wir Ihre persönlichen Daten schützen." />
        <link rel="canonical" href="https://www.mapsol.ch/datenschutz" />
      </Helmet>

      <PageHero
        eyebrow="MAPSOL"
        title="Datenschutz"
        subtitle={`Wie wir mit Ihren Daten umgehen — Stand: ${stand}.`}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                1. Verantwortlicher
              </Typography>
              <Typography variant="body1" paragraph>
                Mark-Antonio Bosnjak<br />
                Zürich, Switzerland<br />
                E-Mail: contact@mapsol.ch<br />
                Telefon: +41 76 310 15 12
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                2. Allgemeines zur Datenverarbeitung
              </Typography>
              <Typography variant="body1" paragraph>
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten Ihre personenbezogenen Daten nur in Übereinstimmung mit den geltenden Datenschutzgesetzen. In dieser Datenschutzerklärung informieren wir Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
              </Typography>
              <Typography variant="body1" paragraph>
                Diese Website dient in erster Linie der Bereitstellung von Informationen über unser Unternehmen und unsere Dienstleistungen. Die Erhebung und Verarbeitung personenbezogener Daten beschränkt sich auf das notwendige Minimum.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                3. Kontaktaufnahme
              </Typography>
              <Typography variant="body1" paragraph>
                Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren, werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, gegebenenfalls Ihr Name und Ihre Telefonnummer) gespeichert, um Ihre Anfrage zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                4. Externe Links
              </Typography>
              <Typography variant="body1" paragraph>
                Unsere Website enthält Links zu externen Websites, insbesondere zu GitHub-Repositories. Wir haben keinen Einfluss auf den Inhalt und die Datenschutzpraktiken dieser Websites und sind dafür nicht verantwortlich. Wenn Sie auf einen Link zu GitHub oder anderen externen Websites klicken, beachten Sie bitte die jeweiligen Datenschutzerklärungen dieser Anbieter.
              </Typography>
              <Typography variant="body1" paragraph>
                GitHub (betrieben von Microsoft Corporation) hat seine eigene Datenschutzrichtlinie, die Sie unter <a href="https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement</a> einsehen können.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                5. Hosting und Serverprotokolle
              </Typography>
              <Typography variant="body1" paragraph>
                Beim Besuch unserer Website werden automatisch Informationen in den Serverprotokollen gespeichert. Dies umfasst typischerweise die IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite, den Browsertyp und die Browserversion, das Betriebssystem sowie den Referrer (die Webseite, von der aus Sie unsere Website besucht haben). Diese Daten werden ausschließlich zu Zwecken der Systemsicherheit und zur Optimierung unseres Angebots verarbeitet und nicht mit anderen Datenquellen zusammengeführt.
              </Typography>
              <Typography variant="body1" paragraph>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage unseres berechtigten Interesses an der Gewährleistung eines stabilen und sicheren Betriebs unserer Website.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                6. Cookies und Tracking
              </Typography>
              <Typography variant="body1" paragraph>
                Unsere Website verwendet keine Tracking-Cookies, Analyse-Tools oder andere Tracking-Technologien zur Überwachung des Nutzerverhaltens. Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind (z.B. für die Sessionverwaltung).
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                7. Ihre Rechte
              </Typography>
              <Typography variant="body1" paragraph>
                Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten sowie auf Berichtigung oder Löschung oder auf Einschränkung der Verarbeitung, soweit Ihnen dies gesetzlich zusteht. Außerdem haben Sie das Recht auf Datenübertragbarkeit.
              </Typography>
              <Typography variant="body1" paragraph>
                Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                8. Änderungen der Datenschutzerklärung
              </Typography>
              <Typography variant="body1" paragraph>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </Typography>
              <Typography variant="body1" paragraph>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Datenschutz;
