import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, useScrollTrigger, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import ContactsIcon from '@mui/icons-material/Contacts';
import Logo from './Logo';

// Navbar with consistent styling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  // Detect if page is scrolled
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Services', path: '/services' },
    { text: 'Demos', path: '/demos' },
    { text: 'Kontakt', path: '/kontakt' },
  ];

  const activeRoute = (path) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={8} 
      sx={{ 
        backgroundColor: 'white',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        background: 'rgba(252, 252, 255, 0.95)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: trigger ? 0.5 : { xs: 0.8, md: 1.5 }, px: { xs: 1, sm: 2 } }}>
          <motion.div
            whileHover={{ scale: isSmallMobile ? 1 : 1.05 }}
            style={{ flexGrow: 1 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop menu */}
          {!isMobile && (
            <Box>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="primary"
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    mx: 1,
                    fontWeight: 600,
                    position: 'relative',
                    '&::after': activeRoute(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #0088ff, #ff5500)',
                      borderRadius: '3px',
                    } : {}
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/kontakt"
                sx={{ 
                  ml: 2,
                  px: 3,
                  borderRadius: 100,
                  boxShadow: '0 4px 12px rgba(255, 85, 0, 0.3)',
                }}
              >
                Kontakt
              </Button>
            </Box>
          )}

          {/* Mobile menu toggle */}
          {isMobile && (
            <IconButton 
              edge="end" 
              color="primary" 
              aria-label="menu"
              onClick={() => setIsOpen(true)}
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: 'rgba(252, 252, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            pt: 2
          }
        }}
      >
        <Box
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            pb: 2,
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}
        >
          <Logo />
          <IconButton 
            onClick={() => setIsOpen(false)}
            color="primary"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ width: '100%' }}
          role="presentation"
        >
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                component={RouterLink} 
                to={item.path} 
                key={item.text}
                selected={activeRoute(item.path)}
                onClick={() => setIsOpen(false)}
                sx={{
                  py: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 136, 255, 0.1)',
                    color: 'primary.main',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeRoute(item.path) ? 'primary.main' : 'inherit',
                    minWidth: 45
                  }}
                >
                  {item.text === 'Home' && <HomeIcon />}
                  {item.text === 'Services' && <CodeIcon />}
                  {item.text === 'Demos' && <ArticleIcon />}
                  {item.text === 'Kontakt' && <ContactsIcon />}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: activeRoute(item.path) ? 600 : 400
                  }}
                />
              </ListItem>
            ))}
            <ListItem 
              button 
              component={RouterLink} 
              to="/kontakt" 
              sx={{
                mt: 2,
                py: 2,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 45 }}>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Kontakt" 
                primaryTypographyProps={{
                  fontWeight: 600
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 