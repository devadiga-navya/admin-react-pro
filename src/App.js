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

// Modern Professional Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366F1', // Modern Indigo
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981', // Modern Emerald
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4444', // Modern Red
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B', // Modern Amber
      light: '#FBBF24',
      dark: '#D97706',
    },
    success: {
      main: '#10B981', // Modern Emerald
      light: '#34D399',
      dark: '#059669',
    },
    info: {
      main: '#3B82F6', // Modern Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: '#F8FAFC', // Modern Gray-50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Modern Slate-800
      secondary: '#64748B', // Modern Slate-500
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.025em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.025em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(15, 23, 42, 0.08)',
    '0px 1px 3px rgba(15, 23, 42, 0.1), 0px 1px 2px rgba(15, 23, 42, 0.06)',
    '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
    '0px 10px 15px -3px rgba(15, 23, 42, 0.1), 0px 4px 6px -2px rgba(15, 23, 42, 0.05)',
    '0px 20px 25px -5px rgba(15, 23, 42, 0.1), 0px 10px 10px -5px rgba(15, 23, 42, 0.04)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
    '0px 25px 50px -12px rgba(15, 23, 42, 0.25)',
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
          border: '1px solid #E2E8F0',
          borderRadius: 16,
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 10px 15px -3px rgba(15, 23, 42, 0.1), 0px 4px 6px -2px rgba(15, 23, 42, 0.05)',
          },
        },
        contained: {
          boxShadow: '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
          '&:hover': {
            boxShadow: '0px 10px 15px -3px rgba(15, 23, 42, 0.1), 0px 4px 6px -2px rgba(15, 23, 42, 0.05)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -1px rgba(15, 23, 42, 0.06)',
          border: '1px solid #E2E8F0',
          borderRadius: 16,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E2E8F0',
          padding: '16px 24px',
          fontSize: '0.875rem',
        },
        head: {
          backgroundColor: '#F8FAFC',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#64748B',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F8FAFC',
          },
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#E2E8F0',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366F1',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#10B981',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#10B981',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#F1F5F9',
            transform: 'scale(1.05)',
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
      title="Enterprise Admin"
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