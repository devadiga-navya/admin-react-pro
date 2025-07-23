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
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
            {mode === 'create' ? 'Create Organization' : 'Edit Organization'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Organization ID *"
                  value={formData.orgId}
                  onChange={(e) => setFormData({ ...formData, orgId: e.target.value })}
                  required
                  size="small"
                />
                <Tooltip title="Unique identifier for the organization. This should be a short, alphanumeric code that represents the organization (e.g., ORG001, TECH01).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Organization Name *"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  required
                  size="small"
                />
                <Tooltip title="Full name of the organization as it appears in official documents and communications.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Mnemonic *"
                  value={formData.mnemonic}
                  onChange={(e) => setFormData({ ...formData, mnemonic: e.target.value })}
                  required
                  size="small"
                />
                <Tooltip title="Short abbreviation or acronym for the organization name. Used for quick reference and system integration (e.g., TSI for Tech Solutions Inc).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Queries Key *"
                  value={formData.queriesKey}
                  onChange={(e) => setFormData({ ...formData, queriesKey: e.target.value })}
                  required
                  size="small"
                />
                <Tooltip title="Database query identifier used for data retrieval and reporting. This key is used in system queries to filter data specific to this organization.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={2}
                  size="small"
                />
                <Tooltip title="Detailed description of the organization's purpose, business focus, and key activities. This helps users understand what the organization does.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20, mt: 1 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Authorization Scheme</InputLabel>
                  <Select
                    value={formData.authorizationScheme}
                    onChange={(e) => setFormData({ ...formData, authorizationScheme: e.target.value as 'functional' | 'ad_group' })}
                    label="Authorization Scheme"
                  >
                    <MenuItem value="functional">Functional</MenuItem>
                    <MenuItem value="ad_group">AD Group</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Defines how user access is managed for this organization. 'Functional' uses role-based access, while 'AD Group' uses Active Directory group membership for authorization.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Service Offering"
                  value={formData.serviceOffering}
                  onChange={(e) => setFormData({ ...formData, serviceOffering: e.target.value })}
                  size="small"
                />
                <Tooltip title="Primary service or product offering of the organization. This helps categorize and understand the organization's main business focus.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Supported By"
                  value={formData.supportedBy}
                  onChange={(e) => setFormData({ ...formData, supportedBy: e.target.value })}
                  size="small"
                />
                <Tooltip title="Name of the person or team responsible for providing technical support and maintenance for this organization's systems and services.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Managed By"
                  value={formData.managedBy}
                  onChange={(e) => setFormData({ ...formData, managedBy: e.target.value })}
                  size="small"
                />
                <Tooltip title="Name of the person or team responsible for managing and overseeing the organization's operations, budget, and strategic direction.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ backgroundColor: '#D71E28' }}
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