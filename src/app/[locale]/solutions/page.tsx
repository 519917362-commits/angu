import {Metadata} from 'next';
import Link from 'next/link';
import {routing} from '@/lib/routing';
import {getSiteConfig, getCatalog} from '@/lib/api';
import {generatePageMeta} from '@/lib/seo-utils';
import { tLabel } from '@/lib/i18n';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMeta('solutions', locale, `/${locale}/solutions`, {ogType: 'article'});
}

interface Solution {
  slug: string;
  icon: string;
  image: string;
  title: {en: string; zh: string; vi: string; th: string};
  description: {en: string; zh: string; vi: string; th: string};
  challenge: {en: string; zh: string; vi: string; th: string};
  approach: {en: string; zh: string; vi: string; th: string};
  implementation: {en: string[]; zh: string[]; vi: string[]; th: string[]};
  productSlugs: string[];
}

const solutions: Solution[] = [
  {
    slug: 'construction-engineering',
    icon: '🏗️',
    image: '/images/products/welded-wire-mesh.jpg',
    title: {en: 'Construction & Civil Engineering', zh: '建筑与土木工程', vi: 'Xây Dựng & Dân Dụng', th: 'การก่อสร้างและวิศวกรรมโยธา'},
    description: {en: 'Welded wire mesh reinforcement, gabion retaining walls, temporary site fencing, and formwork mesh for concrete structures.', zh: '电焊网钢筋加固、石笼挡土墙、工地临时围栏和混凝土模板网。', vi: 'Lưới thép hàn gia cố, tường rọ đá giữ đất, rào tạm thời công trường, và lưới khuôn cho kết cấu bê tông.', th: 'ตะแกรงเชื่อมเสริม ตะแกรงกล่องกันดิน รั้วชั่วคราวไซต์งาน และตะแกรงแม่พิมพ์สำหรับโครงสร้างคอนกรีต'},
    challenge: {en: 'Modern construction demands rapid formwork, reliable concrete reinforcement, and secure site perimeters. Without engineered wire mesh, rebar placement is labor-intensive, retaining structures crack under lateral earth pressure, and construction sites face theft, trespassing, and dust complaints from neighboring communities.', zh: '现代建筑要求快速支模、可靠的混凝土配筋和安全的工地周界。没有工程级丝网，钢筋绑扎费工费时，挡土结构在侧向土压力下开裂，工地面临盗窃、闯入以及周边社区的粉尘投诉。', vi: 'Xây dựng hiện đại đòi hỏi khuôn mẫu nhanh, gia cố bê tông đáng tin cậy, và chu vi công trường an toàn. Không có lưới thép kỹ thuật, đặt thép tốn nhân công, kết cấu giữ đất nứt dưới áp lực ngang, và công trường gặp trộm cắp, xâm nhập, khiếu nại bụi từ cộng đồng lân cận.', th: 'การก่อสร้างสมัยใหม่ต้องการแม่พิมพ์ที่รวดเร็ว การเสริมคอนกรีตที่น่าเชื่อถือ และขอบเขตไซต์ที่ปลอดภัย หากไม่มีตะแกรงลวดทางวิศวกรรม การวางเหล็กเสริมใช้แรงงานมาก โครงสร้างกันดินแตกร้าวใต้แรงดินด้านข้าง และไซต์ก่อสร้างเผชิญกับการโจรกรรม การบุกรุก และข้อร้องเรียนเรื่องฝุ่นจากชุมชนโดยรอบ'},
    approach: {en: 'Angu supplies BRC welded wire mesh panels that replace manual rebar tying — cutting slab reinforcement time by 60%. Our gabion retaining walls are flexible, free-draining, and 30% lower cost than cast-in-place concrete walls. Perimeter chain link fencing with dust screening fabric keeps sites compliant and secure.', zh: '安固供应的BRC电焊网片可直接替代人工绑扎钢筋，楼板配筋时间缩短60%。石笼挡墙柔性透水，成本比现浇混凝土墙低30%。勾花网周界围栏配合防尘网布，确保工地合规安全。', vi: 'Angu cung cấp tấm lưới hàn BRC thay thế buộc thép thủ công — giảm 60% thời gian gia cố sàn. Tường rọ đá linh hoạt, thoát nước tự chảy, chi phí thấp hơn 30% so với tường bê tông đổ tại chỗ. Rào lưới mắt cáo chu vi kết hợp vải chống bụi giữ công trường hợp lệ và an toàn.', th: 'Angu จัดหาแผงตะแกรงเชื่อม BRC ทดแทนการมัดเหล็กเสริมด้วยมือ — ลดเวลาเสริมพื้น 60% ตะแกรงกล่องกันดินของเรามีความยืดหยุ่น ระบายนำได้ และต่ำกว่าคอนกรีตเทในแห 30% รั้วตะแกรงถักรอบขอบเขตผสมผ้ากันฝุ่นรักษาไซต์ให้ปฏิบัติตามกฎและปลอดภัย'},
    implementation: {en: ['Structural load calculation and mesh specification (wire Ø3–12mm, openings 50–200mm)', 'Prefabricated BRC mesh panels delivered cut-to-size for direct placement', 'Gabion wall assembly: geotextile lining → cage erection → stone fill in 25cm lifts', 'Temporary fence installation with concrete footing at 3m post spacing', 'Weekly site inspection throughout construction phase'], zh: ['结构荷载计算和网片规格确定 (丝径Ø3–12mm, 网孔50–200mm)', '预制的BRC网片按尺寸切割，到场直接铺设', '石笼挡墙施工：铺设土工布 → 架设网箱 → 25cm分层填充石料', '临时围栏安装，混凝土底座，立柱间距3m', '施工阶段每周工地巡检'], vi: ['Tính toán tải trọng kết cấu và thông số lưới (dây Ø3–12mm, lỗ 50–200mm)', 'Tấm lưới BRC dự chế cắt sẵn kích thước, đặt trực tiếp', 'Lắp ráp tường rọ đá: lót vải địa kỹ thuật → dựng lồng → đổ đá từng lớp 25cm', 'Lắp rào tạm thời, đế bê tông, khoảng trụ 3m', 'Kiểm tra công trường hàng tuần trong suốt giai đoạn thi công'], th: ['คำนวณภาระโครงสร้างและกำหนดข้อกำหนดตะแกรง (ลวด Ø3–12mm รู 50–200mm)', 'แผงตะแกรง BRC สำเร็จรูปตัดตามขนาดส่งมอบวางตรงจุด', 'ประกอบตะแกรงกล่องกันดิน: ปูผ้าธรณำวิศวกรรม → ตั้งกรง → ใส่หินเป็นชั้น 25cm', 'ติดตั้งรั้วชั่วคราว ฐานคอนกรีต ระยะเสา 3m', 'ตรวจสอบไซต์ทุกสัปดาห์ตลอดขั้นตอนการก่อสร้าง']},
    productSlugs: ['welded-wire-mesh-50mm', 'galvanized-gabion-box-2x1x1m', 'chain-link-fence-50mm', 'crimped-wire-mesh-10mm'],
  },
  {
    slug: 'highway-railway',
    icon: '🛣️',
    image: '/images/products/highway-noise-barrier.jpg',
    title: {en: 'Highway & Railway Infrastructure', zh: '公路与铁路基建', vi: 'Hạ Tầng Đường Cao Tốc & Đường Sắt', th: 'โครงสร้างพื้นฐานทางหลวงและทางรถไฟ'},
    description: {en: 'Noise barriers, safety guardrails, anti-throw nets, and slope stabilization for transportation corridors.', zh: '声屏障、安全防护栏、防抛网和边坡加固，服务于交通干线。', vi: 'Rào chắn tiếng ồn, lan can an toàn, lưới chống ném, và cố định taluy cho hành lang giao thông.', th: 'แผงกั้นเสียง ราวกันความปลอดภัย ตาข่ายกันการโยน และการเสริมเสถียรภาพไหล่เขาสำหรับทางเดินการคมนาคม'},
    challenge: {en: 'Transportation corridors face triple challenges: noise pollution affecting 100M+ urban residents globally, rockfalls onto highways causing fatalities and $100K+/day closure costs, and slope failures derailing trains. Regulatory pressure (EU Directive 2002/49/EC, China GB 3096-2008) mandates noise levels below 55dB in residential zones.', zh: '交通走廊面临三重挑战：噪声污染影响全球超1亿城市居民，落石进入高速公路造成人员伤亡和每日超65万元的封闭成本，以及边坡失稳导致列车脱轨。法规压力（欧盟2002/49/EC指令、中国GB 3096-2008）要求居民区噪声低于55分贝。', vi: 'Hành lang giao thông gặp ba thách thức: ô nhiễm tiếng ồn ảnh hưởng 100M+ cư dân đô thị toàn cầu, rơi đá xuống đường cao tốc gây tử vong và chi phí đóng cửa 100K+$/ngày, và trượt taluy làm trật bánh tàu. Áp lực pháp lý (Chỉ thị EU 2002/49/EC, TQ GB 3096-2008) quy định tiếng ồn dưới 55dB khu dân cư.', th: 'ทางเดินคมนาคมเผชิญความท้าทายสามประการ: มลพิษเสียงกระทบผู้อาศัยในเมือง 100 ล้าน+ ทั่วโลก หินตกลงบนทางหลวงทำให้เสียชีวิตและค่าปิดถนน 100K+$/วัน และไหล่เขาพังทำให้รถไฟตกราง แรงกดดันทางกฎหมาย (EU 2002/49/EC, จีน GB 3096-2008) กำหนดระดับเสียงต่ำกว่า 55dB ในเขตที่อยู่อาศัย'},
    approach: {en: 'Angu deploys integrated corridor protection: absorptive noise barriers (NRC 0.85+) with hot-dip galvanized wire mesh facades for 25+ year durability, high-energy rockfall barriers (1000–5000 kJ) tested to ETAG 027, and anti-throw nets preventing objects from reaching tracks or roads below overpasses.', zh: '安固部署一体化走廊防护：吸声型声屏障（NRC 0.85+）配热镀锌金属网外立面，25年以上耐久；高能级落石防护屏障（1000–5000 kJ）通过ETAG 027测试；防抛网防止物体落入轨行区或桥下道路。', vi: 'Angu triển khai bảo vệ hành lang tích hợp: rào chắn tiếng ồn hấp thụ (NRC 0.85+) mặt lưới thép mạ kẽm nhúng nóng bền 25+ năm, rào chắn rơi đá năng lượng cao (1000–5000 kJ) thử theo ETAG 027, và lưới chống ném ngăn vật rơi xuống đường ray hoặc đường dưới cầu vượt.', th: 'Angu ปรับใช้การป้องกันทางเดินแบบครบวงจร: แผงกั้นเสียงดูดซับ (NRC 0.85+) หน้าตะแกรงลวดชุบสังกะสีร้อน 25+ ปี ตะแกรงกันหินตกพลังงานสูง (1000–5000 kJ) ทดสอบตาม ETAG 027 และตาข่ายกันการโยนป้องกันวัตถุตกลงบนรางหรือถนนใต้สะพาน'},
    implementation: {en: ['Geological and acoustic survey along entire corridor alignment', 'Active protection: soil nail + high-tensile mesh facing on cut slopes', 'Noise barrier installation: H-beam posts → absorptive panels → top caps', 'Passive rockfall barriers at highway level with 3000 kJ min capacity', 'Anti-throw net installation on bridge parapets and overpass edges', 'Quarterly drive-by inspection + annual engineering assessment'], zh: ['全线地质和声学勘测', '主动防护：挖方边坡土钉+高强度网面支护', '声屏障安装：H型钢立柱 → 吸声屏体 → 顶盖', '公路层被动落石防护屏障，最低3000 kJ吸能', '桥梁护栏和立交边缘安装防抛网', '每季度巡查+每年工程评估'], vi: ['Khảo sát địa chất và âm học toàn tuyến', 'Bảo vệ chủ động: neo đất + lưới cường độ cao trên taluy đào', 'Lắp rào chắn tiếng ồn: trụ H → tấm hấp thụ → nắp đỉnh', 'Rào chắn rơi đá thụ động ở mức đường, tối thiểu 3000 kJ', 'Lắp lưới chống ném trên lan can cầu và mép cầu vượt', 'Kiểm tra hàng quý + đánh giá kỹ thuật hàng năm'], th: ['สำรวจธรณีวิทยาและเสียงตลอดแนวเส้นทาง', 'การป้องกันแบบ active: เสาเข็มดิน + ตะแกรงลวดแรงดึงสูงบนไหล่เขาที่ตัด', 'ติดตั้งแผงกั้นเสียง: เสา H → แผงดูดซับ → ฝาบนสุด', 'ตะแกรงกันหินตกแบบ passive ที่ระดับถนน ขั้นต่ำ 3000 kJ', 'ติดตั้งตาข่ายกันการโยนบนราวกันสะพานและขอบสะพานข้าม', 'ตรวจสอบทุกไตรมาส + ประเมินทางวิศวกรรมประจำปี']},
    productSlugs: ['highway-noise-barrier-3m', 'passive-slope-protection-barrier-gl100', 'chain-link-fence-50mm'],
  },
  {
    slug: 'mining-slope-safety',
    icon: '⛏️',
    image: '/images/products/passive-barrier.jpg',
    title: {en: 'Mining & Slope Safety Systems', zh: '矿山与边坡安全系统', vi: 'Hệ Thống An Toàn Mỏ & Taluy', th: 'ระบบความปลอดภัยเหมืองแร่และไหล่เขา'},
    description: {en: 'Rockfall protection nets, drapery systems, gabion barriers and blast containment for open-pit and underground mining.', zh: '拦石网、覆盖式防护系统、石笼屏障和爆破防护，服务于露天和地下矿山。', vi: 'Lưới chống rơi đá, hệ thống phủ, rào chắn rọ đá và ngăn chặn nổ cho mỏ hở và mỏ ngầm.', th: 'ตาข่ายกันหินตก ระบบปกคลุม ตะแกรงกล่องกัน และการกักการระเบิดสำหรับเหมืองเปิดและเหมืองใต้ดิน'},
    challenge: {en: 'Open-pit mines have near-vertical highwalls (70–90°) prone to bench failures and rockfalls that account for 15% of mining fatalities globally. Blast flyrock travels 500m+ and crater blast mats degrade within months. Underground portals need controlled access, ventilation screening, and ground support mesh.', zh: '露天矿山近乎垂直的高边坡（70–90°）易发生台阶坍塌和岩崩，占全球采矿事故死亡的15%。爆破飞石飞行距离超过500m，常规爆破覆盖垫数月即劣化。地下矿井入口需要受控进出、通风筛网和地层支护网。', vi: 'Mỏ hở có vách gần thẳng đứng (70–90°) dễ sập bậc và rơi đá, chiếm 15% tử vong mỏ toàn cầu. Đá văng nổ bay 500m+ và đệm nổ hố hỏng trong vài tháng. Cổng mỏ ngầm cần kiểm soát ra vào, lưới thông gió, và lưới chống đất.', th: 'เหมืองเปิดมีผนังใกล้ตั้งฉาก (70–90°) มักพังทลายของม้ายและหินตก คิดเป็น 15% ของการเสียชีวิตในเหมืองทั่วโลก หินกระเด็นจากการระเบิดกระเด็นไกล 500m+ และเบาะระเบิดเสื่อมสภาพในเวลาไม่กี่เดือน ปากทางเข้าเหมืองใต้ดินต้องการการควบคุมการเข้าออก ตะแกรงระบายอากาศ และตะแกรงยันดิน'},
    approach: {en: 'Our mining safety systems use ISO 17745-certified high-tensile steel wire (1770 MPa) for drapery nets covering unstable faces with anchor spacing ≤3m. High-energy ring net barriers at bench toes absorb 500–5000 kJ impact. Heavy-duty gabion blast walls (1m×1m×2m cells) redirect blast energy upward, tested to withstand 50kg TNT equivalent at 30m.', zh: '矿山安全系统采用ISO 17745认证的高强度钢丝（1770 MPa）覆盖式防护网覆盖不稳定坡面，锚杆间距≤3m。台阶底部的高能级环形网屏障吸收500–5000 kJ冲击。重型石笼防爆墙（1m×1m×2m网格）将爆炸能量向上导流，经测试可承受30m处50kg TNT当量。', vi: 'Hệ thống an toàn mỏ dùng dây thép cường độ cao chứng nhận ISO 17745 (1770 MPa) cho lưới phủ bề mặt bất ổn định, khoảng neo ≤3m. Rào chắn vòng năng lượng cao ở chân bậc hấp thụ 500–5000 kJ. Tường rọ đá hạng nặng (ô 1m×1m×2m) chuyển hướng năng lượng nổ lên trên, thử chịu 50kg TNT tương đương ở 30m.', th: 'ระบบความปลอดภัยเหมืองของเราใช้ลวดเหล็กแรงดึงสูงที่ได้รับการรับรอง ISO 17745 (1770 MPa) สำหรับตาข่ายปกคลุมหน้าผาที่ไม่เสถียร ระยะห่างยึด ≤3m ตะแกรงวงแหวนพลังงานสูงที่ตีนม้ายดูดซับ 500–5000 kJ กำแพงเกเบี้ยนหนัก (ช่อง 1m×1m×2m) เบือนพลังงานระเบิดขึ้น ทดสอบรับ 50kg TNT เทียบเท่าที่ 30m'},
    implementation: {en: ['Geotechnical mapping: RMR classification, joint orientation, bench geometry', 'Drapery net installation with systematic anchoring (2.5m × 2.5m grid)', 'Ring net barriers at bench toes: post spacing 10m, energy class per risk zone', 'Gabion blast wall construction around explosive magazines and blast zones', 'Monthly visual + quarterly drone inspection during active mining'], zh: ['地质测绘：RMR分级、节理方向、台阶几何参数', '系统锚杆+覆盖式防护网安装（2.5m×2.5m网格）', '台阶底部环形网屏障：立柱间距10m，能级按风险区配置', '炸药库和爆破区周围建造石笼防爆墙', '开采期间每月目视+每季度无人机巡检'], vi: ['Bản đồ địa kỹ thuật: phân loại RMR, hướng khe nứt, hình học bậc', 'Lắp lưới phủ với neo hệ thống (lưới 2.5m × 2.5m)', 'Rào chắn vòng ở chân bậc: khoảng trụ 10m, cấp năng lượng theo vùng rủi ro', 'Xây tường rọ đá chống nổ quanh kho thuốc nổ và vùng nổ', 'Kiểm tra thị giác hàng tháng +无人机 hàng quý trong quá trình khai thác'], th: ['การทำแผนที่ธรณีเทคนิค: การจำแนก RMR ทิศทางรอยแตก เรขาคณิตของม้าย', 'ติดตั้งตาข่ายปกคลุมด้วยการยึดเป็นระบบ (ตาราง 2.5m × 2.5m)', 'ตะแกรงวงแหวนที่ตีนม้าย: ระยะเสา 10m ระดับพลังงานตามเขตความเสี่ยง', 'สร้างกำแพงเกเบี้ยนกันระเบิดรอบคลังวัตถุระเบิดและเขตระเบิด', 'ตรวจสอบด้วยสายตารายเดือน + โดรนทุกไตรมาสระหว่างการทำเหมือง']},
    productSlugs: ['passive-slope-protection-barrier-gl100', 'galvanized-gabion-box-2x1x1m', 'welded-wire-mesh-50mm'],
  },
  {
    slug: 'water-conservancy',
    icon: '🌊',
    image: '/images/products/reno-mattress.jpg',
    title: {en: 'Water Conservancy & Flood Control', zh: '水利与防洪工程', vi: 'Thủy Lợi & Phòng Lũ', th: 'ชลประทานและการควบคุมนำท่วม'},
    description: {en: 'Riverbank stabilization, flood levee reinforcement, channel lining, scour protection and erosion control for hydraulic structures.', zh: '河道稳固、防洪堤加固、渠道衬砌、防冲刷和水利结构侵蚀控制。', vi: 'Cố định bờ sông, gia cố đê phòng lũ, lót kênh, chống xói mòn và kiềm chế xói cho công trình thủy lực.', th: 'การเสริมเสถียรภาพตลิ่ง การเสริมคันดักท่วม การบุด้านคลอง การป้องกันการกัดเซาะ และการควบคุมการพังทลายสำหรับโครงสร้างไฮดรอลิก'},
    challenge: {en: 'Embankment failures during flood seasons cause 40% of global flood disasters. River currents scour bridge pier foundations at rates of 2–5m per flood event. Irrigation channels lose 30–50% water through seepage and soil piping. Climate change is increasing flood frequency and intensity, demanding more resilient infrastructure.', zh: '汛期堤防失事造成全球40%的洪灾。河流冲刷以每场洪水2–5m的速度侵蚀桥墩基础。灌溉渠道因渗漏和管涌损失30–50%的水量。气候变化正在增加洪水频率和强度，对基础设施韧性提出更高要求。', vi: 'Sập đê mùa lũ gây 40% thảm họa lũ toàn cầu. Dòng sông xói móng trụ cầu tốc độ 2–5m mỗi trận lũ. Kênh tưới mất 30–50% nước qua thấm và đường ống đất. Biến đổi khí hậu tăng tần suất và cường độ lũ, đòi hỏi hạ tầng linh hoạt hơn.', th: 'การพังทลายของคันดักในช่วงน้ำท่วมเป็นสาเหตุของ 40% ของภัยพิบัติน้ำท่วมทั่วโลก กระแสน้ำกัดเซาะรากฐานตั้งสะพาน 2–5m ต่อเหตุการณ์น้ำท่วม คลองส่งน้ำสูญเสียน้ำ 30–50% จากการซึมและการพังทะลุนทะลายดิน การเปลี่ยนแปลงสภาพอากาศเพิ่มความถี่และความรุนแรงของน้ำท่วม ต้องการโครงสร้างพื้นฐานที่ทนทานยิ่งขึ้น'},
    approach: {en: 'Angu\'s flexible gabion structures self-drain, eliminating hydrostatic pressure buildup that cracks rigid concrete walls. Heavy-duty ZnAl 5% + PVC coated gabion boxes (wire Ø4.0mm, triple twist) withstand 50+ years in wet environments. Reno mattresses (0.3m thick) laid on geotextile fabric prevent scour and allow vegetation regrowth through the stone fill.', zh: '安固的柔性石笼结构自行排水，消除了导致刚性混凝土墙开裂的静水压力积累。重型ZnAl 5%+PVC包塑石笼网箱（丝径Ø4.0mm，三绞合）在潮湿环境可使用50年以上。雷诺护垫（厚0.3m）铺设在土工布上，防止冲刷并允许植被穿透石料再生。', vi: 'Cấu trúc rọ đá linh hoạt của Angu tự thoát nước, loại bỏ tích tụ áp lực thủy tĩnh làm nứt tường bê tông cứng. Rọ đá hạng nặng ZnAl 5% + PVC (dây Ø4.0mm, xoắn ba) bền 50+ năm môi trường ẩm. Đệm Reno (dày 0.3m) lót trên vải địa kỹ thuật chống xói và cho thực vật mọc qua đá.', th: 'โครงสร้างเกเบี้ยนที่ยืดหยุ่นของ Angu ระบายน้ำเอง ขจัดการสะสมความดันน้ำซึ่งทำให้กำแพงคอนกรีตแข็งแตก กล่องเกเบี้ยนหนัก ZnAl 5% + PVC (ลวด Ø4.0mm ถักสามชั้น) ทน 50+ ปีในสภาพแวดล้อมชื้น ฟูก Reno (หนา 0.3m) ปูบนผ้าธรณำวิศวกรรมป้องกันการกัดเซาะและอนุญาตให้พืชเติบโตผ่านเม็ดหิน'},
    implementation: {en: ['Hydrological analysis: 100-year flood level, flow velocity profile, sediment load', 'Gabion retaining wall construction on riverbanks, terraced where slope exceeds 30°', 'Reno mattress channel lining: geotextile → mattress assembly → stone filling', 'Gabion check dams and weirs at 500m intervals for grade and flow control', 'Post-flood season structural inspection + 5-year major assessment'], zh: ['水文分析：百年一遇洪水位、流速剖面、泥沙含量', '河岸石笼挡墙施工，坡度>30°处采用台阶式布设', '雷诺护垫渠道衬砌：铺设土工布→组装护垫→填充石料', '每隔500m设置石笼拦沙坝和堰进行坡度和流量控制', '汛后结构检查+每5年全面评估'], vi: ['Phân tích thủy văn: mực nước lũ 100 năm, profile tốc độ dòng chảy, lượng bùn cát', 'Xây tường rọ đá trên bờ sông, bậc thang nơi độ dốc >30°', 'Lót kênh đệm Reno: vải địa kỹ thuật → lắp đệm → đổ đá', 'Đập và weir rọ đá cách 500m kiểm soát độ dốc và lưu lượng', 'Kiểm tra kết cấu sau mùa lũ + đánh giá lớn 5 năm một lần'], th: ['วิเคราะห์ทางอุทกวิทยา: ระดับน้ำท่วม 100 ปี โปรไฟล์ความเร็วไหล ปริมาณตะกอน', 'สร้างตะแกรงกล่องกันดินริมตลิ่ง แบบขั้นบันไดที่ความชันเกิน 30°', 'บุคลองด้วยฟูก Reno: ผ้าธรณำวิศวกรรม → ประกอบฟูก → ใส่หิน', 'เขื่อนตะแกรงกล่องและฝายทุก 500m สำหรับควบคุมความชันและอัตราไหล', 'ตรวจสอบโครงสร้างหลังฤดูน้ำท่วม + ประเมินใหญ่ทุก 5 ปี']},
    productSlugs: ['galvanized-gabion-box-2x1x1m', 'reno-mattress-6x2x0.3m', 'hexagonal-wire-mesh-25mm'],
  },
  {
    slug: 'industrial-factory',
    icon: '🏭',
    image: '/images/products/factory-noise-barrier.jpg',
    title: {en: 'Industrial & Factory Solutions', zh: '工厂与工业解决方案', vi: 'Giải Pháp Công Nghiệp & Nhà Xưởng', th: 'โซลูชันโรงงานและอุตสาหกรรม'},
    description: {en: 'Welded mesh partitions, machine safety guards, noise control enclosures, security fencing and warehouse storage cages for manufacturing facilities.', zh: '电焊网隔断、设备安全防护罩、降噪围挡、安防围栏和仓库存储笼。', vi: 'Vách ngăn lưới hàn, bảo vệ máy an toàn, vỏ bọc chống ồn, rào an ninh và lồng kho cho nhà máy sản xuất.', th: 'แผงกั้นตะแกรงเชื่อม ที่คุ้มเครื่องจักรเพื่อความปลอดภัย ตะแกรงหุ้มควบคุมเสียง รั้วปลอดภัย และกรงเก็บของคลังสินค้าสำหรับโรงงานผลิต'},
    challenge: {en: 'Manufacturing plants face OSHA and GB compliance for machine guarding, noise exposure limits (85dB/8hr), and secure raw material storage. Unprotected machinery causes 18,000+ amputations annually worldwide. Factory noise complaints are the #1 source of community disputes for industrial parks located near residential areas.', zh: '制造工厂面临OSHA和国标对设备防护、噪声暴露限值（85dB/8小时）和原材料安全存储的合规要求。未防护的机械设备每年在全球造成超1.8万起截肢事故。工厂噪声投诉是靠近居民区的工业园区社区纠纷的首要来源。', vi: 'Nhà máy sản xuất đối mặt tuân thủ OSHA và GB cho bảo vệ máy, giới hạn tiếng ồn (85dB/8h), và lưu trữ nguyên liệu an toàn. Máy không bảo vệ gây 18.000+ cắt cụt mỗi năm toàn cầu. Khiếu nại tiếng ồn nhà máy là nguồn #1 tranh chấp cộng đồng cho khu công nghiệp gần dân cư.', th: 'โรงงานผลิตเผชิญการปฏิบัติตาม OSHA และ GB สำหรับการป้องกันเครื่องจักร ขีดจำกัดการสัมผัสเสียง (85dB/8ชม.) และการจัดเก็บวัตถุดิบอย่างปลอดภัย เครื่องจักรที่ไม่มีการป้องกันทำให้เกิดการสูญเสียแขนขา 18,000+ รายต่อปีทั่วโลก ข้อร้องเรียนเรื่องเสียงโรงงานเป็นแหล่งอันดับ 1 ของข้อพิพาทชุมชนสำหรับนิคมอุตสาหกรรมที่อยู่ใกล้ย่านที่อยู่อาศัย'},
    approach: {en: 'Angu provides modular welded mesh machine guards with quick-release panels for maintenance access, meeting ISO 14120 safety distances. Our acoustic enclosure systems combine perforated metal mesh with rockwool absorbers achieving 15–25dB noise reduction. Heavy-duty welded mesh partitions double as secure tool and raw material storage cages.', zh: '安固提供模块化电焊网设备防护罩，带快拆面板方便维护，满足ISO 14120安全距离要求。吸音围挡系统结合穿孔金属网和岩棉吸声层，降噪15–25dB。重型电焊网隔断可兼作安全的工具和原材料存储笼。', vi: 'Angu cung cấp bảo vệ máy lưới hàn mô-đun tấm tháo nhanh cho bảo trì, đạt khoảng cách an toàn ISO 14120. Hệ thống vỏ bọc âm kết hợp lưới kim loại đục lỗ với đá len hút âm giảm ồn 15–25dB. Vách ngăn lưới hàn hạng nặng kiêm lồng lưu trữ công cụ và nguyên liệu an toàn.', th: 'Angu จัดหาที่คุ้มเครื่องจักรตะแกรงเชื่อมแบบโมดูลที่มีแผงถอดเร็วสำหรับการเข้าถึงการบำรุงรักษา ตามมาตรฐานระยะปลอดภัย ISO 14120 ระบบหุ้มเสียงผสานตะแกรงเจาะรูกับใยหินดูดซับเสียงลดเสียง 15–25dB แผงกั้นตะแกรงเชื่อมหนักทำหน้าที่เป็นกรงเก็บเครื่องมือและวัตถุดิบปลอดภัย'},
    implementation: {en: ['Plant audit: identify machinery hazard zones, noise sources, security gaps', 'Custom machine guard design per equipment dimensions and operator workflow', 'Noise enclosure installation: steel frame → absorptive panels → wire mesh outer layer', 'Warehouse cage assembly with lockable gates and roof panels', 'Annual safety compliance re-audit'], zh: ['工厂审计：识别设备危险区域、噪声源、安防漏洞', '根据设备尺寸和操作流程定制设备防护罩设计', '降噪围挡安装：钢架→吸音面板→金属网外层', '仓库存储笼组装，配可锁门和顶板', '年度安全合规再审计'], vi: ['Kiểm toán nhà máy: xác định vùng nguy hiểm máy, nguồn tiếng ồn, lỗ hổng an ninh', 'Thiết kế bảo vệ máy tùy chỉnh theo kích thước thiết bị và quy trình vận hành', 'Lắp vỏ bọc tiếng ồn: khung thép → tấm hấp thụ → lớp lưới kim loại', 'Lắp lồng kho với cổng khóa và tấm mái', 'Kiểm toán lại tuân thủ an toàn hàng năm'], th: ['ตรวจสอบโรงงาน: ระบุเขตอันตรายของเครื่องจักร แหล่งเสียง ช่องโหว่ความปลอดภัย', 'ออกแบบที่คุ้มเครื่องจักรตามขนาดอุปกรณ์และขั้นตอนการทำงานของผู้ปฏิบัติงาน', 'ติดตั้งตะแกรงหุ้มเสียง: โครงเหล็ก → แผงดูดซับ → ชั้นตะแกรงลวดนอก', 'ประกอบกรงคลังสินค้าพร้อมประตูล็อคและแผงหลังคา', 'ตรวจสอบการปฏิบัติตามกฎความปลอดภัยซ้ำทุกปี']},
    productSlugs: ['welded-wire-mesh-50mm', 'highway-noise-barrier-3m', 'chain-link-fence-50mm'],
  },
  {
    slug: 'perimeter-security',
    icon: '🛡️',
    image: '/images/products/razor-wire.jpg',
    title: {en: 'Perimeter Security & Access Control', zh: '周界安防与门禁管控', vi: 'Bảo Vệ Chu Vi & Kiểm Soát Ra Vào', th: 'รั้วป้องกันเขตและการควบคุมการเข้าถึง'},
    description: {en: 'Chain link fencing, razor barbed wire, anti-climb mesh, security gates and vehicle crash barriers for critical infrastructure and commercial sites.', zh: '勾花网围栏、刀片刺绳、防攀爬网、安防大门和车辆防撞护栏，服务于关键基础设施和商业场所。', vi: 'Rào lưới mắt cáo, dây kẻ gai, lưới chống leo, cổng an ninh và rào chắn xe cho hạ tầng trọng yếu và khu thương mại.', th: 'รั้วตะแกรงถัก ลวดหนามคม ตะแกรงกันปีน ประตูเฝ้ายาม และตะแกรงกันชนรถสำหรับโครงสร้างพื้นฐานสำคัญและไซต์เชิงพานิชย์'},
    challenge: {en: 'Critical infrastructure — power substations, data centers, water treatment plants, and military bases — requires multi-layered perimeter security. A single breach can cause $M+ losses. Traditional walls are climbable and block surveillance sightlines. Razor wire alone is insufficient against determined intruders using cutting tools.', zh: '关键基础设施——变电站、数据中心、水处理厂和军事基地——需要多层周界安防。一次突破即可造成百万级损失。传统围墙可攀爬且阻碍监控视线。仅靠刀片刺绳不足以防御使用切割工具的有预谋入侵者。', vi: 'Hạ tầng trọng yếu — trạm biến áp, trung tâm dữ liệu, nhà máy nước, và căn cứ quân sự — cần bảo vệ chu vi đa lớp. Một lần xâm nhập gây thất thoát triệu đô. Tường truyền thống leo được và chắn đường giám sát. Dây gai không đủ chống kẻ xâm nhập quyết tâm dùng dụng cụ cắt.', th: 'โครงสร้างพื้นฐานสำคัญ — สถานีไฟฟ้า ศูนย์ข้อมูล โรงงานบำบัดน้ำ และฐานทัพ — ต้องการรั้วป้องกันเขตหลายชั้น การบุกรุกเพียงครั้งเดียวอาจสูญเสียนับล้าน กำแพงแบบเดิมสามารถปีนได้และบดบังมุมมองการเฝ้าระวัง ลวดหนามเพียงอย่างเดียวไม่เพียงพอต่อผู้บุกรุมที่มุงมั่นใช้เครื่องมือตัด'},
    approach: {en: 'Angu\'s layered perimeter system: 3m+ chain link fence with anti-climb 12.5×12.5mm mesh top section, concertina razor wire coils (NATO spec 450mm diameter), vehicle-rated crash barriers (ASTM F2656 M50/P1), and lockable swing/sliding gates. All steel is hot-dip galvanized to ASTM A123 with optional PVC coating for coastal/marine environments.', zh: '安固的分层周界系统：3m+勾花网围栏配12.5×12.5mm防攀爬加密网顶部，螺旋刀片刺绳（NATO标准直径450mm），车辆防撞护栏（ASTM F2656 M50/P1级），可锁平开/平移大门。全部钢材热镀锌ASTM A123标准，沿海环境可选PVC包塑。', vi: 'Hệ thống chu vi phân lớp Angu: rào lưới mắt cáo 3m+ phần trên lưới chống leo 12.5×12.5mm, dây gai xoắn ốc (NATO 450mm), rào chắn xe (ASTM F2656 M50/P1), cổng trượt/can có khóa. Thép mạ kẽm nhúng nóng ASTM A123, tùy chọn PVC cho môi trường biển.', th: 'ระบบรั้วป้องกันเขตเป็นชั้นของ Angu: รั้วตะแกรงถัก 3m+ ส่วนบนเป็นตะแกรงกันปีน 12.5×12.5mm ลวดหนามม้วนเกลียว (NATO 450mm) ตะแกรงกันชนรถ (ASTM F2656 M50/P1) และประตูเลื่อน/เปิดที่ล็อคได้ เหล็กทั้งหมดชุบสังกะสีร้อน ASTM A123 มี PVC เคลือบเสริมสำหรับสภาพแวดล้อมชายฝั่ง/ทะเล'},
    implementation: {en: ['Security risk assessment: threat level, perimeter topology, surveillance integration', 'Fence foundation: concrete footing (0.4×0.4×0.6m) at 2.5m post spacing', 'Chain link installation with bottom tension wire and ground burial (0.3m anti-dig)', 'Razor wire deployment: 3-coil concertina on extended brackets at 45° outward angle', 'Gate installation with electric opener, intercom, and vehicle loop detector', 'Monthly integrity check + annual tensile test on critical sections'], zh: ['安全风险评估：威胁等级、周界拓扑、监控集成', '围栏基础：混凝土底座（0.4×0.4×0.6m），立柱间距2.5m', '勾花网安装，底部张力线和地下埋设（0.3m防挖）', '刀片刺绳布设：外倾45°加长支架上3圈螺旋', '大门安装，配电动开门器、对讲机和车辆地感线圈', '每月完整性检查+关键段年度拉力测试'], vi: ['Đánh giá rủi ro an ninh: cấp độ mối đe, địa hình chu vi, tích hợp giám sát', 'Móng rào: đế bê tông (0.4×0.4×0.6m), khoảng trụ 2.5m', 'Lắp lưới mắt cáo với dây căng đáy và chôn đất (0.3m chống đào)', 'Triển khai dây gai: 3 vòng xoắn ốc trên giá kéo dài góc 45° ra ngoài', 'Lắp cổng với máy mở điện, đối讲, và cảm biến xe', 'Kiểm tra tính toàn vẹn hàng tháng + kiểm tra căng hàng năm trên đoạn trọng yếu'], th: ['ประเมินความเสี่ยงด้านความปลอดภัย: ระดับภัยคุกคาม ภูมิประเทศรอบขอบ การบูรณาการการเฝ้าระวัง', 'ฐานรั้ว: ฐานคอนกรีต (0.4×0.4×0.6m) ระยะเสา 2.5m', 'ติดตั้งตะแกรงถักพร้อมลวดดึงด้านล่างและฝังดิน (0.3m กันการขุด)', 'ติดตั้งลวดหนาม: 3 รอบม้วนเกลียวบนแท่นยื่นออกที่มุม 45°', 'ติดตั้งประตูพร้อมระบบเปิดไฟฟ้า อินเตอร์คอม และเซนเซอร์ตรวจจับรถ', 'ตรวจสอบความสมบูรณ์รายเดือน + ทดสอบแรงดึงรายปีบนช่วงสำคัญ']},
    productSlugs: ['chain-link-fence-50mm', 'razor-barbed-wire-bto22', 'welded-wire-mesh-50mm'],
  },
  {
    slug: 'agriculture-farming',
    icon: '🐄',
    image: '/images/products/cattle-fence.jpg',
    title: {en: 'Agriculture & Livestock Farming', zh: '农牧业与养殖', vi: 'Nông Nghiệp & Chăn Nuôi', th: 'เกษตรกรรมและการปศุสัตว์'},
    description: {en: 'Field fencing, cattle panels, hexagonal poultry mesh, pasture enclosures and predator-proof wire netting for farms and ranches.', zh: '牧场围栏、牛栏网、六角家禽网、草场圈地和防兽金属网。', vi: 'Rào đồng, tấm chuồng bò, lưới gia cầm lục giác, rào cỏ và lưới chống thú ăn thịt cho nông trường.', th: 'รั้วทุ่ง แผงคอกวัว ตะแกรงไก่หกเหลี่ยม รั้วสนามหญ้า และตะแกรงกันสัตว์ล่าเหยื่อสำหรับฟาร์มและฟาร์มปศุสัตว์'},
    challenge: {en: 'Livestock escapes cost the global farming industry $1B+ annually. Predators (wolves, coyotes, foxes) kill 200,000+ livestock yearly in the US and Europe alone. Poor-quality fencing rusts in 3–5 years, requiring costly replacement. Electric fences fail during power outages and require constant maintenance.', zh: '牲畜逃逸每年给全球养殖业造成超10亿美元损失。捕食动物（狼、郊狼、狐狸）每年仅在美国和欧洲就杀死超20万头牲畜。劣质围栏3–5年即生锈，需高昂更换成本。电围栏在停电时失效且需要持续维护。', vi: 'Gia súc trốn chi phí ngành nông nghiệp toàn cầu 1 tỷ+$/năm. Thú ăn thịt (sói, chó sói, cáo) giết 200.000+ gia súc mỗi năm chỉ ở Mỹ và Châu Âu. Rào kém chất lượng gỉ 3–5 năm, cần thay tốn kém. Rào điện hỏng khi mất điện và cần bảo trì liên tục.', th: 'สัตว์ปศุสัตว์หนีทำให้วงการเกษตรทั่วโลกเสีย 1 พันล้าน+$/ปี สัตว์ล่าเหยื่อ (หมาป่า ไคโยตี้ จิ้งจอก) ฆ่าสัตว์ปศุสัตว์ 200,000+ ตัวต่อปีในสหรัฐและยุโรปเพียงแห่งเดียว รั้วคุณภาพต่ำเป็นสนิม 3–5 ปี จำเป็นต้องเปลี่ยนที่มีค่าใช้จ่ายสูง รั้วไฟฟ้าล้มเหลวระหว่างไฟดับและต้องการการบำรุงรักษาตลอดเวลา'},
    approach: {en: 'Angu\'s agricultural wire mesh products use heavy zinc coating (240g/m² minimum) for 15+ year field life. Cattle panels (4-gauge wire, 150×200mm openings) withstand 2000kg impact from charging bulls. Hexagonal poultry mesh (25mm openings) keeps chicks in and rats/snakes out. Fixed-knot field fence with graduated openings (75→300mm) suits mixed livestock — small openings at bottom deter lambs from escaping while larger upper openings save material cost.', zh: '安固农牧丝网产品采用重锌镀层（最低240g/m²），野外使用寿命超15年。牛栏网（4号丝径，150×200mm网孔）可承受公牛2000kg冲击。六角家禽网（25mm网孔）既防止雏鸡逃逸又阻挡鼠蛇入侵。固定结牧场围栏采用渐变网孔设计（75→300mm）适配混养牧场——底部小孔防羊羔钻出，上部大孔节约材料成本。', vi: 'Sản phẩm lưới thép nông nghiệp Angu dùng phủ kẽm nặng (tối thiểu 240g/m²) cho tuổi thọ đồng 15+ năm. Tấm chuồng bò (dây 4-gauge, lỗ 150×200mm) chịu 2000kg va đập bò húc. Lưới gia cầm lục giác (lỗ 25mm) giữ gà con và cản chuột/rắn. Rào đồng nút cố định lỗ biến đổi (75→300mm) phù hợp gia súc hỗn hợp — lỗ nhỏ đáy cản cừu non trốn, lỗ lớn trên tiết kiệm vật liệu.', th: 'ผลิตภัณฑ์ตะแกรงลวดเกษตรของ Angu ใช้การเคลือบสังกะสีหนา (ขั้นต่ำ 240g/m²) อายุการใช้งานในทุ่ง 15+ ปี แผงคอกวัว (ลวด 4-gauge ช่อง 150×200mm) ทนแรงกระแทก 2000kg จากวัวชน ตะแกรงไก่หกเหลี่ยม (ช่อง 25mm) กักไก่ไว้และกันหนู/งู รั้วทุ่งเงื่อนตายึดกับช่องที่ลดขนาด (75→300mm) เหมาะสำหรับสัตว์ปศุสัตว์ผสม — ช่องเล็กด้านล่างกันลูกแกะหนี ช่องใหญ่ด้านบนประหยัดต้นทุน'},
    implementation: {en: ['Property survey: boundary lines, terrain, livestock type and density', 'Post installation: treated wood or galvanized steel T-posts at 3–5m spacing', 'Wire mesh unrolling and tensioning with ratchet strainers at 250kg tension', 'Corner and gate assemblies with H-brace configuration for load distribution', 'Bottom wire burial (0.2m) or ground skirt to prevent digging predators', 'Annual post-flood season inspection and tension adjustment'], zh: ['土地勘测：边界线、地形、牲畜类型和密度', '立柱安装：防腐木柱或镀锌T型钢柱，间距3–5m', '展开金属网并用棘轮拉紧器施加250kg张力', '转角和门口采用H型支撑结构分散荷载', '底部埋地（0.2m）或铺设地面裙网防挖掘入侵', '每年汛后检查和张力调整'], vi: ['Khảo sát đất: đường biên, địa hình, loại và mật độ gia súc', 'Lắp trụ: cọc gỗ xử lý hoặc thép mạ kẽm T, khoảng 3–5m', 'Trải và căng lưới thép với kéo cờ-lê 250kg', 'Lắp ráp góc và cổng với cấu hình H-brace phân tán tải', 'Chôn dây đáy (0.2m) hoặc vải đáy chống thú đào bới', 'Kiểm tra và chỉnh căng sau mùa lũ hàng năm'], th: ['สำรวจที่ดิน: เส้นขอบเขต ภูมิประเทศ ชนิดและความหนาแน่นของสัตว์', 'ติดตั้งเสา: เสาไม้บำบัดหรือเสาเหล็กชุบสังกะสีรูป T ระยะ 3–5m', 'กลิ้งตะแกรงลวดและดึงด้วยเครื่องดึงแบบกระแสที่ 250kg', 'ประกอบมุมและประตูด้วยโครง H-brace เพื่อกระจายภาระ', 'ฝังลวดด้านล่าง (0.2m) หรือผ้าปูพื้นเพื่อกันสัตว์ล่าเหยื่อขุด', 'ตรวจสอบและปรับแรงดึงหลังฤดูน้ำท่วมประจำปี']},
    productSlugs: ['hexagonal-wire-mesh-25mm', 'chain-link-fence-50mm', 'welded-wire-mesh-50mm'],
  },
  {
    slug: 'environmental-ecology',
    icon: '🌿',
    image: '/images/products/gabion-box.jpg',
    title: {en: 'Environmental & Ecological Engineering', zh: '环境与生态工程', vi: 'Kỹ Thuật Môi Trường & Sinh Thái', th: 'วิศวกรรมสิ่งแวดล้อมและนิเวศวิทยา'},
    description: {en: 'Gabion green walls, erosion control nets, vegetated slope reinforcement, and eco-retaining structures for sustainable land management.', zh: '石笼绿化墙、水土保持网、植被护坡加固和生态挡土结构，服务于可持续土地管理。', vi: 'Tường rọ đá xanh, lưới chống xói, gia cố taluy có thực vật, và kết cấu giữ đất sinh thái cho quản lý đất bền vững.', th: 'ตะแกรงกล่องกันเขียว ตะแกรงควบคุมการพังทะลุน การเสริมเสถียรภาพไหล่เขาที่มีพืชพรรณ และโครงสร้างกันดินเชิงนิเวศสำหรับการจัดการที่ดินอย่างยั่งยืน'},
    challenge: {en: 'Soil erosion degrades 24 billion tons of fertile soil annually worldwide (FAO). Deforested slopes lose topsoil within 2–3 rainy seasons. Conventional concrete retaining walls create ecological dead zones — no vegetation, no habitat, and they increase downstream flooding by preventing natural infiltration. Environmental regulations increasingly mandate "green" or "nature-based" solutions.', zh: '全球每年因水土流失损失240亿吨肥沃土壤（FAO数据）。砍伐后的边坡在2–3个雨季内即失去表土。传统混凝土挡墙造成生态死区——无植被无栖息地，并因阻止自然渗透而加剧下游洪水。环保法规日益要求采用"绿色"或"基于自然的"解决方案。', vi: 'Xói mòn đất làm suy giảm 24 tỷ tấn đất màu mỡ mỗi năm toàn cầu (FAO). Taluy phá rừng mất đất mặt trong 2–3 mùa mưa. Tường bê tông giữ đất truyền thống tạo vùng chết sinh thái — không thực vật, không môi trường sống, và tăng lũ hạ lưu do ngăn thấm tự nhiên. Quy định môi trường ngày càng yêu cầu giải pháp "xanh" hoặc "dựa trên tự nhiên".', th: 'การพังทะลุนของดินทำให้ดินอุดมสมบูรณ์เสื่อมโทรม 24 พันล้านตันต่อปีทั่วโลก (FAO) ไหล่เขาที่ตัดไม้สูญเสียดินบนใน 2–3 ฤดูฝน กำแพงคอนกรีตกันดินแบบดั้งเดิมสร้างเขตตายทางนิเวศ — ไม่มีพืช ไม่มีแหล่งที่อยู่ และเพิ่มน้ำท่วมปลายน้ำโดยการกันการซึมตามธรรมชาติ กฎระเบียบสิ่งแวดล้อมกำหนดให้ใช้โซลูชัน "สีเขียว" หรือ "ตามธรรมชาติ" มากขึ้น'},
    approach: {en: 'Angu\'s eco-gabion systems combine structural strength with ecological function. Gabion walls filled with topsoil and rock mix allow native plant root penetration, creating living green walls within 1–2 growing seasons. 3D erosion control geomat with high-tensile wire mesh backing holds soil on 45°+ slopes. Vegetated reno mattresses on riverbanks filter runoff while stabilizing banks — meeting both China\'s "Sponge City" and EU Water Framework Directive requirements.', zh: '安固生态石笼系统兼具结构强度与生态功能。石笼墙混合填充种植土和石料，使本土植物根系穿透生长，1–2个生长季内形成活体绿墙。三维水土保持网配合高强度金属网背衬，在45°+边坡上稳固土壤。河道植被雷诺护垫在稳固河岸的同时过滤径流——同时满足中国"海绵城市"和欧盟水框架指令要求。', vi: 'Hệ sinh thái rọ đá Angu kết hợp sức mạnh kết cấu với chức năng sinh thái. Tường rọ đá lẫn đất trồng và đá cho rễ cây bản địa mọc qua, tạo tường xanh sống trong 1–2 mùa sinh trưởng. Thảm địa kỹ thuật 3D lưới thép cường độ cao giữ đất trên taluy 45°+. Đệm Reno thực vật bờ sông lọc nước chảy trong khi cố định bờ — đáp ứng cả "Thành Phố Xốp" TQ và Chỉ Khung Nước EU.', th: 'ระบบเกเบี้ยนเชิงนิเวศของ Angu ผสมจุดแข็งทางโครงสร้างกับหน้าที่ทางนิเวศวิทยา ตะแกรงกล่องที่เติมดินบนและหินอนุญาตให้รากพืชพื้นเมืองเจาะผ่าน สร้างตะแกรงเขียวมีชีวิตใน 1–2 ฤดูเพาะปลูก เสื่อธรณำวิศวกรรม 3D ที่มีตะแกรงลวดแรงดึงสูงรองรับยึดดินบนไหล่เขา 45°+ ฟูก Reno ที่มีพืชพรรณริมตลิ่งกรองน้ำไหลพร้อมกับเสริมความมั่นคงของตลิ่ง — ตอบสนองทั้ง "เมืองฟองน้ำ" ของจีนและ EU Water Framework Directive'},
    implementation: {en: ['Ecological survey: native species, soil type, rainfall pattern, slope hydrology', 'Gabion green wall: bottom rock fill (drainage) → soil-rock mix middle → topsoil upper layers', '3D erosion mat installation with U-staples at 1m spacing, wire mesh overlay on steep sections', 'Hydroseeding with native grass/legume mix immediately after mat installation', 'Irrigation setup for first dry season until vegetation self-sustains', 'Biannual vegetation health + structural monitoring for 3 years post-installation'], zh: ['生态调查：本土物种、土壤类型、降雨模式、坡面水文', '石笼绿化墙：底部石料填充（排水）→ 中部土石混合 → 上层种植土', '三维水土保持网铺设，U型钉间距1m，陡坡段加铺金属网', '铺设完成后立即喷播本地草种/豆科植物混合种子', '第一个旱季设置灌溉，直至植被自维持', '安装后3年每半年植被健康+结构监测'], vi: ['Khảo sát sinh thái: loài bản địa, loại đất, mô hình mưa, thủy văn taluy', 'Tường rọ đá xanh: đáy đổ đá (thoát nước) → giữa đất đá → trên đất trồng', 'Lắp thảm xói 3D với ghim U khoảng 1m, phủ lưới thép đoạn dốc', 'Gieo hạt ướt với hỗn hợp cỏ/đậu bản địa ngay sau lắp thảm', 'Thiết lập tưới cho mùa khô đầu tiên cho đến khi thực vật tự duy trì', 'Giám sát sức khỏe thực vật + kết cấu 6 tháng/lần trong 3 năm sau lắp'], th: ['สำรวจนิเวศ: สปีชีส์พื้นถื่น ชนิดดิน รูปแบบฝน อุทกวิทยาไหล่เขา', 'ตะแกรงกล่องเขียว: ใส่หินด้านล่าง (ระบายน้ำ) → กลางผสมดินหิน → ชั้นบนดินบน', 'ติดตั้งเสื่อกันพังทะลุน 3D ด้วยลวดยึดรูป U ระยะ 1m ปูตะแกรงลวดทับบนช่วงชัน', 'หว่านเมล็ดแบบไฮโดรซีดด้วยส่วนผสมหญ้า/ถั่วพื้นถื่นทันทีหลังติดตั้งเสื่อ', 'ติดตั้งระบบชลประทานสำหรับฤดูแล้งแรกจนกว่าพืชพรรณจะยั่งยืนได้เอง', 'ติดตามสุขภาพพืชพรรณ + โครงสร้างปีละครั้งเป็นเวลา 3 ปีหลังติดตั้ง']},
    productSlugs: ['galvanized-gabion-box-2x1x1m', 'passive-slope-protection-barrier-gl100', 'hexagonal-wire-mesh-25mm'],
  },
  {
    slug: 'residential-community',
    icon: '🏘️',
    image: '/images/products/chain-link.jpg',
    title: {en: 'Residential & Community Solutions', zh: '住宅与社区解决方案', vi: 'Giải Pháp Dân Cư & Cộng Đồng', th: 'โซลูชันที่อยู่อาศัยและชุมชน'},
    description: {en: 'Decorative fence panels, garden trellis mesh, balcony safety nets, privacy screens, and community perimeter fencing.', zh: '装饰护栏、花园格栅网、阳台防护网、隐私围挡和社区周界围栏。', vi: 'Tấm rào trang trí, lưới giàn hoa, lưới an toàn ban công, màn chắn riêng tư, và rào chu vi cộng đồng.', th: 'แผงรั้วตกแต่ง ตะแกรงซุ้มสวน ตาข่ายกันตกระเบียง ฉากกั้นส่วนตัว และรั้วรอบขอบเขตชุมชน'},
    challenge: {en: 'Residential communities need fencing that balances security, aesthetics, and budget. Balcony falls account for 30% of child home accidents in high-rise apartments. Garden pests (deer, rabbits) destroy $500+ in landscaping per household annually. HOAs and property developers demand durable, low-maintenance solutions that enhance — not detract from — curb appeal.', zh: '住宅社区需要兼顾安全、美观和预算的围护方案。阳台坠落占高层住宅儿童家庭意外的30%。花园害兽（鹿、兔）每年给每户造成$500以上的景观破坏。业主委员会和地产开发商要求耐久、低维护且能提升（而非损害）外观的解决方案。', vi: 'Cộng đồng dân cư cần rào cân bằng an ninh, thẩm mỹ, và ngân sách. Ngã ban công chiếm 30% tai nạn nhà trẻ chung cư cao tầng. Súc vật vườn (hươu, thỏ) phá $500+ cảnh quan mỗi nhà mỗi năm. HOA và nhà phát triển bất động sản đòi giải pháp bền, ít bảo trì, tăng — không giảm — vẻ đường phố.', th: 'ชุมชนที่อยู่อาศัยต้องการรั้วที่สมดุลระหว่างความปลอดภัย ความสวยงาม และงบประมาณ การตกจากระเบียงคิดเป็น 30% ของอุบัติเหตุในบ้านเด็กในอพาร์ตเมนต์สูง สัตว์รบกวนสวน (กวาง กระต่าย) ทำลายภูมิทัศน์ $500+ ต่อครัวเรือนต่อปี HOA และผู้พัฒนาอสังหาริมทรัพย์ต้องการโซลูชันที่ทนทาน บำรุงรักษาต่ำ ที่เสริม — ไม่ลด — ความน่าดึงดูดของถนน'},
    approach: {en: 'Angu offers PVC-coated chain link fence in green/black for community perimeters — durable yet visually unobtrusive. Stainless steel balcony safety nets (Ø2.0mm, 50×50mm openings) are nearly invisible while meeting EN 12600 safety glass impact standards. Decorative welded wire garden trellises (PVC-coated in 6 colors) support climbing plants while keeping deer and rabbits out. 3D curved fence panels provide contemporary aesthetics for villa communities.', zh: '安固提供绿色/黑色PVC包塑勾花网用于社区周界——耐久且视觉不突兀。不锈钢阳台安全网（Ø2.0mm，50×50mm网孔）近乎隐形同时满足EN 12600安全玻璃冲击标准。装饰电焊网花园格栅（6色PVC包塑）支撑攀援植物生长同时阻挡鹿兔进入。3D弯折围栏面板为别墅社区提供现代美感。', vi: 'Angu cung cấp rào lưới mắt cáo PVC xanh/đen cho chu vi cộng đồng — bền nhưng không nổi. Lưới an toàn ban công thép không gỉ (Ø2.0mm, lỗ 50×50mm) gần như vô hình trong khi đạt EN 12600. Giàn lưới hàn trang trí (PVC 6 màu) đỡ leo dây và giữ hươu thỏ ra. Tấm rào 3D uốn cung cấp thẩm mỹ hiện đại cho biệt thự.', th: 'Angu จัดหารั้วตะแกรงถักเคลือบ PVC สีเขียว/ดำ สำหรับรั้วรอบขอบเขตชุมชน — ทนทานแต่ไม่เด่น ตาข่ายความปลอดภัยระเบียงสแตนเลส (Ø2.0mm ช่อง 50×50mm) แทบจะมองไม่เห็นในขณะที่ได้มาตรฐาน EN 12600 ตะแกรงซุ้มสวนเชื่อมตกแต่ง (เคลือบ PVC 6 สี) รองรับพืชเลื้อยและกันกวางกระต่าย แผงรั้วโค้ง 3D ให้ความสวยงามสมัยใหม่สำหรับชุมชนวิล่า'},
    implementation: {en: ['Site survey: community layout, architectural style, security requirements', 'Perimeter fence: PVC-coated in architectural color, 1.8–2.4m height with top rail', 'Balcony safety net installation: stainless steel cable mesh tensioned on aluminum frame', 'Garden fence: decorative welded panels at 1.2m height with gate access', 'Privacy screen attachment where needed (windbreak fabric or slat inserts)', 'Annual visual inspection + hardware tightening'], zh: ['现场勘测：社区布局、建筑风格、安防需求', '周界围栏：建筑配色PVC包塑，高度1.8–2.4m，带顶部横杆', '阳台安全网安装：不锈钢索网在铝合金框架上张拉', '花园围栏：装饰电焊网面板，高度1.2m，配通道门', '需要处加装隐私围挡（挡风织物或插片式）', '每年目视检查+五金件紧固'], vi: ['Khảo sát: bố cục cộng đồng, phong cách kiến trúc, yêu cầu an ninh', 'Rào chu vi: PVC màu kiến trúc, cao 1.8–2.4m, thanh đỉnh', 'Lắp lưới an toàn ban công: lưới cáp thép không gỉ căng trên khung nhôm', 'Rào vườn: tấm hàn trang trí cao 1.2m, có cổng', 'Gắn màn chắn riêng tư nơi cần (vải chắn gió hoặc nan cắm)', 'Kiểm tra thị giác hàng năm + siết lại phần cứng'], th: ['สำรวจไซต์: ผังชุมชน สไตล์สถาปัตยกรรม ข้อกำหนดความปลอดภัย', 'รั้วรอบขอบเขต: เคลือบ PVC สีสถาปัตยกรรม สูง 1.8–2.4m มีราวบนสุด', 'ติดตั้งตาข่ายความปลอดภัยระเบียง: ตะแกรงเชือกลวดสแตนเลสดึงบนโครงอะลูมิเนียม', 'รั้วสวน: แผงเชื่อมตกแต่งสูง 1.2m พร้อมประตูเข้า', 'ติดตั้งฉากกั้นส่วนตัวที่จำเป็น (ผ้ากันลมหรือแผ่นแทรก)', 'ตรวจสอบด้วยสายตารายปี + ขันฮาร์ดแวร์']},
    productSlugs: ['chain-link-fence-50mm', 'welded-wire-mesh-50mm', 'razor-barbed-wire-bto22'],
  },
];

