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
  Show,
  SimpleShowLayout,
  EditButton,
  ShowButton,
  DeleteButton,
  TopToolbar,
  ExportButton,
  CreateButton,
  useRecordContext,
  useGetList,
  useGetOne,
  useUpdate,
  useCreate,
  useRedirect,
  useNotify
} from 'react-admin';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField as MuiTextField,
  Button,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Collapse,
  IconButton
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Organization List
const OrganizationList = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const filters = [
    <SearchInput source="q" placeholder="Search organizations..." alwaysOn />,
    <SelectInput source="authorizationScheme" choices={[
      { id: 'functional', name: 'Functional' },
      { id: 'ad_group', name: 'AD Group' }
    ]} />,
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
          {record.orgId}
        </Typography>
      </Box>
    );
  };

  const ExpandedContent = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    const isExpanded = expandedRows.has(record.id);
    
    if (!isExpanded) return null;

    return (
      <Box sx={{ 
        p: 2, 
        backgroundColor: '#F8F9FA', 
        borderTop: '1px solid #E0E0E0',
        mt: 1
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Description</Typography>
            <Typography variant="body2" sx={{ color: '#212121' }}>
              {record.description || 'No description available'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Queries Key</Typography>
            <Typography variant="body2" sx={{ color: '#212121' }}>
              {record.queriesKey || 'Not specified'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <List filters={filters} actions={<ListActions />}>
      <Datagrid 
        sx={{
          '& .MuiTableRow-root:hover': {
            backgroundColor: '#F8F9FA',
          },
          '& .MuiTableCell-root': {
            borderBottom: '1px solid #E0E0E0',
            padding: '12px 16px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            backgroundColor: '#F5F5F5',
            fontWeight: 600,
            color: '#212121',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
          },
          '& .MuiTable-root': {
            minWidth: 'auto',
            tableLayout: 'auto',
          },
          '& .MuiTableContainer-root': {
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid #E0E0E0',
            maxWidth: '100%',
          },
          '& .MuiTableBody-root .MuiTableCell-root:last-child': {
            paddingRight: '24px',
            minWidth: '120px',
          },
          '& .MuiTableBody-root .MuiTableCell-root:nth-last-child(2)': {
            paddingRight: '16px',
            minWidth: '100px',
          },
          '& .MuiTableBody-root .MuiTableCell-root:nth-last-child(3)': {
            paddingRight: '16px',
            minWidth: '120px',
          }
        }}
      >
        <ExpandButton />
        <TextField source="orgName" />
        <TextField source="mnemonic" />
        <TextField source="authorizationScheme" />
        <TextField source="supportedBy" />
        <TextField source="managedBy" />
        <TextField source="serviceOffering" />
        <CustomBooleanField source="isActive" />
        <ShowButton 
          label="" 
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
          sx={{ 
            minWidth: 'auto',
            padding: '6px',
            '& .MuiButton-startIcon': {
              margin: 0
            }
          }}
        />
        <ExpandedContent />
      </Datagrid>
    </List>
  );
};

// Organization Create
const OrganizationCreate = () => {
  const [jsonConfig, setJsonConfig] = useState('');
  const [formData, setFormData] = useState({});
  const [showJson, setShowJson] = useState(true);
  const notify = useNotify();
  const redirect = useRedirect();

  // Generate JSON from form data
  const generateJsonFromForm = (data) => {
    const jsonData = {
      orgId: data.orgId || '',
      orgName: data.orgName || '',
      mnemonic: data.mnemonic || '',
      queriesKey: data.queriesKey || '',
      description: data.description || '',
      authorizationScheme: data.authorizationScheme || '',
      supportedBy: data.supportedBy || '',
      managedBy: data.managedBy || '',
      serviceOffering: data.serviceOffering || '',
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
    notify('Organization created successfully');
    redirect('/organizations');
  };

  return (
    <Create transform={transform} mutationOptions={{ onSuccess }}>
      <SimpleForm onChange={handleFormChange}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ color: '#212121', mb: 1, fontWeight: 600 }}>
                  Create Organization
                </Typography>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Add a new organization with all required details and JSON configuration.
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={showJson}
                    onChange={(e) => setShowJson(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2E7D32',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#2E7D32',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon sx={{ color: '#1976D2', fontSize: 20 }} />
                    <Typography sx={{ fontSize: '14px', color: '#757575', fontWeight: 500 }}>
                      Show JSON
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
          
          <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
            <Grid item xs={12} lg={showJson ? 6 : 12}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Organization Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextInput source="orgId" fullWidth />
                    <TextInput source="orgName" fullWidth />
                    <TextInput source="mnemonic" fullWidth />
                    <TextInput source="queriesKey" fullWidth />
                    <TextInput source="description" fullWidth multiline rows={3} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={showJson ? 6 : 12}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Configuration & Management
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <SelectInput 
                      source="authorizationScheme" 
                      choices={[
                        { id: 'functional', name: 'Functional' },
                        { id: 'ad_group', name: 'AD Group' }
                      ]}
                      fullWidth
                    />
                    <TextInput source="supportedBy" fullWidth />
                    <TextInput source="managedBy" fullWidth />
                    <TextInput source="serviceOffering" fullWidth />
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {showJson && (
              <Grid item xs={12}>
                <Card sx={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <CodeIcon sx={{ color: '#1976D2', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ color: '#212121', fontWeight: 600 }}>
                        JSON Configuration
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
                      The JSON is automatically generated from the form fields above. You can also edit it directly to update the form.
                    </Typography>
                    <MuiTextField
                      fullWidth
                      multiline
                      rows={20}
                      value={jsonConfig}
                      onChange={handleJsonChange}
                      placeholder="JSON will be automatically generated from form fields..."
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          backgroundColor: '#F8F9FA',
                          '& fieldset': {
                            borderColor: '#E0E0E0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#BDBDBD',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2E7D32',
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Organization Edit
const OrganizationEdit = () => {
  const [jsonConfig, setJsonConfig] = useState('');
  const [formData, setFormData] = useState({});
  const [showJson, setShowJson] = useState(true);
  const notify = useNotify();
  const redirect = useRedirect();

  // Generate JSON from form data
  const generateJsonFromForm = (data) => {
    const jsonData = {
      orgId: data.orgId || '',
      orgName: data.orgName || '',
      mnemonic: data.mnemonic || '',
      queriesKey: data.queriesKey || '',
      description: data.description || '',
      authorizationScheme: data.authorizationScheme || '',
      supportedBy: data.supportedBy || '',
      managedBy: data.managedBy || '',
      serviceOffering: data.serviceOffering || '',
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
    notify('Organization updated successfully');
    redirect('/organizations');
  };

  return (
    <Edit transform={transform} mutationOptions={{ onSuccess }}>
      <SimpleForm onChange={handleFormChange}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ color: '#212121', mb: 1, fontWeight: 600 }}>
                  Edit Organization
                </Typography>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Update organization details and JSON configuration.
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={showJson}
                    onChange={(e) => setShowJson(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2E7D32',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#2E7D32',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon sx={{ color: '#1976D2', fontSize: 20 }} />
                    <Typography sx={{ fontSize: '14px', color: '#757575', fontWeight: 500 }}>
                      Show JSON
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
          
          <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
            <Grid item xs={12} lg={showJson ? 6 : 12}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Organization Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextInput source="orgId" fullWidth />
                    <TextInput source="orgName" fullWidth />
                    <TextInput source="mnemonic" fullWidth />
                    <TextInput source="queriesKey" fullWidth />
                    <TextInput source="description" fullWidth multiline rows={3} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={showJson ? 6 : 12}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                height: 'fit-content'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    Configuration & Management
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <SelectInput 
                      source="authorizationScheme" 
                      choices={[
                        { id: 'functional', name: 'Functional' },
                        { id: 'ad_group', name: 'AD Group' }
                      ]}
                      fullWidth
                    />
                    <TextInput source="supportedBy" fullWidth />
                    <TextInput source="managedBy" fullWidth />
                    <TextInput source="serviceOffering" fullWidth />
                    <BooleanInput source="isActive" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {showJson && (
              <Grid item xs={12}>
                <Card sx={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <CodeIcon sx={{ color: '#1976D2', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ color: '#212121', fontWeight: 600 }}>
                        JSON Configuration
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
                      The JSON is automatically generated from the form fields above. You can also edit it directly to update the form.
                    </Typography>
                    <MuiTextField
                      fullWidth
                      multiline
                    rows={20}
                    value={jsonConfig}
                    onChange={handleJsonChange}
                    placeholder="JSON will be automatically generated from form fields..."
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        backgroundColor: '#F8F9FA',
                        '& fieldset': {
                          borderColor: '#E0E0E0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#BDBDBD',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2E7D32',
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
            )}
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  );
};

// Organization Show with Navigation
const OrganizationShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: record, isLoading } = useGetOne('organizations', { id });
  const { data: allRecords } = useGetList('organizations');
  
  const currentIndex = allRecords?.findIndex(r => r.id == id) || 0;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (allRecords?.length || 0) - 1;
  
  const goToPrevious = () => {
    if (hasPrevious) {
      const prevRecord = allRecords[currentIndex - 1];
      navigate(`/organizations/${prevRecord.id}/show`);
    }
  };
  
  const goToNext = () => {
    if (hasNext) {
      const nextRecord = allRecords[currentIndex + 1];
      navigate(`/organizations/${nextRecord.id}/show`);
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
                Organization Details
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
                    Basic Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Organization ID</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.orgId}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Organization Name</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.orgName}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Mnemonic</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.mnemonic}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Queries Key</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.queriesKey}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Description</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.description}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Authorization Scheme</Typography>
                      <Chip 
                        label={record?.authorizationScheme} 
                        sx={{ 
                          backgroundColor: record?.authorizationScheme === 'functional' ? '#E8F5E8' : '#FFF3E0',
                          color: record?.authorizationScheme === 'functional' ? '#2E7D32' : '#FF9800',
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Supported By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.supportedBy}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Managed By</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.managedBy}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#757575', mb: 0.5 }}>Service Offering</Typography>
                      <Typography variant="body1" sx={{ color: '#212121', fontWeight: 500 }}>{record?.serviceOffering}</Typography>
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
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#212121', mb: 3, fontWeight: 600 }}>
                    JSON Configuration
                  </Typography>
                  <Box sx={{ 
                    backgroundColor: '#F8F9FA', 
                    p: 2, 
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '500px',
                    overflow: 'auto',
                    border: '1px solid #E0E0E0'
                  }}>
                    {record?.jsonConfig || 'No JSON configuration available'}
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
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
  OrganizationShow
}; 