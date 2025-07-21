# Setup Instructions

## Prerequisites

This application requires Node.js and npm to be installed on your system.

### Installing Node.js

1. **Download Node.js**: Visit [https://nodejs.org/](https://nodejs.org/) and download the LTS version
2. **Install Node.js**: Run the installer and follow the installation wizard
3. **Verify Installation**: Open a new terminal/command prompt and run:
   ```bash
   node --version
   npm --version
   ```

## Running the Application

Once Node.js is installed:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## Alternative: Using Yarn

If you prefer using Yarn instead of npm:

1. **Install Yarn** (if not already installed):
   ```bash
   npm install -g yarn
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Start Development Server**:
   ```bash
   yarn start
   ```

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**: Node.js is not installed or not in PATH
   - Reinstall Node.js and ensure it's added to PATH during installation

2. **Port 3000 already in use**:
   - The application will automatically try the next available port
   - Or kill the process using port 3000

3. **Dependencies installation fails**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and package-lock.json
   - Run `npm install` again

## Features Overview

Once the application is running, you'll have access to:

- **Dashboard**: Overview with statistics
- **Organizations**: Manage organizations with side-by-side JSON editor
- **Servers**: Manage server information and support details
- **Commands**: Manage command definitions

All forms open on new pages (no popups) and include comprehensive search, filtering, and pagination. 