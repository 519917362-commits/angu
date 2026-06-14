# Angu Wire Mesh 询盘 API 服务

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境
cp .env.example .env
# 编辑 .env 填入 SMTP 配置

# 启动开发
npm run dev

# 生产部署
./deploy.sh
```

## API 端点

### POST /api/inquiry
提交询盘

请求体：
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+86 138-1234-5678",
  "company": "ABC Corp",
  "country": "USA",
  "quantity": "1000 units",
  "message": "Interested in gabion boxes",
  "productSlug": "galvanized-gabion-box-2x1x1m",
  "categorySlug": "gabion-mesh",
  "locale": "en"
}
```

响应：
```json
{
  "success": true,
  "message": "Inquiry submitted successfully.",
  "inquiryNo": "INQ-1703753600000"
}
```

### GET /api/health
健康检查

### GET /api/inquiries
获取询盘列表（管理用）

### PATCH /api/inquiries/:id
更新询盘状态

## 数据库

SQLite 自动创建 `inquiries.db`，包含字段：
- id, inquiry_no, name, email, phone, company
- country, quantity, message, product_slug, category_slug
- locale, status, created_at, updated_at
