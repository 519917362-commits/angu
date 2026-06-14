#!/bin/bash
set -e

echo "=== Angu Wire Mesh Backend Deployment ==="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root for port 80/443
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please do not run as root${NC}"
   exit 1
fi

# Install dependencies
echo -e "${YELLOW}[1/6] Installing dependencies...${NC}"
npm install

# Create logs directory
mkdir -p logs

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found, copying from .env.example${NC}"
    cp .env.example .env
    echo -e "${RED}Please edit .env with your actual configuration before starting!${NC}"
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}[2/6] Installing PM2...${NC}"
    npm install -g pm2
fi

# Start/Restart with PM2
echo -e "${YELLOW}[3/6] Starting API server with PM2...${NC}"
pm2 start ecosystem.config.js --env production || pm2 restart ecosystem.config.js --env production

# Save PM2 config to restart on boot
echo -e "${YELLOW}[4/6] Saving PM2 config...${NC}"
pm2 save

# Setup PM2 startup script (optional, requires sudo)
echo -e "${YELLOW}[5/6] To enable auto-start on boot, run:${NC}"
echo -e "${GREEN}  sudo pm2 startup systemd${NC}"
echo -e "${GREEN}  sudo pm2 save${NC}"

# Show status
echo -e "${YELLOW}[6/6] Deployment complete!${NC}"
pm2 status

echo ""
echo -e "${GREEN}API Server is running!${NC}"
echo -e "Health check: ${GREEN}curl http://localhost:3001/api/health${NC}"
echo -e "Logs: ${GREEN}pm2 logs paiqi-api${NC}"
echo -e "Stop: ${GREEN}pm2 stop paiqi-api${NC}"
echo -e "Restart: ${GREEN}pm2 restart paiqi-api${NC}"
