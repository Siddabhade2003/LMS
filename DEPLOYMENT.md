# LMS Project Deployment Guide

This guide explains how to deploy the LMS (Learning Management System) project to Netlify and other platforms.

## Project Structure

- **Frontend**: React app in `/lms-app` directory
- **Backend**: Spring Boot Java application in `/backend/forms` directory

## Frontend Deployment (Netlify)

### Step 1: Prepare the Frontend

The frontend has already been configured for production deployment:

1. **Environment Variables**: The app uses `REACT_APP_API_BASE_URL` environment variable for the backend API URL.

2. **Files Added**:
   - `netlify.toml` - Netlify build and deployment configuration
   - `.env` - Local development environment variables
   - `.env.example` - Template for environment variables

### Step 2: Deploy to Netlify

#### Option A: Using Netlify Dashboard (Recommended)

1. **Create a Netlify Account**:
   - Go to https://netlify.com and sign up

2. **Connect Your Repository**:
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your LMS repository

3. **Configure Build Settings**:
   - **Base directory**: `lms-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

4. **Set Environment Variables** (in Netlify Dashboard):
   - Go to: Site settings → Build & deploy → Environment
   - Add variable: `REACT_APP_API_BASE_URL`
   - Value: Your deployed backend API URL (e.g., `https://your-backend-api.com`)

5. **Deploy**:
   - Netlify will automatically build and deploy your app

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to the frontend directory
cd lms-app

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod

# When prompted, set environment variables:
# REACT_APP_API_BASE_URL = <your-backend-api-url>
```

### Step 3: Configure Environment Variables

After deployment, update the environment variable in Netlify Dashboard:

1. Go to Site settings → Build & deploy → Environment
2. Set `REACT_APP_API_BASE_URL` to your backend URL
3. Trigger a redeploy for changes to take effect

## Backend Deployment

Since Netlify only supports static sites and serverless functions, you need to deploy the Spring Boot backend to another service.

### Recommended Platforms for Backend:

1. **Heroku** (Easy, free tier available)
2. **AWS Elastic Beanstalk** (More powerful)
3. **Railway** (Simple and modern)
4. **Render** (Good free tier)
5. **DigitalOcean** (Affordable VPS)

### Example: Deploy to Heroku

#### Prerequisites:
- Heroku CLI installed
- Heroku account created

#### Steps:

1. **Navigate to Backend**:
   ```bash
   cd backend/forms
   ```

2. **Create a Procfile** (if not exists):
   ```
   web: java -Dserver.port=$PORT -jar target/forms-0.0.1-SNAPSHOT.jar
   ```

3. **Build with Maven**:
   ```bash
   mvn clean package -DskipTests
   ```

4. **Login to Heroku**:
   ```bash
   heroku login
   ```

5. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

6. **Deploy**:
   ```bash
   git subtree push --prefix backend/forms heroku main
   ```

7. **Verify Deployment**:
   ```bash
   heroku logs --tail
   ```

### Update Backend for Production

Update the CORS configuration in `CorsConfig.java`:

```java
// Allow requests from your Netlify frontend
config.addAllowedOrigin("https://your-netlify-domain.netlify.app");

// Also allow localhost for development
config.addAllowedOrigin("http://localhost:3000");
config.addAllowedOrigin("http://localhost:8080");
```

### Update Frontend API URL

After getting your backend URL, update the environment variable in Netlify:

1. Set `REACT_APP_API_BASE_URL` to your backend URL
2. Example: `https://your-app-name.herokuapp.com`
3. Redeploy the frontend

## Local Development

### Frontend:
```bash
cd lms-app
npm install
npm start
```

### Backend:
```bash
cd backend/forms
mvn spring-boot:run
```

The `.env` file in `lms-app` is configured for local development with `REACT_APP_API_BASE_URL=http://localhost:8080`.

## Important Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Secure Environment Variables** - Store API URLs and sensitive data in Netlify environment settings
3. **CORS Configuration** - Only allow origins you control
4. **Database Credentials** - Use environment variables for database connections (not shown in this guide)
5. **API Keys** - Move RapidAPI keys from source code to environment variables

## Troubleshooting

### Frontend Issues:

- **CORS Errors**: Ensure backend CORS allows your Netlify domain
- **API Not Found**: Check `REACT_APP_API_BASE_URL` is correctly set
- **Build Fails**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Backend Issues:

- **Won't Start**: Check database configuration and dependencies
- **Connection Refused**: Ensure backend is running and accessible
- **Port Issues**: Backend may need environment variable configuration

## Next Steps

1. Deploy backend to your chosen platform
2. Get backend URL
3. Set `REACT_APP_API_BASE_URL` in Netlify
4. Redeploy frontend
5. Test all features with live URLs

For more detailed information about specific platforms, refer to their official documentation.
