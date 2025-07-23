import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Checkbox,
  Toolbar,
  Tooltip,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
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

interface BulkEditData {
  isActive?: boolean;
  description?: string;
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
  },
  {
    id: 6,
    orgId: 1,
    commandId: 'CMD006',
    commandLabel: 'Security Scan',
    description: 'Run security vulnerability scan',
    isActive: true
  }
];

const Commands: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('orgId');
  const [commands, setCommands] = useState<Command[]>(mockCommands);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [openBulkEdit, setOpenBulkEdit] = useState(false);
  const [bulkEditData, setBulkEditData] = useState<BulkEditData>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const filteredCommands = commands.filter(command => {
    const matchesSearch = Object.values(command).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filter by organization if orgId is provided
    if (orgId) {
      return matchesSearch && command.orgId === parseInt(orgId);
    }
    
    return matchesSearch;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(filteredCommands.map(command => command.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleExpandRow = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCreate = () => {
    navigate('/administration/commands/create');
  };

  const handleEdit = (command: Command) => {
    navigate(`/administration/commands/edit/${command.id}`);
  };

  const handleDelete = (id: number) => {
    setCommands(prev => prev.filter(command => command.id !== id));
    setSnackbar({ open: true, message: 'Command deleted successfully', severity: 'success' });
  };

  const handleBulkEdit = () => {
    if (selectedItems.length === 0) {
      setSnackbar({ open: true, message: 'Please select items to edit', severity: 'error' });
      return;
    }
    setOpenBulkEdit(true);
  };

  const handleBulkEditSave = () => {
    setCommands(prev => 
      prev.map(command => 
        selectedItems.includes(command.id) 
          ? { ...command, ...bulkEditData }
          : command
      )
    );
    setSelectedItems([]);
    setBulkEditData({});
    setOpenBulkEdit(false);
    setSnackbar({ open: true, message: 'Bulk edit completed successfully', severity: 'success' });
  };

  const handleViewDetails = (command: Command) => {
    navigate(`/administration/commands/detail/${command.id}`);
  };



  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
              Commands
            </Typography>
            {orgId && (
              <Typography variant="body2" sx={{ color: '#757575', mt: 1 }}>
                Filtered by Organization ID: {orgId}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ backgroundColor: '#D71E28' }}
          >
            Add Command
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {selectedItems.length} selected
            </Typography>
            <Tooltip title="Bulk Edit">
              <Button
                onClick={handleBulkEdit}
                startIcon={<EditIcon />}
                sx={{ mr: 1 }}
              >
                Bulk Edit
              </Button>
            </Tooltip>
          </Toolbar>
        )}

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < filteredCommands.length}
                    checked={selectedItems.length === filteredCommands.length && filteredCommands.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Command ID</TableCell>
                <TableCell>Command Label</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCommands
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((command) => (
                  <React.Fragment key={command.id}>
                    <TableRow hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(command.id)}
                          onChange={() => handleSelectItem(command.id)}
                        />
                      </TableCell>
                      <TableCell>{command.commandId}</TableCell>
                      <TableCell>{command.commandLabel}</TableCell>
                      <TableCell>{command.description}</TableCell>
                      <TableCell>
                        <Chip
                          icon={command.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          label={command.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          sx={{
                            backgroundColor: command.isActive ? '#E8F5E8' : '#FFEBEE',
                            color: command.isActive ? '#1976D2' : '#D32F2F',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleExpandRow(command.id)}
                          >
                            {expandedRows.has(command.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(command)}
                            sx={{ color: '#4CAF50' }}
                            title="View Details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(command)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(command.id)}
                            sx={{ color: '#D32F2F' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={expandedRows.has(command.id)} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  Command Details
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Organization ID
                                    </Typography>
                                    <Typography variant="body1">{command.orgId}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Command ID
                                    </Typography>
                                    <Typography variant="body1">{command.commandId}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Command Label
                                    </Typography>
                                    <Typography variant="body1">{command.commandLabel}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Description
                                    </Typography>
                                    <Typography variant="body1">{command.description}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Status
                                    </Typography>
                                    <Chip
                                      icon={command.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                                      label={command.isActive ? 'Active' : 'Inactive'}
                                      size="small"
                                      sx={{
                                        backgroundColor: command.isActive ? '#E8F5E8' : '#FFEBEE',
                                        color: command.isActive ? '#2E7D32' : '#D32F2F',
                                        fontWeight: 500,
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCommands.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>



      {/* Bulk Edit Dialog */}
      <BulkEditDialog
        open={openBulkEdit}
        onClose={() => setOpenBulkEdit(false)}
        onSave={handleBulkEditSave}
        data={bulkEditData}
        onChange={setBulkEditData}
      />

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



// Bulk Edit Dialog Component
interface BulkEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  data: BulkEditData;
  onChange: (data: BulkEditData) => void;
}

const BulkEditDialog: React.FC<BulkEditDialogProps> = ({ open, onClose, onSave, data, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bulk Edit Commands</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={data.isActive?.toString() ?? ''}
                onChange={(e) => onChange({ ...data, isActive: e.target.value === 'true' })}
                label="Status"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={data.description ?? ''}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" sx={{ backgroundColor: '#D71E28' }}>
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Commands; 