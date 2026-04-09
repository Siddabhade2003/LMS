# Netlify + Backend Deployment - Quick Reference

## TL;DR - Deploy in 3 Steps

### Step 1: Frontend to Netlify
```bash
# Push to Git
git add .
git commit -m "Configure for production deployment"
git push origin main

# Then on Netlify Dashboard:
1. New site from Git
2. Select repository
3. Base: lms-app
4. Build: npm run build
5. Publish: build
```

### Step 2: Backend to Heroku
```bash
cd backend/forms
heroku login
heroku create app-name
heroku addons:create cleardb:ignite
heroku config:set MAIL_USERNAME=your@email.com MAIL_PASSWORD="password"
git push heroku main
```

### Step 3: Connect Frontend to Backend
```
Netlify Dashboard → Environment Variables
Add: REACT_APP_API_BASE_URL = https://app-name.herokuapp.com
Redeploy frontend
```

---

## Configuration Summary

### Files That Need Updates (Already Done ✓)

**Frontend Components:**
- ✓ `Login.jsx` - Uses `process.env.REACT_APP_API_BASE_URL`
- ✓ `Register.jsx` - Uses `process.env.REACT_APP_API_BASE_URL`
- ✓ `CourseList.jsx` - Uses `process.env.REACT_APP_API_BASE_URL`
- ✓ `AddCourse.jsx` - Uses `process.env.REACT_APP_API_BASE_URL`

**Netlify Configuration:**
- ✓ `netlify.toml` - Build and deployment settings
- ✓ `.env` - Local development (localhost:8080)
- ✓ `.env.example` - Template for new developers

**Backend Configuration:**
- ✓ `CorsConfig.java` - Updated for production origins
- ✓ `application.properties` - Enhanced with environment variables
- ✓ `Procfile` - Heroku deployment configuration

---

## Environment Variables

### Before Deployment (You need these from your backend provider)

**Backend URL**: Get after deploying backend  
Example: `https://your-app.herokuapp.com`

### Netlify Dashboard Settings

```
Name: REACT_APP_API_BASE_URL
Value: https://your-backend-url.com
```

---

## Testing Checklist

### Local Testing (Before deploying)
- [ ] Frontend builds: `npm run build`
- [ ] Backend runs: `mvn spring-boot:run`
- [ ] API calls work: Login, Register, Course operations
- [ ] Images load correctly
- [ ] No console errors

### After Frontend Deployment
- [ ] Netlify URL loads without errors
- [ ] Page displays correctly
- [ ] Routes work (click around)
- [ ] Styling looks good

### After Backend Deployment
- [ ] Backend URL accessible
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Email service functional

### After Integration
- [ ] Frontend can reach backend API
- [ ] Login/Register works end-to-end
- [ ] Courses display correctly
- [ ] All CRUD operations work
- [ ] No CORS errors in browser console

---

## Deployment Platforms Options

| Platform | Frontend | Backend | Best For |
|----------|----------|---------|----------|
| Netlify | ✓ YES | ✗ NO | Frontend hosting |
| Heroku | ✓ YES | ✓ YES | Easy full-stack |
| Railway | ✓ YES | ✓ YES | Modern & fast |
| Vercel | ✓ YES | ✗ NO* | Frontend hosting |
| AWS | ✓ YES | ✓ YES | Scalability |

*Vercel has serverless functions but not ideal for Spring Boot

**Recommendation**: Netlify (Frontend) + Heroku (Backend)

---

## Common Issues & Fixes

### CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix**: 
1. Update `CorsConfig.java` with your Netlify domain
2. Redeploy backend

### 404 Frontend Routes
```
Cannot GET /courselist
```
**Fix**: Netlify already handles this with `netlify.toml` redirect rules ✓

### API Not Found
```
Failed to fetch from localhost:8080
```
**Fix**:
1. Check Netlify env var `REACT_APP_API_BASE_URL`
2. Ensure it points to actual backend URL
3. Redeploy frontend

### Database Connection Error
```
Connection refused to localhost:3306
```
**Fix**:
1. Set `DATABASE_URL` env var on backend platform
2. Format: `jdbc:mysql://host:port/database`
3. Redeploy backend

### Email Not Sending
```
Failed to authenticate
```
**Fix**:
1. Use Gmail app-specific password (not main password)
2. Enable "Less secure apps" if not using app password
3. Set `MAIL_USERNAME` and `MAIL_PASSWORD` env vars

---

## Credentials Note

### Don't Forget These
- **Netlify Site URL**: https://xxx.netlify.app
- **Backend URL**: https://xxx.herokuapp.com (or your provider)
- **Database**: MySQL URL from ClearDB/Railway
- **Gmail App Password**: Get from Gmail account settings

### Security Reminders
- 🔒 Never commit `.env` with real passwords
- 🔒 Use platform env vars for secrets
- 🔒 Change default database password
- 🔒 Use app-specific password for Gmail
- 🔒 Rotate credentials periodically

---

## Useful Commands

### Frontend
```bash
# Local testing
npm start              # http://localhost:3000

# Build for production
npm run build         # Creates ./build folder

# Push to deployment
git push origin main  # Triggers Netlify build
```

### Backend
```bash
# Local testing
mvn spring-boot:run   # http://localhost:8080

# Build JAR
mvn clean package     # Creates .jar file

# Push to Heroku
git push heroku main  # Triggers Heroku build
```

---

## After Going Live

### First Week
- Monitor logs daily
- Test key workflows
- Watch performance metrics
- Check for errors

### Ongoing
- Set up automated backups
- Monitor uptime
- Update dependencies monthly
- Review security regularly

### Performance Tips
- Enable caching (if available)
- Optimize database queries
- Compress images
- Use CDN for static assets

---

## Support Documentation

Full guides available in:
- `HOSTING-SETUP.md` - Overview and quick start
- `DEPLOYMENT.md` - Detailed frontend deployment
- `BACKEND-DEPLOYMENT.md` - Detailed backend deployment
- `DEPLOYMENT-CHECKLIST.md` - Complete pre-launch checklist

---

## Quick Links

**Platforms:**
- Netlify Dashboard: https://app.netlify.com
- Heroku Dashboard: https://dashboard.heroku.com
- Railway Dashboard: https://railway.app

**Helpful Articles:**
- Deploying React: https://create-react-app.dev/deployment/
- Deploying Spring Boot: https://spring.io/guides/gs/deploying-spring-boot-app-to-heroku/

**Your Credentials** (Save somewhere safe):
- Frontend URL: ___________________
- Backend URL: ___________________
- Database: ___________________
- Gmail App Password: ___________________

---

**Ready to deploy? Start with Step 1 above! 🚀**
