# 🚀 Quick Start Commands

## Running the Entire Project

You have **multiple options** to run the Task Management System:

---

### ⚡ **Option 1: PowerShell Script (Recommended)**

Open PowerShell in the project root directory and run:

```powershell
.\run.ps1
```

**OR**

```powershell
.\start.ps1
```

---

### 🖱️ **Option 2: Double-Click (Easiest)**

Simply **double-click** the `run.bat` file in the project folder.

This will automatically start both servers!

---

### 💻 **Option 3: Command Prompt**

Open Command Prompt in the project root and run:

```cmd
run.bat
```

---

### 🔧 **Option 4: Manual Start (For Debugging)**

If you need more control, open **two separate terminals**:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## 📍 What Happens When You Run

1. ✅ Backend server starts on **http://localhost:5001**
2. ✅ Frontend server starts on **http://localhost:5173**
3. ✅ MongoDB Atlas connection is established
4. ✅ Two PowerShell windows open (one for each server)

---

## 🌐 Accessing the Application

Once the servers are running:

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/api/health

---

## 🛑 Stopping the Application

To stop the servers:

1. Go to each PowerShell window (Backend and Frontend)
2. Press `Ctrl+C`
3. Close the windows

---

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `.\run.ps1` | Start both servers (PowerShell) |
| `.\start.ps1` | Alternative start script |
| `run.bat` | Start both servers (Batch file) |
| Double-click `run.bat` | Start without opening terminal |

---

## 🔥 Pro Tips

1. **First Time Setup**: Make sure you've run `npm install` in both `backend` and `frontend` directories
2. **Port Conflicts**: If ports 5001 or 5173 are in use, change them in:
   - Backend: `backend/.env` (PORT variable)
   - Frontend: `frontend/vite.config.js`
3. **Auto-Reload**: Both servers support hot reload - changes are reflected automatically!

---

## ⚠️ Troubleshooting

**"Cannot run scripts" error?**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Servers not starting?**
- Check if ports 5001 and 5173 are available
- Verify MongoDB connection in `backend/.env`
- Check for errors in the server windows

**Need to reinstall dependencies?**
```powershell
cd backend
npm install
cd ../frontend
npm install
```

---

## 🎯 Summary

**Simplest way to run the project:**

```powershell
.\run.ps1
```

**Or just double-click:** `run.bat`

That's it! Your Task Management System will be up and running! 🚀
