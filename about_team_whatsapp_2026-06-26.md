# 团队 WhatsApp 字段

**时间**: 2026-06-26 09:07

## 改动
- `backend/server.js`: about_team 表新增 whatsapp 列；POST/PUT API 增加 whatsapp 字段；种子数据加 WhatsApp 值
- `backend/inquiries.db`: ALTER TABLE + UPDATE 设置 4 位成员 whatsapp = phone
- `AboutPageManager.tsx`: TeamMember 接口 + 表单新增 whatsapp 输入框
- `src/app/[locale]/about/page.tsx`: TeamMember 类型 + 成员卡片新增 WhatsApp 绿色链接图标
