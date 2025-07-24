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
interface Organization {
  id: number;
  orgId: string;
  orgName: string;
  mnemonic: string;
  queriesKey: string;
  description: string;
  authorizationScheme: 'functional' | 'ad_group';
  supportedBy: string;
  managedBy: string;
  serviceOffering: string;
  isActive: boolean;
  jsonConfig: string;
}

// Mock data for edit mode
const mockOrganizations: Organization[] = [
  {
    id: 1,
    orgId: 'ORG001',
    orgName: 'Tech Solutions Inc',
    mnemonic: 'TSI',
    queriesKey: 'tech_solutions_key',
    description: 'Leading technology solutions provider',
    authorizationScheme: 'functional',
    supportedBy: 'John Smith',
    managedBy: 'Sarah Johnson',
    serviceOffering: 'Cloud Services',
    isActive: true,
    jsonConfig: JSON.stringify({
      orgId: 'ORG001',
      orgName: 'Tech Solutions Inc',
      mnemonic: 'TSI',
      queriesKey: 'tech_solutions_key',
      description: 'Leading technology solutions provider',
      authorizationScheme: 'functional',
      supportedBy: 'John Smith',
      managedBy: 'Sarah Johnson',
      serviceOffering: 'Cloud Services',
      isActive: true
    }, null, 2)
  },
  {
    id: 2,
    orgId: 'ORG002',
    orgName: 'Data Analytics Corp',
    mnemonic: 'DAC',
    queriesKey: 'data_analytics_key',
    description: 'Advanced data analytics and insights',
    authorizationScheme: 'ad_group',
    supportedBy: 'Mike Wilson',
    managedBy: 'Lisa Brown',
    serviceOffering: 'Analytics Platform',
    isActive: true,
    jsonConfig: JSON.stringify({
      orgId: 'ORG002',
      orgName: 'Data Analytics Corp',
      mnemonic: 'DAC',
      queriesKey: 'data_analytics_key',
      description: 'Advanced data analytics and insights',
      authorizationScheme: 'ad_group',
      supportedBy: 'Mike Wilson',
      managedBy: 'Lisa Brown',
      serviceOffering: 'Analytics Platform',
      isActive: true
    }, null, 2)
  },
  {
    id: 3,
    orgId: 'ORG003',
    orgName: 'Cloud Infrastructure Ltd',
    mnemonic: 'CIL',
    queriesKey: 'cloud_infra_key',
    description: 'Cloud infrastructure and DevOps services',
    authorizationScheme: 'functional',
    supportedBy: 'David Lee',
    managedBy: 'Emma Davis',
    serviceOffering: 'Infrastructure Services',
    isActive: false,
    jsonConfig: JSON.stringify({
      orgId: 'ORG003',
      orgName: 'Cloud Infrastructure Ltd',
      mnemonic: 'CIL',
      queriesKey: 'cloud_infra_key',
      description: 'Cloud infrastructure and DevOps services',
      authorizationScheme: 'functional',
      supportedBy: 'David Lee',
      managedBy: 'Emma Davis',
      serviceOffering: 'Infrastructure Services',
      isActive: false
    }, null, 2)
  }
];

interface OrganizationFormProps {
  mode: 'create' | 'edit';
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(mode === 'edit');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const [formData, setFormData] = useState<Partial<Organization>>({
    orgId: '',
    orgName: '',
    mnemonic: '',
    queriesKey: '',
    description: '',
    authorizationScheme: 'functional',
    supportedBy: '',
    managedBy: '',
    serviceOffering: '',
    isActive: true,
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const orgId = parseInt(id);
      const organization = mockOrganizations.find(org => org.id === orgId);
      
      if (organization) {
        setFormData(organization);
      } else {
        setSnackbar({ open: true, message: 'Organization not found', severity: 'error' });
      }
      setLoading(false);
    }
  }, [mode, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.orgId || !formData.orgName || !formData.mnemonic || !formData.queriesKey) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    // Simulate API call
    setSnackbar({ 
      open: true, 
      message: `Organization ${mode === 'create' ? 'created' : 'updated'} successfully`, 
      severity: 'success' 
    });

    // Navigate back to organizations list after a short delay
    setTimeout(() => {
      navigate('/administration/organizations');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/administration/organizations');
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
            {mode === 'create' ? 'Create Organization' : 'Edit Organization'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="form-section">
          <Grid container spacing={2} className="form-grid">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Organization ID *"
                  value={formData.orgId}
                  onChange={(e) => setFormData({ ...formData, orgId: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Unique identifier for the organization. This should be a short, alphanumeric code that represents the organization (e.g., ORG001, TECH01).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Organization Name *"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Full name of the organization as it appears in official documents and communications.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Mnemonic *"
                  value={formData.mnemonic}
                  onChange={(e) => setFormData({ ...formData, mnemonic: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Short abbreviation or acronym for the organization name. Used for quick reference and system integration (e.g., TSI for Tech Solutions Inc).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Queries Key *"
                  value={formData.queriesKey}
                  onChange={(e) => setFormData({ ...formData, queriesKey: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Database query identifier used for data retrieval and reporting. This key is used in system queries to filter data specific to this organization.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Description *"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={3}
                  required
                  size="small"
                  className="form-textarea"
                />
                <Tooltip title="Detailed description of the organization's purpose, scope, and responsibilities within the system.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20, mt: 1 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <FormControl fullWidth size="small">
                  <InputLabel>Authorization Scheme *</InputLabel>
                  <Select
                    value={formData.authorizationScheme}
                    onChange={(e) => setFormData({ ...formData, authorizationScheme: e.target.value as 'functional' | 'ad_group' })}
                    label="Authorization Scheme *"
                    required
                    className="form-select"
                  >
                    <MenuItem value="functional">Functional</MenuItem>
                    <MenuItem value="ad_group">AD Group</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="The type of authorization system used for this organization. Functional uses role-based access, while AD Group uses Active Directory group membership.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Supported By"
                  value={formData.supportedBy}
                  onChange={(e) => setFormData({ ...formData, supportedBy: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the person or team responsible for providing technical support for this organization.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Managed By"
                  value={formData.managedBy}
                  onChange={(e) => setFormData({ ...formData, managedBy: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Name of the person or team responsible for managing this organization's resources and operations.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Service Offering"
                  value={formData.serviceOffering}
                  onChange={(e) => setFormData({ ...formData, serviceOffering: e.target.value })}
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Primary service or product offering provided by this organization.">
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
              {mode === 'create' ? 'Create Organization' : 'Update Organization'}
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

export default OrganizationForm; 