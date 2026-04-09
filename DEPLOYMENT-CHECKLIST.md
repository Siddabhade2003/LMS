# Deployment Checklist

Complete this checklist before deploying your LMS application to production.

## Frontend (React + Netlify)

### Code Preparation
- [ ] All hardcoded URLs replaced with `process.env.REACT_APP_API_BASE_URL`
- [ ] API endpoints updated in:
  - [ ] `Login.jsx`
  - [ ] `Register.jsx`
  - [ ] `CourseList.jsx`
  - [ ] `AddCourse.jsx`
- [ ] `.env` file created with local development URL
- [ ] `.env.example` file created for reference
- [ ] `.env` file added to `.gitignore` (verify)
- [ ] `netlify.toml` configuration file present
- [ ] `package.json` build scripts verified

### Build & Testing
- [ ] Local build successful: `npm run build`
- [ ] All dependencies installed: `npm install`
- [ ] No console errors or warnings
- [ ] Test authentication flow locally
- [ ] Test course operations (view, add, edit, delete)
- [ ] Responsive design tested on mobile/tablet

### Netlify Setup
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Build settings configured:
  - [ ] Base directory: `lms-app`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `build`
- [ ] Environment variables added in Netlify:
  - [ ] `REACT_APP_API_BASE_URL` = (backend URL, to be set after backend deployment)

### Pre-Deployment
- [ ] All changes committed to git
- [ ] No uncommitted changes
- [ ] Branch is main/master

---

## Backend (Spring Boot)

### Code Preparation
- [ ] CORS configuration updated in `CorsConfig.java`:
  - [ ] Local development origins allowed
  - [ ] Production origin added (placeholder for Netlify URL)
- [ ] `application.properties` configured for production:
  - [ ] Database URL set (or environment variable)
  - [ ] Email credentials set (or environment variable)
  - [ ] Server port configured
- [ ] Sensitive data removed from source code
- [ ] `Procfile` created for deployment
- [ ] `.gitignore` updated (should ignore target/, .env files)

### Build & Testing
- [ ] Maven build successful: `mvn clean package`
- [ ] No build errors or critical warnings
- [ ] Local server starts: `mvn spring-boot:run`
- [ ] Health check endpoint accessible: `http://localhost:8080/api/health` (if exists)
- [ ] Database migrations working
- [ ] Email service functional
- [ ] CORS headers present in responses

### Database Setup
- [ ] Database created and named appropriately
- [ ] User credentials set
- [ ] Connection pooling configured
- [ ] Backups configured (if cloud database)

### Deployment Platform Selection
- [ ] Platform selected (Heroku, Railway, AWS, DigitalOcean, etc.)
- [ ] Account created on chosen platform
- [ ] Platform CLI installed (if required)
- [ ] Authentication completed

### Platform-Specific Setup
**For Heroku:**
- [ ] Heroku app created
- [ ] ClearDB MySQL addon added
- [ ] Environment variables configured
- [ ] Buildpack configured (Java)

**For Railway:**
- [ ] Project created
- [ ] MySQL database added
- [ ] GitHub connected
- [ ] Environment variables set

**For AWS:**
- [ ] IAM role created
- [ ] RDS database provisioned
- [ ] VPC and security groups configured
- [ ] Application environment created

### Pre-Deployment
- [ ] All changes committed to git
- [ ] No uncommitted changes
- [ ] Branch is main/master
- [ ] `.jar` file generated: `mvn clean package`

---

## Integration Testing

### After Frontend Deployment
- [ ] Frontend accessible at Netlify URL
- [ ] Page loads correctly (no build errors)
- [ ] All routes functional
- [ ] Styling and assets loaded properly

### After Backend Deployment
- [ ] Backend accessible at production URL
- [ ] API endpoints respond correctly
- [ ] Database connection successful
- [ ] Email service functional
- [ ] Logs show no errors

