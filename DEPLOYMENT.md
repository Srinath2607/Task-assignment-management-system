# 🚀 Deployment Guide - TaskFlow

Complete guide to deploying your Task Management System to production.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:
- [x] GitHub account
- [x] MongoDB Atlas account (free tier available)
- [x] Render/Railway account (for backend)
- [x] Vercel/Netlify account (for frontend)
- [x] All code committed to GitHub

---

## 🗄️ Database Setup (MongoDB Atlas)

### **Step 1: Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free M0 tier)

### **Step 2: Configure Database**
1. **Create Database User:**
   - Go to Database Access
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `taskflow-admin`
   - Password: Generate secure password
   - User Privileges: "Atlas admin"
   - Click "Add User"

2. **Whitelist IP Addresses:**
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Get Connection String:**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Save this for later!

**Example Connection String:**
```
mongodb+srv://taskflow-admin:<password>@cluster0.xxxxx.mongodb.net/taskflow?retryWrites=true&w=majority
```

---

## 🔧 Backend Deployment (Render)

### **Step 1: Prepare Backend**

1. **Create `render.yaml` in project root:**
```yaml
services:
  - type: web
    name: taskflow-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5001
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRE
        value: 7d
```

2. **Update `backend/package.json`:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### **Step 2: Deploy to Render**

