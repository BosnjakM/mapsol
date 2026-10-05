import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Demos from './pages/Demos';
import Garagen from './pages/Garagen';
import BranchenSeite from './pages/BranchenSeite';
import PremiumLanding from './pages/PremiumLanding';
import { LANDINGPAGES } from './pages/landing';
import fahrschulen from './pages/branchen/fahrschulen.json';
import coiffeure from './pages/branchen/coiffeure.json';
import restaurants from './pages/branchen/restaurants.json';
import seoGaragen from './pages/branchen/seo-garagen.json';
import automatisierung from './pages/branchen/automatisierung.json';
import Ratgeber from './pages/Ratgeber';
import RatgeberArtikel from './pages/RatgeberArtikel';
import { ARTIKEL } from './pages/artikel';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Danke from './pages/Danke';
import NichtGefunden from './pages/NichtGefunden';

const BRANCHEN = [fahrschulen, coiffeure, restaurants, seoGaragen, automatisierung];
// Preise deaktiviert bis Pakete finalisiert — siehe mapsol-strategy/01-WEBSITE-AUDIT.md

// Router ist austauschbar, damit scripts/prerender-content.js die Seiten beim Build
// mit einem StaticRouter vorrendern kann (fertiger Text im HTML für Google).
function App({ Router = BrowserRouter, routerProps = {} }) {
  return (
    <HelmetProvider>
      <ColorModeProvider>
        {(theme) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router {...routerProps}>
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ueber-uns" element={<UeberUns />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projekte" element={<Navigate to="/demos" replace />} />
                <Route path="/demo" element={<Navigate to="/demos" replace />} />
                <Route path="/termin" element={<Navigate to="/kontakt" replace />} />
                <Route path="/demos" element={<Demos />} />
                <Route path="/fuer-garagen" element={<Garagen />} />
                <Route path="/ratgeber" element={<Ratgeber />} />
                {ARTIKEL.map((a) => (
                  <Route key={a.pfad} path={a.pfad} element={<RatgeberArtikel artikel={a} alle={ARTIKEL} />} />
                ))}
                {LANDINGPAGES.map((l) => (
                  <Route key={l.pfad} path={l.pfad} element={<PremiumLanding daten={l} />} />
                ))}
                {BRANCHEN.map((b) => (
                  <Route key={b.pfad} path={b.pfad} element={<BranchenSeite daten={b} />} />
                ))}
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/danke" element={<Danke />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NichtGefunden />} />
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