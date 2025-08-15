# CodeBattle Setup Guide

## Quick Start

### Option 1: Use the provided scripts (Recommended)

**Windows:**
```powershell
# Run the PowerShell script
.\start-services.ps1

# Or use the batch file
.\start-full-stack.bat
```

**Linux/Mac:**
```bash
# Make the script executable first
chmod +x start-full-stack.sh

# Run the script
./start-full-stack.sh
```

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on: http://localhost:5111

3. **Start Frontend Server**
   ```bash
   npm start
   ```
   Frontend will run on: http://localhost:3111

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **Python** (for code execution)
- **GCC/G++** (for C++ compilation)
- **Java JDK** (for Java compilation)

## Environment Configuration

The application uses the following environment variables:
- `REACT_APP_BACKEND_URL`: Backend server URL (default: http://localhost:5111)

## Ports Used

- **Frontend**: 3111
- **Backend**: 5111

## Features

- ✅ Real-time code execution in multiple languages
- ✅ Competitive programming problems
- ✅ Live battles and leaderboards
- ✅ Firebase integration for user management
- ✅ Dark/Light theme support
- ✅ Responsive design

## Troubleshooting

### Backend Shows as Offline
1. Make sure the backend server is running on port 5111
2. Check if the environment variable `REACT_APP_BACKEND_URL` is set correctly
3. Restart the frontend to pick up new environment variables

### Code Execution Issues
1. Ensure Python, GCC/G++, and Java are installed and accessible
2. Check that the backend server is running
3. Verify the code execution service is responding at `/health` endpoint

### Port Already in Use
If ports 3111 or 5111 are already in use, you can:
1. Kill existing processes: `taskkill /f /im node.exe` (Windows)
2. Change ports in the configuration files
3. Use different ports by setting environment variables

## Development

### Project Structure
```
CodeBattle/
├── src/                    # Frontend React code
├── backend/               # Backend Node.js server
├── scripts/               # Setup and utility scripts
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

### Available Scripts
- `npm start` - Start frontend development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run setup-firebase` - Setup Firebase data

## Support

For issues and questions, please check the troubleshooting section above or create an issue in the repository.
