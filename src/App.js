import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { ColorModeProvider } from './ThemeContext';

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

function App() {
  return (
    <HelmetProvider>
      <ColorModeProvider>
        {(theme) => (
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
        )}
      </ColorModeProvider>
    </HelmetProvider>
  );
}

export default App; 