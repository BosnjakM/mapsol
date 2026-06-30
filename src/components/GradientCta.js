import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '../ThemeContext';

const GradientCta = ({ title, description, buttonText, to = '/kontakt' }) => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 5, md: 6 },
        px: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: isDark ? 'rgba(0, 136, 255, 0.2)' : 'rgba(0, 136, 255, 0.15)',
        background: isDark
          ? 'linear-gradient(135deg, rgba(0, 136, 255, 0.12) 0%, rgba(255, 85, 0, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(0, 136, 255, 0.07) 0%, rgba(255, 85, 0, 0.05) 100%)',
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 440, mx: 'auto', lineHeight: 1.7 }}>
        {description}
      </Typography>
      <Button
        component={RouterLink}
        to={to}
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0088ff, #0066cc)',
          boxShadow: '0 8px 24px rgba(0, 136, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(90deg, #0099ff, #0077dd)',
            boxShadow: '0 10px 28px rgba(0, 136, 255, 0.4)',
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default GradientCta;
