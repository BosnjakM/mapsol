import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
      <Box 
        sx={{ 
          position: 'relative',
          width: 44,
          height: 44,
          mr: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SVG-Logo für präzisere Darstellung */}
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Verbindungspunkte - oben */}
          <rect x="40" y="0" width="8" height="20" fill="#0088ff" />
          <rect x="52" y="0" width="8" height="20" fill="#0088ff" />
          
          {/* Verbindungspunkte - links */}
          <rect x="0" y="40" width="20" height="8" fill="#0088ff" />
          <rect x="0" y="52" width="20" height="8" fill="#0088ff" />
          
          {/* Verbindungspunkte - rechts */}
          <rect x="80" y="40" width="20" height="8" fill="#ff5500" />
          <rect x="80" y="52" width="20" height="8" fill="#ff5500" />
          
          {/* Verbindungspunkte - unten */}
          <rect x="40" y="80" width="8" height="20" fill="#ff5500" />
          <rect x="52" y="80" width="8" height="20" fill="#ff5500" />
          
          {/* Hauptquadrat mit Farbverlauf */}
          <rect x="20" y="20" width="60" height="60" rx="10" fill="url(#gradient)" />
          
          {/* Buchstabe M (korrigiert) */}
          <path d="M30 30 L30 70 L40 70 L40 40 L50 60 L60 40 L60 70 L70 70 L70 30 L55 30 L50 45 L45 30 L30 30 Z" fill="white" />
          
          {/* Farbverlauf-Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#ff5500" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: '#0088ff',
          fontWeight: 'bold',
        }}
      >
        MAPSOL
      </Typography>
    </Link>
  );
};

export default Logo; 