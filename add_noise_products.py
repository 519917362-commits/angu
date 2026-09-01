# -*- coding: utf-8 -*-
"""新增 4 个声屏障产品（金属直立/金属折弯弧形/透明亚克力玻璃/全封闭），
并重排 9 个声屏障产品的 sort_weight 按用户指定顺序。"""
import sqlite3, json

db = sqlite3.connect('backend/inquiries.db')
cur = db.cursor()

# 通用 FAQ（en/zh 完整翻译；vi/th 与现有产品一致，暂用英文）
FAQ_EN = [
    {"q": "What is the minimum order quantity (MOQ)?", "a": "Standard MOQ is 1000 square meters per specification. For trial orders, 500 sqm can be arranged with a small-batch surcharge. Contact us for exact pricing based on your required quantity."},
    {"q": "What certifications do your products have?", "a": "Our products are ISO 9001:2015 certified and carry CE certification. Mill test certificates with actual acoustic and zinc-coating data are provided with each shipment."},
    {"q": "How long is the delivery time?", "a": "Standard products ship in 15-20 days after order confirmation. Custom specifications take 25-35 days. Urgent orders can be expedited to 10-15 days with a rush fee."},
    {"q": "Do you provide free samples?", "a": "Yes, we provide free A4-size panel samples for quality and acoustic evaluation. The customer covers express shipping (typically USD 30-50 via DHL/FedEx)."},
    {"q": "What payment terms do you accept?", "a": "T/T (30% deposit, 70% against B/L copy) or L/C at sight. For long-term partners, T/T 30 days net is available."},
    {"q": "Can you customize panel size, color and material?", "a": "Yes. Panel height, width, thickness, surface color (powder-coated RAL), and core material are fully customizable to match project requirements."},
    {"q": "What packaging do you use?", "a": "Standard export packaging: moisture-proof kraft paper inner layer + palletized bundles secured with steel straps, labeled with specs and batch number."},
    {"q": "How do I get a quote?", "a": "Send us your required panel height, length, acoustic target (dB reduction), and delivery port. We reply within 24 hours with a detailed FOB/CIF quotation."},
]
FAQ_ZH = [
    {"q": "最小起订量是多少？", "a": "标准起订量为每种规格1000平方米。试单可安排500平方米（含小批量附加费）。请联系我们获取基于您所需数量的精确报价。"},
    {"q": "产品有哪些认证？", "a": "产品通过ISO 9001:2015质量管理体系认证，并具备CE认证。每批货物附带包含实测声学数据和镀锌层数据的出厂检验报告。"},
    {"q": "交货期多长？", "a": "标准产品确认订单后15-20天发货。定制规格25-35天。紧急订单可加急至10-15天（含加急费）。"},
    {"q": "提供免费样品吗？", "a": "是的，我们提供免费A4尺寸面板样品供质量和声学评估。客户承担快递运费（DHL/FedEx通常30-50美元）。"},
    {"q": "接受哪些付款方式？", "a": "T/T电汇（30%定金，70%见提单副本付清）或即期信用证。长期合作客户可提供T/T 30天账期。"},
    {"q": "可以定制面板尺寸、颜色和材质吗？", "a": "可以。面板高度、宽度、厚度、表面颜色（粉末喷涂RAL色卡）及芯材均可按项目需求定制。"},
    {"q": "使用什么包装？", "a": "标准出口包装：防潮牛皮纸内层 + 托盘捆扎钢带固定，每捆标注规格和批号。"},
    {"q": "如何获取报价？", "a": "请将您需要的面板高度、长度、降噪目标（分贝数）和目的港发送给我们。我们会在24小时内回复详细FOB/CIF报价。"},
]

