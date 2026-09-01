#!/usr/bin/env python3
"""
Bold key data points in product descriptions (EN+ZH) for AI crawler extraction.
Wraps: tensile strength, zinc coating, service life, load ratings, dimensions, standards, certifications.
"""
import sqlite3, re, json

DB = "backend/inquiries.db"

# ── Bold patterns: (regex, replacement template) ──
# Applied in order — more specific patterns first to avoid conflicts
PATTERNS_EN = [
    # Tensile strength
    (r'(≥?\s*\d{3,4}[\s-]*\d{0,4})\s*(MPa)(?![^<]*>)', r'<strong>\1 \2</strong>'),
    # kN load ratings
    (r'(≥?\s*\d+[\s-]*\d{0,4})\s*(kN)(?![^<]*>)', r'<strong>\1 \2</strong>'),
    (r'(≥?\s*\d+[\s-]*\d{0,4})\s*(kJ)(?![^<]*>)', r'<strong>\1 \2</strong>'),
    # Service life (15-25 years, 50+ years, etc.)
    (r'(\d{1,3}[-+]\s*\d{0,3}\+?\s*(?:year|yr)s?)(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(≥?\s*\d{1,2}\+?\s*(?:year|yr)s?\s*(?:service\s*)?life)(?![^<]*>)', r'<strong>\1</strong>'),
    # Zinc coating (≥120g/m², 80μm, etc.)
    (r'(≥?\s*\d{2,4}\s*(?:g/m²|g/m2|μm|microns?))\s*(?:zinc)?', r'<strong>\1</strong>'),
    # Wire diameter (Ø2.0mm, 2.0mm–4.5mm, etc.)
    (r'(?:[ØOo]|dia(?:meter)?\s*\.?\s*)(\d+\.?\d*\s*(?:mm|in))(?![^<]*>)', r'<strong>Ø \1</strong>'),
    # Mesh aperture dimensions (50mm × 50mm, etc.)
    (r'(\d{2,4}\s*(?:mm|cm|in)\s*[×xX]\s*\d{2,4}\s*(?:mm|cm|in))\s*(?:aperture|mesh|opening)', r'<strong>\1</strong>'),
    # Temperatures (°C, °F)
    (r'(\d{2,5}\s*°[CF])(?![^<]*>)', r'<strong>\1</strong>'),
    # NRC / dB ratings
    (r'(NRC\s*(?:0\.\d+|≥?\s*0\.?\d*))(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(≥?\s*\d{2,3}\s*dB)(?![^<]*>)', r'<strong>\1</strong>'),
    # ISO/EN/ASTM standard references
    (r'(ISO\s*\d{1,6}[:\-]?\d{0,4}(?:/\S+)?)(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(ASTM\s+[A-Z]\d{1,5}(?:/\S+)?)(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(EN\s+\d{2,6}[:\-]?\d{0,4}(?:/\S+)?)(?![^<]*>)', r'<strong>\1</strong>'),
    # CE certification
    (r'\b(CE\s+(?:certified|compliant|marking))(?![^<]*>)', r'<strong>\1</strong>'),
    # ISO 9001 certification
    (r'\b(ISO\s+9001(?::\d{4})?)\b', r'<strong>\1</strong>'),
    # Panel sizes (2.0m × 3.0m, etc.)
    (r'(\d+\.?\d*\s*m\s*[×xX]\s*\d+\.?\d*\s*m)\s*(?:panel|sheet)', r'<strong>\1</strong>'),
    # Weight (2.8 kg/m², etc.)
    (r'(≈?\s*\d+\.?\d*\s*kg/m[²2])(?![^<]*>)', r'<strong>\1</strong>'),
    # Breaking load
    (r'(≥?\s*\d{2,4}\s*N/m)(?![^<]*>)', r'<strong>\1</strong>'),
    # Quantities
    (r'(\d{2,4}[-+]\s*\d{2,4}\s*days?)\b(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(\d{1,3}[+]\s*(?:countries|国家))(?![^<]*>)', r'<strong>\1</strong>'),
    # Containers
    (r'(\d{2,4}[-–]\d{2,4}\s*(?:panels|m²|tons)\s*(?:per|/)\s*\d{2}ft)', r'<strong>\1</strong>'),
    # Key specs at end of first sentence (e.g., "15+ year service life")
    (r'(\d{1,2}\s*\+?\s*(?:year|yr)s?\s*(?:service\s*)?(?:life|durability|warranty|protection))(?![^<]*>)', r'<strong>\1</strong>'),
]

