# 🚀 TaskFlow - Professional Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) task management application with role-based access control, drag-and-drop Kanban board, real-time analytics, and a beautiful dark/light theme.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Theme** - Toggle between beautiful dark and light modes
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Micro-Interactions** - Smooth animations and hover effects
- **Loading States** - Skeleton loaders for better perceived performance
- **Toast Notifications** - Beautiful gradient notifications for user feedback

### 📊 **Task Management**
- **Kanban Board** - Drag-and-drop interface for visual task management
- **Grid View** - Traditional card-based task view
- **Priority System** - Color-coded priorities (Critical, High, Medium, Low)
- **Status Tracking** - Pending, In Progress, Completed
- **Task Assignment** - Assign tasks to team members
- **Deadline Management** - Track due dates and overdue tasks

### 📈 **Analytics & Visualization**
- **Real-time Metrics** - Total tasks, in progress, completed, overdue
- **Interactive Charts** - Donut chart for task distribution
- **Team Performance** - Bar chart showing team member productivity
- **Gradient Cards** - Beautiful analytics cards with hover effects

### 👥 **Role-Based Access Control**
- **Manager Role** - Create tasks, assign to members, view team analytics
- **Member Role** - View assigned tasks, update status, personal analytics
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Role-based route protection

### ⚡ **Performance & Accessibility**
- **Mobile-First** - Optimized for mobile devices
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Reduced Motion** - Respects user motion preferences
- **High Contrast** - Supports high contrast mode
- **Print Styles** - Optimized for printing

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **@hello-pangea/dnd** - Drag-and-drop functionality
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Vite** - Build tool

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

---

## 📦 Installation

### **Prerequisites**
- Node.js >= 14.0.0
- MongoDB (local or Atlas)
- npm or yarn

### **1. Clone the Repository**
```bash
git clone https://github.com/Srinath2607/Task-assignment-management-system.git
cd Task-assignment-management-system
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
```

### **4. Run the Application**

**Backend (Terminal 1):**
```bash
cd backend
npm start
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api

---

## 🎯 Usage

### **1. Register an Account**
- Navigate to http://localhost:5173
- Click "Register"
- Fill in your details
- Select role: **MANAGER** (to create tasks) or **MEMBER** (to view assigned tasks)

### **2. Login**
- Enter your email and password
- Click "Login"

### **3. Manager Dashboard**
- **Create Tasks**: Click "+ Create Task" button
- **Assign Tasks**: Select team member from dropdown
- **View Analytics**: See metrics and charts
- **Kanban Board**: Click Kanban icon to switch views
- **Drag Tasks**: Drag tasks between columns to update status

### **4. Member Dashboard**
- **View Tasks**: See all assigned tasks
- **Update Status**: Change task status via dropdown or Kanban
- **Personal Analytics**: View your task statistics
- **Kanban Board**: Drag your tasks to update status

### **5. Theme Toggle**
- Click sun/moon icon in navbar
- Toggle between dark and light modes

---

## 📁 Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsCard.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── KanbanColumn.jsx
│   │   │   ├── KanbanCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── SkeletonLoaders.jsx
│   │   │   ├── TaskDistributionChart.jsx
│   │   │   ├── TeamPerformanceChart.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   └── MemberDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx
│   │   ├── index.css             # Global styles
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── DEPLOYMENT.md                 # Deployment guide
├── USER_GUIDE.md                 # User manual
├── TESTING_CHECKLIST.md          # Testing checklist
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### **Authentication**
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
```

### **Tasks**
```
GET    /api/tasks            # Get all tasks (role-based)
GET    /api/tasks/:id        # Get single task
POST   /api/tasks            # Create task (Manager only)
PUT    /api/tasks/:id/status # Update task status
PUT    /api/tasks/:id/assign # Assign task (Manager only)
GET    /api/tasks/members/list # Get all members
```

### **Health Check**
```
GET    /api/health           # API health status
```

---

## 🎨 Design System

### **Colors**
- **Primary**: #6366f1 (Indigo)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)

### **Priority Colors**
- **Critical**: #ef4444 (Red)
- **High**: #f97316 (Orange)
- **Medium**: #eab308 (Yellow)
- **Low**: #22c55e (Green)

### **Typography**
- **Headings**: Poppins
- **Body**: Inter

### **Spacing Scale**
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

---

## 📱 Responsive Breakpoints

- **Small Mobile**: < 480px
- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

---

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] User registration works
- [ ] User login works
- [ ] Manager can create tasks
- [ ] Manager can assign tasks
- [ ] Member can view assigned tasks
- [ ] Task status updates work
- [ ] Kanban drag-and-drop works
- [ ] Charts display correctly
- [ ] Theme toggle works
- [ ] Mobile responsive works
- [ ] Toast notifications appear
- [ ] Loading states show

### **Browser Testing**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### **Device Testing**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🚀 Deployment

### **Backend Deployment (Render/Railway)**
1. Create account on Render or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy backend service

### **Frontend Deployment (Vercel/Netlify)**
1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### **Environment Variables**
Make sure to set these in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `NODE_ENV=production`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Srinath**
- GitHub: [@Srinath2607](https://github.com/Srinath2607)
- Project: [Task Assignment Management System](https://github.com/Srinath2607/Task-assignment-management-system)

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database
- Recharts for beautiful charts
- @hello-pangea/dnd for drag-and-drop
- All open-source contributors

---

## 📧 Support

For support, email your@email.com or open an issue on GitHub.

---

## 🎉 Features Showcase

### **Dark Mode**
![Dark Mode](screenshots/dark-mode.png)

### **Light Mode**
![Light Mode](screenshots/light-mode.png)

### **Kanban Board**
![Kanban Board](screenshots/kanban-board.png)

### **Analytics Dashboard**
![Analytics](screenshots/analytics.png)

### **Mobile Responsive**
![Mobile](screenshots/mobile.png)

---

**Built with ❤️ using MERN Stack**
