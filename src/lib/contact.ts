/**
 * 对外联系方式常量。
 *
 * 后台 `site_config` 表里也存了一份 whatsapp / phone（可在 admin 里改），
 * 但页面上的悬浮按钮与底部联系条是构建期渲染的，读不到数据库，
 * 所以这里放一份常量。**改号码时两处都要改**，否则页面上会出现两个号码。
 *
 * 格式：只保留数字，不带 + 与空格（wa.me 要求这种格式）。
 */
export const WHATSAPP_NUMBER = '8618803189797';
export const PHONE_DISPLAY = '+86 188 0318 9797';
export const CONTACT_EMAIL = 'annie@angumesh.com';

/**
 * Zalo：越南客户的主渠道，比 WhatsApp 在越南的装机率高得多。
 *
 * 这是 Zalo 名片里的二维码短链（`Angu Wire Mesh` 认领的名片），
 * **不是**手机号——用 +86 号码拼 zalo.me 只会跳到 Zalo 登录页，找不到人
 * （`lib/channels.ts` 里的 zaloId() 就是这么把 86 号挡掉的）。
 *
 * 手机上点这个链接：装了 Zalo 会直接被 App 接管打开名片，没装则落到网页版。
 * 换账号时用 Zalo App「个人资料 → 二维码」重新导出，替换下面这一行。
 */
export const ZALO_URL = 'https://zaloapp.com/qr/p/11abec7c7yf5m';

/**
 * 微信：**没法用链接直接加好友**（weixin:// 只能唤起 App，不能定位到人），
 * 所以移动端点击的策略是「复制号码 + 提示去微信搜索」，见 MobileContactBar。
 * 号码与 WhatsApp 同一个。
 */
export const WECHAT_ID = '8618803189797';
export const WECHAT_DISPLAY = '+86 188 0318 9797';

/**
 * WhatsApp 二维码图片：`public/images/whatsapp-qr.png`（600×600，指向 wa.me/8618803189797）。
 * 后台 `site_config.qr_whatsapp` 配的就是这个路径。
 *
 * ⚠️ 换号码时二维码必须一起换，否则扫码进的是旧号码的聊天。
 *    重新生成：https://quickchart.io/qr?size=600&margin=2&ecLevel=M&dark=075E54&light=ffffff&text=https%3A%2F%2Fwa.me%2F<新号码>
 */
