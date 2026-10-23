#!/usr/bin/env python3
"""Fix untranslated vi/th fields for specified products."""

import sqlite3

DB_PATH = "backend/inquiries.db"

# All translations: (product_id, field_name, vi_value, th_value)
# field_name is the base name without _vi/_th suffix
translations = [
    # === ID 40: active-slope-protection-net-dns50 ===
    # seo_keywords only
    (40, "seo_keywords",
     "bảo vệ mái dốc chủ động, lưới Tecco, chống đá rơi, hệ thống SNS, ổn định mái dốc, lưới đá, DNS-50, lưới G65/3",
     "ป้องกันความลาดชันแบบแอคทีฟ, ตาข่าย Tecco, ป้องกันหินร่วง, ระบบ SNS, ทำให้ความลาดชันมั่นคง, ตาข่ายหิน, DNS-50, ตาข่าย G65/3"),

    # === ID 41: passive-slope-protection-barrier-gl100 ===
    # short_description + seo_keywords
    (41, "short_description",
     "Hàng rào chống đá rơi thụ động GL-100 với khả năng chịu tải va đập 100kJ, được thiết kế cho các vùng đá rơi năng lượng cao dọc theo đường sắt và đường miền núi. Hệ thống lưới vòng với các phần tử hãm tiêu tan năng lượng.",
     "แนวกั้นหินร่วงแบบพาสซีฟ GL-100 ที่มีความสามารถรับแรงกระแทก 100kJ ออกแบบสำหรับพื้นที่หินร่วงพลังงานสูงตามแนวรถไฟและถนนภูเขา ระบบตาข่ายวงแหวนพร้อมองค์ประกอบดูดซับพลังงาน"),
    (41, "seo_keywords",
     "hàng rào chống đá rơi thụ động, hàng rào chắn đá, GL-100, lưới vòng, bảo vệ thụ động SNS, hàng rào đá rơi, rào chắn 100kJ",
     "แนวกั้นหินร่วงพาสซีฟ, รั้วดักหิน, GL-100, ตาข่ายวงแหวน, การป้องกันพาสซีฟ SNS, รั้วหินร่วง, แนวกั้น 100kJ"),

    # === ID 42: hesco-bastion-blast-wall-1x1x1m ===
    # seo_keywords only
    (42, "seo_keywords",
     "rào chắn Hesco, concertainer, rào chắn quân sự, tường chống nổ, rào chắn chống lũ, rào chắn phòng thủ, rào chắn gabion, đơn vị MIL",
     "เฮสโกบาสเตียน, concertainer, แนวกั้นทหาร, กำแพงกันระเบิด, แนวกั้นน้ำท่วม, แนวกั้นป้องกัน, แนวกั้นเกเบี้ยน, หน่วย MIL"),

    # === ID 43: blast-wall-panel-2x1x1m ===
    # seo_keywords only
    (43, "seo_keywords",
     "tấm tường chống nổ, Hesco gia cố, rào chắn quân sự, tường chống nổ 2m, rào chắn phòng thủ, bảo vệ FOB, gabion hạng nặng, concertainer",
     "แผงกำแพงกันระเบิด, เฮสโกเสริมแรง, แนวกั้นทหาร, กำแพงกันระเบิด 2m, แนวกั้นป้องกัน, การป้องกัน FOB, เกเบี้ยนหนัก, concertainer"),

    # === ID 44: galvanized-gabion-box-2x1x1m ===
    # short_description + seo_title + seo_keywords
    (44, "short_description",
     "Rọ đá mạ kẽm nhúng nóng 2m×1m×1m, kích thước tiêu chuẩn cho tường chắn và ổn định mái dốc. Lưới lục giác xoắn kép với dây gia cố viền. Chứng nhận CE EN 10223-3.",
     "ตะกร้าเกเบี้ยนชุบสังกะสีด้วยความร้อน 2m×1m×1m ขนาดมาตรฐานสำหรับกำแพงค้ำยันและทำให้ความลาดชันมั่นคง ตาข่ายหกเหลี่ยมบิดคู่พร้อมลวดเสริมขอบ ได้รับการรับรอง CE EN 10223-3"),
    (44, "seo_title",
     "Kích Thước Rọ Gabion Nào Nên Chọn Cho Thiết Kế Tường Chắn Cao 3m?",
     "ตะกร้าเกเบี้ยนขนาดใดที่ควรเลือกสำหรับการออกแบบกำแพงค้ำยันสูง 3m?"),
    (44, "seo_keywords",
     "rọ gabion, gabion mạ kẽm, rỏ đá, gabion tường chắn, gabion xoắn kép, lưới 80x100mm, bảo vệ mái dốc, bảo vệ bờ sông",
     "ตะกร้าเกเบี้ยน, เกเบี้ยนชุบสังกะสี, ตะกร้าหิน, เกเบี้ยนกำแพงค้ำยัน, เกเบี้ยนบิดคู่, ตาข่าย 80x100mm, ป้องกันความลาดชัน, ป้องกันตลิ่ง"),

    # === ID 45: reno-mattress-6x2x0.3m ===
    # short_description + seo_keywords
    (45, "short_description",
     "Đệm Reno 6m×2m×0.3m, giải pháp kỹ thuật thủy lợi cho bảo vệ bờ sông, chống xói mòn và lót kênh. Lưới mạ kẽm xoắn kép với vách ngăn mỗi 1m để đảm bảo tính toàn vẹn kết cấu.",
     "เบาะรีโน 6m×2m×0.3m วิธีการวิศวกรรมไฮดรอลิกสำหรับการป้องกันตลิ่ง การป้องกันการพังทลาย และการบุรางน้ำ ตาข่ายชุบสังกะสีบิดคู่พร้อมผนังกั้นทุก 1m เพื่อรักษาความสมบูรณ์ของโครงสร้าง"),
    (45, "seo_keywords",
     "đệm reno, đệm gabion, lót đáy sông, đệm chống xói mòn, bảo vệ kênh, chống xói lở, lưới 60x80mm",
     "เบาะรีโน, เบาะเกเบี้ยน, บุพื้นแม่น้ำ, เบาะป้องกันการพังทลาย, ป้องกันคลอง, ป้องกันการกัดเซาะ, ตาข่าย 60x80mm"),

    # === ID 47: reinforced-gabion-box-2x1x1m ===
    # short_description + seo_keywords
    (47, "short_description",
     "Rọ đá gia cố 2m×1m×1m với lưới địa kỹ thuật hai trục, được thiết kế cho tường chắn cao (>6m) và ổn định mái dốc chịu tải nặng. Gia cố lưới địa kỹ thuật tăng khả năng chịu kéo lên 300%.",
     "ตะกร้าเกเบี้ยนเสริมแรง 2m×1m×1m พร้อมตาข่ายเจโอกริดสองทิศทาง ออกแบบสำหรับกำแพงค้ำยันสูง (>6m) และทำให้ความลาดชันมั่นคงภายใต้น้ำหนักมหาศาล การเสริมด้วยเจโอกริดเพิ่มความต้านทางแรงดึง 300%"),
    (47, "seo_keywords",
     "gabion gia cố, gabion lưới địa kỹ thuật, gabion chịu tải nặng, gabion tường chắn cao, gabion chống động đất, gabion lưới địa kỹ thuật PP, gabion mái dốc dốc",
     "เกเบี้ยนเสริมแรง, เกเบี้ยนเจโอกริด, เกเบี้ยนรับน้ำหนักหนัก, เกเบี้ยนกำแพงสูง, เกเบี้ยนต้านแผ่นดินไหว, เกเบี้ยนเจโอกริด PP, เกเบี้ยนความลาดชันชัน"),

    # === ID 50: heavy-duty-blast-barrier-2.5m ===
    # short_description + seo_keywords
    (50, "short_description",
     "Rào chắn chống nổ hạng nặng 2.5m, cấp bảo mật cao nhất cho cơ sở quân sự, đại sứ quán và cơ sở hạ tầng quan trọng quốc gia. Gia cố thép đa lớp với khả năng chống va chạm.",
     "แนวกั้นกันระเบิดหนัก 2.5m ระดับความปลอดภัยสูงสุดสำหรับสถานที่ทหาร สถานทูต และโครงสร้างพื้นฐานสำคัญของชาติ เสริมเหล็กหลายชั้นพร้อมความสามารถต้านทานการพุ่งชน"),
    (50, "seo_keywords",
     "rào chắn chống nổ hạng nặng, hàng rào an ninh tối đa, hàng rào cơ sở hạt nhân, lưới 358 5.0mm, rào chắn chống va chạm, hàng rào an ninh cao, vòng đai quân sự",
     "แนวกั้นกันระเบิดหนัก, รั้วความปลอดภัยสูงสุด, รั้วสถานที่นิวเคลียร์, ตาข่าย 358 5.0mm, แนวกั้นต้านการพุ่งชน, รั้วความปลอดภัยสูง, เขตรอบทหาร"),

    # === ID 53: equipment-noise-barrier-2.5m ===
    # short_description + seo_title + seo_keywords
    (53, "short_description",
     "Rào chắn âm thanh thiết bị 2.5m, được thiết kế để bao quanh máy móc công nghiệp và đáp ứng giới hạn phát thải tiếng ồn môi trường. Hệ thống tấm mô-đun linh hoạt cho việc bố trí quanh máy phát điện, máy nén và dây chuyền sản xuất.",
     "แนวกั้นเสียงอุปกรณ์ 2.5m ออกแบบเพื่อล้อมรอบเครื่องจักรอุตสาหกรรมและปฏิบัติตามขีดจำกัดการปล่อยเสียงรบกวนทางสิ่งแวดล้อม ระบบแผงแบบโมดูลที่ยืดหยุ่นสำหรับการจัดวางรอบเครื่องกำเนิดไฟฟ้า คอมเพรสเซอร์ และสายการผลิต"),
    (53, "seo_title",
     "Rào Chắn Âm Thanh Thiết Bị Công Nghiệp 2.5m Giảm Được Bao Nhiêu Decibel?",
     "แนวกั้นเสียงอุปกรณ์อุตสาหกรรม 2.5m ลดเสียงได้กี่เดซิเบลจริง?"),
    (53, "seo_keywords",
     "rào chắn tiếng ồn thiết bị, tấm âm học, rào chắn âm thanh, vách ngăn tiếng ồn, NRC 0.85, kiểm soát tiếng ồn công nghiệp, tấm len khoáng",
     "แนวกั้นเสียงอุปกรณ์, แผงอะคูสติก, แนวกั้นเสียง, กล่องกันเสียง, NRC 0.85, ควบคุมเสียงอุตสาหกรรม, แผงขนสัตว์"),

    # === ID 54: factory-noise-barrier-4m ===
    # seo_title + seo_keywords
    (54, "seo_title",
     "Tường Chắn Tiếng Ồn Nhà Máy Cao Bao Nhiêu Cần Cho Giảm Âm Toàn Bộ Vòng Đai Nhà Máy?",
     "กำแพงกันเสียงโรงงานสูงเท่าใดที่จำเป็นสำหรับการลดเสียงรอบขอบเขตโรงงาน?"),
    (54, "seo_keywords",
     "rào chắn tiếng ồn nhà máy, tường âm công nghiệp, rào chắn tiếng ồn 4m, tường tấm âm học, kiểm soát tiếng ồn nhà máy, vách ngăn tiếng ồn công nghiệp",
     "แนวกั้นเสียงโรงงาน, กำแพงเสียงอุตสาหกรรม, แนวกั้นเสียง 4m, กำแพงแผงอะคูสติก, ควบคุมเสียงโรงงาน, กล่องกันเสียงอุตสาหกรรม"),

    # === ID 58: rail-transit-noise-barrier ===
    # short_description + seo_keywords
    (58, "short_description",
     "Rào chắn âm thanh giao thông đường sắt cho hệ thống metro và đường sắt nhẹ, được thiết kế để giảm tiếng ồn tần số thấp của tàu. Chịu được áp lực khí động từ tàu chạy qua. Tuân thủ tiêu chuẩn âm học riêng biệt của đường sắt.",
     "แนวกั้นเสียงระบบรางสำหรับรถไฟใต้ดินและรถไฟรางเบา ออกแบบเพื่อลดเสียงรบกวนความถี่ต่ำของรถไฟ ทนต่อแรงดันอากาศพลศาสตร์จากรถไฟที่แล่นผ่าน ปฏิบัติตามมาตรฐานเสียงเฉพาะทางรถไฟ"),
    (58, "seo_keywords",
     "rào chắn tiếng ồn đường sắt, rào chắn âm metro, rào chắn âm đường sắt nhẹ, tấm âm học đường sắt, kiểm soát tiếng ồn giao thông, rào chắn đường sắt trên cao",
     "แนวกั้นเสียงรถไฟ, แนวกั้นเสียงรถไฟใต้ดิน, แนวกั้นเสียงรถไฟรางเบา, แผงอะคูสติกรถไฟ, ควบคุมเสียงระบบขนส่ง, แนวกั้นรถไฟยกระดับ"),
]

