# 关于页业务团队新增 Facebook 主页链接 (2026-06-27 15:40-15:50)

用户要求在关于页面的业务团队中增加个人 Facebook 主页链接字段。

## 改动

### 数据库
- `about_team` 表新增 `facebook TEXT DEFAULT ''` 列
- `server.js` initDatabase 中添加迁移：`ALTER TABLE about_team ADD COLUMN facebook TEXT DEFAULT ''`（幂等，已有则忽略错误）

### 后端 API
- `POST /api/admin/about-team`：新增 `facebook` 参数
- `PUT /api/admin/about-team/:id`：新增 `facebook` 参数

### 前端关于页 (`[locale]/about/page.tsx`)
- `TeamMember` 接口新增 `facebook: string`
- 团队卡片邮箱链接下方新增 Facebook 链接（蓝色 FB 图标）
- 支持完整 URL（`https://facebook.com/xxx`）或纯用户名（自动补全前缀）
- 仅当 `facebook` 有值时显示

### 管理后台 (`AboutPageManager.tsx`)
- `TeamMember` 接口新增 `facebook: string`
- TeamSection 编辑表单新增 "Facebook 主页" 输入框（邮箱 Email 下方）

## 验证
- `next build` 全量通过，85/85 静态页面 3.0s
- :3000 frontend 200，:3000/admin 200，:3000/en/about 200
- PM2 托管，build 后自动恢复
