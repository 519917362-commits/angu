#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Translate 3 blog posts to Vietnamese (vi) and Thai (th), write to SQLite."""
import sqlite3, os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend/inquiries.db')

# Blog 1 vi
b1_vi = {
"title": "Tường Gabion Chống Trượt: Hướng Dẫn Thiết Kế & Thực Hành Tốt Nhất (2025)",
"abstract": "Hướng dẫn kỹ thuật đầy đủ về thiết kế tường gabion chống trượt, bao gồm tính toán tải trọng, yếu tố thoát nước và các nghiên cứu điển hình thực tế từ các dự án quốc tế.",
"content": """# Tường Gabion Chống Trượt: Hướng Dẫn Thiết Kế & Thực Hành Tốt Nhất

## Giới Thiệu
Tường gabion chống trượt ngày càng được ưa chuộng trong các dự án kỹ thuật dân dụng và cảnh quan trên toàn thế giới. Tính linh hoạt, khả năng thấm nước và khả năng tương thích với môi trường khiến chúng trở thành lựa chọn tuyệt vời cho nhiều ứng dụng khác nhau.

## Tường Gabion Chống Trượt Là Gì?
Tường gabion chống trượt bao gồm các rổ lưới dây kim loại chứa đầy đá hoặc sỏi, được xếp chồng để tạo thành cấu trúc tường trọng lực. Từ "gabion" có nguồn gốc từ tiếng Ý "gabbione", nghĩa là "lồng lớn".

## Ưu Điểm Chính
- **Linh hoạt**: Khác với tường bê tông cứng, tường gabion có thể thích ứng với chuyển động của nền đất mà không bị nứt
- **Khả năng thấm nước**: Nước có thể chảy qua, loại bỏ tình trạng tích tụ áp lực thủy tĩnh
- **Tích hợp môi trường**: Vẻ đẹp đá tự nhiên hòa hợp với cảnh quan
- **Hiệu quả chi phí**: Rẻ hơn 30-50% so với tường bê tông cốt thép
- **Độ bền**: Lưới dây PVC hoặc Galfan có tuổi thọ hơn 50 năm

## Thông Số Thiết Kế
1. Chiều cao tường: Có thể từ 1-15 mét
2. Góc mặt: Thường nghiêng 6° (dốc về phía sau)
3. Loại lưới: Lưới lục giác xoắn kép, lỗ 80mm×100mm
4. Đường kính dây: 2.7mm phủ PVC / 3.4mm viền
5. Đá lấp: Đá cứng, bền, kích thước 100-200mm được phân loại

## Thực Hành Thi Công Tốt Nhất
- Nền móng: Đầm chặt nền đất đến 95% độ chặt Proctor
- Thoát nước: Lắp đặt màng lọc địa kỹ phía sau tường
- Xếp đá: Xếp thủ công các viên đá lớn ở mặt trước, lấp bên trong bằng máy
- Kết nối: Buộc các rổ liền kề bằng dây xoắn ốc cách nhau 100mm

## Kết Luận
Tường gabion chống trượt cung cấp một giải pháp kỹ thuật, bền vững cho việc ổn định bờ dốc, kiểm soát xói mòn và cảnh quan kiến trúc. Với thiết kế và thi công đúng cách, chúng cung cấp hơn 50 năm dịch vụ không cần bảo trì.

## Câu Hỏi Thường Gặp
**H: Tường gabion có tuổi thọ bao lâu?**
Đ: Tường gabion phủ PVC thường có tuổi thọ hơn 50 năm. Tường phủ Galfan có thể tồn tại hơn 75 năm trong đất không ăn mòn.

**H: Chiều cao tối đa của tường gabion là bao nhiêu?**
Đ: Tường một tầng lên đến 6m. Tường nhiều tầng có thể đạt 15m với thiết kế kỹ thuật phù hợp.

**H: Tường gabion có cần hệ thống thoát nước không?**
Đ: Tường gabion có tính thấm nước tự nhiên, nhưng màng lọc địa kỹ phía sau tường giúp ngăn hiện tượng rửa đất.""",
"seo_title": "Hướng Dẫn Thiết Kế Tường Gabion | Angu",
"seo_desc": "Hướng dẫn kỹ thuật đầy đủ về thiết kế và thi công tường gabion.",
"seo_kw": "gabion retaining wall, gabion design guide, retaining wall construction, tường gabion, tường chống trượt, thi công tường gabion"
}

