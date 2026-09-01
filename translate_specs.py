#!/usr/bin/env python3
"""Translate specifications_vi and specifications_th to pure Vietnamese/Thai."""

import sqlite3
import json
import re

DB = "backend/inquiries.db"

# ============================================================
# Translations: slug -> { 'vi': dict, 'th': dict }
# ============================================================

TRANSLATIONS = {

    # 1. active-slope-protection-net-dns50
    "active-slope-protection-net-dns50": {
        "vi": {
            "systemType": "Chủ động (Tecco)",
            "meshType": "Tecco G65/3 Sợi Thép Cường Độ Cao",
            "wireDiameter": "3.0mm",
            "meshOpening": "65mm x 65mm",
            "wireTensileStrength": ">=1770 MPa",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "energyCapacity": "50 kJ",
            "anchorType": "Đinh Đất / Neo Đá Ø25mm, 2-4m",
            "anchorSpacing": "2.0m x 2.0m",
            "plate": "Tấm Thép 200x200x8mm",
            "boundaryRope": "Dây Thép Mạ Kẽm 12mm",
            "standard": "GB/T 31444, ETAG 027"
        },
        "th": {
            "systemType": "แอคทีฟ (Tecco)",
            "meshType": "Tecco G65/3 ลวดเหล็กกำลังสูง",
            "wireDiameter": "3.0mm",
            "meshOpening": "65mm x 65mm",
            "wireTensileStrength": ">=1770 MPa",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "energyCapacity": "50 kJ",
            "anchorType": "ตะปูดิน / สลักหิน Ø25mm, 2-4m",
            "anchorSpacing": "2.0m x 2.0m",
            "plate": "แผ่นเหล็ก 200x200x8mm",
            "boundaryRope": "เชือกเหล็กชุบสังกะสี 12mm",
            "standard": "GB/T 31444, ETAG 027"
        }
    },

    # 2. anti-drone-wire-mesh-1-5mm
    "anti-drone-wire-mesh-1-5mm": {
        "vi": {
            "Wire Diameter": "1.5mm (SS304 / SS316)",
            "Mesh Aperture": "30mm × 30mm / 20mm × 20mm",
            "Panel Size": "2.0m × 2.5m (tối đa 3.0m × 6.0m)",
            "Material": "Thép Không Gỉ SS304 / SS316",
            "Weight": "2.8 kg/m² (Khẩu Độ 30mm)",
            "Breaking Load": "≥890 N mỗi sợi",
            "Panel Strength": "≥12 kN/m",
            "Visual Transparency": "≥85% (Khẩu Độ 30mm)",
            "Welding Method": "Hàn TIG Chính Xác"
        },
        "th": {
            "Wire Diameter": "1.5mm (SS304 / SS316)",
            "Mesh Aperture": "30mm × 30mm / 20mm × 20mm",
            "Panel Size": "2.0m × 2.5m (สูงสุด 3.0m × 6.0m)",
            "Material": "สเตนเลส SS304 / SS316",
            "Weight": "2.8 kg/m² (ขนาดช่อง 30mm)",
            "Breaking Load": "≥890 N ต่อเส้น",
            "Panel Strength": "≥12 kN/m",
            "Visual Transparency": "≥85% (ขนาดช่อง 30mm)",
            "Welding Method": "การเชื่อม TIG แม่นยำ"
        }
    },

    # 3. anti-tank-wire-mesh-4mm
    "anti-tank-wire-mesh-4mm": {
        "vi": {
            "Wire Diameter": "4.0mm (Tiêu Chuẩn), 5.0mm (Hạng Nặng)",
            "Mesh Aperture": "50mm × 50mm / 75mm × 75mm",
            "Panel Size": "2.0m × 3.0m (Có Thể Tùy Chỉnh)",
            "Material": "Thép Carbon Cao Q235/Q345",
            "Tensile Strength": "≥1770 MPa",
            "Zinc Coating": "≥120g/m² (Mạ Kẽm Nhúng Nóng)",
            "Post System": "Ống Thép Mạ Kẽm Nhúng Nóng Ø76mm × 3.5mm",
            "Foundation Depth": "≥600mm Bê Tông Cốt Thép",
            "Surface Treatment": "Mạ Kẽm Nhúng Nóng + Tùy Chọn Bọc Nhựa PVC"
        },
        "th": {
            "Wire Diameter": "4.0mm (มาตรฐาน), 5.0mm (งานหนัก)",
            "Mesh Aperture": "50mm × 50mm / 75mm × 75mm",
            "Panel Size": "2.0m × 3.0m (สั่งทำพิเศษได้)",
            "Material": "เหล็กคาร์บอนสูง Q235/Q345",
            "Tensile Strength": "≥1770 MPa",
            "Zinc Coating": "≥120g/m² (ชุบสังกะสีแบบจุ่มร้อน)",
            "Post System": "ท่อเหล็กชุบสังกะสีแบบจุ่มร้อน Ø76mm × 3.5mm",
            "Foundation Depth": "≥600mm คอนกรีตเสริมเหล็ก",
            "Surface Treatment": "ชุบสังกะสีแบบจุ่มร้อน + เคลือบ PVC (ตัวเลือก)"
        }
    },

    # 4. blast-wall-panel-2x1x1m
    "blast-wall-panel-2x1x1m": {
        "vi": {
            "dimensions": "2.0m x 1.0m x 1.0m (sau khi lấp đầy)",
            "wireDiameter": "5.0mm",
            "meshOpening": "75mm x 75mm",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "geotextile": "PP hai lớp, 350g/m2 mỗi lớp (tổng 700g/m2)",
            "internalCells": "3 ô mỗi tấm",
            "fillMaterial": "Cát, đất, sỏi, đá dăm",
            "color": "Màu Be Cát (Tiêu Chuẩn Quân Sự)",
            "edgeBinding": "Xoắn Ốc Dây Thép Đôi",
            "stacking": "Xếp Chồng Tối Đa 3 Lớp",
            "standard": "NATO STANAG 2280, UFGS 35 60 26"
        },
        "th": {
            "dimensions": "2.0m x 1.0m x 1.0m (หลังจากเติมแล้ว)",
            "wireDiameter": "5.0mm",
            "meshOpening": "75mm x 75mm",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "geotextile": "PP สองชั้น, 350g/m2 ต่อชั้น (รวม 700g/m2)",
            "internalCells": "3 ช่องต่อแผง",
            "fillMaterial": "ทราย, ดิน, กรวด, เศษหิน",
            "color": "สีเบจทราย (มาตรฐานทหาร)",
            "edgeBinding": "เกลียวลวดเหล็กคู่",
            "stacking": "ซ้อนสูงสุด 3 ชั้น",
            "standard": "NATO STANAG 2280, UFGS 35 60 26"
        }
    },

    # 5. bridge-noise-barrier
    "bridge-noise-barrier": {
        "vi": {
            "panelHeight": "2.0m, 2.5m, 3.0m",
            "steelPanel": "100mm, NRC 0.85, STC 32",
            "transparentPanel": "15mm PC, STC 30, 89% truyền sáng",
            "glassOption": "10+10mm kính dán, STC 33",
            "mountType": "Cách ly cao su, chống rung mỏi",
            "postType": "Thép Chữ H, Cấp Cầu",
            "windLoad": "1.5-2.0 kPa",
            "vibrationCycles": "2 triệu chu kỳ",
            "corrosionProtection": "Zn-5%Al >=150g/m2 + tùy chọn",
            "fireRating": "A1 (Thép) / B1 (PC)",
            "standard": "GB/T 19889, ISO 717, JTG/T D81"
        },
        "th": {
            "panelHeight": "2.0m, 2.5m, 3.0m",
            "steelPanel": "100mm, NRC 0.85, STC 32",
            "transparentPanel": "15mm PC, STC 30, ส่งผ่านแสง 89%",
            "glassOption": "10+10mm กระจกลามิเนต, STC 33",
            "mountType": "แยกการสั่นสะเทือนด้วยยาง, ทนความล้าจากการสั่น",
            "postType": "เหล็กรูปตัว H, ระดับสะพาน",
            "windLoad": "1.5-2.0 kPa",
            "vibrationCycles": "2 ล้านรอบ",
            "corrosionProtection": "Zn-5%Al >=150g/m2 + ตัวเลือก",
            "fireRating": "A1 (เหล็ก) / B1 (PC)",
            "standard": "GB/T 19889, ISO 717, JTG/T D81"
        }
    },

    # 6. equipment-noise-barrier-2.5m
    "equipment-noise-barrier-2.5m": {
        "vi": {
            "panelHeight": "2.5m",
            "panelWidth": "0.5m (Tiêu Chuẩn)",
            "panelThickness": "100mm",
            "outerSkin": "Thép Mạ Kẽm Đục Lỗ 0.8mm",
            "core": "Bông Khoáng 50mm, 80 kg/m3",
            "innerSkin": "Thép Mạ Kẽm Nguyên Khối 0.6mm",
            "frame": "Rãnh Viền Thép Mạ Kẽm 1.5mm",
            "nrc": "0.85",
            "stc": "32",
            "fireRating": "A1 (Không Cháy)",
            "postType": "Thép Chữ H 100x100x6x8",
            "postSpacing": "2.0m",
            "windLoad": "0.8 kPa",
            "standard": "GB/T 19889, ISO 717"
        },
        "th": {
            "panelHeight": "2.5m",
            "panelWidth": "0.5m (มาตรฐาน)",
            "panelThickness": "100mm",
            "outerSkin": "เหล็กชุบสังกะสีเจาะรู 0.8mm",
            "core": "ใยหิน 50mm, 80 kg/m3",
            "innerSkin": "เหล็กชุบสังกะสีแผ่นตัน 0.6mm",
            "frame": "ร่องขอบเหล็กชุบสังกะสี 1.5mm",
            "nrc": "0.85",
            "stc": "32",
            "fireRating": "A1 (ไม่ติดไฟ)",
            "postType": "เหล็กรูปตัว H 100x100x6x8",
            "postSpacing": "2.0m",
            "windLoad": "0.8 kPa",
            "standard": "GB/T 19889, ISO 717"
        }
    },

    # 7. factory-noise-barrier-4m
    "factory-noise-barrier-4m": {
        "vi": {
            "panelHeight": "4.0m",
            "panelWidth": "0.5m",
            "panelThickness": "120mm",
            "outerSkin": "Thép Mạ Kẽm Đục Lỗ 0.8mm",
            "core": "Bông Khoáng 80mm, 100 kg/m3",
            "innerSkin": "Thép Mạ Kẽm Nguyên Khối 0.6mm",
            "frame": "Rãnh Viền Thép Mạ Kẽm 2.0mm",
            "nrc": "0.85",
            "stc": "34",
            "insertionLoss": "12-18 dB(A)",
            "fireRating": "A1",
            "postType": "Thép Chữ H HEB 120",
            "postSpacing": "2.0m",
            "windLoad": "1.0 kPa",
            "standard": "GB/T 19889, ISO 717"
        },
        "th": {
            "panelHeight": "4.0m",
            "panelWidth": "0.5m",
            "panelThickness": "120mm",
            "outerSkin": "เหล็กชุบสังกะสีเจาะรู 0.8mm",
            "core": "ใยหิน 80mm, 100 kg/m3",
            "innerSkin": "เหล็กชุบสังกะสีแผ่นตัน 0.6mm",
            "frame": "ร่องขอบเหล็กชุบสังกะสี 2.0mm",
            "nrc": "0.85",
            "stc": "34",
            "insertionLoss": "12-18 dB(A)",
            "fireRating": "A1",
            "postType": "เหล็กรูปตัว H HEB 120",
            "postSpacing": "2.0m",
            "windLoad": "1.0 kPa",
            "standard": "GB/T 19889, ISO 717"
        }
    },

    # 8. galvanized-gabion-box-2x1x1m
    "galvanized-gabion-box-2x1x1m": {
        "vi": {
            "dimensions": "2.0m x 1.0m x 1.0m (DxRxC)",
            "meshType": "Dệt Lục Giác Xoắn Đôi",
            "meshAperture": "80mm x 100mm",
            "wireDiameter": "2.5mm (dây viền 3.0mm)",
            "material": "Dây Thép Carbon Thấp Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=250g/m2 (Mạ Kẽm Nhúng Nóng Hạng Nặng)",
            "internalDiaphragms": "1 (2 ô)",
            "selvageWire": "3.0mm",
            "lacingWire": "2.2mm",
            "connection": "Buộc Xoắn Ốc hoặc Vòng Chữ C",
            "volume": "2.0 m3",
            "standard": "EN 10223-3, ASTM A974, YB/T 4193",
            "certifications": "ISO 9001, CE",
            "serviceLife": "20-30 Năm"
        },
        "th": {
            "dimensions": "2.0m x 1.0m x 1.0m (ย.xก.xส)",
            "meshType": "ทอหกเหลี่ยมเกลียวคู่",
            "meshAperture": "80mm x 100mm",
            "wireDiameter": "2.5mm (ลวดริม 3.0mm)",
            "material": "ลวดเหล็กคาร์บอนต่ำ Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=250g/m2 (ชุบสังกะสีแบบจุ่มร้อนงานหนัก)",
            "internalDiaphragms": "1 (2 ช่อง)",
            "selvageWire": "3.0mm",
            "lacingWire": "2.2mm",
            "connection": "มัดเกลียวหรือแหวนตัว C",
            "volume": "2.0 m3",
            "standard": "EN 10223-3, ASTM A974, YB/T 4193",
            "certifications": "ISO 9001, CE",
            "serviceLife": "20-30 ปี"
        }
    },

    # 9. heavy-duty-blast-barrier-2.5m
    "heavy-duty-blast-barrier-2.5m": {
        "vi": {
            "panelHeight": "2.5m",
            "panelWidth": "2.5m",
            "meshType": "358 Chống Trèo Hàn",
            "meshOpening": "76.2mm x 12.7mm",
            "wireDiameter": "5.0mm",
            "frame": "Ống Thép Chữ Nhật 80x60x3.0mm",
            "post": "Thép 100x80x4.0mm, Chôn 800mm",
            "postSpacing": "2.5m",
            "finish": "Mạ Kẽm (>=300g/m2) + Sơn Tĩnh Điện",
            "barbedWire": "3 Sợi Trên Giá Đỡ Ngoài (Tiêu Chuẩn)",
            "vehicleImpactRating": "1500kg @ 30 km/h",
            "blastRating": "20 psi (138 kPa)",
            "standard": "ASTM F2781, DOS SD-STD-02"
        },
        "th": {
            "panelHeight": "2.5m",
            "panelWidth": "2.5m",
            "meshType": "358 ป้องกันการปีนแบบเชื่อม",
            "meshOpening": "76.2mm x 12.7mm",
            "wireDiameter": "5.0mm",
            "frame": "ท่อเหล็กสี่เหลี่ยม 80x60x3.0mm",
            "post": "เหล็ก 100x80x4.0mm, ฝัง 800mm",
            "postSpacing": "2.5m",
            "finish": "ชุบสังกะสี (>=300g/m2) + พ่นสีฝุ่น",
            "barbedWire": "3 เส้นบนแขนยื่นด้านนอก (มาตรฐาน)",
            "vehicleImpactRating": "1500kg @ 30 km/h",
            "blastRating": "20 psi (138 kPa)",
            "standard": "ASTM F2781, DOS SD-STD-02"
        }
    },

    # 10. hesco-bastion-blast-wall-1x1x1m
    "hesco-bastion-blast-wall-1x1x1m": {
        "vi": {
            "dimensions": "1.0m x 1.0m x 1.0m (sau khi lấp đầy)",
            "wireDiameter": "4.0mm",
            "meshOpening": "75mm x 75mm",
            "wireCoating": "Zn-5%Al (Galfan) >=120g/m2",
            "geotextile": "PP Không Dệt, 200g/m2, Ổn Định UV",
            "configuration": "Đơn Vị Đơn hoặc Kết Nối Nhiều Đơn Vị",
            "fillMaterial": "Cát, đất, sỏi, đá dăm",
            "color": "Màu Be (Tiêu Chuẩn), Xanh Lá, Màu Cát",
            "collapsedSize": "~0.05m3 mỗi đơn vị",
            "standard": "NATO STANAG 2280, MIL-STD-810"
        },
        "th": {
            "dimensions": "1.0m x 1.0m x 1.0m (หลังจากเติมแล้ว)",
            "wireDiameter": "4.0mm",
            "meshOpening": "75mm x 75mm",
            "wireCoating": "Zn-5%Al (Galfan) >=120g/m2",
            "geotextile": "PP ไม่ทอ, 200g/m2, เสถียรต่อ UV",
            "configuration": "หน่วยเดี่ยวหรือเชื่อมต่อหลายหน่วย",
            "fillMaterial": "ทราย, ดิน, กรวด, เศษหิน",
            "color": "สีเบจ (มาตรฐาน), สีเขียว, สีทราย",
            "collapsedSize": "~0.05m3 ต่อหน่วย",
            "standard": "NATO STANAG 2280, MIL-STD-810"
        }
    },

    # 11. highway-noise-barrier-3m
    "highway-noise-barrier-3m": {
        "vi": {
            "panelHeight": "3.0m",
            "panelWidth": "0.5m",
            "panelThickness": "100mm",
            "outerSkin": "Thép Mạ Kẽm Đục Lỗ 0.8mm",
            "core": "Bông Khoáng 50mm, 80 kg/m3",
            "innerSkin": "Thép Mạ Kẽm Nguyên Khối 0.6mm",
            "nrc": "0.85",
            "stc": "32",
            "insertionLoss": "10-15 dB(A)",
            "fireRating": "A1 (Không Cháy)",
            "postType": "Thép Chữ H 100x100x6x8",
            "postSpacing": "2.0m",
            "windLoad": "0.8 kPa",
            "standard": "GB/T 19889, ISO 717"
        },
        "th": {
            "panelHeight": "3.0m",
            "panelWidth": "0.5m",
            "panelThickness": "100mm",
            "outerSkin": "เหล็กชุบสังกะสีเจาะรู 0.8mm",
            "core": "ใยหิน 50mm, 80 kg/m3",
            "innerSkin": "เหล็กชุบสังกะสีแผ่นตัน 0.6mm",
            "nrc": "0.85",
            "stc": "32",
            "insertionLoss": "10-15 dB(A)",
            "fireRating": "A1 (ไม่ติดไฟ)",
            "postType": "เหล็กรูปตัว H 100x100x6x8",
            "postSpacing": "2.0m",
            "windLoad": "0.8 kPa",
            "standard": "GB/T 19889, ISO 717"
        }
    },

    # 12. passive-slope-protection-barrier-gl100
    "passive-slope-protection-barrier-gl100": {
        "vi": {
            "systemType": "Bị Động (Lưới Chắn Đá Rơi)",
            "energyCapacity": "100 kJ",
            "netType": "Lưới Vòng (ROCCO R7/3/300)",
            "ringDiameter": "300mm",
            "ringWire": "3.0mm x 7 Vòng",
            "netHeight": "3.0m, 4.0m, 5.0m",
            "postSpacing": "10m",
            "postType": "Thép HEA 140/160",
            "brakeElement": "Ống Nén",
            "anchorCable": "Dây Thép 16mm, Độ Sâu 5-8m",
            "foundation": "Bê Tông 600x600x600mm",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "standard": "ETAG 027, GB/T 31444"
        },
        "th": {
            "systemType": "พาสซีฟ (รั้วดักหินหล่น)",
            "energyCapacity": "100 kJ",
            "netType": "ตาข่ายแบบห่วง (ROCCO R7/3/300)",
            "ringDiameter": "300mm",
            "ringWire": "3.0mm x 7 ห่วง",
            "netHeight": "3.0m, 4.0m, 5.0m",
            "postSpacing": "10m",
            "postType": "เหล็ก HEA 140/160",
            "brakeElement": "ท่ออัด",
            "anchorCable": "เชือกเหล็ก 16mm, ลึก 5-8m",
            "foundation": "คอนกรีต 600x600x600mm",
            "wireCoating": "Zn-5%Al >=150g/m2",
            "standard": "ETAG 027, GB/T 31444"
        }
    },

    # 13. pvc-coated-gabion-box-2x1x1m
    "pvc-coated-gabion-box-2x1x1m": {
        "vi": {
            "dimensions": "2.0m x 1.0m x 1.0m (DxRxC)",
            "meshType": "Dệt Lục Giác Xoắn Đôi",
            "meshAperture": "60mm x 80mm / 80mm x 100mm",
            "coreWireDiameter": "2.5mm",
            "totalDiameter": "3.0mm (2.5mm + 0.5mm PVC)",
            "innerGalvanizing": ">=200g/m2 Mạ Kẽm Nhúng Nóng",
            "pvcCoating": "PVC Ổn Định UV 0.5mm",
            "pvcColors": "Xanh Lá (RAL 6005), Xám (RAL 7030)",
            "material": "Dây Thép Carbon Thấp Q195 + PVC",
            "tensileStrength": "370-540 N/mm2",
            "internalDiaphragms": "1 (2 ô)",
            "selvageWire": "Lõi 3.0mm + PVC",
            "lacingWire": "Lõi 2.2mm + PVC",
            "standard": "EN 10223-3, ASTM A975",
            "certifications": "ISO 9001, CE",
            "serviceLife": "Trên 30 Năm (Môi Trường Biển)"
        },
        "th": {
            "dimensions": "2.0m x 1.0m x 1.0m (ย.xก.xส)",
            "meshType": "ทอหกเหลี่ยมเกลียวคู่",
            "meshAperture": "60mm x 80mm / 80mm x 100mm",
            "coreWireDiameter": "2.5mm",
            "totalDiameter": "3.0mm (2.5mm + 0.5mm PVC)",
            "innerGalvanizing": ">=200g/m2 ชุบสังกะสีแบบจุ่มร้อน",
            "pvcCoating": "PVC เสถียรต่อ UV 0.5mm",
            "pvcColors": "สีเขียว (RAL 6005), สีเทา (RAL 7030)",
            "material": "ลวดเหล็กคาร์บอนต่ำ Q195 + PVC",
            "tensileStrength": "370-540 N/mm2",
            "internalDiaphragms": "1 (2 ช่อง)",
            "selvageWire": "แกนลวด 3.0mm + PVC",
            "lacingWire": "แกนลวด 2.2mm + PVC",
            "standard": "EN 10223-3, ASTM A975",
            "certifications": "ISO 9001, CE",
            "serviceLife": "30 ปีขึ้นไป (สภาพแวดล้อมทางทะเล)"
        }
    },

    # 14. rail-transit-noise-barrier
    "rail-transit-noise-barrier": {
        "vi": {
            "panelHeight": "2.5m, 3.0m, 4.0m",
            "panelWidth": "0.5m",
            "panelThickness": "100mm",
            "outerSkin": "Thép Mạ Kẽm Đục Lỗ 0.8mm",
            "core": "Bông Khoáng 50mm, 100 kg/m3",
            "innerSkin": "Thép Mạ Kẽm Nguyên Khối 0.6mm",
            "nrc": "0.90 (Cấp Đường Sắt)",
            "stc": "33",
            "insertionLoss": "12-16 dB(A)",
            "mountType": "Cách Ly Rung Cao Su",
            "postType": "Thép Chữ H HEB 100",
            "windLoad": "1.2 kPa",
            "transparentOption": "15mm PC, STC 30",
            "topDesign": "Thẳng hoặc Cong (J/Y)",
            "standard": "GB/T 19889, EN 16272"
        },
        "th": {
            "panelHeight": "2.5m, 3.0m, 4.0m",
            "panelWidth": "0.5m",
            "panelThickness": "100mm",
            "outerSkin": "เหล็กชุบสังกะสีเจาะรู 0.8mm",
            "core": "ใยหิน 50mm, 100 kg/m3",
            "innerSkin": "เหล็กชุบสังกะสีแผ่นตัน 0.6mm",
            "nrc": "0.90 (ระดับทางรถไฟ)",
            "stc": "33",
            "insertionLoss": "12-16 dB(A)",
            "mountType": "แยกการสั่นสะเทือนด้วยยาง",
            "postType": "เหล็กรูปตัว H HEB 100",
            "windLoad": "1.2 kPa",
            "transparentOption": "15mm PC, STC 30",
            "topDesign": "ตรงหรือโค้ง (J/Y)",
            "standard": "GB/T 19889, EN 16272"
        }
    },

    # 15. reinforced-gabion-box-2x1x1m
    "reinforced-gabion-box-2x1x1m": {
        "vi": {
            "dimensions": "2.0m x 1.0m x 1.0m (DxRxC)",
            "meshType": "Dệt Lục Giác Xoắn Đôi",
            "meshAperture": "80mm x 100mm",
            "wireDiameter": "2.7mm (dây viền 3.4mm)",
            "material": "Dây Thép Carbon Thấp Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=260g/m2 (Mạ Kẽm Nhúng Nóng Hạng Nặng)",
            "geogridType": "Lưới Địa Kỹ Thuật PP Hai Chiều",
            "geogridStrength": "30 kN/m (Dọc/Ngang)",
            "geogridAperture": "40mm x 40mm",
            "geogridLayers": "2 Lớp Mỗi Thùng (Mỗi 0.5m)",
            "internalDiaphragms": "1 (2 ô)",
            "connection": "Dây Buộc + Neo Lưới Địa Kỹ Thuật",
            "standard": "EN 10223-3, ISO 10319, ASTM A974",
            "certifications": "ISO 9001, CE"
        },
        "th": {
            "dimensions": "2.0m x 1.0m x 1.0m (ย.xก.xส)",
            "meshType": "ทอหกเหลี่ยมเกลียวคู่",
            "meshAperture": "80mm x 100mm",
            "wireDiameter": "2.7mm (ลวดริม 3.4mm)",
            "material": "ลวดเหล็กคาร์บอนต่ำ Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=260g/m2 (ชุบสังกะสีแบบจุ่มร้อนงานหนัก)",
            "geogridType": "ตะแกรงธรณีเทคนิค PP สองทิศทาง",
            "geogridStrength": "30 kN/m (ตามยาว/ตามขวาง)",
            "geogridAperture": "40mm x 40mm",
            "geogridLayers": "2 ชั้นต่อกล่อง (ทุก 0.5m)",
            "internalDiaphragms": "1 (2 ช่อง)",
            "connection": "ลวดมัด + ยึดตะแกรงธรณีเทคนิค",
            "standard": "EN 10223-3, ISO 10319, ASTM A974",
            "certifications": "ISO 9001, CE"
        }
    },

    # 16. reno-mattress-6x2x0.3m
    "reno-mattress-6x2x0.3m": {
        "vi": {
            "dimensions": "6.0m x 2.0m x 0.3m (DxRxC)",
            "meshType": "Dệt Lục Giác Xoắn Đôi",
            "meshAperture": "60mm x 80mm",
            "wireDiameter": "2.0mm (mặt lưới) / 2.4mm (dây viền)",
            "material": "Dây Thép Carbon Thấp Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=220g/m2 (Mạ Kẽm Nhúng Nóng)",
            "internalDiaphragms": "5 (6 ô)",
            "selvageWire": "2.4mm",
            "lacingWire": "2.2mm",
            "coverageArea": "12 m2 mỗi tấm",
            "stoneFillSize": "70-150mm",
            "standard": "EN 10223-3, ASTM A975",
            "certifications": "ISO 9001, CE",
            "serviceLife": "15-25 Năm (Môi Trường Nước Ngọt)"
        },
        "th": {
            "dimensions": "6.0m x 2.0m x 0.3m (ย.xก.xส)",
            "meshType": "ทอหกเหลี่ยมเกลียวคู่",
            "meshAperture": "60mm x 80mm",
            "wireDiameter": "2.0mm (ผิวตาข่าย) / 2.4mm (ลวดริม)",
            "material": "ลวดเหล็กคาร์บอนต่ำ Q195",
            "tensileStrength": "370-540 N/mm2",
            "zincCoating": ">=220g/m2 (ชุบสังกะสีแบบจุ่มร้อน)",
            "internalDiaphragms": "5 (6 ช่อง)",
            "selvageWire": "2.4mm",
            "lacingWire": "2.2mm",
            "coverageArea": "12 m2 ต่อแผ่น",
            "stoneFillSize": "70-150mm",
            "standard": "EN 10223-3, ASTM A975",
            "certifications": "ISO 9001, CE",
            "serviceLife": "15-25 ปี (สภาพแวดล้อมน้ำจืด)"
        }
    },
}

