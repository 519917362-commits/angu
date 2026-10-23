import sqlite3, json

translations = {
    # 工业/安防
    "Factory perimeters": "工厂周界",
    "Industrial facilities": "工业设施",
    "Industrial security": "工业安防",
    "Industrial sites": "工业场地",
    "Industrial noise": "工业噪声治理",
    "Perimeter security": "周界安防",
    "Security": "安全防护",
    "Construction sites": "建筑工地",
    "Construction reinforcement": "建筑加固",
    "Power plants": "发电厂",
    "Mining screening": "矿山筛分",
    "Mining & chemical plants": "矿山化工",
    "Steel mills": "钢铁厂",
    "Cement plants": "水泥厂",
    "Oil/gas facilities": "石油/天然气设施",
    "Open-pit mines": "露天矿场",
    "Chemical environments": "化工环境",
    "Chemical sieving": "化工筛分",
    "Machine guards": "机械防护",
    "Explosive storage": "爆炸物仓库",
    
    # 政府/军事
    "Military": "军事设施",
    "Military bases": "军事基地",
    "Military checkpoints": "军事检查站",
    "Government buildings": "政府大楼",
    "Government zones": "政府区域",
    "Embassies": "大使馆",
    "Embassy protection": "使馆安防",
    "Prisons": "监狱",
    "Ammunition depots": "弹药库",
    
    # 交通
    "Airports": "机场",
    "Highways": "高速公路",
    "Highway bridges": "公路桥梁",
    "Highway green belts": "公路绿化带",
    "Railways": "铁路",
    "Railway cuttings": "铁路路堑",
    "Urban roads": "城市道路",
    "Urban light rail": "城市轻轨",
    "Urban viaducts": "城市高架",
    "Intercity railway": "城际铁路",
    "Metro residential sections": "地铁居民区段",
    "Mountain roads": "山区公路",
    "Mountain highways": "山区高速公路",
    "Elevated expressways": "高架快速路",
    "Elevated viaduct transit": "高架桥交通",
    "High-speed railway sensitive areas": "高铁敏感区",
    "Interchange ramps": "立交匝道",
    "Road maintenance": "道路养护",
    "Roadside protection": "路边防护",
    "Infrastructure": "基础设施",
    "Bridge abutments": "桥台",
    "Bridge approaches": "引桥",
    "River-crossing bridges": "跨河桥梁",
    
    # 水利/环境
    "Erosion control": "水土保持",
    "Flood control": "防洪工程",
    "Riverbank protection": "河岸防护",
    "Riverbed lining": "河床衬砌",
    "Channel protection": "渠道防护",
    "Scour protection": "防冲刷",
    "Drainage": "排水",
    "Coastal engineering": "海岸工程",
    "Marine protection": "海洋防护",
    "Landscaping": "景观园林",
    "Green walls": "绿植墙",
    "Tree guards": "树木防护",
    
    # 边坡/岩土
    "Slope stabilization": "边坡加固",
    "Steep slopes": "陡坡治理",
    "Steep terrain": "陡峭地形",
    "High retaining walls": "高挡土墙",
    "Retaining walls": "挡土墙",
    "Heavy loads": "重载荷",
    
    # 农业/畜牧
    "Agricultural fencing": "农业围栏",
    "Farm boundaries": "农场边界",
    "Cattle pastures": "牧场",
    "Horse enclosures": "马场围栏",
    "Pastures": "牧场",
    "Poultry enclosures": "家禽围栏",
    "Animal cages": "动物笼舍",
    "Wildlife reserves": "野生动物保护区",
    "Large mammals": "大型哺乳动物围栏",
    "Primates": "灵长类动物围栏",
    "Zoo enclosures": "动物园围栏",
    "Aviaries": "鸟舍",
    "Aquariums": "水族馆",
    
    # 体育/活动
    "Sports fields": "运动场地",
    "Sports events": "体育赛事",
    "Football fields": "足球场",
    "Basketball courts": "篮球场",
    "Tennis courts": "网球场",
    "Baseball fields": "棒球场",
    "Concerts": "音乐会",
    "Festivals": "节庆活动",
    "Events": "活动安保",
    "Exhibitions": "展览会",
    "Public gatherings": "公共集会",
    "Queue management": "排队管理",
    "VIP areas": "VIP区域",
    "Emergency areas": "应急区域",
    
    # 安全防护
    "Architectural safety": "建筑安全",
    "Architecture": "建筑装饰",
    "Staircase protection": "楼梯防护",
    "Residential areas": "居民区",
    "Residential": "住宅区",
    "Residential gardens": "住宅花园",
    "Property boundaries": "地产边界",
    "Parks": "公园",
    "Garden fencing": "花园围栏",
    
    # 噪音治理
    "Compressor station noise control": "压缩机站噪声控制",
    "Factory production machinery noise isolation": "工厂生产机械噪声隔离",
    "Generator sets and power equipment enclosures": "发电机组及电力设备隔声罩",
    "HVAC cooling tower & fan sound attenuation": "暖通冷却塔及风机消声",
    
    # 石笼
    "Gabion baskets": "石笼网箱",
    
    # 防爆
    "Blast mitigation": "防爆减灾",
    
    # 食品
    "Food filters": "食品过滤",
}

db = sqlite3.connect('backend/inquiries.db')

# Update all products
rows = db.execute("SELECT slug, applications_en FROM products").fetchall()
count = 0
unmapped = set()
for slug, en_json in rows:
    try:
        apps_en = json.loads(en_json) if en_json else []
        apps_zh = []
        for a in apps_en:
            if a in translations:
                apps_zh.append(translations[a])
            else:
                apps_zh.append(a)
                unmapped.add(a)
        db.execute("UPDATE products SET applications_zh = ? WHERE slug = ?", (json.dumps(apps_zh, ensure_ascii=False), slug))
        count += 1
    except Exception as e:
        print(f"Error {slug}: {e}")

db.commit()
print(f"Updated {count} products")
if unmapped:
    print(f"\nUnmapped ({len(unmapped)}):")
    for a in sorted(unmapped):
        print(f"  {a}")

# Verify random 3
print("\n--- Verification ---")
for slug, en_json, zh_json in db.execute("SELECT slug, applications_en, applications_zh FROM products WHERE json_array_length(applications_en) > 0 LIMIT 3").fetchall():
    apps_en = json.loads(en_json)
    apps_zh = json.loads(zh_json)
    print(f"\n{slug}:")
    for e, z in zip(apps_en, apps_zh):
        print(f"  {e} -> {z}")
