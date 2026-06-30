import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useColorMode } from '../ThemeContext';

const PageHero = ({ title, subtitle, eyebrow }) => {
  const { mode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: isDark
          ? 'linear-gradient(160deg, #0a1628 0%, #12121a 55%, #1a1520 100%)'
          : 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 45%, #fff8f3 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 136, 255, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -40,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.15 : 0.35,
          background: `repeating-linear-gradient(
            -32deg,
            transparent,
            transparent 48px,
            rgba(0, 136, 255, 0.04) 48px,
            rgba(0, 136, 255, 0.04) 49px
          )`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #0088ff, #ff5500)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', py: { xs: 7, md: 9 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {eyebrow && (
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                mb: 1.5,
                letterSpacing: 2,
                fontWeight: 700,
                color: isDark ? '#6ec1ff' : 'primary.main',
              }}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            sx={{
              mb: 2,
              display: 'inline-block',
              background: 'linear-gradient(90deg, #0088ff, #ff5500, #0088ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'titleShimmer 6s linear infinite',
              '@keyframes titleShimmer': {
                '0%': { backgroundPosition: '0% center' },
                '100%': { backgroundPosition: '200% center' },
              },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                maxWidth: 560,
                fontWeight: 400,
                lineHeight: 1.65,
                color: isDark ? 'text.secondary' : '#475569',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default PageHero;
