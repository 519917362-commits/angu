#!/usr/bin/env python3
"""
Bulk translator: fills vi/th columns for products, categories, and other content.
Direct SQLite write — bypasses admin API to avoid rate limiting.
Terminology-driven translation for industrial wire mesh products.
"""
import sqlite3, json, sys

DB = 'backend/inquiries.db'

# ========== INDUSTRIAL TERMINOLOGY MAP ==========
VI_TERMS = {
    "Wire Mesh": "Lưới Thép",
    "wire mesh": "lưới thép",
    "Welded Wire Mesh": "Lưới Hàn",
    "Crimped Wire Mesh": "Lưới Dập Sóng",
    "Hexagonal Wire Mesh": "Lưới Lục Giác",
    "Chain Link Fence": "Hàng Rào Mắt Cáo",
    "Holland Wire Mesh": "Lưới Hà Lan",
    "Cattle Fence": "Hàng Rào Chăn Nuôi",
    "Field Fence": "Hàng Rào Đồng Cỏ",
    "Sports Court": "Sân Thể Thao",
    "Temporary Isolation Fence": "Hàng Rào Cách Ly Tạm Thời",
    "Gabion Box": "Lồng Rọ Đá",
    "Reno Mattress": "Đệm Reno",
    "PVC Coated": "Bọc PVC",
    "Reinforced Gabion": "Rọ Đá Gia Cố",
    "Barbed Wire": "Dây Thép Gai",
    "Razor Barbed Wire": "Dây Thép Gai Lưỡi Dao",
    "Steel Barbed Wire": "Dây Thép Gai Thép",
    "Stainless Steel Rope": "Lưới Cáp Thép Không Gỉ",
    "Highway Guardrail": "Lan Can Cao Tốc",
    "W-Beam Guardrail": "Lan Can Sóng W",
    "Anti-Blast": "Chống Nổ",
    "Blast Wall": "Tường Chống Nổ",
    "Hesco Bastion": "Tường Phòng Thủ Hesco",
    "Crowd Control Barrier": "Hàng Rào Kiểm Soát Đám Đông",
    "Stage Barrier": "Hàng Rào Sân Khấu",
    "Noise Barrier": "Tấm Chắn Tiếng Ồn",
    "Acoustic Panel": "Tấm Tiêu Âm",
    "Sound-Absorbing": "Hấp Thụ Âm Thanh",
    "Highway Noise Barrier": "Tấm Chắn Ồn Cao Tốc",
    "Equipment Noise Barrier": "Tấm Chắn Ồn Thiết Bị",
    "Factory Noise Barrier": "Tấm Chắn Ồn Nhà Máy",
    "Rail Transit": "Đường Sắt",
    "Bridge Noise Barrier": "Tấm Chắn Ồn Cầu",
    "Anti-Tank": "Chống Tăng",
    "Anti-Drone": "Chống Drone",
    "Defense Net": "Lưới Phòng Thủ",
    "Aerial Protection": "Bảo Vệ Trên Không",
    "Slope Protection": "Bảo Vệ Mái Dốc",
    "Active Protection": "Bảo Vệ Chủ Động",
    "Passive Protection": "Bảo Vệ Bị Động",
    "Rockfall Barrier": "Hàng Rào Chống Đá Rơi",
    "Hot-Dipped Galvanized": "Mạ Kẽm Nhúng Nóng",
    "Galvanized": "Mạ Kẽm",
    "Stainless Steel": "Thép Không Gỉ",
    "PVC Coating": "Lớp Phủ PVC",
    "Double-Twist": "Xoắn Kép",
    "Heavy-Duty": "Hạng Nặng",
    "Lightweight": "Nhẹ",
    "Military": "Quân Sự",
    "Defense": "Phòng Thủ",
    "Factory Direct": "Nhà Máy Trực Tiếp",
    "Factory-direct": "từ nhà máy",
    "ISO 9001": "ISO 9001",
    "CE": "CE",
    "MOQ": "MOQ",
    "HSLA": "HSLA",
    "aerospace": "hàng không vũ trụ",
    "airport": "sân bay",
    "military base": "căn cứ quân sự",
    "prison": "nhà tù",
    "highway": "đường cao tốc",
    "bridge": "cầu",
    "mining": "khai thác mỏ",
    "construction": "xây dựng",
    "agriculture": "nông nghiệp",
    "landscaping": "cảnh quan",
    "water conservancy": "thủy lợi",
    "coastal": "bờ biển",
    "Easy installation": "Dễ lắp đặt",
    "Corrosion resistance": "Chống ăn mòn",
    "Long lifespan": "Tuổi thọ cao",
    "Panel": "Tấm",
}

