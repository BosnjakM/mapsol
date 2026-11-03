import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light',
});

export const useColorMode = () => useContext(ColorModeContext);

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#0088ff',
    },
    secondary: {
      main: '#ff5500',
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#ffffff',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a1a2e',
            secondary: '#64748b',
          },
        }
      : {
          background: {
            default: '#0a0a0f',
            paper: '#12121a',
          },
          text: {
            primary: '#e2e8f0',
            secondary: '#94a3b8',
          },
          divider: 'rgba(255, 255, 255, 0.08)',
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: { xs: '16px', sm: '24px' },
          paddingRight: { xs: '16px', sm: '24px' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '9px 18px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
        },
        contained: {
          boxShadow: '0 6px 18px -8px rgba(0, 136, 255, 0.55)',
          '&:hover': { boxShadow: '0 10px 26px -8px rgba(0, 136, 255, 0.6)', transform: 'translateY(-1px)' },
        },
        outlined: {
          '&:hover': { transform: 'translateY(-1px)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            backgroundImage: 'none',
          }),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...(mode === 'dark' && {
            backgroundImage: 'none',
          }),
        },
      },
    },
  },
});

// Festes dunkles Theme, z. B. für die Startseite mit Video (unabhängig vom Hell/Dunkel-Schalter)
export const dunklesTheme = responsiveFontSizes(createTheme(getDesignTokens('dark')));

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('themeMode') : null;
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => {
    let t = createTheme(getDesignTokens(mode));
    t = responsiveFontSizes(t);
    return t;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children(theme)}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
