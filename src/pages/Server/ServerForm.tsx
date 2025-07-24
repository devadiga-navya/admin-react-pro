import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Help as HelpIcon,
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

// Mock organization data
const mockOrganizations = [
  {
    id: 1,
    orgId: 'ORG001',
    orgName: 'Tech Solutions Inc',
    mnemonic: 'TSI',
  },
  {
    id: 2,
    orgId: 'ORG002',
    orgName: 'Data Analytics Corp',
    mnemonic: 'DAC',
  },
  {
    id: 3,
    orgId: 'ORG003',
    orgName: 'Cloud Infrastructure Ltd',
    mnemonic: 'CIL',
  }
];

// Mock data for edit mode
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

interface ServerFormProps {
  mode: 'create' | 'edit';
}

const ServerForm: React.FC<ServerFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(mode === 'edit');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const [formData, setFormData] = useState<Partial<Server>>({
    hostName: '',
    domain: '',
    appLob: '',
    wfguid: '',
    appid: '',
    app_supported_by: '',
    app_managed_by: '',
    tso_managed_by: '',
    tso_supported_by: '',
    device_managed_by: '',
    device_supported_by: '',
    isActive: true,
    orgId: 1,
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const serverId = parseInt(id);
      const server = mockServers.find(s => s.id === serverId);
      
      if (server) {
        setFormData(server);
      } else {
        setSnackbar({ open: true, message: 'Server not found', severity: 'error' });
      }
      setLoading(false);
    }
  }, [mode, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.hostName || !formData.domain || !formData.appLob || !formData.wfguid || !formData.appid) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    // Simulate API call
    setSnackbar({ 
      open: true, 
      message: `Server ${mode === 'create' ? 'created' : 'updated'} successfully`, 
      severity: 'success' 
    });

    // Navigate back to servers list after a short delay
    setTimeout(() => {
      navigate('/administration/servers');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/administration/servers');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }} className="form-container">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} className="form-header">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
            sx={{ mr: 2 }}
            className="btn btn-secondary"
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }} className="form-title">
            {mode === 'create' ? 'Create Server' : 'Edit Server'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="form-section">
          <Grid container spacing={2} className="form-grid">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Host Name *"
                  value={formData.hostName}
                  onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="The hostname or server name. This is the unique identifier for the server in the network.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Domain *"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="The domain name where the server is located. This helps identify the network environment.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <FormControl fullWidth size="small">
                  <InputLabel>App LOB *</InputLabel>
                  <Select
                    value={formData.appLob}
                    onChange={(e) => setFormData({ ...formData, appLob: e.target.value })}
                    label="App LOB *"
                    required
                    className="form-select"
                  >
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Analytics">Analytics</MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Line of Business for the application. This categorizes the business function (e.g., Finance, HR, IT).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="WF GUID *"
                  value={formData.wfguid}
                  onChange={(e) => setFormData({ ...formData, wfguid: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Workflow GUID identifier. This is a unique identifier used for workflow management and tracking.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="App ID *"
                  value={formData.appid}
                  onChange={(e) => setFormData({ ...formData, appid: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Application identifier. This is the unique ID for the application running on this server.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <FormControl fullWidth size="small">
                  <InputLabel>Organization *</InputLabel>
                  <Select
                    value={formData.orgId?.toString() || ''}
                    onChange={(e) => setFormData({ ...formData, orgId: parseInt(e.target.value) || 1 })}
                    label="Organization *"
                    required
                    className="form-select"
                  >
                    {mockOrganizations.map((org) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.orgName} ({org.orgId})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title="The organization that owns this server. This links the server to its parent organization.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="App Supported By"
                  value={formData.app_supported_by}
                  onChange={(e) => setFormData({ ...formData, app_supported_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the person or team responsible for providing application support.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="App Managed By"
                  value={formData.app_managed_by}
                  onChange={(e) => setFormData({ ...formData, app_managed_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the person or team responsible for managing the application.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="TSO Managed By"
                  value={formData.tso_managed_by}
                  onChange={(e) => setFormData({ ...formData, tso_managed_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the TSO (Technical Support Organization) team responsible for managing the server infrastructure.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="TSO Supported By"
                  value={formData.tso_supported_by}
                  onChange={(e) => setFormData({ ...formData, tso_supported_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the TSO team responsible for providing technical support for this server.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Device Managed By"
                  value={formData.device_managed_by}
                  onChange={(e) => setFormData({ ...formData, device_managed_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the team responsible for managing the physical device and hardware.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Device Supported By"
                  value={formData.device_supported_by}
                  onChange={(e) => setFormData({ ...formData, device_supported_by: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the team responsible for providing device-level support and maintenance.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }} className="form-actions">
            <Button
              variant="outlined"
              onClick={handleCancel}
              className="btn btn-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ backgroundColor: '#D71E28' }}
              className="btn btn-primary"
            >
              {mode === 'create' ? 'Create Server' : 'Update Server'}
            </Button>
          </Box>
        </form>
      </Paper>

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

export default ServerForm; 