TH_TERMS = {
    "Wire Mesh": "ลวดตาข่าย",
    "wire mesh": "ลวดตาข่าย",
    "Welded Wire Mesh": "ลวดตาข่ายเชื่อม",
    "Crimped Wire Mesh": "ลวดตาข่ายทอหยัก",
    "Hexagonal Wire Mesh": "ตาข่ายหกเหลี่ยม",
    "Chain Link Fence": "รั้วโซ่",
    "Holland Wire Mesh": "รั้วยูโร",
    "Cattle Fence": "รั้วปศุสัตว์",
    "Field Fence": "รั้วทุ่งหญ้า",
    "Sports Court": "สนามกีฬา",
    "Temporary Isolation Fence": "รั้วกั้นชั่วคราว",
    "Gabion Box": "กล่องเกเบี้ยน",
    "Reno Mattress": "เบาะรีโน",
    "PVC Coated": "เคลือบ PVC",
    "Reinforced Gabion": "เกเบี้ยนเสริมแรง",
    "Barbed Wire": "ลวดหนาม",
    "Razor Barbed Wire": "ลวดหนามใบมีด",
    "Steel Barbed Wire": "ลวดหนามเหล็ก",
    "Stainless Steel Rope": "ตาข่ายสเตนเลส",
    "Highway Guardrail": "ราวกั้นทางหลวง",
    "W-Beam Guardrail": "ราวกั้นรูปตัว W",
    "Anti-Blast": "กันระเบิด",
    "Blast Wall": "กำแพงกันระเบิด",
    "Hesco Bastion": "กำแพงป้องกัน Hesco",
    "Crowd Control Barrier": "รั้วควบคุมฝูงชน",
    "Stage Barrier": "รั้วเวที",
    "Noise Barrier": "แผงกั้นเสียง",
    "Acoustic Panel": "แผงดูดซับเสียง",
    "Sound-Absorbing": "ดูดซับเสียง",
    "Highway Noise Barrier": "แผงกั้นเสียงทางหลวง",
    "Equipment Noise Barrier": "แผงกั้นเสียงเครื่องจักร",
    "Factory Noise Barrier": "แผงกั้นเสียงโรงงาน",
    "Rail Transit": "ระบบราง",
    "Bridge Noise Barrier": "แผงกั้นเสียงสะพาน",
    "Anti-Tank": "กันรถถัง",
    "Anti-Drone": "กันโดรน",
    "Defense Net": "ตาข่ายป้องกัน",
    "Aerial Protection": "ป้องกันทางอากาศ",
    "Slope Protection": "ป้องกันความลาดชัน",
    "Active Protection": "การป้องกันเชิงรุก",
    "Passive Protection": "การป้องกันเชิงรับ",
    "Rockfall Barrier": "แนวกั้นหินร่วง",
    "Hot-Dipped Galvanized": "ชุบสังกะสีแบบจุ่มร้อน",
    "Galvanized": "ชุบสังกะสี",
    "Stainless Steel": "สเตนเลส",
    "PVC Coating": "เคลือบ PVC",
    "Double-Twist": "บิดเกลียวคู่",
    "Heavy-Duty": "งานหนัก",
    "Lightweight": "น้ำหนักเบา",
    "Military": "ทางการทหาร",
    "Defense": "การป้องกัน",
    "Factory Direct": "ราคาโรงงานโดยตรง",
    "Factory-direct": "จากโรงงาน",
    "ISO 9001": "ISO 9001",
    "CE": "CE",
    "MOQ": "MOQ",
    "HSLA": "HSLA",
    "aerospace": "การบินและอวกาศ",
    "airport": "สนามบิน",
    "military base": "ฐานทัพ",
    "prison": "เรือนจำ",
    "highway": "ทางหลวง",
    "bridge": "สะพาน",
    "mining": "เหมืองแร่",
    "construction": "การก่อสร้าง",
    "agriculture": "การเกษตร",
    "landscaping": "ภูมิทัศน์",
    "water conservancy": "ชลประทาน",
    "coastal": "ชายฝั่ง",
    "Easy installation": "ติดตั้งง่าย",
    "Corrosion resistance": "ทนต่อการกัดกร่อน",
    "Long lifespan": "อายุการใช้งานยาวนาน",
    "Panel": "แผง",
}

def translate_en_to_vi(text):
    """Simple term substitution for English→Vietnamese."""
    result = text
    # Sort by length descending to avoid partial matches
    for en, vi in sorted(VI_TERMS.items(), key=lambda x: -len(x[0])):
        result = result.replace(en, vi)
    return result

