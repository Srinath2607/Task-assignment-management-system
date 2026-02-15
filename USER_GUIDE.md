# 📖 User Guide - TaskFlow

Complete guide for using the Task Management System.

---

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Manager Guide](#manager-guide)
3. [Member Guide](#member-guide)
4. [Features Guide](#features-guide)
5. [Tips & Tricks](#tips--tricks)
6. [FAQ](#faq)

---

## 🚀 Getting Started

### **First Time Setup**

#### **1. Register an Account**
1. Open the application in your browser
2. Click "**Register**" link
3. Fill in the registration form:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Password**: Secure password (min 6 characters)
   - **Role**: Select your role
     - **MANAGER**: Can create and assign tasks
     - **MEMBER**: Can view and update assigned tasks
4. Click "**Register**" button
5. You'll be automatically logged in!

#### **2. Login**
1. Enter your **email** and **password**
2. Click "**Login**" button
3. You'll be redirected to your dashboard

#### **3. Explore the Dashboard**
- **Manager Dashboard**: Create tasks, assign to team, view analytics
- **Member Dashboard**: View assigned tasks, update status, personal metrics

---

## 👨‍💼 Manager Guide

### **Creating Tasks**

#### **Step 1: Open Create Task Modal**
1. Click the "**+ Create Task**" button (top right)
2. A modal will appear

#### **Step 2: Fill Task Details**
- **Title**: Short, descriptive task name
  - Example: "Design Homepage Mockup"
- **Description**: Detailed task description
  - Example: "Create high-fidelity mockups for the new homepage design"
- **Start Date**: When the task begins
  - Click the date picker
  - Select today or future date
- **Deadline**: When the task is due
  - Must be after start date
  - System will warn if deadline is before start date
- **Priority**: Task importance
  - **CRITICAL** 🔴: Urgent, high-impact tasks
  - **HIGH** 🟠: Important tasks
  - **MEDIUM** 🟡: Standard tasks
  - **LOW** 🟢: Nice-to-have tasks
- **Assign To**: Team member (optional)
  - Select from dropdown
  - Leave empty for unassigned tasks

#### **Step 3: Create Task**
1. Click "**Create**" button
2. See success toast notification
3. Task appears in your dashboard

### **Managing Tasks**

#### **Assigning Tasks**
1. Find the task card
2. Click "**Assign**" dropdown
3. Select team member
4. Task is automatically assigned

#### **Updating Task Status**
**Method 1: Dropdown**
1. Find the task card
2. Click status dropdown
3. Select new status:
   - **PENDING**: Not started
   - **IN_PROGRESS**: Currently working
   - **COMPLETED**: Finished
4. Status updates automatically

**Method 2: Kanban Board**
1. Click **Kanban icon** (📋) at top right
2. Drag task to desired column
3. Drop to update status
4. See success toast

### **Viewing Analytics**

#### **Metrics Cards**
At the top of your dashboard, you'll see 4 gradient cards:
1. **Total Tasks**: All tasks in the system
2. **Pending**: Tasks not started
3. **In Progress**: Tasks being worked on
4. **Completed**: Finished tasks

#### **Charts**
1. **Task Distribution (Donut Chart)**:
   - Shows tasks by status
   - Hover for details
   - Color-coded by status

2. **Team Performance (Bar Chart)**:
   - Shows tasks per team member
   - Hover for exact numbers
   - Compare team productivity

### **View Modes**

#### **Grid View** (Default)
- Analytics cards at top
- Charts in middle
- Task cards in grid layout
- Click **Grid icon** (📊) to switch

#### **Kanban View**
- Three columns: Pending, In Progress, Completed
- Drag-and-drop to update status
- Visual workflow management
- Click **Kanban icon** (📋) to switch

---

## 👤 Member Guide

### **Viewing Your Tasks**

#### **Dashboard Overview**
Your dashboard shows:
- **Analytics Cards**: Your task statistics
- **Task Distribution Chart**: Your tasks by status
- **Task Grid/Kanban**: All your assigned tasks

#### **Task Information**
Each task card shows:
- **Title**: Task name
- **Description**: Task details
- **Priority Badge**: Color-coded priority
- **Status**: Current status
- **Deadline**: Due date
- **Overdue Warning**: If past deadline

### **Updating Task Status**

#### **Method 1: Dropdown**
1. Find your task
2. Click status dropdown
3. Select new status:
   - **PENDING** → **IN_PROGRESS**: Start working
   - **IN_PROGRESS** → **COMPLETED**: Finish task
   - **IN_PROGRESS** → **PENDING**: Pause work
4. See success toast

#### **Method 2: Kanban Board**
1. Click **Kanban icon** (📋)
2. See your tasks in columns
3. Drag task to new column
4. Drop to update status
5. See success toast

### **Managing Your Work**

#### **Prioritizing Tasks**
1. Look at priority badges:
   - 🔴 **CRITICAL**: Do first!
   - 🟠 **HIGH**: Do soon
   - 🟡 **MEDIUM**: Normal priority
   - 🟢 **LOW**: Do when possible

2. Check deadlines:
   - **Red border**: Overdue!
   - **Yellow "X days left"**: Urgent (≤3 days)
   - **Normal**: On track

#### **Tracking Progress**
1. View analytics cards:
   - See total assigned tasks
   - Check how many completed
   - Monitor in-progress tasks

2. Use Kanban board:
   - Visual progress tracking
   - Easy status updates
   - Clear workflow

---

## ✨ Features Guide

### **Theme Toggle**

#### **Switching Themes**
1. Look at navbar (top)
2. Find sun/moon icon
3. Click to toggle
4. **Light Mode** ☀️: Bright, clean interface
5. **Dark Mode** 🌙: Easy on eyes, modern look

#### **Theme Persistence**
- Your theme choice is saved
- Persists across sessions
- Automatic on login

### **Kanban Board**

#### **Using Kanban**
1. Click **Kanban icon** (📋)
2. See three columns:
   - **Pending**: Tasks to start
   - **In Progress**: Active tasks
   - **Completed**: Finished tasks

3. **Drag & Drop**:
   - Click and hold task card
   - Drag to desired column
   - Release to drop
   - Status updates automatically

4. **Visual Indicators**:
   - Column colors (yellow, blue, green)
   - Task count in each column
   - Empty state when no tasks

### **Priority System**

#### **Understanding Priorities**
- **CRITICAL** 🔴:
  - Urgent, high-impact
  - Do immediately
  - Red badge

- **HIGH** 🟠:
  - Important tasks
  - Do soon
  - Orange badge

- **MEDIUM** 🟡:
  - Standard priority
  - Normal timeline
  - Yellow badge

- **LOW** 🟢:
  - Nice-to-have
  - Do when possible
  - Green badge

### **Notifications**

#### **Toast Notifications**
Beautiful gradient notifications appear for:
- ✅ **Success** (Green): Task created, status updated
- ❌ **Error** (Red): Failed operations
- ℹ️ **Info** (Blue): General information

#### **Notification Behavior**
- Auto-dismiss after 3 seconds
- Click X to dismiss manually
- Slide in from top-right
- Stack if multiple

### **Loading States**

#### **Skeleton Loaders**
When loading data, you'll see:
- Animated skeleton cards
- Shimmer effect
- Realistic placeholders
- Smooth fade-in when loaded

#### **Why Skeletons?**
- Better perceived performance
- No blank screens
- Clear loading indication
- Professional feel

---

## 💡 Tips & Tricks

### **Productivity Tips**

1. **Use Kanban for Visual Management**
   - Drag tasks as you work
   - See progress at a glance
   - Quick status updates

2. **Prioritize Effectively**
   - Start with CRITICAL tasks
   - Check deadlines daily
   - Update status regularly

3. **Leverage Analytics**
   - Monitor your progress
   - Track completion rate
   - Identify bottlenecks

4. **Use Dark Mode**
   - Easier on eyes
   - Better for long sessions
   - Modern, professional

### **Keyboard Shortcuts**

- **Tab**: Navigate between fields
- **Enter**: Submit forms
- **Esc**: Close modals
- **Ctrl+Shift+R**: Hard refresh

### **Mobile Usage**

#### **Mobile Optimizations**
- Responsive design
- Touch-friendly buttons (44px)
- Single-column layout
- Easy navigation

#### **Mobile Tips**
1. Use Kanban for quick updates
2. Swipe to scroll columns
3. Tap to select dropdowns
4. Pinch to zoom charts

### **Best Practices**

1. **Task Creation**:
   - Use clear, descriptive titles
   - Add detailed descriptions
   - Set realistic deadlines
   - Assign appropriate priority

2. **Task Management**:
   - Update status regularly
   - Communicate delays
   - Mark completed tasks promptly
   - Review overdue tasks

3. **Team Collaboration**:
   - Check team performance
   - Balance workload
   - Assign tasks fairly
   - Monitor progress

---

## ❓ FAQ

### **General Questions**

**Q: Can I change my role after registration?**
A: No, roles are set during registration. Contact admin to change roles.

**Q: Can I delete tasks?**
A: Currently, tasks cannot be deleted. You can mark them as completed.

**Q: How many tasks can I create?**
A: No limit! Create as many tasks as you need.

**Q: Can I assign multiple people to one task?**
A: Currently, one task = one assignee. Create separate tasks for multiple people.

### **Manager Questions**

**Q: Can I see all team members' tasks?**
A: Yes! Managers see all tasks in the system.

**Q: Can I reassign tasks?**
A: Yes, use the "Assign" dropdown to change assignee.

**Q: Can I edit task details after creation?**
A: Currently, you can only update status and assignment. Title/description are fixed.

**Q: How do I unassign a task?**
A: Currently not supported. Assign to a different member instead.

### **Member Questions**

**Q: Can I see other members' tasks?**
A: No, members only see their assigned tasks.

**Q: Can I create tasks?**
A: No, only managers can create tasks.

**Q: What if I can't complete a task on time?**
A: Update status to PENDING and communicate with your manager.

**Q: Can I change task priority?**
A: No, only managers can set priority.

### **Technical Questions**

**Q: Which browsers are supported?**
A: Chrome, Firefox, Safari, Edge (latest versions).

**Q: Does it work offline?**
A: No, requires internet connection.

**Q: Is my data secure?**
A: Yes! JWT authentication, encrypted passwords, secure HTTPS.

**Q: Can I export my tasks?**
A: Not currently. Feature coming soon!

### **Troubleshooting**

**Q: Login not working?**
A: 
1. Check email/password
2. Ensure caps lock is off
3. Try password reset
4. Clear browser cache

**Q: Tasks not loading?**
A:
1. Refresh the page
2. Check internet connection
3. Clear browser cache
4. Try different browser

**Q: Kanban drag not working?**
A:
1. Ensure you're clicking the card
2. Try refreshing page
3. Check if using supported browser
4. Disable browser extensions

**Q: Theme not saving?**
A:
1. Check browser allows localStorage
2. Don't use incognito mode
3. Clear cache and try again

---

## 📞 Support

Need help?
- **Email**: support@taskflow.com
- **GitHub**: Open an issue
- **Documentation**: Check README.md

---

## 🎉 Enjoy TaskFlow!

You're all set! Start managing your tasks efficiently with TaskFlow.

**Happy task managing!** 🚀
