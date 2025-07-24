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
interface Command {
  id: number;
  orgId: number;
  commandId: string;
  commandLabel: string;
  description: string;
  isActive: boolean;
}

// Mock data
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

const CommandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [command, setCommand] = useState<Command | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    const commandId = parseInt(id || '0');
    const foundCommand = mockCommands.find(c => c.id === commandId);
    if (foundCommand) {
      setCommand(foundCommand);
      setCurrentIndex(mockCommands.findIndex(c => c.id === commandId));
    } else {
      setSnackbar({ open: true, message: 'Command not found', severity: 'error' });
    }
    setLoading(false);
  }, [id]);

  const handleNavigateRecord = (direction: 'prev' | 'next') => {
    if (!command) return;
    
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : mockCommands.length - 1;
    } else {
      newIndex = currentIndex < mockCommands.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newCommand = mockCommands[newIndex];
    setCommand(newCommand);
    setCurrentIndex(newIndex);
    navigate(`/administration/commands/detail/${newCommand.id}`);
  };

  const handleEdit = () => {
    if (command) {
      navigate(`/administration/commands/edit/${command.id}`);
    }
  };

  const handleBack = () => {
    navigate('/administration/commands');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!command) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          Command not found
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Back to Commands
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
            Command Details
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
            {currentIndex + 1} of {mockCommands.length}
          </Typography>
          <IconButton
            onClick={() => handleNavigateRecord('next')}
            disabled={currentIndex === mockCommands.length - 1}
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
            <Typography variant="subtitle2" color="text.secondary">Command ID</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{command.commandId}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Command Label</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{command.commandLabel}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Description</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{command.description}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
            <Chip
              icon={command.isActive ? <CheckCircleIcon /> : <CancelIcon />}
              label={command.isActive ? 'Active' : 'Inactive'}
              size="small"
              className={`detail-status ${command.isActive ? 'active' : 'inactive'}`}
              sx={{
                backgroundColor: command.isActive ? '#E8F5E8' : '#FFEBEE',
                                            color: command.isActive ? '#1976D2' : '#D32F2F',
                fontWeight: 500,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Organization ID</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{command.orgId}</Typography>
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
            Edit Command
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

export default CommandDetail; 