# Backend Deployment Guide

This guide covers deploying the Spring Boot LMS backend to various cloud platforms.

## Prerequisites

- Java 11+ installed
- Maven installed
- Git configured
- Account on chosen deployment platform

## Build the Backend

Before deploying, build the project locally:

```bash
cd backend/forms
mvn clean package -DskipTests
```

## Deployment Platforms

### 1. Heroku (Easiest, Recommended for Beginners)

#### Setup:

1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Linux/Windows - Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   cd backend/forms
   heroku create your-app-name
   ```

4. **Add Database (ClearDB MySQL)**:
   ```bash
   heroku addons:create cleardb:ignite
   heroku config | grep CLEARDB_DATABASE_URL
   ```

5. **Configure Environment Variables**:
   ```bash
   heroku config:set MAIL_USERNAME=your-gmail@gmail.com
   heroku config:set MAIL_PASSWORD="your-app-password"
   heroku config:set DATABASE_URL="your-cleardb-url"
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

7. **View Logs**:
   ```bash
   heroku logs --tail
   ```

#### Update CORS in Backend:

After getting your Heroku URL (e.g., `https://your-app-name.herokuapp.com`), update `CorsConfig.java`:

```java
config.addAllowedOrigin("https://your-app-name.herokuapp.com");
config.addAllowedOrigin("https://your-netlify-app.netlify.app");
```

Redeploy:
```bash
git push heroku main
```

---

### 2. Railway (Modern, Easy)

#### Setup:

1. **Visit railway.app and sign up**

2. **Create a new project**

3. **Add MySQL database**:
   - Click "Add services" → "MySQL"

4. **Deploy from GitHub**:
   - Connect your GitHub repository
   - Select `backend/forms` as the root directory

5. **Set Environment Variables** in Railway Dashboard:
   ```
   DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>
   MAIL_USERNAME=your-gmail@gmail.com
   MAIL_PASSWORD=your-app-password
   ```

6. **Deploy automatically** - Railway will handle the build and deployment

---

### 3. AWS Elastic Beanstalk

#### Setup:

1. **Install AWS CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB**:
   ```bash
   cd backend/forms
   eb init -p "Java 11 running on 64bit Amazon Linux 2" --region us-east-1
   ```

3. **Create Environment**:
   ```bash
   eb create lms-env
   ```

4. **Configure Environment Variables**:
   ```bash
   eb setenv MAIL_USERNAME=your-gmail@gmail.com MAIL_PASSWORD=your-app-password
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

---

### 4. DigitalOcean App Platform

#### Setup:

1. **Visit digitalocean.com/app-platform**

2. **Create new app**

3. **Connect GitHub repository**

4. **Select `backend/forms` directory**

5. **Add MySQL database** from DigitalOcean Dashboard

6. **Set environment variables**

7. **Deploy**

---

## Environment Variables for Production

When deploying to production, use these environment variables:

### Database Configuration:
```
DATABASE_URL=jdbc:mysql://host:port/database
DATABASE_USER=username
DATABASE_PASSWORD=password
```

### Email Configuration:
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password
```

### CORS Configuration:
Update `CorsConfig.java` with your production domain(s)

### Server Configuration:
```
PORT=8080
JAVA_OPTS=-Xmx256m -Xms128m
```

## Database Setup

### MySQL on Cloud:

1. **ClearDB** (Heroku): Automatically handled
2. **AWS RDS**: Create from AWS console
3. **Railway**: Built-in MySQL
4. **DigitalOcean**: Built-in database option

### Create Database Schema:

```sql
CREATE DATABASE form;
USE form;
```

The JPA/Hibernate configuration will create tables automatically with `spring.jpa.hibernate.ddl-auto=update`.

## Security Considerations

### Credentials:
- **Never** commit sensitive data (passwords, API keys)
- Use environment variables provided by cloud platform
- Rotate credentials regularly

### CORS:
- Only allow your frontend domain
- Remove `http://localhost:3000` from production CORS config

### Database:
- Use strong passwords
- Enable SSL for database connections
- Backup database regularly

## Testing Production Deployment

After deployment, verify the backend:

1. **Check if server is running**:
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **View logs**:
   - Heroku: `heroku logs --tail`
   - Railway: View in dashboard
   - AWS: Check CloudWatch logs
   - DigitalOcean: View app logs

3. **Test API endpoints**:
   ```bash
   curl -X GET https://your-backend-url.com/api/course
   ```

## Troubleshooting

### Build Fails:
- Check Maven version: `mvn --version`
- Verify Java version matches (11+)
- Run locally first: `mvn spring-boot:run`

### Database Connection Error:
- Verify `DATABASE_URL` environment variable
- Check database credentials
- Ensure database is running

### CORS Errors:
- Update `CorsConfig.java` with correct frontend URL
- Redeploy backend
- Clear browser cache

### Mail Service Fails:
- Verify MAIL_USERNAME and MAIL_PASSWORD
- Check Gmail app-specific password (if using Gmail)
- Verify port 587 is open

### Port Issues:
- Ensure `server.port` is configured correctly
- Most platforms use environment variable `PORT`

## Next Steps

1. Deploy backend to chosen platform
2. Get production backend URL
3. Update frontend `REACT_APP_API_BASE_URL` in Netlify
4. Update `CorsConfig.java` with frontend URL
5. Redeploy backend and frontend
6. Test all features end-to-end

## Useful Links

- Heroku: https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku
- Railway: https://railway.app/docs
- AWS: https://docs.aws.amazon.com/elasticbeanstalk/
- DigitalOcean: https://docs.digitalocean.com/products/app-platform/