# Blog 1 th
b1_th = {
"title": "กำแพงเกเบียนกันดินถล่ม: คู่มือออกแบบและแนวปฏิบัติที่ดีที่สุด (2025)",
"abstract": "คู่มือวิศวกรรมฉบับสมบูรณ์สำหรับการออกแบบกำแพงเกเบียนกันดินถล่ม รวมถึงการคำนวณแรง การระบายน้ำ และกรณีศึกษาจริงจากโครงการระดับนานาชาติ",
"content": """# กำแพงเกเบียนกันดินถล่ม: คู่มือออกแบบและแนวปฏิบัติที่ดีที่สุด

## บทนำ
กำแพงเกเบียนกันดินถล่มได้รับความนิยมมากขึ้นในโครงการวิศวกรรมโยธาและจัดสวนทั่วโลก ความยืดหยุ่น ความสามารถในการซึมผ่านของน้ำ และความเข้ากันได้กับสิ่งแวดล้อมทำให้เป็นทางเลือกที่ยอดเยี่ยมสำหรับการใช้งานหลากหลายประเภท

## กำแพงเกเบียนกันดินถล่มคืออะไร?
กำแพงเกเบียนกันดินถล่มประกอบด้วยตะกร้าตาข่ายลวดที่บรรจุหินหรือหินกรวด วางซ้อนกันเป็นโครงสร้างกำแพงแรงโน้มถ่วง คำว่า "gabion" มาจากภาษาอิตาลี "gabbione" แปลว่า "กรงขนาดใหญ่"

## ข้อได้เปรียบหลัก
- **ความยืดหยุ่น**: ต่างจากกำแพงคอนกรีตแข็ง กำแพงเกเบียนสามารถปรับตัวตามการเคลื่อนตัวของพื้นดินโดยไม่แตกร้าว
- **ความสามารถในการซึมผ่าน**: น้ำสามารถไหลผ่านได้ ขจัดปัญหาการสะสมแรงดันน้ำใต้ดิน
- **การผสานเข้ากับสิ่งแวดล้อม**: ลักษณะหินธรรมชาติกลมกลืนกับภูมิทัศน์
- **คุ้มค่าต้นทุน**: ถูกกว่ากำแพงคอนกรีตเสริมเหล็ก 30-50%
- **ความทนทาน**: ตาข่ายลวดเคลือบ PVC หรือ Galfan มีอายุการใช้งานมากกว่า 50 ปี

## พารามิเตอร์การออกแบบ
1. ความสูงกำแพง: ได้ตั้งแต่ 1-15 เมตร
2. มุมหน้า: โดยทั่วไปเอียง 6° (เอียงไปทางด้านหลัง)
3. ประเภทตาข่าย: ตาข่ายหกเหลี่ยมเกลียวคู่ ช่องเปิด 80mm×100mm
4. เส้นผ่านศูนย์กลางลวด: 2.7mm เคลือบ PVC / 3.4mm ขอบ
5. หินบรรจุ: หินแข็ง ทนทาน ขนาด 100-200mm แบ่งขนาด

## แนวปฏิบัติการก่อสร้างที่ดีที่สุด
- พื้นฐาน: บดอัดพื้นดินให้แน่นถึง 95% ความหนาแน่น Proctor
- การระบายน้ำ: ติดตั้งผ้ากรองทางวิศวกรรมด้านหลังกำแพง
- การจัดวางหิน: จัดวางหินขนาดใหญ่ที่ด้านหน้าด้วยมือ เติมด้านในด้วยเครื่องจักร
- การเชื่อมต่อ: มัดตะกร้าที่อยู่ติดกันด้วยเส้นลวดเกลียวสปริงห่างกัน 100mm

## บทสรุป
กำแพงเกเบียนกันดินถล่มเป็นโซลูชันทางวิศวกรรมที่ยั่งยืนสำหรับการทรุดตัวของดิน การป้องกันการพังทลาย และการจัดภูมิทัศน์ทางสถาปัตยกรรม ด้วยการออกแบบและก่อสร้างที่เหมาะสม สามารถให้บริการโดยไม่ต้องบำรุงรักษามากกว่า 50 ปี

## คำถามที่พบบ่อย
**ถาม: กำแพงเกเบียนมีอายุการใช้งานนานเท่าใด?**
ตอบ: กำแพงเกเบียนเคลือบ PVC มักมีอายุการใช้งานมากกว่า 50 ปี กำแพงเคลือบ Galfan สามารถใช้งานได้มากกว่า 75 ปีในดินที่ไม่กัดกร่อน

**ถาม: ความสูงสูงสุดของกำแพงเกเบียนคือเท่าใด?**
ตอบ: กำแพงชั้นเดียวสูงได้ถึง 6 เมตร กำแพงหลายชั้นสามารถสูงถึง 15 เมตรด้วยการออกแบบทางวิศวกรรมที่เหมาะสม

**ถาม: กำแพงเกเบียนต้องมีระบบระบายน้ำหรือไม่?**
ตอบ: กำแพงเกเบียนมีความสามารถในการซึมน้ำได้ตามธรรมชาติ แต่ผ้ากรองทางวิศวกรรมด้านหลังกำแพงช่วยป้องกันการพังทลายของดิน""",
"seo_title": "คู่มือออกแบบกำแพงเกเบียน | Angu",
"seo_desc": "คู่มือวิศวกรรมฉบับสมบูรณ์สำหรับการออกแบบและก่อสร้างกำแพงเกเบียน",
"seo_kw": "gabion retaining wall, gabion design guide, retaining wall construction, กำแพงเกเบียน, กำแพงกันดินถล่ม, การก่อสร้างเกเบียน"
}

