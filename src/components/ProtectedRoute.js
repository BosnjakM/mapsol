import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Session prüfen
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem('adminSession');
        
        if (!sessionData) {
          setIsAuthenticated(false);
          return;
        }

        const session = JSON.parse(sessionData);
        
        // Prüfe ob Session abgelaufen ist
        if (Date.now() > session.expiresAt) {
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          return;
        }

        // Session ist gültig
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Session-Prüfung fehlgeschlagen:', error);
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Während der Prüfung Loading anzeigen
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Wenn nicht authentifiziert, zum Login weiterleiten
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Wenn authentifiziert, Dashboard anzeigen
  return children;
};

export default ProtectedRoute;

