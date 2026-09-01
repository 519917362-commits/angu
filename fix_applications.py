#!/usr/bin/env python3
"""Fix applications_vi and applications_th by replacing all Chinese chars with pure Vietnamese/Thai."""
import sqlite3
import json
import re

DB_PATH = "/Users/anxiang/.qclaw/workspace-agent-4fb505c4/paiqi-wiremesh/backend/inquiries.db"

def has_chinese(s):
    """Check if string contains Chinese characters."""
    return bool(re.search(r'[\u4e00-\u9fff]', s))

# Translation mappings per product slug
# Format: {slug: {"vi": [new_vi_list], "th": [new_th_list]}}
TRANSLATIONS = {
    "active-slope-protection-net-dns50": {
        "vi": [
            "Mái dốc đào đường bộ",
            "Hành lang đường sắt",
            "Vách cao khai thác mỏ",
            "Mái dốc mỏ đá",
            "Mái dốc đô thị",
            "Đập thủy điện",
            "Cửa hầm"
        ],
        "th": [
            "ทางลาดขุดถนน",
            "ทางรถไฟ走廊",
            "ผนังสูงเหมืองแร่",
            "ทางลาดเหมืองหิน",
            "ทางลาดเมือง",
            "เขื่อนไฟฟ้าพลังน้ำ",
            "ปากอุโมงค์"
        ]
    },
    "passive-slope-protection-barrier-gl100": {
        "vi": [
            "Khu vực đá rơi đường bộ",
            "Tuyến đường sắt",
            "Đường vùng núi",
            "Cơ sở công nghiệp",
            "Khu dân cư",
            "Đường dây truyền tải điện",
            "Tuyến đường ống"
        ],
        "th": [
            "พื้นที่หินร่วงบนถนน",
            "เส้นทางรถไฟ",
            "ถนนภูเขา",
            "สิ่งอำนวยความสะดวกอุตสาหกรรม",
            "เขตที่อยู่อาศัย",
            "สายส่งไฟฟ้า",
            "แนวท่อ"
        ]
    },
    "hesco-bastion-blast-wall-1x1x1m": {
        "vi": [
            "Bảo vệ lực lượng quân sự",
            "Tường Chống Nổ",
            "Kiểm soát lũ",
            "Kiểm soát xói mòn",
            "Bảo vệ trạm kiểm soát",
            "Hầm lưu trữ đạn dược",
            "Cơ sở hạ tầng dân sự quan trọng"
        ],
        "th": [
            "ป้องกันกำลังพลทหาร",
            "กำแพงกันระเบิด",
            "ควบคุมน้ำท่วม",
            "ควบคุมการกัดเซาะ",
            "ป้องกันด่านตรวจ",
            "บังเกอร์เก็บกระสุน",
            "โครงสร้างพื้นฐานพลเรือนสำคัญ"
        ]
    },
    "blast-wall-panel-2x1x1m": {
        "vi": [
            "Căn cứ tác chiến tiền phương",
            "Hầm lưu trữ đạn dược",
            "Trạm kiểm tra xe cộ",
            "Bảo vệ sân bay",
            "Cụm công trình đại sứ quán",
            "Cơ sở dầu khí",
            "Cơ sở hạ tầng quan trọng"
        ],
        "th": [
            "ฐานปฏิบัติการแนวหน้า",
            "บังเกอร์เก็บกระสุน",
            "ด่านตรวจรถ",
            "ป้องกันสนามบิน",
            "กลุ่มอาคารสถานทูต",
            "สิ่งอำนวยความสะดวกน้ำมันและก๊าซ",
            "โครงสร้างพื้นฐานสำคัญ"
        ]
    },
    "galvanized-gabion-box-2x1x1m": {
        "vi": [
            "Tường Chắn Đất",
            "Bảo vệ bờ sông",
            "Ổn định mái dốc",
            "Bảo vệ mố cầu",
            "Bảo vệ bờ biển",
            "Tấm chắn tiếng ồn",
            "Công trình cảnh quan"
        ],
        "th": [
            "กำแพงกันดิน",
            "ป้องกันตลิ่ง",
            "เสถียรภาพลาดเอียง",
            "ป้องกันตอม่อสะพาน",
            "ป้องกันชายฝั่ง",
            "แผงกั้นเสียง",
            "วิศวกรรมภูมิทัศน์"
        ]
    },
    "reno-mattress-6x2x0.3m": {
        "vi": [
            "Lót lòng sông",
            "Lót kênh mương",
            "Bảo vệ đê điều",
            "Bảo vệ đường ống",
            "Chống xói mòn trụ cầu",
            "Lót đập tràn",
            "Xây dựng đất ngập nước"
        ],
        "th": [
            "บุพื้นท้องน้ำ",
            "บุพื้นคลอง",
            "ป้องกันคันกั้นน้ำ",
            "ป้องกันท่อ",
            "ป้องกันการกัดเซาะตอม่อสะพาน",
            "บุพื้นทางระบายน้ำล้นเขื่อน",
            "ก่อสร้างพื้นที่ชุ่มน้ำ"
        ]
    },
    "pvc-coated-gabion-box-2x1x1m": {
        "vi": [
            "Bảo vệ bờ biển",
            "Công trình biển",
            "Bảo vệ cửa sông",
            "Ngăn chặn công nghiệp",
            "Tấm chắn tiếng ồn đường bộ (khu vực sương muối)",
            "Công trình cảnh quan",
            "Nuôi trồng thủy sản"
        ],
        "th": [
            "ป้องกันชายฝั่ง",
            "วิศวกรรมทางทะเล",
            "ป้องกันปากแม่น้ำ",
            "การกักเก็บอุตสาหกรรม",
            "แผงกั้นเสียงบนถนน (พื้นที่ละอองเกลือ)",
            "วิศวกรรมภูมิทัศน์",
            "การเพาะเลี้ยงสัตว์น้ำ"
        ]
    },
    "reinforced-gabion-box-2x1x1m": {
        "vi": [
            "Tường chắn đất cao (5-10m)",
            "Mố cầu",
            "Ổn định dốc đứng (70-90°)",
            "Mỏ đá khai thác",
            "Kết cấu chống động đất",
            "Tường chắn chống nổ",
            "Cơ sở hạ tầng đô thị"
        ],
        "th": [
            "กำแพงกันดินสูง (5-10m)",
            "ตอม่อสะพาน",
            "เสถียรภาพทางลาดชัน (70-90°)",
            "เหมืองหิน",
            "โครงสร้างต้านแผ่นดินไหว",
            "กำแพงกันระเบิด",
            "โครงสร้างพื้นฐานเมือง"
        ]
    },
    "heavy-duty-blast-barrier-2.5m": {
        "vi": [
            "Nhà máy điện hạt nhân",
            "Cơ sở quân sự",
            "Biên giới quốc gia",
            "Cụm công trình chính phủ",
            "Cơ sở hạ tầng quan trọng",
            "Công nghiệp quốc phòng",
            "Đại sứ quán (khu vực đe dọa cao)"
        ],
        "th": [
            "โรงไฟฟ้านิวเคลียร์",
            "สิ่งอำนวยความสะดวกทางทหาร",
            "ชายแดนประเทศ",
            "กลุ่มอาคารรัฐบาล",
            "โครงสร้างพื้นฐานสำคัญ",
            "อุตสาหกรรมป้องกันประเทศ",
            "สถานทูต (พื้นที่ภัยคุกคามสูง)"
        ]
    },
    "highway-noise-barrier-3m": {
        "vi": [
            "Đường cao tốc",
            "Đường trục chính đô thị",
            "Đường dẫn nút giao",
            "Trạm thu phí",
            "Đường phụ",
            "Xe buýt nhanh",
            "Trường học & bệnh viện"
        ],
        "th": [
            "ทางด่วน",
            "ถนนสายหลักเมือง",
            "ทางลาดต่างระดับ",
            "ด่านเก็บค่าผ่านทาง",
            "ถนนบริการ",
            "รถโดยสารด่วนพิเศษ",
            "โรงเรียนและโรงพยาบาล"
        ]
    },
    "equipment-noise-barrier-2.5m": {
        "vi": [
            "Thiết bị phát điện",
            "Hệ thống HVAC",
            "Khí nén",
            "Máy bơm",
            "Thiết bị sản xuất",
            "Dầu khí",
            "Trung tâm dữ liệu"
        ],
        "th": [
            "อุปกรณ์ผลิตไฟฟ้า",
            "ระบบ HVAC",
            "อากาศอัด",
            "เครื่องสูบน้ำ",
            "อุปกรณ์การผลิต",
            "น้ำมันและก๊าซ",
            "ศูนย์ข้อมูล"
        ]
    },
    "factory-noise-barrier-4m": {
        "vi": [
            "Nhà máy điện",
            "Nhà máy thép sắt",
            "Nhà máy xi măng",
            "Hóa chất khai thác mỏ",
            "Kho bãi & logistics",
            "Khu thiết bị thi công",
            "Công nghiệp nặng"
        ],
        "th": [
            "โรงไฟฟ้า",
            "โรงงานเหล็ก",
            "โรงงานปูนซีเมนต์",
            "เคมีเหมืองแร่",
            "คลังสินค้าและโลจิสติกส์",
            "พื้นที่อุปกรณ์ก่อสร้าง",
            "อุตสาหกรรมหนัก"
        ]
    },
    "rail-transit-noise-barrier": {
        "vi": [
            "Đoạn khu dân cư đường sắt ngầm",
            "Đường sắt nhẹ đô thị",
            "Đường sắt liên tỉnh",
            "Giao thông cầu cạn",
            "Đường sắt cao tốc",
            "Sân ga nhà ga",
            "Bảo dưỡng depot"
        ],
        "th": [
            "ช่วงชุมชนรถไฟใต้ดิน",
            "รถไฟฟ้ารางเบาเมือง",
            "ทางรถไฟระหว่างเมือง",
            "การจราจรสะพานยกระดับ",
            "รถไฟความเร็วสูง",
            "ชานชาลาสถานี",
            "ซ่อมบำรุงโรงรถ"
        ]
    },
    "bridge-noise-barrier": {
        "vi": [
            "Cầu cạn đô thị",
            "Cầu đường bộ",
            "Cầu vượt sông",
            "Đường dẫn nút giao",
            "Đường cao tốc trên cao",
            "Cầu vượt bộ hành",
            "Cầu ven biển"
        ],
        "th": [
            "สะพานยกระดับเมือง",
            "สะพานทางหลวง",
            "สะพานข้ามแม่น้ำ",
            "ทางลาดต่างระดับ",
            "ทางด่วนยกระดับ",
            "สะพานลอยคนเดิน",
            "สะพานชายฝั่ง"
        ]
    },
    "anti-tank-wire-mesh-4mm": {
        "vi": [
            "Phòng Thủ Quân Sự",
            "An ninh biên giới",
            "Cơ sở hạ tầng quan trọng",
            "An ninh đại sứ quán",
            "Chống xe đâm vào"
        ],
        "th": [
            "การป้องกันทางทหาร",
            "ความมั่นคงชายแดน",
            "โครงสร้างพื้นฐานสำคัญ",
            "การรักษาความปลอดภัยสถานทูต",
            "ป้องกันยานพาหนะพุ่งชน"
        ]
    },
    "anti-drone-wire-mesh-1-5mm": {
        "vi": [
            "An ninh sân bay",
            "Căn cứ quân sự",
            "Chống hàng lậu nhà tù",
            "Tòa nhà chính phủ",
            "Khu vực cấm bay sân vận động",
            "Bảo vệ trung tâm dữ liệu"
        ],
        "th": [
            "ความปลอดภัยสนามบิน",
            "ฐานทัพทหาร",
            "ป้องกันของต้องห้ามเรือนจำ",
            "อาคารราชการ",
            "เขตห้ามบินสนามกีฬา",
            "ป้องกันศูนย์ข้อมูล"
        ]
    },
}

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    for slug, translations in TRANSLATIONS.items():
        vi_list = translations["vi"]
        th_list = translations["th"]

        # Verify no Chinese remains in our translations
        for i, item in enumerate(vi_list):
            if has_chinese(item):
                print(f"WARNING: Chinese found in vi[{i}] for {slug}: {repr(item)}")
        for i, item in enumerate(th_list):
            if has_chinese(item):
                print(f"WARNING: Chinese found in th[{i}] for {slug}: {repr(item)}")

        vi_json = json.dumps(vi_list, ensure_ascii=False)
        th_json = json.dumps(th_list, ensure_ascii=False)

        cursor.execute(
            "UPDATE products SET applications_vi = ?, applications_th = ? WHERE slug = ? AND status = 'published'",
            (vi_json, th_json, slug)
        )
        if cursor.rowcount > 0:
            print(f"✅ Updated {slug}")
        else:
            print(f"⚠️  No rows updated for {slug} (not found or not published)")

    conn.commit()
    conn.close()
    print("\nDone! All translations applied.")

if __name__ == "__main__":
    main()