def has_chinese(text):
    """Check if text contains Chinese characters."""
    if not text:
        return False
    return bool(re.search(r'[\u4e00-\u9fff\u3400-\u4dbf]', text))

def update_db():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    
    updated = 0
    
    for slug, trans in TRANSLATIONS.items():
        # Update VI
        if 'vi' in trans:
            vi_json = json.dumps(trans['vi'], ensure_ascii=False)
            vi_str = json.dumps(vi_json, ensure_ascii=False)  # double-encode for sqlite
            
            # Verify no Chinese
            if has_chinese(vi_json):
                for k, v in trans['vi'].items():
                    if has_chinese(v):
                        print(f"  WARNING: Chinese in VI/{slug} key={k}: {v}")
            
            cur.execute("UPDATE products SET specifications_vi=? WHERE slug=?", (vi_json, slug))
            print(f"[OK] {slug} - specifications_vi updated")
            updated += 1
        
        # Update TH
        if 'th' in trans:
            th_json = json.dumps(trans['th'], ensure_ascii=False)
            
            if has_chinese(th_json):
                for k, v in trans['th'].items():
                    if has_chinese(v):
                        print(f"  WARNING: Chinese in TH/{slug} key={k}: {v}")
            
            cur.execute("UPDATE products SET specifications_th=? WHERE slug=?", (th_json, slug))
            print(f"[OK] {slug} - specifications_th updated")
            updated += 1
    
    conn.commit()
    conn.close()
    print(f"\nTotal updates: {updated}")
    return updated

def verify():
    """Verify no Chinese characters remain in vi/th columns."""
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute("SELECT slug, specifications_vi, specifications_th FROM products WHERE status='published'")
    rows = cur.fetchall()
    conn.close()
    
    issues = []
    for slug, vi, th in rows:
        if has_chinese(vi or ''):
            issues.append(f"  VI/{slug}: has Chinese!")
            # Find specific Chinese content
            cn = re.findall(r'[\u4e00-\u9fff\u3400-\u4dbf]+', vi or '')
            if cn:
                issues.append(f"    -> {cn[:5]}")
        
        if has_chinese(th or ''):
            issues.append(f"  TH/{slug}: has Chinese!")
            cn = re.findall(r'[\u4e00-\u9fff\u3400-\u4dbf]+', th or '')
            if cn:
                issues.append(f"    -> {cn[:5]}")
    
    if issues:
        print("\n!!! VERIFICATION FAILED - Chinese characters found:")
        for i in issues:
            print(i)
        return False
    else:
        print("\n✓ VERIFICATION PASSED - No Chinese characters found in any vi/th field")
        return True

if __name__ == '__main__':
    print("=== Translating specifications_vi and specifications_th ===")
    update_db()
    print("\n=== Verifying results ===")
    verify()
