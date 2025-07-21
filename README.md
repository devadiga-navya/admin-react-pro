# Admin Dashboard

A comprehensive admin dashboard built with React Admin and Material-UI for managing organizations, servers, and commands.

## Features

### Organizations Management
- **Fields**: orgId, orgName, mnemonic, queriesKey, description, authorizationScheme (functional/ad_group), supportedBy, managedBy, serviceOffering, isActive
- **Side-by-side JSON Editor**: Edit organization details and JSON configuration simultaneously
- **Authorization Scheme Logic**: 
  - Functional role: restricts inventory to appLob
  - AD Group: select inventory restrictions based on AD Group environment

### Servers Management
- **Fields**: hostName, domain, appLob, wfguid, appid, app_supported_by, app_managed_by, tso_managed_by, tso_supported_by, device_managed_by, device_supported_by, isActive, orgId
- **Organization Mapping**: Each server is linked to an organization

### Commands Management
- **Fields**: orgId, commandId, commandLabel, description, isActive
- **Organization Mapping**: Each command is linked to an organization

### Dashboard Features
- **Overview Cards**: Display statistics for organizations, servers, and commands
- **Search & Filter**: Advanced filtering and search capabilities for all grids
- **Pagination**: Built-in pagination for all list views
- **Navigation**: Previous/Next navigation when viewing individual records
- **No Popups**: All add/edit forms open on new pages (no modals)
- **Export**: Export functionality for all data grids

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   └── Dashboard.js          # Main dashboard component
├── resources/
│   ├── organizations.js      # Organization CRUD components
│   ├── servers.js           # Server CRUD components
│   └── commands.js          # Command CRUD components
├── dataProvider.js          # Mock data and data provider
├── App.js                   # Main app component
└── index.js                 # Entry point
```

## Mock Data

The application includes comprehensive mock data for:
- 3 Organizations with different authorization schemes
- 5 Servers mapped to organizations
- 6 Commands mapped to organizations

## Key Features

### Side-by-Side JSON Editor
- Organizations can be edited with a form on the left and JSON configuration on the right
- JSON can be directly edited and will be saved with the organization data

### Navigation Between Records
- When viewing individual records, users can navigate to previous/next records
- Navigation buttons are disabled when at the beginning/end of the list

### Advanced Filtering
- Search functionality across all fields
- Filter by organization, status, authorization scheme, etc.
- Export capabilities for all data grids

### Responsive Design
- Built with Material-UI for consistent, responsive design
- Works on desktop and mobile devices

## Technology Stack

- **React Admin**: Admin interface framework
- **Material-UI**: UI component library
- **React Router**: Navigation
- **Mock Data**: In-memory data provider for demonstration

## Usage

1. **Dashboard**: View overview statistics and navigate to different sections
2. **Organizations**: Manage organization details with JSON configuration
3. **Servers**: Manage server information and support details
4. **Commands**: Manage command definitions and organization mapping

All forms open on new pages (no popups) and include comprehensive validation and error handling. 