import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Preise = () => {
  const [serviceType, setServiceType] = useState('web');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Web Development Pricing
  const webPackages = [
    {
      name: "Starter",
      subtitle: "Für kleine Projekte",
      priceMonthly: 399,
      priceAnnual: 379 * 12,
      features: [
        "Responsive Landing Page",
        "Bis zu 3 Unterseiten",
        "Kontaktformular",
        "Mobile Optimierung",
        "Basis SEO-Einrichtung",
        "1 Woche Support"
      ],
      featured: false,
      cta: "Starter auswählen"
    },
    {
      name: "Business",
      subtitle: "Für wachsende Unternehmen",
      priceMonthly: 799,
      priceAnnual: 749 * 12,
      features: [
        "Alle Starter-Features",
        "Bis zu 8 Unterseiten",
        "Einfaches CMS System",
        "Kontaktformular",
        "Social Media Integration",
        "Google Analytics Setup",
        "2 Wochen Support",
        "1x Monatliches Update"
      ],
      featured: true,
      cta: "Business auswählen"
    },
    {
      name: "Premium",
      subtitle: "Für etablierte Unternehmen",
      priceMonthly: 1299,
      priceAnnual: 1199 * 12,
      features: [
        "Alle Business-Features",
        "Bis zu 15 Unterseiten",
        "Fortgeschrittenes CMS",
        "E-Commerce Funktionen",
        "Mehrsprachige Inhalte",
        "SEO-Optimierung",
        "4 Wochen Support",
        "3 Monate Updates inkl."
      ],
      featured: false,
      cta: "Premium auswählen"
    }
  ];

  // AI Agents Pricing
  const aiPackages = [
    {
      name: "Basic Bot",
      subtitle: "Einfacher Chatbot",
      priceMonthly: 499,
      priceAnnual: 459 * 12,
      features: [
        "1 einfacher Chatbot",
        "Vordefinierte Antworten",
        "Integration in Ihre Website",
        "Basis-Anpassung an Ihre Marke",
        "Einfache Benutzerführung",
        "1 Woche Support"
      ],
      featured: false,
      cta: "Basic Bot auswählen"
    },
    {
      name: "Smart Assistant",
      subtitle: "AI-gestützter Assistent",
      priceMonthly: 999,
      priceAnnual: 899 * 12,
      features: [
        "Intelligenter Chatbot mit KI",
        "Lernfähige Antworten",
        "Integration in Ihre Website",
        "Anpassung an Ihre Marke",
        "Basis-Textgenerierung",
        "Einfache Datenanalyse",
        "2 Wochen Support",
        "1 Monat Hosting inklusive"
      ],
      featured: true,
      cta: "Smart Assistant auswählen"
    },
    {
      name: "Business AI",
      subtitle: "Umfassende AI-Lösung",
      priceMonthly: 1799,
      priceAnnual: 1599 * 12,
      features: [
        "Alle Smart Assistant-Features",
        "Multi-Plattform Integration",
        "Benutzerverwaltung",
        "Erweiterte Textgenerierung",
        "Einfache Bildbearbeitung",
        "Erweiterte Datenanalyse",
        "4 Wochen Support",
        "3 Monate Hosting inklusive"
      ],
      featured: false,
      cta: "Business AI auswählen"
    }
  ];

  const activePackages = serviceType === 'web' ? webPackages : aiPackages;

  const calculateYearlyPrice = (monthlyPrice) => {
    const yearlyPrice = monthlyPrice * 12 * 0.85; // 15% discount
    return Math.round(yearlyPrice);
  };

  // FAQ Items
  const faqItems = [
    {
      question: "Wie lange dauert die Entwicklung einer Website oder eines AI-Agenten?",
      answer: "Die Entwicklungszeit variiert je nach Komplexität und Umfang des Projekts. Eine einfache Website kann innerhalb von 2-4 Wochen fertiggestellt werden, während komplexere Webprojekte oder AI-Agenten 6-12 Wochen in Anspruch nehmen können. Bei der ersten Beratung können wir einen genaueren Zeitplan für Ihr spezifisches Projekt erstellen."
    },
    {
      question: "Was ist im Hosting-Service enthalten?",
      answer: "Unser Hosting-Service umfasst zuverlässige Serverinfrastruktur, tägliche Backups, SSL-Zertifikate, Sicherheitsüberwachung, regelmäßige Updates und technischen Support. Wir sorgen dafür, dass Ihre Website oder Ihr AI-Agent stets optimal läuft und vor potenziellen Bedrohungen geschützt ist."
    },
    {
      question: "Kann ich meine bestehende Website oder meinen AI-Agenten migrieren?",
      answer: "Ja, wir bieten Migrations-Services für bestehende Websites und AI-Lösungen an. Unser Team analysiert Ihre aktuelle Implementierung und entwickelt einen Plan für eine reibungslose Migration, ohne Datenverlust oder Ausfallzeiten."
    },
    {
      question: "Bieten Sie individuelle Lösungen außerhalb der Standardpakete an?",
      answer: "Absolut! Jedes Unternehmen hat einzigartige Anforderungen. Wir bieten maßgeschneiderte Lösungen, die genau auf Ihre Bedürfnisse zugeschnitten sind. Kontaktieren Sie uns für eine persönliche Beratung und ein individuelles Angebot."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren verschiedene Zahlungsmethoden, darunter Banküberweisung, PayPal, Kreditkarten und in bestimmten Fällen auch Ratenzahlungen. Bei größeren Projekten arbeiten wir üblicherweise mit einer Anzahlung und weiteren Zahlungen basierend auf Projektmeilensteinen."
    }
  ];

  const handleServiceChange = (event, newServiceType) => {
    if (newServiceType !== null) {
      setServiceType(newServiceType);
    }
  };
  
  const handleBillingCycleChange = (event, newBillingCycle) => {
    if (newBillingCycle !== null) {
      setBillingCycle(newBillingCycle);
    }
  };

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
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: {
      y: -10,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Preise | Web & AI Solutions</title>
        <meta 
          name="description" 
          content="Entdecken Sie unsere transparenten Preispakete für Webentwicklung und Workflow-Automatisierung. Maßgeschneiderte Angebote für jede Unternehmensgröße."
        />
      </Helmet>
    
      <Container maxWidth="lg" sx={{ py: 10 }}>
        {/* Page Title */}
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
            Transparente Preisgestaltung
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Maßgeschneiderte Lösungen für Ihr Unternehmen – wählen Sie das passende Paket oder 
            kontaktieren Sie uns für individuelle Anforderungen.
          </Typography>
        </Box>
        
        {/* Service Type Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 0.5, 
              borderRadius: '18px',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <ToggleButtonGroup
              value={serviceType}
              exclusive
              onChange={handleServiceChange}
              aria-label="service type"
              sx={{ 
                '& .MuiToggleButtonGroup-grouped': {
                  border: 0,
                  borderRadius: '14px !important',
                  px: 3,
                  py: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }
              }}
            >
              <ToggleButton value="web" aria-label="web development">
                <LaptopIcon sx={{ mr: 1 }} />
                Webentwicklung
              </ToggleButton>
              <ToggleButton value="ai" aria-label="ai solutions">
                <SmartToyIcon sx={{ mr: 1 }} />
                Workflow-Automatisierung
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>
        
        {/* Billing Cycle Toggle (Only for AI) */}
        {serviceType === 'ai' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 0.5, 
                borderRadius: '18px',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <ToggleButtonGroup
                value={billingCycle}
                exclusive
                onChange={handleBillingCycleChange}
                aria-label="billing cycle"
                sx={{ 
                  '& .MuiToggleButtonGroup-grouped': {
                    border: 0,
                    borderRadius: '14px !important',
                    px: 3,
                    py: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }
                  }
                }}
              >
                <ToggleButton value="monthly" aria-label="monthly billing">
                  Monatlich
                </ToggleButton>
                <ToggleButton value="yearly" aria-label="yearly billing">
                  Jährlich <Box component="span" sx={{ ml: 1, color: 'success.main', fontWeight: 'bold' }}>-15%</Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Box>
        )}
        
        {/* Pricing Cards */}
        <MotionBox
          component={Grid}
          container
          spacing={4}
          justifyContent="center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mb: 10 }}
        >
          {activePackages.map((pkg, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionCard
                variants={cardVariants}
                whileHover="hover"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  ...(pkg.featured && {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  })
                }}
              >
                {pkg.featured && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      px: 1.5,
                      py: 0.5,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      zIndex: 1
                    }}
                  >
                    Beliebt
                  </Box>
                )}
                
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                      {pkg.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 48 }}>
                      {pkg.subtitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 2, mb: 1 }}>
                      <Typography component="span" variant="h3" fontWeight="bold">
                        {serviceType === 'web' ? (
                          `${pkg.priceMonthly} €`
                        ) : (
                          billingCycle === 'monthly' 
                            ? `${pkg.priceMonthly} €` 
                            : `${calculateYearlyPrice(pkg.priceMonthly)} €`
                        )}
                      </Typography>
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {serviceType === 'web' ? '/ einmalig' : billingCycle === 'monthly' ? '/ monatlich' : '/ jährlich'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 3, flexGrow: 1 }}>
                    <List disablePadding>
                      {pkg.features.map((feature, featureIndex) => (
                        <ListItem 
                          key={featureIndex} 
                          disableGutters 
                          sx={{ 
                            py: 1,
                            opacity: feature.available ? 1 : 0.5
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 34 }}>
                            {feature.available ? (
                              <CheckIcon color="success" fontSize="small" />
                            ) : (
                              <CloseIcon color="disabled" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature.text} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { 
                                fontWeight: feature.available ? 'medium' : 'regular'
                              }
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Button
                    component={RouterLink}
                    to="/kontakt"
                    variant={pkg.featured ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ 
                      borderRadius: '10px',
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {pkg.cta}
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </MotionBox>
        
        {/* Custom Solutions */}
        <Box 
          sx={{ 
            py: 6, 
            px: { xs: 3, md: 6 },
            borderRadius: 4,
            mb: 10,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(145deg, #f7f9fc 0%, #e6e9f0 100%)' 
              : 'linear-gradient(145deg, #1e1e2e 0%, #2d2d44 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Maßgeschneiderte Lösungen
              </Typography>
              <Typography variant="body1" paragraph>
                Benötigen Sie eine individuelle Lösung, die über unsere Standardpakete hinausgeht? 
                Ich konzipiere und entwickle maßgeschneiderte Lösungen, die genau auf Ihre spezifischen Anforderungen zugeschnitten sind.
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BuildIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Individuell anpassbar
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Vollständig auf Ihre Geschäftsanforderungen zugeschnittene Lösungen
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SpeedIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Skalierbare Architektur
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Wachsen Sie ohne Einschränkungen mit einer zukunftssicheren Lösung
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SupportIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Dedizierter Support
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Direkter Zugang zu technischer Unterstützung und Beratung
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ color: 'primary.main', mr: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Wissenstransfer
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Schulungen für Ihr Team zur eigenständigen Verwaltung 
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  p: 4, 
                  borderRadius: 3, 
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                  Kostenloses Beratungsgespräch
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  Lassen Sie uns über Ihr Projekt sprechen und gemeinsam die beste Lösung finden. 
                  Vereinbaren Sie jetzt ein unverbindliches Gespräch.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: '100%' }}
                  >
                    <Button
                      component={RouterLink}
                      to="/kontakt"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ 
                        borderRadius: '10px',
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Gespräch vereinbaren
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {/* FAQ Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
            Häufig gestellte Fragen
          </Typography>
          
          {faqItems.map((item, index) => (
            <Accordion 
              key={index} 
              elevation={0}
              sx={{ 
                mb: 2, 
                borderRadius: '10px !important',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                '&:before': {
                  display: 'none',
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: 3 }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        {/* Call To Action */}
        <Box 
          sx={{
            textAlign: 'center',
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")',
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Bereit, Ihr Projekt zu starten?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Jede großartige digitale Lösung beginnt mit einem Gespräch. Kontaktieren Sie mich für eine kostenlose Beratung.
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              <Button
                component={RouterLink}
                to="/kontakt"
                variant="contained"
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Kontaktieren Sie mich
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Preise; 