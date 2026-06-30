import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, IconButton, Modal, Fade, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AutomationWorkflowDemo from '../components/AutomationWorkflowDemo';
import PageHero from '../components/PageHero';

const DemoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const DemoModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(2),
  width: '90%',
  maxWidth: '1200px',
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
}));

const DemoIframe = styled('iframe')({
  flex: 1,
  width: '100%',
  border: 'none',
  borderRadius: '8px',
});

const PUBLIC = process.env.PUBLIC_URL || '';

const demos = [
  {
    id: 1,
    title: 'PowerFit Gym',
    description: 'Fitness Studio Website mit Kursplan, Mitgliedschaften und modernem UI-Design.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    url: `${PUBLIC}/demos/fitness/index.html`,
  },
  {
    id: 2,
    title: 'Premium Properties',
    description: 'Immobilien-Website mit smarter Suche, kuratierter Objektgalerie und edlem, zurückhaltendem Design.',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    url: `${PUBLIC}/demos/real-estate/index.html`,
  },
  {
    id: 3,
    title: 'TechFlow Startup',
    description: 'Innovative Startup-Landingpage mit Produkt-Highlights, Growth-Metriken und futuristischem Look & Feel.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    url: `${PUBLIC}/demos/tech-startup/index.html`,
  },
];

const Demos = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);

  const handleOpenDemo = (demo) => {
    setSelectedDemo(demo);
  };

  const handleCloseDemo = () => {
    setSelectedDemo(null);
  };

  return (
    <>
      <Helmet>
        <title>Demos | MAPSOL</title>
        <meta name="description" content="Beispiel-Websites von MAPSOL: Fitness Studio, Immobilien und Tech Startup. Demos zur Demonstration unserer Webentwicklung — keine erfundenen Kundenreferenzen." />
        <link rel="canonical" href="https://mapsol.ch/demos" />
      </Helmet>
      <PageHero
        eyebrow="MAPSOL"
        title="Demos"
        subtitle="Eine interaktive Automatisierungs-Demo und Beispiel-Websites zur Demonstration unserer Arbeit. Dies sind Demos — keine Kundenprojekte."
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
            Automatisierung live erleben
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 720, lineHeight: 1.7 }}>
            Was passiert, wenn eine Kundenanfrage reinkommt? Normalerweise: lesen, bewerten, antworten,
            ins CRM eintragen — schnell 10–15 Minuten Handarbeit pro Anfrage. Diese Demo zeigt, wie ein
            automatisierter Workflow genau das in Sekunden erledigt. Probieren Sie es aus.
          </Typography>
        </motion.div>
        <AutomationWorkflowDemo />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
          Website-Demos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, maxWidth: 720, lineHeight: 1.7 }}>
          Beispiel-Websites aus verschiedenen Branchen — klicken Sie zum Öffnen.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {demos.map((demo) => (
          <Grid item key={demo.id} xs={12} sm={6} md={4}>
            <DemoCard onClick={() => handleOpenDemo(demo)}>
              <CardMedia
                component="img"
                height="200"
                image={demo.image}
                alt={demo.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {demo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {demo.description}
                </Typography>
              </CardContent>
            </DemoCard>
          </Grid>
        ))}
      </Grid>

      <DemoModal
        open={Boolean(selectedDemo)}
        onClose={handleCloseDemo}
        closeAfterTransition
      >
        <Fade in={Boolean(selectedDemo)}>
          <ModalContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                {selectedDemo?.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNewIcon />}
                  href={selectedDemo?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  In neuem Tab öffnen
                </Button>
                <IconButton onClick={handleCloseDemo}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            {selectedDemo && (
              <DemoIframe
                src={selectedDemo.url}
                title={selectedDemo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </ModalContent>
        </Fade>
      </DemoModal>
    </Container>
    </>
  );
};

export default Demos; 