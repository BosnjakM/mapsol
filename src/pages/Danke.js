import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Danke = () => {
  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Helmet>
        <title>Danke | MAPSOL</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleOutlineIcon 
              sx={{ 
                fontSize: 72, 
                color: 'secondary.main', 
                mb: 3,
              }} 
            />
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Vielen Dank!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              Ihre Anfrage ist bei uns eingegangen. Wir schauen sie uns an und melden uns 
              schnellstmoeglich bei Ihnen -- in der Regel innerhalb von 24 Stunden.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: '12px', px: 4, py: 1.5, textTransform: 'none' }}
            >
              Zurueck zur Startseite
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Danke;
