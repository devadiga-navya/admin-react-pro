import React from 'react';
import { Card, CardContent, CardHeader, Chip } from '@mui/material';
import { Title } from 'react-admin';
import { useGetList } from 'react-admin';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import TerminalIcon from '@mui/icons-material/Terminal';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Box, Grid, Typography, Paper, Divider } from '@mui/material';

const Dashboard = () => {
  const { data: organizations, total: orgTotal } = useGetList('organizations');
  const { data: servers, total: serverTotal } = useGetList('servers');
  const { data: commands, total: commandTotal } = useGetList('commands');

  const activeOrgs = organizations?.filter(org => org.isActive).length || 0;
  const activeServers = servers?.filter(server => server.isActive).length || 0;
  const activeCommands = commands?.filter(cmd => cmd.isActive).length || 0;

  const inactiveOrgs = (orgTotal || 0) - activeOrgs;
  const inactiveServers = (serverTotal || 0) - activeServers;
  const inactiveCommands = (commandTotal || 0) - activeCommands;

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      backgroundColor: '#FAFAFA', 
      minHeight: '100vh',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Title title="Admin Dashboard" />
      
      {/* Header */}
      <Paper sx={{ 
        p: { xs: 2, md: 3 }, 
        mb: 3, 
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <Typography variant="h4" sx={{ color: '#212121', mb: 1, fontWeight: 600 }}>
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#757575' }}>
          Manage your organizations, servers, and commands efficiently with our sleek interface.
        </Typography>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4, maxWidth: '100%' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            border: '1px solid #E0E0E0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }
          }}>
            <CardHeader
              avatar={
                <Box sx={{ 
                  backgroundColor: '#E8F5E8', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BusinessIcon sx={{ color: '#2E7D32', fontSize: 28 }} />
                </Box>
              }
              title={
                <Typography variant="h6" sx={{ color: '#212121', fontWeight: 600 }}>
                  Organizations
                </Typography>
              }
              subheader={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`${activeOrgs} Active`} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#E8F5E8', 
                      color: '#2E7D32',
                      fontWeight: 500
                    }} 
                  />
                  {inactiveOrgs > 0 && (
                    <Chip 
                      label={`${inactiveOrgs} Inactive`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#FFEBEE', 
                        color: '#D32F2F',
                        fontWeight: 500
                      }} 
                    />
                  )}
                </Box>
              }
            />
            <CardContent>
              <Typography variant="h3" sx={{ color: '#2E7D32', fontWeight: 700, mb: 1 }}>
                {orgTotal || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                Total Organizations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            border: '1px solid #E0E0E0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }
          }}>
            <CardHeader
              avatar={
                <Box sx={{ 
                  backgroundColor: '#E3F2FD', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ComputerIcon sx={{ color: '#1976D2', fontSize: 28 }} />
                </Box>
              }
              title={
                <Typography variant="h6" sx={{ color: '#212121', fontWeight: 600 }}>
                  Servers
                </Typography>
              }
              subheader={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`${activeServers} Active`} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#E8F5E8', 
                      color: '#2E7D32',
                      fontWeight: 500
                    }} 
                  />
                  {inactiveServers > 0 && (
                    <Chip 
                      label={`${inactiveServers} Inactive`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#FFEBEE', 
                        color: '#D32F2F',
                        fontWeight: 500
                      }} 
                    />
                  )}
                </Box>
              }
            />
            <CardContent>
              <Typography variant="h3" sx={{ color: '#1976D2', fontWeight: 700, mb: 1 }}>
                {serverTotal || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                Total Servers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            border: '1px solid #E0E0E0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }
          }}>
            <CardHeader
              avatar={
                <Box sx={{ 
                  backgroundColor: '#FFF3E0', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TerminalIcon sx={{ color: '#FF9800', fontSize: 28 }} />
                </Box>
              }
              title={
                <Typography variant="h6" sx={{ color: '#212121', fontWeight: 600 }}>
                  Commands
                </Typography>
              }
              subheader={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip 
                    label={`${activeCommands} Active`} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#E8F5E8', 
                      color: '#2E7D32',
                      fontWeight: 500
                    }} 
                  />
                  {inactiveCommands > 0 && (
                    <Chip 
                      label={`${inactiveCommands} Inactive`} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#FFEBEE', 
                        color: '#D32F2F',
                        fontWeight: 500
                      }} 
                    />
                  )}
                </Box>
              }
            />
            <CardContent>
              <Typography variant="h3" sx={{ color: '#FF9800', fontWeight: 700, mb: 1 }}>
                {commandTotal || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575' }}>
                Total Commands
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ maxWidth: '100%' }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              System Overview
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Active Organizations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                    {activeOrgs}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Active Servers
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                    {activeServers}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Active Commands
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                    {activeCommands}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h6" sx={{ color: '#212121', mb: 2, fontWeight: 600 }}>
              Inactive Items
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Inactive Organizations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingDownIcon sx={{ color: '#F44336', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                    {inactiveOrgs}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Inactive Servers
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingDownIcon sx={{ color: '#F44336', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                    {inactiveServers}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Inactive Commands
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingDownIcon sx={{ color: '#F44336', fontSize: 20 }} />
                  <Typography variant="h6" sx={{ color: '#D32F2F', fontWeight: 600 }}>
                    {inactiveCommands}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 