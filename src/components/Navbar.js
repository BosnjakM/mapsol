import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, useScrollTrigger, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Logo from './Logo';

// Navbar with consistent styling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Über uns', path: '/ueber-uns' },
    { name: 'Services', path: '/services' },
    { name: 'Impressum', path: '/impressum' }
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
        <Toolbar sx={{ py: trigger ? 1 : 1.5 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ flexGrow: 1 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop menu */}
          {!isMobile && (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.name}
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
                  {item.name}
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
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                component={RouterLink} 
                to={item.path} 
                key={item.name}
                selected={activeRoute(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 136, 255, 0.1)',
                    color: 'primary.main',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 