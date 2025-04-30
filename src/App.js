import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import Kontakt from './pages/Kontakt';
import Projekte from './pages/Projekte';
// import Preise from './pages/Preise';
import Demo from './pages/Demo';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import UeberUns from './pages/UeberUns';
import Services from './pages/Services';
import { Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0088ff',
      light: '#42a5ff',
      dark: '#0066cc',
    },
    secondary: {
      main: '#ff5500',
      light: '#ff7733',
      dark: '#cc4400',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh' 
          }}>
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projekte" element={<Projekte />} />
                {/* Preise-Seite vorübergehend deaktiviert */}
                {/* <Route path="/preise" element={<Preise />} /> */}
                <Route path="/services" element={<Services />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/ueber-uns" element={<UeberUns />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/demo" element={<Demo />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App; 