PATTERNS_ZH = [
    # MPa
    (r'(≥?\s*\d{3,4}[\s-]*\d{0,4})\s*(MPa|兆帕)(?![^<]*>)', r'<strong>\1 \2</strong>'),
    # kN/KJ
    (r'(≥?\s*\d+[\s-]*\d{0,4})\s*(kN|千牛|kJ|千焦)(?![^<]*>)', r'<strong>\1 \2</strong>'),
    # 年
    (r'(\d{1,3}[-+~～]\s*\d{0,3}\+?\s*年)(?![^<]*>)', r'<strong>\1</strong>'),
    (r'(\d{1,2}\+?\s*年\s*(?:使用|服务|寿命|质保))(?![^<]*>)', r'<strong>\1</strong>'),
    # g/m², 锌层
    (r'(≥?\s*\d{2,4}\s*(?:g/m²|g/m2|克/平方米|μm|微米))(?![^<]*>)', r'<strong>\1</strong>'),
    # 丝径
    (r'(?:直径|丝径|Ø|Φ)\s*(?:[：:]\s*)?(\d+\.?\d*\s*(?:mm|毫米))(?![^<]*>)', r'<strong>丝径 \1</strong>'),
    # 网孔尺寸
    (r'(\d{2,4}\s*(?:mm|毫米|cm|厘米)\s*[×xX×]\s*\d{2,4}\s*(?:mm|毫米|cm|厘米))\s*(?:网孔|孔径)', r'<strong>\1</strong>'),
    # ISO/EN/ASTM
    (r'(ISO\s*\d{1,6}[:\-]?\d{0,4}(?:/\S+)?)', r'<strong>\1</strong>'),
    (r'(ASTM\s+[A-Z]\d{1,5}(?:/\S+)?)', r'<strong>\1</strong>'),
    (r'(EN\s+\d{2,6}[:\-]?\d{0,4}(?:/\S+)?)', r'<strong>\1</strong>'),
    # CE 认证
    (r'(CE\s*(?:认证|标准|合规))(?![^<]*>)', r'<strong>\1</strong>'),
    # ISO 9001
    (r'(ISO\s+9001(?::\d{4})?)', r'<strong>\1</strong>'),
    # dB
    (r'(≥?\s*\d{2,3}\s*dB|分贝)(?![^<]*>)', r'<strong>\1</strong>'),
    # 重量
    (r'(约?\s*\d+\.?\d*\s*(?:kg/m²|kg/m2|千克/平方米|kg/㎡))(?![^<]*>)', r'<strong>\1</strong>'),
    # 板材尺寸
    (r'(\d+\.?\d*\s*(?:m|米)\s*[×xX×]\s*\d+\.?\d*\s*(?:m|米))\s*(?:面板|板)', r'<strong>\1</strong>'),
    # 国家
    (r'(\d{1,3}[+]\s*(?:个?\s*国家|多国))(?![^<]*>)', r'<strong>\1</strong>'),
    # 天数/工作日
    (r'(\d{2,4}[-–]\d{2,4}\s*(?:天|日|工作日))(?![^<]*>)', r'<strong>\1</strong>'),
    # 集装箱
    (r'(\d{2,4}[-–]\d{2,4}\s*(?:片|平方米|吨)\s*(?:/|每)\s*\d{2}尺)', r'<strong>\1</strong>'),
    # ℃
    (r'(\d{2,5}\s*℃)(?![^<]*>)', r'<strong>\1</strong>'),
    # NRC
    (r'(NRC\s*(?:0\.?\d+|≥?\s*0\.?\d*))(?![^<]*>)', r'<strong>\1</strong>'),
    # 万元/万美元
    (r'(\d+[万]?\s*(?:美元|美金|元))(?![^<]*>)', r'<strong>\1</strong>'),
]

def bold_text(text: str, patterns: list) -> str:
    """Apply patterns to text, avoiding already-<strong>-tagged content."""
    if not text:
        return text
    for regex, replacement in patterns:
        # Only match outside existing <strong> tags
        # Split into tagged/untagged segments
        parts = re.split(r'(<strong>.*?</strong>)', text, flags=re.DOTALL)
        for i, part in enumerate(parts):
            if part.startswith('<strong>'):
                continue  # skip already-bold segments
            parts[i] = re.sub(regex, replacement, part, flags=re.IGNORECASE)
        text = ''.join(parts)
    return text


def main():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT id, slug, description_en, description_zh FROM products").fetchall()

    updated = 0
    for row in rows:
        orig_en = row["description_en"] or ""
        orig_zh = row["description_zh"] or ""

        new_en = bold_text(orig_en, PATTERNS_EN)
        new_zh = bold_text(orig_zh, PATTERNS_ZH)

        if new_en != orig_en or new_zh != orig_zh:
            conn.execute(
                "UPDATE products SET description_en = ?, description_zh = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                [new_en, new_zh, row["id"]]
            )
            print(f"  ✅ {row['slug']}")
            updated += 1
        else:
            print(f"  ⏭️  {row['slug']} (no changes)")

    conn.commit()
    print(f"\nUpdated {updated}/{len(rows)} products.")

    # Show a sample
    sample = conn.execute("SELECT slug, description_en FROM products WHERE slug='welded-wire-mesh-50mm'").fetchone()
    if sample:
        # Count strong tags
        count = len(re.findall(r'<strong>', sample["description_en"]))
        print(f"\nSample: {sample['slug']} — {count} bold tags added")

    conn.close()

if __name__ == "__main__":
    main()
