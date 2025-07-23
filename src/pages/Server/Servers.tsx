import React, { useState, useEffect } from 'react';
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

interface BulkEditData {
  isActive?: boolean;
  appLob?: string;
  domain?: string;
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
    hostName: 'analytics-001',
    domain: 'dataanalytics.com',
    appLob: 'Analytics',
    wfguid: 'wf-003-ghi',
    appid: 'app-003',
    app_supported_by: 'Mike Wilson',
    app_managed_by: 'Lisa Chen',
    tso_managed_by: 'TSO Team C',
    tso_supported_by: 'TSO Support C',
    device_managed_by: 'Device Team C',
    device_supported_by: 'Device Support C',
    isActive: true,
    orgId: 2
  },
  {
    id: 4,
    hostName: 'cloud-001',
    domain: 'cloudinfra.com',
    appLob: 'DevOps',
    wfguid: 'wf-004-jkl',
    appid: 'app-004',
    app_supported_by: 'David Brown',
    app_managed_by: 'Emma Davis',
    tso_managed_by: 'TSO Team D',
    tso_supported_by: 'TSO Support D',
    device_managed_by: 'Device Team D',
    device_supported_by: 'Device Support D',
    isActive: false,
    orgId: 3
  },
  {
    id: 5,
    hostName: 'server-003',
    domain: 'techsolutions.com',
    appLob: 'Marketing',
    wfguid: 'wf-005-mno',
    appid: 'app-005',
    app_supported_by: 'John Smith',
    app_managed_by: 'Sarah Johnson',
    tso_managed_by: 'TSO Team E',
    tso_supported_by: 'TSO Support E',
    device_managed_by: 'Device Team E',
    device_supported_by: 'Device Support E',
    isActive: true,
    orgId: 1
  }
];

const Servers: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('orgId');
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [openBulkEdit, setOpenBulkEdit] = useState(false);
  const [bulkEditData, setBulkEditData] = useState<BulkEditData>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const filteredServers = servers.filter(server => {
    const matchesSearch = Object.values(server).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Filter by organization if orgId is provided
    if (orgId) {
      return matchesSearch && server.orgId === parseInt(orgId);
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
      setSelectedItems(filteredServers.map(server => server.id));
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
    navigate('/administration/servers/create');
  };

  const handleEdit = (server: Server) => {
    navigate(`/administration/servers/edit/${server.id}`);
  };

  const handleDelete = (id: number) => {
    setServers(prev => prev.filter(server => server.id !== id));
    setSnackbar({ open: true, message: 'Server deleted successfully', severity: 'success' });
  };

  const handleBulkEdit = () => {
    if (selectedItems.length === 0) {
      setSnackbar({ open: true, message: 'Please select items to edit', severity: 'error' });
      return;
    }
    setOpenBulkEdit(true);
  };

  const handleBulkEditSave = () => {
    setServers(prev => 
      prev.map(server => 
        selectedItems.includes(server.id) 
          ? { ...server, ...bulkEditData }
          : server
      )
    );
    setSelectedItems([]);
    setBulkEditData({});
    setOpenBulkEdit(false);
    setSnackbar({ open: true, message: 'Bulk edit completed successfully', severity: 'success' });
  };

  const handleViewDetails = (server: Server) => {
    navigate(`/administration/servers/detail/${server.id}`);
  };



  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
              Servers
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
            Add Server
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search servers..."
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
                    indeterminate={selectedItems.length > 0 && selectedItems.length < filteredServers.length}
                    checked={selectedItems.length === filteredServers.length && filteredServers.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Host Name</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>App LOB</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((server) => (
                  <React.Fragment key={server.id}>
                    <TableRow hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(server.id)}
                          onChange={() => handleSelectItem(server.id)}
                        />
                      </TableCell>
                      <TableCell>{server.hostName}</TableCell>
                      <TableCell>{server.domain}</TableCell>
                      <TableCell>{server.appLob}</TableCell>
                      <TableCell>
                        <Chip
                          icon={server.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          label={server.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          sx={{
                            backgroundColor: server.isActive ? '#E8F5E8' : '#FFEBEE',
                            color: server.isActive ? '#1976D2' : '#D32F2F',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleExpandRow(server.id)}
                          >
                            {expandedRows.has(server.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(server)}
                            sx={{ color: '#4CAF50' }}
                            title="View Details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(server)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(server.id)}
                            sx={{ color: '#D32F2F' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={expandedRows.has(server.id)} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      Application Details
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          App ID
                                        </Typography>
                                        <Typography variant="body1">{server.appid}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          WF GUID
                                        </Typography>
                                        <Typography variant="body1">{server.wfguid}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          App Supported By
                                        </Typography>
                                        <Typography variant="body1">{server.app_supported_by}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          App Managed By
                                        </Typography>
                                        <Typography variant="body1">{server.app_managed_by}</Typography>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      TSO & Device Management
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          TSO Managed By
                                        </Typography>
                                        <Typography variant="body1">{server.tso_managed_by}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          TSO Supported By
                                        </Typography>
                                        <Typography variant="body1">{server.tso_supported_by}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Device Managed By
                                        </Typography>
                                        <Typography variant="body1">{server.device_managed_by}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Device Supported By
                                        </Typography>
                                        <Typography variant="body1">{server.device_supported_by}</Typography>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
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
          count={filteredServers.length}
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

// Server Dialog Component
interface ServerDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Server>) => void;
  server?: Server | null;
}

const ServerDialog: React.FC<ServerDialogProps> = ({ open, onClose, onSave, server }) => {
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
    if (server) {
      setFormData(server);
    } else {
      setFormData({
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
    }
  }, [server]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {server ? 'Edit Server' : 'Create Server'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Host Name"
                value={formData.hostName}
                onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>App LOB</InputLabel>
                <Select
                  value={formData.appLob}
                  onChange={(e) => setFormData({ ...formData, appLob: e.target.value })}
                  label="App LOB"
                  required
                >
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Analytics">Analytics</MenuItem>
                  <MenuItem value="DevOps">DevOps</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="WF GUID"
                value={formData.wfguid}
                onChange={(e) => setFormData({ ...formData, wfguid: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="App ID"
                value={formData.appid}
                onChange={(e) => setFormData({ ...formData, appid: e.target.value })}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="App Supported By"
                value={formData.app_supported_by}
                onChange={(e) => setFormData({ ...formData, app_supported_by: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="App Managed By"
                value={formData.app_managed_by}
                onChange={(e) => setFormData({ ...formData, app_managed_by: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="TSO Managed By"
                value={formData.tso_managed_by}
                onChange={(e) => setFormData({ ...formData, tso_managed_by: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="TSO Supported By"
                value={formData.tso_supported_by}
                onChange={(e) => setFormData({ ...formData, tso_supported_by: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Device Managed By"
                value={formData.device_managed_by}
                onChange={(e) => setFormData({ ...formData, device_managed_by: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Device Supported By"
                value={formData.device_supported_by}
                onChange={(e) => setFormData({ ...formData, device_supported_by: e.target.value })}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#D71E28' }}>
            {server ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
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
      <DialogTitle>Bulk Edit Servers</DialogTitle>
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
            <FormControl fullWidth>
              <InputLabel>App LOB</InputLabel>
              <Select
                value={data.appLob ?? ''}
                onChange={(e) => onChange({ ...data, appLob: e.target.value })}
                label="App LOB"
              >
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Analytics">Analytics</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Domain"
              value={data.domain ?? ''}
              onChange={(e) => onChange({ ...data, domain: e.target.value })}
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

export default Servers; 