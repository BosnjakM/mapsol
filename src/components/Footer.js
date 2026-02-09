import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const services = [
    { name: 'Webentwicklung', path: '/services#web' },
    { name: 'Workflow-Automatisierung', path: '/services#automation' },
    { name: 'Training', path: '/services#training' },
  ];
  
  const company = [
    { name: 'Über uns', path: '/ueber-uns' },
    { name: 'Kontakt', path: '/kontakt' },
  ];
  
  const legal = [
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' },
    { name: 'AGB', path: '/agb' },
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 10,
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Logo />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 270 }}>
              MAPSOL entwickelt innovative Automatisierungslösungen, die Ihr Unternehmen in die digitale Zukunft führen und Ihre Prozesse vereinfachen.
            </Typography>
            
            {/* Contact Information */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <MailOutlineIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                <Link href="mailto:contact@mapsol.ch" color="inherit" underline="hover">
                  contact@mapsol.ch
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                <Link href="tel:+41763101512" color="inherit" underline="hover">
                  +41 76 310 15 12
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Zürich, Switzerland
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Services
            </Typography>
            <List dense disablePadding>
              {services.map((item) => (
                <ListItem key={item.name} disableGutters sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Link 
                        component={RouterLink} 
                        to={item.path} 
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Unternehmen
            </Typography>
            <List dense disablePadding>
              {company.map((item) => (
                <ListItem key={item.name} disableGutters sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Link 
                        component={RouterLink} 
                        to={item.path} 
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Rechtliches
            </Typography>
            <List dense disablePadding>
              {legal.map((item) => (
                <ListItem key={item.name} disableGutters sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Link 
                        component={RouterLink} 
                        to={item.path} 
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          {/* Newsletter - Replaced with Contact CTA */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Kontakt
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Haben Sie Fragen oder möchten Sie ein Projekt besprechen?
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                component={RouterLink} 
                to="/kontakt" 
                sx={{
                  display: 'inline-block',
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Jetzt Kontakt aufnehmen →
              </Link>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Copyright */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Mark-Antonio Bosnjak. Alle Rechte vorbehalten.
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 0 }}>
            Gemacht mit ❤️ in Zürich
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 