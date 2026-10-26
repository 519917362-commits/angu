import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const content: Record<string, { title: string; description: string }> = {
    en: {
      title: 'Terms of Service — Angu Wire Mesh',
      description: 'Terms governing quotations, orders, delivery, warranty and claims for Angu Wire Mesh products.',
    },
    zh: {
      title: '服务条款 — 安固金属丝网',
      description: '安固金属丝网产品的报价、订单、交货、质保与索赔条款。',
    },
    vi: {
      title: 'Điều Khoản Dịch Vụ — Angu Wire Mesh',
      description: 'Điều khoản về báo giá, đơn hàng, giao hàng, bảo hành và khiếu nại đối với sản phẩm Angu Wire Mesh.',
    },
    th: {
      title: 'ข้อกำหนดการให้บริการ — Angu Wire Mesh',
      description: 'ข้อกำหนดเกี่ยวกับการเสนอราคา คำสั่งซื้อ การจัดส่ง การรับประกัน และการเรียกร้องสำหรับผลิตภัณฑ์ Angu Wire Mesh',
    },
  };
  const c = content[locale] || content.en;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `https://www.angumesh.com/${locale}/terms`,
      languages: {
        'x-default': 'https://www.angumesh.com/en/terms',
        en: 'https://www.angumesh.com/en/terms',
        zh: 'https://www.angumesh.com/zh/terms',
        vi: 'https://www.angumesh.com/vi/terms',
        th: 'https://www.angumesh.com/th/terms',
      },
    },
  };
}

type Section = { h4: string; body: string };

