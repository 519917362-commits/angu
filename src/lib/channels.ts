/**
 * 沟通渠道可用性判定 —— 「有没有真实账号」只在这里判断。
 *
 * 为什么需要这个文件：
 * 站上以前给 Zalo / LINE 都写了兜底值——Zalo 回落到 +86 手机号，LINE 回落到
 * 'anguwiremesh'。于是越南语页面渲染出 https://zalo.me/8618803189797，
 * 点开只会跳到 Zalo 的登录页，找不到任何人；泰语页面的 LINE ID 也从未注册过。
 * 投放广告时这些死链是直接烧钱。
 *
 * 现在的规则：**后台没填真实账号，就不渲染这个入口**。
 * 广告后台「转化 > 网站点击」如果要统计某个渠道，也必须先有这个入口。
 *
 * 在 `site_config` 里填入真实账号后，页面会自动出现该渠道，不需要改代码。
 */

/** WhatsApp：wa.me 要求纯数字（含国家码、不带 +），长度 10–15 位 */
export function whatsappNumber(raw?: string | null): string {
  const digits = (raw || '').replace(/[^0-9]/g, '');
  return digits.length >= 10 && digits.length <= 15 ? digits : '';
}

/**
 * Zalo：只对越南号码（+84）有效。
 * 传进来的必须是 84 开头的 11–12 位数字，其余（含 +86 的手机号）一律当作「没有 Zalo」。
 * 这样即使后台误把联系电话填进 Zalo 字段，也不会渲染出死链。
 */
export function zaloId(raw?: string | null): string {
  const digits = (raw || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('0084')) return zaloId(digits.slice(2));
  return /^84\d{9,10}$/.test(digits) ? digits : '';
}

/**
 * LINE ID：官方规则是 4–20 位、字母数字加 . _ -、且不能是纯数字。
 * 这里额外兼容后台被填成 https://line.me/ti/p/~xxx 的情况，自动抽出 ID。
 */
export function lineId(raw?: string | null): string {
  const v = (raw || '').trim();
  if (!v) return '';
  const fromUrl = v.match(/line\.me\/ti\/p\/~?([A-Za-z0-9._-]+)/i);
  const id = (fromUrl ? fromUrl[1] : v).replace(/^@/, '');
  if (!/^[A-Za-z0-9._-]{4,20}$/.test(id)) return '';
  if (/^\d+$/.test(id)) return '';
  return id;
}

/** Facebook 主页：必须是完整的 http(s) 地址，空值或占位符一律不渲染 */
export function facebookUrl(raw?: string | null): string {
  const v = (raw || '').trim();
  if (!/^https?:\/\//i.test(v)) return '';
  return /^https?:\/\/[^\s/]+\.[^\s]+$/i.test(v) ? v : '';
}