const faqItems = [
  {
    q: {en: 'What wire mesh solutions does Angu provide for construction projects?', zh: '安固为建筑项目提供哪些丝网解决方案？', vi: 'Angu cung cấp giải pháp lưới thép nào cho dự án xây dựng?', th: 'Angu จัดหาโซลูชันตะแกรงลวดใดสำหรับโครงการก่อสร้าง?'},
    a: {en: 'Angu provides BRC welded wire mesh for concrete slab reinforcement, gabion retaining walls for earth retention, chain link fencing for construction site perimeter security, and welded wire formwork mesh. All products meet ASTM / ISO standards and can be customized to project specifications.', zh: '安固提供BRC电焊网用于混凝土楼板配筋，石笼挡墙用于土体支护，勾花网围栏用于工地周界安防，以及电焊网模板。所有产品符合ASTM/ISO标准，可按项目规格定制。', vi: 'Angu cung cấp lưới thép hàn BRC cho gia cố sàn bê tông, tường rọ đá giữ đất, hàng rào lưới mắt cáo cho an ninh chu vi công trường, và lưới khuôn mẫu hàn. Tất cả sản phẩm đạt tiêu chuẩn ASTM/ISO, có thể tùy chỉnh theo thông số dự án.', th: 'Angu จัดหาตะแกรงเชื่อม BRC สำหรับเสริมพื้นคอนกรีต ตะแกรงกล่องกันดิน รั้วตะแกรงถักสำหรับความปลอดภัยรอบรอบไซต์ก่อสร้าง และตะแกรงแม่พิมพ์ สินค้าทั้งหมดได้มาตรฐาน ASTM/ISO และปรับแต่งตามข้อกำหนดโครงการได้'},
  },
  {
    q: {en: 'How effective are Angu noise barriers for highways and railways?', zh: '安固声屏障对公路和铁路的降噪效果如何？', vi: 'Hiệu quả của rào chắn tiếng ồn Angu cho đường cao tốc và đường sắt như thế nào?', th: 'ประสิทธิภาพของแผงกั้นเสียง Angu สำหรับทางหลวงและทางรถไฟเป็นอย่างไร?'},
    a: {en: 'Angu noise barriers achieve NRC (Noise Reduction Coefficient) ratings of 0.85+, delivering 15–25dB noise reduction depending on barrier height and panel configuration. They are tested to HJ/T 90-2004 (China) and EN 1793 (EU) standards. Our barriers combine perforated metal mesh facades with rockwool absorptive cores for 25+ year service life.', zh: '安固声屏障达到NRC（降噪系数）0.85+，根据屏障高度和面板配置可实现15–25dB降噪。产品通过HJ/T 90-2004（中国）和EN 1793（欧盟）标准测试。穿孔金属网面结合岩棉吸声芯材，使用寿命超25年。', vi: 'Rào chắn tiếng ồn Angu đạt chỉ số NRC (Hệ số giảm tiếng ồn) 0.85+, giảm ồn 15–25dB tùy chiều cao và cấu hình tấm. Sản phẩm kiểm tra theo tiêu chuẩn HJ/T 90-2004 (Trung Quốc) và EN 1793 (EU). Kết hợp mặt lưới kim loại đục lỗ với lõi đá len hút âm, tuổi thọ trên 25 năm.', th: 'แผงกั้นเสียง Angu ได้ค่า NRC (สัมประสิทธิ์การลดเสียง) 0.85+ ลดเสียง 15–25dB ขึ้นกับความสูงและการจัดวางแผง ทดสอบตามมาตรฐาน HJ/T 90-2004 (จีน) และ EN 1793 (สหภาพยุโรป) ผสมผสานหน้าตะแกรงเจาะรูกับแกนใยหินดูดซับเสียง อายุการใช้งาน 25+ ปี'},
  },
  {
    q: {en: 'What rockfall protection systems are available for mining operations?', zh: '矿山作业有哪些落石防护系统可选？', vi: 'Có hệ thống bảo vệ chống rơi đá nào cho hoạt động khai thác mỏ?', th: 'มีระบบป้องกันหินตกใดสำหรับการทำเหมือง?'},
    a: {en: 'Angu offers three tiers: (1) active drapery nets for slope stabilization with systematic anchoring, (2) passive high-energy ring net barriers (500–5000 kJ capacity) at bench toes, and (3) gabion blast walls for explosive magazine protection. All systems use ISO 17745-certified 1770 MPa high-tensile steel wire.', zh: '安固提供三个层级：(1)主动覆盖式防护网用于坡面稳固配合系统锚杆，(2)被动高能级环形网屏障（500–5000 kJ）设于台阶底部，(3)石笼防爆墙用于炸药库防护。所有系统采用ISO 17745认证的1770 MPa高强度钢丝。', vi: 'Angu cung cấp 3 cấp: (1) lưới phủ chủ động cố định taluy với neo hệ thống, (2) rào chắn vòng lưới thụ động năng lượng cao (500–5000 kJ) ở chân bậc, và (3) tường rọ đá chống nổ bảo vệ kho thuốc nổ. Tất cả dùng dây thép cường độ cao 1770 MPa chứng nhận ISO 17745.', th: 'Angu จัดหา 3 ระดับ: (1) ตาข่ายปกคลุมแบบ active สำหรับเสริมเสถียรภาพไหล่เขาด้วยการยึดเป็นระบบ (2) ตาข่ายวงแหวนแบบ passive พลังงานสูง (500–5000 kJ) ที่ตีนไหล่เขา และ (3) กำแพงเกเบี้ยนกันระเบิดสำหรับป้องกันคลังวัตถุระเบิด ทั้งหมดใช้ลวดเหล็กแรงดึงสูง 1770 MPa ที่ได้รับการรับรอง ISO 17745'},
  },
  {
    q: {en: 'How long do Angu gabion structures last in water environments?', zh: '安固石笼结构在水环境中能使用多久？', vi: 'Cấu trúc rọ đá Angu tồn tại bao lâu trong môi trường nước?', th: 'โครงสร้างเกเบี้ยน Angu อยู่ได้นานเท่าใดในสภาพแวดล้อมที่มีน้ำ?'},
    a: {en: 'With ZnAl 5% (Galfan) + PVC coating, Angu gabion boxes achieve 50+ years design life in freshwater environments and 30+ years in saltwater/coastal conditions. The triple-twist selvedge construction prevents unraveling even if individual wires are damaged. We provide 10-year warranty on coating integrity for heavy-duty gabion products.', zh: '采用ZnAl 5%（高凡）合金+PVC包塑工艺，安固石笼网箱在淡水环境中设计寿命50年以上，咸水/沿海条件30年以上。三绞合锁边结构即使单根钢丝受损也不会散开。重型石笼产品提供10年涂层完整性质保。', vi: 'Với lớp phủ ZnAl 5% (Galfan) + PVC, rọ đá Angu đạt tuổi thọ thiết kế 50+ năm trong môi trường nước ngọt và 30+ năm trong điều kiện nước mặn/vùng bờ. Cấu trúc xoắn ba ngăn xả sợi ngay cả khi dây đơn bị hỏng. Bảo hành 10 năm cho tính toàn vẹn lớp phủ sản phẩm rọ đá hạng nặng.', th: 'ด้วยการเคลือบ ZnAl 5% (Galfan) + PVC กล่องเกเบี้ยน Angu มอบอายุการใช้งาน 50+ ปีในสภาพน้ำจืดและ 30+ ปีในสภาพน้ำเค็ม/ชายฝั่ง โครงสร้างถักสามชั้นป้องกันการคลี่แม้ลวดเสีย รับประกัน 10 ปีสำหรับความสมบูรณ์ของการเคลือบสินค้าเกเบี้ยนหนัก'},
  },
  {
    q: {en: 'Can Angu customize wire mesh solutions for unique project requirements?', zh: '安固能否为特殊项目需求定制丝网方案？', vi: 'Angu có thể tùy chỉnh giải pháp lưới thép cho yêu cầu dự án đặc biệt không?', th: 'Angu สามารถปรับแต่งโซลูชันตะแกรงลวดสำหรับข้อกำหนดเฉพาะของโครงการได้หรือไม่?'},
    a: {en: 'Yes. Our engineering team provides full custom design including: non-standard wire diameters (Ø1.6–6.0mm), custom mesh openings, special coatings (ZnAl, PVC, epoxy), and pre-assembled panels cut to size. We work from your CAD drawings, technical specifications, or on-site photos. Typical custom order lead time is 15–25 days from drawing approval.', zh: '可以。工程团队提供全定制设计，包括：非标丝径（Ø1.6–6.0mm）、定制网孔、特种涂层（ZnAl、PVC、环氧）、按尺寸预切割网片。可基于您的CAD图纸、技术规格或现场照片进行设计。典型定制订单从图纸确认起15–25天交货。', vi: 'Có. Đội kỹ thuật cung cấp thiết kế tùy chỉnh đầy đủ: đường kính dây phi tiêu chuẩn (Ø1.6–6.0mm), lỗ lưới tùy chỉnh, lớp phủ đặc biệt (ZnAl, PVC, epoxy), tấm lắp ráp sẵn cắt theo kích thước. Làm việc từ bản vẽ CAD, thông số kỹ thuật, hoặc ảnh thực địa. Thời gian giao hàng điển hình 15–25 ngày từ khi duyệt bản vẽ.', th: 'ได้ ทีมวิศวกรจัดหาการออกแบบที่กำหนดเองครบถ้วน: เส้นผ่านลวดไม่มาตรฐาน (Ø1.6–6.0mm) รูตะแกรงตามสั่ง การเคลือบพิเศษ (ZnAl, PVC, epoxy) และแผงประกอบสำเร็จตัดตามขนาด ทำงานจากแบบร่าง CAD ข้อกำหนดทางเทคนิค หรือภาพหน้างาน ระยะเวลาส่งมอบทั่วไป 15–25 วันนับจากอนุมัติแบบ'},
  },
  {
    q: {en: 'Where is Angu factory located and which countries do you export to?', zh: '安固工厂在哪里？出口哪些国家？', vi: 'Nhà máy Angu ở đâu và xuất khẩu đến những quốc gia nào?', th: 'โรงงาน Angu อยู่ที่ไหนและส่งออกไปยังประเทศใดบ้าง?'},
    a: {en: 'Angu is headquartered in Anping County, Hebei Province — known as China\'s "Wire Mesh Capital." We export to 30+ countries across Southeast Asia, Middle East, Africa, South America, and Europe. Our 5,000+ ton annual capacity supports both FCL and LCL shipping via Tianjin Port, with DHL/FedEx air freight available for urgent trial orders.', zh: '安固总部位于河北省安平县——中国"丝网之都"。产品出口东南亚、中东、非洲、南美和欧洲等30多个国家。年产5000+吨，支持整柜和拼箱天津港发货，紧急试单可走DHL/FedEx空运。', vi: 'Angu đặt trụ sở tại Huyện An Bình, Tỉnh Hà Bắc — được mệnh danh là "Thủ phủ Lưới Thép" của Trung Quốc. Xuất khẩu đến 30+ quốc gia Đông Nam Á, Trung Đông, Châu Phi, Nam Mỹ và Châu Âu. Năng lực 5.000+ tấn/năm hỗ trợ vận chuyển FCL và LCL qua Cảng Thiên Tân, có dịch vụ chuyển phát nhanh DHL/FedEx cho đơn thử khẩn.', th: 'Angu มีสำนักงานใหญ่ที่อำเภออันผิง มณฑลหฺอเป่ย — ขึ้นชื่อเป็น "เมืองหลวงตะแกรงลวด" ของจีน ส่งออกไปยัง 30+ ประเทศทั่วอาเซียน ตะวันออกกลาง แอฟริกา อเมริกาใต้ และยุโรป กำลังการผลิต 5,000+ ตัน/ปี รองรับการขนส่ง FCL และ LCL ผ่านท่าเรือเทียนจิน มีบริการขนส่งทางอากาศ DHL/FedEx สำหรับคำสั่งทดลองด่วน'},
  },
];

