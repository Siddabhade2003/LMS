# Complete Deployment Guide - LMS Application

## Overview
This guide covers deploying the LMS application:
- **Frontend**: React app → Netlify
- **Backend**: Spring Boot app → Heroku/Railway/DigitalOcean
- **Database**: MySQL → Cloud provider

---

## Part 1: GitHub Repository Setup

### Step 1.1: Commit Current Changes

```bash
cd /Users/siddharthdabhade/LMS

# Stage the CVE analysis report
git add CVE_ANALYSIS_REPORT.md

# Add deployment documentation
git add DEPLOYMENT.md

# Check status
git status

# Commit with meaningful message
git commit -m "Security: Add CVE vulnerability analysis report and deployment documentation"

# Push to GitHub
git push origin main
```

### Step 1.2: Create Environment Files for Deployment

The frontend needs environment configuration. Create `.env` files:

**`.env.production` (for Netlify production)**
```
REACT_APP_API_BASE_URL=https://your-backend-url.herokuapp.com
REACT_APP_API_TIMEOUT=10000
```

**`.env.staging` (optional, for preview deploys)**
```
REACT_APP_API_BASE_URL=https://staging-backend.herokuapp.com
```

---

## Part 2: Netlify Frontend Deployment

### Step 2.1: Connect Repository to Netlify

1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your repository: `siddharthdabhade/LMS`
5. Choose branch: `main`

### Step 2.2: Configure Netlify Build Settings