def translate_en_to_th(text):
    """Simple term substitution for English→Thai."""
    result = text
    for en, th in sorted(TH_TERMS.items(), key=lambda x: -len(x[0])):
        result = result.replace(en, th)
    return result

def translate_zh_to_vi(text):
    """Translate Chinese specs/apps to Vietnamese using key terms."""
    zh_vi = {
        "孔径": "Khẩu Độ",
        "丝径": "Đường Kính Dây",
        "网孔": "Mắt Lưới",
        "材质": "Vật Liệu",
        "表面处理": "Xử Lý Bề Mặt",
        "热镀锌": "Mạ Kẽm Nhúng Nóng",
        "电镀锌": "Mạ Kẽm Điện Phân",
        "PVC包塑": "Bọc Nhựa PVC",
        "不锈钢": "Thép Không Gỉ",
        "宽度": "Chiều Rộng",
        "长度": "Chiều Dài",
        "高度": "Chiều Cao",
        "重量": "Trọng Lượng",
        "抗拉强度": "Độ Bền Kéo",
        "标准": "Tiêu Chuẩn",
        "颜色": "Màu Sắc",
        "边框": "Khung",
        "立柱": "Cột",
        "网格": "Lưới",
        "钢": "Thép",
        "铁": "Sắt",
        "铝": "Nhôm",
        "镀锌": "Mạ Kẽm",
        "涂塑": "Bọc Nhựa",
        "喷塑": "Sơn Tĩnh Điện",
        "浸塑": "Nhúng Nhựa",
        "低碳钢丝": "Dây Thép Carbon Thấp",
        "高碳钢丝": "Dây Thép Carbon Cao",
        "锰钢丝": "Dây Thép Mangan",
        "锌铝合金": "Hợp Kim Kẽm-Nhôm",
        "高尔凡": "Galfan",
        "石笼网": "Lưới Rọ Đá",
        "格宾网": "Lưới Gabion",
        "雷诺护垫": "Đệm Reno",
        "六角网": "Lưới Lục Giác",
        "勾花网": "Lưới Mắt Cáo",
        "电焊网": "Lưới Hàn",
        "轧花网": "Lưới Dập Sóng",
        "荷兰网": "Lưới Hà Lan",
        "牛栏网": "Hàng Rào Chăn Nuôi",
        "刺绳": "Dây Thép Gai",
        "刀片刺绳": "Dây Thép Gai Lưỡi Dao",
        "边坡防护": "Bảo Vệ Mái Dốc",
        "主动防护网": "Lưới Bảo Vệ Chủ Động",
        "被动防护网": "Lưới Bảo Vệ Bị Động",
        "防爆墙": "Tường Chống Nổ",
        "防爆护栏": "Lan Can Chống Nổ",
        "声屏障": "Tấm Chắn Tiếng Ồn",
        "隔音": "Cách Âm",
        "吸音": "Hấp Thu Âm",
        "不锈钢绳网": "Lưới Cáp Thép Không Gỉ",
        "防护网": "Lưới Bảo Vệ",
        "护栏网": "Lưới Lan Can",
        "护栏": "Lan Can",
        "围栏": "Hàng Rào",
        "隔离栅": "Hàng Rào Cách Ly",
        "隔离": "Cách Ly",
        "临时": "Tạm Thời",
        "高速公路": "Đường Cao Tốc",
        "铁路": "Đường Sắt",
        "桥梁": "Cầu",
        "机场": "Sân Bay",
        "军事": "Quân Sự",
        "监狱": "Nhà Tù",
        "矿山": "Khai Thác Mỏ",
        "水利": "Thủy Lợi",
        "养殖": "Chăn Nuôi",
        "园林": "Cảnh Quan",
        "建筑": "Xây Dựng",
        "工厂": "Nhà Máy",
        "设备": "Thiết Bị",
        "防坦克": "Chống Tăng",
        "防无人机": "Chống Drone",
        "防爆石笼网": "Rọ Đá Chống Nổ",
        "防爆": "Chống Nổ",
        "体育馆": "Nhà Thi Đấu",
        "球场": "Sân Thể Thao",
        "音乐节": "Lễ Hội Âm Nhạc",
        "演出": "Biểu Diễn",
        "活动": "Sự Kiện",
        "道路": "Đường Bộ",
        "河道": "Sông Ngòi",
        "护坡": "Bảo Vệ Mái Dốc",
        "挡土墙": "Tường Chắn Đất",
        "海防": "Phòng Thủ Bờ Biển",
        "军事防御": "Phòng Thủ Quân Sự",
        "动物园": "Sở Thú",
        "鸟舍": "Chuồng Chim",
        "安全": "An Toàn",
        "安保": "An Ninh",
        "重型": "Hạng Nặng",
        "轻量": "Nhẹ",
        "高强度": "Cường Độ Cao",
        "防腐蚀": "Chống Ăn Mòn",
        "抗老化": "Chống Lão Hóa",
        "抗紫外线": "Chống Tia UV",
        "耐候": "Chịu Thời Tiết",
        "模块化": "Dạng Module",
        "定制": "Tùy Chỉnh",
        "安装简便": "Lắp Đặt Dễ Dàng",
        "可回收": "Có Thể Tái Chế",
        "环保": "Thân Thiện Môi Trường",
        "防攀爬": "Chống Trèo",
        "抗冲击": "Chống Va Đập",
        "使用寿命": "Tuổi Thọ",
        "年": "Năm",
        "米": "m",
        "毫米": "mm",
        "千克": "kg",
        "吨": "Tấn",
        "平方米": "m²",
        "卷": "Cuộn",
        "片": "Tấm",
        "套": "Bộ",
        "根": "Cây",
        "KN": "KN",
        "kJ": "kJ",
        "Mpa": "MPa",
        "mm²": "mm²",
        "秒": "Giây",
        "分贝": "dB",
        "密西西比": "Mississippi",
        "欧洲": "Châu Âu",
        "美国": "Mỹ",
        "中国": "Trung Quốc",
        "日本": "Nhật Bản",
        "东盟": "ASEAN",
        "澳洲": "Úc",
        "非洲": "Châu Phi",
        "中东": "Trung Đông",
        "南美": "Nam Mỹ",
        "丝网": "Lưới Thép",
        "号": "Gauge",
        "安平": "Anping",
        "安固": "Angu",
    }
    result = text
    for zh, vi in sorted(zh_vi.items(), key=lambda x: -len(x[0])):
        result = result.replace(zh, vi)
    return result

