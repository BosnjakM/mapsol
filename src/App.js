import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import UeberUns from './pages/UeberUns';
import Services from './pages/Services';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import AGB from './pages/AGB';
import Datenschutz from './pages/Datenschutz';
import Demo from './pages/Demo';
import Projekte from './pages/Projekte';
import Demos from './pages/Demos';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
// import Preise from './pages/Preise';

// Theme configuration
let theme = createTheme({
  palette: {
    primary: {
      main: '#0088ff',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: {
            xs: '16px',
            sm: '24px',
          },
          paddingRight: {
            xs: '16px',
            sm: '24px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

// Enable responsive font sizes
theme = responsiveFontSizes(theme);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projekte" element={<Projekte />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App; 