#!/bin/bash
set -e

echo "=== Paiqi Wire Mesh Frontend Deployment ==="

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Build frontend
echo -e "${YELLOW}[1/3] Building frontend...${NC}"
cd "$(dirname "$0")"
npm run build

# Check if dist exists
if [ ! -d "dist" ]; then
    echo -e "${RED}Build failed: dist directory not found${NC}"
    exit 1
fi

# Deploy to server (adjust path as needed)
DEPLOY_PATH="/var/www/paiqi-wiremesh"
echo -e "${YELLOW}[2/3] Deploying to ${DEPLOY_PATH}...${NC}"

# Create directory if not exists
sudo mkdir -p ${DEPLOY_PATH}

# Backup old version
if [ -d "${DEPLOY_PATH}/dist" ]; then
    echo -e "${YELLOW}Backing up old version...${NC}"
    sudo mv ${DEPLOY_PATH}/dist ${DEPLOY_PATH}/dist.bak.$(date +%Y%m%d_%H%M%S)
fi

# Copy new build
sudo cp -r dist ${DEPLOY_PATH}/
sudo chown -R www-data:www-data ${DEPLOY_PATH}/dist

echo -e "${YELLOW}[3/3] Reloading Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx

echo -e "${GREEN}Frontend deployed successfully!${NC}"
echo -e "Site: ${GREEN}http://paiqi-wiremesh.com${NC}"
