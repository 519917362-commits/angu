import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getProduct, getCatalog} from '@/lib/api';
import {generatePageMeta} from '@/lib/seo-utils';
import {InquiryButtonLarge} from '@/components/inquiry/InquiryButtonLarge';
import {ProductCard} from '@/components/products/ProductCard';
import ProductGallery from '@/components/products/ProductGallery';
import type {Product} from '@/types/product';
import {getProductFaqs} from '@/lib/data/productFaqs';
import {tLabel} from '@/lib/i18n';
import {renderMarkdown} from '@/lib/markdown';
import {routing} from '@/lib/routing';

const specLabels: Record<string, Record<string, string>> = {
  // Basic
  material: {zh: '材质', en: 'Material', vi: 'Vật liệu', th: 'วัสดุ'},
  wireDiameter: {zh: '丝径', en: 'Wire Diameter', vi: 'Đường kính dây', th: 'เส้นผ่านศูนย์กลางลวด'},
  wireGauge: {zh: '线径', en: 'Wire Gauge', vi: 'Cỡ dây', th: 'ขนาดลวด'},
  meshAperture: {zh: '网孔', en: 'Mesh Aperture', vi: 'Mắt lưới', th: 'ขนาดตาข่าย'},
  surfaceTreatment: {zh: '表面处理', en: 'Surface Treatment', vi: 'Xử lý bề mặt', th: 'การเคลือบผิว'},
  surface: {zh: '表面处理', en: 'Surface Treatment', vi: 'Xử lý bề mặt', th: 'การเคลือบผิว'},
  coating: {zh: '涂层', en: 'Coating', vi: 'Lớp phủ', th: 'สารเคลือบ'},
  dimensions: {zh: '尺寸', en: 'Dimensions', vi: 'Kích thước', th: 'ขนาด'},
  width: {zh: '宽度', en: 'Width', vi: 'Chiều rộng', th: 'ความกว้าง'},
  length: {zh: '长度', en: 'Length', vi: 'Chiều dài', th: 'ความยาว'},
  height: {zh: '高度', en: 'Height', vi: 'Chiều cao', th: 'ความสูง'},
  weight: {zh: '重量', en: 'Weight', vi: 'Trọng lượng', th: 'น้ำหนัก'},
  colors: {zh: '颜色', en: 'Colors', vi: 'Màu sắc', th: 'สี'},
  tensileStrength: {zh: '抗拉强度', en: 'Tensile Strength', vi: 'Độ bền kéo', th: 'แรงดึง'},
  breakingStrength: {zh: '断裂强度', en: 'Breaking Strength', vi: 'Độ bền đứt', th: 'แรงแตกหัก'},
  impactResistance: {zh: '抗冲击性', en: 'Impact Resistance', vi: 'Khả năng chống va đập', th: 'ความต้านทานแรงกระแทก'},
  standard: {zh: '标准', en: 'Standard', vi: 'Tiêu chuẩn', th: 'มาตรฐาน'},
  certifications: {zh: '认证', en: 'Certifications', vi: 'Chứng nhận', th: 'การรับรอง'},
  // Wire mesh specifics
  rollLength: {zh: '卷长', en: 'Roll Length', vi: 'Chiều dài cuộn', th: 'ความยาวม้วน'},
  weaveType: {zh: '编织方式', en: 'Weave Type', vi: 'Kiểu dệt', th: 'รูปแบบการทอ'},
  knotType: {zh: '结节类型', en: 'Knot Type', vi: 'Loại nút', th: 'ประเภทปม'},
  panelSize: {zh: '网片尺寸', en: 'Panel Size', vi: 'Kích thước tấm', th: 'ขนาดแผง'},
  unitSize: {zh: '单元尺寸', en: 'Unit Size', vi: 'Kích thước đơn vị', th: 'ขนาดหน่วย'},
  outerMesh: {zh: '外层网面', en: 'Outer Mesh', vi: 'Lưới ngoài', th: 'ตาข่ายด้านนอก'},
  innerMesh: {zh: '内层网面', en: 'Inner Mesh', vi: 'Lưới trong', th: 'ตาข่ายด้านใน'},
  net: {zh: '网面', en: 'Net', vi: 'Lưới', th: 'ตาข่าย'},
  // Barbed wire
  bladeType: {zh: '刀片类型', en: 'Blade Type', vi: 'Loại lưỡi', th: 'ประเภทใบมีด'},
  bladeThickness: {zh: '刀片厚度', en: 'Blade Thickness', vi: 'Độ dày lưỡi', th: 'ความหนาใบมีด'},
  coilDiameter: {zh: '卷径', en: 'Coil Diameter', vi: 'Đường kính cuộn', th: 'เส้นผ่านศูนย์กลางขด'},
  loopsPerCoil: {zh: '每卷圈数', en: 'Loops Per Coil', vi: 'Số vòng/cuộn', th: 'จำนวนรอบ/ขด'},
  barbSpacing: {zh: '刺间距', en: 'Barb Spacing', vi: 'Khoảng cách gai', th: 'ระยะห่างหนาม'},
  barbLength: {zh: '刺长', en: 'Barb Length', vi: 'Chiều dài gai', th: 'ความยาวหนาม'},
  // Fence / Barrier
  post: {zh: '立柱', en: 'Post', vi: 'Cột', th: 'เสา'},
  frame: {zh: '边框', en: 'Frame', vi: 'Khung', th: 'โครง'},
  face: {zh: '面板', en: 'Face', vi: 'Mặt tấm', th: 'แผงหน้า'},
  facePlate: {zh: '面板', en: 'Face Plate', vi: 'Tấm mặt', th: 'แผ่นหน้า'},
  infill: {zh: '填充物', en: 'Infill', vi: 'Vật liệu lấp đầy', th: 'วัสดุอุด'},
  panelHeight: {zh: '屏体高度', en: 'Panel Height', vi: 'Chiều cao tấm', th: 'ความสูงแผง'},
  panelWidth: {zh: '屏体宽度', en: 'Panel Width', vi: 'Chiều rộng tấm', th: 'ความกว้างแผง'},
  structure: {zh: '结构', en: 'Structure', vi: 'Cấu trúc', th: 'โครงสร้าง'},
  connection: {zh: '连接方式', en: 'Connection', vi: 'Kết nối', th: 'การเชื่อมต่อ'},
  foundation: {zh: '基础', en: 'Foundation', vi: 'Móng', th: 'ฐานราก'},
  installType: {zh: '安装方式', en: 'Install Type', vi: 'Kiểu lắp đặt', th: 'ประเภทการติดตั้ง'},
  railType: {zh: '横梁类型', en: 'Rail Type', vi: 'Loại ray', th: 'ประเภทราง'},
  railSize: {zh: '横梁尺寸', en: 'Rail Size', vi: 'Kích thước ray', th: 'ขนาดราง'},
  model: {zh: '型号', en: 'Model', vi: 'Mẫu', th: 'รุ่น'},
  transparentOption: {zh: '透明选项', en: 'Transparent Option', vi: 'Tùy chọn trong suốt', th: 'ตัวเลือกโปร่งใส'},
  // Noise barrier
  noiseReduce: {zh: '降噪量', en: 'Noise Reduction', vi: 'Giảm tiếng ồn', th: 'การลดเสียง'},
  noiseReduction: {zh: '降噪系数(NRC)', en: 'NRC', vi: 'Hệ số giảm ồn (NRC)', th: 'ค่าสัมประสิทธิ์ลดเสียง (NRC)'},
  soundAbsorbing: {zh: '吸声性能', en: 'Sound Absorbing', vi: 'Hấp thụ âm thanh', th: 'การดูดซับเสียง'},
  acousticFill: {zh: '吸音填充', en: 'Acoustic Fill', vi: 'Vật liệu tiêu âm', th: 'วัสดุดูดซับเสียง'},
  // Safety / Blast
  blastResistance: {zh: '抗爆等级', en: 'Blast Resistance', vi: 'Khả năng chống nổ', th: 'ความต้านทานระเบิด'},
  fireRating: {zh: '防火等级', en: 'Fire Rating', vi: 'Xếp hạng chống cháy', th: 'ระดับการทนไฟ'},
  fireClass: {zh: '防火类别', en: 'Fire Class', vi: 'Loại chống cháy', th: 'ประเภทการทนไฟ'},
  weatherRating: {zh: '耐候等级', en: 'Weather Rating', vi: 'Xếp hạng thời tiết', th: 'ทนสภาพอากาศ'},
  windLoad: {zh: '风荷载', en: 'Wind Load', vi: 'Tải trọng gió', th: 'แรงลม'},
  antiRam: {zh: '防撞等级', en: 'Anti-Ram', vi: 'Chống đâm', th: 'ป้องกันการชน'},
  ballistic: {zh: '防弹等级', en: 'Ballistic', vi: 'Chống đạn', th: 'กันกระสุน'},
  lifespan: {zh: '使用寿命', en: 'Lifespan', vi: 'Tuổi thọ', th: 'อายุการใช้งาน'},
  // Slope protection
  geogrid: {zh: '土工格栅', en: 'Geogrid', vi: 'Lưới địa kỹ thuật', th: 'จีโอกริด'},
  geotextile: {zh: '土工布', en: 'Geotextile', vi: 'Vải địa kỹ thuật', th: 'จีโอเท็กซ์ไทล์'},
  rope: {zh: '绳索', en: 'Rope', vi: 'Dây cáp', th: 'เชือก'},
  anchor: {zh: '锚固', en: 'Anchor', vi: 'Neo', th: 'สมอ'},
  brakingElement: {zh: '制动单元', en: 'Braking Element', vi: 'Bộ phận hãm', th: 'อุปกรณ์เบรก'},
  // ── Added items (camelCase keys, data-driven) ──
  anchorCable: {zh: '锚索', en: 'Anchor Cable', vi: 'Cáp neo', th: 'สายเคเบิลสมอ'},
  anchorSpacing: {zh: '锚固间距', en: 'Anchor Spacing', vi: 'Khoảng cách neo', th: 'ระยะห่างสมอ'},
  anchorType: {zh: '锚固类型', en: 'Anchor Type', vi: 'Loại neo', th: 'ประเภทสมอ'},
  backStep: {zh: '后退台阶', en: 'Back Step', vi: 'Bậc lùi', th: 'ขั้นถอยหลัง'},
  barbType: {zh: '刺类型', en: 'Barb Type', vi: 'Loại gai', th: 'ประเภทหนาม'},
  barbWire: {zh: '刺铁丝', en: 'Barb Wire', vi: 'Dây thép gai', th: 'ลวดหนาม'},
  barbedWire: {zh: '刺铁丝', en: 'Barbed Wire', vi: 'Dây thép gai', th: 'ลวดหนาม'},
  base: {zh: '底座', en: 'Base', vi: 'Đế', th: 'ฐาน'},
  beamLength: {zh: '横梁长度', en: 'Beam Length', vi: 'Chiều dài dầm', th: 'ความยาวคาน'},
  beamThickness: {zh: '横梁厚度', en: 'Beam Thickness', vi: 'Độ dày dầm', th: 'ความหนาคาน'},
  beamType: {zh: '横梁类型', en: 'Beam Type', vi: 'Loại dầm', th: 'ประเภทคาน'},
  beamWidth: {zh: '横梁宽度', en: 'Beam Width', vi: 'Chiều rộng dầm', th: 'ความกว้างคาน'},
  bladeLength: {zh: '刀片长度', en: 'Blade Length', vi: 'Chiều dài lưỡi', th: 'ความยาวใบมีด'},
  bladeSpacing: {zh: '刀片间距', en: 'Blade Spacing', vi: 'Khoảng cách lưỡi', th: 'ระยะห่างใบมีด'},
  blastRating: {zh: '抗爆等级', en: 'Blast Rating', vi: 'Xếp hạng chống nổ', th: 'ระดับการต้านระเบิด'},
  bottomMeshOpening: {zh: '底层网孔', en: 'Bottom Mesh Opening', vi: 'Mắt lưới đáy', th: 'ขนาดตาข่ายด้านล่าง'},
  boundaryRope: {zh: '边界绳索', en: 'Boundary Rope', vi: 'Dây ranh giới', th: 'เชือกขอบเขต'},
  bracketType: {zh: '支架类型', en: 'Bracket Type', vi: 'Loại giá đỡ', th: 'ประเภทตัวยึด'},
  brakeElement: {zh: '制动元件', en: 'Brake Element', vi: 'Bộ phận phanh', th: 'อุปกรณ์เบรก'},
  breakingLoad: {zh: '断裂载荷', en: 'Breaking Load', vi: 'Tải trọng đứt', th: 'แรงแตกหัก'},
  cableConstruction: {zh: '缆绳结构', en: 'Cable Construction', vi: 'Cấu trúc cáp', th: 'โครงสร้างสายเคเบิล'},
  cableDiameter: {zh: '缆绳直径', en: 'Cable Diameter', vi: 'Đường kính cáp', th: 'เส้นผ่านศูนย์กลางสายเคเบิล'},
  cableMaterial: {zh: '缆绳材质', en: 'Cable Material', vi: 'Vật liệu cáp', th: 'วัสดุสายเคเบิล'},
  clips: {zh: '夹子', en: 'Clips', vi: 'Kẹp', th: 'คลิป'},
  coilLength: {zh: '卷长', en: 'Coil Length', vi: 'Chiều dài cuộn', th: 'ความยาวขด'},
  coilWeight: {zh: '卷重', en: 'Coil Weight', vi: 'Trọng lượng cuộn', th: 'น้ำหนักขด'},
  collapsedSize: {zh: '折叠尺寸', en: 'Collapsed Size', vi: 'Kích thước gấp gọn', th: 'ขนาดเมื่อพับ'},
  color: {zh: '颜色', en: 'Color', vi: 'Màu sắc', th: 'สี'},
  configuration: {zh: '配置', en: 'Configuration', vi: 'Cấu hình', th: 'การกำหนดค่า'},
  core: {zh: '芯材', en: 'Core', vi: 'Lõi', th: 'แกน'},
  coreMaterial: {zh: '芯材材质', en: 'Core Material', vi: 'Vật liệu lõi', th: 'วัสดุแกน'},
  coreWire: {zh: '芯线', en: 'Core Wire', vi: 'Dây lõi', th: 'ลวดแกน'},
  coreWireDiameter: {zh: '芯线直径', en: 'Core Wire Diameter', vi: 'Đường kính dây lõi', th: 'เส้นผ่านศูนย์กลางลวดแกน'},
  corrosionProtection: {zh: '防腐处理', en: 'Corrosion Protection', vi: 'Bảo vệ chống ăn mòn', th: 'การป้องกันสนิม'},
  coverageArea: {zh: '覆盖面积', en: 'Coverage Area', vi: 'Diện tích che phủ', th: 'พื้นที่ครอบคลุม'},
  crashRating: {zh: '防撞等级', en: 'Crash Rating', vi: 'Xếp hạng chống va chạm', th: 'ระดับการต้านการชน'},
  crimpType: {zh: '压边类型', en: 'Crimp Type', vi: 'Kiểu uốn', th: 'ประเภทการจีบ'},
  crowdPressureRating: {zh: '人群压力等级', en: 'Crowd Pressure Rating', vi: 'Xếp hạng áp lực đám đông', th: 'ระดับแรงดันฝูงชน'},
  edgeBinding: {zh: '边缘包边', en: 'Edge Binding', vi: 'Bọc cạnh', th: 'การเข้าเล่มขอบ'},
  edgeDetail: {zh: '边缘处理', en: 'Edge Detail', vi: 'Chi tiết cạnh', th: 'รายละเอียดขอบ'},
  energyCapacity: {zh: '能量吸收能力', en: 'Energy Capacity', vi: 'Khả năng hấp thụ năng lượng', th: 'ความจุพลังงาน'},
  fasteners: {zh: '紧固件', en: 'Fasteners', vi: 'Chốt', th: 'ตัวยึด'},
  feet: {zh: '支脚', en: 'Feet', vi: 'Chân đế', th: 'ฐานรอง'},
  ferruleMaterial: {zh: '套圈材质', en: 'Ferrule Material', vi: 'Vật liệu vòng đệm', th: 'วัสดุปลอกหุ้ม'},
  fillMaterial: {zh: '填充材料', en: 'Fill Material', vi: 'Vật liệu lấp đầy', th: 'วัสดุอุด'},
  finish: {zh: '表面处理', en: 'Finish', vi: 'Hoàn thiện', th: 'การเคลือบผิว'},
  foundationDepth: {zh: '基础深度', en: 'Foundation Depth', vi: 'Độ sâu móng', th: 'ความลึกฐานราก'},
  frontPanel: {zh: '前面板', en: 'Front Panel', vi: 'Tấm trước', th: 'แผงด้านหน้า'},
  galvanizing: {zh: '镀锌', en: 'Galvanizing', vi: 'Mạ kẽm', th: 'การชุบสังกะสี'},
  galvanizingMethod: {zh: '镀锌方式', en: 'Galvanizing Method', vi: 'Phương pháp mạ kẽm', th: 'วิธีการชุบสังกะสี'},
  geogridAperture: {zh: '土工格栅孔径', en: 'Geogrid Aperture', vi: 'Mắt lưới địa kỹ thuật', th: 'ขนาดช่องจีโอกริด'},
  geogridLayers: {zh: '土工格栅层数', en: 'Geogrid Layers', vi: 'Số lớp lưới địa', th: 'จำนวนชั้นจีโอกริด'},
  geogridStrength: {zh: '土工格栅强度', en: 'Geogrid Strength', vi: 'Độ bền lưới địa', th: 'ความแข็งแรงจีโอกริด'},
  geogridType: {zh: '土工格栅类型', en: 'Geogrid Type', vi: 'Loại lưới địa kỹ thuật', th: 'ประเภทจีโอกริด'},
  glassOption: {zh: '玻璃选项', en: 'Glass Option', vi: 'Tùy chọn kính', th: 'ตัวเลือกกระจก'},
  heightOptions: {zh: '高度选项', en: 'Height Options', vi: 'Tùy chọn chiều cao', th: 'ตัวเลือกความสูง'},
  innerGalvanizing: {zh: '内层镀锌', en: 'Inner Galvanizing', vi: 'Mạ kẽm bên trong', th: 'การชุบสังกะสีด้านใน'},
  innerSkin: {zh: '内层蒙皮', en: 'Inner Skin', vi: 'Lớp trong', th: 'ผิวด้านใน'},
  insertionLoss: {zh: '插入损耗', en: 'Insertion Loss', vi: 'Suy hao chèn', th: 'การสูญเสียการแทรก'},
  interlocking: {zh: '互锁', en: 'Interlocking', vi: 'Khóa liên động', th: 'การประสาน'},
  internalCells: {zh: '内部隔间', en: 'Internal Cells', vi: 'Ngăn trong', th: 'เซลล์ภายใน'},
  internalDiaphragms: {zh: '内部隔板', en: 'Internal Diaphragms', vi: 'Vách ngăn trong', th: 'แผ่นกั้นภายใน'},
  lacingWire: {zh: '扎丝', en: 'Lacing Wire', vi: 'Dây buộc', th: 'ลวดผูก'},
  lineWireCount: {zh: '经线数量', en: 'Line Wire Count', vi: 'Số dây dọc', th: 'จำนวนเส้นลวด'},
  lineWireDiameter: {zh: '经线直径', en: 'Line Wire Diameter', vi: 'Đường kính dây dọc', th: 'เส้นผ่านศูนย์กลางลวดแนวตั้ง'},
  mainWire: {zh: '主丝', en: 'Main Wire', vi: 'Dây chính', th: 'ลวดหลัก'},
  meshOpening: {zh: '网孔尺寸', en: 'Mesh Opening', vi: 'Kích thước mắt lưới', th: 'ขนาดช่องตาข่าย'},
  meshType: {zh: '网面类型', en: 'Mesh Type', vi: 'Loại lưới', th: 'ประเภทตาข่าย'},
  middleMeshOpening: {zh: '中层网孔', en: 'Middle Mesh Opening', vi: 'Mắt lưới giữa', th: 'ขนาดตาข่ายกลาง'},
  mountType: {zh: '安装类型', en: 'Mount Type', vi: 'Kiểu lắp', th: 'ประเภทการติดตั้ง'},
  netHeight: {zh: '网高', en: 'Net Height', vi: 'Chiều cao lưới', th: 'ความสูงตาข่าย'},
  netType: {zh: '网类型', en: 'Net Type', vi: 'Loại lưới', th: 'ประเภทตาข่าย'},
  nrc: {zh: '降噪系数', en: 'NRC', vi: 'Hệ số NRC', th: 'ค่า NRC'},
  openArea: {zh: '开孔率', en: 'Open Area', vi: 'Độ hở', th: 'พื้นที่เปิด'},
  outerSkin: {zh: '外层蒙皮', en: 'Outer Skin', vi: 'Lớp ngoài', th: 'ผิวด้านนอก'},
  panelLength: {zh: '屏体长度', en: 'Panel Length', vi: 'Chiều dài tấm', th: 'ความยาวแผง'},
  panelStrength: {zh: '面板强度', en: 'Panel Strength', vi: 'Độ bền tấm', th: 'ความแข็งแรงแผง'},
  panelThickness: {zh: '屏体厚度', en: 'Panel Thickness', vi: 'Độ dày tấm', th: 'ความหนาแผง'},
  plate: {zh: '板', en: 'Plate', vi: 'Tấm', th: 'แผ่น'},
  postSpacing: {zh: '立柱间距', en: 'Post Spacing', vi: 'Khoảng cách cột', th: 'ระยะห่างเสา'},
  postSystem: {zh: '立柱系统', en: 'Post System', vi: 'Hệ thống cột', th: 'ระบบเสา'},
  postType: {zh: '立柱类型', en: 'Post Type', vi: 'Loại cột', th: 'ประเภทเสา'},
  pvcCoating: {zh: 'PVC涂层', en: 'PVC Coating', vi: 'Lớp phủ PVC', th: 'การเคลือบ PVC'},
  pvcColors: {zh: 'PVC颜色', en: 'PVC Colors', vi: 'Màu PVC', th: 'สี PVC'},
  ringDiameter: {zh: '环径', en: 'Ring Diameter', vi: 'Đường kính vòng', th: 'เส้นผ่านศูนย์กลางแหวน'},
  ringWire: {zh: '环丝', en: 'Ring Wire', vi: 'Dây vòng', th: 'ลวดแหวน'},
  rollWidth: {zh: '卷宽', en: 'Roll Width', vi: 'Chiều rộng cuộn', th: 'ความกว้างม้วน'},
  selvageType: {zh: '锁边类型', en: 'Selvage Type', vi: 'Loại viền', th: 'ประเภทขอบผ้า'},
  selvageWire: {zh: '锁边丝', en: 'Selvage Wire', vi: 'Dây viền', th: 'ลวดขอบ'},
  serviceLife: {zh: '使用寿命', en: 'Service Life', vi: 'Tuổi thọ', th: 'อายุการใช้งาน'},
  singleWireBreakingLoad: {zh: '单丝断裂载荷', en: 'Single Wire Breaking Load', vi: 'Tải trọng đứt dây đơn', th: 'แรงแตกหักของลวดเดี่ยว'},
  stacking: {zh: '堆叠方式', en: 'Stacking', vi: 'Cách xếp chồng', th: 'การวางซ้อน'},
  stayWireDiameter: {zh: '拉线直径', en: 'Stay Wire Diameter', vi: 'Đường kính dây giằng', th: 'เส้นผ่านศูนย์กลางลวดค้ำ'},
  stc: {zh: '隔声等级', en: 'STC', vi: 'Cấp cách âm STC', th: 'ค่า STC'},
  steelPanel: {zh: '钢板面板', en: 'Steel Panel', vi: 'Tấm thép', th: 'แผงเหล็ก'},
  stoneFillSize: {zh: '填石粒径', en: 'Stone Fill Size', vi: 'Kích thước đá lấp', th: 'ขนาดหินถม'},
  systemType: {zh: '系统类型', en: 'System Type', vi: 'Loại hệ thống', th: 'ประเภทระบบ'},
  topDesign: {zh: '顶部设计', en: 'Top Design', vi: 'Thiết kế đỉnh', th: 'การออกแบบด้านบน'},
  topMeshOpening: {zh: '顶层网孔', en: 'Top Mesh Opening', vi: 'Mắt lưới trên', th: 'ขนาดตาข่ายด้านบน'},
  topRail: {zh: '顶部横梁', en: 'Top Rail', vi: 'Ray trên', th: 'รางด้านบน'},
  totalDiameter: {zh: '总直径', en: 'Total Diameter', vi: 'Tổng đường kính', th: 'เส้นผ่านศูนย์กลางรวม'},
  totalWeight: {zh: '总重', en: 'Total Weight', vi: 'Tổng trọng lượng', th: 'น้ำหนักรวม'},
  transparentPanel: {zh: '透明面板', en: 'Transparent Panel', vi: 'Tấm trong suốt', th: 'แผงโปร่งใส'},
  twistDirection: {zh: '扭转方向', en: 'Twist Direction', vi: 'Hướng xoắn', th: 'ทิศทางการบิด'},
  twistType: {zh: '扭转类型', en: 'Twist Type', vi: 'Kiểu xoắn', th: 'ประเภทการบิด'},
  unitWeight: {zh: '单位重量', en: 'Unit Weight', vi: 'Trọng lượng đơn vị', th: 'น้ำหนักต่อหน่วย'},
  vehicleImpactRating: {zh: '车辆撞击等级', en: 'Vehicle Impact Rating', vi: 'Xếp hạng va chạm xe', th: 'ระดับการชนของยานพาหนะ'},
  vibrationCycles: {zh: '振动循环', en: 'Vibration Cycles', vi: 'Chu kỳ rung', th: 'รอบการสั่นสะเทือน'},
  visualTransparency: {zh: '视觉通透率', en: 'Visual Transparency', vi: 'Độ trong suốt', th: 'ความโปร่งใส'},
  volume: {zh: '体积', en: 'Volume', vi: 'Thể tích', th: 'ปริมาตร'},
  wavePattern: {zh: '波形', en: 'Wave Pattern', vi: 'Kiểu sóng', th: 'รูปแบบคลื่น'},
  weldStrength: {zh: '焊接强度', en: 'Weld Strength', vi: 'Độ bền mối hàn', th: 'ความแข็งแรงรอยเชื่อม'},
  weldingMethod: {zh: '焊接方式', en: 'Welding Method', vi: 'Phương pháp hàn', th: 'วิธีการเชื่อม'},
  windRating: {zh: '抗风等级', en: 'Wind Rating', vi: 'Xếp hạng chịu gió', th: 'ระดับการต้านลม'},
  wireCoating: {zh: '丝材涂层', en: 'Wire Coating', vi: 'Lớp phủ dây', th: 'การเคลือบลวด'},
  wireTensileStrength: {zh: '丝材抗拉强度', en: 'Wire Tensile Strength', vi: 'Độ bền kéo của dây', th: 'แรงดึงของลวด'},
  zincCoating: {zh: '锌层重量', en: 'Zinc Coating', vi: 'Lớp mạ kẽm', th: 'การเคลือบสังกะสี'},
  // ── Chinese key aliases (direct mapping for zh-specs) ──
  '丝径': {zh: '丝径', en: 'Wire Diameter', vi: 'Đường kính dây', th: 'เส้นผ่านศูนย์กลางลวด'},
  '单丝断裂载荷': {zh: '单丝断裂载荷', en: 'Single Wire Breaking Load', vi: 'Tải trọng đứt dây đơn', th: 'แรงแตกหักของลวดเดี่ยว'},
  '基础深度': {zh: '基础深度', en: 'Foundation Depth', vi: 'Độ sâu móng', th: 'ความลึกฐานราก'},
  '抗拉强度': {zh: '抗拉强度', en: 'Tensile Strength', vi: 'Độ bền kéo', th: 'แรงดึง'},
  '材质': {zh: '材质', en: 'Material', vi: 'Vật liệu', th: 'วัสดุ'},
  '焊接方式': {zh: '焊接方式', en: 'Welding Method', vi: 'Phương pháp hàn', th: 'วิธีการเชื่อม'},
  '立柱系统': {zh: '立柱系统', en: 'Post System', vi: 'Hệ thống cột', th: 'ระบบเสา'},
  '网孔': {zh: '网孔', en: 'Mesh Aperture', vi: 'Mắt lưới', th: 'ขนาดตาข่าย'},
  '表面处理': {zh: '表面处理', en: 'Surface Treatment', vi: 'Xử lý bề mặt', th: 'การเคลือบผิว'},
  '视觉通透率': {zh: '视觉通透率', en: 'Visual Transparency', vi: 'Độ trong suốt', th: 'ความโปร่งใส'},
  '重量': {zh: '重量', en: 'Weight', vi: 'Trọng lượng', th: 'น้ำหนัก'},
  '锌层重量': {zh: '锌层重量', en: 'Zinc Coating', vi: 'Lớp mạ kẽm', th: 'การเคลือบสังกะสี'},
  '面板尺寸': {zh: '面板尺寸', en: 'Panel Size', vi: 'Kích thước tấm', th: 'ขนาดแผง'},
  '面板强度': {zh: '面板强度', en: 'Panel Strength', vi: 'Độ bền tấm', th: 'ความแข็งแรงแผง'},
};