products = [
    # ── 4. 金属直立声屏障 ──
    {
        "slug": "metal-upright-noise-barrier",
        "category_slug": "noise-barrier",
        "name_en": "Metal Upright Noise Barrier Vertical Sound Wall Panel",
        "name_zh": "金属直立声屏障 垂直隔音墙板",
        "name_vi": "Tấm Chắn Ồn Kim Loại Đứng Thẳng Vách Tiêu Âm",
        "name_th": "แผงกั้นเสียงโลหะแนวตั้ง ผนังกันเสียงแนวตรง",
        "short_description_en": "Vertical metal upright noise barrier, the most economical sound wall type. Galvanized steel panel with mineral wool core, 10-20 dB(A) reduction for roads, railways and industrial sites.",
        "short_description_zh": "金属直立声屏障是最经济的隔音墙类型。镀锌钢板+岩棉芯材，降噪10-20dB(A)，适用于道路、铁路和工业场地。",
        "short_description_vi": "Tấm chắn ồn kim loại đứng thẳng, loại vách tiêu âm kinh tế nhất. Tấm thép mạ kẽm lõi bông khoáng, giảm 10-20 dB(A) cho đường bộ, đường sắt và khu công nghiệp.",
        "short_description_th": "แผงกั้นเสียงโลหะแนวตั้ง ประเภทผนังกันเสียงที่ประหยัดที่สุด แผ่นเหล็กชุบกัลวาไนซ์แกนใยหิน ลดเสียง 10-20 dB(A) สำหรับถนน ทางรถไฟ และพื้นที่อุตสาหกรรม",
        "description_en": "Metal upright (vertical) noise barriers are the most widely used and economical sound wall type. Panels stand vertically between H-section posts to block direct line-of-sight noise transmission from traffic, rail and industrial sources.\n\n## Acoustic Performance\n- **Insertion Loss**: 10-20 dB(A) typical\n- **NRC**: 0.85 (sound-absorbing face)\n- **STC**: 32\n- **Frequency Range**: 100-5000 Hz\n\n## Key Advantages\n- **Most Economical**: lowest cost per square meter of all barrier types\n- **Modular & Fast**: panels slide into posts, 100m installed in 2-3 days\n- **Weatherproof**: hot-dip galvanized, 15+ year outdoor life\n- **Low Maintenance**: no painting required, damaged panels individually replaceable\n\n## Technical Specifications\n| Parameter | Value |\n|-----------|-------|\n| Panel Height | 2.0-4.0m |\n| Panel Width | 0.5m (standard) |\n| Panel Thickness | 80-100mm |\n| Outer Skin | 0.8mm perforated galvanized steel |\n| Core | 50mm mineral wool 80 kg/m3 |\n| Inner Skin | 0.6mm solid galvanized steel |\n| NRC | 0.85 |\n| STC | 32 |\n| Zinc Coating | >=120g/m2 |\n| Standard | GB/T 19889, ISO 717 |\n\n## Applications\n- Urban roads and expressways\n- Railway lines and metro\n- Industrial plants and factories\n- Residential community protection\n- Schools and hospitals",
        "description_zh": "金属直立声屏障是最广泛使用、最经济的隔音墙类型。面板垂直立于H型钢立柱之间，阻断来自交通、铁路和工业声源的直达声传播。\n\n## 声学性能\n- **插入损失**：10-20 dB(A)（典型）\n- **NRC**：0.85（吸声面）\n- **STC**：32\n- **有效频段**：100-5000 Hz\n\n## 核心优势\n- **最经济**：所有屏障类型中单位面积成本最低\n- **模块化快装**：面板插入立柱，100米2-3天装完\n- **耐候**：热镀锌，15年以上户外寿命\n- **低维护**：无需刷漆，受损面板可单独更换\n\n## 技术规格\n| 参数 | 数值 |\n|-----------|-------|\n| 面板高度 | 2.0-4.0m |\n| 面板宽度 | 0.5m（标准）|\n| 面板厚度 | 80-100mm |\n| 外皮 | 0.8mm冲孔镀锌钢 |\n| 芯材 | 50mm岩棉 80 kg/m3 |\n| 内皮 | 0.6mm实心镀锌钢 |\n| NRC | 0.85 |\n| STC | 32 |\n| 镀锌层 | >=120g/m2 |\n| 标准 | GB/T 19889, ISO 717 |\n\n## 应用场景\n- 城市道路与高速公路\n- 铁路线与地铁\n- 工业厂房\n- 住宅区防护\n- 学校与医院",
        "description_vi": "Tấm chắn ồn kim loại đứng thẳng là loại vách tiêu âm được sử dụng rộng rãi và kinh tế nhất. Tấm đứng thẳng giữa các cột thép chữ H để chặn tiếng ồn trực tiếp từ giao thông, đường sắt và nguồn công nghiệp.\n\n## Hiệu suất âm học\n- **Suy giảm tiếng ồn**: 10-20 dB(A) điển hình\n- **NRC**: 0.85\n- **STC**: 32\n- **Dải tần**: 100-5000 Hz\n\n## Ưu điểm chính\n- **Kinh tế nhất**: chi phí mỗi mét vuông thấp nhất\n- **Mô-đun nhanh**: lắp 100m trong 2-3 ngày\n- **Chống thời tiết**: mạ kẽm nhúng nóng, tuổi thọ 15+ năm\n- **Ít bảo trì**: tấm hỏng thay riêng lẻ\n\n## Thông số kỹ thuật\n| Thông số | Giá trị |\n|-----------|-------|\n| Chiều cao | 2.0-4.0m |\n| Chiều rộng | 0.5m |\n| Độ dày | 80-100mm |\n| Lớp ngoài | thép mạ kẽm đục lỗ 0.8mm |\n| Lõi | bông khoáng 50mm 80 kg/m3 |\n| Lớp trong | thép mạ kẽm đặc 0.6mm |\n| NRC | 0.85 |\n| STC | 32 |\n| Lớp mạ kẽm | >=120g/m2 |\n| Tiêu chuẩn | GB/T 19889, ISO 717 |\n\n## Ứng dụng\n- Đường đô thị và cao tốc\n- Đường sắt và metro\n- Nhà máy công nghiệp\n- Bảo vệ khu dân cư\n- Trường học và bệnh viện",
        "description_th": "แผงกั้นเสียงโลหะแนวตั้งเป็นประเภทผนังกันเสียงที่ใช้กันแพร่หลายและประหยัดที่สุด แผงตั้งตรงระหว่างเสาเหล็กรูปตัว H เพื่อกันเสียงตรงจากจราจร ทางรถไฟ และแหล่งกำเนิดอุตสาหกรรม\n\n## ประสิทธิภาพเสียง\n- **การลดเสียง**: 10-20 dB(A)\n- **NRC**: 0.85\n- **STC**: 32\n- **ช่วงความถี่**: 100-5000 Hz\n\n## ข้อดีหลัก\n- **ประหยัดที่สุด**: ต้นทุนต่อตารางเมตรต่ำสุด\n- **โมดูลาร์ติดตั้งเร็ว**: ติดตั้ง 100 ม. ใน 2-3 วัน\n- **ทนสภาพอากาศ**: ชุบกัลวาไนซ์ร้อน อายุ 15+ ปี\n- **บำรุงรักษาน้อย**: เปลี่ยนแผงเสียเป็นชิ้นๆ\n\n## ข้อมูลทางเทคนิค\n| พารามิเตอร์ | ค่า |\n|-----------|-------|\n| ความสูง | 2.0-4.0 ม. |\n| ความกว้าง | 0.5 ม. |\n| ความหนา | 80-100 มม. |\n| ผิวนอก | เหล็กชุบกัลวาไนซ์เจาะรู 0.8 มม. |\n| แกน | ใยหิน 50 มม. 80 กก./ลบ.ม. |\n| ผิวใน | เหล็กชุบกัลวาไนซ์ทึบ 0.6 มม. |\n| NRC | 0.85 |\n| STC | 32 |\n| ชุบสังกะสี | >=120 ก./ตร.ม. |\n| มาตรฐาน | GB/T 19889, ISO 717 |\n\n## การใช้งาน\n- ถนนในเมืองและทางด่วน\n- ทางรถไฟและรถไฟฟ้า\n- โรงงานอุตสาหกรรม\n- ป้องกันชุมชนที่อยู่อาศัย\n- โรงเรียนและโรงพยาบาล",
        "price": 110.0, "unit": "FOB Tianjin, per m2", "moq": 100,
        "sort_weight": 60, "status": "published", "is_featured": 0,
        "images": json.dumps(["/images/products/highway-noise-barrier.jpg"]),
        "specifications_en": json.dumps({"panelHeight": "2.0-4.0m", "panelWidth": "0.5m", "panelThickness": "80-100mm", "outerSkin": "0.8mm perforated galvanized steel", "core": "50mm mineral wool 80 kg/m3", "innerSkin": "0.6mm solid galvanized steel", "nrc": "0.85", "stc": "32", "insertionLoss": "10-20 dB(A)", "zincCoating": ">=120g/m2", "postType": "H-section steel", "standard": "GB/T 19889, ISO 717"}),
        "specifications_zh": json.dumps({"面板高度": "2.0-4.0m", "面板宽度": "0.5m", "面板厚度": "80-100mm", "外皮": "0.8mm冲孔镀锌钢", "芯材": "50mm岩棉 80 kg/m3", "内皮": "0.6mm实心镀锌钢", "NRC": "0.85", "STC": "32", "插入损失": "10-20 dB(A)", "镀锌层": ">=120g/m2", "立柱": "H型钢", "标准": "GB/T 19889, ISO 717"}),
        "specifications_vi": json.dumps({"panelHeight": "2.0-4.0m", "panelWidth": "0.5m", "panelThickness": "80-100mm", "outerSkin": "thép mạ kẽm đục lỗ 0.8mm", "core": "bông khoáng 50mm 80 kg/m3", "innerSkin": "thép mạ kẽm đặc 0.6mm", "nrc": "0.85", "stc": "32", "insertionLoss": "10-20 dB(A)", "zincCoating": ">=120g/m2", "postType": "thép chữ H", "standard": "GB/T 19889, ISO 717"}),
        "specifications_th": json.dumps({"panelHeight": "2.0-4.0 ม.", "panelWidth": "0.5 ม.", "panelThickness": "80-100 มม.", "outerSkin": "เหล็กชุบกัลวาไนซ์เจาะรู 0.8 มม.", "core": "ใยหิน 50 มม. 80 กก./ลบ.ม.", "innerSkin": "เหล็กชุบกัลวาไนซ์ทึบ 0.6 มม.", "nrc": "0.85", "stc": "32", "insertionLoss": "10-20 dB(A)", "zincCoating": ">=120 ก./ตร.ม.", "postType": "เหล็กรูปตัว H", "standard": "GB/T 19889, ISO 717"}),
        "applications_en": json.dumps(["Urban roads", "Expressways", "Railway lines", "Metro", "Industrial plants", "Residential protection"]),
        "applications_zh": json.dumps(["城市道路", "高速公路", "铁路线", "地铁", "工业厂房", "住宅区防护"]),
        "applications_vi": json.dumps(["Đường đô thị", "Đường cao tốc", "Đường sắt", "Metro", "Nhà máy công nghiệp", "Bảo vệ khu dân cư"]),
        "applications_th": json.dumps(["ถนนในเมือง", "ทางด่วน", "ทางรถไฟ", "รถไฟฟ้า", "โรงงานอุตสาหกรรม", "ป้องกันที่อยู่อาศัย"]),
        "seo_title_en": "Metal Upright Noise Barrier: Most Economical Vertical Sound Wall (10-20 dB)",
        "seo_title_zh": "金属直立声屏障：最经济的垂直隔音墙（降噪10-20dB）",
        "seo_title_vi": "Tấm Chắn Ồn Kim Loại Đứng Thẳng: Vách Tiêu Âm Kinh Tế Nhất (10-20 dB)",
        "seo_title_th": "แผงกั้นเสียงโลหะแนวตั้ง: ผนังกันเสียงประหยัดที่สุด (10-20 dB)",
        "seo_keywords_en": "metal upright noise barrier, vertical sound wall, acoustic wall panel, noise barrier panel, galvanized sound barrier",
        "seo_keywords_zh": "金属直立声屏障,垂直隔音墙,声屏障面板,隔音墙板,镀锌声屏障",
        "seo_keywords_vi": "tấm chắn ồn kim loại đứng, vách tiêu âm đứng, tấm cách âm, tấm chắn ồn mạ kẽm",
        "seo_keywords_th": "แผงกั้นเสียงโลหะแนวตั้ง, ผนังกันเสียงแนวตรง, แผงซับเสียง, แผงกั้นเสียงชุบกัลวาไนซ์",
        "seo_description_en": "Metal upright noise barrier: the most economical vertical sound wall. Galvanized steel + mineral wool core, NRC 0.85, 10-20 dB(A) reduction. For roads, rail, industry. MOQ 100 m2.",
        "seo_description_zh": "金属直立声屏障：最经济的垂直隔音墙。镀锌钢板+岩棉芯材，NRC 0.85，降噪10-20dB(A)。适用于道路、铁路、工业。起订100平方米。",
        "seo_description_vi": "Tấm chắn ồn kim loại đứng thẳng: vách tiêu âm kinh tế nhất. Thép mạ kẽm + lõi bông khoáng, NRC 0.85, giảm 10-20 dB(A). Cho đường bộ, đường sắt, công nghiệp. MOQ 100 m2.",
        "seo_description_th": "แผงกั้นเสียงโลหะแนวตั้ง: ผนังกันเสียงประหยัดที่สุด เหล็กชุบกัลวาไนซ์ + แกนใยหิน NRC 0.85 ลดเสียง 10-20 dB(A) สำหรับถนน ทางรถไฟ อุตสาหกรรม MOQ 100 ตร.ม.",
        "faq_en": json.dumps(FAQ_EN), "faq_zh": json.dumps(FAQ_ZH),
        "faq_vi": json.dumps(FAQ_EN), "faq_th": json.dumps(FAQ_EN),
    },
]

# 先写第 4 个产品，后续 3 个在下一脚本追加
for p in products:
    cols = list(p.keys())
    placeholders = ','.join('?' for _ in cols)
    sql = f'INSERT INTO products ({",".join(cols)}) VALUES ({placeholders})'
    vals = [p[c] for c in cols]
    cur.execute(sql, vals)
    print('inserted:', p['slug'], 'id=', cur.lastrowid)

db.commit()
db.close()
print('done - 第4个产品已插入')
