#!/bin/bash
# LMS Netlify + Backend Deployment Setup Script
# This script helps automate the deployment process

set -e

echo "=== LMS Application Deployment Setup ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Heroku Deployment
heroku_deploy() {
    echo -e "${BLUE}Step 1: Heroku Backend Deployment${NC}"
    echo ""
    
    echo "1. Install Heroku CLI if not already installed:"
    echo "   brew tap heroku/brew && brew install heroku"
    echo ""
    
    read -p "Have you installed Heroku CLI? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please install Heroku CLI first"
        return 1
    fi
    
    echo "2. Login to Heroku:"
    heroku login
    
    read -p "Enter your Heroku app name: " app_name
    
    echo "3. Creating Heroku app..."
    heroku create $app_name || true
    
    echo "4. Adding MySQL database..."
    heroku addons:create jawsdb:kitefin --app=$app_name || true
    
    echo "5. Getting database credentials..."
    heroku config --app=$app_name
    
    read -p "Enter database URL (from JAWSDB_URL): " db_url
    read -p "Enter database username: " db_user
    read -s -p "Enter database password: " db_pass
    echo ""
    
    echo "6. Setting environment variables..."
    heroku config:set \
        DB_URL="$db_url" \
        DB_USER="$db_user" \
        DB_PASSWORD="$db_pass" \
        APP_USER="admin" \
        APP_PASSWORD="$(openssl rand -base64 12)" \
        --app=$app_name
    
    echo "7. Deploying backend..."
    cd backend/forms
    heroku git:remote -a $app_name
    git push heroku main || true
    cd ../..
    
    echo -e "${GREEN}✓ Backend deployed to: https://$app_name.herokuapp.com${NC}"
    echo ""
}

# Netlify Deployment
netlify_deploy() {
    echo -e "${BLUE}Step 2: Netlify Frontend Deployment${NC}"
    echo ""
    
    echo "1. Install Netlify CLI if not already installed:"
    echo "   npm install -g netlify-cli"
    echo ""
    
    read -p "Have you installed Netlify CLI? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please install Netlify CLI first"
        return 1
    fi
    
    echo "2. Building frontend..."
    cd lms-app
    npm install
    npm run build
    cd ..
    
    echo "3. Deploying to Netlify..."
    netlify deploy --prod --dir=lms-app/build
    
    echo -e "${GREEN}✓ Frontend deployed to Netlify${NC}"
    echo ""
}

# Environment Setup
env_setup() {
    echo -e "${BLUE}Step 3: Environment Configuration${NC}"
    echo ""
    
    echo "Creating .env.production file..."
    read -p "Enter your backend URL (e.g., https://your-app.herokuapp.com): " backend_url
    
    cat > lms-app/.env.production << EOF
REACT_APP_API_BASE_URL=$backend_url
REACT_APP_API_TIMEOUT=10000
EOF
    
    echo -e "${GREEN}✓ Environment file created${NC}"
}

# Menu
show_menu() {
    echo "Choose deployment option:"
    echo "1) Deploy Backend to Heroku"
    echo "2) Deploy Frontend to Netlify"
    echo "3) Setup Environment Variables"
    echo "4) Full Deployment (All Steps)"
    echo "5) Exit"
    echo ""
}

# Main Menu Loop
while true; do
    show_menu
    read -p "Select option (1-5): " choice
    
    case $choice in
        1) heroku_deploy ;;
        2) netlify_deploy ;;
        3) env_setup ;;
        4) 
            heroku_deploy && \
            env_setup && \
            netlify_deploy
            ;;
        5) 
            echo -e "${GREEN}Deployment setup script completed!${NC}"
            echo ""
            echo "Next steps:"
            echo "1. Update Netlify environment variables with your backend URL"
            echo "2. Test the application at: https://your-site.netlify.app"
            echo "3. Check backend health: https://your-backend.herokuapp.com/api/health"
            echo ""
            exit 0
            ;;
        *) echo "Invalid option. Please try again." ;;
    esac
    echo ""
done
