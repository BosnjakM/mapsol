import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('alle');
  const [filterService, setFilterService] = useState('alle');

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  useEffect(() => {
    loadRequests();
    // Auto-refresh alle 5 Sekunden
    const interval = setInterval(loadRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadRequests = () => {
    const stored = localStorage.getItem('contactRequests');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sortiere nach Datum (neueste zuerst)
      parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRequests(parsed);
    }
  };

  const updateStatus = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    localStorage.setItem('contactRequests', JSON.stringify(updated));
  };

  const deleteRequest = (id) => {
    if (window.confirm('Möchten Sie diese Anfrage wirklich löschen?')) {
      const updated = requests.filter(req => req.id !== id);
      setRequests(updated);
      localStorage.setItem('contactRequests', JSON.stringify(updated));
      if (selectedRequest?.id === id) {
        setOpenDialog(false);
      }
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'neu':
        return 'warning';
      case 'in Bearbeitung':
        return 'info';
      case 'erledigt':
        return 'success';
      case 'abgelehnt':
        return 'error';
      default:
        return 'default';
    }
  };

  const getServiceIcon = (service) => {
    return service === 'web' ? <CodeIcon /> : <SmartToyIcon />;
  };

  const filteredRequests = requests.filter(req => {
    const statusMatch = filterStatus === 'alle' || req.status === filterStatus;
    const serviceMatch = filterService === 'alle' || req.service === filterService;
    return statusMatch && serviceMatch;
  });

  const stats = {
    total: requests.length,
    neu: requests.filter(r => r.status === 'neu').length,
    inBearbeitung: requests.filter(r => r.status === 'in Bearbeitung').length,
    erledigt: requests.filter(r => r.status === 'erledigt').length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ py: 4, minHeight: '100vh', background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%)' }}>
      <Helmet>
        <title>Admin Dashboard - MAPSOL</title>
        <meta name="description" content="Admin Dashboard für Kontaktanfragen" />
      </Helmet>

      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #0088ff, #ff5500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Admin Dashboard
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ borderRadius: 2 }}
              >
                Abmelden
              </Button>
            </Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Übersicht aller Kontaktanfragen
            </Typography>

            {/* Statistik Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      Gesamt Anfragen
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {stats.total}
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      Neu
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="warning.main">
                      {stats.neu}
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      In Bearbeitung
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="info.main">
                      {stats.inBearbeitung}
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      Erledigt
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="success.main">
                      {stats.erledigt}
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
            </Grid>

            {/* Filter */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Status"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <MenuItem value="alle">Alle</MenuItem>
                      <MenuItem value="neu">Neu</MenuItem>
                      <MenuItem value="in Bearbeitung">In Bearbeitung</MenuItem>
                      <MenuItem value="erledigt">Erledigt</MenuItem>
                      <MenuItem value="abgelehnt">Abgelehnt</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Service</InputLabel>
                    <Select
                      value={filterService}
                      label="Service"
                      onChange={(e) => setFilterService(e.target.value)}
                    >
                      <MenuItem value="alle">Alle</MenuItem>
                      <MenuItem value="web">Web-Applikation</MenuItem>
                      <MenuItem value="ai">KI-Lösung</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    {filteredRequests.length} von {requests.length} Anfragen
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Tabelle */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Datum</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>E-Mail</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Betreff</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Aktionen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">
                          Keine Anfragen gefunden
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <StyledTableRow key={request.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            {formatDate(request.date)}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{request.name}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EmailIcon fontSize="small" color="action" />
                            {request.email}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getServiceIcon(request.service)}
                            label={request.service === 'web' ? 'Web' : 'KI'}
                            size="small"
                            color={request.service === 'web' ? 'primary' : 'secondary'}
                          />
                        </TableCell>
                        <TableCell>{request.subject}</TableCell>
                        <TableCell>
                          <Chip
                            label={request.status}
                            color={getStatusColor(request.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewDetails(request)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => updateStatus(request.id, 'erledigt')}
                            title="Als erledigt markieren"
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteRequest(request.id)}
                            title="Löschen"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </motion.div>
      </Container>

      {/* Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Kontaktanfrage Details
            </Typography>
            <Chip
              label={selectedRequest?.status}
              color={getStatusColor(selectedRequest?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedRequest.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    E-Mail
                  </Typography>
                  <Typography variant="body1">
                    <Box component="a" href={`mailto:${selectedRequest.email}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                      {selectedRequest.email}
                    </Box>
                  </Typography>
                </Grid>
                {selectedRequest.phone && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Telefon
                    </Typography>
                    <Typography variant="body1">
                      <Box component="a" href={`tel:${selectedRequest.phone}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                        {selectedRequest.phone}
                      </Box>
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Service
                  </Typography>
                  <Chip
                    icon={getServiceIcon(selectedRequest.service)}
                    label={selectedRequest.service === 'web' ? 'Web-Applikation' : 'KI-Lösung'}
                    color={selectedRequest.service === 'web' ? 'primary' : 'secondary'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Betreff
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedRequest.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Nachricht
                  </Typography>
                  <Paper sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {selectedRequest.message}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Eingegangen am
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedRequest.date)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel>Status ändern</InputLabel>
            <Select
              value={selectedRequest?.status || ''}
              label="Status ändern"
              onChange={(e) => {
                updateStatus(selectedRequest.id, e.target.value);
                setSelectedRequest({ ...selectedRequest, status: e.target.value });
              }}
            >
              <MenuItem value="neu">Neu</MenuItem>
              <MenuItem value="in Bearbeitung">In Bearbeitung</MenuItem>
              <MenuItem value="erledigt">Erledigt</MenuItem>
              <MenuItem value="abgelehnt">Abgelehnt</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setOpenDialog(false)}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;

