# Task Management System - Startup Guide

## Quick Start

### Option 1: Manual Start (Recommended for Development)

#### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

#### Terminal 3 - MongoDB (if running locally)
```powershell
mongod
```

### Option 2: Using the Start Script

Run the PowerShell script:
```powershell
.\start.ps1
```

## First Time Setup

1. **Install MongoDB**:
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Configure Backend**:
   - Check `backend/.env` file
   - Update `MONGODB_URI` if using Atlas or different local setup

3. **Install Dependencies** (if not already done):
   ```powershell
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

## Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Test Accounts

Create test accounts through the registration page:

**Manager Account**:
- Name: John Manager
- Email: manager@test.com
- Password: password123
- Role: MANAGER

**Member Account**:
- Name: Jane Member
- Email: member@test.com
- Password: password123
- Role: MEMBER

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- For Atlas, ensure IP is whitelisted

### Port Already in Use
- Backend (5000): Change PORT in backend/.env
- Frontend (5173): Vite will automatically use next available port

### CORS Errors
- Ensure backend is running on port 5000
- Check frontend API_URL in src/services/api.js

## Development Tips

- Backend auto-reloads with nodemon
- Frontend hot-reloads with Vite
- Check browser console for errors
- Check terminal for backend errors
- Use MongoDB Compass to view database
