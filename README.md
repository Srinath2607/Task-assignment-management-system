# Task Assignment Management System

A full-stack MERN application for managing task assignments with role-based access control.

## Features

### Authentication & Authorization
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Role-based access control (MANAGER & MEMBER)
- ✅ Protected API routes
- ✅ Secure password hashing

### Task Management
- ✅ Create tasks with start date and deadline
- ✅ Assign tasks to team members
- ✅ View all tasks (filtered by role)
- ✅ Update task status (PENDING, IN_PROGRESS, COMPLETED)
- ✅ Real-time database persistence

### Business Rules
- ✅ **Critical Rule**: Task deadline must not be earlier than assignment date
- ✅ Validation at both frontend and backend
- ✅ Proper error handling and user feedback

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React with Vite
- React Router for navigation
- Axios for API calls
- Modern CSS with animations and glassmorphism

## Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ManagerDashboard.jsx
    │   │   └── MemberDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected, filtered by role)
- `POST /api/tasks` - Create task (Protected, MANAGER only)
- `GET /api/tasks/:id` - Get single task (Protected)
- `PUT /api/tasks/:id/status` - Update task status (Protected)
- `PUT /api/tasks/:id/assign` - Assign task to member (Protected, MANAGER only)
- `GET /api/tasks/members/list` - Get all members (Protected, MANAGER only)

## User Roles

### MANAGER
- Register and login
- Create tasks with start date and deadline
- Assign tasks to members
- View all tasks and assignments
- See task status updates

### MEMBER
- Register and login
- View assigned tasks
- Update task progress (PENDING → IN_PROGRESS → COMPLETED)
- See task details and deadlines

## Business Rule Implementation

The critical business rule "**Task deadline must not be earlier than assignment date**" is enforced at multiple levels:

1. **Database Model** (Task.js):
   - Pre-save hook validates the rule
   - Prevents invalid data from being saved

2. **Backend Controller** (taskController.js):
   - Validation in `createTask` and `assignTask` functions
   - Returns error message if rule is violated

3. **Frontend**:
   - User-friendly error messages
   - Date pickers for easy validation

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- Environment variables for sensitive data
- CORS enabled for frontend-backend communication

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (MANAGER | MEMBER),
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  startDate: Date,
  deadline: Date,
  status: String (PENDING | IN_PROGRESS | COMPLETED),
  createdBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  assignedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Application

1. **Register Users**:
   - Create a MANAGER account
   - Create one or more MEMBER accounts

2. **Login as MANAGER**:
   - Create tasks
   - Assign tasks to members
   - View all tasks

3. **Login as MEMBER**:
   - View assigned tasks
   - Update task status
   - See task details

4. **Test Business Rule**:
   - Try creating a task with deadline earlier than today
   - Try assigning an old task (deadline before today)
   - Verify error messages appear

## Design Features

- Modern dark theme with gradient accents
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design for all devices
- Premium typography (Inter font)
- Interactive hover effects
- Loading states and error handling
- Empty states with helpful messages

## Future Enhancements

- Task editing and deletion
- Task comments and attachments
- Email notifications
- Task priority levels
- Advanced filtering and search
- Task analytics and reports
- Team management
- Calendar view

## License

MIT

## Author

Full Stack Development Project
