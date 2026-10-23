# -*- coding: utf-8 -*-
"""编辑已有 5 个声屏障产品的 vi/th 名称，清理中英混杂残留。"""
import sqlite3

db = sqlite3.connect('backend/inquiries.db')
cur = db.cursor()

fixes = {
    52: {  # highway
        'name_vi': 'Tấm Chắn Ồn Đường Cao Tốc 3.0m Tấm Thép Hấp Thụ Âm',
        'name_th': 'แผงกั้นเสียงทางหลวง 3.0 ม. แผ่นเหล็กดูดซับเสียง',
    },
    53: {  # equipment
        'name_vi': 'Tấm Chắn Ồn Thiết Bị 2.5m Tấm Thép Tiêu Âm',
        'name_th': 'แผงกั้นเสียงเครื่องจักร 2.5 ม. แผ่นเหล็กดูดซับเสียง',
    },
    54: {  # factory
        'name_vi': 'Tấm Chắn Ồn Nhà Máy 4.0m Tấm Tiêu Âm',
        'name_th': 'แผงกั้นเสียงโรงงาน 4.0 ม. แผงดูดซับเสียง',
    },
    58: {  # rail
        'name_vi': 'Tấm Chắn Ồn Đường Sắt & Metro Tấm Tiêu Âm',
        'name_th': 'แผงกั้นเสียงระบบราง รถไฟใต้ดิน & รถไฟฟ้า แผงดูดซับเสียง',
    },
    59: {  # bridge
        'name_vi': 'Tấm Chắn Ồn Cầu & Cầu Cạn Tấm Trong Suốt Tiêu Âm',
        'name_th': 'แผงกั้นเสียงสะพาน & ทางยกระดับ แผงโปร่งใสดูดซับเสียง',
    },
}

for pid, fields in fixes.items():
    for col, val in fields.items():
        cur.execute(f'UPDATE products SET {col}=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', (val, pid))
        print(f'fixed id={pid} {col}')

db.commit()
db.close()
print('done')
