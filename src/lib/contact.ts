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
 * WhatsApp 二维码图片：`public/images/whatsapp-qr.png`（600×600，指向 wa.me/8618803189797）。
 * 后台 `site_config.qr_whatsapp` 配的就是这个路径。
 *
 * ⚠️ 换号码时二维码必须一起换，否则扫码进的是旧号码的聊天。
 *    重新生成：https://quickchart.io/qr?size=600&margin=2&ecLevel=M&dark=075E54&light=ffffff&text=https%3A%2F%2Fwa.me%2F<新号码>
 */