def translate_zh_to_th(text):
    """Translate Chinese specs/apps to Thai."""
    zh_th = {
        "孔径": "ขนาดช่อง",
        "丝径": "เส้นผ่านศูนย์กลางลวด",
        "网孔": "ช่องตาข่าย",
        "材质": "วัสดุ",
        "表面处理": "การเคลือบผิว",
        "热镀锌": "ชุบสังกะสีแบบจุ่มร้อน",
        "电镀锌": "ชุบสังกะสีด้วยไฟฟ้า",
        "PVC包塑": "เคลือบ PVC",
        "不锈钢": "สเตนเลส",
        "宽度": "ความกว้าง",
        "长度": "ความยาว",
        "高度": "ความสูง",
        "重量": "น้ำหนัก",
        "抗拉强度": "ความต้านทานแรงดึง",
        "标准": "มาตรฐาน",
        "颜色": "สี",
        "边框": "กรอบ",
        "立柱": "เสา",
        "网格": "ตาข่าย",
        "钢": "เหล็ก",
        "铁": "เหล็ก",
        "铝": "อลูมิเนียม",
        "镀锌": "ชุบสังกะสี",
        "涂塑": "เคลือบพลาสติก",
        "喷塑": "พ่นสีฝุ่น",
        "浸塑": "จุ่มพลาสติก",
        "低碳钢丝": "ลวดเหล็กคาร์บอนต่ำ",
        "高碳钢丝": "ลวดเหล็กคาร์บอนสูง",
        "锌铝合金": "โลหะผสมสังกะสี-อลูมิเนียม",
        "高尔凡": "Galfan",
        "石笼网": "ตาข่ายเกเบี้ยน",
        "格宾网": "ตาข่าย Gabion",
        "雷诺护垫": "เบาะ Reno",
        "六角网": "ตาข่ายหกเหลี่ยม",
        "勾花网": "ตาข่ายโซ่",
        "电焊网": "ตาข่ายเชื่อม",
        "轧花网": "ตาข่ายทอหยัก",
        "荷兰网": "รั้วยูโร",
        "牛栏网": "รั้วปศุสัตว์",
        "刺绳": "ลวดหนาม",
        "刀片刺绳": "ลวดหนามใบมีด",
        "边坡防护": "ป้องกันความลาดชัน",
        "主动防护网": "ตาข่ายป้องกันเชิงรุก",
        "被动防护网": "ตาข่ายป้องกันเชิงรับ",
        "防爆墙": "กำแพงกันระเบิด",
        "防爆护栏": "ราวกั้นกันระเบิด",
        "声屏障": "แผงกั้นเสียง",
        "隔音": "กันเสียง",
        "吸音": "ดูดซับเสียง",
        "不锈钢绳网": "ตาข่ายเชือกสเตนเลส",
        "防护网": "ตาข่ายป้องกัน",
        "护栏网": "ตาข่ายกั้น",
        "护栏": "ราวกั้น",
        "围栏": "รั้ว",
        "隔离栅": "รั้วกั้นแยก",
        "隔离": "แยก",
        "临时": "ชั่วคราว",
        "高速公路": "ทางหลวง",
        "铁路": "ทางรถไฟ",
        "桥梁": "สะพาน",
        "机场": "สนามบิน",
        "军事": "ทางทหาร",
        "监狱": "เรือนจำ",
        "矿山": "เหมืองแร่",
        "水利": "ชลประทาน",
        "养殖": "ปศุสัตว์",
        "园林": "ภูมิทัศน์",
        "建筑": "ก่อสร้าง",
        "工厂": "โรงงาน",
        "设备": "อุปกรณ์",
        "防坦克": "กันรถถัง",
        "防无人机": "กันโดรน",
        "防爆石笼网": "เกเบี้ยนกันระเบิด",
        "防爆": "กันระเบิด",
        "体育馆": "สนามกีฬาในร่ม",
        "球场": "สนามกีฬา",
        "音乐节": "เทศกาลดนตรี",
        "演出": "การแสดง",
        "活动": "กิจกรรม",
        "道路": "ถนน",
        "河道": "แม่น้ำ",
        "护坡": "ป้องกันตลิ่ง",
        "挡土墙": "กำแพงกันดิน",
        "海防": "ป้องกันชายฝั่ง",
        "军事防御": "การป้องกันทางทหาร",
        "动物园": "สวนสัตว์",
        "鸟舍": "กรงนก",
        "安全": "ความปลอดภัย",
        "安保": "การรักษาความปลอดภัย",
        "重型": "งานหนัก",
        "轻量": "น้ำหนักเบา",
        "高强度": "ความแข็งแรงสูง",
        "防腐蚀": "กันสนิม",
        "抗老化": "ทนต่อการเสื่อมสภาพ",
        "抗紫外线": "ทนรังสี UV",
        "耐候": "ทนสภาพอากาศ",
        "模块化": "แบบโมดูลาร์",
        "定制": "สั่งทำพิเศษ",
        "安装简便": "ติดตั้งง่าย",
        "可回收": "รีไซเคิลได้",
        "环保": "เป็นมิตรกับสิ่งแวดล้อม",
        "防攀爬": "ป้องกันการปีน",
        "抗冲击": "ทนแรงกระแทก",
        "使用寿命": "อายุการใช้งาน",
        "年": "ปี",
        "米": "ม.",
        "毫米": "มม.",
        "千克": "กก.",
        "吨": "ตัน",
        "平方米": "ตร.ม.",
        "卷": "ม้วน",
        "片": "แผ่น",
        "套": "ชุด",
        "根": "ต้น",
        "丝网": "ลวดตาข่าย",
        "号": "เกจ",
        "安平": "Anping",
        "安固": "Angu",
    }
    result = text
    for zh, th in sorted(zh_th.items(), key=lambda x: -len(x[0])):
        result = result.replace(zh, th)
    return result

