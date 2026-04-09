# 🚀 DEPLOYMENT CHECKLIST - DO THIS NOW!

## ✅ STEP 1: Frontend to Netlify (5 mins)

### Actions:
1. Go to: **https://netlify.com**
2. Click **"Sign in with GitHub"**
3. Find and select: **`Siddabhade2003/LMS`** repo
4. Netlify auto-detects config from netlify.toml
5. Configure:
   - Base directory: `lms-app`
   - Build command: `npm run build`
   - Publish directory: `build`
6. **ADD ENVIRONMENT VARIABLE** (Important!):
   - Variable name: `REACT_APP_API_BASE_URL`
   - Value: Leave blank for now (update after backend deployment)
7. Click **"Deploy Site"**
8. ✅ Wait 2-3 minutes until you see green checkmark

**Result:** You'll get a URL like `https://your-site.netlify.app` - **SAVE THIS**

---

## ✅ STEP 2: Database on PlanetScale (10 mins)

### Actions:
1. Go to: **https://planetscale.com**
2. Click **"Sign up"** (free account)
3. Choose Plan: **"Hobby - Free"**
4. Create New Database:
   - Database name: `lms_db`
   - Region: Pick closest to you (e.g., us-east, eu-west)
   - Click **"Create database"**
5. Once created, click **"Connect"**
6. Select connection method: **"Spring Boot"**
7. **COPY** the connection string
8. From the string extract and SAVE:
   ```
   DB_HOST = (the hostname part)
   DB_USER = (the username)
   DB_PASSWORD = (the password)
   DB_NAME = lms_db
   DB_PORT = 3306
   ```

**Example:**
```
URL: mysql://abc123:xyz789@abc123.us-east-2.psdb.cloud/lms_db?sslMode=VERIFY_IDENTITY

Extract:
✓ DB_HOST = abc123.us-east-2.psdb.cloud
✓ DB_USER = abc123
✓ DB_PASSWORD = xyz789
✓ DB_NAME = lms_db
✓ DB_PORT = 3306
```

---

## ✅ STEP 3: Backend to Render (15 mins)

### Actions:
1. Go to: **https://render.com**
2. Click **"Sign in with GitHub"**
3. Click **"New +"** button
4. Select **"Web Service"**
5. Authorize GitHub access if asked
6. Find and select: **`Siddabhade2003/LMS`** repo
7. Fill in the form:

   | Field | Value |
   |-------|-------|
   | Name | `lms-backend` |
   | Environment | `Java` |
   | Build Command | `mvn clean package` |
   | Start Command | `java -jar target/forms-0.0.1-SNAPSHOT.jar` |
   | Instance Type | `Free` |
   | Region | Same as PlanetScale |

8. **ADD ENVIRONMENT VARIABLES** (Click "Add Environment Variable" for each):
   ```
   SPRING_PROFILES_ACTIVE = render
   DB_HOST = <from PlanetScale>
   DB_PORT = 3306
   DB_USER = <from PlanetScale>
   DB_PASSWORD = <from PlanetScale>
   DB_NAME = lms_db
   MAIL_USERNAME = siddharthdabhade415@gmail.com
   MAIL_PASSWORD = lwfl avjq cqbd ijxw
   PORT = 8080
   ```

9. Click **"Create Web Service"**
10. ⏳ Wait 5-10 minutes while it builds and deploys
11. ✅ You'll see "Live" status when done
12. **COPY** the URL (looks like: `https://lms-backend.onrender.com`)

---

## ✅ STEP 4: Connect Frontend to Backend (2 mins)

### Actions:
1. Go to your **Netlify dashboard**
2. Click your site
3. Go to **"Site Settings"**
4. Click **"Build & Deploy"** → **"Environment"**
5. Click **"Add a single variable"** or edit existing `REACT_APP_API_BASE_URL`
6. Set value to your Render backend URL:
   ```
   REACT_APP_API_BASE_URL = https://lms-backend.onrender.com
   ```
7. Click **"Save"**
8. Go back to **"Deploys"**
9. Click **"Trigger deploy"** → **"Deploy site"**
10. ✅ Wait 2-3 minutes for frontend rebuild

---

## ✅ FINAL VERIFICATION

### Test Your Deployment:

```bash
# Frontend URL (from Netlify)
https://your-site.netlify.app

# Backend Health Check
curl https://lms-backend.onrender.com/api

# Try Login on your live site
- Go to https://your-site.netlify.app
- Sign up / Log in
- Check if data loads
```

---

## 📋 QUICK REFERENCE - WHAT YOU NEED READY

Before starting, have these ready:

✅ GitHub account logged in  
✅ Your LMS repository  
✅ Free accounts created on:
   - Netlify
   - PlanetScale
   - Render

---

## 🎉 YOU'RE DONE!

After completing all 4 steps:

- ✅ Frontend live on Netlify
- ✅ Database running on PlanetScale
- ✅ Backend running on Render
- ✅ Everything connected

**Total cost: $0/month**
**Total time: ~30 minutes**

---

## ❓ HELP & TROUBLESHOOTING

### Frontend won't load?
- Check Netlify build logs: Dashboard → Site Settings → Build & Deploy → Deploy log
- Ensure `REACT_APP_API_BASE_URL` is set

### Backend won't start?
- Check Render logs: Dashboard → Your App → Logs
- Verify all database variables are correct
- Test locally: `mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=render"`

### Can't connect to database?
- Verify PlanetScale connection string is correct
- Check all credentials match exactly
- Test connection from Render dashboard

### Need help?
- Read: `RENDER_DEPLOYMENT_ENV.md` (detailed guide)
- Read: `FREE_DEPLOYMENT_OPTIONS.md` (all options explained)
- Check: `COMPLETE_DEPLOYMENT_GUIDE.md` (comprehensive guide)

