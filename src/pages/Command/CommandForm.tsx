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
interface Command {
  id: number;
  orgId: number;
  commandId: string;
  commandLabel: string;
  description: string;
  isActive: boolean;
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
const mockCommands: Command[] = [
  {
    id: 1,
    orgId: 1,
    commandId: 'CMD001',
    commandLabel: 'System Restart',
    description: 'Restart the server system',
    isActive: true
  },
  {
    id: 2,
    orgId: 1,
    commandId: 'CMD002',
    commandLabel: 'Database Backup',
    description: 'Create database backup',
    isActive: true
  },
  {
    id: 3,
    orgId: 2,
    commandId: 'CMD003',
    commandLabel: 'Data Sync',
    description: 'Synchronize data across systems',
    isActive: true
  },
  {
    id: 4,
    orgId: 2,
    commandId: 'CMD004',
    commandLabel: 'Report Generation',
    description: 'Generate analytics reports',
    isActive: false
  },
  {
    id: 5,
    orgId: 3,
    commandId: 'CMD005',
    commandLabel: 'Deploy Application',
    description: 'Deploy application to production',
    isActive: true
  }
];

interface CommandFormProps {
  mode: 'create' | 'edit';
}

const CommandForm: React.FC<CommandFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(mode === 'edit');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const [formData, setFormData] = useState<Partial<Command>>({
    commandId: '',
    commandLabel: '',
    description: '',
    isActive: true,
    orgId: 1,
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const commandId = parseInt(id);
      const command = mockCommands.find(c => c.id === commandId);
      
      if (command) {
        setFormData(command);
      } else {
        setSnackbar({ open: true, message: 'Command not found', severity: 'error' });
      }
      setLoading(false);
    }
  }, [mode, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.commandId || !formData.commandLabel || !formData.description) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    // Simulate API call
    setSnackbar({ 
      open: true, 
      message: `Command ${mode === 'create' ? 'created' : 'updated'} successfully`, 
      severity: 'success' 
    });

    // Navigate back to commands list after a short delay
    setTimeout(() => {
      navigate('/administration/commands');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/administration/commands');
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
            {mode === 'create' ? 'Create Command' : 'Edit Command'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="form-section">
          <Grid container spacing={2} className="form-grid">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Command ID *"
                  value={formData.commandId}
                  onChange={(e) => setFormData({ ...formData, commandId: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Unique identifier for the command. This should be a short, alphanumeric code (e.g., CMD001, RESTART01).">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20 }} />
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="form-field">
                <TextField
                  fullWidth
                  label="Command Label *"
                  value={formData.commandLabel}
                  onChange={(e) => setFormData({ ...formData, commandLabel: e.target.value })}
                  required
                  size="small"
                  className="form-input"
                />
                <Tooltip title="Human-readable name for the command. This is what users will see when selecting commands.">
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
                  rows={2}
                  required
                  size="small"
                  className="form-textarea"
                />
                <Tooltip title="Detailed description of what the command does. This helps users understand the purpose and impact of the command.">
                  <HelpIcon sx={{ color: '#757575', fontSize: 20, mt: 1 }} />
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
                <Tooltip title="The organization that owns this command. This links the command to its parent organization.">
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
              {mode === 'create' ? 'Create Command' : 'Update Command'}
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

export default CommandForm; 