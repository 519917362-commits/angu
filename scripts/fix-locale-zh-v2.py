#!/usr/bin/env python3
"""Fix remaining locale === 'zh' hardcoded ternaries across all frontend files."""
import re, os

files = [
    'src/app/[locale]/about/page.tsx',
    'src/app/[locale]/contact/layout.tsx',
    'src/app/[locale]/contact/page.tsx',
    'src/app/[locale]/products/page.tsx',
    'src/app/[locale]/products/layout.tsx',
    'src/app/[locale]/solutions/page.tsx',
    'src/app/[locale]/blog/page.tsx',
    'src/app/[locale]/blog/[slug]/page.tsx',
    'src/app/[locale]/service/page.tsx',
    'src/app/[locale]/service/faq/page.tsx',
    'src/app/[locale]/download/page.tsx',
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

EXTRA_LABELS = [
    ("全球客户", "Global Clients", "Khách hàng toàn cầu", "ลูกค้าทั่วโลก"),
    ("全部产品", "All Products", "Tất cả sản phẩm", "สินค้าทั้งหมด"),
    ("行业解决方案", "Solutions", "Giải pháp ngành", "โซลูชันอุตสาหกรรม"),
    ("我们的服务", "Our Services", "Dịch vụ", "บริการของเรา"),
    ("行业博客", "Blog", "Blog ngành", "บล็อกอุตสาหกรรม"),
    ("浏览更多", "Explore More", "Khám phá thêm", "สำรวจเพิ่มเติม"),
    ("首页", "Home", "Trang chủ", "หน้าแรก"),
    ("关于我们", "About", "Về chúng tôi", "เกี่ยวกับเรา"),
    ("产品", "Products", "Sản phẩm", "สินค้า"),
    ("解决方案", "Solutions", "Giải pháp", "โซลูชัน"),
    ("服务", "Services", "Dịch vụ", "บริการ"),
    ("博客", "Blog", "Blog", "บล็อก"),
    ("联系我们", "Contact Us", "Liên hệ", "ติดต่อเรา"),
    ("常见问题", "FAQ", "FAQ", "คำถามที่พบบ่อย"),
    ("下载中心", "Download Center", "Tải xuống", "ศูนย์ดาวน์โหลด"),
    ("产品目录", "Product Catalog", "Danh mục sản phẩm", "แคตตาล็อกสินค้า"),
    ("在线询价", "Get Quote", "Nhận báo giá", "ขอใบเสนอราคา"),
    ("发送询盘", "Send Inquiry", "Gửi yêu cầu", "ส่งการสอบถาม"),
    ("姓名", "Name", "Tên", "ชื่อ"),
    ("邮箱", "Email", "Email", "อีเมล"),
    ("电话", "Phone", "Điện thoại", "โทรศัพท์"),
    ("公司", "Company", "Công ty", "บริษัท"),
    ("留言", "Message", "Tin nhắn", "ข้อความ"),
    ("提交", "Submit", "Gửi", "ส่ง"),
    ("公司名称", "Company Name", "Tên công ty", "ชื่อบริษัท"),
    ("官网", "Website", "Website", "เว็บไซต์"),
    ("地址", "Address", "Địa chỉ", "ที่อยู่"),
    ("传真", "Fax", "Fax", "แฟกซ์"),
    ("微信", "WeChat", "WeChat", "WeChat"),
    ("邮箱地址", "Email Address", "Địa chỉ email", "ที่อยู่อีเมล"),
    ("电话号码", "Phone Number", "Số điện thoại", "หมายเลขโทรศัพท์"),
    ("产品兴趣", "Product Interest", "Sản phẩm quan tâm", "สินค้าที่สนใจ"),
    ("请选择", "Please select", "Vui lòng chọn", "กรุณาเลือก"),
    ("验证码", "Verification", "Xác minh", "การยืนยัน"),
    ("发送", "Send", "Gửi", "ส่ง"),
    ("必填", "Required", "Bắt buộc", "จำเป็น"),
    ("选填", "Optional", "Tùy chọn", "ไม่บังคับ"),
    ("查看详情 →", "View Details →", "Xem chi tiết →", "ดูรายละเอียด →"),
    ("返回首页", "Back to Home", "Về trang chủ", "กลับหน้าแรก"),
    ("下一页", "Next", "Tiếp", "ถัดไป"),
    ("上一页", "Previous", "Trước", "ก่อนหน้า"),
    ("相关产品", "Related Products", "Sản phẩm liên quan", "สินค้าที่เกี่ยวข้อง"),
    ("产品规格", "Specifications", "Thông số kỹ thuật", "ข้อมูลจำเพาะ"),
    ("应用领域", "Applications", "Ứng dụng", "การประยุกต์ใช้"),
    ("产品描述", "Description", "Mô tả", "คำอธิบาย"),
    ("立即询价", "Inquire Now", "Hỏi giá ngay", "สอบถามตอนนี้"),
    ("获取报价", "Get Quote", "Nhận báo giá", "ขอใบเสนอราคา"),
    ("了解更多 →", "Learn More →", "Tìm hiểu thêm →", "เรียนรู้เพิ่มเติม →"),
    ("查看全部", "View All", "Xem tất cả", "ดูทั้งหมด"),
    ("精选产品", "Featured Products", "Sản phẩm nổi bật", "สินค้าแนะนำ"),
    ("公司简介", "About Company", "Về công ty", "เกี่ยวกับบริษัท"),
    ("我们的优势", "Our Advantages", "Lợi thế của chúng tôi", "ข้อได้เปรียบของเรา"),
    ("质量保证", "Quality Assurance", "Đảm bảo chất lượng", "การประกันคุณภาพ"),
    ("快速交付", "Fast Delivery", "Giao hàng nhanh", "จัดส่งรวดเร็ว"),
    ("工厂直供", "Factory Direct", "Nhà máy trực tiếp", "โรงงานตรง"),
    ("出口全球", "Global Export", "Xuất khẩu toàn cầu", "ส่งออกทั่วโลก"),
]

# Add extra labels to i18n.ts
with open('src/lib/i18n.ts') as f:
    i18n = f.read()

existing_zh = set(re.findall(r"'([^']+)':\s*\{", i18n))

new_entries = []
for zh, en, vi, th in EXTRA_LABELS:
    if zh not in existing_zh:
        zh0 = zh.replace("'", "\\'")
        en0 = en.replace("'", "\\'")
        vi0 = vi.replace("'", "\\'")
        th0 = th.replace("'", "\\'")
        new_entries.append(f"    '{zh0}': {{ zh: '{zh0}', en: '{en0}', vi: '{vi0}', th: '{th0}' }}")

if new_entries:
    insert_pos = i18n.rfind('  };')
    i18n = i18n[:insert_pos] + ',\n'.join(new_entries) + ',\n' + i18n[insert_pos:]
    with open('src/lib/i18n.ts', 'w') as f:
        f.write(i18n)
    print(f"Added {len(new_entries)} new labels to i18n.ts")


def process_file(fp):
    if not os.path.exists(fp):
        return 0
    with open(fp) as f:
        c = f.read()
    orig = c
    changes = [0]  # Use list for mutable closure

    # Replace obj.field_zh : obj.field_en with pickLocale
    def repl_pick(m):
        return f"pickLocale({m.group(1)}, '{m.group(2)}', locale)"
    c, n = re.subn(
        r"locale\s*===\s*'zh'\s*\?\s*(\w+(?:\.\w+)?)\.(\w+)_zh\s*:\s*\1\.\2_en",
        repl_pick, c
    )
    changes[0] += n

    # Replace hardcoded label ternaries
    for zh, en, vi, th in EXTRA_LABELS:
        zh_esc = zh.replace("'", "\\'")
        en_esc = en.replace("'", "\\'")
        pattern = f"locale === 'zh' ? '{zh_esc}' : '{en_esc}'"
        if pattern in c:
            c = c.replace(pattern, f"tLabel('{zh_esc}', '{en_esc}', locale)")
            changes[0] += 1

    # Aggressive: replace any remaining simple locale === 'zh' ? '...' : '...'
    def repl_simple(m):
        changes[0] += 1
        return f"tLabel('{m.group(1)}', '{m.group(2)}', locale)"
    c = re.sub(r"locale === 'zh' \? '([^']+)' : '([^']+)'", repl_simple, c)

    # Also handle isZh ? '...' : '...'
    def repl_iszh(m):
        changes[0] += 1
        return f"tLabel('{m.group(1)}', '{m.group(2)}', locale)"
    c = re.sub(r"isZh \? '([^']+)' : '([^']+)'", repl_iszh, c)

    if changes[0] == 0:
        return 0

    # Ensure imports
    needs = []
    if 'tLabel(' in c and 'tLabel' not in (re.search(r"import\s+\{([^}]+)\}\s+from\s+'@/lib/i18n'", c) or type('',(object,),{'group':lambda s,n:''})()).group(1):
        needs.append('tLabel')
    if 'pickLocale(' in c:
        existing = re.search(r"import\s+\{([^}]+)\}\s+from\s+'@/lib/i18n'", c)
        if existing:
            if 'pickLocale' not in existing.group(1):
                needs.append('pickLocale')
        else:
            needs.append('pickLocale')

    if needs:
        existing_i18n = re.search(r"import\s+\{([^}]+)\}\s+from\s+'@/lib/i18n'", c)
        if existing_i18n:
            current = existing_i18n.group(1).strip()
            for name in needs:
                if name not in current:
                    current = current + ', ' + name
            c = c[:existing_i18n.start()] + f"import {{ {current} }} from '@/lib/i18n';" + c[existing_i18n.end():]
        else:
            lines = c.split('\n')
            last_import = -1
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    last_import = i
            if last_import >= 0:
                lines.insert(last_import + 1, f"import {{ {', '.join(needs)} }} from '@/lib/i18n';")
                c = '\n'.join(lines)

    if c != orig:
        with open(fp, 'w') as f:
            f.write(c)
        remaining = c.count("locale === 'zh'") + c.count("isZh ?")
        print(f"FIXED: {fp} ({changes[0]} changes, remaining: {remaining})")
    return changes[0]


total = 0
for fp in files:
    total += process_file(fp)

print(f"\nTotal changes: {total}")
