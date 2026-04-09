# Render Backend Deployment - Environment Variables

## Before Deploying to Render

Set these environment variables in Render dashboard:

### Database Configuration
```
DB_HOST=<from-planetscale>
DB_PORT=3306
DB_USER=<from-planetscale>
DB_PASSWORD=<from-planetscale>
DB_NAME=lms_db
```

### Example from PlanetScale Connection String
If your connection string looks like:
```
mysql://abc123:xyz789@abc123.us-east-2.psdb.cloud/lms_db?sslMode=VERIFY_IDENTITY
```

Then extract:
- `DB_HOST` = `abc123.us-east-2.psdb.cloud`
- `DB_USER` = `abc123`
- `DB_PASSWORD` = `xyz789`
- `DB_NAME` = `lms_db`
- `DB_PORT` = `3306`

### Optional Configuration
```
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.MySQL8Dialect
```

## Steps to Deploy to Render

1. Go to https://render.com
2. Click "Sign in with GitHub"
3. Click "New +" → "Web Service"
4. Select your LMS repository
5. Configure:
   - Name: `lms-backend`
   - Environment: `Java`
   - Build Command: `mvn clean package`
   - Start Command: `java -jar target/forms-0.0.1-SNAPSHOT.jar`
   - Instance Type: `Free`
6. Add all environment variables (from above)
7. Click Deploy
8. Wait 5-10 minutes for build to complete
9. Copy the deployed URL (will be like: `https://lms-backend.onrender.com`)

## Testing After Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://lms-backend.onrender.com/api/health

# Login endpoint
curl -X POST https://lms-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get all courses
curl https://lms-backend.onrender.com/api/courses
```

## Troubleshooting

If deployment fails:

1. **Check Render logs**: Dashboard → Your App → Logs
2. **Common issues**:
   - Database credentials wrong → Check PlanetScale connection string
   - Port mismatch → Render uses PORT env var
   - Build failed → Check `mvn clean package` locally first

## Connect Frontend to Backend

Once backend is deployed:

1. Get your Render URL: `https://lms-backend.onrender.com`
2. Go to Netlify dashboard
3. Site Settings → Build & Deploy → Environment Variables
4. Add/Update:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: `https://lms-backend.onrender.com`
5. Trigger Manual Deploy
6. Done! Frontend now connected to backend

