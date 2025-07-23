import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Computer as ComputerIcon,
  Terminal as TerminalIcon,
  Visibility as VisibilityIcon,
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

interface BulkEditData {
  isActive?: boolean;
  authorizationScheme?: 'functional' | 'ad_group';
  serviceOffering?: string;
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
    managedBy: 'Lisa Chen',
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
      managedBy: 'Lisa Chen',
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
    supportedBy: 'David Brown',
    managedBy: 'Emma Davis',
    serviceOffering: 'DevOps Services',
    isActive: false,
    jsonConfig: JSON.stringify({
      orgId: 'ORG003',
      orgName: 'Cloud Infrastructure Ltd',
      mnemonic: 'CIL',
      queriesKey: 'cloud_infra_key',
      description: 'Cloud infrastructure and DevOps services',
      authorizationScheme: 'functional',
      supportedBy: 'David Brown',
      managedBy: 'Emma Davis',
      serviceOffering: 'DevOps Services',
      isActive: false
    }, null, 2)
  }
];

const Organizations: React.FC = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [openBulkEdit, setOpenBulkEdit] = useState(false);
  const [bulkEditData, setBulkEditData] = useState<BulkEditData>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const filteredOrganizations = organizations.filter(org =>
    Object.values(org).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(filteredOrganizations.map(org => org.id));
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
    navigate('/administration/organizations/create');
  };

  const handleEdit = (org: Organization) => {
    navigate(`/administration/organizations/edit/${org.id}`);
  };

  const handleViewServers = (orgId: number) => {
    navigate(`/administration/servers?orgId=${orgId}`);
  };

  const handleViewCommands = (orgId: number) => {
    navigate(`/administration/commands?orgId=${orgId}`);
  };

  const handleDelete = (id: number) => {
    setOrganizations(prev => prev.filter(org => org.id !== id));
    setSnackbar({ open: true, message: 'Organization deleted successfully', severity: 'success' });
  };

  const handleBulkEdit = () => {
    if (selectedItems.length === 0) {
      setSnackbar({ open: true, message: 'Please select items to edit', severity: 'error' });
      return;
    }
    setOpenBulkEdit(true);
  };

  const handleBulkEditSave = () => {
    setOrganizations(prev => 
      prev.map(org => 
        selectedItems.includes(org.id) 
          ? { ...org, ...bulkEditData }
          : org
      )
    );
    setSelectedItems([]);
    setBulkEditData({});
    setOpenBulkEdit(false);
    setSnackbar({ open: true, message: 'Bulk edit completed successfully', severity: 'success' });
  };

  const handleViewDetails = (org: Organization) => {
    navigate(`/administration/organizations/detail/${org.id}`);
  };



  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
            Organizations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{ backgroundColor: '#D71E28' }}
          >
            Add Organization
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search organizations..."
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
                sx={{ mr: 1, minWidth: 140 }}
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
                    indeterminate={selectedItems.length > 0 && selectedItems.length < filteredOrganizations.length}
                    checked={selectedItems.length === filteredOrganizations.length && filteredOrganizations.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Organization ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mnemonic</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Authorization</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrganizations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((org) => (
                  <React.Fragment key={org.id}>
                    <TableRow hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.includes(org.id)}
                          onChange={() => handleSelectItem(org.id)}
                        />
                      </TableCell>
                      <TableCell>{org.orgId}</TableCell>
                      <TableCell>{org.orgName}</TableCell>
                      <TableCell>{org.mnemonic}</TableCell>
                      <TableCell>
                        <Chip
                          icon={org.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                          label={org.isActive ? 'Active' : 'Inactive'}
                          size="small"
                          sx={{
                            backgroundColor: org.isActive ? '#E8F5E8' : '#FFEBEE',
                            color: org.isActive ? '#1976D2' : '#D32F2F',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>{org.authorizationScheme}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleExpandRow(org.id)}
                          >
                            {expandedRows.has(org.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(org)}
                            sx={{ color: '#4CAF50' }}
                            title="View Details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(org)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewServers(org.id)}
                            sx={{ color: '#1976D2' }}
                            title="View Servers"
                          >
                            <ComputerIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewCommands(org.id)}
                            sx={{ color: '#FF9800' }}
                            title="View Commands"
                          >
                            <TerminalIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(org.id)}
                            sx={{ color: '#D32F2F' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={expandedRows.has(org.id)} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      Details
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Description
                                        </Typography>
                                        <Typography variant="body1">{org.description}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Supported By
                                        </Typography>
                                        <Typography variant="body1">{org.supportedBy}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Managed By
                                        </Typography>
                                        <Typography variant="body1">{org.managedBy}</Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Service Offering
                                        </Typography>
                                        <Typography variant="body1">{org.serviceOffering}</Typography>
                                      </Box>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                      <CodeIcon />
                                      <Typography variant="h6">
                                        JSON Configuration
                                      </Typography>
                                    </Box>
                                    <TextField
                                      fullWidth
                                      multiline
                                      rows={8}
                                      value={org.jsonConfig}
                                      variant="outlined"
                                      size="small"
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
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
          count={filteredOrganizations.length}
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
      <DialogTitle>Bulk Edit Organizations</DialogTitle>
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
              <InputLabel>Authorization Scheme</InputLabel>
              <Select
                value={data.authorizationScheme ?? ''}
                onChange={(e) => onChange({ ...data, authorizationScheme: e.target.value as 'functional' | 'ad_group' })}
                label="Authorization Scheme"
              >
                <MenuItem value="functional">Functional</MenuItem>
                <MenuItem value="ad_group">AD Group</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service Offering"
              value={data.serviceOffering ?? ''}
              onChange={(e) => onChange({ ...data, serviceOffering: e.target.value })}
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

export default Organizations; 