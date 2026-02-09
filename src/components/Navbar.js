import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, useScrollTrigger, useMediaQuery, useTheme, LinearProgress, Tooltip } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import ContactsIcon from '@mui/icons-material/Contacts';
import Logo from './Logo';
import { useColorMode } from '../ThemeContext';

// Navbar with consistent styling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = mode === 'dark';
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  // Detect if page is scrolled
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* Scroll Progress Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 1301,
          backgroundColor: 'transparent',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={scrollProgress}
          sx={{
            height: '3px',
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #0088ff, #ff5500)',
              transition: 'transform 0.1s linear',
            },
          }}
        />
      </Box>
      <AppBar 
        position="sticky" 
        elevation={8} 
        sx={{ 
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          background: isDark ? 'rgba(12, 12, 18, 0.92)' : 'rgba(252, 252, 255, 0.95)',
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: activeRoute(item.path) ? '60%' : '0%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #0088ff, #ff5500)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'} arrow>
                <IconButton
                  onClick={toggleColorMode}
                  sx={{ 
                    ml: 1,
                    color: isDark ? '#f59e0b' : '#64748b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: isDark ? '#fbbf24' : '#0088ff',
                      background: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(0, 136, 255, 0.08)',
                    },
                  }}
                >
                  <motion.div
                    key={mode}
                    initial={{ rotate: -30, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex' }}
                  >
                    {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                  </motion.div>
                </IconButton>
              </Tooltip>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                onClick={toggleColorMode}
                sx={{ 
                  color: isDark ? '#f59e0b' : '#64748b',
                  width: 40,
                  height: 40,
                }}
              >
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
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
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transitionDuration={{ enter: 300, exit: 200 }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: isDark ? 'rgba(12, 12, 18, 0.98)' : 'rgba(252, 252, 255, 0.98)',
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
    </>
  );
};

export default Navbar; 