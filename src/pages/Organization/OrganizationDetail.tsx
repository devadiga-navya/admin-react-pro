import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Cancel as CancelIcon,
  Code as CodeIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Description as DescriptionIcon,
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
    description: 'Leading technology solutions provider specializing in cloud infrastructure, data analytics, and digital transformation services. We help businesses modernize their technology stack and achieve operational excellence.',
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
    description: 'Advanced data analytics and insights platform provider. We deliver cutting-edge analytics solutions that transform raw data into actionable business intelligence.',
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
    description: 'Cloud infrastructure and DevOps services provider. We specialize in building scalable, reliable, and secure cloud solutions for enterprise clients.',
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
      <div className="detail-loading">
        <div className="detail-loading-spinner"></div>
        <Typography>Loading organization details...</Typography>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="detail-container">
        <div className="alert alert-error">
          <div className="alert-icon">⚠</div>
          <div className="alert-content">
            <div className="alert-title">Organization Not Found</div>
            <div className="alert-message">The requested organization could not be found.</div>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={handleBack}>
            <ArrowBackIcon />
            Back to Organizations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="detail-breadcrumb-item">
          <button className="detail-breadcrumb-link" onClick={handleBack}>
            Organizations
          </button>
        </div>
        <div className="detail-breadcrumb-separator">/</div>
        <div className="detail-breadcrumb-item">
          <span className="detail-breadcrumb-current">{organization.orgName}</span>
        </div>
      </div>

      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-content">
          <div className="detail-header-info">
            <h1 className="detail-title">{organization.orgName}</h1>
            <p className="detail-subtitle">{organization.description}</p>
            <div className="detail-meta">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Organization ID</span>
                <span className="detail-meta-value">{organization.orgId}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Mnemonic</span>
                <span className="detail-meta-value">{organization.mnemonic}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Service Offering</span>
                <span className="detail-meta-value">{organization.serviceOffering}</span>
              </div>
            </div>
          </div>
          <div className="detail-header-actions">
            <span className={`detail-status ${organization.isActive ? 'active' : 'inactive'}`}>
              {organization.isActive ? 'Active' : 'Inactive'}
            </span>
            <button className="btn btn-primary" onClick={handleEdit}>
              <EditIcon />
              Edit Organization
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="detail-card">
        <div className="detail-card-header">
          <div className="detail-card-title">
            <NavigateBeforeIcon />
            Navigation
          </div>
        </div>
        <div className="detail-card-body">
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => handleNavigateRecord('prev')}
              disabled={currentIndex === 0}
            >
              <NavigateBeforeIcon />
              Previous
            </button>
            <span className="text-center">
              {currentIndex + 1} of {mockOrganizations.length}
            </span>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => handleNavigateRecord('next')}
              disabled={currentIndex === mockOrganizations.length - 1}
            >
              Next
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        <div className="detail-main">
          {/* Basic Information */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h2 className="detail-section-title">
                <BusinessIcon />
                Basic Information
              </h2>
            </div>
            <div className="detail-section-body">
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="detail-field-label">Organization ID</span>
                  <span className="detail-field-value">{organization.orgId}</span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Organization Name</span>
                  <span className="detail-field-value">{organization.orgName}</span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Mnemonic</span>
                  <span className="detail-field-value">{organization.mnemonic}</span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Queries Key</span>
                  <span className="detail-field-value">{organization.queriesKey}</span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Authorization Scheme</span>
                  <span className="detail-field-value">
                    <span className={`badge badge-${organization.authorizationScheme === 'functional' ? 'primary' : 'info'}`}>
                      {organization.authorizationScheme}
                    </span>
                  </span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Service Offering</span>
                  <span className="detail-field-value">{organization.serviceOffering}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h2 className="detail-section-title">
                <DescriptionIcon />
                Description
              </h2>
            </div>
            <div className="detail-section-body">
              <p className="detail-field-value">{organization.description}</p>
            </div>
          </div>

          {/* Team Information */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h2 className="detail-section-title">
                <PersonIcon />
                Team Information
              </h2>
            </div>
            <div className="detail-section-body">
              <div className="detail-grid">
                <div className="detail-field">
                  <span className="detail-field-label">Supported By</span>
                  <span className="detail-field-value">{organization.supportedBy}</span>
                </div>
                <div className="detail-field">
                  <span className="detail-field-label">Managed By</span>
                  <span className="detail-field-value">{organization.managedBy}</span>
                </div>
              </div>
            </div>
          </div>

          {/* JSON Configuration */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h2 className="detail-section-title">
                <CodeIcon />
                JSON Configuration
              </h2>
            </div>
            <div className="detail-section-body">
              <div className="detail-json">
                <div className="detail-json-header">
                  <span className="detail-json-title">Configuration Data</span>
                  <div className="detail-json-actions">
                    <button className="detail-json-btn">Copy</button>
                    <button className="detail-json-btn">Download</button>
                  </div>
                </div>
                <pre>{organization.jsonConfig}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          {/* Status Card */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 className="detail-card-title">
                <SettingsIcon />
                Status & Actions
              </h3>
            </div>
            <div className="detail-card-body">
              <div className="detail-list">
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Status</span>
                  <span className={`detail-list-item-value ${organization.isActive ? 'text-success' : 'text-error'}`}>
                    {organization.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Last Updated</span>
                  <span className="detail-list-item-value">Today</span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Created</span>
                  <span className="detail-list-item-value">2024-01-15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 className="detail-card-title">Quick Actions</h3>
            </div>
            <div className="detail-card-body">
              <div className="detail-quick-actions">
                <button className="btn btn-primary btn-sm" onClick={handleEdit}>
                  <EditIcon />
                </button>
                <button className="btn btn-outline btn-sm">
                  <BusinessIcon />
                  View Servers
                </button>
                <button className="btn btn-outline btn-sm">
                  <CodeIcon />
                  View Commands
                </button>
                <button className="btn btn-danger btn-sm">
                  <CancelIcon />
                  Deactivate
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 className="detail-card-title">Statistics</h3>
            </div>
            <div className="detail-card-body">
              <div className="detail-list">
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Active Servers</span>
                  <span className="detail-list-item-value">12</span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Total Commands</span>
                  <span className="detail-list-item-value">45</span>
                </div>
                <div className="detail-list-item">
                  <span className="detail-list-item-label">Uptime</span>
                  <span className="detail-list-item-value">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default OrganizationDetail; 