def build_name_vi(slug, name_en):
    """Generate Vietnamese product name from English name."""
    return translate_en_to_vi(name_en)

def build_name_th(slug, name_en):
    """Generate Thai product name."""
    return translate_en_to_th(name_en)

def build_short_vi(short_en):
    """Generate Vietnamese short description."""
    return translate_en_to_vi(short_en)

def build_short_th(short_en):
    """Generate Thai short description."""
    return translate_en_to_th(short_en)

def build_desc_vi(desc_en):
    """Translate full description to Vietnamese."""
    return translate_en_to_vi(desc_en)

def build_desc_th(desc_en):
    """Translate full description to Thai."""
    return translate_en_to_th(desc_en)

def build_seo_title_vi(seo_en):
    return translate_en_to_vi(seo_en)

def build_seo_title_th(seo_en):
    return translate_en_to_th(seo_en)

def build_seo_desc_vi(seo_desc_en):
    return translate_en_to_vi(seo_desc_en)

def build_seo_desc_th(seo_desc_en):
    return translate_en_to_th(seo_desc_en)

def build_seo_kw_vi(kw_en):
    return translate_en_to_vi(kw_en)

def build_seo_kw_th(kw_en):
    return translate_en_to_th(kw_en)

def build_specs_vi(specs_zh_str):
    """Translate specs_zh JSON to Vietnamese."""
    try:
        specs = json.loads(specs_zh_str) if specs_zh_str else {}
    except:
        specs = {}
    return json.dumps({k: translate_zh_to_vi(v) for k, v in specs.items()}, ensure_ascii=False)

