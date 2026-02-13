import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Button,
  Tab,
  Tabs,
  Paper,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Helmet } from 'react-helmet-async';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

// Project data
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "Ein moderner Online-Shop für ein lokales Modegeschäft mit vollständiger Produktverwaltung, Kundenkonto-Funktionen und sicherer Zahlungsabwicklung.",
    category: "web",
    image: "https://via.placeholder.com/800x450?text=E-Commerce+Website",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Diese E-Commerce-Plattform wurde für ein lokales Modegeschäft entwickelt, das seine Produkte online verkaufen möchte. Die Lösung umfasst eine benutzerfreundliche Produktsuche und -filterung, Kundenkonten mit Bestellhistorie, einen optimierten Checkout-Prozess und ein Dashboard für den Shopbetreiber zur einfachen Verwaltung von Produkten, Bestellungen und Kundendaten. Die Website ist vollständig responsiv und bietet ein hervorragendes Einkaufserlebnis auf allen Geräten.",
    features: [
      "Responsive Design für alle Geräte",
      "Erweitertes Produkt-Filtersystem",
      "Kundenkonto mit Bestellhistorie",
      "Sichere Zahlungsabwicklung über Stripe",
      "Admin-Dashboard zur Produktverwaltung",
      "SEO-optimierte Produktseiten",
      "Integrierte Bestandsverwaltung"
    ],
    techStack: "Frontend: React, Material-UI, Redux\nBackend: Node.js, Express\nDatenbank: MongoDB\nZahlungsabwicklung: Stripe\nHosting: AWS"
  },
  {
    id: 2,
    title: "Immobilien-Portal",
    description: "Eine umfassende Plattform für Immobilienmakler mit fortschrittlicher Suchfunktion, interaktiven Karten und Kundenanfrage-Management.",
    category: "web",
    image: "https://via.placeholder.com/800x450?text=Immobilien-Portal",
    tags: ["Vue.js", "Laravel", "PostgreSQL", "Google Maps API"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Dieses Immobilienportal wurde für eine Makleragentur entwickelt, die ihre Immobilienangebote online präsentieren und potenzielle Käufer anziehen möchte. Die Plattform bietet eine fortschrittliche Suchfunktion mit zahlreichen Filtern, interaktive Karten zur Standortvisualisierung und ein Dashboard für Makler zur Verwaltung ihrer Angebote. Interessenten können Besichtigungstermine buchen oder Anfragen zu bestimmten Objekten stellen.",
    features: [
      "Erweiterte Immobiliensuche mit mehreren Filtern",
      "Interaktive Karten mit Immobilienstandorten",
      "Detaillierte Immobilienprofile mit Bildergalerien",
      "Online-Terminbuchung für Besichtigungen",
      "Makler-Dashboard zur Angebotsverwaltung",
      "Automatische E-Mail-Benachrichtigungen",
      "Responsive Design für alle Geräte"
    ],
    techStack: "Frontend: Vue.js, Vuetify\nBackend: Laravel (PHP)\nDatenbank: PostgreSQL\nKarten: Google Maps API\nHosting: DigitalOcean"
  },
  {
    id: 3,
    title: "KI-Chatbot für Kundenservice",
    description: "Ein intelligenter Chatbot, der Kundenanfragen automatisch beantwortet, bei komplexen Fragen an menschliche Mitarbeiter weiterleitet und kontinuierlich dazulernt.",
    category: "automation",
    image: "https://via.placeholder.com/800x450?text=KI-Chatbot",
    tags: ["Python", "TensorFlow", "NLP", "FastAPI"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Dieser KI-gestützte Chatbot wurde entwickelt, um den Kundenservice eines E-Commerce-Unternehmens zu verbessern. Er kann häufig gestellte Fragen sofort beantworten, bei komplexeren Anliegen an menschliche Mitarbeiter weiterleiten und kontinuierlich aus neuen Interaktionen lernen. Der Bot ist mehrsprachig und kann in verschiedene Kommunikationskanäle integriert werden.",
    features: [
      "Natural Language Processing für natürliche Gespräche",
      "Automatische Beantwortung häufiger Fragen",
      "Intelligente Weiterleitung an menschliche Mitarbeiter",
      "Mehrsprachige Unterstützung (Deutsch, Englisch, Französisch)",
      "Kontinuierliches Training und Verbesserung",
      "Integration in Website, WhatsApp und Messenger",
      "Detaillierte Analysen der Kundeninteraktionen"
    ],
    techStack: "Backend: Python, FastAPI\nKI: TensorFlow, Natural Language Processing\nDatenbank: MongoDB\nHosting: Google Cloud\nIntegration: REST APIs für verschiedene Plattformen"
  },
  {
    id: 4,
    title: "Datenanalyse-Dashboard",
    description: "Ein interaktives Dashboard zur Visualisierung und Analyse von Unternehmensdaten mit individualisierbaren Grafiken und automatisierten Berichten.",
    category: "automation",
    image: "https://via.placeholder.com/800x450?text=Datenanalyse-Dashboard",
    tags: ["Python", "React", "pandas", "D3.js"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Dieses Datenanalyse-Dashboard wurde für ein Unternehmen entwickelt, das seine Verkaufs- und Leistungsdaten besser visualisieren und analysieren möchte. Die Lösung integriert Daten aus verschiedenen Quellen, bereitet sie automatisch auf und präsentiert sie in anpassbaren, interaktiven Diagrammen. Nutzer können eigene Berichte erstellen, Daten filtern und Vorhersagen auf Basis historischer Daten generieren.",
    features: [
      "Integration von Daten aus mehreren Quellen",
      "Interaktive, anpassbare Visualisierungen",
      "KI-gestützte Prognosen und Trendanalysen",
      "Automatisierte Berichterstattung und Alerts",
      "Benutzerbasierte Zugriffsrechte",
      "Export von Berichten in verschiedenen Formaten",
      "Mobile Optimierung für Zugriff unterwegs"
    ],
    techStack: "Frontend: React, D3.js, Material-UI\nBackend: Python, FastAPI\nDatenverarbeitung: pandas, NumPy\nML: scikit-learn\nDatenbank: PostgreSQL\nHosting: AWS"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Eine elegante und responsive Portfolio-Website für einen Fotografen mit Bildergalerien, Kontaktformular und Blog-Funktionalität.",
    category: "web",
    image: "https://via.placeholder.com/800x450?text=Portfolio+Website",
    tags: ["React", "Next.js", "Tailwind CSS", "Contentful CMS"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Diese Portfolio-Website wurde für einen professionellen Fotografen entwickelt, der seine Arbeit präsentieren und neue Kunden gewinnen möchte. Die Seite umfasst eine beeindruckende Galerie mit optimierter Bildleistung, ein Blog für Neuigkeiten und Geschichten hinter den Aufnahmen sowie ein Buchungssystem für Fotoshootings. Das Design ist minimalistisch und legt den Fokus auf die Bilder.",
    features: [
      "Optimierte Bildgalerien mit schnellen Ladezeiten",
      "Kategorisierte Portfolios für verschiedene Fotostile",
      "Blog-System für Content-Marketing",
      "Online-Buchungssystem für Fotoshootings",
      "Kontaktformular mit Spam-Schutz",
      "Vollständig responsives Design",
      "Integration mit sozialen Medien"
    ],
    techStack: "Frontend: React, Next.js, Tailwind CSS\nCMS: Contentful\nBildoptimierung: Next Image\nFormulare: Formik, Yup\nHosting: Vercel"
  },
  {
    id: 6,
    title: "Spracherkennungs-API",
    description: "Eine leistungsstarke API zur Umwandlung von Sprache in Text mit hoher Genauigkeit und Unterstützung für mehrere Sprachen und Dialekte.",
    category: "automation",
    image: "https://via.placeholder.com/800x450?text=Spracherkennungs-API",
    tags: ["Python", "TensorFlow", "Flask", "Docker"],
    demoUrl: "https://example.com",
    codeUrl: "https://github.com",
    details: "Diese Spracherkennungs-API wurde entwickelt, um gesprochene Sprache mit hoher Genauigkeit in Text umzuwandeln. Sie unterstützt mehrere Sprachen und Dialekte und kann in verschiedene Anwendungen integriert werden, von Transkriptionsdiensten bis hin zu Sprachassistenten. Die API ist als Microservice konzipiert und kann leicht skaliert werden, um unterschiedliche Lasten zu bewältigen.",
    features: [
      "Hochgenaue Spracherkennung mit Deep Learning",
      "Unterstützung für 8 Sprachen und regionale Dialekte",
      "Echtzeit-Transkription mit WebSocket-Support",
      "Robuste Rauschunterdrückung und Akzentanpassung",
      "Fachbegriff-Erkennung für spezielle Branchen",
      "Containerisierte Bereitstellung für einfache Skalierung",
      "Umfassende API-Dokumentation"
    ],
    techStack: "Backend: Python, Flask\nML: TensorFlow, PyTorch für Sprachmodelle\nInfrastruktur: Docker, Kubernetes\nAudio-Processing: librosa, pyAudioAnalysis\nHosting: Google Cloud"
  }
];

const MotionGrid = motion(Grid);
const MotionCard = motion(Card);

const Demo = () => {
  const [category, setCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [open, setOpen] = useState(false);
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };
  
  const handleClickOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);
  
  return (
    <>
      <Helmet>
        <title>Demo-Projekte | Web & AI Solutions</title>
        <meta 
          name="description" 
          content="Entdecken Sie meine Beispielprojekte im Bereich Webentwicklung und Automatisierung. Anschauliche Demos mit Details zur verwendeten Technologie."
        />
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            component="h1" 
            variant="h2" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              mb: 2,
              background: 'linear-gradient(90deg, #3a1c71, #d76d77, #ffaf7b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}
          >
            Beispielprojekte
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Entdecken Sie eine Auswahl meiner Beispielprojekte aus den Bereichen Webentwicklung 
            und künstliche Intelligenz.
          </Typography>
        </Box>
        
        {/* Category Tabs */}
        <Box sx={{ width: '100%', mb: 5 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
            <Tabs 
              value={category} 
              onChange={handleCategoryChange} 
              aria-label="project categories"
              indicatorColor="primary"
              textColor="primary"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  minWidth: 120,
                  px: 3,
                }
              }}
            >
              <Tab value="all" label="Alle Projekte" />
              <Tab 
                value="web" 
                label="Webentwicklung" 
                icon={<WebIcon />} 
                iconPosition="start" 
              />
              <Tab 
                value="automation" 
                label="Automatisierung" 
                icon={<SmartToyIcon />} 
                iconPosition="start" 
              />
            </Tabs>
          </Box>
        </Box>
        
        {/* Projects Grid */}
        <MotionGrid 
          container 
          spacing={4}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <MotionGrid item xs={12} sm={6} md={4} key={project.id} variants={itemVariants}>
              <MotionCard 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ my: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ 
                          background: theme.palette.mode === 'light' 
                            ? 'rgba(0,0,0,0.05)' 
                            : 'rgba(255,255,255,0.05)',
                        }} 
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      size="small" 
                      startIcon={<CodeIcon />}
                      onClick={() => handleClickOpen(project)}
                    >
                      Details
                    </Button>
                    <Box>
                      <IconButton 
                        size="small" 
                        aria-label="view demo" 
                        sx={{ mr: 1 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        aria-label="view code" 
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </MotionGrid>
          ))}
        </MotionGrid>
        
        {/* Project Details Dialog */}
        {selectedProject && (
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="project-dialog-title"
            maxWidth="md"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                borderRadius: 2,
              }
            }}
          >
            <DialogTitle id="project-dialog-title" sx={{ pr: 8 }}>
              <Typography variant="h5" component="span" fontWeight="bold">
                {selectedProject.title}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <CardMedia
                    component="img"
                    image={selectedProject.image}
                    alt={selectedProject.title}
                    sx={{ 
                      borderRadius: 2, 
                      height: 300, 
                      objectFit: 'cover',
                      mb: 3 
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Projektbeschreibung
                  </Typography>
                  <Typography paragraph color="text.secondary">
                    {selectedProject.details}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom fontWeight="medium" sx={{ mt: 4 }}>
                    Hauptmerkmale
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {selectedProject.features.map((feature, index) => (
                      <Typography 
                        component="li" 
                        key={index} 
                        color="text.secondary" 
                        sx={{ mb: 1 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      background: theme.palette.mode === 'light' 
                        ? 'rgba(0,0,0,0.02)' 
                        : 'rgba(255,255,255,0.03)',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="medium">
                      Technologie-Stack
                    </Typography>
                    <Typography
                      component="pre"
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        my: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.9rem'
                      }}
                    >
                      {selectedProject.techStack}
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="medium">
                      Projekt erkunden
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<OpenInNewIcon />}
                          sx={{ textTransform: 'none' }}
                        >
                          Live-Demo
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          href={selectedProject.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<GitHubIcon />}
                          sx={{ textTransform: 'none' }}
                        >
                          Code
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        )}
        
        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: 10, 
            p: 5, 
            borderRadius: 4, 
            textAlign: 'center',
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(145deg, #f7f9fc 0%, #e6e9f0 100%)' 
              : 'linear-gradient(145deg, #1e1e2e 0%, #2d2d44 100%)',
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
            Haben Sie ein ähnliches Projekt im Sinn?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              maxWidth: 800, 
              mx: 'auto' 
            }}
          >
            Diese Beispiele zeigen, was möglich ist. Lassen Sie uns besprechen, wie ich Ihre spezifischen Anforderungen umsetzen kann.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href="/kontakt"
            sx={{ 
              px: 4, 
              py: 1.5, 
              borderRadius: 10,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Projekt besprechen
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Demo; 