# Paiqi Wire Mesh 云服务器部署指南

## 架构概览

```
用户 → Nginx (80/443) → 前端静态文件 (dist/)
                    ↘ API请求 → Node.js (3001) → SQLite
```

## 服务器要求

- Ubuntu 20.04+ / CentOS 8+
- Node.js 18+
- Nginx
- PM2 (进程管理)

## 部署步骤

### 1. 服务器环境准备

```bash
# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# 安装 PM2
sudo npm install -g pm2

# 创建部署目录
sudo mkdir -p /var/www/paiqi-wiremesh
sudo chown $USER:$USER /var/www/paiqi-wiremesh
```

### 2. 上传代码

```bash
# 在本地构建前端
cd paiqi-wiremesh
npm run build

# 上传整个项目到服务器（使用 rsync 或 scp）
rsync -avz --exclude=node_modules --exclude=.next --exclude=dist \
  ./ user@your-server:/var/www/paiqi-wiremesh/
```

### 3. 部署后端 API

```bash
ssh user@your-server
cd /var/www/paiqi-wiremesh/backend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
nano .env  # 编辑 SMTP 等配置

# 启动服务
./deploy.sh
```

### 4. 部署前端

```bash
cd /var/www/paiqi-wiremesh
sudo cp -r dist /var/www/paiqi-wiremesh/
sudo chown -R www-data:www-data /var/www/paiqi-wiremesh/dist
```

### 5. 配置 Nginx

```bash
sudo cp /var/www/paiqi-wiremesh/backend/nginx.conf /etc/nginx/sites-available/paiqi-wiremesh
sudo ln -s /etc/nginx/sites-available/paiqi-wiremesh /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. 配置 SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d paiqi-wiremesh.com -d www.paiqi-wiremesh.com
```

## 环境变量配置

编辑 `backend/.env`：

```env
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://paiqi-wiremesh.com

# SMTP 配置（用于询盘邮件通知）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFY_EMAIL=sales@paiqi-wiremesh.com
```

## 管理命令

```bash
# 查看 API 状态
pm2 status

# 查看日志
pm2 logs paiqi-api

# 重启 API
pm2 restart paiqi-api

# 重启 Nginx
sudo systemctl reload nginx

# 查看数据库
sqlite3 /var/www/paiqi-wiremesh/backend/inquiries.db \
  "SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 10;"
```

## 文件结构

```
/var/www/paiqi-wiremesh/
├── dist/                  # 前端静态文件
├── backend/
│   ├── server.js          # API 服务
│   ├── inquiries.db       # SQLite 数据库
│   ├── ecosystem.config.js # PM2 配置
│   └── logs/              # 日志文件
└── ...
```

## 备份

```bash
# 备份数据库
cp /var/www/paiqi-wiremesh/backend/inquiries.db \
   /backup/inquiries-$(date +%Y%m%d).db

# 备份前端
tar czf /backup/frontend-$(date +%Y%m%d).tar.gz \
   /var/www/paiqi-wiremesh/dist
```
