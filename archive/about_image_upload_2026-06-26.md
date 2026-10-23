# About 页面管理后台：团队头像 + 工厂图片上传功能

**时间**: 2026-06-26 09:01-09:05

## 改造内容

### 新增 ImageUpload 组件
- 支持点击选择本地图片文件 → 自动上传到 `/api/admin/upload`
- 上传中显示 loading spinner
- 上传成功后显示缩略图预览
- 保留手动粘贴 URL 作为回落
- 兼容旧 emoji 头像（显示文本而非图片）

### 团队头像 (TeamSection)
- 编辑表单：`avatar` 字段从纯文本输入 → ImageUpload 组件
- 列表视图：显示真实头像缩略图（圆形裁剪），emoji 回落为蓝色渐变背景

### 工厂图片 (FactorySection)
- 编辑表单：`image_url` 字段从纯文本输入 → ImageUpload 组件
- 上传后直接可预览大图

### 公众 about 页面
- 团队头像支持渲染上传的真实图片（`<img>` 标签），emoji 回落保持不变

## 文件变更
- `src/app/admin/components/AboutPageManager.tsx` — 新增 ImageUpload 组件 + Team/Factory 表单改造
- `src/app/[locale]/about/page.tsx` — 团队头像支持真实图片渲染