# Blog 2 vi
b2_vi = {
"title": "Hệ Thống Lưới Chống Đá Rơi: Nghiên Cứu Điển Hình & Chứng Nhận",
"abstract": "Phân tích chuyên sâu về các công trình lắp đặt lưới chống đá rơi trên các tuyến đường cao tốc miền núi, với yêu cầu chứng nhận ETAG 027 và kết quả kiểm tra hiệu suất.",
"content": """# Hệ Thống Lưới Chống Đá Rơi

## Tổng Quan
Lưới chống đá rơi là hạ tầng an toàn thiết yếu cho đường cao tốc, đường sắt và các hoạt động khai khoáng ở vùng miền núi. Angu Wire Mesh cung cấp hệ thống chống đá rơi có chứng nhận CE đáp ứng tiêu chuẩn ETAG 027.

## Phân Loại Hệ Thống
1. **Lưới Vòng RXI-200**: Hấp thụ năng lượng 200kJ, đường kính vòng 300mm
2. **Lưới Treo Galfan**: Phủ bề mặt dốc liên tục, lớp phủ Zn-5%Al
3. **Rào Chặn Dòng Bùn Đá**: Công suất 500kJ, neo cọc vi mô

## Yêu Cầu Chứng Nhận
- ETAG 027: Hướng dẫn Phê duyệt Kỹ thuật Châu Âu cho bộ sản phẩm chống đá rơi
- ISO 17746:2016 về thiết kế và kiểm tra
- Dấu CE bắt buộc cho các dự án tại EU
- Xếp hạng MEL (Mức Năng lượng Tối đa) và SEL (Mức Năng lượng Vận hành)

## Nghiên Cứu Điển Hình: Dự Án Đường Cao Tốc Tứ Xuyên
- Địa điểm: Tứ Xuyên, Trung Quốc
- Thách thức: Sự kiện đá rơi thường xuyên trên đoạn đường miền núi dài 2km
- Giải pháp: Lắp đặt 8 rào chặn RXI-500 (công suất 500kJ mỗi rào)
- Kết quả: Không có sự kiện đá rơi nào trong 3 năm kể từ khi lắp đặt

## Kết Luận
Hệ thống chống đá rơi đòi hỏi kỹ thuật nghiêm ngặt và vật liệu được chứng nhận. Hệ thống tuân thủ ETAG 027 của Angu mang lại hiệu suất đã được chứng minh thực tế.

## Câu Hỏi Thường Gặp
**H: ETAG 027 là gì?**
Đ: Hướng dẫn Phê duyệt Kỹ thuật Châu Âu cho bộ sản phẩm chống đá rơi. Quy định các mức năng lượng và quy trình kiểm tra.

**H: Lưới chống đá rơi có tuổi thọ bao lâu?**
Đ: Lưới phủ Galfan có tuổi thọ hơn 50 năm. Lưới mạ kẽm nhúng nóng có tuổi thọ 25-30 năm tùy thuộc vào môi trường.

**H: Có những mức năng lượng nào?**
Đ: Phạm vi tiêu chuẩn từ 100kJ đến 3000kJ. Có giải pháp tùy chỉnh cho các yêu cầu năng lượng cao hơn.""",
"seo_title": "Nghiên Cứu Điển Hình Lưới Chống Đá Rơi | Angu",
"seo_desc": "Nghiên cứu điển hình lưới chống đá rơi và hướng dẫn chứng nhận ETAG 027.",
"seo_kw": "rockfall protection, ETAG 027, slope safety, rockfall net, lưới chống đá rơi, an toàn sườn núi, rào chặn đá rơi"
}