// Normalize Chinese spec keys to English keys for label lookup
const zhKeyToEnKey: Record<string, string> = {
  '丝径': 'wireDiameter',
  '单丝断裂载荷': 'singleWireBreakingLoad',
  '基础深度': 'foundationDepth',
  '抗拉强度': 'tensileStrength',
  '材质': 'material',
  '焊接方式': 'weldingMethod',
  '立柱系统': 'postSystem',
  '网孔': 'meshAperture',
  '表面处理': 'surfaceTreatment',
  '视觉通透率': 'visualTransparency',
  '重量': 'weight',
  '锌层重量': 'zincCoating',
  '面板尺寸': 'panelSize',
  '面板强度': 'panelStrength',
};

interface ProductDetailPageProps {
  params: Promise<{locale: string; slug: string}>;
}

export async function generateStaticParams() {
  const catalog = await getCatalog();
  const slugs = catalog.products.map(p => p.slug);
  const params: {locale: string; slug: string}[] = [];
  const locales = routing.locales;
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({locale, slug});
    }
  }
  return params;
}

export async function generateMetadata({params}: ProductDetailPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = await getProduct(slug);
  if (!product) return {title: tLabel('产品未找到', 'Product Not Found', locale)};

  const name = product.names[locale] || product.names.en || '';
  // GEO: prefer seoTitle (question-style) for meta title
  const seoTitle = product.seoTitle?.[locale] || product.seoTitle?.en || '';
  const metaTitle = seoTitle || name;
  // GEO: prefer seoDescription (product-specific) over shortDescriptions
  const seoDesc = product.seoDescription?.[locale] || product.seoDescription?.en || '';
  const desc = seoDesc || product.shortDescriptions[locale] || product.shortDescriptions.en || '';
  const keywords = product.seoKeywords?.[locale] || product.seoKeywords?.en || '';

  return generatePageMeta('products', locale, `/${locale}/products/${slug}`, {
    title: `${metaTitle} | Angu Wire Mesh`,
    description: desc,
    ...(keywords ? { keywords } : {}),
    image: product.images?.[0],
  });
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const {locale, slug} = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const name = product.names[locale] || product.names.en || '';
  // GEO-friendly: use seoTitle as display title (question-style) if available
  const displayTitle = product.seoTitle?.[locale] || product.seoTitle?.en || name;
  const shortDesc = product.shortDescriptions[locale] || product.shortDescriptions.en || '';
  const fullDesc = product.fullDescriptions[locale] || product.fullDescriptions.en || '';
  // specs: pick the language-specific override if available, fallback en
  const specsLocale = locale === 'zh' ? 'specifications_zh' : locale === 'vi' ? 'specifications_vi' : locale === 'th' ? 'specifications_th' : 'specifications';
  const specs = (product[specsLocale] && Object.keys(product[specsLocale]).length > 0)
    ? product[specsLocale]
    : product.specifications;
  // applications: pick the language-specific override if available, fallback en
  const appsLocale = locale === 'zh' ? 'applications_zh' : locale === 'vi' ? 'applications_vi' : locale === 'th' ? 'applications_th' : 'applications';
  const applications = (product[appsLocale] && product[appsLocale].length > 0)
    ? product[appsLocale]
    : product.applications;

  // Fetch related products from same category
  const catalog = await getCatalog();
  const allProducts = catalog.products;
  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  // Find category name for breadcrumb
  const category = catalog.categories.find(c => c.slug === product.categorySlug);
  const categoryName = category?.names[locale] || category?.names.en || product.categorySlug;

  // Product-specific FAQs
  // GEO: Priority use API-provided FAQ (240 Q&A), fallback to local productFaqs.ts
const apiFaqs = product.faq?.[locale] || product.faq?.en || [];
const productFaqs = apiFaqs.length > 0 ? apiFaqs : getProductFaqs(product.slug, locale);

  const baseUrl = 'https://www.angumesh.com';

  // ── JSON-LD: Thing (B2B — no e-commerce pricing, not a merchant site) ──
  const productImages = (product.images || []).map(img => `${baseUrl}${img}`);

  // Extract material from specs for `material` field
  const material = product.specifications?.material || product.specifications_zh?.material || '';

  // B2B industrial goods: we do NOT use @type Product because price is not a
  // meaningful attribute here (inquiry-based sales). Product requires
  // offers/review/aggregateRating — omitting them triggers a Search Console
  // "severe issue". Use Thing instead with harmless descriptive fields.
  const productLD: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name,
    description: fullDesc.slice(0, 500) || shortDesc,
    url: `${baseUrl}/${locale}/products/${product.slug}`,
    brand: { '@type': 'Brand', name: 'Angu Wire Mesh' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Angu Wire Mesh',
      url: baseUrl,
    },
  };
  if (productImages.length > 0) {
    productLD.image = productImages;
  }
  if (material) {
    productLD.material = material;
  }

  // ── JSON-LD: BreadcrumbList (with product) ──
  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh' ? '首页' : locale === 'vi' ? 'Trang chủ' : locale === 'th' ? 'หน้าแรก' : 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'zh' ? '产品中心' : locale === 'vi' ? 'Sản phẩm' : locale === 'th' ? 'สินค้า' : 'Products', item: `${baseUrl}/${locale}/products` },
      { '@type': 'ListItem', position: 3, name: categoryName, item: `${baseUrl}/${locale}/products?category=${product.categorySlug}` },
      { '@type': 'ListItem', position: 4, name, item: `${baseUrl}/${locale}/products/${product.slug}` },
    ],
  };

  // ── JSON-LD: FAQPage (product-specific) ──
  const faqLD = productFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null;

  const detailJsonLd = [productLD, breadcrumbLD, ...(faqLD ? [faqLD] : [])];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detailJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-slate-500 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">{locale === 'zh' ? '首页' : locale === 'vi' ? 'Trang chủ' : locale === 'th' ? 'หน้าแรก' : 'Home'}</Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-blue-600 transition-colors">{locale === 'zh' ? '产品' : locale === 'vi' ? 'Sản phẩm' : locale === 'th' ? 'สินค้า' : 'Products'}</Link>
            <span>/</span>
            <Link href={`/${locale}/products?category=${product.categorySlug}`} className="hover:text-blue-600 transition-colors">{categoryName}</Link>
            <span>/</span>
            <span className="text-slate-900 truncate max-w-xs">{name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Product Title (H1) — uses question-style SEO title for GEO */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{displayTitle}</h1>
          {displayTitle !== name && (
            <p className="text-sm text-slate-400 mt-1">{name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Image + Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ProductGallery images={product.images} name={name} />

            {/* Short Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{locale === 'zh' ? '产品概述' : locale === 'vi' ? 'Tổng quan' : locale === 'th' ? 'ภาพรวม' : 'Overview'}</h2>
              <p className="text-slate-600 leading-relaxed">{shortDesc}</p>
            </div>

            {/* Full Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '产品描述' : locale === 'vi' ? 'Mô tả sản phẩm' : locale === 'th' ? 'คำอธิบายสินค้า' : 'Product Description'}</h2>
              <div className="text-slate-700 leading-relaxed max-w-none">
                {renderMarkdown(fullDesc)}
              </div>
            </div>

            {/* Applications */}
            {applications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '应用领域' : locale === 'vi' ? 'Ứng dụng' : locale === 'th' ? 'การประยุกต์ใช้' : 'Applications'}</h2>
                <div className="flex flex-wrap gap-2">
                  {applications.map((app, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Inquiry Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 space-y-6">
              {/* Title */}
              <div className="overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                    {locale === 'zh' ? '型号' : locale === 'vi' ? 'Mã SP' : locale === 'th' ? 'รหัสสินค้า' : 'SKU'}: {product.sku}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug" title={name}>{name}</h2>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed border-b pb-6">
                {shortDesc}
              </p>

              {/* Specs Table */}
              <div>
                <h2 className="text-base font-semibold text-slate-900 mb-3">{locale === 'zh' ? '技术规格' : locale === 'vi' ? 'Thông số kỹ thuật' : locale === 'th' ? 'ข้อมูลจำเพาะ' : 'Specifications'}</h2>
                <table className="w-full text-sm table-fixed">
                  <caption className="sr-only">{locale === 'zh' ? `${name} 技术规格参数表` : locale === 'vi' ? `${name} Bảng thông số kỹ thuật` : locale === 'th' ? `${name} ตารางข้อมูลจำเพาะทางเทคนิค` : `${name} Technical Specifications`}</caption>
                  <tbody>
                    {Object.entries(specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-slate-50 last:border-0">
                        <th scope="row" className="py-2.5 font-medium text-slate-500 whitespace-nowrap text-left">
                          {specLabels[key]?.[locale] || specLabels[key]?.en || specLabels[zhKeyToEnKey[key]]?.[locale] || specLabels[zhKeyToEnKey[key]]?.en || key.replace(/([A-Z])/g, ' $1').replace(/^./, (s: string) => s.toUpperCase()).trim()}
                        </th>
                        <td className="py-2.5 text-slate-900 text-end font-medium">{value}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-slate-50">
                      <th scope="row" className="py-2.5 font-medium text-slate-500 text-left">{locale === 'zh' ? '起订量' : locale === 'vi' ? 'SL đặt tối thiểu' : locale === 'th' ? 'จำนวนสั่งขั้นต่ำ' : 'MOQ'}</th>
                      <td className="py-2.5 text-slate-900 text-end font-medium">
                        {product.moq ? `${product.moq} ${locale === 'zh' ? '件' : locale === 'vi' ? 'chiếc' : locale === 'th' ? 'ชิ้น' : 'pieces'}` : (locale === 'zh' ? '可协商' : locale === 'vi' ? 'Có thể thương lượng' : locale === 'th' ? 'ตกลงได้' : 'Negotiable')}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {product.priceRemark && (
                  <p className="text-xs text-slate-400 mt-2">{product.priceRemark}</p>
                )}
              </div>

              {/* Price */}
              {product.priceUsd && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-sm text-blue-600 mb-1">{locale === 'zh' ? 'FOB价格' : locale === 'vi' ? 'Giá FOB' : locale === 'th' ? 'ราคา FOB' : 'FOB Price'}</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ${product.priceUsd}
                    <span className="text-base font-normal text-blue-500">/{locale === 'zh' ? '件' : locale === 'vi' ? 'đơn vị' : locale === 'th' ? 'หน่วย' : 'unit'}</span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <InquiryButtonLarge
                productName={name}
                productSlug={product.slug}
                categorySlug={product.categorySlug}
                locale={locale}
              />

              <a
                href="https://wa.me/8618803189797"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
              >
                <span aria-hidden="true">💬</span> {locale === 'zh' ? 'WhatsApp咨询' : locale === 'vi' ? 'Trò chuyện trên WhatsApp' : locale === 'th' ? 'แชทบน WhatsApp' : 'Chat on WhatsApp'}
              </a>

              {/* Trust Badges */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium"><span aria-hidden="true">✓</span> ISO 9001</span>
                  <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md font-medium"><span aria-hidden="true">✓</span> CE</span>
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"><span aria-hidden="true">🌍</span> {locale === 'zh' ? '出口30+国' : locale === 'vi' ? '30+ Quốc gia' : locale === 'th' ? '30+ ประเทศ' : '30+ Countries'}</span>
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"><span aria-hidden="true">🏭</span> {locale === 'zh' ? '工厂直供' : locale === 'vi' ? 'Trực tiếp nhà máy' : locale === 'th' ? 'โรงงานโดยตรง' : 'Factory Direct'}</span>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span aria-hidden="true">📞</span>
                  <a href="tel:+8618803189797" className="hover:text-blue-600 transition-colors">
                    +86 188 0318 9797
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span aria-hidden="true">✉️</span>
                  <a href="mailto:anguwiremesh@gmail.com" className="hover:text-blue-600 transition-colors">
                    anguwiremesh@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product FAQ */}
        {productFaqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{locale === 'zh' ? '常见问题' : locale === 'vi' ? 'Câu hỏi thường gặp' : locale === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-3">
              {productFaqs.map((item, idx) => (
                <details key={idx} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors list-none">
                    <span className="font-medium text-slate-800 pr-4 text-sm md:text-base">{item.q}</span>
                    <svg
                      className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">{locale === 'zh' ? '相关产品' : locale === 'vi' ? 'Sản phẩm liên quan' : locale === 'th' ? 'สินค้าที่เกี่ยวข้อง' : 'Related Products'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
