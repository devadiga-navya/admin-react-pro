import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Organizations from './pages/Organization/Organizations';
import OrganizationForm from './pages/Organization/OrganizationForm';
import OrganizationDetail from './pages/Organization/OrganizationDetail';
import Servers from './pages/Server/Servers';
import ServerForm from './pages/Server/ServerForm';
import ServerDetail from './pages/Server/ServerDetail';
import Commands from './pages/Command/Commands';
import CommandForm from './pages/Command/CommandForm';
import CommandDetail from './pages/Command/CommandDetail';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Green for active
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#D32F2F', // Red for inactive
      light: '#EF5350',
      dark: '#C62828',
    },
    error: {
      main: '#F44336', // Red
    },
    warning: {
      main: '#FF9800', // Orange/Yellow
    },
    success: {
      main: '#4CAF50', // Green
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E0E0E0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E0E0E0',
        },
        head: {
          backgroundColor: '#F5F5F5',
          fontWeight: 600,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F8F9FA',
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/administration/organizations" element={<Organizations />} />
            <Route path="/administration/organizations/create" element={<OrganizationForm mode="create" />} />
            <Route path="/administration/organizations/edit/:id" element={<OrganizationForm mode="edit" />} />
            <Route path="/administration/organizations/detail/:id" element={<OrganizationDetail />} />
            <Route path="/administration/servers" element={<Servers />} />
            <Route path="/administration/servers/create" element={<ServerForm mode="create" />} />
            <Route path="/administration/servers/edit/:id" element={<ServerForm mode="edit" />} />
            <Route path="/administration/servers/detail/:id" element={<ServerDetail />} />
            <Route path="/administration/commands" element={<Commands />} />
            <Route path="/administration/commands/create" element={<CommandForm mode="create" />} />
            <Route path="/administration/commands/edit/:id" element={<CommandForm mode="edit" />} />
            <Route path="/administration/commands/detail/:id" element={<CommandDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 