# Blog 2 th
b2_th = {
"title": "ระบบตาข่ายกันหินตก: กรณีศึกษาและการรับรองมาตรฐาน",
"abstract": "การวิเคราะห์เชิงลึกของการติดตั้งตาข่ายกันหินตกบนทางหลวงภูเขา พร้อมข้อกำหนดการรับรอง ETAG 027 และผลการทดสอบประสิทธิภาพ",
"content": """# ระบบตาข่ายกันหินตก

## ภาพรวม
ตาข่ายกันหินตกเป็นโครงสร้างพื้นฐานด้านความปลอดภัยที่จำเป็นสำหรับทางหลวง ทางรถไฟ และการดำเนินงานเหมืองแร่ในเขตภูเขา Angu Wire Mesh จัดหาระบบกันหินตกที่ได้รับการรับรอง CE ซึ่งเป็นไปตามมาตรฐาน ETAG 027

## ประเภทระบบ
1. **ตาข่ายวงแหวน RXI-200**: ดูดซับพลังงาน 200kJ เส้นผ่านศูนย์กลางวงแหวน 300mm
2. **ตาข่ายห้อย Galfan**: ปูคลุมทางลาดภูเขาอย่างต่อเนื่อง การเคลือบ Zn-5%Al
3. **แนวกันกรวดถล่ม**: รองรับพลังงาน 500kJ ยึดด้วยเสาเข็มขนาดเล็ก

## ข้อกำหนดการรับรอง
- ETAG 027: แนวทางการอนุมัติทางเทคนิคยุโรปสำหรับชุดอุปกรณ์กันหินตก
- ISO 17746:2016 สำหรับการออกแบบและการทดสอบ
- เครื่องหมาย CE เป็นข้อบังคับสำหรับโครงการในสหภาพยุโรป
- การจัดอันดับ MEL (ระดับพลังงานสูงสุด) และ SEL (ระดับพลังงานใช้งาน)

## กรณีศึกษา: โครงการทางหลวงเสฉวน
- สถานที่: เสฉวน ประเทศจีน
- ความท้าทาย: เหตุการณ์หินตกบ่อยครั้งบนทางหลวงภูเขาระยะทาง 2 กม.
- แนวทางแก้ไข: ติดตั้งแนวกัน RXI-500 จำนวน 8 ชุด (รองรับพลังงาน 500kJ ต่อชุด)
- ผลลัพธ์: ไม่มีเหตุการณ์หินตกเลยในระยะเวลา 3 ปีนับจากการติดตั้ง

## บทสรุป
ระบบกันหินตกต้องการวิศวกรรมที่เข้มงวดและวัสดุที่ได้รับการรับรอง ระบบที่สอดคล้อง ETAG 027 ของ Angu ให้ประสิทธิภาพที่พิสูจน์แล้วในภาคสนาม

## คำถามที่พบบ่อย
**ถาม: ETAG 027 คืออะไร?**
ตอบ: แนวทางการอนุมัติทางเทคนิคยุโรปสำหรับชุดอุปกรณ์กันหินตก กำหนดระดับพลังงานและขั้นตอนการทดสอบ

**ถาม: ตาข่ายกันหินตกมีอายุการใช้งานนานเท่าใด?**
ตอบ: ตาข่ายเคลือบ Galfan มีอายุการใช้งานมากกว่า 50 ปี ตาข่ายชุบสังกะสีแบบจุ่มร้อนมีอายุ 25-30 ปีขึ้นอยู่กับสภาพแวดล้อม

**ถาม: มีระดับพลังงานใดบ้าง?**
ตอบ: ช่วงมาตรฐานตั้งแต่ 100kJ ถึง 3000kJ มีโซลูชันเฉพาะสำหรับความต้องการพลังงานที่สูงกว่า""",
"seo_title": "กรณีศึกษาตาข่ายกันหินตก | Angu",
"seo_desc": "กรณีศึกษาตาข่ายกันหินตกและคู่มือการรับรอง ETAG 027",
"seo_kw": "rockfall protection, ETAG 027, slope safety, rockfall net, ตาข่ายกันหินตก, ความปลอดภัยทางลาด, แนวกันหินตก"
}

