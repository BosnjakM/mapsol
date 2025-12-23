import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Alte localStorage-Sessions aufräumen (falls noch vorhanden)
    if (localStorage.getItem('adminSession')) {
      localStorage.removeItem('adminSession');
    }

    // Firebase Auth State Listener - prüft automatisch ob User eingeloggt ist
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User ist eingeloggt
        setIsAuthenticated(true);
      } else {
        // Kein User eingeloggt
        setIsAuthenticated(false);
      }
    });

    // Cleanup function
    return () => unsubscribe();
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

