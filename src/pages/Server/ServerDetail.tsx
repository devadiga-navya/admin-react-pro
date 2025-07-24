import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Types
interface Server {
  id: number;
  hostName: string;
  domain: string;
  appLob: string;
  wfguid: string;
  appid: string;
  app_supported_by: string;
  app_managed_by: string;
  tso_managed_by: string;
  tso_supported_by: string;
  device_managed_by: string;
  device_supported_by: string;
  isActive: boolean;
  orgId: number;
}

// Mock data
const mockServers: Server[] = [
  {
    id: 1,
    hostName: 'server-001',
    domain: 'techsolutions.com',
    appLob: 'Finance',
    wfguid: 'wf-001-abc',
    appid: 'app-001',
    app_supported_by: 'John Smith',
    app_managed_by: 'Sarah Johnson',
    tso_managed_by: 'TSO Team A',
    tso_supported_by: 'TSO Support A',
    device_managed_by: 'Device Team A',
    device_supported_by: 'Device Support A',
    isActive: true,
    orgId: 1
  },
  {
    id: 2,
    hostName: 'server-002',
    domain: 'techsolutions.com',
    appLob: 'HR',
    wfguid: 'wf-002-def',
    appid: 'app-002',
    app_supported_by: 'John Smith',
    app_managed_by: 'Sarah Johnson',
    tso_managed_by: 'TSO Team B',
    tso_supported_by: 'TSO Support B',
    device_managed_by: 'Device Team B',
    device_supported_by: 'Device Support B',
    isActive: true,
    orgId: 1
  },
  {
    id: 3,
    hostName: 'server-003',
    domain: 'analytics.com',
    appLob: 'Analytics',
    wfguid: 'wf-003-ghi',
    appid: 'app-003',
    app_supported_by: 'Mike Wilson',
    app_managed_by: 'Lisa Brown',
    tso_managed_by: 'TSO Team C',
    tso_supported_by: 'TSO Support C',
    device_managed_by: 'Device Team C',
    device_supported_by: 'Device Support C',
    isActive: false,
    orgId: 2
  },
  {
    id: 4,
    hostName: 'server-004',
    domain: 'cloud.com',
    appLob: 'DevOps',
    wfguid: 'wf-004-jkl',
    appid: 'app-004',
    app_supported_by: 'David Lee',
    app_managed_by: 'Emma Davis',
    tso_managed_by: 'TSO Team D',
    tso_supported_by: 'TSO Support D',
    device_managed_by: 'Device Team D',
    device_supported_by: 'Device Support D',
    isActive: true,
    orgId: 3
  }
];

const ServerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    const serverId = parseInt(id || '0');
    const foundServer = mockServers.find(s => s.id === serverId);
    if (foundServer) {
      setServer(foundServer);
      setCurrentIndex(mockServers.findIndex(s => s.id === serverId));
    } else {
      setSnackbar({ open: true, message: 'Server not found', severity: 'error' });
    }
    setLoading(false);
  }, [id]);

  const handleNavigateRecord = (direction: 'prev' | 'next') => {
    if (!server) return;
    
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : mockServers.length - 1;
    } else {
      newIndex = currentIndex < mockServers.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newServer = mockServers[newIndex];
    setServer(newServer);
    setCurrentIndex(newIndex);
    navigate(`/administration/servers/detail/${newServer.id}`);
  };

  const handleEdit = () => {
    if (server) {
      navigate(`/administration/servers/edit/${server.id}`);
    }
  };

  const handleBack = () => {
    navigate('/administration/servers');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!server) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          Server not found
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Back to Servers
        </Button>
      </Box>
    );
  }

  return (
    <Box className="detail-container">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} className="detail-header">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button onClick={handleBack} startIcon={<ArrowBackIcon />} className="btn btn-secondary">
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }} className="detail-title">
            Server Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }} className="detail-header-actions">
          <IconButton
            onClick={() => handleNavigateRecord('prev')}
            disabled={currentIndex === 0}
            title="Previous Record"
            className="listing-action-btn"
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            {currentIndex + 1} of {mockServers.length}
          </Typography>
          <IconButton
            onClick={() => handleNavigateRecord('next')}
            disabled={currentIndex === mockServers.length - 1}
            title="Next Record"
            className="listing-action-btn"
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 2 }} className="detail-section">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Host Name</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{server.hostName}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Domain</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{server.domain}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">App LOB</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{server.appLob}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">WF GUID</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{server.wfguid}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">App ID</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{server.appid}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
            <Chip
              icon={server.isActive ? <CheckCircleIcon /> : <CancelIcon />}
              label={server.isActive ? 'Active' : 'Inactive'}
              size="small"
              className={`detail-status ${server.isActive ? 'active' : 'inactive'}`}
              sx={{
                backgroundColor: server.isActive ? '#E8F5E8' : '#FFEBEE',
                                            color: server.isActive ? '#1976D2' : '#D32F2F',
                fontWeight: 500,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">App Supported By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.app_supported_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">App Managed By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.app_managed_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">TSO Managed By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.tso_managed_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">TSO Supported By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.tso_supported_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Device Managed By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.device_managed_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Device Supported By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.device_supported_by}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Organization ID</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{server.orgId}</Typography>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }} className="detail-actions">
          <Button 
            onClick={handleEdit} 
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ backgroundColor: '#1976D2' }}
            className="btn btn-primary"
          >
            Edit Server
          </Button>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServerDetail; 