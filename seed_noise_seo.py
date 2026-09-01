# -*- coding: utf-8 -*-
"""把 noise-barrier 落地页内置的四语 SEO 内容写入 site_config，供管理后台编辑。"""
import sqlite3

db = sqlite3.connect('backend/inquiries.db')
cur = db.cursor()

data = {
    'noise_barrier_seo_title': {
        'en': 'Highway & Industrial Noise Barrier Manufacturer — Direct Factory China | Angu',
        'zh': '公路与工业声屏障生产厂家 — 中国工厂直供 | 安固丝网',
        'vi': 'Tấm Cách Âm Đường Cao Tốc & Công Nghiệp — Nhà Máy Trực Tiếp Trung Quốc | Angu',
        'th': 'แผงกั้นเสียงทางหลวงและอุตสาหกรรม — โรงงานโดยตรงจากจีน | Angu',
    },
    'noise_barrier_seo_description': {
        'en': 'High-quality noise barrier manufacturer: highway sound barriers, industrial acoustic walls, bridge & metro noise panels. Hot-dip galvanized, STC>38dB, NRC 0.85–0.95. Factory-direct pricing, shipping to Vietnam & Thailand.',
        'zh': '高品质声屏障生产厂家：公路声屏障、工厂降噪墙、桥梁地铁隔音板。热镀锌防腐，STC>38dB，NRC 0.85–0.95。工厂直供价，出口越南泰国。',
        'vi': 'Nhà sản xuất tấm cách âm chất lượng cao: tấm tiêu âm đường cao tốc, tường cách âm nhà máy, tấm chắn ồn cầu & metro. Mạ kẽm nhúng nóng, STC>38dB, NRC 0.85–0.95. Giá xuất xưởng, giao cảng Việt Nam.',
        'th': 'ผู้ผลิตแผงกั้นเสียงคุณภาพสูง: แผงซับเสียงทางด่วน กำแพงกันเสียงโรงงาน แผงกั้นเสียงสะพานและรถไฟฟ้า ชุบกัลวาไนซ์ร้อน STC>38dB NRC 0.85–0.95 ราคาหน้าโรงงาน ส่งออกไทย',
    },
    'noise_barrier_seo_keywords': {
        'en': 'noise barrier, sound barrier, acoustic barrier, sound wall, noise wall, acoustic panel, sound absorbing panel, highway noise barrier, industrial noise barrier, bridge noise barrier, metro noise barrier, reflective noise barrier, absorptive noise barrier, hot-dip galvanized noise barrier, aluminum noise barrier, fiberglass acoustic panel, noise barrier manufacturer China, noise barrier supplier, noise barrier price, STC 38dB, NRC 0.85, MOQ 500sqm, FOB CIF Vietnam Thailand Southeast Asia',
        'zh': '声屏障, 隔音屏障, 隔音墙, 声屏障厂家, 公路声屏障, 高速声屏障, 工厂声屏障, 工厂降噪, 桥梁声屏障, 地铁声屏障, 反射型声屏障, 吸声型声屏障, 热镀锌声屏障, 铝板声屏障, 玻璃钢声屏障, 声屏障价格, 声屏障报价, 声屏障出口, 越南, 泰国, 东南亚, STC 38dB, NRC 0.85, MOQ 500平方米',
        'vi': 'tấm cách âm, vách cách âm, tường tiêu âm, tấm chắn ồn, tấm tiêu âm, chắn ồn đường cao tốc, giảm tiếng ồn nhà máy, cách âm cầu, cách âm metro, rào chắn tiếng ồn, tấm hấp âm kim loại, mạ kẽm nhúng nóng, tấm cách âm nhôm, tấm cách âm sợi thủy tinh, xuất khẩu Việt Nam, nhà sản xuất tấm cách âm Trung Quốc, giá tấm cách âm, báo giá tấm tiêu âm, STC 38dB, NRC 0.85, MOQ 500m2, FOB CIF Hải Phòng Hồ Chí Minh',
        'th': 'แผงกั้นเสียง, กำแพงกันเสียง, แผงซับเสียง, แผงดูดซับเสียง, กันเสียงทางด่วน, ลดเสียงโรงงาน, กั้นเสียงสะพาน, กั้นเสียงรถไฟฟ้า, รั้วกันเสียง, แผงกั้นเสียงโลหะ, ชุบกัลวาไนซ์ร้อน, แผงกั้นเสียงอลูมิเนียม, แผงกั้นเสียงไฟเบอร์กลาส, ส่งออกประเทศไทย, โรงงานแผงกั้นเสียงจีน, ราคาแผงกั้นเสียง, STC 38dB, NRC 0.85, MOQ 500ตรม, FOB CIF ลาดบัญชิดเกต',
    },
}

for key, langs in data.items():
    cur.execute(
        'INSERT INTO site_config (key, value_en, value_zh, value_vi, value_th) VALUES (?, ?, ?, ?, ?) '
        'ON CONFLICT(key) DO UPDATE SET value_en=excluded.value_en, value_zh=excluded.value_zh, '
        'value_vi=excluded.value_vi, value_th=excluded.value_th, updated_at=CURRENT_TIMESTAMP',
        (key, langs['en'], langs['zh'], langs['vi'], langs['th']),
    )

db.commit()
db.close()
print('done: wrote 3 keys')
