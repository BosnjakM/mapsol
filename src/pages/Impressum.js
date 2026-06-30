import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';

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

const Impressum = () => {
  return (
    <Box sx={{ pb: 10 }}>
      <Helmet>
        <title>Impressum | MAPSOL</title>
        <meta name="description" content="Impressum von MAPSOL - Rechtliche Informationen und Kontaktdaten." />
        <link rel="canonical" href="https://mapsol.ch/impressum" />
      </Helmet>

      <PageHero
        eyebrow="MAPSOL"
        title="Impressum"
        subtitle="Rechtliche Informationen und Kontaktdaten."
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
                Kontaktinformationen
              </Typography>
              <Typography variant="body1" paragraph>
                Mark-Antonio Bosnjak
                <br />
                Zürich, Switzerland
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                Kontakt
              </Typography>
              <Typography variant="body1" paragraph>
                Telefon: +41 76 310 15 12
                <br />
                E-Mail: contact@mapsol.ch
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
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
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                Copyright
              </Typography>
              <Typography variant="body1" paragraph>
                Die Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts
                bedürfen der schriftlichen Zustimmung des Autors bzw. Erstellers.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                Datenschutz
              </Typography>
              <Typography variant="body1" paragraph>
                Informationen zum Datenschutz finden Sie in unserer <StyledLink to="/datenschutz">Datenschutzerklärung</StyledLink>.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="medium">
                Externe Links
              </Typography>
              <Typography variant="body1" paragraph>
                Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Impressum;
