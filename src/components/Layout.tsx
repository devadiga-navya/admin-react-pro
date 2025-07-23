import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
  Link,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  Computer as ComputerIcon,
  Terminal as TerminalIcon,
} from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    const breadcrumbItems: Array<{ label: string; path: string; icon: React.ReactElement | null }> = [
      { label: 'Dashboard', path: '/', icon: <HomeIcon sx={{ fontSize: 16 }} /> }
    ];

    // Skip 'administration' segment if present
    const relevantSegments = segments[0] === 'administration' ? segments.slice(1) : segments;

    if (relevantSegments.length > 0) {
      const resource = relevantSegments[0];
      let resourceLabel = '';
      let resourceIcon: React.ReactElement | null = null;

      switch (resource) {
        case 'organizations':
          resourceLabel = 'Organizations';
          resourceIcon = <BusinessIcon sx={{ fontSize: 16 }} />;
          break;
        case 'servers':
          resourceLabel = 'Servers';
          resourceIcon = <ComputerIcon sx={{ fontSize: 16 }} />;
          break;
        case 'commands':
          resourceLabel = 'Commands';
          resourceIcon = <TerminalIcon sx={{ fontSize: 16 }} />;
          break;
        default:
          resourceLabel = resource.charAt(0).toUpperCase() + resource.slice(1);
      }

      breadcrumbItems.push({
        label: resourceLabel,
        path: `/administration/${resource}`,
        icon: resourceIcon
      });

      if (relevantSegments.length > 1) {
        const action = relevantSegments[1];
        let actionLabel = '';
        
        switch (action) {
          case 'create':
            actionLabel = 'Create';
            break;
          case 'edit':
            actionLabel = 'Edit';
            break;
          case 'detail':
            actionLabel = 'Details';
            break;
          default:
            actionLabel = action.charAt(0).toUpperCase() + action.slice(1);
        }

        breadcrumbItems.push({
          label: actionLabel,
          path: pathname,
          icon: null
        });
      }
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbs();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb" sx={{ '& .MuiBreadcrumbs-ol': { alignItems: 'center' } }}>
            {breadcrumbItems.map((item, index) => (
              <Link
                key={index}
                color={index === breadcrumbItems.length - 1 ? 'text.primary' : 'inherit'}
                underline="hover"
                onClick={() => {
                  if (index < breadcrumbItems.length - 1) {
                    navigate(item.path);
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: index < breadcrumbItems.length - 1 ? 'pointer' : 'default',
                  '&:hover': {
                    textDecoration: index < breadcrumbItems.length - 1 ? 'underline' : 'none'
                  }
                }}
              >
                {item.icon && <Box sx={{ mr: 0.5 }}>{item.icon}</Box>}
                {item.label}
              </Link>
            ))}
          </Breadcrumbs>
        </Container>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 