import React, { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  SearchInput,
  Filter,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  ReferenceField,
  Show,
  SimpleShowLayout,
  EditButton,
  ShowButton,
  DeleteButton,
  TopToolbar,
  ExportButton,
  CreateButton,
  useGetList,
  useGetOne,
  useRecordContext
} from 'react-admin';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Server List
const ServerList = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const filters = [
    <SearchInput source="q" placeholder="Search servers..." alwaysOn />,
    <ReferenceInput source="orgId" reference="organizations">
      <SelectInput optionText="orgName" />
    </ReferenceInput>,
    <SelectInput source="isActive" choices={[
      { id: true, name: 'Active' },
      { id: false, name: 'Inactive' }
    ]} />,
    <SelectInput source="appLob" choices={[
      { id: 'Finance', name: 'Finance' },
      { id: 'HR', name: 'HR' },
      { id: 'Analytics', name: 'Analytics' },
      { id: 'DevOps', name: 'DevOps' },
      { id: 'Marketing', name: 'Marketing' }
    ]} />
  ];

  const ListActions = () => (
    <TopToolbar>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );

  const CustomBooleanField = ({ source }) => {
    const record = useRecordContext();
    if (!record) return null;
    
    const value = record[source];
    return (
      <Chip
        icon={value ? <CheckCircleIcon /> : <CancelIcon />}
        label={value ? 'Active' : 'Inactive'}
        size="small"
        sx={{
          backgroundColor: value ? '#E8F5E8' : '#FFEBEE',
          color: value ? '#2E7D32' : '#D32F2F',
          fontWeight: 500,
          fontSize: '0.75rem',
          height: '24px',
          '& .MuiChip-icon': {
            color: value ? '#2E7D32' : '#D32F2F',
            fontSize: '16px',
          }
        }}
      />
    );
  };

  const ExpandButton = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    const isExpanded = expandedRows.has(record.id);
    
    const toggleExpanded = () => {
      const newExpanded = new Set(expandedRows);
      if (isExpanded) {
        newExpanded.delete(record.id);
      } else {
        newExpanded.add(record.id);
      }
      setExpandedRows(newExpanded);
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
        <IconButton
          size="small"
          onClick={toggleExpanded}
          sx={{ 
            padding: '4px',
            color: '#757575',
            '&:hover': { color: '#1976D2' }
          }}
        >
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Typography variant="body2" sx={{ color: '#212121', fontWeight: 500 }}>
          {record.hostName}
        </Typography>
      </Box>
    );
  };

  const ExpandableDatagrid = ({ children, ...props }) => {
    const { data, isLoading } = useGetList('servers');
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
          maxWidth: '100%',
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: 'auto',
            tableLayout: 'auto',
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                Host Name
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                Domain
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                App LOB
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                WFGUID
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                App ID
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                Organization
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              }}>
                Status
              </TableCell>
              <TableCell sx={{ 
                backgroundColor: '#F5F5F5',
                fontWeight: 600,
                color: '#212121',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                padding: '12px 16px',
                minWidth: '120px'
              }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((record) => {
              const isExpanded = expandedRows.has(record.id);
              
              return (
                <React.Fragment key={record.id}>
                  <TableRow sx={{ 
                    '&:hover': { backgroundColor: '#F8F9FA' },
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid #E0E0E0',
                      padding: '12px 16px',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }
                  }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            const newExpanded = new Set(expandedRows);
                            if (isExpanded) {
                              newExpanded.delete(record.id);
                            } else {
                              newExpanded.add(record.id);
                            }
                            setExpandedRows(newExpanded);
                          }}
                          sx={{ 
                            padding: '4px',
                            color: '#757575',
                            '&:hover': { color: '#1976D2' }
                          }}
                        >
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <Typography variant="body2" sx={{ color: '#212121', fontWeight: 500 }}>
                          {record.hostName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{record.domain}</TableCell>
                    <TableCell>{record.appLob}</TableCell>
                    <TableCell>{record.wfguid}</TableCell>
                    <TableCell>{record.appid}</TableCell>
                    <TableCell>{record.orgId}</TableCell>
                    <TableCell>
                      <Chip
                        icon={record.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                        label={record.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        sx={{
                          backgroundColor: record.isActive ? '#E8F5E8' : '#FFEBEE',
                          color: record.isActive ? '#2E7D32' : '#D32F2F',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: '24px',
                          '& .MuiChip-icon': {
                            color: record.isActive ? '#2E7D32' : '#D32F2F',
                            fontSize: '16px',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ minWidth: '120px', paddingRight: '24px' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <ShowButton 
                          label="" 
                          record={record}
                          sx={{ 
                            minWidth: 'auto',
                            padding: '6px',
                            marginRight: '8px',
                            '& .MuiButton-startIcon': {
                              margin: 0
                            }
                          }}
                        />
                        <EditButton 
                          label="" 
                          record={record}
                          sx={{ 
                            minWidth: 'auto',
                            padding: '6px',
                            '& .MuiButton-startIcon': {
                              margin: 0
                            }
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ padding: 0, border: 'none' }}>
                        <Box sx={{ 
                          p: 2, 
                          backgroundColor: '#F8F9FA', 
                          borderTop: '1px solid #E0E0E0'
                        }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Domain</Typography>
                              <Typography variant="body2" sx={{ color: '#212121' }}>
                                {record.domain || 'Not specified'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Application LOB</Typography>
                              <Typography variant="body2" sx={{ color: '#212121' }}>
                                {record.appLob || 'Not specified'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <List filters={filters} actions={<ListActions />}>
      <ExpandableDatagrid />
    </List>
  );
};

// Server Create
const ServerCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <Box sx={{ 
          p: { xs: 2, md: 4 }, 
          backgroundColor: '#FAFAFA', 
          minHeight: '100vh',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            mb: 3, 
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            <Typography variant="h4" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              Create Server
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Add a new server with all required details and support information.
            </Typography>
          </Paper>
          
          <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Server Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextInput source="hostName" fullWidth />
                    <TextInput source="domain" fullWidth />
                    <SelectInput 
                      source="appLob" 
                      choices={[
                        { id: 'Finance', name: 'Finance' },
                        { id: 'HR', name: 'HR' },
                        { id: 'Analytics', name: 'Analytics' },
                        { id: 'DevOps', name: 'DevOps' },
                        { id: 'Marketing', name: 'Marketing' }
                      ]}
                      fullWidth
                    />
                    <TextInput source="wfguid" fullWidth />
                    <TextInput source="appid" fullWidth />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Support & Management
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextInput source="app_supported_by" fullWidth />
                    <TextInput source="app_managed_by" fullWidth />
                    <TextInput source="tso_managed_by" fullWidth />
                    <TextInput source="tso_supported_by" fullWidth />
                    <TextInput source="device_managed_by" fullWidth />
                    <TextInput source="device_supported_by" fullWidth />
                    <ReferenceInput source="orgId" reference="organizations">
                      <SelectInput optionText="orgName" fullWidth />
                    </ReferenceInput>
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Server Edit
const ServerEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Box sx={{ p: 3, backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h4" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              Edit Server
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Update server details and support information.
            </Typography>
          </Paper>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Server Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextInput source="hostName" fullWidth />
                    <TextInput source="domain" fullWidth />
                    <SelectInput 
                      source="appLob" 
                      choices={[
                        { id: 'Finance', name: 'Finance' },
                        { id: 'HR', name: 'HR' },
                        { id: 'Analytics', name: 'Analytics' },
                        { id: 'DevOps', name: 'DevOps' },
                        { id: 'Marketing', name: 'Marketing' }
                      ]}
                      fullWidth
                    />
                    <TextInput source="wfguid" fullWidth />
                    <TextInput source="appid" fullWidth />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Support & Management
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextInput source="app_supported_by" fullWidth />
                    <TextInput source="app_managed_by" fullWidth />
                    <TextInput source="tso_managed_by" fullWidth />
                    <TextInput source="tso_supported_by" fullWidth />
                    <TextInput source="device_managed_by" fullWidth />
                    <TextInput source="device_supported_by" fullWidth />
                    <ReferenceInput source="orgId" reference="organizations">
                      <SelectInput optionText="orgName" fullWidth />
                    </ReferenceInput>
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

// Server Show with Navigation
const ServerShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: record, isLoading } = useGetOne('servers', { id });
  const { data: allRecords } = useGetList('servers');
  
  const currentIndex = allRecords?.findIndex(r => r.id == id) || 0;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (allRecords?.length || 0) - 1;
  
  const goToPrevious = () => {
    if (hasPrevious) {
      const prevRecord = allRecords[currentIndex - 1];
      navigate(`/servers/${prevRecord.id}/show`);
    }
  };
  
  const goToNext = () => {
    if (hasNext) {
      const nextRecord = allRecords[currentIndex + 1];
      navigate(`/servers/${nextRecord.id}/show`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Show>
      <SimpleShowLayout>
        <Box sx={{ p: 3, backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ color: '#212121', fontWeight: 600 }}>
                Server Details
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  disabled={!hasPrevious}
                  onClick={goToPrevious}
                  startIcon={<ChevronLeftIcon />}
                  variant="outlined"
                  sx={{ 
                    borderColor: '#E0E0E0',
                    color: '#757575',
                    '&:hover': {
                      borderColor: '#BDBDBD',
                      backgroundColor: '#F5F5F5',
                    }
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={!hasNext}
                  onClick={goToNext}
                  endIcon={<ChevronRightIcon />}
                  variant="outlined"
                  sx={{ 
                    borderColor: '#E0E0E0',
                    color: '#757575',
                    '&:hover': {
                      borderColor: '#BDBDBD',
                      backgroundColor: '#F5F5F5',
                    }
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Paper>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Server Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Host Name</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.hostName}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Domain</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.domain}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Application LOB</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.appLob}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>WFGUID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.wfguid}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>App ID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.appid}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Organization ID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.orgId}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Support & Management
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>App Supported By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.app_supported_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>App Managed By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.app_managed_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>TSO Managed By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.tso_managed_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>TSO Supported By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.tso_supported_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Device Managed By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.device_managed_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Device Supported By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.device_supported_by}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Status</Typography>
                      <Chip
                        icon={record?.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                        label={record?.isActive ? 'Active' : 'Inactive'}
                        sx={{
                          backgroundColor: record?.isActive ? '#E8F5E8' : '#FFEBEE',
                          color: record?.isActive ? '#2E7D32' : '#D32F2F',
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: record?.isActive ? '#2E7D32' : '#D32F2F',
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};

export {
  ServerList,
  ServerCreate,
  ServerEdit,
  ServerShow
}; 