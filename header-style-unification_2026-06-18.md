## 6 页面顶部区域风格统一（2026-06-18 14:19）

### 统一模板
```
bg-blue-900 text-white py-16 relative overflow-hidden
├── 装饰纹路 overlay（repeating-linear-gradient 45°）
├── h1（text-4xl md:text-5xl font-bold mb-3）
├── p subtitle（text-blue-200 text-lg max-w-2xl mb-3）
└── nav aria-label="Breadcrumb"（text-sm text-blue-200）
    ├── Home → / separator → Current page
```

### 每页改动

| 页面 | 改前 | 改后 |
|------|------|------|
| Products | 无纹路、无副标题、无 aria-label | ✅ 全加 |
| Solutions | bg-slate-900、py-20、text-center、无纹路、无面包屑 | → blue-900、py-16、左对齐、加纹路+面包屑 |
| About | 无副标题、无 aria-label | ✅ 加副标题+aria-label |
| Service | 无副标题、无 aria-label | ✅ 加副标题+aria-label |
| Blog | 无面包屑、无 aria-label | ✅ 加面包屑+aria-label |
| Contact | 无纹路、无面包屑、无 aria-label | ✅ 全加 + Link import |

### AI 可读性增强
- 每页副标题用简洁中文描述页面目的（关键词密集）
- `<nav aria-label="Breadcrumb">` 语义化
- 装饰纹路统一，视觉上形成整体感
- 所有 h1 统一 `text-4xl md:text-5xl font-bold`