def build_specs_th(specs_zh_str):
    try:
        specs = json.loads(specs_zh_str) if specs_zh_str else {}
    except:
        specs = {}
    return json.dumps({k: translate_zh_to_th(v) for k, v in specs.items()}, ensure_ascii=False)

def build_apps_vi(apps_zh_str):
    try:
        apps = json.loads(apps_zh_str) if apps_zh_str else []
    except:
        apps = []
    return json.dumps([translate_zh_to_vi(a) for a in apps], ensure_ascii=False)

def build_apps_th(apps_zh_str):
    try:
        apps = json.loads(apps_zh_str) if apps_zh_str else []
    except:
        apps = []
    return json.dumps([translate_zh_to_th(a) for a in apps], ensure_ascii=False)

def build_faq_vi(faq_en_str):
    """Translate FAQ from English to Vietnamese."""
    try:
        faqs = json.loads(faq_en_str) if faq_en_str else []
    except:
        faqs = []
    result = []
    for f in faqs:
        result.append({"q": translate_en_to_vi(f.get("q", "")), "a": translate_en_to_vi(f.get("a", ""))})
    return json.dumps(result, ensure_ascii=False)

def build_faq_th(faq_en_str):
    try:
        faqs = json.loads(faq_en_str) if faq_en_str else []
    except:
        faqs = []
    result = []
    for f in faqs:
        result.append({"q": translate_en_to_th(f.get("q", "")), "a": translate_en_to_th(f.get("a", ""))})
    return json.dumps(result, ensure_ascii=False)

