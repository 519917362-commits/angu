#!/usr/bin/env python3
"""Write 8 GEO FAQs to all 30 products in local database."""
import sqlite3, json

DB = "backend/inquiries.db"
conn = sqlite3.connect(DB)

FAQ_EN = [
    {"q":"What is the minimum order quantity (MOQ)?","a":"Standard MOQ is 1000 square meters per specification. For trial orders, 500 sqm can be arranged with a small-batch surcharge. Custom specifications may require higher MOQ. Contact us for exact pricing based on your required quantity."},
    {"q":"What certifications do your products have?","a":"Our products are ISO 9001:2015 certified. Welded and hexagonal mesh products also carry CE certification (EN 10223-3 for gabions, EN 10244-2 for zinc coating). Mill test certificates with actual tensile strength and zinc weight data are provided with each shipment."},
    {"q":"How long is the delivery time?","a":"Standard products ship in 15-20 days after order confirmation. Custom specifications take 25-35 days. For urgent orders, we can expedite to 10-15 days with a rush fee. Container loading is typically 20-25 tons per 20ft container."},
    {"q":"Do you provide free samples?","a":"Yes, we provide free A4-size samples for quality evaluation. The customer covers the express shipping cost (typically USD 30-50 via DHL/FedEx). Sample preparation takes 2-3 working days."},
    {"q":"What payment terms do you accept?","a":"T/T (30% deposit, 70% against B/L copy) or L/C at sight. For long-term partners, we offer T/T 30 days net. Western Union is available for sample orders under USD 1000."},
    {"q":"What industries use your products?","a":"Our products serve construction, mining, agriculture, highway infrastructure, water conservancy, landscaping, and industrial sectors across 30+ countries."},
    {"q":"What packaging do you use?","a":"Standard export packaging: moisture-proof kraft paper inner layer + palletized bundles secured with steel straps. Each bundle is clearly labeled with product specs, quantity, and batch number. Custom packaging (color boxes, private labels) is available."},
    {"q":"How do I get a quote?","a":"Send us your required specifications (wire diameter, mesh size, dimensions, quantity), surface treatment (galvanized/PVC/stainless), and delivery port. We reply within 24 hours with a detailed FOB/CIF quotation."},
]
FAQ_ZH = [
    {"q":"最小起订量是多少？","a":"标准起订量为每种规格1000平方米。试单可安排500平方米（含小批量附加费）。定制规格可能需更高起订量。请联系我们获取基于您所需数量的精确报价。"},
    {"q":"产品有哪些认证？","a":"产品通过ISO 9001:2015质量管理体系认证。焊接网和六角网产品同时具备CE认证（石笼网EN 10223-3，镀锌层EN 10244-2）。每批货物附带包含实测抗拉强度和镀锌重量数据的出厂检验报告。"},
    {"q":"交货期多长？","a":"标准产品确认订单后15-20天发货。定制规格25-35天。紧急订单可加急至10-15天（含加急费）。20尺柜通常装载20-25吨。"},
    {"q":"提供免费样品吗？","a":"是的，我们提供免费A4尺寸样品供质量评估。客户承担快递运费（DHL/FedEx通常30-50美元）。样品准备需2-3个工作日。"},
    {"q":"接受哪些付款方式？","a":"T/T电汇（30%定金，70%见提单副本付清）或即期信用证。长期合作客户可提供T/T 30天账期。1000美元以下样品订单支持西联汇款。"},
    {"q":"产品用于哪些行业？","a":"产品服务于建筑、矿山、农业、公路基础设施、水利、园林绿化和工业领域，覆盖30+国家和地区。"},
    {"q":"使用什么包装？","a":"标准出口包装：防潮牛皮纸内层 + 托盘捆扎钢带固定。每捆清晰标注产品规格、数量和批号。支持定制包装（彩盒、自有品牌）。"},
    {"q":"如何获取报价？","a":"请将您需要的规格（丝径、网孔、尺寸、数量）、表面处理（镀锌/PVC/不锈钢）和目的港发送给我们。我们会在24小时内回复详细的FOB/CIF报价。"},
]

fe = json.dumps(FAQ_EN, ensure_ascii=False)
fz = json.dumps(FAQ_ZH, ensure_ascii=False)
n = conn.execute("UPDATE products SET faq_en = ?, faq_zh = ? WHERE status = 'published'", [fe, fz]).rowcount
conn.commit()
conn.close()
print(f"Updated {n} products with FAQ data.")