# Blog 3 vi
b3_vi = {
"title": "Cách Chọn Nhà Cung Cấp Lưới Thép Uy Tín Tại Trung Quốc (Hướng Dẫn 2025)",
"abstract": "Hướng dẫn mua hàng toàn diện bao gồm kiểm tra nhà máy, chứng nhận chất lượng, quy trình thử mẫu và các dấu hiệu cảnh báo khi tìm nguồn cung cấp sản phẩm lưới thép từ Trung Quốc.",
"content": """# Cách Chọn Nhà Cung Cấp Lưới Thép Uy Tín Tại Trung Quốc

## 1. Xác Minh Nhà Máy
- Đến thăm nhà máy hoặc ủy ban kiểm toán bên thứ ba
- Kiểm tra năng lực sản xuất và trang thiết bị (dây chuyền tự động > thủ công)
- Xem xét quy trình kiểm soát chất lượng (có chứng nhận ISO 9001)

## 2. Các Chứng Nhận Cần Tìm
- **ISO 9001:2015**: Hệ thống quản lý chất lượng
- **Dấu CE**: Bắt buộc để tiếp cận thị trường EU
- **ETAG 027**: Riêng cho bộ sản phẩm chống đá rơi
- **AASHTO M180**: Tiêu chuẩn lan can đường cao tốc (thị trường Mỹ)

## 3. Thử Nghiệm Mẫu
- Yêu cầu mẫu vật lý trước khi đặt hàng số lượng lớn
- Kiểm tra độ dày lớp mạ kẽm (≥80g/m² cho mạ kẽm nhúng nóng tiêu chuẩn)
- Xác minh độ bền kéo của dây (≥380 N/mm²)
- Thử nghiệm phun muối để kiểm tra khả năng chống ăn mòn

## 4. Dấu Hiệu Cảnh Báo
- Giá thấp hơn đáng kể so với mức trung bình thị trường
- Không có địa chỉ nhà máy cụ thể
- Ngần ngại cung cấp chứng nhận
- Không có lịch sử xuất khẩu hoặc tham chiếu

## Kết Luận
Việc chọn nhà cung cấp lưới thép phù hợp tại Trung Quốc đòi hỏi sự thẩm định kỹ lưỡng. Kiểm tra nhà máy, xác minh chứng nhận và thử nghiệm mẫu là những bước thiết yếu để đảm bảo chất lượng sản phẩm và duy trì quan hệ đối tác lâu dài.

## Câu Hỏi Thường Gặp
**H: Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?**
Đ: Thường là 500-1000 đơn vị cho sản phẩm tiêu chuẩn. Thiết kế tùy chỉnh có thể yêu cầu MOQ cao hơn.

**H: Thời gian sản xuất mất bao lâu?**
Đ: Sản phẩm tiêu chuẩn: 7-15 ngày. Đặt hàng tùy chỉnh: 20-30 ngày tùy thuộc vào độ phức tạp.

**H: Điều khoản thanh toán tiêu chuẩn là gì?**
Đ: 30% tiền cọc T/T, 70% số dư trước khi giao hàng. L/C có sẵn cho đơn hàng trên 50.000 USD.""",
"seo_title": "Cách Chọn Nhà Cung Cấp Lưới Thép Trung Quốc | Angu",
"seo_desc": "Hướng dẫn mua hàng đầy đủ để chọn nhà cung cấp lưới thép uy tín tại Trung Quốc.",
"seo_kw": "wire mesh supplier, China sourcing, factory audit, quality certification, nhà cung cấp lưới thép, nhập khẩu lưới thép, kiểm tra nhà máy Trung Quốc"
}