**Build Command**: `npm run build`
**Publish Directory**: `build` (for React, it's `lms-app/build`)
**Base Directory**: `lms-app`

### Step 2.3: Set Environment Variables in Netlify

In Netlify Dashboard:
1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add Variable:
   - **Key**: `REACT_APP_API_BASE_URL`
   - **Value**: `https://your-backend-url.herokuapp.com` (update after backend deployment)

### Step 2.4: Configure Redirects

The `netlify.toml` file already contains the necessary SPA redirect rules.

### Step 2.5: Deploy Frontend

```bash
# Push code to trigger auto-deployment
git push origin main

# Or deploy manually via CLI:
npm install -g netlify-cli
netlify deploy --prod
```

**Frontend URL**: `https://your-site.netlify.app`

---

## Part 3: Backend Deployment (Choose One Option)

### Option A: Deploy to Heroku (Recommended for quick start)

#### Step 3A.1: Setup Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create a new app
heroku create your-lms-backend

# Add MySQL database (JawsDB)
heroku addons:create jawsdb:kitefin

# Check environment variables
heroku config
```

#### Step 3A.2: Configure Backend Properties

Update `backend/forms/src/main/resources/application.properties`:

```properties
# Production Database Configuration
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Server Configuration
server.port=${PORT:8080}
server.servlet.context-path=/api

# Security
spring.security.user.name=${APP_USER}
spring.security.user.password=${APP_PASSWORD}

# Logging
logging.level.root=INFO
logging.level.com.example.forms=DEBUG
```

#### Step 3A.3: Create Procfile

Create `backend/forms/Procfile`:

```
web: java -jar target/forms-0.0.1-SNAPSHOT.jar
```

#### Step 3A.4: Set Heroku Environment Variables

```bash
heroku config:set \
  DB_URL="<jawsdb_url_from_config>" \
  DB_USER="<jawsdb_user>" \
  DB_PASSWORD="<jawsdb_password>" \
  APP_USER=admin \
  APP_PASSWORD=<secure_password>
```

#### Step 3A.5: Deploy to Heroku

```bash
cd backend/forms

# Create git remote for Heroku
heroku git:remote -a your-lms-backend

# Push to Heroku
git push heroku main

# View logs
heroku logs --tail
```

**Backend URL**: `https://your-lms-backend.herokuapp.com`

### Option B: Deploy to Railway (Modern Alternative)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize Railway project
railway init

# Configure environment variables
railway variables set DB_HOST=mysql.railway.internal
railway variables set DB_NAME=lms
railway variables set DB_USER=admin
railway variables set DB_PASSWORD=<secure_password>

# Deploy
railway up
```

### Option C: Deploy to DigitalOcean (Full Control)

```bash
# Create droplet with Java & MySQL
# SSH into droplet and:
sudo apt update && sudo apt install openjdk-17-jdk mysql-server

# Clone repository and build
git clone <repo_url>
cd LMS/backend/forms
./mvnw clean package -DskipTests

# Run with systemd
sudo systemctl start forms
sudo systemctl enable forms
```

---

## Part 4: Post-Deployment Configuration

### Step 4.1: Update Netlify Environment Variables

Once backend is deployed:

1. Go to Netlify Dashboard
2. Site Settings → Build & Deploy → Environment
3. Update `REACT_APP_API_BASE_URL` to your backend URL:
   ```
   https://your-lms-backend.herokuapp.com
   ```
4. Trigger new deploy (git push or manual)

### Step 4.2: Test the Full Stack

```bash
# Frontend smoke test
curl https://your-site.netlify.app

# Backend health check
curl https://your-lms-backend.herokuapp.com/api/health

# Login test (adjust URL)
curl -X POST https://your-lms-backend.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### Step 4.3: Configure CORS (Backend)

Update `backend/forms/src/main/java/com/example/forms/config/CorsConfig.java`:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "https://your-site.netlify.app",
                "http://localhost:3000"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

---

## Part 5: Security CVE Fixes

### Step 5.1: Apply CVE Fixes to Backend

**Important**: These fixes address 17 security vulnerabilities.

Update `backend/forms/pom.xml` - Apply these changes:

**Remove these dependencies:**
1. `org.springframework.security:spring-security-core:2.0.4`
2. `mysql:mysql-connector-java:8.0.28`

**Update these versions:**
1. `io.jsonwebtoken` (all 3 artifacts): `0.11.2` → `0.12.5`
2. `javax.mail:mail`: `1.4` → `1.4.7`
3. `com.mysql:mysql-connector-j`: `8.0.33` → `8.3.0`

See `CVE_ANALYSIS_REPORT.md` for detailed instructions.

### Step 5.2: Test Backend Build

```bash
cd backend/forms

# Build with fixes
./mvnw clean package

# Run tests
./mvnw test

# Check for any failures
echo $?
```

### Step 5.3: Commit and Push

```bash
cd /Users/siddharthdabhade/LMS

git add backend/forms/pom.xml
git commit -m "Security: Fix 17 CVE vulnerabilities in backend dependencies

- Remove EOL spring-security-core:2.0.4 (13 CVEs)
- Remove deprecated mysql-connector-java:8.0.28
- Update mysql-connector-j to 8.3.0 (fixes CVE-2023-22102)
- Update JJWT to 0.12.5 (security patches)
- Update javax.mail to 1.4.7 (security patches)"

git push origin main
```

---

## Part 6: Continuous Deployment Setup

### Step 6.1: GitHub Actions Workflow (Optional but Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku & Netlify

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Java
      uses: actions/setup-java@v2
      with:
        java-version: '17'
    
    - name: Build Backend
      run: |
        cd backend/forms
        ./mvnw clean package -DskipTests
    
    - name: Deploy to Heroku
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      run: |
        git remote add heroku https://git.heroku.com/your-lms-backend.git
        git push -f heroku main
    
    - name: Netlify Deploy
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
      run: |
        cd lms-app
        npm ci
        npm run build
        netlify deploy --prod --dir=build
```

To set up:

```bash
# Add secrets to GitHub
# Go to: Settings → Secrets and variables → Actions

# Add HEROKU_API_KEY
# Add NETLIFY_AUTH_TOKEN

# Get tokens:
# - Heroku: heroku auth:token
# - Netlify: netlify status (after login)
```

---

## Part 7: Monitoring & Troubleshooting

### View Backend Logs

```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# DigitalOcean
journalctl -u forms -f
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Frontend can't reach backend | Check CORS config, verify backend URL in .env |
| Database connection fails | Verify DB_URL, DB_USER, DB_PASSWORD env vars |
| Build fails on Netlify | Check Node version, dependencies, base directory |
| Backend won't start | Check Java version, MySQL availability, port conflicts |

---

## Final Deployment Checklist

- [ ] GitHub repository is up to date with all code
- [ ] CVE fixes applied and tested locally
- [ ] Backend deployed (Heroku/Railway/DigitalOcean)
- [ ] Frontend deployed on Netlify
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Full stack tested (frontend → backend → database)
- [ ] SSL certificate valid (auto with Netlify & Heroku)
- [ ] Monitoring/logging enabled
- [ ] Database backups configured
- [ ] Documentation updated with live URLs

---

## Live URLs Reference

Once deployed, save these:

```
Frontend: https://your-site.netlify.app
Backend:  https://your-lms-backend.herokuapp.com
API Base: https://your-lms-backend.herokuapp.com/api
Database: MySQL (managed by cloud provider)
```

---

**Last Updated**: April 9, 2026
**Version**: 1.0
