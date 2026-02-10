# 🚀 How to View Your Enhanced App

## ✅ Servers Status

### Frontend (Vite)
- **Status**: ✅ RUNNING
- **URL**: http://localhost:5173
- **Terminal**: Already running in background

### Backend (Node.js)
- **Status**: ✅ RUNNING  
- **URL**: http://localhost:5000
- **Terminal**: Just started

---

## 📱 **Step-by-Step: View Your Changes**

### **Step 1: Open Your Browser**

1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Go to: **http://localhost:5173**

### **Step 2: Login**

If you don't have an account yet, you'll need to create one:

#### **Option A: Register New Users**

1. Click **"Register here"** on the login page
2. Create a **Manager** account:
   - Name: Your Name
   - Email: manager@test.com
   - Password: password123
   - Role: **MANAGER**
3. Create a **Member** account (in a different browser/incognito):
   - Name: Member Name
   - Email: member@test.com
   - Password: password123
   - Role: **MEMBER**

#### **Option B: Use Existing Account**

If you already have accounts, just login with your credentials.

---

## 🎨 **What to Look For**

### **1. Theme Toggle (Session 1)**

**Location**: Top-right corner of navbar

**What to test**:
- ✅ Click the sun/moon icon
- ✅ Watch the entire app switch between light and dark mode
- ✅ Notice smooth color transitions
- ✅ Refresh page - theme should persist

**Expected Result**:
- 🌙 **Dark Mode**: Dark slate background, light text
- ☀️ **Light Mode**: White background, dark text

---

### **2. Priority System (Session 2)**

**Location**: Manager Dashboard

**What to test**:

#### **A. Create Task with Priority**
1. Click **"+ Create Task"** button
2. Fill in task details:
   - Title: "Test Priority Task"
   - Description: "Testing the new priority system"
   - Start Date: Today
   - Deadline: Tomorrow
   - **Priority**: Select **HIGH** or **CRITICAL**
   - Assign To: (Optional) Select a member
3. Click **"Create Task"**

#### **B. View Priority Badges**
- ✅ Look at the task card
- ✅ See the **priority badge** next to the title
- ✅ Check the color:
  - 🔴 **Critical** = Red
  - 🟠 **High** = Orange
  - 🟡 **Medium** = Yellow
  - 🟢 **Low** = Green

#### **C. Status Badges**
- ✅ Top-right corner shows **status badge**
- ✅ Colors:
  - 🟡 **Pending** = Yellow
  - 🔵 **In Progress** = Blue
  - 🟢 **Completed** = Green

---

### **3. Member Dashboard**

**What to test**:
1. Logout from Manager account
2. Login as **Member**
3. View assigned tasks
4. See **priority badges** on your tasks
5. Update task status using dropdown

---

## 🎯 **Quick Test Checklist**

### Theme System ✅
- [ ] Theme toggle button visible in navbar
- [ ] Click toggles between dark/light mode
- [ ] All colors change smoothly
- [ ] Theme persists after page refresh
- [ ] Both modes look good

### Priority System ✅
- [ ] Priority dropdown in create task form
- [ ] Can select: Low, Medium, High, Critical
- [ ] Priority badge shows on task card
- [ ] Correct color for each priority level
- [ ] Badge visible on both Manager and Member dashboards

### Status Badges ✅
- [ ] Status badge in top-right of task card
- [ ] Shows current status (Pending, In Progress, Completed)
- [ ] Correct colors for each status

### Overall UI ✅
- [ ] Clean, modern design
- [ ] Good spacing and layout
- [ ] Readable text
- [ ] Smooth animations
- [ ] Responsive (try resizing browser)

---

## 🐛 **Troubleshooting**

### **Problem: Page won't load**

**Solution**:
```bash
# Check if frontend is running
# Should see: Local: http://localhost:5173

# If not, run:
cd frontend
npm run dev
```

### **Problem: Can't create tasks**

**Solution**:
```bash
# Check if backend is running
# Should see: Server running on port 5000

# If not, run:
cd backend
npm start
```

### **Problem: Changes not showing**

**Solution**:
1. **Hard refresh**: Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Clear cache**: Open DevTools (F12) → Network tab → Check "Disable cache"
3. **Restart frontend**:
   ```bash
   # Stop: Ctrl + C
   # Start: npm run dev
   ```

### **Problem: Theme toggle not working**

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Verify ThemeContext is loaded
4. Try clearing localStorage:
   ```javascript
   // In browser console:
   localStorage.clear();
   location.reload();
   ```

### **Problem: Priority badges not showing**

**Solution**:
1. Check browser console for errors
2. Verify Badge component is imported
3. Create a new task with priority
4. Refresh the page

---

## 📸 **Screenshots to Compare**

### **Before (Original)**
- Basic dark theme only
- No priority system
- Simple status text
- Plain styling

### **After (Enhanced)**
- ✅ Dark/Light theme toggle
- ✅ Color-coded priority badges
- ✅ Modern status badges
- ✅ Premium design
- ✅ Smooth transitions
- ✅ Better typography (Inter & Poppins fonts)

---

## 🎨 **Visual Guide**

### **Navbar (Top)**
```
[TaskFlow]                    [🌙] [User Name] [MANAGER] [Logout]
                              ↑
                        Theme Toggle
```

### **Task Card**
```
┌─────────────────────────────────────┐
│                        [Pending] ← Status Badge
│  Task Title            [High] ← Priority Badge
│  Description text...
│
│  Start: Feb 10, 2026
│  Deadline: Feb 15, 2026
│  Assigned to: Member Name
└─────────────────────────────────────┘
```

---

## 🚀 **Next Steps After Testing**

Once you've verified everything works:

1. **Test thoroughly** - Try all features
2. **Take screenshots** - Document your progress
3. **Commit changes** - Save your work:
   ```bash
   git add .
   git commit -m "Sessions 1-2: Theme system and priority badges"
   ```
4. **Continue to Session 3** - Premium styling!

---

## 💡 **Pro Tips**

### **Browser DevTools**
- Press **F12** to open DevTools
- **Console tab**: See any errors
- **Network tab**: Monitor API calls
- **Elements tab**: Inspect CSS

### **Testing Both Themes**
- Keep clicking theme toggle
- Test all features in both modes
- Ensure everything is readable

### **Testing Priorities**
- Create tasks with all 4 priority levels
- See how they look together
- Verify colors are distinct

---

## 📱 **URLs Quick Reference**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Docs**: Check API_REFERENCE.md

---

**Enjoy exploring your enhanced Task Management System!** 🎉

If you see any issues, let me know and I'll help you fix them!
