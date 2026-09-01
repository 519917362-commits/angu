# Translation Task: specifications_vi / specifications_th 中文字符净化

## Objective
将 Angu 项目数据库中所有 32 个已发布产品的 `specifications_vi` 和 `specifications_th` 列中的中文字符替换为纯越南语/泰语翻译。

## Method
- 使用 Python 脚本 `translate_specs.py` 批量执行 UPDATE
- 共处理 16 个含混合中文字符的产品（另外 16 个已经是纯翻译）
- 每个值手动翻译为纯越南语/泰语，保留数字、单位、符号、型号名称、标准编号和化学式

## Products Translated (16 个)
1. `active-slope-protection-net-dns50` - 主动防护网
2. `anti-drone-wire-mesh-1-5mm` - 反无人机网 (键名也改成英文匹配 en 列)
3. `anti-tank-wire-mesh-4mm` - 反坦克网 (键名也改成英文匹配 en 列)
4. `blast-wall-panel-2x1x1m` - 防爆墙面板
5. `bridge-noise-barrier` - 桥梁声屏障
6. `equipment-noise-barrier-2.5m` - 设备声屏障
7. `factory-noise-barrier-4m` - 工厂声屏障
8. `galvanized-gabion-box-2x1x1m` - 镀锌格宾箱
9. `heavy-duty-blast-barrier-2.5m` - 重型防爆护栏
10. `hesco-bastion-blast-wall-1x1x1m` - HESCO 防爆墙
11. `highway-noise-barrier-3m` - 公路声屏障
12. `passive-slope-protection-barrier-gl100` - 被动防护网
13. `pvc-coated-gabion-box-2x1x1m` - PVC涂层格宾箱
14. `rail-transit-noise-barrier` - 轨道交通声屏障
15. `reinforced-gabion-box-2x1x1m` - 加筋格宾箱
16. `reno-mattress-6x2x0.3m` - RENO护垫

## Verification
- `python3` 脚本扫描所有 32 个产品的 vi/th 字段
- 结果: ✓ ALL CLEAN - 零中文字符残留
- 也已通过 sqlite3 直接查询验证
