import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import { dataProvider } from './dataProvider';
import { OrganizationList, OrganizationCreate, OrganizationEdit, OrganizationShow } from './resources/organizations';
import { ServerList, ServerCreate, ServerEdit, ServerShow } from './resources/servers';
import { CommandList, CommandCreate, CommandEdit, CommandShow } from './resources/commands';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import TerminalIcon from '@mui/icons-material/Terminal';

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

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Admin 
      dashboard={Dashboard}
      dataProvider={dataProvider}
      title="Admin Dashboard"
    >
      <Resource 
        name="organizations" 
        list={OrganizationList}
        create={OrganizationCreate}
        edit={OrganizationEdit}
        show={OrganizationShow}
        icon={BusinessIcon}
      />
      <Resource 
        name="servers" 
        list={ServerList}
        create={ServerCreate}
        edit={ServerEdit}
        show={ServerShow}
        icon={ComputerIcon}
      />
      <Resource 
        name="commands" 
        list={CommandList}
        create={CommandCreate}
        edit={CommandEdit}
        show={CommandShow}
        icon={TerminalIcon}
      />
    </Admin>
  </ThemeProvider>
);

export default App; 