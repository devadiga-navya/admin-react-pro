import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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

// Mock data
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

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    const orgId = parseInt(id || '0');
    const org = mockOrganizations.find(o => o.id === orgId);
    if (org) {
      setOrganization(org);
      setCurrentIndex(mockOrganizations.findIndex(o => o.id === orgId));
    } else {
      setSnackbar({ open: true, message: 'Organization not found', severity: 'error' });
    }
    setLoading(false);
  }, [id]);

  const handleNavigateRecord = (direction: 'prev' | 'next') => {
    if (!organization) return;
    
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : mockOrganizations.length - 1;
    } else {
      newIndex = currentIndex < mockOrganizations.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newOrg = mockOrganizations[newIndex];
    setOrganization(newOrg);
    setCurrentIndex(newIndex);
    navigate(`/administration/organizations/detail/${newOrg.id}`);
  };

  const handleEdit = () => {
    if (organization) {
      navigate(`/administration/organizations/edit/${organization.id}`);
    }
  };

  const handleBack = () => {
    navigate('/administration/organizations');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!organization) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          Organization not found
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Back to Organizations
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
          <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
            Organization Details
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => handleNavigateRecord('prev')}
            disabled={currentIndex === 0}
            title="Previous Record"
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            {currentIndex + 1} of {mockOrganizations.length}
          </Typography>
          <IconButton
            onClick={() => handleNavigateRecord('next')}
            disabled={currentIndex === mockOrganizations.length - 1}
            title="Next Record"
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Organization ID</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.orgId}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Organization Name</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.orgName}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Mnemonic</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.mnemonic}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Queries Key</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.queriesKey}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Description</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.description}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Authorization Scheme</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.authorizationScheme}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Service Offering</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.serviceOffering}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Supported By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.supportedBy}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Managed By</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{organization.managedBy}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
            <Chip
              icon={organization.isActive ? <CheckCircleIcon /> : <CancelIcon />}
              label={organization.isActive ? 'Active' : 'Inactive'}
              size="small"
              sx={{
                backgroundColor: organization.isActive ? '#E8F5E8' : '#FFEBEE',
                                            color: organization.isActive ? '#1976D2' : '#D32F2F',
                fontWeight: 500,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">JSON Configuration</Typography>
            <Box sx={{ 
              backgroundColor: '#f5f5f5', 
              p: 2, 
              borderRadius: 1, 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              maxHeight: 300,
              overflow: 'auto',
              mt: 1
            }}>
              <pre>{organization.jsonConfig}</pre>
            </Box>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button 
            onClick={handleEdit} 
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ backgroundColor: '#1976D2' }}
          >
            Edit Organization
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

export default OrganizationDetail; 