# i18n 越南语/泰语翻译任务完成报告

## 任务目标
将 `src/lib/i18n.ts` 中所有 `vi` 和 `th` 值为英文的条目翻译为越南语和泰语。

## 执行结果
- **翻译条目数**: 100 条替换（涵盖 vi 和 th 两个字段）
- **保留未翻译条目**: 12 条（合理保留）
  - 越南语通用外来词: Blog, FAQ, Email, Website, Fax（th 已翻译）
  - 品牌名: WeChat
  - 占位符: 电话号码、URL路径、语言代码、邮箱、人名、公司名

## 额外修复
- 修复了 `i18n.ts` 中第106-107行的重复对象键 `'下载'` 问题（TypeScript 编译错误），将第二个键改为 `'下载页标题'`
- 同步更新了 `src/app/[locale]/download/page.tsx` 中 2 处 `tLabel('下载', 'Downloads', ...)` 调用为 `tLabel('下载页标题', 'Downloads', ...)`

## 构建验证
- `npx next build` ✅ 通过

## 翻译原则
- 丝网行业术语参照提供的术语表（Wire Mesh → Lưới thép / ตะแกรงลวด, Gabion → Rọ đá / เกเบี้ยน, 等）
- ISO 9001 / CE / WhatsApp / CAD 等保留原文
- `&apos;` 转义字符在 vi/th 中替换为正常字符
- 所有代码结构保持不变