### Full Integration Test
- [ ] Frontend points to production backend URL
  - [ ] Set `REACT_APP_API_BASE_URL` in Netlify environment variables
  - [ ] Redeploy frontend
- [ ] Cross-origin requests working (no CORS errors)
- [ ] User registration workflow:
  - [ ] User can create account
  - [ ] Verification email received
  - [ ] Email verification works
  - [ ] User can login
- [ ] Course operations:
  - [ ] Can view courses (if instructor role)
  - [ ] Can add new course
  - [ ] Can edit existing course
  - [ ] Can delete course
- [ ] File uploads:
  - [ ] Course images upload correctly
  - [ ] Images display in course list
- [ ] User profile:
  - [ ] User details displayed correctly
  - [ ] Logout functionality works

---

## Security Verification

### Credentials & Secrets
- [ ] No hardcoded passwords in source code
- [ ] API keys not visible in version control
- [ ] Environment variables properly secured
- [ ] Database password changed from default

### CORS Configuration
- [ ] Only allowed origins specified
- [ ] Wildcard origins removed from production
- [ ] Credentials allowed if needed

### SSL/HTTPS
- [ ] Frontend served over HTTPS (Netlify default)
- [ ] Backend served over HTTPS
- [ ] SSL certificate valid and auto-renewing

### Database Security
- [ ] Strong database password
- [ ] Access restricted to application only
- [ ] Automated backups enabled
- [ ] Encryption enabled (if available)

---

## Performance & Monitoring

### Frontend Performance
- [ ] Build size optimized
- [ ] No console errors in production
- [ ] Lazy loading implemented (if applicable)
- [ ] Images optimized

### Backend Performance
- [ ] Response times acceptable
- [ ] Database queries optimized
- [ ] Connection pooling configured
- [ ] Caching enabled (if applicable)

### Monitoring & Logs
- [ ] Error logging configured
- [ ] Access logs visible
- [ ] Performance metrics available
- [ ] Alerting set up (optional)

---

## Post-Deployment

### Immediate After Deployment
- [ ] Test all user workflows
- [ ] Check logs for errors
- [ ] Monitor CPU/memory usage
- [ ] Verify database backups

### First 24 Hours
- [ ] Monitor application stability
- [ ] Check for recurring errors
- [ ] Verify email notifications work
- [ ] Performance metrics normal

### Ongoing
- [ ] Regular backups scheduled
- [ ] Security updates monitored
- [ ] Dependencies updated periodically
- [ ] Performance monitoring active

---

## Rollback Plan

If issues occur after deployment:

### Frontend Rollback
- [ ] Previous build available on Netlify
- [ ] Can redeploy previous version from Git history
- [ ] Environment variables preserved

### Backend Rollback
- [ ] Previous jar file available
- [ ] Database rollback plan ready
- [ ] Docker image saved (if applicable)

---

## Quick Reference URLs

After deployment, keep these URLs handy:

**Frontend URL**: https://your-app.netlify.app

**Backend API URL**: https://your-backend-url.com

**Admin Dashboards**:
- Netlify: https://app.netlify.com
- Heroku: https://dashboard.heroku.com
- Railway: https://railway.app/dashboard
- AWS: https://console.aws.amazon.com

---

## Troubleshooting Quick Links

- **CORS Errors**: See CORS Configuration section in backend config
- **Database Connection Failed**: Verify DATABASE_URL environment variable
- **Build Fails**: Check Maven version and dependencies
- **Email Not Sending**: Verify MAIL_USERNAME and MAIL_PASSWORD
- **Images Not Loading**: Check API_BASE_URL in frontend env variables

---

## Support Documentation

- Frontend Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)
- Backend Deployment: See [BACKEND-DEPLOYMENT.md](BACKEND-DEPLOYMENT.md)
- Git Repository URL: (Your GitHub repo URL)
- Project Documentation: See [README.md](README.md)

---

**Last Updated**: April 2026
**Status**: Ready for Production
