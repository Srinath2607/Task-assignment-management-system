# Quick Start Commands

## 🚀 First Time Setup

### 1. Install MongoDB
Download and install MongoDB Community Edition:
https://www.mongodb.com/try/download/community

OR use MongoDB Atlas (cloud):
https://www.mongodb.com/cloud/atlas

### 2. Install Dependencies

```powershell
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## ▶️ Running the Application

### Option 1: Automated Start (Recommended)
```powershell
cd task-management-system
.\start.ps1
```

### Option 2: Manual Start

**Terminal 1 - MongoDB** (if running locally)
```powershell
mongod
```

**Terminal 2 - Backend**
```powershell
cd backend
npm run dev
```

**Terminal 3 - Frontend**
```powershell
cd frontend
npm run dev
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 👥 Test the Application

### 1. Create Manager Account
1. Go to http://localhost:5173/register
2. Fill in:
   - Name: Test Manager
   - Email: manager@test.com
   - Password: password123
   - Role: MANAGER
3. Click "Create Account"

### 2. Create Member Account
1. Logout
2. Go to http://localhost:5173/register
3. Fill in:
   - Name: Test Member
   - Email: member@test.com
   - Password: password123
   - Role: MEMBER
4. Click "Create Account"

### 3. Test Manager Features
1. Login as manager@test.com
2. Click "Create Task"
3. Fill in task details
4. Assign to Test Member
5. View all tasks

### 4. Test Member Features
1. Logout and login as member@test.com
2. View assigned tasks
3. Update task status
4. See task details

### 5. Test Business Rule
1. Login as manager
2. Create task with deadline earlier than today
3. Try to assign it
4. Verify error message appears

## 🛠️ Development Commands

### Backend
```powershell
cd backend

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Frontend
```powershell
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Troubleshooting

### MongoDB Not Running
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB with `mongod` command

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change PORT in `backend/.env` or kill the process using port 5000

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: Ensure backend is running on http://localhost:5000

### JWT Token Invalid
```
Error: Invalid or expired token
```
**Solution**: Logout and login again to get a new token

## 📊 Database Management

### View Database (MongoDB Compass)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: mongodb://localhost:27017
3. Select database: task-management
4. View collections: users, tasks

### Reset Database
```powershell
# Connect to MongoDB shell
mongosh

# Switch to database
use task-management

# Drop all data
db.users.deleteMany({})
db.tasks.deleteMany({})
```

## 🧪 API Testing

### Using cURL

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"password123\",\"role\":\"MANAGER\"}"
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"password123\"}"
```

**Get Tasks** (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/tasks -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Import collection from API_REFERENCE.md
2. Set environment variable: baseUrl = http://localhost:5000/api
3. Login to get token
4. Set token in Authorization header
5. Test all endpoints

## 📝 Environment Variables

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB Atlas**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
```

## 🎯 Quick Feature Test Checklist

- [ ] Register as MANAGER
- [ ] Register as MEMBER
- [ ] Login as MANAGER
- [ ] Create a task
- [ ] Assign task to MEMBER
- [ ] Logout
- [ ] Login as MEMBER
- [ ] View assigned task
- [ ] Update task status to IN_PROGRESS
- [ ] Update task status to COMPLETED
- [ ] Logout
- [ ] Login as MANAGER
- [ ] View updated task status
- [ ] Try to create task with past deadline
- [ ] Verify error message

## 📚 Documentation Files

- `README.md` - Complete project documentation
- `STARTUP.md` - Startup guide
- `API_REFERENCE.md` - API endpoint documentation
- `PROJECT_SUMMARY.md` - Project completion summary
- `CHECKLIST.md` - Feature completion checklist
- `QUICK_START.md` - This file

## 🆘 Need Help?

1. Check the error message in terminal
2. Check browser console (F12)
3. Verify MongoDB is running
4. Verify all dependencies are installed
5. Check environment variables
6. Review API_REFERENCE.md for endpoint details

## ✅ Success Indicators

Application is working correctly when:
- ✅ Backend shows "Server running on port 5000"
- ✅ Backend shows "MongoDB Connected"
- ✅ Frontend opens at http://localhost:5173
- ✅ No errors in browser console
- ✅ Can register and login
- ✅ Can create and view tasks
- ✅ Can update task status

---

**Happy Task Managing! 🎉**