1. **Go to [Render](https://render.com)**
2. **Sign up / Login**
3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

4. **Configure Service:**
   - **Name**: `taskflow-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=5001
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key_change_this
     JWT_EXPIRE=7d
     ```

6. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://taskflow-backend.onrender.com`

---

## 🎨 Frontend Deployment (Vercel)

### **Step 1: Prepare Frontend**

1. **Update API URL in `frontend/src/services/api.js`:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

2. **Create `.env.production` in frontend directory:**
```env
VITE_API_URL=https://taskflow-backend.onrender.com/api
```

3. **Update `frontend/vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### **Step 2: Deploy to Vercel**

1. **Go to [Vercel](https://vercel.com)**
2. **Sign up / Login with GitHub**
3. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository

4. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://taskflow-backend.onrender.com/api
     ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your app will be live at: `https://taskflow.vercel.app`

---

## 🔐 Environment Variables Reference

### **Backend (.env)**
```env
# Server
NODE_ENV=production
PORT=5001

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/taskflow

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
```

### **Frontend (.env.production)**
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## ✅ Post-Deployment Checklist

### **1. Test Backend API**
```bash
# Health check
curl https://taskflow-backend.onrender.com/api/health

# Expected response:
{
  "success": true,
  "message": "Task Management API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### **2. Test Frontend**
- [ ] Visit your Vercel URL
- [ ] Register a new account
- [ ] Login successfully
- [ ] Create a task
- [ ] View analytics
- [ ] Test Kanban board
- [ ] Toggle theme
- [ ] Test on mobile

### **3. Configure CORS**
Make sure your backend allows your frontend domain:

**backend/server.js:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://taskflow.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### **4. Set Up Custom Domain (Optional)**

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

**Render:**
1. Go to Settings → Custom Domains
2. Add your custom domain
3. Update DNS records

---

## 🐛 Troubleshooting

### **Backend Issues**

**Problem: "Cannot connect to MongoDB"**
```
Solution:
1. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Verify connection string is correct
3. Ensure password doesn't have special characters
4. Check database user has correct permissions
```

**Problem: "Port already in use"**
```
Solution:
1. Render automatically assigns port
2. Use process.env.PORT in server.js
3. Don't hardcode port number
```

**Problem: "JWT errors"**
```
Solution:
1. Ensure JWT_SECRET is set in environment variables
2. JWT_SECRET should be at least 32 characters
3. Check JWT_EXPIRE format (e.g., "7d", "24h")
```

### **Frontend Issues**

**Problem: "API calls failing"**
```
Solution:
1. Check VITE_API_URL is set correctly
2. Verify backend is running
3. Check CORS configuration
4. Inspect browser console for errors
```

**Problem: "Environment variables not working"**
```
Solution:
1. Prefix with VITE_ (e.g., VITE_API_URL)
2. Restart dev server after adding .env
3. Rebuild for production
4. Check Vercel environment variables
```

**Problem: "Build fails"**
```
Solution:
1. Check all dependencies are in package.json
2. Run npm install locally
3. Fix any TypeScript/ESLint errors
4. Check build logs for specific errors
```

### **Database Issues**

**Problem: "Slow queries"**
```
Solution:
1. Add indexes to frequently queried fields
2. Use MongoDB Atlas Performance Advisor
3. Optimize query patterns
4. Consider upgrading cluster tier
```

**Problem: "Connection timeout"**
```
Solution:
1. Check network access settings
2. Verify connection string
3. Increase connection timeout in Mongoose
4. Check MongoDB Atlas status
```

---

## 📊 Monitoring & Maintenance

### **Backend Monitoring (Render)**
- View logs: Dashboard → Logs
- Monitor metrics: Dashboard → Metrics
- Set up alerts: Settings → Notifications

### **Frontend Monitoring (Vercel)**
- View deployments: Dashboard → Deployments
- Check analytics: Analytics tab
- Monitor errors: Integrations → Error tracking

### **Database Monitoring (MongoDB Atlas)**
- View metrics: Metrics tab
- Set up alerts: Alerts tab
- Monitor performance: Performance Advisor

---

## 🔄 Continuous Deployment

### **Automatic Deployments**

**Render:**
- Automatically deploys on push to main branch
- Can configure deploy hooks
- Manual deploy option available

**Vercel:**
- Automatically deploys on push to main branch
- Preview deployments for PRs
- Instant rollback available

### **Deployment Workflow**
```bash
# 1. Make changes locally
git add .
git commit -m "feat: add new feature"

# 2. Push to GitHub
git push origin main

# 3. Automatic deployment triggers
# - Render builds backend
# - Vercel builds frontend

# 4. Verify deployment
# - Check deployment logs
# - Test production site
```

---

## 🎯 Performance Optimization

### **Backend**
- [ ] Enable compression
- [ ] Add rate limiting
- [ ] Implement caching
- [ ] Optimize database queries
- [ ] Use connection pooling

### **Frontend**
- [ ] Enable code splitting
- [ ] Optimize images
- [ ] Lazy load components
- [ ] Enable gzip compression
- [ ] Use CDN for static assets

### **Database**
- [ ] Add appropriate indexes
- [ ] Use projection to limit fields
- [ ] Implement pagination
- [ ] Regular backups
- [ ] Monitor slow queries

---

## 🔒 Security Checklist

- [ ] Use HTTPS only
- [ ] Set secure HTTP headers
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Keep dependencies updated
- [ ] Use strong JWT secrets
- [ ] Hash passwords with bcrypt
- [ ] Implement CSRF protection

---

## 📝 Deployment Costs

### **Free Tier Limits**

**MongoDB Atlas (Free M0):**
- 512 MB storage
- Shared RAM
- Shared vCPU
- Perfect for development/small projects

**Render (Free):**
- 750 hours/month
- Spins down after 15 min inactivity
- 512 MB RAM
- Good for hobby projects

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Perfect for frontend

**Total Cost: $0/month** for hobby projects!

---

## 🚀 Going to Production

When ready for production:

1. **Upgrade MongoDB Atlas** to M2+ for better performance
2. **Upgrade Render** to paid plan for always-on service
3. **Add custom domain** for professional look
4. **Set up monitoring** and error tracking
5. **Implement backups** for database
6. **Add SSL certificate** (automatic with Vercel/Render)
7. **Set up CI/CD** pipeline
8. **Add analytics** (Google Analytics, etc.)

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Review this guide
3. Check service status pages
4. Contact support:
   - Render: https://render.com/support
   - Vercel: https://vercel.com/support
   - MongoDB: https://support.mongodb.com

---

**Your app is now live! 🎉**

**Backend**: https://taskflow-backend.onrender.com  
**Frontend**: https://taskflow.vercel.app  

**Happy deploying!** 🚀
