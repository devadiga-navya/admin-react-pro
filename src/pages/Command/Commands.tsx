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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleViewOrganization = (orgId: number) => {
    navigate(`/administration/organizations/detail/${orgId}`);
  };

  // Get organization name for display
  const getOrganizationName = (orgId: number) => {
    const org = mockOrganizations.find(o => o.id === orgId);
    return org ? org.orgName : `Organization ID: ${orgId}`;
  };



  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }} className="listing-container">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} className="listing-header">
          <Box>
            <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }} className="listing-title">
              Commands
            </Typography>
            {orgId && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  Filtered by Organization:
                </Typography>
                <Button
                  variant="text"
                  onClick={() => handleViewOrganization(parseInt(orgId))}
                  sx={{ 
                    color: '#1976D2', 
                    textTransform: 'none',
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      textDecoration: 'underline',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {getOrganizationName(parseInt(orgId))}
                </Button>
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ backgroundColor: '#D71E28' }}
            className="btn btn-primary"
          >
            Add Command
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 2 }} className="listing-actions">
          <TextField
            fullWidth
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 1 }}
            className="listing-search"
          />
        </Box>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }} className="listing-bulk-actions">
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {selectedItems.length} selected
            </Typography>
            <Tooltip title="Bulk Edit">
              <Button
                onClick={handleBulkEdit}
                startIcon={<EditIcon />}
                sx={{ mr: 1, minWidth: 140 }}
                className="btn"
              >
                Bulk Edit
              </Button>
            </Tooltip>
          </Toolbar>
        )}

        {/* Table */}
        <TableContainer>
          <Table className="listing-table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < filteredCommands.length}
                    checked={selectedItems.length === filteredCommands.length && filteredCommands.length > 0}
                    onChange={handleSelectAll}
                    className="listing-checkbox"
                  />
                </TableCell>
                <TableCell>Command ID</TableCell>
                <TableCell>Command Label</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Organization</TableCell>
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
                        <Button
                          variant="text"
                          onClick={() => handleViewOrganization(command.orgId)}
                          sx={{ 
                            color: '#1976D2', 
                            textTransform: 'none',
                            p: 0,
                            minWidth: 'auto',
                            '&:hover': {
                              textDecoration: 'underline',
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {getOrganizationName(command.orgId)}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={command.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          label={command.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          className={`listing-status ${command.isActive ? 'active' : 'inactive'}`}
                          sx={{
                            backgroundColor: command.isActive ? '#E8F5E8' : '#FFEBEE',
                            color: command.isActive ? '#1976D2' : '#D32F2F',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }} className="listing-actions-cell">
                          <IconButton
                            size="small"
                            onClick={() => handleExpandRow(command.id)}
                            className="listing-action-btn"
                          >
                            {expandedRows.has(command.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(command)}
                            sx={{ color: '#4CAF50' }}
                            title="View Details"
                            className="listing-action-btn view"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(command)}
                            className="listing-action-btn edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(command.id)}
                            sx={{ color: '#D32F2F' }}
                            className="listing-action-btn delete"
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

        {/* Custom Pagination */}
        <div className="listing-pagination">
          <div className="listing-pagination-info">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredCommands.length)} of {filteredCommands.length} commands
          </div>
          <div className="listing-pagination-controls">
            {/* Rows per page selector */}
            <div className="listing-filter">
              <label>Rows per page:</label>
              <select 
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
              </select>
            </div>
            
            {/* Page navigation */}
            <div className="d-flex align-items-center" style={{ gap: 'var(--spacing-xs)' }}>
              <button
                className="listing-pagination-btn"
                onClick={() => handleChangePage(null, 0)}
                disabled={page === 0}
                title="First page"
              >
                «
              </button>
              <button
                className="listing-pagination-btn"
                onClick={() => handleChangePage(null, page - 1)}
                disabled={page === 0}
                title="Previous page"
              >
                ‹
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, Math.ceil(filteredCommands.length / rowsPerPage)) }, (_, i) => {
                const pageNumber = i + 1;
                const isActive = page === i;
                return (
                  <button
                    key={pageNumber}
                    className={`listing-pagination-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleChangePage(null, i)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button
                className="listing-pagination-btn"
                onClick={() => handleChangePage(null, page + 1)}
                disabled={page >= Math.ceil(filteredCommands.length / rowsPerPage) - 1}
                title="Next page"
              >
                ›
              </button>
              <button
                className="listing-pagination-btn"
                onClick={() => handleChangePage(null, Math.ceil(filteredCommands.length / rowsPerPage) - 1)}
                disabled={page >= Math.ceil(filteredCommands.length / rowsPerPage) - 1}
                title="Last page"
              >
                »
              </button>
            </div>
          </div>
        </div>
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