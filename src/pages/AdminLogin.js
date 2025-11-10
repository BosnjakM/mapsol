import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { Helmet } from 'react-helmet-async';

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  maxWidth: 450,
  margin: '0 auto',
}));

const GradientBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(0, 136, 255, 0.05) 0%, rgba(255, 85, 0, 0.05) 100%)',
  padding: theme.spacing(3),
}));

// Passwort-Hash (SHA-256 Hash von deinem Passwort)
// Passwort: Xwtqrcd
// Hash generiert mit: crypto.createHash('sha256').update('Xwtqrcd').digest('hex')
const ADMIN_PASSWORD_HASH = 'd642370343ebc435ec1cf40b1d08d2aa86e644a9e0bfe7fd4ab994fcc06276ea';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // SHA-256 Hash-Funktion
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Username prüfen (kannst du auch ändern)
      if (username !== 'admin') {
        setError('Ungültiger Benutzername oder Passwort');
        setLoading(false);
        return;
      }

      // Passwort hashen und mit gespeichertem Hash vergleichen
      const passwordHash = await hashPassword(password);
      
      if (passwordHash === ADMIN_PASSWORD_HASH) {
        // Session-Token generieren
        const sessionToken = btoa(Date.now().toString() + Math.random().toString()).substring(0, 32);
        const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 Stunden
        
        // Session in localStorage speichern
        localStorage.setItem('adminSession', JSON.stringify({
          token: sessionToken,
          expiresAt: expiresAt,
          username: username
        }));

        // Zum Dashboard weiterleiten
        navigate('/admin');
      } else {
        setError('Ungültiger Benutzername oder Passwort');
      }
    } catch (err) {
      console.error('Login-Fehler:', err);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBox>
      <Helmet>
        <title>Admin Login - MAPSOL</title>
      </Helmet>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LoginPaper>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Admin Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bitte melden Sie sich an, um auf das Dashboard zuzugreifen
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoComplete="username"
                autoFocus
              />
              <TextField
                fullWidth
                label="Passwort"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Wird angemeldet...' : 'Anmelden'}
              </Button>
            </form>
          </LoginPaper>
        </motion.div>
      </Container>
    </GradientBox>
  );
};

export default AdminLogin;

