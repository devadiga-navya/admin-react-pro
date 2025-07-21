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
  IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: '#757575', mb: 1 }}>Description</Typography>
            <Typography variant="body2" sx={{ color: '#212121' }}>
              {record.description || 'No description available'}
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
        <TextField source="commandLabel" />
        <TextField source="description" />
        <ReferenceField source="orgId" reference="organizations">
          <TextField source="orgName" />
        </ReferenceField>
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

// Command Create
const CommandCreate = () => {
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
              Create Command
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Add a new command with all required details and organization mapping.
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
        </Box>
      </SimpleForm>
    </Create>
  );
};

// Command Edit
const CommandEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Box sx={{ p: 3, backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h4" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              Edit Command
            </Typography>
            <Typography variant="body1" sx={{ color: '#757575' }}>
              Update command details and organization mapping.
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