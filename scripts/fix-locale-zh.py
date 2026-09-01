#!/usr/bin/env python3
"""Replace locale === 'zh' patterns across all frontend files."""
import re

files_to_fix = [
    'src/app/[locale]/page.tsx',
    'src/app/[locale]/products/page.tsx',
    'src/app/[locale]/products/[slug]/page.tsx',
    'src/app/[locale]/solutions/page.tsx',
    'src/app/[locale]/blog/[slug]/page.tsx',
    'src/app/[locale]/download/page.tsx',
    'src/app/[locale]/service/page.tsx',
    'src/app/[locale]/contact/page.tsx',
    'src/app/[locale]/not-found.tsx',
    'src/app/not-found.tsx',
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/MobileNav.tsx',
    'src/components/products/ProductCard.tsx',
    'src/components/products/FaqSection.tsx',
    'src/components/inquiry/InquiryModal.tsx',
    'src/components/inquiry/InquiryButtonLarge.tsx',
]

# Common label translations for UI chrome
LABEL_MAP = [
    ("首页", "Home", "Trang chủ", "หน้าแรก"),
    ("产品", "Products", "Sản phẩm", "สินค้า"),
    ("解决方案", "Solutions", "Giải pháp", "โซลูชัน"),
    ("关于我们", "About Us", "Về chúng tôi", "เกี่ยวกับเรา"),
    ("服务", "Services", "Dịch vụ", "บริการ"),
    ("博客", "Blog", "Blog", "บล็อก"),
    ("联系我们", "Contact Us", "Liên hệ", "ติดต่อเรา"),
    ("查看全部产品 →", "View All Products →", "Xem tất cả sản phẩm →", "ดูสินค้าทั้งหมด →"),
    ("详情 →", "Details →", "Chi tiết →", "รายละเอียด →"),
    ("价格面议", "Price on request", "Giá thương lượng", "ราคาตามคำขอ"),
    ("起订量:", "MOQ:", "SL đặt tối thiểu:", "จำนวนสั่งขั้นต่ำ:"),
    ("★ 精选", "★ Featured", "★ Nổi bật", "★ แนะนำ"),
    ("产品未找到", "Product Not Found", "Không tìm thấy sản phẩm", "ไม่พบสินค้า"),
    ("文章未找到", "Post Not Found", "Không tìm thấy bài viết", "ไม่พบบทความ"),
    ("安固丝网 — 中国丝网之都的制造商", "Angu Wire Mesh — Manufacturer from China's Wire Mesh Capital",
     "Angu Wire Mesh — Nhà sản xuất từ thủ phủ lưới thép Trung Quốc",
     "Angu Wire Mesh — ผู้ผลิตจากเมืองหลวงตะแกรงลวดของจีน"),
    ("丝网类 · 护栏网 · 石笼网 · 防护网 · 声屏障",
     "Wire Mesh · Gabion · Fencing · Protection · Noise Barrier",
     "Lưới thép · Rọ đá · Hàng rào · Bảo vệ · Cách âm",
     "ตะแกรงลวด · เกเบี้ยน · รั้ว · การป้องกัน · แผงกั้นเสียง"),
    ("您好，我对贵司产品很感兴趣。",
     "Hello, I'm interested in your products.",
     "Xin chào, tôi quan tâm đến sản phẩm của quý công ty.",
     "สวัสดี ฉันสนใจผลิตภัณฑ์ของคุณ"),
    ("页面未找到", "Page Not Found", "Không tìm thấy trang", "ไม่พบหน้า"),
    ("返回首页 →", "Back to Home →", "Quay về trang chủ →", "กลับหน้าแรก →"),
    ("您访问的页面不存在", "The page you are looking for does not exist",
     "Trang bạn đang tìm kiếm không tồn tại",
     "หน้าเว็บที่คุณกำลังค้นหาไม่มีอยู่"),
    ("丝网类 · 护栏网 · 石笼网 · 边坡防护 · 声屏障",
     "Wire Mesh · Fencing · Gabion · Protection · Noise Barrier",
     "Lưới thép · Hàng rào · Rọ đá · Bảo vệ · Cách âm",
     "ตะแกรงลวด · รั้ว · เกเบี้ยน · การป้องกัน · แผงกั้นเสียง"),
]


def make_L():
    entries = []
    for zh, en, vi, th in sorted(LABEL_MAP, key=lambda x: x[0]):
        zh0 = zh.replace("'", "\\'").replace("\\", "\\\\")
        en0 = en.replace("'", "\\'")
        vi0 = vi.replace("'", "\\'")
        th0 = th.replace("'", "\\'")
        entries.append(f"    ['{zh0}']: {{ zh: '{zh0}', en: '{en0}', vi: '{vi0}', th: '{th0}' }}")
    return """
/** Translate hardcoded UI labels for 4 locales */
function L(zh: string, en: string, locale: string): string {
  const map: Record<string, Record<string, string>> = {
""" + ",\n".join(entries) + """
  };
  return map[zh]?.[locale] || map[zh]?.en || en;
}
"""


def process_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"  SKIP (not found): {filepath}")
        return 0

    original = content
    changes = 0

    # 1. Replace obj.field_zh : obj.field_en patterns with pickLocale
    def repl_pick(m):
        return f"pickLocale({m.group(1)}, '{m.group(2)}', locale)"

    content, n = re.subn(
        r"locale\s*===\s*'zh'\s*\?\s*(\w+(?:\.\w+)?)\.(\w+)_zh\s*:\s*\1\.\2_en",
        repl_pick, content
    )
    changes += n

    # 2. Replace hardcoded label ternaries
    for zh, en, vi, th in LABEL_MAP:
        zh_esc = zh.replace("'", "\\'")
        en_esc = en.replace("'", "\\'")
        pattern = f"locale === 'zh' ? '{zh}' : '{en}'"
        if pattern in content:
            content = content.replace(pattern, f"L('{zh_esc}', '{en_esc}', locale)")
            changes += 1

    if changes == 0:
        return 0

    # 3. Add import if pickLocale was used
    if 'pickLocale(' in content and "import { pickLocale }" not in content:
        m = re.search(r"(import [^;]+ from '@/lib/[^']*';)", content)
        if m:
            insert_pos = m.end()
            content = content[:insert_pos] + "\nimport { pickLocale } from '@/lib/i18n';" + content[insert_pos:]
        else:
            # After the last import line
            lines = content.split('\n')
            last_import = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import = i + 1
            lines.insert(last_import, "import { pickLocale } from '@/lib/i18n';")
            content = '\n'.join(lines)

    # 4. Add L() helper if used
    if 'L(' in content and 'function L(' not in content:
        m = re.search(r"(export\s+default\s+function\s+\w+)", content)
        if m:
            content = content[:m.start()] + make_L() + "\n" + content[m.start():]

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"  FIXED: {filepath} ({changes} changes)")
    return changes


total = 0
for fp in files_to_fix:
    total += process_file(fp)

print(f"\nTotal changes across {len(files_to_fix)} files: {total}")