def main():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    updated = 0
    for pid, field, vi_val, th_val in translations:
        vi_field = f"{field}_vi"
        th_field = f"{field}_th"
        cur.execute(f"UPDATE products SET {vi_field}=?, {th_field}=? WHERE id=?",
                     (vi_val, th_val, pid))
        if cur.rowcount > 0:
            updated += 1
            print(f"  ✓ ID {pid}: updated {vi_field} & {th_field}")
        else:
            print(f"  ✗ ID {pid}: NO ROW UPDATED")

    conn.commit()
    print(f"\nTotal products updated: {updated}")
    print(f"Total fields updated: {updated * 2}")

    # Verify
    print("\n=== VERIFICATION ===")
    ids = [40,41,42,43,44,45,47,50,53,54,58]
    issues = 0
    for pid in ids:
        cur.execute("""SELECT id, slug,
            short_description_en, short_description_vi, short_description_th,
            seo_title_en, seo_title_vi, seo_title_th,
            seo_keywords_en, seo_keywords_vi, seo_keywords_th
            FROM products WHERE id=?""", (pid,))
        r = cur.fetchone()
        fields = [
            ("short_description", r[2], r[3], r[4]),
            ("seo_title", r[5], r[6], r[7]),
            ("seo_keywords", r[8], r[9], r[10]),
        ]
        for fname, en, vi, th in fields:
            if vi == en and en:
                print(f"  ⚠ ID {pid} {fname}_vi still equals EN!")
                issues += 1
            if th == en and en:
                print(f"  ⚠ ID {pid} {fname}_th still equals EN!")
                issues += 1

    print(f"\nRemaining issues: {issues}")

    # Also run the full verification from the task
    print("\n=== FULL DATABASE VERIFICATION ===")
    cur.execute("""SELECT id, slug,
      short_description_en, short_description_vi, short_description_th,
      seo_title_en, seo_title_vi, seo_title_th,
      seo_keywords_en, seo_keywords_vi, seo_keywords_th
    FROM products ORDER BY id""")
    all_issues = 0
    for r in cur.fetchall():
        for f in ['short_description', 'seo_title', 'seo_keywords']:
            if f == 'short_description':
                en, vi, th = r[2], r[3], r[4]
            elif f == 'seo_title':
                en, vi, th = r[5], r[6], r[7]
            else:
                en, vi, th = r[8], r[9], r[10]
            if vi == en and en:
                all_issues += 1
            if th == en and en:
                all_issues += 1
    print(f"Total issues in entire database: {all_issues}")

    conn.close()

if __name__ == "__main__":
    main()
