const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inquiries.db');

const seoData = [
  ['seo.home.title_en', 'Angu Wire Mesh — Gabion, Protection Net & Fence Manufacturer', '安固丝网 — 石笼网、防护网、护栏网制造商'],
  ['seo.home.description_en', 'Hebei Angu Wire Mesh is a professional manufacturer of gabion boxes, rockfall protection nets, chain link fences, and noise barriers. ISO 9001 & CE certified. Exporting to 30+ countries.', '河北安固丝网制品有限公司专业生产石笼网箱、边坡防护网、勾花网围栏和声屏障。ISO 9001和CE认证，产品出口全球30多个国家。'],
  ['seo.home.keywords_en', 'gabion box, wire mesh, protection net, chain link fence, noise barrier, rockfall net manufacturer China', '石笼网箱,丝网,防护网,勾花网,声屏障,边坡防护网制造商'],
  ['seo.about.title_en', 'About Angu Wire Mesh — 15 Years Manufacturing Experience', '关于安固丝网 — 15年制造经验'],
  ['seo.about.description_en', 'Learn about Angu Wire Mesh — 15 years of wire mesh manufacturing, ISO 9001 & CE certified, exporting gabion boxes, rockfall nets, and fencing to 30+ countries.', '了解安固丝网 — 15年丝网制造经验，ISO 9001和CE认证，石笼网箱、防护网和围栏产品出口30多个国家。'],
  ['seo.about.keywords_en', 'about Angu Wire Mesh, wire mesh manufacturer China, gabion factory, wire mesh company', '关于安固丝网,丝网制造商,石笼网工厂,丝网公司'],
  ['seo.products.title_en', 'Wire Mesh Products — Gabion, Fence, Protection Net | Angu', '丝网产品 — 石笼网、护栏网、防护网 | 安固丝网'],
  ['seo.products.description_en', 'Browse our complete range of wire mesh products: gabion boxes, rockfall nets, chain link fences, noise barriers, barbed wire, and more. ISO & CE certified manufacturer from China.', '浏览我们的全线丝网产品：石笼网箱、边坡防护网、勾花网围栏、声屏障、刺绳等。ISO和CE认证的中国制造商。'],
  ['seo.products.keywords_en', 'wire mesh products, gabion boxes, rockfall net, chain link fence, noise barrier, barbed wire', '丝网产品,石笼网箱,边坡防护网,勾花网,声屏障,刺绳'],
  ['seo.blog.title_en', 'Wire Mesh Industry Blog — Guides, Cases & News | Angu', '丝网行业博客 — 指南、案例与新闻 | 安固丝网'],
  ['seo.blog.description_en', 'Expert guides on gabion retaining walls, rockfall protection systems, and wire mesh sourcing. Industry insights from Angu Wire Mesh.', '石笼挡土墙、边坡防护系统和丝网采购专业指南。来自安固丝网的行业洞察。'],
  ['seo.blog.keywords_en', 'wire mesh blog, gabion guide, rockfall protection, wire mesh industry news', '丝网博客,石笼网指南,边坡防护,丝网行业新闻'],
  ['seo.solutions.title_en', 'Wire Mesh Engineering Solutions | Angu', '丝网工程解决方案 | 安固丝网'],
  ['seo.solutions.description_en', 'Custom wire mesh solutions for highway, railway, mining, water conservancy, and military projects. Gabion retaining walls, rockfall protection, noise barriers.', '定制丝网解决方案，用于公路、铁路、矿山、水利和军事项目。石笼挡土墙、边坡防护、声屏障。'],
  ['seo.solutions.keywords_en', 'wire mesh solutions, engineering solutions, gabion wall, rockfall protection, highway guardrail', '丝网解决方案,工程方案,石笼墙,边坡防护,公路护栏'],
  ['seo.service.title_en', 'Wire Mesh Customization & OEM Service | Angu', '丝网定制与OEM服务 | 安固丝网'],
  ['seo.service.description_en', 'Angu Wire Mesh provides OEM, ODM, and custom wire mesh fabrication services. Custom sizes, coatings, and packaging for gabion, fence, and protection net products.', '安固丝网提供OEM、ODM和定制丝网加工服务。石笼网、护栏网和防护网产品可定制尺寸、涂层和包装。'],
  ['seo.service.keywords_en', 'OEM wire mesh, custom gabion, wire mesh fabrication, custom fence manufacturing', 'OEM丝网,定制石笼网,丝网加工,定制围栏制造'],
  ['seo.faq.title_en', 'Wire Mesh FAQ — Gabion, Fence & Protection Net Questions | Angu', '丝网常见问答 — 石笼网、护栏网和防护网问题 | 安固丝网'],
  ['seo.faq.description_en', 'Frequently asked questions about gabion boxes, rockfall nets, chain link fences, and noise barriers. MOQ, shipping, customization, and installation answers.', '关于石笼网箱、边坡防护网、勾花网围栏和声屏障的常见问题。MOQ、运输、定制和安装答案。'],
  ['seo.faq.keywords_en', 'wire mesh FAQ, gabion FAQ, rockfall net questions, fence FAQ, MOQ wire mesh', '丝网常见问题,石笼网FAQ,防护网问题,护栏FAQ,丝网MOQ'],
  ['seo.contact.title_en', 'Contact Angu Wire Mesh — Get a Free Quote', '联系安固丝网 — 免费获取报价'],
  ['seo.contact.description_en', 'Contact Angu Wire Mesh for gabion boxes, rockfall nets, and wire mesh fencing. Send inquiry or call us for free quote and samples.', '联系安固丝网，咨询石笼网箱、边坡防护网和丝网围栏。发送询盘或致电免费获取报价和样品。'],
  ['seo.contact.keywords_en', 'contact wire mesh manufacturer, gabion inquiry, wire mesh quote, free sample request', '联系丝网制造商,石笼网询价,丝网报价,免费样品申请'],
  ['seo.download.title_en', 'Download Product Catalog & Specs | Angu Wire Mesh', '下载产品目录与技术规格 | 安固丝网'],
  ['seo.download.description_en', 'Download Angu Wire Mesh product catalogs, technical specifications, and certifications. PDF format available for gabion boxes, rockfall nets, and fencing products.', '下载安固丝网产品目录、技术规格和认证文件。石笼网箱、边坡防护网和围栏产品PDF格式。'],
  ['seo.download.keywords_en', 'wire mesh catalog download, gabion specification PDF, product datasheet', '丝网目录下载,石笼网规格PDF,产品数据表'],
];

db.serialize(() => {
  let cnt = 0;
  const stmt = db.prepare('INSERT OR IGNORE INTO site_config (key, value_en, value_zh) VALUES (?, ?, ?)');
  for (const [key, en, zh] of seoData) {
    stmt.run(key, en, zh);
    cnt++;
  }
  stmt.finalize();
  console.log(`✅ ${cnt} SEO keys inserted/verified`);
  db.close();
});
