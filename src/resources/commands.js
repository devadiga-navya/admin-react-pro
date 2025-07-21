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
  useRecordContext,
  useNotify,
  useRedirect
} from 'react-admin';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField as MuiTextField,
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
import CodeIcon from '@mui/icons-material/Code';

// Command List
const CommandList = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const filters = [
    <SearchInput source="q" placeholder="Search commands..." alwaysOn />,
    <ReferenceInput source="orgId" reference="organizations">
      <SelectInput optionText="orgName" />
    </ReferenceInput>,
    <SelectInput source="isActive" choices={[
      { id: true, name: 'Active' },
      { id: false, name: 'Inactive' }
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
          {record.commandId}
        </Typography>
      </Box>
    );
  };

  const ExpandableDatagrid = ({ children, ...props }) => {
    const { data, isLoading } = useGetList('commands');
    
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
            tableLayout: 'fixed',
            width: '100%',
          },
          '& .MuiTableCell-root': {
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '150px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '@media (max-width: 1200px)': {
            '& .MuiTableCell-root': {
              maxWidth: '120px',
              fontSize: '12px',
              padding: '8px 12px',
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontSize: '11px',
              padding: '8px 12px',
            }
          },
          '@media (max-width: 900px)': {
            '& .MuiTableCell-root': {
              maxWidth: '100px',
              fontSize: '11px',
              padding: '6px 8px',
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontSize: '10px',
              padding: '6px 8px',
            }
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
                Command ID
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
                Command Label
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
                Description
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
                          {record.commandId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{record.commandLabel}</TableCell>
                    <TableCell>{record.description}</TableCell>
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
                      <TableCell colSpan={6} sx={{ padding: 0, border: 'none' }}>
                        <Box sx={{ 
                          p: 2, 
                          backgroundColor: '#F8F9FA', 
                          borderTop: '1px solid #E0E0E0'
                        }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Description</Typography>
                              <Typography variant="body2" sx={{ color: '#212121' }}>
                                {record.description || 'No description available'}
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

// Command Create
const CommandCreate = () => {
  const [jsonConfig, setJsonConfig] = useState('');
  const [formData, setFormData] = useState({});
  const [showJson, setShowJson] = useState(true);
  const notify = useNotify();
  const redirect = useRedirect();

  // Generate JSON from form data
  const generateJsonFromForm = (data) => {
    const jsonData = {
      commandId: data.commandId || '',
      commandLabel: data.commandLabel || '',
      description: data.description || '',
      orgId: data.orgId || '',
      isActive: data.isActive || false
    };
    return JSON.stringify(jsonData, null, 2);
  };

  // Update JSON when form data changes
  const handleFormChange = (data) => {
    setFormData(data);
    const generatedJson = generateJsonFromForm(data);
    setJsonConfig(generatedJson);
  };

  // Parse JSON and update form
  const handleJsonChange = (event) => {
    const newJson = event.target.value;
    setJsonConfig(newJson);
    
    try {
      const parsedData = JSON.parse(newJson);
      setFormData(parsedData);
    } catch (error) {
      // Invalid JSON, keep current form data
    }
  };

  const transform = (data) => {
    const finalData = { ...formData, ...data };
    return {
      ...finalData,
      jsonConfig: jsonConfig || generateJsonFromForm(finalData)
    };
  };

  const onSuccess = () => {
    notify('Command created successfully');
    redirect('/commands');
  };

  return (
    <Create transform={transform} mutationOptions={{ onSuccess }}>
      <SimpleForm onChange={handleFormChange}>
        <Box sx={{ 
          p: { xs: 2, md: 4 }, 
          backgroundColor: '#FAFAFA', 
          minHeight: '100vh',
          width: '100%',
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
              Create Command
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Add a new command with all required details and organization mapping.
            </Typography>
          </Paper>
          
          <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>
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
                    Command Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextInput source="commandId" fullWidth />
                    <TextInput source="commandLabel" fullWidth />
                    <TextInput source="description" fullWidth multiline rows={3} />
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
                    Organization & Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <ReferenceInput source="orgId" reference="organizations">
                      <SelectInput optionText="orgName" fullWidth />
                    </ReferenceInput>
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* JSON Configuration Section */}
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            mt: 3, 
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#212121', mb: 1, fontWeight: 600 }}>
                  JSON Configuration
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  View and edit the JSON configuration for this command.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={() => setShowJson(!showJson)}
                sx={{
                  borderColor: '#1976D2',
                  color: '#1976D2',
                  '&:hover': {
                    borderColor: '#1565C0',
                    backgroundColor: '#F3F8FF'
                  }
                }}
              >
                {showJson ? 'Hide JSON' : 'Show JSON'}
              </Button>
            </Box>
            
            {showJson && (
              <Box sx={{ mt: 2 }}>
                <MuiTextField
                  multiline
                  rows={8}
                  fullWidth
                  value={jsonConfig}
                  onChange={handleJsonChange}
                  variant="outlined"
                  placeholder="JSON configuration will be generated automatically..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      backgroundColor: '#F8F9FA',
                      '&:hover': {
                        backgroundColor: '#F0F0F0'
                      }
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: '#757575', mt: 1, display: 'block' }}>
                  Edit the JSON directly or modify the form fields above. Invalid JSON will be ignored.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Command Edit
const CommandEdit = () => {
  const [jsonConfig, setJsonConfig] = useState('');
  const [formData, setFormData] = useState({});
  const [showJson, setShowJson] = useState(true);
  const notify = useNotify();
  const redirect = useRedirect();

  // Generate JSON from form data
  const generateJsonFromForm = (data) => {
    const jsonData = {
      commandId: data.commandId || '',
      commandLabel: data.commandLabel || '',
      description: data.description || '',
      orgId: data.orgId || '',
      isActive: data.isActive || false
    };
    return JSON.stringify(jsonData, null, 2);
  };

  // Update JSON when form data changes
  const handleFormChange = (data) => {
    setFormData(data);
    const generatedJson = generateJsonFromForm(data);
    setJsonConfig(generatedJson);
  };

  // Parse JSON and update form
  const handleJsonChange = (event) => {
    const newJson = event.target.value;
    setJsonConfig(newJson);
    
    try {
      const parsedData = JSON.parse(newJson);
      setFormData(parsedData);
    } catch (error) {
      // Invalid JSON, keep current form data
    }
  };

  const transform = (data) => {
    const finalData = { ...formData, ...data };
    return {
      ...finalData,
      jsonConfig: jsonConfig || generateJsonFromForm(finalData)
    };
  };

  const onSuccess = () => {
    notify('Command updated successfully');
    redirect('/commands');
  };

  return (
    <Edit transform={transform} mutationOptions={{ onSuccess }}>
      <SimpleForm onChange={handleFormChange}>
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#FAFAFA', minHeight: '100vh', width: '100%', maxWidth: '100%' }}>
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <Typography variant="h4" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              Edit Command
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Update command details and organization mapping.
            </Typography>
          </Paper>
          
          <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Command Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextInput source="commandId" fullWidth />
                    <TextInput source="commandLabel" fullWidth />
                    <TextInput source="description" fullWidth multiline rows={3} />
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
                    Organization & Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <ReferenceInput source="orgId" reference="organizations">
                      <SelectInput optionText="orgName" fullWidth />
                    </ReferenceInput>
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* JSON Configuration Section */}
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            mt: 3, 
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ color: '#212121', mb: 1, fontWeight: 600 }}>
                  JSON Configuration
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                  View and edit the JSON configuration for this command.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={() => setShowJson(!showJson)}
                sx={{
                  borderColor: '#1976D2',
                  color: '#1976D2',
                  '&:hover': {
                    borderColor: '#1565C0',
                    backgroundColor: '#F3F8FF'
                  }
                }}
              >
                {showJson ? 'Hide JSON' : 'Show JSON'}
              </Button>
            </Box>
            
            {showJson && (
              <Box sx={{ mt: 2 }}>
                <MuiTextField
                  multiline
                  rows={8}
                  fullWidth
                  value={jsonConfig}
                  onChange={handleJsonChange}
                  variant="outlined"
                  placeholder="JSON configuration will be generated automatically..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      backgroundColor: '#F8F9FA',
                      '&:hover': {
                        backgroundColor: '#F0F0F0'
                      }
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: '#757575', mt: 1, display: 'block' }}>
                  Edit the JSON directly or modify the form fields above. Invalid JSON will be ignored.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

// Command Show with Navigation
const CommandShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: record, isLoading } = useGetOne('commands', { id });
  const { data: allRecords } = useGetList('commands');
  
  const currentIndex = allRecords?.findIndex(r => r.id == id) || 0;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (allRecords?.length || 0) - 1;
  
  const goToPrevious = () => {
    if (hasPrevious) {
      const prevRecord = allRecords[currentIndex - 1];
      navigate(`/commands/${prevRecord.id}/show`);
    }
  };
  
  const goToNext = () => {
    if (hasNext) {
      const nextRecord = allRecords[currentIndex + 1];
      navigate(`/commands/${nextRecord.id}/show`);
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
                Command Details
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
                    Command Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Command ID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.commandId}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Command Label</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.commandLabel}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Description</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.description}</Typography>
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
                    Organization & Status
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Organization ID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.orgId}</Typography>
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
  CommandList,
  CommandCreate,
  CommandEdit,
  CommandShow
}; 