function getValue<T>(obj: Record<string, T>, locale: string, fallback?: Record<string, T>): T {
  return (obj as Record<string, T>)[locale] ?? (fallback as Record<string, T>)?.['en'] ?? (obj as Record<string, T>)['en'];
}

function SolutionArticle({sol, locale, i, productNameMap, resolveImage}: {
  sol: Solution;
  locale: string;
  i: number;
  productNameMap: Map<string, string>;
  resolveImage: (slug: string, fallback: string) => string;
}) {
  const t = (en: string, zh: string, vi: string, th: string) => locale === 'zh' ? zh : locale === 'vi' ? vi : locale === 'th' ? th : en;
  const isLast = i === solutions.length - 1;
  return (
    <article
      id={sol.slug}
      className={`py-14 ${!isLast ? 'border-b border-slate-100' : ''}`}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left sidebar */}
        <div className="lg:w-[280px] shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden shadow-lg mb-5">
              <img
                src={resolveImage(sol.slug, sol.image)}
                alt={getValue(sol.title, locale, sol.title)}
                width={280}
                height={180}
                loading={i < 2 ? "eager" : "lazy"}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-md">
                {sol.icon}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {getValue(sol.title, locale, sol.title)}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {getValue(sol.description, locale, sol.description)}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors"
            >
              {t('Request This Solution →', '获取该方案 →', 'Yêu Cầu Giải Pháp Này →', 'ขอโซลูชันนี้ →')}
            </Link>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Challenge */}
          <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-600 uppercase tracking-wide mb-3">
              <span className="w-5 h-0.5 bg-rose-400 rounded" />
              {t('⚠️ The Challenge', '⚠️ 行业挑战', '⚠️ Thách Thức Ngành', '⚠️ ความท้าทายของอุตสาหกรรม')}
            </h3>
            <p className="text-slate-700 leading-relaxed">{getValue(sol.challenge, locale, sol.challenge)}</p>
          </div>

          {/* Approach */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-3">
              <span className="w-5 h-0.5 bg-emerald-400 rounded" />
              {t('✅ Our Engineering Approach', '✅ 工程解决方案', '✅ Giải Pháp Kỹ Thuật', '✅ แนวทางทางวิศวกรรม')}
            </h3>
            <p className="text-slate-700 leading-relaxed">{getValue(sol.approach, locale, sol.approach)}</p>
          </div>

          {/* Implementation Steps */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
              <span className="w-5 h-0.5 bg-blue-400 rounded" />
              {t('📋 Implementation Steps', '📋 实施步骤', '📋 Các Bước Triển Khai', '📋 ขั้นตอนการดำเนินการ')}
            </h3>
            <ol className="space-y-3">
              {getValue(sol.implementation, locale, sol.implementation).map((step, si) => (
                <li key={si} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{si + 1}</span>
                  <span className="text-slate-700 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Recommended Products */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-600 uppercase tracking-wide mb-4">
              <span className="w-5 h-0.5 bg-amber-400 rounded" />
              {t('🔧 Recommended Products', '🔧 推荐产品', '🔧 Sản Phẩm Đề Xuất', '🔧 สินค้าที่แนะนำ')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {sol.productSlugs.map((slug, pi) => (
                <Link
                  key={pi}
                  href={`/${locale}/products/${slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-sm rounded-full border border-amber-200 hover:border-amber-300 transition-colors"
                >
                  {productNameMap.get(slug) || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA per solution */}
          <div className="bg-slate-50 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="font-semibold text-slate-900">{t('Need a quote for this solution?', '需要该方案的报价？', 'Cần báo giá cho giải pháp này?', 'ต้องการใบเสนอราคาสำหรับโซลูชันนี้?')}</p>
              <p className="text-sm text-slate-500">{t('Our engineers respond within 24 hours with a custom proposal.', '工程师24小时内回复并提供定制方案。', 'Kỹ sư phản hồi trong 24 giờ với đề xuất tùy chỉnh.', 'วิศวกรตอบกลับภายใน 24 ชั่วโมงพร้อมข้อเสนอที่ปรับให้เหมาะสม')}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap text-sm"
            >
              {t('Get a Quote →', '获取报价 →', 'Nhận Báo Giá →', 'ขอใบเสนอราคา →')}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function SolutionsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = (en: string, zh: string, vi: string, th: string) => locale === 'zh' ? zh : locale === 'vi' ? vi : locale === 'th' ? th : en;
  const siteConfig = await getSiteConfig();
  const config = siteConfig?.config;
  const catalog = await getCatalog();
  const productNameMap = new Map<string, string>();
  for (const p of catalog?.products || []) {
    productNameMap.set(p.slug, p.names[locale] || p.names.en || p.slug);
  }

  const v = (key: string, fbEn: string, fbZh?: string) => {
    const entry = config?.[key];
    if (!entry) return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    return (entry as Record<string, string>)[locale] || entry.en || (locale === 'zh' ? (fbZh ?? fbEn) : fbEn);
  };
  const headerTitle = v('solutions_header_title', 'Industry-Leading Wire Mesh Solutions', '行业领先的丝网解决方案');
  const headerSubtitle = v('solutions_header_subtitle', 'From bridge abutments to backyard gardens — Angu delivers engineered wire mesh systems across 9 industries. 15 years of factory expertise, ISO 9001 certified, exported to 30+ countries.', '从桥梁桥台到后花园——安固为9大行业提供工程级丝网系统。15年工厂经验，ISO 9001认证，出口30+国家。');
  const headerBreadcrumb = v('solutions_header_breadcrumb', 'Solutions', '解决方案');
  const seoIntro = v('solutions_seo_intro',
    'Angu Wire Mesh designs and supplies custom wire mesh solutions for infrastructure, mining, and defense applications. Gabion retaining walls, rockfall barriers, blast fencing, noise barriers — engineered to EN, ASTM, and JT standards.',
    '安固丝网设计和供应定制丝网解决方案，用于基础设施、矿山和国防应用。石笼挡土墙、边坡防护屏障、防爆围栏、声屏障 — 按EN、ASTM和JT标准设计。'
  );
  const faqTitle = v('solutions_faq_title', 'Frequently Asked Questions', '常见问题');
  const faqDesc = v('solutions_faq_desc', 'Quick answers to common questions about our wire mesh solutions.', '关于丝网解决方案的常见问题快速解答。');
  const crosslinksTitle = v('solutions_crosslinks_title', 'Explore More', '了解更多');

  // Resolve image from site_config with hardcoded fallback
  const solImage = (slug: string, fallback: string) => v(`solutions_${slug}_image`, fallback, fallback);

  // JSON-LD structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: getValue(item.q, locale, item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getValue(item.a, locale, item.a),
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('解决方案', 'Solutions', locale), item: `https://www.angumesh.com/${locale}/solutions`},
    ],
  };

  // Service JSON-LD for each solution
  const serviceSchema = solutions.map((sol) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: getValue(sol.title, locale, sol.title),
    description: getValue(sol.description, locale, sol.description),
    provider: {
      '@type': 'Organization',
      name: 'Angu Wire Mesh',
      url: 'https://www.angumesh.com',
    },
    serviceType: getValue(sol.title, locale, sol.title),
    areaServed: 'Global',
    url: `https://www.angumesh.com/${locale}/solutions#${sol.slug}`,
  }));

  // HowTo JSON-LD for each solution (implementation steps)
  const howToSchemas = solutions.map((sol) => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: getValue(sol.title, locale, sol.title),
    description: getValue(sol.description, locale, sol.description),
    step: getValue(sol.implementation, locale, sol.implementation).map((step, si) => ({
      '@type': 'HowToStep',
      position: si + 1,
      name: step.split(/[：:]/)[0] || step.substring(0, 60),
      itemListElement: {
        '@type': 'HowToDirection',
        text: step,
      },
    })),
  }));

  // ItemList JSON-LD for the solutions collection
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tLabel('安固行业解决方案', 'Angu Industry Solutions', locale),
    itemListElement: solutions.map((sol, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: getValue(sol.title, locale, sol.title),
      url: `https://www.angumesh.com/${locale}/solutions#${sol.slug}`,
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(itemListSchema)}}
      />
      {serviceSchema.map((schema, i) => (
        <script
          key={`svc-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
      ))}
      {howToSchemas.map((schema, i) => (
        <script
          key={`ht-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
      ))}

      {/* ─── Hero Header ─── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{tLabel('首页', 'Home', locale)}</Link>
              <span>/</span>
              <span className="text-white">{headerBreadcrumb}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {headerTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
              {headerSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                t('ISO 9001 Certified', 'ISO 9001 认证', 'Chứng nhận ISO 9001', 'รับรอง ISO 9001'),
                t('CE Certified', 'CE 认证', 'Chứng nhận CE', 'รับรอง CE'),
                t('15+ Years Experience', '15+ 年经验', '15+ năm kinh nghiệm', '15+ ปีประสบการณ์'),
                t('30+ Countries Exported', '出口 30+ 国家', 'Xuất khẩu 30+ quốc gia', 'ส่งออก 30+ ประเทศ'),
              ].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEO Intro (AI corpus) ─── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
            <p>{seoIntro}</p>
          </div>
        </div>
      </div>

      {/* ─── Industry Solutions ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Grid */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{t('9 Industries Served', '覆盖 9 大行业', 'Phục vụ 9 ngành', 'ให้บริการ 9 อุตสาหกรรม')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('Industry-Specific Solutions', '行业专属解决方案', 'Giải Pháp Theo Ngành', 'โซลูชันเฉพาะอุตสาหกรรม')}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t(
                'Click any industry below to jump to its detailed solution — including challenges, our engineering approach, implementation steps, and recommended products.',
                '点击下方任意行业，查看详细方案——包括行业挑战、工程方案、实施步骤和推荐产品。',
                'Nhấp vào bất kỳ ngành nào bên dưới để xem giải pháp chi tiết — bao gồm thách thức, phương pháp kỹ thuật, các bước triển khai và sản phẩm đề xuất.',
                'คลิกที่อุตสาหกรรมใดๆ ด้านล่างเพื่อดูโซลูชันโดยละเอียด — รวมถึงความท้าทาย แนวทางทางวิศวกรรม ขั้นตอนการดำเนินการ และสินค้าที่แนะนำ'
              )}
            </p>
          </div>

          {/* Quick-link grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
            {solutions.map(sol => (
              <a
                key={sol.slug}
                href={`#${sol.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100 transition-all group"
              >
                <span className="text-2xl">{sol.icon}</span>
                <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 text-center leading-tight">
                  {getValue(sol.title, locale, sol.title)}
                </span>
              </a>
            ))}
          </div>

          {/* Detailed Solutions — first 3 always visible, rest collapsible */}
          {solutions.slice(0, 3).map((sol, i) => (
            <SolutionArticle key={sol.slug} sol={sol} locale={locale} i={i} productNameMap={productNameMap} resolveImage={solImage} />
          ))}
          <details className="mb-4">
            <summary className="cursor-pointer text-center py-4 text-blue-600 font-semibold hover:text-blue-700 list-none">
              {t('Show all 9 solutions ▼', '展开全部 9 个方案 ▼', 'Hiển thị tất cả 9 giải pháp ▼', 'แสดงทั้ง 9 โซลูชัน ▼')}
            </summary>
            {solutions.slice(3).map((sol, idx) => (
              <SolutionArticle key={sol.slug} sol={sol} locale={locale} i={idx + 3} productNameMap={productNameMap} resolveImage={solImage} />
            ))}
          </details>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {faqTitle}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {faqDesc}
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                  <h3 className="text-base font-semibold text-slate-900 pr-8">{getValue(item.q, locale, item.q)}</h3>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-open:bg-blue-100 flex items-center justify-center transition-colors">
                    <svg className="w-3.5 h-3.5 text-slate-500 group-open:text-blue-600 group-open:rotate-45 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-slate-600 leading-relaxed">{getValue(item.a, locale, item.a)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Factory CTA ─── */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Don't See Your Industry?", '没找到您的行业？', 'Không tìm thấy ngành của bạn?', 'ไม่พบอุตสาหกรรมของคุณ?')}
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t(
              'We engineer custom wire mesh solutions for niche applications too — marine aquaculture, avalanche control, military fortification, zoological enclosures, and more. Describe your project and our engineering team will design a system that fits.',
              '我们也为细分领域提供定制丝网方案——海洋养殖、雪崩防控、军事工事、动物园围护等。描述您的项目，工程团队为您量身设计。',
              'Chúng tôi cũng thiết kế giải pháp lưới thép tùy chỉnh cho các ứng dụng chuyên biệt — nuôi trồng thủy sản biển, kiểm soát tuyết lở, công sự quân sự, chuồng thú và hơn thế nữa. Mô tả dự án của bạn và đội ngũ kỹ thuật sẽ thiết kế hệ thống phù hợp.',
              'เราออกแบบโซลูชันตะแกรงลวดที่กำหนดเองสำหรับการประยุกต์ใช้เฉพาะทางเช่นกัน — การเพาะเลี้ยงสัตว์ทะเล การควบคุมหิมะถล่ม ป้อมปราการทางทหาร กรงสัตว์ และอื่นๆ อธิบายโครงการของคุณแล้วทีมวิศวกรรมของเราจะออกแบบระบบที่เหมาะสม'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              {t('Contact Our Engineers →', '联系工程师 →', 'Liên Hệ Kỹ Sư →', 'ติดต่อวิศวกร →')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-block px-8 py-3.5 border border-slate-600 hover:border-slate-400 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              {t('Browse All Products', '浏览全部产品', 'Duyệt Tất Cả Sản Phẩm', 'เรียกดูสินค้าทั้งหมด')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Cross-links ─── */}
      <nav aria-label={tLabel('页面导航', 'Page navigation', locale)} className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {crosslinksTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              {href: 'products', icon: '📦', en: 'All Products', zh: '全部产品', vi: 'Tất Cả Sản Phẩm', th: 'สินค้าทั้งหมด'},
              {href: 'service', icon: '🛠️', en: 'Our Services', zh: '我们的服务', vi: 'Dịch Vụ', th: 'บริการของเรา'},
              {href: 'about', icon: '🏢', en: 'About Us', zh: '关于我们', vi: 'Về Chúng Tôi', th: 'เกี่ยวกับเรา'},
              {href: 'contact', icon: '✉️', en: 'Contact Us', zh: '联系我们', vi: 'Liên Hệ', th: 'ติดต่อเรา'},
              {href: 'blog', icon: '📝', en: 'Blog', zh: '行业博客', vi: 'Blog', th: 'บล็อก'},
            ].map(link => (
              <Link key={link.href} href={`/${locale}/${link.href}`} className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
                {link.icon} {(locale === 'zh' ? link.zh : locale === 'vi' ? link.vi : locale === 'th' ? link.th : link.en)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