const pageContent: Record<string, { heading: string; updated: string; sections: Section[] }> = {
  en: {
    heading: 'Terms of Service',
    updated: 'Last updated: 26 October 2026',
    sections: [
      {
        h4: '1. Scope',
        body: 'These terms apply to quotations, orders and deliveries of wire mesh products manufactured or supplied by Anping County Angu Metal Wire Mesh Products Co., Ltd. ("we", "us"). Where a signed sales contract or a proforma invoice states different terms, that document prevails over these terms.',
      },
      {
        h4: '2. Quotations',
        body: 'Quotations are valid for 30 days unless stated otherwise, and are based on the specifications, quantity and delivery term stated in the quotation. Prices may be revised if the requested specification, quantity, packing or delivery term changes, or if raw material costs move materially before the order is confirmed.',
      },
      {
        h4: '3. Orders and Payment',
        body: 'An order becomes binding when we issue a signed proforma invoice and receive the agreed deposit. Payment terms, currency and the deposit ratio are set out in the proforma invoice; typical terms are a deposit by T/T with the balance against a copy of the shipping documents, or an irrevocable L/C at sight. Bank charges outside our account are for the buyer\'s account.',
      },
      {
        h4: '4. Delivery and Risk',
        body: 'Unless the quotation states otherwise, goods are sold FOB Tianjin (Incoterms 2020). Risk passes to the buyer when the goods are loaded on board. Production lead time runs from receipt of the deposit and confirmation of the drawings or specification, and excludes time lost to buyer-requested changes or force majeure.',
      },
      {
        h4: '5. Specifications and Tolerances',
        body: 'Products are manufactured to the standard or drawing stated in the order. Unless a tighter tolerance is agreed in writing, wire diameter and mesh aperture are subject to the tolerances permitted by the applicable standard (for gabion mesh, EN 10223-3 or ASTM A975). Colour and surface appearance of galvanised or PVC-coated wire may vary slightly between production batches.',
      },
      {
        h4: '6. Warranty and Claims',
        body: 'We warrant that goods conform to the agreed specification at the time of shipment. Any shortage, damage or non-conformity must be notified in writing within 7 days of arrival at the destination port, with photographs and packing details so that we can investigate. Verified non-conformity is remedied by replacement, rework or a price adjustment. The warranty does not cover normal corrosion progression, damage in transit after risk has passed, or faults caused by incorrect installation, cutting, welding or use outside the stated service conditions.',
      },
      {
        h4: '7. Intellectual Property',
        body: 'Drawings, specifications and technical documents we provide remain our property and are supplied solely for the purpose of the order. They may not be disclosed to third parties or used to obtain the same goods from another supplier without our written consent.',
      },
      {
        h4: '8. Limitation of Liability',
        body: 'Our liability for any claim arising from an order is limited to the invoiced value of the goods concerned. We are not liable for loss of profit, loss of production, delay costs or any other indirect or consequential loss. Nothing in these terms excludes liability that cannot be excluded by law.',
      },
      {
        h4: '9. Force Majeure',
        body: 'Neither party is liable for delay or failure to perform caused by events beyond its reasonable control, including natural disasters, epidemic control measures, war, civil unrest, government action, port closure, or interruption of power, transport or raw material supply. The affected party shall notify the other promptly and use reasonable efforts to resume performance.',
      },
      {
        h4: '10. Governing Law and Disputes',
        body: 'These terms are governed by the laws of the People\'s Republic of China. The parties shall first attempt to resolve any dispute by negotiation; failing that, the dispute shall be submitted to a competent court at the seller\'s place of business, unless the sales contract provides for arbitration.',
      },
      {
        h4: '11. Contact',
        body: 'Questions about these terms, quotations or an existing order: annie@angumesh.com, or +86 188 0318 9797 (WhatsApp available). Our registered address is South Wangzhuang Town, Houzhaotuan Village, Anping County, Hengshui, Hebei, China.',
      },
    ],
  },

  zh: {
    heading: '服务条款',
    updated: '最后更新：2026 年 10 月 26 日',
    sections: [
      {
        h4: '一、适用范围',
        body: '本条款适用于安平县安固金属丝网制品有限公司（以下称"本公司"）报价、承接和交付的丝网制品。若双方签署的销售合同或形式发票另作约定，以该文件为准。',
      },
      {
        h4: '二、报价',
        body: '除另有说明外，报价有效期为 30 天，并以报价单载明的规格、数量与交货条件为基础。若规格、数量、包装或交货条件变更，或订单确认前原材料价格发生显著波动，本公司可调整价格。',
      },
      {
        h4: '三、订单与付款',
        body: '订单在本公司出具盖章形式发票并收到约定定金后生效。付款方式、币种与定金比例以形式发票为准，常见为电汇支付定金、凭装运单据副本支付尾款，或即期不可撤销信用证。本公司账户以外产生的银行费用由买方承担。',
      },
      {
        h4: '四、交货与风险',
        body: '除报价单另有约定外，货物按 FOB 天津（Incoterms 2020）交付，风险自货物装船时起转移至买方。生产周期自收到定金并确认图纸或规格之日起算，不含因买方变更要求或不可抗力造成的时间损失。',
      },
      {
        h4: '五、规格与公差',
        body: '产品按订单载明的标准或图纸制造。除双方另行书面约定更严格公差外，丝径与网孔适用相应标准允许的公差（石笼网为 EN 10223-3 或 ASTM A975）。热镀锌或 PVC 包塑丝的颜色与表面外观在不同生产批次间可能存在轻微差异。',
      },
      {
        h4: '六、质保与索赔',
        body: '本公司保证货物在装运时符合约定规格。若出现短少、破损或不符合约定的情形，买方应在货物到达目的港后 7 日内书面通知本公司，并提供照片与包装信息以便核查。经确认的不符情形，本公司通过换货、返工或价格调整予以解决。质保不涵盖正常的腐蚀进程、风险转移后的运输损坏，以及因安装、切割、焊接不当或超出约定使用条件导致的故障。',
      },
      {
        h4: '七、知识产权',
        body: '本公司提供的图纸、规格与技术文件归本公司所有，仅为履行订单之目的提供。未经本公司书面同意，不得向第三方披露，亦不得用于向其他供应商采购相同货物。',
      },
      {
        h4: '八、责任限制',
        body: '本公司就订单相关索赔承担的责任，以该批货物的发票金额为上限。本公司不承担利润损失、停产损失、延误费用及其他间接或后果性损失。本条不排除依法不可排除的责任。',
      },
      {
        h4: '九、不可抗力',
        body: '因自然灾害、防疫管控措施、战争、动乱、政府行为、港口封闭，或电力、运输、原材料供应中断等超出合理控制范围的事件导致迟延或无法履行的，双方均不承担违约责任。受影响一方应及时通知对方，并采取合理措施恢复履行。',
      },
      {
        h4: '十、适用法律与争议解决',
        body: '本条款适用中华人民共和国法律。双方应先协商解决争议；协商不成的，除销售合同约定仲裁外，提交卖方所在地有管辖权的人民法院解决。',
      },
      {
        h4: '十一、联系方式',
        body: '有关本条款、报价或既有订单的问题，请联系 annie@angumesh.com 或 +86 188 0318 9797（可用 WhatsApp）。公司地址：河北省衡水市安平县南王庄镇后赵疃村。',
      },
    ],
  },

  vi: {
    heading: 'Điều Khoản Dịch Vụ',
    updated: 'Cập nhật lần cuối: 26 tháng 10, 2026',
    sections: [
      {
        h4: '1. Phạm vi áp dụng',
        body: 'Các điều khoản này áp dụng cho việc báo giá, đặt hàng và giao nhận các sản phẩm lưới thép do Công ty TNHH Sản phẩm Lưới Kim loại An Cố huyện An Bình (sau đây gọi là "chúng tôi") sản xuất hoặc cung cấp. Trường hợp hợp đồng mua bán đã ký hoặc hóa đơn chiếu lệ (proforma invoice) có quy định khác, tài liệu đó sẽ được ưu tiên áp dụng.',
      },
      {
        h4: '2. Báo giá',
        body: 'Trừ khi có quy định khác, báo giá có hiệu lực 30 ngày và dựa trên quy cách, số lượng và điều kiện giao hàng ghi trong báo giá. Giá có thể được điều chỉnh nếu quy cách, số lượng, đóng gói hoặc điều kiện giao hàng thay đổi, hoặc nếu giá nguyên liệu biến động đáng kể trước khi đơn hàng được xác nhận.',
      },
      {
        h4: '3. Đơn hàng và thanh toán',
        body: 'Đơn hàng có hiệu lực khi chúng tôi phát hành hóa đơn chiếu lệ đã ký và nhận được tiền đặt cọc theo thỏa thuận. Điều kiện thanh toán, loại tiền và tỷ lệ đặt cọc được ghi trong hóa đơn chiếu lệ; điều kiện thông thường là đặt cọc bằng T/T và thanh toán phần còn lại khi nhận bản sao chứng từ vận tải, hoặc L/C không hủy ngang trả ngay. Phí ngân hàng phát sinh ngoài tài khoản của chúng tôi do bên mua chịu.',
      },
      {
        h4: '4. Giao hàng và rủi ro',
        body: 'Trừ khi báo giá quy định khác, hàng được bán theo điều kiện FOB Thiên Tân (Incoterms 2020). Rủi ro chuyển sang bên mua khi hàng được xếp lên tàu. Thời gian sản xuất được tính từ khi nhận tiền đặt cọc và xác nhận bản vẽ hoặc quy cách, không bao gồm thời gian bị mất do bên mua yêu cầu thay đổi hoặc do bất khả kháng.',
      },
      {
        h4: '5. Quy cách và dung sai',
        body: 'Sản phẩm được sản xuất theo tiêu chuẩn hoặc bản vẽ ghi trong đơn hàng. Trừ khi hai bên thỏa thuận bằng văn bản một dung sai chặt hơn, đường kính dây và kích thước mắt lưới tuân theo dung sai của tiêu chuẩn áp dụng (đối với lưới gabion là EN 10223-3 hoặc ASTM A975). Màu sắc và bề mặt dây mạ kẽm hoặc bọc PVC có thể khác nhau nhẹ giữa các lô sản xuất.',
      },
      {
        h4: '6. Bảo hành và khiếu nại',
        body: 'Chúng tôi bảo đảm hàng hóa phù hợp với quy cách đã thỏa thuận tại thời điểm giao hàng. Mọi thiếu hụt, hư hỏng hoặc không phù hợp phải được thông báo bằng văn bản trong vòng 7 ngày kể từ khi hàng đến cảng đích, kèm hình ảnh và thông tin đóng gói để chúng tôi kiểm tra. Trường hợp không phù hợp đã được xác minh sẽ được xử lý bằng thay thế, làm lại hoặc điều chỉnh giá. Bảo hành không bao gồm quá trình ăn mòn tự nhiên, hư hỏng trong vận chuyển sau khi rủi ro đã chuyển giao, hoặc lỗi do lắp đặt, cắt, hàn không đúng cách hay sử dụng ngoài điều kiện đã nêu.',
      },
      {
        h4: '7. Sở hữu trí tuệ',
        body: 'Bản vẽ, quy cách và tài liệu kỹ thuật do chúng tôi cung cấp thuộc quyền sở hữu của chúng tôi và chỉ được cung cấp nhằm mục đích thực hiện đơn hàng. Không được tiết lộ cho bên thứ ba hoặc sử dụng để mua cùng loại hàng từ nhà cung cấp khác nếu không có sự đồng ý bằng văn bản của chúng tôi.',
      },
      {
        h4: '8. Giới hạn trách nhiệm',
        body: 'Trách nhiệm của chúng tôi đối với bất kỳ khiếu nại nào phát sinh từ một đơn hàng được giới hạn ở giá trị trên hóa đơn của lô hàng liên quan. Chúng tôi không chịu trách nhiệm về mất lợi nhuận, mất sản xuất, chi phí chậm trễ hoặc bất kỳ tổn thất gián tiếp nào khác. Các điều khoản này không loại trừ trách nhiệm mà pháp luật không cho phép loại trừ.',
      },
      {
        h4: '9. Bất khả kháng',
        body: 'Không bên nào phải chịu trách nhiệm về chậm trễ hoặc không thực hiện nghĩa vụ do các sự kiện ngoài tầm kiểm soát hợp lý, bao gồm thiên tai, biện pháp kiểm soát dịch bệnh, chiến tranh, bất ổn dân sự, hành động của chính phủ, đóng cửa cảng, hoặc gián đoạn điện, vận tải hay nguồn cung nguyên liệu. Bên bị ảnh hưởng phải thông báo kịp thời và nỗ lực hợp lý để tiếp tục thực hiện.',
      },
      {
        h4: '10. Luật áp dụng và giải quyết tranh chấp',
        body: 'Các điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa Nhân dân Trung Hoa. Hai bên trước tiên sẽ thương lượng để giải quyết tranh chấp; nếu không đạt kết quả, trừ khi hợp đồng mua bán có quy định trọng tài, tranh chấp sẽ được đưa ra tòa án có thẩm quyền tại nơi đặt trụ sở của bên bán.',
      },
      {
        h4: '11. Liên hệ',
        body: 'Mọi câu hỏi về các điều khoản này, báo giá hoặc đơn hàng hiện có: annie@angumesh.com, hoặc +86 188 0318 9797 (có WhatsApp). Địa chỉ đăng ký: Thị trấn Nam Vương Trang, thôn Hậu Triệu Thoản, huyện An Bình, Hành Thủy, Hà Bắc, Trung Quốc.',
      },
    ],
  },

  th: {
    heading: 'ข้อกำหนดการให้บริการ',
    updated: 'ปรับปรุงล่าสุด: 26 ตุลาคม 2026',
    sections: [
      {
        h4: '1. ขอบเขต',
        body: 'ข้อกำหนดนี้ใช้กับการเสนอราคา การสั่งซื้อ และการจัดส่งผลิตภัณฑ์ตาข่ายเหล็กที่ผลิตหรือจำหน่ายโดยบริษัท อานผิง อานกู่ โลหะ ตาข่าย ผลิตภัณฑ์ จำกัด ("เรา") หากสัญญาซื้อขายที่ลงนามแล้วหรือใบแจ้งหนี้ชั่วคราว (proforma invoice) กำหนดเงื่อนไขต่างออกไป ให้ยึดเอกสารนั้นเป็นหลัก',
      },
      {
        h4: '2. การเสนอราคา',
        body: 'เว้นแต่จะระบุไว้เป็นอย่างอื่น ราคาที่เสนอมีอายุ 30 วัน และอ้างอิงจากข้อกำหนดสินค้า จำนวน และเงื่อนไขการจัดส่งที่ระบุในใบเสนอราคา ราคาอาจปรับได้หากข้อกำหนด จำนวน การบรรจุ หรือเงื่อนไขการจัดส่งเปลี่ยนแปลง หรือต้นทุนวัตถุดิบปรับตัวมากก่อนยืนยันคำสั่งซื้อ',
      },
      {
        h4: '3. คำสั่งซื้อและการชำระเงิน',
        body: 'คำสั่งซื้อจะมีผลเมื่อเราออกใบแจ้งหนี้ชั่วคราวที่ลงนามแล้วและได้รับเงินมัดจำตามที่ตกลง เงื่อนไขการชำระ สกุลเงิน และสัดส่วนเงินมัดจำระบุไว้ในใบแจ้งหนี้ชั่วคราว โดยทั่วไปคือชำระเงินมัดจำทาง T/T และชำระส่วนที่เหลือเมื่อได้รับสำเนาเอกสารการขนส่ง หรือใช้ L/C แบบเพิกถอนไม่ได้ที่มองเห็น ค่าธรรมเนียมธนาคารที่เกิดนอกบัญชีของเราเป็นความรับผิดชอบของผู้ซื้อ',
      },
      {
        h4: '4. การจัดส่งและความเสี่ยง',
        body: 'เว้นแต่ใบเสนอราคาจะระบุไว้เป็นอย่างอื่น สินค้าจำหน่ายตามเงื่อนไข FOB เทียนจิน (Incoterms 2020) ความเสี่ยงโอนไปยังผู้ซื้อเมื่อสินค้าถูกบรรทุกขึ้นเรือ ระยะเวลาผลิตนับจากวันที่ได้รับเงินมัดจำและการยืนยันแบบหรือข้อกำหนด และไม่รวมเวลาที่สูญเสียไปจากการเปลี่ยนแปลงที่ผู้ซื้อร้องขอหรือเหตุสุดวิสัย',
      },
      {
        h4: '5. ข้อกำหนดและการคลาดเคลื่อน',
        body: 'ผลิตภัณฑ์ผลิตตามมาตรฐานหรือแบบที่ระบุในคำสั่งซื้อ เว้นแต่จะตกลงเป็นลายลักษณ์อักษรให้ใช้ค่าคลาดเคลื่อนที่แคบกว่า เส้นผ่านศูนย์กลางลวดและขนาดช่องตาข่ายเป็นไปตามค่าคลาดเคลื่อนที่มาตรฐานที่ใช้กำหนด (สำหรับตาข่าย gabion คือ EN 10223-3 หรือ ASTM A975) สีและผิวของลวดชุบสังกะสีหรือหุ้ม PVC อาจแตกต่างกันเล็กน้อยระหว่างแต่ละล็อตการผลิต',
      },
      {
        h4: '6. การรับประกันและการเรียกร้อง',
        body: 'เรารับประกันว่าสินค้าตรงตามข้อกำหนดที่ตกลงกัน ณ เวลาที่จัดส่ง หากพบการขาดจำนวน ความเสียหาย หรือความไม่สอดคล้อง ต้องแจ้งเป็นลายลักษณ์อักษรภายใน 7 วันนับจากวันที่สินค้าถึงท่าเรือปลายทาง พร้อมภาพถ่ายและรายละเอียดการบรรจุเพื่อให้เราตรวจสอบ ความไม่สอดคล้องที่ตรวจสอบแล้วจะแก้ไขโดยการเปลี่ยนสินค้า การทำงานใหม่ หรือการปรับราคา การรับประกันไม่ครอบคลุมการกัดกร่อนตามธรรมชาติ ความเสียหายระหว่างขนส่งหลังจากความเสี่ยงโอนแล้ว หรือข้อบกพร่องจากการติดตั้ง การตัด การเชื่อมที่ไม่ถูกต้อง หรือการใช้งานนอกเงื่อนไขที่ระบุ',
      },
      {
        h4: '7. ทรัพย์สินทางปัญญา',
        body: 'แบบ ข้อกำหนด และเอกสารทางเทคนิคที่เราให้ไว้ยังคงเป็นทรัพย์สินของเรา และให้ไว้เพื่อวัตถุประสงค์ในการดำเนินการตามคำสั่งซื้อเท่านั้น ห้ามเปิดเผยต่อบุคคลที่สามหรือนำไปใช้จัดหาสินค้าชนิดเดียวกันจากผู้จำหน่ายรายอื่นโดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากเรา',
      },
      {
        h4: '8. ข้อจำกัดความรับผิด',
        body: 'ความรับผิดของเราต่อการเรียกร้องใด ๆ ที่เกิดจากคำสั่งซื้อจำกัดอยู่ที่มูลค่าตามใบแจ้งหนี้ของสินค้าที่เกี่ยวข้อง เราไม่รับผิดชอบต่อการสูญเสียกำไร การหยุดชะงักการผลิต ค่าใช้จ่ายจากความล่าช้า หรือความเสียหายทางอ้อมอื่นใด ข้อกำหนดนี้ไม่ยกเว้นความรับผิดที่ไม่สามารถยกเว้นได้ตามกฎหมาย',
      },
      {
        h4: '9. เหตุสุดวิสัย',
        body: 'คู่สัญญาฝ่ายใดไม่ต้องรับผิดต่อความล่าช้าหรือการไม่สามารถปฏิบัติตามสัญญาอันเนื่องมาจากเหตุการณ์ที่อยู่นอกเหนือการควบคุมอย่างสมเหตุสมผล รวมถึงภัยธรรมชาติ มาตรการควบคุมโรคระบาด สงคราม ความไม่สงบในประเทศ การกระทำของรัฐบาล การปิดท่าเรือ หรือการหยุดชะงักของไฟฟ้า การขนส่ง หรือการจัดหาวัตถุดิบ ฝ่ายที่ได้รับผลกระทบต้องแจ้งอีกฝ่ายโดยเร็วและใช้ความพยายามอย่างสมเหตุสมผลในการกลับมาปฏิบัติตามสัญญา',
      },
      {
        h4: '10. กฎหมายที่ใช้บังคับและการระงับข้อพิพาท',
        body: 'ข้อกำหนดนี้อยู่ภายใต้กฎหมายของสาธารณรัฐประชาชนจีน คู่สัญญาจะเจรจาเพื่อระงับข้อพิพาทก่อน หากไม่สำเร็จ ให้ยื่นข้อพิพาทต่อศาลที่มีเขตอำนาจ ณ สถานประกอบการของผู้ขาย เว้นแต่สัญญาซื้อขายกำหนดให้ใช้อนุญาโตตุลาการ',
      },
      {
        h4: '11. ติดต่อ',
        body: 'สอบถามเกี่ยวกับข้อกำหนดเหล่านี้ ใบเสนอราคา หรือคำสั่งซื้อที่มีอยู่: annie@angumesh.com หรือ +86 188 0318 9797 (มี WhatsApp) ที่อยู่จดทะเบียน: ตำบลหนานหวังจวง หมู่บ้านโหวเจาทวน อำเภออานผิง เหิงสุ่ย เหอเป่ย ประเทศจีน',
      },
    ],
  },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = pageContent[locale] || pageContent.en;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{c.heading}</h1>
        <p className="text-sm text-slate-500 mb-8">{c.updated}</p>

        {c.sections.map((section, i) => (
          <div key={i} className="mb-8">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">{section.h4}</h4>
            <p className="text-slate-600 leading-relaxed">{section.body}</p>
          </div>
        ))}

        <p className="text-xs text-slate-400 mt-12 border-t border-slate-100 pt-8">
          &copy; {new Date().getFullYear()} Anping County Angu Metal Wire Mesh Products Co., Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
