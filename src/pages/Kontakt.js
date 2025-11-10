import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Alert, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
  borderRadius: theme.shape.borderRadius * 2,
  color: 'white',
  padding: theme.spacing(6),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'transform 0.2s',
    '&:hover, &.Mui-focused': {
      transform: 'translateY(-3px)',
    },
  },
}));

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: '',
    service: 'web' // web oder ai
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (e, newService) => {
    if (newService !== null) {
      setFormData(prev => ({
        ...prev,
        service: newService
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // EmailJS-Parameter
    const serviceId = 'service_7prb3wb'; // Service-ID
    const templateId = 'template_fw9x2wq'; // Template-ID
    const publicKey = 'KO9HWxyOS-h0kfPdY'; // Public Key

    // EmailJS konfigurieren
    emailjs.init(publicKey);

    // Zusätzliche Informationen vorbereiten
    const form = e.target;
    form.service.value = formData.service; // Service-Typ zum Formular hinzufügen

    // Formular mit EmailJS senden (E-Mail an Kunden)
    emailjs.sendForm(serviceId, templateId, form, publicKey)
      .then((result) => {
        console.log('E-Mail an Kunden erfolgreich gesendet!', result.text);
        
        // Kontaktanfrage in localStorage speichern
        const contactRequest = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message,
          service: formData.service,
          date: new Date().toISOString(),
          status: 'neu'
        };
        
        // Bestehende Anfragen aus localStorage laden
        const existingRequests = JSON.parse(localStorage.getItem('contactRequests') || '[]');
        existingRequests.unshift(contactRequest); // Neue Anfrage am Anfang hinzufügen
        localStorage.setItem('contactRequests', JSON.stringify(existingRequests));
        
        // Formular zurücksetzen und Erfolg anzeigen
        setSubmitted(true);
        setSuccess(true);
        setLoading(false);
        setFormData({
          name: '',
          subject: '',
          email: '',
          phone: '',
          message: '',
          service: 'web'
        });
        
        // Admin-Benachrichtigung an facility.mapsol@gmail.com senden
        // WICHTIG: In EmailJS muss das Template "To Email" FEST auf facility.mapsol@gmail.com eingestellt sein!
        const adminTemplateId = 'template_gvq1rpc'; // Ersetze mit deiner Admin-Template-ID falls anders
        const adminTemplateParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Nicht angegeben',
          service: formData.service === 'web' ? 'Web-Applikation' : 'KI-Lösung',
          subject: `🔔 Neue Kontaktanfrage: ${formData.subject}`,
          message: formData.message
        };
        
        // Admin-Benachrichtigung asynchron senden (blockiert nicht den Erfolg)
        emailjs.send(serviceId, adminTemplateId, adminTemplateParams, publicKey)
          .then((adminResult) => {
            console.log('Benachrichtigungs-E-Mail an Admin erfolgreich gesendet!', adminResult.text);
          })
          .catch((adminError) => {
            console.warn('Admin-Benachrichtigung fehlgeschlagen:', adminError);
            // Fehler wird ignoriert, da Kunden-E-Mail bereits erfolgreich war
          });
      })
      .catch((error) => {
        console.error('Fehler beim Senden der E-Mail:', error.text);
        setError('Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.');
        setLoading(false);
      });
  };

  return (
    <Box 
      sx={{ 
        py: 8,
        px: 2,
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Helmet>
        <title>Kontakt - MAPSOL</title>
        <meta name="description" content="Kontaktieren Sie MAPSOL für maßgeschneiderte Webentwicklung und KI-Lösungen. Erreichen Sie uns per Formular, E-Mail oder Telefon." />
      </Helmet>

      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
            Kontakt
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 6 }} color="text.secondary">
            Nehmen Sie Kontakt auf und lassen Sie uns Ihr digitales Projekt gemeinsam realisieren - ob Webapplikation oder KI-Lösung.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 2, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Schreiben Sie uns
                </Typography>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Hey, danke für Ihr Interesse und Vertrauen in MAPSOL! Wir werden Ihre Anfrage anschauen und uns schnellstmöglich bei Ihnen melden.
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Wofür interessieren Sie sich?
                      </Typography>
                      <input type="hidden" name="service" value={formData.service} />
                      <ToggleButtonGroup
                        value={formData.service}
                        exclusive
                        onChange={handleServiceChange}
                        aria-label="Service-Typ"
                        fullWidth
                        sx={{ mb: 2 }}
                      >
                        <ToggleButton 
                          value="web" 
                          aria-label="Web-Applikation"
                          sx={{
                            py: 1,
                            '&.Mui-selected': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              }
                            }
                          }}
                        >
                          <CodeIcon sx={{ mr: 1 }} />
                          Web-Applikation
                        </ToggleButton>
                        <ToggleButton 
                          value="ai" 
                          aria-label="KI-Lösung"
                          sx={{
                            py: 1,
                            '&.Mui-selected': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              }
                            }
                          }}
                        >
                          <SmartToyIcon sx={{ mr: 1 }} />
                          KI-Lösung
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <motion.div variants={fadeIn}>
                        <StyledTextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          required
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <motion.div variants={fadeIn}>
                        <StyledTextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                          required
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={fadeIn}>
                        <StyledTextField
                          fullWidth
                          label="Betreff"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          variant="outlined"
                          required
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div variants={fadeIn}>
                        <StyledTextField
                          fullWidth
                          label="Nachricht"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                        />
                      </motion.div>
                    </Grid>
                    <Grid item xs={12}>
                      <motion.div
                        variants={fadeIn}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          endIcon={submitted ? <CheckCircleIcon /> : <SendIcon />}
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            py: 1.5,
                            mt: 2,
                            borderRadius: 2,
                            transition: '0.3s',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                              transform: 'translateY(-3px)',
                              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                            }
                          }}
                          fullWidth
                          disabled={submitted || loading}
                        >
                          {loading ? 'Wird gesendet...' : submitted ? 'Gesendet' : 'Absenden'}
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <GradientBox
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight="bold" color="common.white">
                  Kontaktinformationen
                </Typography>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 4 }}>
                    <EmailIcon sx={{ color: 'common.white', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="body1" color="common.white" fontWeight="medium">
                        Email
                      </Typography>
                      <Typography variant="body2" color="common.white" sx={{ opacity: 0.8 }}>
                        facility.mapsol@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PhoneIcon sx={{ color: 'common.white', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="body1" color="common.white" fontWeight="medium">
                        Telefon
                      </Typography>
                      <Typography variant="body2" color="common.white" sx={{ opacity: 0.8 }}>
                        +41 76 310 15 12
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ color: 'common.white', mr: 2, fontSize: 28 }} />
                    <Box>
                      <Typography variant="body1" color="common.white" fontWeight="medium">
                        Adresse
                      </Typography>
                      <Typography variant="body2" color="common.white" sx={{ opacity: 0.8 }}>
                        Zürich, Switzerland
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </GradientBox>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Kontakt; 