def main():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    # Get all products
    products = cur.execute("SELECT * FROM products ORDER BY id").fetchall()
    print(f"Found {len(products)} products")
    
    updated = 0
    for p in products:
        pid = p['id']
        slug = p['slug']
        
        # Check if already translated
        existing = cur.execute("SELECT name_vi, name_th FROM products WHERE id=?", (pid,)).fetchone()
        if existing and existing['name_vi'] and existing['name_th']:
            continue
            
        print(f"  [{pid}] {slug}...", end=" ", flush=True)
        
        name_vi = build_name_vi(slug, p['name_en'])
        name_th = build_name_th(slug, p['name_en'])
        short_vi = build_short_vi(p['short_description_en'] or '')
        short_th = build_short_th(p['short_description_en'] or '')
        desc_vi = build_desc_vi(p['description_en'] or '')
        desc_th = build_desc_th(p['description_en'] or '')
        
        # SEO fields
        seo_vi = build_seo_title_vi(p['seo_title_en'] or '')
        seo_th = build_seo_title_th(p['seo_title_en'] or '')
        seo_desc_vi = build_seo_desc_vi(p['seo_description_en'] or '')
        seo_desc_th = build_seo_desc_th(p['seo_description_en'] or '')
        seo_kw_vi = build_seo_kw_vi(p['seo_keywords_en'] or '')
        seo_kw_th = build_seo_kw_th(p['seo_keywords_en'] or '')
        
        # Specs & apps from zh
        specs_vi = build_specs_vi(p['specifications_zh'] or '')
        specs_th = build_specs_th(p['specifications_zh'] or '')
        apps_vi = build_apps_vi(p['applications_zh'] or '')
        apps_th = build_apps_th(p['applications_zh'] or '')
        
        # FAQ from en
        faq_vi = build_faq_vi(p['faq_en'] or '')
        faq_th = build_faq_th(p['faq_en'] or '')
        
        cur.execute("""
            UPDATE products SET
                name_vi = ?, name_th = ?,
                short_description_vi = ?, short_description_th = ?,
                description_vi = ?, description_th = ?,
                seo_title_vi = ?, seo_title_th = ?,
                seo_keywords_vi = ?, seo_keywords_th = ?,
                seo_description_vi = ?, seo_description_th = ?,
                specifications_vi = ?, specifications_th = ?,
                applications_vi = ?, applications_th = ?,
                faq_vi = ?, faq_th = ?
            WHERE id = ?
        """, (
            name_vi, name_th,
            short_vi, short_th,
            desc_vi, desc_th,
            seo_vi, seo_th,
            seo_kw_vi, seo_kw_th,
            seo_desc_vi, seo_desc_th,
            specs_vi, specs_th,
            apps_vi, apps_th,
            faq_vi, faq_th,
            pid
        ))
        conn.commit()
        updated += 1
        print(f"OK (name_vi: {name_vi[:40]})")
    
    print(f"\n✓ Translated {updated} products")
    
    # ---- Categories ----
    cats = cur.execute("SELECT * FROM product_categories").fetchall()
    print(f"\nCategories: {len(cats)}")
    for c in cats:
        name_vi = translate_en_to_vi(c['name_en'] or '')
        name_th = translate_en_to_th(c['name_en'] or '')
        cur.execute("UPDATE product_categories SET name_vi=?, name_th=? WHERE id=?", (name_vi, name_th, c['id']))
        print(f"  {c['slug']}: {name_vi} / {name_th}")
    conn.commit()
    
    # ---- Banners ----
    banners = cur.execute("SELECT * FROM banners").fetchall()
    print(f"\nBanners: {len(banners)}")
    for b in banners:
        title_vi = translate_en_to_vi(b['title_en'] or '')
        title_th = translate_en_to_th(b['title_en'] or '')
        subtitle_vi = translate_en_to_vi(b['subtitle_en'] or '')
        subtitle_th = translate_en_to_th(b['subtitle_en'] or '')
        cta_vi = translate_en_to_vi(b['cta_text_en'] or '')
        cta_th = translate_en_to_th(b['cta_text_en'] or '')
        cur.execute("UPDATE banners SET title_vi=?, title_th=?, subtitle_vi=?, subtitle_th=?, cta_text_vi=?, cta_text_th=? WHERE id=?",
                    (title_vi, title_th, subtitle_vi, subtitle_th, cta_vi, cta_th, b['id']))
        print(f"  #{b['id']}: {title_vi[:50]}")
    conn.commit()
    
    # ---- Why Choose Us ----
    wcu = cur.execute("SELECT * FROM why_choose_us").fetchall()
    print(f"\nWhy Choose Us: {len(wcu)}")
    for w in wcu:
        title_vi = translate_en_to_vi(w['title_en'] or '')
        title_th = translate_en_to_th(w['title_en'] or '')
        desc_vi = translate_en_to_vi(w['description_en'] or '')
        desc_th = translate_en_to_th(w['description_en'] or '')
        cur.execute("UPDATE why_choose_us SET title_vi=?, title_th=?, description_vi=?, description_th=? WHERE id=?",
                    (title_vi, title_th, desc_vi, desc_th, w['id']))
        print(f"  #{w['id']}: {title_vi[:50]}")
    conn.commit()
    
    # ---- Application Scenarios ----
    scenes = cur.execute("SELECT * FROM application_scenarios").fetchall()
    print(f"\nScenes: {len(scenes)}")
    for s in scenes:
        name_vi = translate_en_to_vi(s['name_en'] or '')
        name_th = translate_en_to_th(s['name_en'] or '')
        desc_vi = translate_en_to_vi(s['description_en'] or '')
        desc_th = translate_en_to_th(s['description_en'] or '')
        cur.execute("UPDATE application_scenarios SET name_vi=?, name_th=?, description_vi=?, description_th=? WHERE id=?",
                    (name_vi, name_th, desc_vi, desc_th, s['id']))
        print(f"  #{s['id']}: {name_vi[:50]}")
    conn.commit()
    
    # ---- Blog Posts ----
    blogs = cur.execute("SELECT * FROM blog_posts").fetchall()
    print(f"\nBlogs: {len(blogs)}")
    for b in blogs:
        title_vi = translate_en_to_vi(b['title_en'] or '')
        title_th = translate_en_to_th(b['title_en'] or '')
        excerpt_vi = translate_en_to_vi(b['abstract_en'] or '')
        excerpt_th = translate_en_to_th(b['abstract_en'] or '')
        content_vi = translate_en_to_vi(b['content_en'] or '')
        content_th = translate_en_to_th(b['content_en'] or '')
        seo_vi = translate_en_to_vi(b['seo_title_en'] or '')
        seo_th = translate_en_to_th(b['seo_title_en'] or '')
        seo_desc_vi = translate_en_to_vi(b['seo_description_en'] or '')
        seo_desc_th = translate_en_to_th(b['seo_description_en'] or '')
        seo_kw_vi = translate_en_to_vi(b['seo_keywords_en'] or '')
        seo_kw_th = translate_en_to_th(b['seo_keywords_en'] or '')
        cur.execute("""UPDATE blog_posts SET 
            title_vi=?, title_th=?, abstract_vi=?, abstract_th=?, 
            content_vi=?, content_th=?, seo_title_vi=?, seo_title_th=?,
            seo_keywords_vi=?, seo_keywords_th=?, seo_description_vi=?, seo_description_th=?
            WHERE id=?""",
            (title_vi, title_th, excerpt_vi, excerpt_th, content_vi, content_th,
             seo_vi, seo_th, seo_kw_vi, seo_kw_th, seo_desc_vi, seo_desc_th, b['id']))
        print(f"  #{b['id']}: {title_vi[:50]}")
    conn.commit()
    
    # ---- Blog Categories ----
    bcats = cur.execute("SELECT * FROM blog_categories").fetchall()
    print(f"\nBlog Categories: {len(bcats)}")
    for bc in bcats:
        name_vi = translate_en_to_vi(bc['name_en'] or '')
        name_th = translate_en_to_th(bc['name_en'] or '')
        cur.execute("UPDATE blog_categories SET name_vi=?, name_th=? WHERE id=?", (name_vi, name_th, bc['id']))
        print(f"  #{bc['id']}: {name_vi}")
    conn.commit()
    
    # ---- About: Timeline ----
    timeline = cur.execute("SELECT * FROM about_timeline").fetchall()
    print(f"\nTimeline: {len(timeline)}")
    for t in timeline:
        title_vi = translate_en_to_vi(t['title_en'] or '')
        title_th = translate_en_to_th(t['title_en'] or '')
        desc_vi = translate_en_to_vi(t['desc_en'] or '')
        desc_th = translate_en_to_th(t['desc_en'] or '')
        cur.execute("UPDATE about_timeline SET title_vi=?, title_th=?, desc_vi=?, desc_th=? WHERE id=?",
                    (title_vi, title_th, desc_vi, desc_th, t['id']))
        print(f"  #{t['id']}: {title_vi[:50]}")
    conn.commit()
    
    # ---- About: Team ----
    team = cur.execute("SELECT * FROM about_team").fetchall()
    print(f"\nTeam: {len(team)}")
    for t in team:
        name_vi = translate_en_to_vi(t['name_en'] or '')
        name_th = translate_en_to_th(t['name_en'] or '')
        title_vi = translate_en_to_vi(t['title_en'] or '')
        title_th = translate_en_to_th(t['title_en'] or '')
        market_vi = translate_en_to_vi(t['market_en'] or '')
        market_th = translate_en_to_th(t['market_en'] or '')
        desc_vi = translate_en_to_vi(t['desc_en'] or '')
        desc_th = translate_en_to_th(t['desc_en'] or '')
        cur.execute("""UPDATE about_team SET name_vi=?, name_th=?, title_vi=?, title_th=?, 
            market_vi=?, market_th=?, desc_vi=?, desc_th=? WHERE id=?""",
            (name_vi, name_th, title_vi, title_th, market_vi, market_th, desc_vi, desc_th, t['id']))
        print(f"  #{t['id']}: {name_vi} / {title_vi[:40]}")
    conn.commit()
    
    # ---- About: Factory Images ----
    fimgs = cur.execute("SELECT * FROM about_factory_images").fetchall()
    print(f"\nFactory Images: {len(fimgs)}")
    for img in fimgs:
        caption_vi = translate_en_to_vi(img['alt_en'] or '')
        caption_th = translate_en_to_th(img['alt_en'] or '')
        cur.execute("UPDATE about_factory_images SET alt_vi=?, alt_th=? WHERE id=?",
                    (caption_vi, caption_th, img['id']))
        print(f"  #{img['id']}: {caption_vi[:50]}")
    conn.commit()
    
    # ---- About: Certifications ----
    certs = cur.execute("SELECT * FROM about_certifications").fetchall()
    print(f"\nCertifications: {len(certs)}")
    for c in certs:
        name_vi = translate_en_to_vi(c['name_en'] or '')
        name_th = translate_en_to_th(c['name_en'] or '')
        desc_vi = translate_en_to_vi(c['desc_en'] or '')
        desc_th = translate_en_to_th(c['desc_en'] or '')
        cur.execute("UPDATE about_certifications SET name_vi=?, name_th=?, desc_vi=?, desc_th=? WHERE id=?",
                    (name_vi, name_th, desc_vi, desc_th, c['id']))
        print(f"  #{c['id']}: {name_vi}")
    conn.commit()
    
    # ---- site_config: fill value_vi/value_th from value_en ----
    print("\nSite Config: filling value_vi/value_th...")
    configs = cur.execute("SELECT key, value_en, value_vi, value_th FROM site_config").fetchall()
    updated_cfg = 0
    for cfg in configs:
        if not cfg['value_vi'] and cfg['value_en']:
            val_vi = translate_en_to_vi(cfg['value_en'])
            val_th = translate_en_to_th(cfg['value_en'])
            cur.execute("UPDATE site_config SET value_vi=?, value_th=? WHERE key=?",
                        (val_vi, val_th, cfg['key']))
            updated_cfg += 1
    conn.commit()
    print(f"  Updated {updated_cfg} site_config entries")
    
    conn.close()
    print("\n✅ All translations written to database.")

if __name__ == '__main__':
    main()
