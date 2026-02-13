import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button, 
  Chip,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProjectCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease-in-out',
  background: '#fff',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  }
}));

const Projekte = () => {
  // Web Projects
  const webProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      subtitle: 'Modernes Shopping-Erlebnis',
      description: 'Entwicklung eines responsiven Online-Shops mit integriertem Zahlungssystem, Bestandsverwaltung und Kundenportal.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      client: 'StyleBoutique GmbH',
      year: '2023'
    },
    {
      id: 2,
      title: 'Immobilien-Portal',
      subtitle: 'Digitale Immobiliensuche',
      description: 'Plattform zur Immobiliensuche mit interaktiver Kartenansicht, Filterfunktionen und automatischen Benachrichtigungen.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      tags: ['Next.js', 'PostgreSQL', 'Google Maps API', 'AWS'],
      client: 'ImmoFinder AG',
      year: '2023'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      subtitle: 'Analytics und Management',
      description: 'Verwaltungsdashboard für ein Software-as-a-Service-Produkt mit Echtzeit-Metriken, Benutzeranalyse und Rechnungsstellung.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Vue.js', 'Firebase', 'GraphQL', 'Tailwind CSS'],
      client: 'DataMetrix Solutions',
      year: '2022'
    }
  ];

  // AI Projects
  const aiProjects = [
    {
      id: 4,
      title: 'Chatbot für Kundenservice',
      subtitle: 'Automatisierter Support',
      description: 'Implementierung eines intelligenten Chatbots zur Beantwortung von Kundenanfragen, Auftragsabwicklung und Service-Automatisierung.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2006&q=80',
      tags: ['NLP', 'Python', 'GPT-4', 'Dialogflow'],
      client: 'TechSupport 24',
      year: '2023'
    },
    {
      id: 5,
      title: 'Datenanalyse-Assistent',
      subtitle: 'Automatisierte Insights',
      description: 'KI-gestütztes System zur Analyse großer Datenmengen, Erkennung von Trends und automatischer Generierung von Handlungsempfehlungen.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['Machine Learning', 'Python', 'TensorFlow', 'Pandas'],
      client: 'FinanceAnalytics GmbH',
      year: '2023'
    },
    {
      id: 6,
      title: 'Content-Generator',
      subtitle: 'KI-basierte Texterstellung',
      description: 'System zur automatisierten Erstellung von Website-Inhalten, Social-Media-Posts und Marketing-Materialien auf Basis von KI.',
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2006&q=80',
      tags: ['NLP', 'OpenAI API', 'Node.js', 'React'],
      client: 'ContentCreators Media',
      year: '2022'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Projekte | MAPSOL</title>
        <meta name="description" content="Unsere erfolgreichen Projekte: E-Commerce-Plattformen, Immobilien-Portale, Automatisierungslösungen und mehr. Sehen Sie, was wir für unsere Kunden entwickelt haben." />
        <link rel="canonical" href="https://mapsol.ch/projekte" />
      </Helmet>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Unsere Projekte
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Entdecken Sie unsere erfolgreichen Projekte und Lösungen, 
              die wir für unsere Kunden entwickelt haben.
            </Typography>
          </motion.div>
        </Box>

        {/* Web Projects Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'block',
                width: '40px',
                height: '4px',
                background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
                marginRight: '16px',
                borderRadius: '4px',
              }
            }}
          >
            Webentwicklung Projekte
          </Typography>

          <Grid container spacing={4}>
            {webProjects.map((project, index) => (
              <Grid item xs={12} md={4} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <ProjectCard whileHover={{ y: -10 }}>
                    <Card sx={{ boxShadow: 'none', height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                          {project.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {project.subtitle}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, mt: 2 }}>
                          {project.tags.map((tag, idx) => (
                            <Chip 
                              key={idx} 
                              label={tag} 
                              size="small" 
                              sx={{ 
                                background: 'rgba(79, 70, 229, 0.1)',
                                color: 'primary.main',
                                fontWeight: 500,
                              }} 
                            />
                          ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Kunde:</strong> {project.client}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Jahr:</strong> {project.year}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </ProjectCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* AI Projects Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'block',
                width: '40px',
                height: '4px',
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                marginRight: '16px',
                borderRadius: '4px',
              }
            }}
          >
            AI-Agenten Projekte
          </Typography>

          <Grid container spacing={4}>
            {aiProjects.map((project, index) => (
              <Grid item xs={12} md={4} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <ProjectCard whileHover={{ y: -10 }}>
                    <Card sx={{ boxShadow: 'none', height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={project.image}
                        alt={project.title}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                          {project.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {project.subtitle}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, mt: 2 }}>
                          {project.tags.map((tag, idx) => (
                            <Chip 
                              key={idx} 
                              label={tag} 
                              size="small" 
                              sx={{ 
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: 'secondary.main',
                                fontWeight: 500,
                              }} 
                            />
                          ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Kunde:</strong> {project.client}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Jahr:</strong> {project.year}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </ProjectCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 10, 
            mb: 6, 
            py: 8, 
            px: 4,
            borderRadius: 4,
            backgroundImage: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Bereit für Ihr eigenes Projekt?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Lassen Sie uns gemeinsam an Ihrer Vision arbeiten und sie in die Realität umsetzen
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to="/kontakt"
                sx={{ 
                  px: 4,
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 100,
                  boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
                }}
              >
                Projekt starten
              </Button>
            </motion.div>
          </motion.div>
        </Box>
        </Container>
      </Box>
    </>
  );
};

export default Projekte; 