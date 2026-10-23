# Blog Translation Task: English → Vietnamese (vi) & Thai (th)

## Objective
Translate 3 blog posts from English to Vietnamese and Thai, then write translations to SQLite database `backend/inquiries.db` table `blog_posts`.

## Date
2026-07-23

## Blogs Translated

| ID | Slug | Title (EN) |
|----|------|-----------|
| 1 | gabion-retaining-wall-guide | Gabion Retaining Walls: Design Guide & Best Practices (2025) |
| 2 | rockfall-protection-net-systems | Rockfall Protection Net Systems: Case Studies & Certification |
| 3 | wire-mesh-supplier-china-guide | How to Choose a Reliable Wire Mesh Supplier in China (2025 Guide) |

## Fields Translated per Blog (×2 languages)
- title_vi / title_th
- abstract_vi / abstract_th
- content_vi / content_th (Markdown format preserved)
- seo_title_vi / seo_title_th
- seo_description_vi / seo_description_th
- seo_keywords_vi / seo_keywords_th (English keywords kept, local keywords appended)

## Translation Approach
- **Vietnamese**: Used natural engineering terminology common in Vietnamese construction/mining sectors
- **Thai**: Used natural engineering terminology common in Thai construction/mining sectors
- Preserved Markdown formatting (#, ##, -, **, etc.)
- Preserved brand name "Angu" untranslated
- Preserved product model numbers (RXI-200, RXI-500, etc.) untranslated
- SEO keywords kept in English (buyer search behavior) with supplementary local-language keywords

## Database Verification
All 3 blogs successfully updated. Content lengths confirmed:
- Blog 1: vi=2293 chars, th=2230 chars
- Blog 2: vi=1673 chars, th=1574 chars
- Blog 3: vi=1663 chars, th=1502 chars

## Script
`translate_blogs.py` — executed successfully, writes to `backend/inquiries.db`

## Status
✅ Complete — all translations written and verified in database.