# Blog 3 th
b3_th = {
"title": "วิธีเลือกซัพพลายเออร์ตาข่ายลวดที่น่าเชื่อถือในจีน (คู่มือ 2025)",
"abstract": "คู่มือผู้ซื้อฉบับสมบูรณ์ ครอบคลุมการตรวจสอบโรงงาน การรับรองคุณภาพ กระบวนการทดสอบตัวอย่าง และสัญญาณเตือนภัยเมื่อจัดหาผลิตภัณฑ์ตาข่ายลวดจากจีน",
"content": """# วิธีเลือกซัพพลายเออร์ตาข่ายลวดที่น่าเชื่อถือในจีน

## 1. การตรวจสอบโรงงาน
- เยี่ยมชมโรงงานหรือมอบหมายการตรวจสอบโดยบุคคลที่สาม
- ตรวจสอบกำลังการผลิตและอุปกรณ์ (สายการผลิตอัตโนมัติ > แบบมือ)
- ตรวจทบทวนกระบวนการควบคุมคุณภาพ (ได้รับการรับรอง ISO 9001)

## 2. การรับรองที่ควรตรวจสอบ
- **ISO 9001:2015**: ระบบการจัดการคุณภาพ
- **เครื่องหมาย CE**: จำเป็นสำหรับการเข้าถึงตลาดสหภาพยุโรป
- **ETAG 027**: เฉพาะสำหรับชุดอุปกรณ์กันหินตก
- **AASHTO M180**: มาตรฐานราวกันทางหลวง (ตลาดสหรัฐฯ)

## 3. การทดสอบตัวอย่าง
- ขอตัวอย่างทางกายภาพก่อนสั่งซื้อจำนวนมาก
- ทดสอบความหนาการเคลือบสังกะสี (≥80g/m² สำหรับชุบสังกะสีแบบจุ่มร้อนมาตรฐาน)
- ตรวจสอบความแข็งแรงดึงของลวด (≥380 N/mm²)
- ทดสอบการพ่นเกลือเพื่อตรวจสอบความต้านทานการกัดกร่อน

## 4. สัญญาณเตือนภัย
- ราคาต่ำกว่าค่าเฉลี่ยตลาดอย่างมีนัยสำคัญ
- ไม่มีที่อยู่โรงงานที่ชัดเจน
- ลังเลที่จะให้การรับรอง
- ไม่มีประวัติการส่งออกหรือบุคคลอ้างอิง

## บทสรุป
การเลือกซัพพลายเออร์ตาข่ายลวดที่เหมาะสมในจีนต้องการการตรวจสอบอย่างรอบคอบ การตรวจสอบโรงงาน การยืนยันการรับรอง และการทดสอบตัวอย่างเป็นขั้นตอนสำคัญเพื่อรับประกันคุณภาพผลิตภัณฑ์และความสัมพันธ์ในระยะยาว

## คำถามที่พบบ่อย
**ถาม: ปริมาณสั่งซื้อขั้นต่ำ (MOQ) คือเท่าใด?**
ตอบ: โดยทั่วไป 500-1000 หน่วยสำหรับผลิตภัณฑ์มาตรฐาน การออกแบบเฉพาะอาจต้องการ MOQ ที่สูงกว่า

**ถาม: การผลิตใช้เวลานานเท่าใด?**
ตอบ: ผลิตภัณฑ์มาตรฐาน: 7-15 วัน การสั่งทำเฉพาะ: 20-30 วันขึ้นอยู่กับความซับซ้อน

**ถาม: เงื่อนไขการชำระเงินมาตรฐานคืออะไร?**
ตอบ: เงินมัดจำ T/T 30% ส่วนที่เหลือ 70% ก่อนการจัดส่ง L/C สำหรับการสั่งซื้อมากกว่า 50,000 ดอลลาร์""",
"seo_title": "วิธีเลือกซัพพลายเออร์ตาข่ายลวดในจีน | Angu",
"seo_desc": "คู่มือผู้ซื้อฉบับสมบูรณ์สำหรับการเลือกซัพพลายเออร์ตาข่ายลวดที่น่าเชื่อถือในจีน",
"seo_kw": "wire mesh supplier, China sourcing, factory audit, quality certification, ซัพพลายเออร์ตาข่ายลวด, นำเข้าจากจีน, ตรวจสอบโรงงาน"
}

# Write to database
updates = [
    (1, b1_vi, b1_th),
    (2, b2_vi, b2_th),
    (3, b3_vi, b3_th),
]

conn = sqlite3.connect(DB_PATH)
for blog_id, vi, th in updates:
    conn.execute("""UPDATE blog_posts SET
        title_vi=?, abstract_vi=?, content_vi=?, seo_title_vi=?, seo_description_vi=?, seo_keywords_vi=?,
        title_th=?, abstract_th=?, content_th=?, seo_title_th=?, seo_description_th=?, seo_keywords_th=?
        WHERE id=?""",
        (vi["title"], vi["abstract"], vi["content"], vi["seo_title"], vi["seo_desc"], vi["seo_kw"],
         th["title"], th["abstract"], th["content"], th["seo_title"], th["seo_desc"], th["seo_kw"],
         blog_id))
conn.commit()
conn.close()
print("All 3 blogs updated successfully with vi and th translations.")
