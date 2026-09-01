const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'angu-admin-secret-key-2026';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost', 'https://paiqi-wiremesh.com'],
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting - admin routes only (public API used heavily by SSR)
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/admin/', adminLimiter);

app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Initialize SQLite database
// Multer config for image uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  }
});

const dbPath = path.join(__dirname, 'inquiries.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
  db.serialize(() => {
  // Inquiries table
  db.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      inquiry_no TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      country TEXT,
      quantity TEXT,
      message TEXT NOT NULL,
      product_slug TEXT,
      category_slug TEXT,
      locale TEXT DEFAULT 'en',
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin users table
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      category_slug TEXT NOT NULL,
      name_en TEXT NOT NULL DEFAULT '',
      name_zh TEXT NOT NULL DEFAULT '',
      name_vi TEXT NOT NULL DEFAULT '',
      name_th TEXT NOT NULL DEFAULT '',
      short_description_en TEXT DEFAULT '',
      short_description_zh TEXT DEFAULT '',
      short_description_vi TEXT DEFAULT '',
      short_description_th TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_vi TEXT DEFAULT '',
      description_th TEXT DEFAULT '',
      price REAL,
      unit TEXT DEFAULT '',
      moq INTEGER DEFAULT 0,
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      is_featured INTEGER DEFAULT 0,
      images TEXT DEFAULT '[]',
      specifications_en TEXT DEFAULT '{}',
      specifications_zh TEXT DEFAULT '{}',
      specifications_vi TEXT DEFAULT '{}',
      specifications_th TEXT DEFAULT '{}',
      applications_en TEXT DEFAULT '[]',
      applications_zh TEXT DEFAULT '[]',
      applications_vi TEXT DEFAULT '[]',
      applications_th TEXT DEFAULT '[]',
      seo_title_en TEXT DEFAULT '',
      seo_title_zh TEXT DEFAULT '',
      seo_title_vi TEXT DEFAULT '',
      seo_title_th TEXT DEFAULT '',
      seo_keywords_en TEXT DEFAULT '',
      seo_keywords_zh TEXT DEFAULT '',
      seo_keywords_vi TEXT DEFAULT '',
      seo_keywords_th TEXT DEFAULT '',
      seo_description_en TEXT DEFAULT '',
      seo_description_zh TEXT DEFAULT '',
      seo_description_vi TEXT DEFAULT '',
      seo_description_th TEXT DEFAULT '',
      faq_en TEXT DEFAULT '[]',
      faq_zh TEXT DEFAULT '[]',
      faq_vi TEXT DEFAULT '[]',
      faq_th TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Product categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS product_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL DEFAULT '',
      name_zh TEXT NOT NULL DEFAULT '',
      name_vi TEXT NOT NULL DEFAULT '',
      name_th TEXT NOT NULL DEFAULT '',
      thumbnail TEXT,
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Blog categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL DEFAULT '',
      name_zh TEXT NOT NULL DEFAULT '',
      name_vi TEXT NOT NULL DEFAULT '',
      name_th TEXT NOT NULL DEFAULT '',
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Blog posts table
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      category_slug TEXT DEFAULT '',
      title_en TEXT NOT NULL DEFAULT '',
      title_zh TEXT NOT NULL DEFAULT '',
      title_vi TEXT NOT NULL DEFAULT '',
      title_th TEXT NOT NULL DEFAULT '',
      abstract_en TEXT DEFAULT '',
      abstract_zh TEXT DEFAULT '',
      abstract_vi TEXT DEFAULT '',
      abstract_th TEXT DEFAULT '',
      content_en TEXT DEFAULT '',
      content_zh TEXT DEFAULT '',
      content_vi TEXT DEFAULT '',
      content_th TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      status TEXT DEFAULT 'draft',
      publish_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      seo_title_en TEXT DEFAULT '',
      seo_title_zh TEXT DEFAULT '',
      seo_title_vi TEXT DEFAULT '',
      seo_title_th TEXT DEFAULT '',
      seo_keywords_en TEXT DEFAULT '',
      seo_keywords_zh TEXT DEFAULT '',
      seo_keywords_vi TEXT DEFAULT '',
      seo_keywords_th TEXT DEFAULT '',
      seo_description_en TEXT DEFAULT '',
      seo_description_zh TEXT DEFAULT '',
      seo_description_vi TEXT DEFAULT '',
      seo_description_th TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Operation logs table
  db.run(`
    CREATE TABLE IF NOT EXISTS operation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Site config (key-value store for footer/header/company info) ──
  db.run(`
    CREATE TABLE IF NOT EXISTS site_config (
      key TEXT PRIMARY KEY,
      value_en TEXT DEFAULT '',
      value_zh TEXT DEFAULT '',
      value_vi TEXT DEFAULT '',
      value_th TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Hero banners ──
  db.run(`
    CREATE TABLE IF NOT EXISTS banners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sort_weight INTEGER DEFAULT 0,
      image_en TEXT DEFAULT '',
      image_zh TEXT DEFAULT '',
      title_en TEXT DEFAULT '',
      title_zh TEXT DEFAULT '',
      title_vi TEXT DEFAULT '',
      title_th TEXT DEFAULT '',
      subtitle_en TEXT DEFAULT '',
      subtitle_zh TEXT DEFAULT '',
      subtitle_vi TEXT DEFAULT '',
      subtitle_th TEXT DEFAULT '',
      cta_text_en TEXT DEFAULT '',
      cta_text_zh TEXT DEFAULT '',
      cta_text_vi TEXT DEFAULT '',
      cta_text_th TEXT DEFAULT '',
      cta_link TEXT DEFAULT '',
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Why Choose Us ──
  db.run(`
    CREATE TABLE IF NOT EXISTS why_choose_us (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT DEFAULT '',
      title_en TEXT DEFAULT '',
      title_zh TEXT DEFAULT '',
      title_vi TEXT DEFAULT '',
      title_th TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_vi TEXT DEFAULT '',
      description_th TEXT DEFAULT '',
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Application scenarios ──
  db.run(`
    CREATE TABLE IF NOT EXISTS application_scenarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT DEFAULT '',
      name_en TEXT DEFAULT '',
      name_zh TEXT DEFAULT '',
      name_vi TEXT DEFAULT '',
      name_th TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_zh TEXT DEFAULT '',
      description_vi TEXT DEFAULT '',
      description_th TEXT DEFAULT '',
      category_slugs TEXT DEFAULT '[]',
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── About Page: Timeline ──
  db.run(`
    CREATE TABLE IF NOT EXISTS about_timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      emoji TEXT DEFAULT '',
      title_en TEXT DEFAULT '',
      title_zh TEXT DEFAULT '',
      title_vi TEXT DEFAULT '',
      title_th TEXT DEFAULT '',
      desc_en TEXT DEFAULT '',
      desc_zh TEXT DEFAULT '',
      desc_vi TEXT DEFAULT '',
      desc_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── About Page: Team ──
  db.run(`
    CREATE TABLE IF NOT EXISTS about_team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      avatar TEXT DEFAULT '',
      name_en TEXT DEFAULT '',
      name_zh TEXT DEFAULT '',
      name_vi TEXT DEFAULT '',
      name_th TEXT DEFAULT '',
      title_en TEXT DEFAULT '',
      title_zh TEXT DEFAULT '',
      title_vi TEXT DEFAULT '',
      title_th TEXT DEFAULT '',
      market_en TEXT DEFAULT '',
      market_zh TEXT DEFAULT '',
      market_vi TEXT DEFAULT '',
      market_th TEXT DEFAULT '',
      countries_en TEXT DEFAULT '',
      countries_zh TEXT DEFAULT '',
      countries_vi TEXT DEFAULT '',
      countries_th TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      whatsapp TEXT DEFAULT '',
      email TEXT DEFAULT '',
      desc_en TEXT DEFAULT '',
      desc_zh TEXT DEFAULT '',
      desc_vi TEXT DEFAULT '',
      desc_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── About Page: Factory Images ──
  db.run(`
    CREATE TABLE IF NOT EXISTS about_factory_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT DEFAULT '',
      alt_en TEXT DEFAULT '',
      alt_zh TEXT DEFAULT '',
      alt_vi TEXT DEFAULT '',
      alt_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Noise Barrier: Project Cases ──
  db.run(`
    CREATE TABLE IF NOT EXISTS noise_barrier_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT DEFAULT '',
      title_en TEXT DEFAULT '',
      title_zh TEXT DEFAULT '',
      title_vi TEXT DEFAULT '',
      title_th TEXT DEFAULT '',
      location_en TEXT DEFAULT '',
      location_zh TEXT DEFAULT '',
      location_vi TEXT DEFAULT '',
      location_th TEXT DEFAULT '',
      spec_en TEXT DEFAULT '',
      spec_zh TEXT DEFAULT '',
      spec_vi TEXT DEFAULT '',
      spec_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── Noise Barrier: Factory Images (reuse about_factory_images or separate set) ──
  db.run(`
    CREATE TABLE IF NOT EXISTS noise_barrier_factory_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT DEFAULT '',
      alt_en TEXT DEFAULT '',
      alt_zh TEXT DEFAULT '',
      alt_vi TEXT DEFAULT '',
      alt_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ── About Page: Certifications ──
  db.run(`
    CREATE TABLE IF NOT EXISTS about_certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT DEFAULT '',
      name_en TEXT DEFAULT '',
      name_zh TEXT DEFAULT '',
      name_vi TEXT DEFAULT '',
      name_th TEXT DEFAULT '',
      desc_en TEXT DEFAULT '',
      desc_zh TEXT DEFAULT '',
      desc_vi TEXT DEFAULT '',
      desc_th TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default admin
  const defaultPassword = bcrypt.hashSync('admin123', 10);
  db.run(`
    INSERT OR IGNORE INTO admin_users (username, password_hash)
    VALUES ('admin', ?)
  `, [defaultPassword]);

  // Add facebook column if missing (migration for existing DBs)
  db.run("ALTER TABLE about_team ADD COLUMN facebook TEXT DEFAULT ''", () => {});
  db.run("ALTER TABLE products ADD COLUMN faq_en TEXT DEFAULT '[]'", () => {});
  db.run("ALTER TABLE products ADD COLUMN faq_zh TEXT DEFAULT '[]'", () => {});

  // Insert default product categories (only if empty)
  db.get('SELECT COUNT(*) as cnt FROM product_categories', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const defaultCategories = [
    ['wire-mesh', 'Wire Mesh', '丝网类', 1],
    ['fence', 'Fencing', '护栏网', 2],
    ['gabion', 'Gabion', '石笼网', 3],
    ['protection-net', 'Protection Net', '防护网', 4],
    ['noise-barrier', 'Noise Barrier', '声屏障', 5]
  ];
  defaultCategories.forEach(([slug, name_en, name_zh, sort]) => {
    db.run(`INSERT INTO product_categories (slug, name_en, name_zh, name_vi, name_th, sort_weight, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`, [slug, name_en, name_zh, '', '', sort]);
  });
  }
  });

  // Insert default blog categories (only if empty)
  db.get('SELECT COUNT(*) as cnt FROM blog_categories', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const defaultBlogCategories = [
    ['gabion-knowledge', 'Gabion Knowledge', '石笼网知识'],
    ['project-cases', 'Project Cases', '工程案例'],
    ['industry-news', 'Industry News', '行业新闻'],
    ['installation-guide', 'Installation Guide', '安装指南']
  ];
  defaultBlogCategories.forEach(([slug, name_en, name_zh]) => {
    db.run(`INSERT INTO blog_categories (slug, name_en, name_zh, name_vi, name_th, status) VALUES (?, ?, ?, ?, ?, 'published')`, [slug, name_en, name_zh, '', '']);
  });
  }
  });

  // ── Seed site config (only if empty) ──
  db.get('SELECT COUNT(*) as cnt FROM site_config', [], (err, row) => {
  if (row && row.cnt > 0) return;
  const siteConfigDefaults = [
    ['company_name_en', 'Angu Wire Mesh', '安固丝网'],
    ['company_tagline', 'Wire Mesh · Gabion · Fencing · Protection · Noise Barrier', '丝网类 · 护栏网 · 石笼网 · 防护网 · 声屏障'],
    ['logo_url', '/images/logo.png', '/images/logo.png'],
    ['company_short_intro_en', 'Hebei Angu Wire Mesh Products Co., Ltd. is a professional manufacturer of welded wire mesh, chain link fence, gabion boxes, slope protection nets, noise barriers and more \u2014 exported to 30+ countries.', '安固丝网是一家专业制造商,主营电焊网、护栏网、石笼网、边坡防护网、声屏障等金属丝网产品,出口30多个国家和地区。'],
    ['company_desc_en', 'Angu Wire Mesh (Hebei Angu Wire Mesh Products Co., Ltd.) is headquartered in Anping - China\'s Wire Mesh Capital. We are an integrated manufacturer specializing in R&D, production, and export of gabion boxes, rockfall protection nets, fencing, noise barriers, barbed wire, and more across 9 product lines, with an annual capacity exceeding 5,000 tons.', '安固丝网(河北安固丝网制品有限公司)位于中国丝网之都--安平。我们是一家集研发、生产、销售于一体的金属丝网制造企业,主营石笼网箱、边坡防护网、护栏网、声屏障、刺绳等九大品类,年产能力超过5,000吨。'],
    ['company_desc2_en', 'We hold ISO 9001:2015 quality management certification and CE product certification. Our products are exported to 30+ countries and regions across Southeast Asia, the Middle East, Africa, South America, and Europe, widely used in bridge, highway, mining, water conservancy, military, and landscaping projects.', '我们拥有ISO 9001:2015质量管理体系认证和CE产品认证,产品远销东南亚、中东、非洲、南美、欧洲等30多个国家和地区,广泛应用于桥梁、公路、矿山、水利、军事、园林等工程领域。'],
    ['phone', '+86 188 0318 9797', '+86 188 0318 9797'],
    ['email', 'anguwiremesh@gmail.com', 'anguwiremesh@gmail.com'],
    ['address', 'Anping County, Hengshui, Hebei, China', '中国河北省衡水市安平县'],
    ['whatsapp', '+86 188 0318 9797', '+86 188 0318 9797'],
    ['stats_years', '15+', ''],
    ['stats_products', '30', '30'],
    ['stats_countries', '30+', ''],
    ['stats_inspection', '100%', ''],
    ['copyright', '© 2025 Hebei Angu Wire Mesh Products Co., Ltd. All rights reserved.', ''],
    ['hero_badge_en', 'ISO 9001 & CE Certified Manufacturer', 'ISO 9001 & CE 认证制造商'],
    ['hero_title_prefix_en', 'Professional Wire Mesh & Gabion Manufacturer', '专业丝网与石笼网制造商'],
    ['hero_subtitle_en', 'From Anping, China - Trusted by 500+ clients across 30+ countries since 2015', '来自中国安平 - 自2015年以来,深受30多个国家500多位客户的信赖'],
    ['hero_cta_en', 'Get a Free Quote', '免费获取报价'],
    ['about_title_en', '15 Years of Wire Mesh Manufacturing, Serving 30+ Countries', '15年专注金属丝网制造,服务全球30+国家'],
    ['about_label_en', 'About Angu Wire Mesh', '关于安固丝网'],
    ['about_location_badge_en', 'Anping · China Wire Mesh Capital', '安平 · 中国丝网之都'],
    // ── SEO defaults (overrideable in admin) ──
    ['seo.home.title_en', 'Angu Wire Mesh - Wire Mesh, Gabion & Fence Manufacturer', '安固丝网 - 丝网、石笼网、护栏网制造商'],
    ['seo.home.description_en', 'Hebei Angu Wire Mesh is a professional manufacturer of welded wire mesh, gabion boxes, fencing, slope protection nets, and noise barriers. ISO 9001 & CE certified. Exporting to 30+ countries.', '河北安固丝网制品有限公司专业生产电焊网、石笼网箱、护栏网、边坡防护网和声屏障。ISO 9001和CE认证,出口全球30多个国家。'],
    ['seo.home.keywords_en', 'wire mesh, gabion box, fence, slope protection net, noise barrier, welded wire mesh manufacturer China', '丝网,石笼网箱,护栏网,边坡防护网,声屏障,电焊网制造商'],
    ['seo.about.title_en', 'About Angu Wire Mesh - 15 Years Manufacturing Experience', '关于安固丝网 - 15年制造经验'],
    ['seo.about.description_en', 'Learn about Angu Wire Mesh - 15 years of wire mesh manufacturing, ISO 9001 & CE certified, exporting gabion boxes, rockfall nets, and fencing to 30+ countries.', '了解安固丝网 - 15年丝网制造经验,ISO 9001和CE认证,石笼网箱、防护网和围栏产品出口30多个国家。'],
    ['seo.about.keywords_en', 'about Angu Wire Mesh, wire mesh manufacturer China, gabion factory, wire mesh company', '关于安固丝网,丝网制造商,石笼网工厂,丝网公司'],
    ['seo.products.title_en', 'Wire Mesh Products - Gabion, Fence, Protection Net | Angu', '丝网产品 - 石笼网、护栏网、防护网 | 安固丝网'],
    ['seo.products.description_en', 'Browse our complete range of wire mesh products: gabion boxes, rockfall nets, chain link fences, noise barriers, barbed wire, and more. ISO & CE certified manufacturer from China.', '浏览我们的全线丝网产品:石笼网箱、边坡防护网、勾花网围栏、声屏障、刺绳等。ISO和CE认证的中国制造商。'],
    ['seo.products.keywords_en', 'wire mesh products, gabion boxes, rockfall net, chain link fence, noise barrier, barbed wire', '丝网产品,石笼网箱,边坡防护网,勾花网,声屏障,刺绳'],
    ['seo.blog.title_en', 'Wire Mesh Industry Blog - Guides, Cases & News | Angu', '丝网行业博客 - 指南、案例与新闻 | 安固丝网'],
    ['seo.blog.description_en', 'Expert guides on gabion retaining walls, rockfall protection systems, and wire mesh sourcing. Industry insights from Angu Wire Mesh.', '石笼挡土墙、边坡防护系统和丝网采购专业指南。来自安固丝网的行业洞察。'],
    ['seo.blog.keywords_en', 'wire mesh blog, gabion guide, rockfall protection, wire mesh industry news', '丝网博客,石笼网指南,边坡防护,丝网行业新闻'],
    ['seo.download.title_en', 'Download Product Catalog & Specs | Angu Wire Mesh', '下载产品目录与技术规格 | 安固丝网'],
    ['seo.download.description_en', 'Download Angu Wire Mesh product catalogs, technical specifications, and certifications. PDF format available for gabion boxes, rockfall nets, and fencing products.', '下载安固丝网产品目录、技术规格和认证文件。石笼网箱、边坡防护网和围栏产品PDF格式。'],
    ['seo.download.keywords_en', 'wire mesh catalog download, gabion specification PDF, product datasheet', '丝网目录下载,石笼网规格PDF,产品数据表'],
    ['seo.solutions.title_en', 'Wire Mesh Engineering Solutions | Angu', '丝网工程解决方案 | 安固丝网'],
    ['seo.solutions.description_en', 'Custom wire mesh solutions for highway, railway, mining, water conservancy, and military projects. Gabion retaining walls, rockfall protection, noise barriers.', '定制丝网解决方案,用于公路、铁路、矿山、水利和军事项目。石笼挡土墙、边坡防护、声屏障。'],
    ['seo.solutions.keywords_en', 'wire mesh solutions, engineering solutions, gabion wall, rockfall protection, highway guardrail', '丝网解决方案,工程方案,石笼墙,边坡防护,公路护栏'],
    ['seo.service.title_en', 'Wire Mesh Customization & OEM Service | Angu', '丝网定制与OEM服务 | 安固丝网'],
    ['seo.service.description_en', 'Angu Wire Mesh provides OEM, ODM, and custom wire mesh fabrication services. Custom sizes, coatings, and packaging for gabion, fence, and protection net products.', '安固丝网提供OEM、ODM和定制丝网加工服务。石笼网、护栏网和防护网产品可定制尺寸、涂层和包装。'],
    ['seo.service.keywords_en', 'OEM wire mesh, custom gabion, wire mesh fabrication, custom fence manufacturing', 'OEM丝网,定制石笼网,丝网加工,定制围栏制造'],
    ['seo.faq.title_en', 'Wire Mesh FAQ - Gabion, Fence & Protection Net Questions | Angu', '丝网常见问答 - 石笼网、护栏网和防护网问题 | 安固丝网'],
    ['seo.faq.description_en', 'Frequently asked questions about gabion boxes, rockfall nets, chain link fences, and noise barriers. MOQ, shipping, customization, and installation answers.', '关于石笼网箱、边坡防护网、勾花网围栏和声屏障的常见问题。MOQ、运输、定制和安装答案。'],
    ['seo.faq.keywords_en', 'wire mesh FAQ, gabion FAQ, rockfall net questions, fence FAQ, MOQ wire mesh', '丝网常见问题,石笼网FAQ,防护网问题,护栏FAQ,丝网MOQ'],
    ['seo.contact.title_en', 'Contact Angu Wire Mesh - Get a Free Quote', '联系安固丝网 - 免费获取报价'],
    ['seo.contact.description_en', 'Contact Angu Wire Mesh for gabion boxes, rockfall nets, and wire mesh fencing. Send inquiry or call us for free quote and samples.', '联系安固丝网,咨询石笼网箱、边坡防护网和丝网围栏。发送询盘或致电获取免费报价和样品。'],
    ['seo.contact.keywords_en', 'contact wire mesh manufacturer, gabion inquiry, wire mesh quote, free sample request', '联系丝网制造商,石笼网询价,丝网报价,免费样品申请'],
  ];
  siteConfigDefaults.forEach(([key, value_en, value_zh]) => {
    db.run('INSERT OR IGNORE INTO site_config (key, value_en, value_zh, value_vi, value_th) VALUES (?, ?, ?, ?, ?)', [key, value_en || '', value_zh || '', '', '']);
  });
  });

  // ── Seed banners (only if empty) ──
  db.get('SELECT COUNT(*) as cnt FROM banners', [], (err, row) => {
  if (row && row.cnt > 0) return;
  const defaultBanners = [
    [0, '/images/banners/banner1.jpg', '/images/banners/banner1.jpg', 'Professional Gabion Box & Rockfall Protection Net Manufacturer', '专业石笼网箱与防护网制造商', 'From Anping, China - Trusted by 500+ clients across 30+ countries since 2015', '来自中国安平 - 自2015年以来,深受30多个国家500多位客户的信赖', 'Get a Free Quote', '免费获取报价', '/contact'],
    [1, '/images/banners/banner2.jpg', '/images/banners/banner2.jpg', 'ISO 9001 Certified - Premium Quality Rockfall Protection Systems', 'ISO 9001认证 - 高品質落石防护系统', 'CE certified products with full traceability. Tested to ETAG 027 standards.', '完全なトレーサビリティを備えたCE認証製品。ETAG 027規格で試験済み。', 'View Certifications', '查看认证', '/about'],
    [2, '/images/banners/banner3.jpg', '/images/banners/banner3.jpg', 'Factory Direct Pricing - Low MOQ, Fast Delivery Worldwide', '工厂直送価格 - 低MOQ、世界への迅速な配送', 'Minimum order quantity from 50 pieces. Door-to-door shipping available.', '最小注文数量50個から。世界中へのドアツードア配送対応。', 'Contact Us', '联系我们', '/contact'],
  ];
  defaultBanners.forEach(([sort, img_en, img_zh, t_en, t_zh, sub_en, sub_zh, cta_en, cta_zh, link]) => {
    db.run('INSERT INTO banners (sort_weight, image_en, image_zh, title_en, title_zh, subtitle_en, subtitle_zh, cta_text_en, cta_text_zh, cta_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [sort, img_en, img_zh, t_en, t_zh, sub_en, sub_zh, cta_en, cta_zh, link]);
  });
  });

  // ── Seed why choose us (only if empty) ──
  db.get('SELECT COUNT(*) as cnt FROM why_choose_us', [], (err, row) => {
  if (row && row.cnt > 0) return;
  const defaultWhyChooseUs = [
    ['🏭', 'Factory Strength', '工厂实力', '15+ years in Anping, China\'s Wire Mesh Capital. 5,000+ tons annual output, 50+ skilled workers.', '中国丝网之都安平,15年专注制造。年产5,000+吨,50+技术工人。', 0],
    ['🛡️', 'ISO 9001 & CE Certified', 'ISO 9001 & CE 认证', 'ISO 9001:2015 certified manufacturing with strict QC at every stage. Pre-shipment inspection for every order.', 'ISO 9001:2015 认证制造,全流程质检,每单出货前必检。', 1],
    ['🔧', 'Full Customization', '全定制生产', 'Custom dimensions, wire diameters, coatings available. OEM/ODM supported with technical drawings.', '尺寸、丝径、涂层全可定制。支持来图来样 OEM/ODM 加工。', 2],
    ['🚢', 'Global Shipping', '全球物流', 'FCL or LCL via Tianjin Port. DHL/FedEx air freight for urgent orders. Exported to 30+ countries.', '整柜/拼箱天津港出发,急单可走空运。已出口 30+ 国家。', 3],
    ['💰', 'Factory-Direct Pricing', '工厂直供价格', 'No middlemen. Buy direct from the manufacturer, save 15%-30% vs. trading companies.', '无中间商加价,工厂直供比贸易商低 15%-30%。', 4],
    ['📦', 'Low MOQ for Trial Orders', '低起订量试单', 'Start with as little as 50 m2. We support trial orders so you can test quality before bulk purchase.', '最低 50 平米即可起订。支持试单验货,满意后再大批量采购。', 5],
  ];
  defaultWhyChooseUs.forEach(([icon, t_en, t_zh, d_en, d_zh, sort]) => {
    db.run('INSERT INTO why_choose_us (icon, title_en, title_zh, description_en, description_zh, sort_weight) VALUES (?, ?, ?, ?, ?, ?)', [icon, t_en, t_zh, d_en, d_zh, sort]);
  });
  });

  // ── Seed application scenarios (only if empty) ──
  db.get('SELECT COUNT(*) as cnt FROM application_scenarios', [], (err, row) => {
  if (row && row.cnt > 0) return;
  const defaultScenes = [
    ['🏗️', 'Construction & Engineering', '建筑工程', 'Welded wire mesh for concrete reinforcement, gabion retaining walls, and temporary fencing', '电焊网用于混凝土钢筋加固、石笼挡土墙及临时围挡', '["wire-mesh","gabion","fence"]', 0],
    ['🛣️', 'Highway & Railway', '公路铁路', 'Noise barriers, safety guardrails, and anti-throw nets for transport corridors', '声屏障、安全防护栏和防抛网用于交通干线', '["noise-barrier","fence","protection-net"]', 1],
    ['⛏️', 'Mining & Slope Safety', '矿山边坡', 'Rockfall protection nets, drapery systems, and gabion barriers for mine safety', '拦石网、主动防护网和石笼挡墙用于矿山安全', '["protection-net","gabion"]', 2],
    ['🌊', 'Water Conservancy', '水利工程', 'Gabion boxes, reno mattresses, and anti-scour nets for riverbank and dam protection', '石笼网箱、雷诺护垫和防冲刷网用于河道护岸及水坝防护', '["gabion","wire-mesh"]', 3],
    ['🏭', 'Industrial & Factory', '工厂工业', 'Welded mesh partitions, safety barriers, noise enclosures and security fencing', '电焊网隔断、安全护栏、降噪围挡和安防围栏', '["wire-mesh","fence","noise-barrier"]', 4],
    ['🛡️', 'Perimeter Security', '周界安防', 'Chain link fence, razor barbed wire, anti-climb mesh and security gates', '勾花网围栏、刀片刺绳、防攀爬网和安防大门', '["fence","wire-mesh"]', 5],
    ['🐄', 'Agriculture & Farming', '农牧养殖', 'Field fencing, cattle panels, hexagonal mesh and pasture enclosures', '牧场围栏、牛栏网、六角网和草场圈地', '["fence","wire-mesh"]', 6],
    ['🌿', 'Environmental & Ecology', '生态环保', 'Gabion green walls, erosion control nets, and vegetated slope reinforcement', '石笼绿化墙、水土保持网和植被护坡加固', '["gabion","protection-net"]', 7],
    ['🏘️', 'Residential & Community', '住宅社区', 'Decorative fence panels, garden trellis mesh, balcony safety nets and privacy screens', '装饰护栏、花园格栅网、阳台防护网和隐私围挡', '["fence","wire-mesh"]', 8],
  ];
  defaultScenes.forEach(([icon, n_en, n_zh, d_en, d_zh, cats, sort]) => {
    db.run('INSERT INTO application_scenarios (icon, name_en, name_zh, description_en, description_zh, category_slugs, sort_weight) VALUES (?, ?, ?, ?, ?, ?, ?)', [icon, n_en, n_zh, d_en, d_zh, cats, sort]);
  });
  });

  // ── Seed about_timeline ──
  db.get('SELECT COUNT(*) as cnt FROM about_timeline', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const tl = [
    [2015, '🏭', 'Company Founded', '公司成立', 'Hebei Angu Wire Mesh Products Co., Ltd. officially registered in Anping - China\'s Wire Mesh Capital. Started with 8 team members, focused on gabion boxes and fencing.', '河北安固丝网制品有限公司在中国丝网之都--安平正式注册成立,初创团队8人,主营石笼网和护栏网。', 0],
    [2016, '🚢', 'First Export Order', '首次出口', 'Completed first international shipment via Tianjin Port to Southeast Asia. Passed SGS factory audit in the same year.', '完成首笔外贸订单,产品通过天津港发往东南亚市场,开启国际化之路。同年通过SGS工厂验厂。', 1],
    [2018, '📋', 'ISO 9001 Certified', 'ISO 9001 认证', 'Achieved ISO 9001:2015 quality management certification. Annual capacity reached 1,200 tons.', '获得ISO 9001:2015质量管理体系认证,建立从原材料到成品的全流程质检体系。年产能突破1,200吨。', 2],
    [2019, '🇪🇺', 'CE & ETAG 027 Certified', 'CE & ETAG 027 认证', 'Rockfall protection nets obtained CE and ETAG 027 European technical approval - unlocking the EU market.', '防护网产品获得欧盟CE认证和ETAG 027欧洲技术认证,打开欧洲市场大门。', 3],
    [2021, '🏗️', 'New Production Base', '新生产基地', 'Expanded to a 15,000 m2 modern facility with 6 automated gabion weaving lines. Annual capacity tripled to 3,500 tons.', '扩建至15,000m2现代化厂区,新增6条全自动石笼网编织线和2条焊接网生产线,年产能跃升至3,500吨。', 4],
    [2023, '🌍', 'Global Milestone', '全球化里程碑', 'Export coverage reached 30+ countries. Annual output surpassed 5,000 tons. Product catalog expanded to 9 categories.', '出口覆盖30+国家和地区,年产量突破5,000吨。产品拓展至声屏障、防爆墙、刀片刺绳等9大品类。', 5],
    [2024, '💻', 'Digital Transformation', '数字化升级', 'Deployed ERP management system and automated production scheduling. Digital response speed improved by 60%.', '部署ERP管理系统和自动化排产平台,上线多语种全球官网和24/7在线询盘系统,数字化响应速度提升60%。', 6],
    [2026, '🤖', 'Smart Manufacturing', '智能质造', 'Introduced AI-powered visual inspection and fully-automated welding robots. Initiated Green Factory upgrade program.', '引入AI视觉检测系统和全自动焊接机器人,质检效率提升3倍。启动绿色工厂升级计划,推进低碳制造。', 7],
  ];
  tl.forEach(([year, emoji, tEn, tZh, dEn, dZh, sort]) => {
    db.run('INSERT INTO about_timeline (year, emoji, title_en, title_zh, desc_en, desc_zh, sort_order) VALUES (?,?,?,?,?,?,?)', [year, emoji, tEn, tZh, dEn, dZh, sort]);
  });
  }
  });

  // ── Seed about_team ──
  db.get('SELECT COUNT(*) as cnt FROM about_team', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const t = [
    ['👩‍💼', 'Wang Fang', '王芳', 'Export Manager', '外贸经理', 'SE & South Asia', '东南亚 · 南亚', 'Thailand, Vietnam, Indonesia, India, Philippines', '泰国、越南、印尼、印度、菲律宾', '+86 186 3188 5501', '+86 186 3188 5501', 'wangfang@anguwiremesh.com', '10 years in foreign trade, fluent in English. 200+ overseas clients served.', '10年外贸经验,精通英语。负责东南亚及南亚市场,累计服务200+海外客户。', 0],
    ['👨‍💼', 'Liu Yang', '刘洋', 'Regional Sales Manager', '区域销售经理', 'Middle East & Africa', '中东 · 非洲', 'UAE, Saudi Arabia, Kenya, Nigeria, South Africa', '阿联酋、沙特、肯尼亚、尼日利亚、南非', '+86 186 3188 5502', '+86 186 3188 5502', 'liuyang@anguwiremesh.com', '8 years in Middle East & Africa markets. 50+ major projects delivered.', '8年中东非洲市场经验,熟悉当地建筑标准和贸易流程,完成50+大型工程项目。', 1],
    ['👩‍💼', 'Zhao Min', '赵敏', 'Regional Sales Manager', '区域销售经理', 'Europe & Americas', '欧洲 · 美洲', 'Germany, Spain, UK, Brazil, Chile', '德国、西班牙、英国、巴西、智利', '+86 186 3188 5503', '+86 186 3188 5503', 'zhaomin@anguwiremesh.com', 'Fluent in English and Spanish. Expert in CE/ETAG 027 compliance and technical sales.', '精通英语和西班牙语,熟悉CE/ETAG 027认证要求,擅长技术型客户开发和投标支持。', 2],
    ['👨‍💼', 'Sun Jie', '孙杰', 'Domestic Sales Manager', '国内销售经理', 'China & Asia-Pacific', '中国 · 亚太其他', 'China Mainland, Hong Kong, Taiwan, S. Korea, Japan', '中国大陆、香港、台湾、韩国、日本', '+86 186 3188 5504', '+86 186 3188 5504', 'sunjie@anguwiremesh.com', '12 years in domestic wire mesh sales. Full-service from selection to delivery.', '12年国内丝网销售经验,深耕工程承包商渠道,提供从选型到交付的全流程服务。', 3],
  ];
  t.forEach(([av, nEn, nZh, tiEn, tiZh, mEn, mZh, cEn, cZh, ph, wa, em, dEn, dZh, sort]) => {
    db.run('INSERT INTO about_team (avatar, name_en, name_zh, title_en, title_zh, market_en, market_zh, countries_en, countries_zh, phone, whatsapp, email, desc_en, desc_zh, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [av, nEn, nZh, tiEn, tiZh, mEn, mZh, cEn, cZh, ph, wa, em, dEn, dZh, sort]);
  });
  }
  });

  // ── Seed about_factory_images ──
  db.get('SELECT COUNT(*) as cnt FROM about_factory_images', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const imgs = [
    ['https://images.unsplash.com/photo-1565514020176-6c22d0e0739c?w=600&h=400&fit=crop', 'Gabion Production Line', '石笼网生产流水线', 0],
    ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', 'Wire Mesh Weaving Workshop', '金属丝网编织车间', 1],
    ['https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=600&h=400&fit=crop', 'Quality Inspection Lab', '质量检测实验室', 2],
    ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', 'Warehouse & Shipping Area', '仓储与发货区', 3],
  ];
  imgs.forEach(([url, altEn, altZh, sort]) => {
    db.run('INSERT INTO about_factory_images (image_url, alt_en, alt_zh, sort_order) VALUES (?,?,?,?)', [url, altEn, altZh, sort]);
  });
  }
  });

  // ── Seed about_certifications ──
  db.get('SELECT COUNT(*) as cnt FROM about_certifications', [], (err, row) => {
  if (!row || row.cnt === 0) {
  const certs = [
    ['📋', 'ISO 9001:2015', 'ISO 9001:2015', 'Quality Management System', '质量管理体系认证', 0],
    ['🇪🇺', 'CE Certified', 'CE 认证', 'European Conformity for Rockfall Nets', '落石防护网欧盟合规认证', 1],
    ['✅', 'ETAG 027', 'ETAG 027', 'European Technical Approval for Rockfall Systems', '落石防护系统欧洲技术认证', 2],
    ['🔬', 'SGS / BV', 'SGS / BV', 'Third-Party Inspection Available', '可提供第三方检验', 3],
  ];
  certs.forEach(([icon, nEn, nZh, dEn, dZh, sort]) => {
    db.run('INSERT INTO about_certifications (icon, name_en, name_zh, desc_en, desc_zh, sort_order) VALUES (?,?,?,?,?,?)', [icon, nEn, nZh, dEn, dZh, sort]);
  });
  }
  });

  // ── Seed about page SEO config ──
  const aboutSeoDefaults = [
    ['about_seo_title_en', 'About Angu Wire Mesh - ISO/CE Certified Manufacturer from China', '关于安固丝网 -- ISO/CE认证的中国丝网制造商'],
    ['about_seo_desc_en', 'Learn about Angu Wire Mesh: 15 years of wire mesh manufacturing, ISO 9001 & CE certified, exporting gabion boxes, fencing, and rockfall protection nets to 30+ countries from Anping, China.', '了解安固丝网:15年丝网制造经验,ISO 9001 & CE认证,石笼网箱、护栏网、防护网出口30+国家,位于中国丝网之都安平。'],
    ['about_seo_keywords_en', 'about Angu wire mesh, wire mesh manufacturer China, factory tour, ISO 9001, CE certified, gabion manufacturer, Anping wire mesh', '关于安固丝网,丝网制造商,工厂参观,ISO 9001认证,CE认证,石笼网厂家,安平丝网'],
    ['about_header_title_en', 'About Angu Wire Mesh', '关于安固丝网'],
    ['about_header_subtitle_en', '15 years of wire mesh manufacturing, ISO/CE certified, exported to 30+ countries.', '15年丝网制造经验,ISO/CE认证,出口30+国家。'],
    ['about_overview_title_en', 'Angu Wire Mesh - Manufacturer from China\'s Wire Mesh Capital', '安固丝网 - 中国丝网之都的制造商'],
    ['about_overview_p1_en', 'Angu Wire Mesh (Hebei Angu Wire Mesh Products Co., Ltd.) is headquartered in Anping - China\'s Wire Mesh Capital. We are an integrated manufacturer specializing in R&D, production, and export of gabion boxes, rockfall protection nets, fencing, noise barriers, barbed wire, and more across 9 product lines, with an annual capacity exceeding 5,000 tons.', '安固丝网(河北安固丝网制品有限公司)位于中国丝网之都--安平。我们是一家集研发、生产、销售于一体的金属丝网制造企业,主营石笼网箱、边坡防护网、护栏网、声屏障、刺绳等九大品类,年产能超过5,000吨。'],
    ['about_overview_p2_en', 'We hold ISO 9001:2015 quality management certification and CE product certification. Our products are exported to 30+ countries and regions across Southeast Asia, the Middle East, Africa, South America, and Europe, serving bridge, highway, mining, water conservancy, military, and landscaping projects.', '我们拥有ISO 9001:2015质量管理体系认证和CE产品认证,产品远销东南亚、中东、非洲、南美、欧洲等30多个国家和地区,广泛应用于桥梁、公路、矿山、水利、军事、园林等工程领域。'],
    ['about_section_label_en', 'About Us', '关于我们'],
    ['about_company_intro_title_en', 'Our Company', '公司概况'],
    ['about_timeline_title_en', 'Our Journey', '发展历程'],
    ['about_team_title_en', 'Sales Team', '业务团队'],
    ['about_team_subtitle_en', '4 regional managers covering major global markets. Your dedicated contact for localized service.', '4位区域业务经理,覆盖全球主要市场,为您提供本地化专业服务。'],
    ['about_factory_title_en', 'Our Factory', '我们的工厂'],
    ['about_factory_subtitle_en', 'A tour of our production facilities, quality control lab, and warehouse.', '参观我们的生产车间、质检实验室和仓库。'],
    ['about_cert_title_en', 'Certifications & Quality Assurance', '认证与质量保证'],
    ['about_why_us_title_en', 'Why Choose Angu?', '为什么选择安固?'],
    ['about_stats_label_en', 'Global Clients', '全球客户'],
  ];
  aboutSeoDefaults.forEach(([key, value, value_zh]) => {
    db.run('INSERT OR IGNORE INTO site_config (key, value_en, value_zh, value_vi, value_th) VALUES (?,?,?,?,?)', [key, value, value_zh, '', '']);
  });

  console.log('Database tables initialized');
  }); // end db.serialize
}

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Image upload endpoint
app.post('/api/admin/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// Log operation
function logOperation(userId, action, entityType, entityId, details) {
  db.run(
    'INSERT INTO operation_logs (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)',
    [userId, action, entityType, entityId, JSON.stringify(details)]
  );
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ========== AUTH ROUTES ==========
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: user.username });
  });
});

// ========== PRODUCT ROUTES ==========
app.get('/api/admin/products', authMiddleware, (req, res) => {
  const { status, category, search, page = 1, limit = 20 } = req.query;
  let sql = 'SELECT p.*, c.name_en as category_name_en, c.name_zh as category_name_zh FROM products p LEFT JOIN product_categories c ON p.category_slug = c.slug WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND p.status = ?';
    params.push(status);
  }
  if (category) {
    sql += ' AND p.category_slug = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND (p.name_en LIKE ? OR p.name_zh LIKE ? OR p.short_description_en LIKE ? OR p.short_description_zh LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ' ORDER BY p.sort_weight DESC, p.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ products: rows, page: parseInt(page), limit: parseInt(limit) });
  });
});

app.get('/api/admin/products/:id', authMiddleware, (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

app.post('/api/admin/products', authMiddleware, (req, res) => {
  const { slug, category_slug, name_en, name_zh, name_vi, name_th, short_description_en, short_description_zh, short_description_vi, short_description_th, description_en, description_zh, description_vi, description_th, price, unit, moq, sort_weight, status, is_featured, images, specifications_en, specifications_zh, specifications_vi, specifications_th, applications_en, applications_zh, applications_vi, applications_th, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th, faq_en, faq_zh, faq_vi, faq_th } = req.body;

  db.run(
    `INSERT INTO products (slug, category_slug, name_en, name_zh, name_vi, name_th, short_description_en, short_description_zh, short_description_vi, short_description_th, description_en, description_zh, description_vi, description_th, price, unit, moq, sort_weight, status, is_featured, images, specifications_en, specifications_zh, specifications_vi, specifications_th, applications_en, applications_zh, applications_vi, applications_th, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th, faq_en, faq_zh, faq_vi, faq_th)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [slug, category_slug, name_en, name_zh, name_vi || '', name_th || '', short_description_en || '', short_description_zh || '', short_description_vi || '', short_description_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', price, unit, moq, sort_weight || 0, status || 'draft', is_featured ? 1 : 0, JSON.stringify(images), JSON.stringify(specifications_en), JSON.stringify(specifications_zh), JSON.stringify(specifications_vi), JSON.stringify(specifications_th), JSON.stringify(applications_en), JSON.stringify(applications_zh), JSON.stringify(applications_vi), JSON.stringify(applications_th), seo_title_en || '', seo_title_zh || '', seo_title_vi || '', seo_title_th || '', seo_keywords_en || '', seo_keywords_zh || '', seo_keywords_vi || '', seo_keywords_th || '', seo_description_en || '', seo_description_zh || '', seo_description_vi || '', seo_description_th || '', faq_en || '[]', faq_zh || '[]', faq_vi || '[]', faq_th || '[]'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'product', this.lastID, { name_en, name_zh });
      res.json({ id: this.lastID, message: 'Product created' });
    }
  );
});

app.put('/api/admin/products/:id', authMiddleware, (req, res) => {
  const { category_slug, name_en, name_zh, name_vi, name_th, short_description_en, short_description_zh, short_description_vi, short_description_th, description_en, description_zh, description_vi, description_th, price, unit, moq, sort_weight, status, is_featured, images, specifications_en, specifications_zh, specifications_vi, specifications_th, applications_en, applications_zh, applications_vi, applications_th, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th, faq_en, faq_zh, faq_vi, faq_th } = req.body;
  
  db.run(
    `UPDATE products SET category_slug = ?, name_en = ?, name_zh = ?, name_vi = ?, name_th = ?, short_description_en = ?, short_description_zh = ?, short_description_vi = ?, short_description_th = ?, description_en = ?, description_zh = ?, description_vi = ?, description_th = ?, price = ?, unit = ?, moq = ?, sort_weight = ?, status = ?, is_featured = ?, images = ?, specifications_en = ?, specifications_zh = ?, specifications_vi = ?, specifications_th = ?, applications_en = ?, applications_zh = ?, applications_vi = ?, applications_th = ?, seo_title_en = ?, seo_title_zh = ?, seo_title_vi = ?, seo_title_th = ?, seo_keywords_en = ?, seo_keywords_zh = ?, seo_keywords_vi = ?, seo_keywords_th = ?, seo_description_en = ?, seo_description_zh = ?, seo_description_vi = ?, seo_description_th = ?, faq_en = ?, faq_zh = ?, faq_vi = ?, faq_th = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [category_slug, name_en, name_zh, name_vi || '', name_th || '', short_description_en || '', short_description_zh || '', short_description_vi || '', short_description_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', price, unit, moq, sort_weight, status, is_featured ? 1 : 0, JSON.stringify(images), JSON.stringify(specifications_en), JSON.stringify(specifications_zh), JSON.stringify(specifications_vi), JSON.stringify(specifications_th), JSON.stringify(applications_en), JSON.stringify(applications_zh), JSON.stringify(applications_vi), JSON.stringify(applications_th), seo_title_en || '', seo_title_zh || '', seo_title_vi || '', seo_title_th || '', seo_keywords_en || '', seo_keywords_zh || '', seo_keywords_vi || '', seo_keywords_th || '', seo_description_en || '', seo_description_zh || '', seo_description_vi || '', seo_description_th || '', faq_en || '[]', faq_zh || '[]', faq_vi || '[]', faq_th || '[]', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'product', req.params.id, { name_en });
      res.json({ message: 'Product updated' });
    }
  );
});

app.delete('/api/admin/products/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'product', req.params.id, {});
    res.json({ message: 'Product deleted' });
  });
});

// ========== PRODUCT CATEGORY ROUTES ==========
app.get('/api/admin/product-categories', authMiddleware, (req, res) => {
  db.all('SELECT * FROM product_categories ORDER BY sort_weight', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/product-categories', authMiddleware, (req, res) => {
  const { slug, name_en, name_zh, name_vi, name_th, thumbnail, sort_weight, status } = req.body;
  db.run(
    'INSERT INTO product_categories (slug, name_en, name_zh, name_vi, name_th, thumbnail, sort_weight, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [slug, name_en || '', name_zh || '', name_vi || '', name_th || '', thumbnail, sort_weight || 0, status || 'published'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'product_category', this.lastID, { name_en, name_zh, slug });
      res.json({ id: this.lastID, message: 'Category created' });
    }
  );
});

app.put('/api/admin/product-categories/:id', authMiddleware, (req, res) => {
  const { name_en, name_zh, name_vi, name_th, thumbnail, sort_weight, status } = req.body;
  db.run(
    'UPDATE product_categories SET name_en = ?, name_zh = ?, name_vi = ?, name_th = ?, thumbnail = ?, sort_weight = ?, status = ? WHERE id = ?',
    [name_en || '', name_zh || '', name_vi || '', name_th || '', thumbnail, sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'product_category', req.params.id, { name_en, name_zh });
      res.json({ message: 'Category updated' });
    }
  );
});

app.delete('/api/admin/product-categories/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM product_categories WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'product_category', req.params.id, {});
    res.json({ message: 'Category deleted' });
  });
});

// ========== BLOG ROUTES ==========
app.get('/api/admin/blog-posts', authMiddleware, (req, res) => {
  const { status, category, search, page = 1, limit = 20 } = req.query;
  let sql = 'SELECT b.*, c.name_en as category_name_en, c.name_zh as category_name_zh FROM blog_posts b LEFT JOIN blog_categories c ON b.category_slug = c.slug WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND b.status = ?';
    params.push(status);
  }
  if (category) {
    sql += ' AND b.category_slug = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND (b.title_en LIKE ? OR b.title_zh LIKE ? OR b.abstract_en LIKE ? OR b.abstract_zh LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ' ORDER BY b.publish_time DESC, b.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ posts: rows, page: parseInt(page), limit: parseInt(limit) });
  });
});

app.get('/api/admin/blog-posts/:id', authMiddleware, (req, res) => {
  db.get('SELECT * FROM blog_posts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json(row);
  });
});

app.post('/api/admin/blog-posts', authMiddleware, (req, res) => {
  const { slug, category_slug, title_en, title_zh, title_vi, title_th, abstract_en, abstract_zh, abstract_vi, abstract_th, content_en, content_zh, content_vi, content_th, cover_image, status, publish_time, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th } = req.body;

  db.run(
    `INSERT INTO blog_posts (slug, category_slug, title_en, title_zh, title_vi, title_th, abstract_en, abstract_zh, abstract_vi, abstract_th, content_en, content_zh, content_vi, content_th, cover_image, status, publish_time, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [slug, category_slug || '', title_en, title_zh, title_vi || '', title_th || '', abstract_en || '', abstract_zh || '', abstract_vi || '', abstract_th || '', content_en || '', content_zh || '', content_vi || '', content_th || '', cover_image || '', status || 'draft', publish_time || new Date().toISOString(), seo_title_en || '', seo_title_zh || '', seo_title_vi || '', seo_title_th || '', seo_keywords_en || '', seo_keywords_zh || '', seo_keywords_vi || '', seo_keywords_th || '', seo_description_en || '', seo_description_zh || '', seo_description_vi || '', seo_description_th || ''],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'blog', this.lastID, { title_en, title_zh });
      res.json({ id: this.lastID, message: 'Blog post created' });
    }
  );
});

app.put('/api/admin/blog-posts/:id', authMiddleware, (req, res) => {
  const { category_slug, title_en, title_zh, title_vi, title_th, abstract_en, abstract_zh, abstract_vi, abstract_th, content_en, content_zh, content_vi, content_th, cover_image, status, publish_time, seo_title_en, seo_title_zh, seo_title_vi, seo_title_th, seo_keywords_en, seo_keywords_zh, seo_keywords_vi, seo_keywords_th, seo_description_en, seo_description_zh, seo_description_vi, seo_description_th } = req.body;

  db.run(
    `UPDATE blog_posts SET category_slug = ?, title_en = ?, title_zh = ?, title_vi = ?, title_th = ?, abstract_en = ?, abstract_zh = ?, abstract_vi = ?, abstract_th = ?, content_en = ?, content_zh = ?, content_vi = ?, content_th = ?, cover_image = ?, status = ?, publish_time = ?, seo_title_en = ?, seo_title_zh = ?, seo_title_vi = ?, seo_title_th = ?, seo_keywords_en = ?, seo_keywords_zh = ?, seo_keywords_vi = ?, seo_keywords_th = ?, seo_description_en = ?, seo_description_zh = ?, seo_description_vi = ?, seo_description_th = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [category_slug || '', title_en, title_zh, title_vi || '', title_th || '', abstract_en || '', abstract_zh || '', abstract_vi || '', abstract_th || '', content_en || '', content_zh || '', content_vi || '', content_th || '', cover_image || '', status, publish_time, seo_title_en || '', seo_title_zh || '', seo_title_vi || '', seo_title_th || '', seo_keywords_en || '', seo_keywords_zh || '', seo_keywords_vi || '', seo_keywords_th || '', seo_description_en || '', seo_description_zh || '', seo_description_vi || '', seo_description_th || '', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'blog', req.params.id, { title_en, title_zh });
      res.json({ message: 'Blog post updated' });
    }
  );
});

app.delete('/api/admin/blog-posts/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM blog_posts WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'blog', req.params.id, {});
    res.json({ message: 'Blog post deleted' });
  });
});

// ========== BLOG CATEGORY ROUTES ==========
app.get('/api/admin/blog-categories', authMiddleware, (req, res) => {
  db.all('SELECT * FROM blog_categories ORDER BY sort_weight', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/blog-categories', authMiddleware, (req, res) => {
  const { slug, name_en, name_zh, sort_weight, status } = req.body;
  db.run(
    'INSERT INTO blog_categories (slug, name_en, name_zh, name_vi, name_th, sort_weight, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [slug, name_en || '', name_zh || '', name_vi || '', name_th || '', sort_weight || 0, status || 'published'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'blog_category', this.lastID, { name_en, name_zh, slug });
      res.json({ id: this.lastID, message: 'Blog category created' });
    }
  );
});

app.put('/api/admin/blog-categories/:id', authMiddleware, (req, res) => {
  const { name_en, name_zh, name_vi, name_th, sort_weight, status } = req.body;
  db.run(
    'UPDATE blog_categories SET name_en = ?, name_zh = ?, name_vi = ?, name_th = ?, sort_weight = ?, status = ? WHERE id = ?',
    [name_en || '', name_zh || '', name_vi || '', name_th || '', sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'blog_category', req.params.id, { name_en, name_zh });
      res.json({ message: 'Blog category updated' });
    }
  );
});

app.delete('/api/admin/blog-categories/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM blog_categories WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'blog_category', req.params.id, {});
    res.json({ message: 'Blog category deleted' });
  });
});

// ========== ADMIN USER MANAGEMENT ==========
app.get('/api/admin/admin-users', authMiddleware, (req, res) => {
  db.all('SELECT id, username, created_at FROM admin_users ORDER BY created_at', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/admin-users', authMiddleware, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const hash = bcrypt.hashSync(password, 10);
  db.run(
    'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
    [username, hash],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'admin_user', this.lastID, { username });
      res.json({ id: this.lastID, message: 'User created' });
    }
  );
});

app.put('/api/admin/admin-users/:id', authMiddleware, (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });
  const hash = bcrypt.hashSync(password, 10);
  db.run('UPDATE admin_users SET password_hash = ? WHERE id = ?', [hash, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'update', 'admin_user', req.params.id, {});
    res.json({ message: 'Password updated' });
  });
});

app.delete('/api/admin/admin-users/:id', authMiddleware, (req, res) => {
  if (parseInt(req.params.id) === 1) return res.status(400).json({ error: 'Cannot delete default admin' });
  db.run('DELETE FROM admin_users WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'admin_user', req.params.id, {});
    res.json({ message: 'User deleted' });
  });
});

// ========== OPERATION LOGS ==========
app.get('/api/admin/logs', authMiddleware, (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  db.all(
    'SELECT l.*, u.username FROM operation_logs l LEFT JOIN admin_users u ON l.user_id = u.id ORDER BY l.created_at DESC LIMIT ? OFFSET ?',
    [parseInt(limit), (parseInt(page) - 1) * parseInt(limit)],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// ========== PUBLIC API ROUTES (for frontend) ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/catalog - products with bilingual fields + categories for frontend
app.get('/api/catalog', (req, res) => {
  db.all("SELECT * FROM products WHERE status = 'published' ORDER BY sort_weight DESC, created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const products = rows.map(row => ({
      id: String(row.id),
      sku: row.slug,
      slug: row.slug,
      categorySlug: row.category_slug,
      names: { en: row.name_en || '', zh: row.name_zh || '', vi: row.name_vi || '', th: row.name_th || '' },
      shortDescriptions: { en: row.short_description_en || '', zh: row.short_description_zh || '', vi: row.short_description_vi || '', th: row.short_description_th || '' },
      fullDescriptions: { en: row.description_en || '', zh: row.description_zh || '', vi: row.description_vi || '', th: row.description_th || '' },
      images: safeJsonParse(row.images, []),
      specifications: safeJsonParse(row.specifications_en, {}),
      specifications_zh: safeJsonParse(row.specifications_zh, {}),
      specifications_vi: safeJsonParse(row.specifications_vi, {}),
      specifications_th: safeJsonParse(row.specifications_th, {}),
      applications: safeJsonParse(row.applications_en, []),
      applications_zh: safeJsonParse(row.applications_zh, []),
      applications_vi: safeJsonParse(row.applications_vi, []),
      applications_th: safeJsonParse(row.applications_th, []),
      seoTitle: { en: row.seo_title_en || '', zh: row.seo_title_zh || '', vi: row.seo_title_vi || '', th: row.seo_title_th || '' },
      seoKeywords: { en: row.seo_keywords_en || '', zh: row.seo_keywords_zh || '', vi: row.seo_keywords_vi || '', th: row.seo_keywords_th || '' },
      seoDescription: { en: row.seo_description_en || '', zh: row.seo_description_zh || '', vi: row.seo_description_vi || '', th: row.seo_description_th || '' },
      faq: { en: safeJsonParse(row.faq_en, []), zh: safeJsonParse(row.faq_zh, []), vi: safeJsonParse(row.faq_vi, []), th: safeJsonParse(row.faq_th, []) },
      priceUsd: row.price || undefined,
      priceRemark: row.unit || '',
      moq: row.moq || 0,
      isFeatured: row.is_featured === 1,
      sortWeight: row.sort_weight || 0,
      createdAt: row.created_at,
    }));

    db.all("SELECT * FROM product_categories WHERE status = 'published' ORDER BY sort_weight", [], (err2, catRows) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const categories = catRows.map(row => ({
        id: String(row.id),
        slug: row.slug,
        names: { en: row.name_en || '', zh: row.name_zh || '', vi: row.name_vi || '', th: row.name_th || '' },
        descriptions: {},
        image: row.thumbnail || undefined,
        sortWeight: row.sort_weight || 0,
      }));

      for (const cat of categories) {
        cat.productCount = products.filter((p) => p.categorySlug === cat.slug).length;
      }

      res.json({ products, categories });
    });
  });
});

// GET /api/catalog/:slug - single product detail
app.get('/api/catalog/:slug', (req, res) => {
  db.get("SELECT * FROM products WHERE slug = ? AND status = 'published'", [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });

    const product = {
      id: String(row.id),
      sku: row.slug,
      slug: row.slug,
      categorySlug: row.category_slug,
      names: { en: row.name_en || '', zh: row.name_zh || '', vi: row.name_vi || '', th: row.name_th || '' },
      shortDescriptions: { en: row.short_description_en || '', zh: row.short_description_zh || '', vi: row.short_description_vi || '', th: row.short_description_th || '' },
      fullDescriptions: { en: row.description_en || '', zh: row.description_zh || '', vi: row.description_vi || '', th: row.description_th || '' },
      images: safeJsonParse(row.images, []),
      specifications: safeJsonParse(row.specifications_en, {}),
      specifications_zh: safeJsonParse(row.specifications_zh, {}),
      specifications_vi: safeJsonParse(row.specifications_vi, {}),
      specifications_th: safeJsonParse(row.specifications_th, {}),
      applications: safeJsonParse(row.applications_en, []),
      applications_zh: safeJsonParse(row.applications_zh, []),
      applications_vi: safeJsonParse(row.applications_vi, []),
      applications_th: safeJsonParse(row.applications_th, []),
      seoTitle: { en: row.seo_title_en || '', zh: row.seo_title_zh || '', vi: row.seo_title_vi || '', th: row.seo_title_th || '' },
      seoKeywords: { en: row.seo_keywords_en || '', zh: row.seo_keywords_zh || '', vi: row.seo_keywords_vi || '', th: row.seo_keywords_th || '' },
      seoDescription: { en: row.seo_description_en || '', zh: row.seo_description_zh || '', vi: row.seo_description_vi || '', th: row.seo_description_th || '' },
      faq: { en: safeJsonParse(row.faq_en, []), zh: safeJsonParse(row.faq_zh, []), vi: safeJsonParse(row.faq_vi, []), th: safeJsonParse(row.faq_th, []) },
      priceUsd: row.price || undefined,
      priceRemark: row.unit || '',
      moq: row.moq || 0,
      isFeatured: row.is_featured === 1,
      sortWeight: row.sort_weight || 0,
      createdAt: row.created_at,
    };

    res.json(product);
  });
});

// ── Safe JSON parse helper ──
function safeJsonParse(str, fallback) {
  if (!str) return fallback;
  try { return JSON.parse(str); } catch { return fallback; }
}

app.get('/api/products', (req, res) => {
  const { category, featured } = req.query;
  let sql = 'SELECT * FROM products WHERE status = "published"';
  const params = [];

  if (category) {
    sql += ' AND category_slug = ?';
    params.push(category);
  }
  if (featured === 'true') {
    sql += ' AND is_featured = 1';
  }

  sql += ' ORDER BY sort_weight DESC, created_at DESC';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ products: rows });
  });
});

app.get('/api/products/:slug', (req, res) => {
  db.get('SELECT * FROM products WHERE slug = ?', [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

app.get('/api/blog-posts', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  let sql = 'SELECT * FROM blog_posts WHERE status = "published"';
  const params = [];

  if (category) {
    sql += ' AND category_slug = ?';
    params.push(category);
  }

  sql += ' ORDER BY publish_time DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit));
  params.push((parseInt(page) - 1) * parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ posts: rows });
  });
});

app.get('/api/blog-posts/:slug', (req, res) => {
  db.get('SELECT * FROM blog_posts WHERE slug = ? AND status = "published"', [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json(row);
  });
});

// ========== PUBLIC SITE CONFIG (frontend consumption) ==========
app.get('/api/site-config', (req, res) => {
  db.all('SELECT key, value_en, value_zh, value_vi, value_th FROM site_config', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const config = {};
    for (const r of rows) {
      config[r.key] = { en: r.value_en || '', zh: r.value_zh || '', vi: r.value_vi || '', th: r.value_th || '' };
    }

    // Also fetch banners
    db.all("SELECT * FROM banners WHERE status = 'published' ORDER BY sort_weight", [], (err2, bannerRows) => {
      const banners = (bannerRows || []).map(r => ({
        id: r.id,
        image: { en: r.image_en || '', zh: r.image_zh || '' },
        title: { en: r.title_en || '', zh: r.title_zh || '', vi: r.title_vi || '', th: r.title_th || '' },
        subtitle: { en: r.subtitle_en || '', zh: r.subtitle_zh || '', vi: r.subtitle_vi || '', th: r.subtitle_th || '' },
        ctaText: { en: r.cta_text_en || '', zh: r.cta_text_zh || '', vi: r.cta_text_vi || '', th: r.cta_text_th || '' },
        ctaLink: r.cta_link || '',
      }));

      db.all("SELECT * FROM why_choose_us WHERE status = 'published' ORDER BY sort_weight", [], (err3, wcuRows) => {
        const whyChooseUs = (wcuRows || []).map(r => ({
          id: r.id,
          icon: r.icon || '',
          title: { en: r.title_en || '', zh: r.title_zh || '', vi: r.title_vi || '', th: r.title_th || '' },
          description: { en: r.description_en || '', zh: r.description_zh || '', vi: r.description_vi || '', th: r.description_th || '' },
        }));

        db.all("SELECT * FROM application_scenarios WHERE status = 'published' ORDER BY sort_weight", [], (err4, sceneRows) => {
          const scenes = (sceneRows || []).map(r => ({
            id: r.id,
            icon: r.icon || '',
            name: { en: r.name_en || '', zh: r.name_zh || '', vi: r.name_vi || '', th: r.name_th || '' },
            description: { en: r.description_en || '', zh: r.description_zh || '', vi: r.description_vi || '', th: r.description_th || '' },
            categorySlugs: safeJsonParse(r.category_slugs, []),
          }));

          res.json({ config, banners, whyChooseUs, scenes });
        });
      });
    });
  });
});

// Submit inquiry (public)
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, company, country, quantity, message, productSlug, categorySlug, locale } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const inquiryNo = `INQ-${Date.now()}`;

    db.run(
      `INSERT INTO inquiries (inquiry_no, name, email, phone, company, country, quantity, message, product_slug, category_slug, locale)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [inquiryNo, name, email, phone || '', company || '', country || '', quantity || '', message, productSlug || '', categorySlug || '', locale || 'en'],
      async function(err) {
        if (err) {
          console.error('Database insert failed:', err);
          return res.status(500).json({ error: 'Failed to save inquiry.' });
        }

        if (process.env.SMTP_HOST) {
          try {
            await transporter.sendMail({
              from: process.env.SMTP_FROM || 'noreply@paiqi-wiremesh.com',
              to: process.env.NOTIFY_EMAIL || 'sales@paiqi-wiremesh.com',
              subject: `New Inquiry: ${inquiryNo} from ${name}`,
              html: `
                <h2>New Inquiry Received</h2>
                <p><strong>Inquiry No:</strong> ${inquiryNo}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Product:</strong> ${productSlug || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
              `
            });
          } catch (emailErr) {
            console.error('Email failed:', emailErr);
          }
        }

        res.json({ success: true, inquiryNo });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get inquiries (admin)
app.get('/api/inquiries', authMiddleware, (req, res) => {
  const { status, limit = 50, offset = 0 } = req.query;
  let sql = 'SELECT * FROM inquiries';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ inquiries: rows, count: rows.length });
  });
});

app.patch('/api/inquiries/:id', authMiddleware, (req, res) => {
  const { status } = req.body;
  db.run(
    'UPDATE inquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// ========== SITE CONFIG ADMIN ROUTES ==========
app.get('/api/admin/site-config', authMiddleware, (req, res) => {
  db.all('SELECT key, value_en, value_zh, value_vi, value_th, updated_at FROM site_config ORDER BY key', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.put('/api/admin/site-config', authMiddleware, (req, res) => {
  const entries = req.body; // { key1: {en, zh}, key2: ... }
  if (!entries || typeof entries !== 'object') return res.status(400).json({ error: 'Invalid body' });

  const stmt = db.prepare('INSERT INTO site_config (key, value_en, value_zh, value_vi, value_th) VALUES (?, ?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET value_en = excluded.value_en, value_zh = excluded.value_zh, value_vi = excluded.value_vi, value_th = excluded.value_th, updated_at = CURRENT_TIMESTAMP');
  let count = 0;
  for (const [key, val] of Object.entries(entries)) {
    if (typeof val === 'object') {
      stmt.run([key, val.en || '', val.zh || '', val.vi || '', val.th || '']);
      count++;
    }
  }
  stmt.finalize();
  logOperation(req.user.userId, 'update', 'site_config', 0, { count, keys: Object.keys(entries) });
  res.json({ message: `Updated ${count} config entries` });
});

// ========== BANNER ADMIN ROUTES ==========
app.get('/api/admin/banners', authMiddleware, (req, res) => {
  db.all('SELECT * FROM banners ORDER BY sort_weight', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/banners', authMiddleware, (req, res) => {
  const { sort_weight, image_en, image_zh, title_en, title_zh, title_vi, title_th, subtitle_en, subtitle_zh, subtitle_vi, subtitle_th, cta_text_en, cta_text_zh, cta_text_vi, cta_text_th, cta_link, status } = req.body;
  db.run(
    'INSERT INTO banners (sort_weight, image_en, image_zh, title_en, title_zh, title_vi, title_th, subtitle_en, subtitle_zh, subtitle_vi, subtitle_th, cta_text_en, cta_text_zh, cta_text_vi, cta_text_th, cta_link, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [sort_weight || 0, image_en || '', image_zh || '', title_en || '', title_zh || '', title_vi || '', title_th || '', subtitle_en || '', subtitle_zh || '', subtitle_vi || '', subtitle_th || '', cta_text_en || '', cta_text_zh || '', cta_text_vi || '', cta_text_th || '', cta_link || '', status || 'draft'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'banner', this.lastID, { title_en, title_zh });
      res.json({ id: this.lastID, message: 'Banner created' });
    }
  );
});

app.put('/api/admin/banners/:id', authMiddleware, (req, res) => {
  const { sort_weight, image_en, image_zh, title_en, title_zh, title_vi, title_th, subtitle_en, subtitle_zh, subtitle_vi, subtitle_th, cta_text_en, cta_text_zh, cta_text_vi, cta_text_th, cta_link, status } = req.body;
  db.run(
    'UPDATE banners SET sort_weight = ?, image_en = ?, image_zh = ?, title_en = ?, title_zh = ?, title_vi = ?, title_th = ?, subtitle_en = ?, subtitle_zh = ?, subtitle_vi = ?, subtitle_th = ?, cta_text_en = ?, cta_text_zh = ?, cta_text_vi = ?, cta_text_th = ?, cta_link = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [sort_weight || 0, image_en || '', image_zh || '', title_en || '', title_zh || '', title_vi || '', title_th || '', subtitle_en || '', subtitle_zh || '', subtitle_vi || '', subtitle_th || '', cta_text_en || '', cta_text_zh || '', cta_text_vi || '', cta_text_th || '', cta_link || '', status || 'draft', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'banner', req.params.id, { title_en, title_zh });
      res.json({ message: 'Banner updated' });
    }
  );
});

app.delete('/api/admin/banners/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM banners WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'banner', req.params.id, {});
    res.json({ message: 'Banner deleted' });
  });
});

// ========== WHY CHOOSE US ADMIN ROUTES ==========
app.get('/api/admin/why-choose-us', authMiddleware, (req, res) => {
  db.all('SELECT * FROM why_choose_us ORDER BY sort_weight', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/why-choose-us', authMiddleware, (req, res) => {
  const { icon, title_en, title_zh, title_vi, title_th, description_en, description_zh, description_vi, description_th, sort_weight, status } = req.body;
  db.run(
    'INSERT INTO why_choose_us (icon, title_en, title_zh, title_vi, title_th, description_en, description_zh, description_vi, description_th, sort_weight, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [icon || '', title_en || '', title_zh || '', title_vi || '', title_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', sort_weight || 0, status || 'published'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'why_choose_us', this.lastID, { title_en, title_zh });
      res.json({ id: this.lastID, message: 'Item created' });
    }
  );
});

app.put('/api/admin/why-choose-us/:id', authMiddleware, (req, res) => {
  const { icon, title_en, title_zh, title_vi, title_th, description_en, description_zh, description_vi, description_th, sort_weight, status } = req.body;
  db.run(
    'UPDATE why_choose_us SET icon = ?, title_en = ?, title_zh = ?, title_vi = ?, title_th = ?, description_en = ?, description_zh = ?, description_vi = ?, description_th = ?, sort_weight = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [icon || '', title_en || '', title_zh || '', title_vi || '', title_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'why_choose_us', req.params.id, { title_en, title_zh });
      res.json({ message: 'Item updated' });
    }
  );
});

app.delete('/api/admin/why-choose-us/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM why_choose_us WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'why_choose_us', req.params.id, {});
    res.json({ message: 'Item deleted' });
  });
});

// ========== APPLICATION SCENARIOS ADMIN ROUTES ==========
app.get('/api/admin/application-scenarios', authMiddleware, (req, res) => {
  db.all('SELECT * FROM application_scenarios ORDER BY sort_weight', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => ({ ...r, category_slugs: safeJsonParse(r.category_slugs, []) })));
  });
});

app.post('/api/admin/application-scenarios', authMiddleware, (req, res) => {
  const { icon, name_en, name_zh, name_vi, name_th, description_en, description_zh, description_vi, description_th, category_slugs, sort_weight, status } = req.body;
  const slugs = Array.isArray(category_slugs) ? JSON.stringify(category_slugs) : (category_slugs || '[]');
  db.run(
    'INSERT INTO application_scenarios (icon, name_en, name_zh, name_vi, name_th, description_en, description_zh, description_vi, description_th, category_slugs, sort_weight, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [icon || '', name_en || '', name_zh || '', name_vi || '', name_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', slugs, sort_weight || 0, status || 'published'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'scene', this.lastID, { name_en, name_zh });
      res.json({ id: this.lastID, message: 'Scene created' });
    }
  );
});

app.put('/api/admin/application-scenarios/:id', authMiddleware, (req, res) => {
  const { icon, name_en, name_zh, name_vi, name_th, description_en, description_zh, description_vi, description_th, category_slugs, sort_weight, status } = req.body;
  const slugs = Array.isArray(category_slugs) ? JSON.stringify(category_slugs) : (category_slugs || '[]');
  db.run(
    'UPDATE application_scenarios SET icon = ?, name_en = ?, name_zh = ?, name_vi = ?, name_th = ?, description_en = ?, description_zh = ?, description_vi = ?, description_th = ?, category_slugs = ?, sort_weight = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [icon || '', name_en || '', name_zh || '', name_vi || '', name_th || '', description_en || '', description_zh || '', description_vi || '', description_th || '', slugs, sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'scene', req.params.id, { name_en, name_zh });
      res.json({ message: 'Scene updated' });
    }
  );
});

app.delete('/api/admin/application-scenarios/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM application_scenarios WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    logOperation(req.user.userId, 'delete', 'scene', req.params.id, {});
    res.json({ message: 'Scene deleted' });
  });
});

// ========== ABOUT PAGE PUBLIC API ==========
app.get('/api/about-page-config', (req, res) => {
  db.serialize(() => {
    const result = { timeline: [], team: [], factoryImages: [], certifications: [], whyChooseUs: [], config: {} };

    db.all("SELECT * FROM about_timeline WHERE status = 'published' ORDER BY sort_order", [], (err, rows) => {
      if (!err) result.timeline = rows;

      db.all("SELECT * FROM about_team WHERE status = 'published' ORDER BY sort_order", [], (err2, rows2) => {
        if (!err2) result.team = rows2;

        db.all("SELECT * FROM about_factory_images WHERE status = 'published' ORDER BY sort_order", [], (err3, rows3) => {
          if (!err3) result.factoryImages = rows3;

          db.all("SELECT * FROM about_certifications WHERE status = 'published' ORDER BY sort_order", [], (err4, rows4) => {
            if (!err4) result.certifications = rows4;

            db.all("SELECT * FROM why_choose_us WHERE status = 'published' ORDER BY sort_weight", [], (err5, rows5) => {
              if (!err5) result.whyChooseUs = rows5;

              db.all("SELECT key, value_en, value_zh, value_vi, value_th FROM site_config WHERE key LIKE 'about_%'", [], (err6, rows6) => {
                if (!err6) rows6.forEach(r => { result.config[r.key] = r; });
                res.json(result);
              });
            });
          });
        });
      });
    });
  });
});

// ========== ABOUT TIMELINE ADMIN ==========
app.get('/api/admin/about-timeline', authMiddleware, (req, res) => {
  db.all('SELECT * FROM about_timeline ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/about-timeline', authMiddleware, (req, res) => {
  const { year, emoji, title_en, title_zh, title_vi, title_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('INSERT INTO about_timeline (year, emoji, title_en, title_zh, title_vi, title_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [year || 2025, emoji || '', title_en || '', title_zh || '', title_vi || '', title_th || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Timeline created' }); });
});

app.put('/api/admin/about-timeline/:id', authMiddleware, (req, res) => {
  const { year, emoji, title_en, title_zh, title_vi, title_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('UPDATE about_timeline SET year=?, emoji=?, title_en=?, title_zh=?, title_vi=?, title_th=?, desc_en=?, desc_zh=?, desc_vi=?, desc_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [year, emoji || '', title_en || '', title_zh || '', title_vi || '', title_th || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Timeline updated' }); });
});

app.delete('/api/admin/about-timeline/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM about_timeline WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Timeline deleted' });
  });
});

// ========== ABOUT TEAM ADMIN ==========
app.get('/api/admin/about-team', authMiddleware, (req, res) => {
  db.all('SELECT * FROM about_team ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/about-team', authMiddleware, (req, res) => {
  const { avatar, name_en, name_zh, name_vi, name_th, title_en, title_zh, title_vi, title_th, market_en, market_zh, market_vi, market_th, countries_en, countries_zh, countries_vi, countries_th, phone, whatsapp, email, facebook, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('INSERT INTO about_team (avatar, name_en, name_zh, name_vi, name_th, title_en, title_zh, title_vi, title_th, market_en, market_zh, market_vi, market_th, countries_en, countries_zh, countries_vi, countries_th, phone, whatsapp, email, facebook, desc_en, desc_zh, desc_vi, desc_th, sort_order, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [avatar || '', name_en || '', name_zh || '', name_vi || '', name_th || '', title_en || '', title_zh || '', title_vi || '', title_th || '', market_en || '', market_zh || '', market_vi || '', market_th || '', countries_en || '', countries_zh || '', countries_vi || '', countries_th || '', phone || '', whatsapp || '', email || '', facebook || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Team member created' }); });
});

app.put('/api/admin/about-team/:id', authMiddleware, (req, res) => {
  const { avatar, name_en, name_zh, name_vi, name_th, title_en, title_zh, title_vi, title_th, market_en, market_zh, market_vi, market_th, countries_en, countries_zh, countries_vi, countries_th, phone, whatsapp, email, facebook, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('UPDATE about_team SET avatar=?, name_en=?, name_zh=?, name_vi=?, name_th=?, title_en=?, title_zh=?, title_vi=?, title_th=?, market_en=?, market_zh=?, market_vi=?, market_th=?, countries_en=?, countries_zh=?, countries_vi=?, countries_th=?, phone=?, whatsapp=?, email=?, facebook=?, desc_en=?, desc_zh=?, desc_vi=?, desc_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [avatar || '', name_en || '', name_zh || '', name_vi || '', name_th || '', title_en || '', title_zh || '', title_vi || '', title_th || '', market_en || '', market_zh || '', market_vi || '', market_th || '', countries_en || '', countries_zh || '', countries_vi || '', countries_th || '', phone || '', whatsapp || '', email || '', facebook || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Team member updated' }); });
});

app.delete('/api/admin/about-team/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM about_team WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Team member deleted' });
  });
});

// ========== ABOUT FACTORY IMAGES ADMIN ==========
app.get('/api/admin/about-factory-images', authMiddleware, (req, res) => {
  db.all('SELECT * FROM about_factory_images ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/about-factory-images', authMiddleware, (req, res) => {
  const { image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status } = req.body;
  db.run('INSERT INTO about_factory_images (image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status) VALUES (?,?,?,?,?,?,?)',
    [image_url || '', alt_en || '', alt_zh || '', alt_vi || '', alt_th || '', sort_order || 0, status || 'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Factory image created' }); });
});

app.put('/api/admin/about-factory-images/:id', authMiddleware, (req, res) => {
  const { image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status } = req.body;
  db.run('UPDATE about_factory_images SET image_url=?, alt_en=?, alt_zh=?, alt_vi=?, alt_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [image_url || '', alt_en || '', alt_zh || '', alt_vi || '', alt_th || '', sort_order || 0, status || 'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Factory image updated' }); });
});

app.delete('/api/admin/about-factory-images/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM about_factory_images WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Factory image deleted' });
  });
});

// ========== ABOUT CERTIFICATIONS ADMIN ==========
app.get('/api/admin/about-certifications', authMiddleware, (req, res) => {
  db.all('SELECT * FROM about_certifications ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/about-certifications', authMiddleware, (req, res) => {
  const { icon, name_en, name_zh, name_vi, name_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('INSERT INTO about_certifications (icon, name_en, name_zh, name_vi, name_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [icon || '', name_en || '', name_zh || '', name_vi || '', name_th || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Certification created' }); });
});

app.put('/api/admin/about-certifications/:id', authMiddleware, (req, res) => {
  const { icon, name_en, name_zh, name_vi, name_th, desc_en, desc_zh, desc_vi, desc_th, sort_order, status } = req.body;
  db.run('UPDATE about_certifications SET icon=?, name_en=?, name_zh=?, name_vi=?, name_th=?, desc_en=?, desc_zh=?, desc_vi=?, desc_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [icon || '', name_en || '', name_zh || '', name_vi || '', name_th || '', desc_en || '', desc_zh || '', desc_vi || '', desc_th || '', sort_order || 0, status || 'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Certification updated' }); });
});

app.delete('/api/admin/about-certifications/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM about_certifications WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Certification deleted' });
  });
});

// ========== NOISE BARRIER: PUBLIC API ==========
// GET /api/noise-barrier-data — returns projects, factoryImages, certifications, config
app.get('/api/noise-barrier-data', (req, res) => {
  db.serialize(() => {
    const result = { projects: [], factoryImages: [], certifications: [], config: {} };

    db.all("SELECT * FROM noise_barrier_projects WHERE status = 'published' ORDER BY sort_order", [], (err, rows) => {
      if (!err) result.projects = rows || [];

      db.all("SELECT * FROM noise_barrier_factory_images WHERE status = 'published' ORDER BY sort_order", [], (err2, rows2) => {
        if (!err2) result.factoryImages = rows2 || [];

        // Noise-barrier-specific certifications (not rockfall/CE/ETAG)
        result.certifications = [
          { id:1, icon:'📋', name_en:'ISO 9001:2015', name_zh:'ISO 9001:2015', name_vi:'ISO 9001:2015', name_th:'ISO 9001:2015', desc_en:'Quality Management System', desc_zh:'质量管理体系认证', desc_vi:'Hệ Thống Quản Lý Chất Lượng', desc_th:'ระบบบริหารคุณภาพ' },
          { id:2, icon:'🔬', name_en:'SGS / BV Testing', name_zh:'SGS / BV 检测', name_vi:'Kiểm Tra SGS / BV', name_th:'ทดสอบโดย SGS / BV', desc_en:'3rd-Party Inspection Available', desc_zh:'第三方检测可提供', desc_vi:'Kiểm Tra Bên Thứ Ba', desc_th:'มีบริการตรวจสอบบุคคลที่สาม' },
          { id:3, icon:'🔊', name_en:'Acoustic Lab Tested', name_zh:'声学实验室检测', name_vi:'Kiểm Tra Phòng Lab', name_th:'ทดสอบในห้องปฏิบัติการเสียง', desc_en:'STC ≥38dB / NRC ≥0.85', desc_zh:'STC ≥38dB / NRC ≥0.85', desc_vi:'STC ≥38dB / NRC ≥0.85', desc_th:'STC ≥38dB / NRC ≥0.85' },
          { id:4, icon:'🧂', name_en:'Salt Spray >2000h', name_zh:'盐雾测试 >2000h', name_vi:'Phun Muối >2000h', name_th:'ทดสอบละอองเกลือ >2000ชม.', desc_en:'Hot-Dip Galvanized Durability', desc_zh:'热镀锌耐久验证', desc_vi:'Chống Ăn Mòn Mạ Kẽm', desc_th:'ความทนทานเคลือบสังกะสี' },
        ];

          db.all("SELECT key, value_en, value_zh, value_vi, value_th FROM site_config WHERE key LIKE 'noise_%'", [], (err4, rows4) => {
            if (!err4) {
              rows4.forEach(r => {
                result.config[r.key] = { en: r.value_en || '', zh: r.value_zh || '', vi: r.value_vi || '', th: r.value_th || '' };
              });
            }
            res.json(result);
          });
      });
    });
  });
});

// ========== NOISE BARRIER: ADMIN CRUD (Projects) ==========
app.get('/api/admin/noise-barrier-projects', authMiddleware, (req, res) => {
  db.all('SELECT * FROM noise_barrier_projects ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/noise-barrier-projects', authMiddleware, (req, res) => {
  const { image_url, title_en, title_zh, title_vi, title_th, location_en, location_zh, location_vi, location_th, spec_en, spec_zh, spec_vi, spec_th, sort_order, status } = req.body;
  db.run(`INSERT INTO noise_barrier_projects (image_url, title_en, title_zh, title_vi, title_th, location_en, location_zh, location_vi, location_th, spec_en, spec_zh, spec_vi, spec_th, sort_order, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [image_url||'', title_en||'', title_zh||'', title_vi||'', title_th||'', location_en||'', location_zh||'', location_vi||'', location_th||'', spec_en||'', spec_zh||'', spec_vi||'', spec_th||'', sort_order||0, status||'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Project created' }); });
});

app.put('/api/admin/noise-barrier-projects/:id', authMiddleware, (req, res) => {
  const { image_url, title_en, title_zh, title_vi, title_th, location_en, location_zh, location_vi, location_th, spec_en, spec_zh, spec_vi, spec_th, sort_order, status } = req.body;
  db.run(`UPDATE noise_barrier_projects SET image_url=?, title_en=?, title_zh=?, title_vi=?, title_th=?, location_en=?, location_zh=?, location_vi=?, location_th=?, spec_en=?, spec_zh=?, spec_vi=?, spec_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
    [image_url||'', title_en||'', title_zh||'', title_vi||'', title_th||'', location_en||'', location_zh||'', location_vi||'', location_th||'', spec_en||'', spec_zh||'', spec_vi||'', spec_th||'', sort_order||0, status||'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Project updated' }); });
});

app.delete('/api/admin/noise-barrier-projects/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM noise_barrier_projects WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Project deleted' });
  });
});

// ========== NOISE BARRIER: ADMIN CRUD (Factory Images) ==========
app.get('/api/admin/noise-barrier-factory-images', authMiddleware, (req, res) => {
  db.all('SELECT * FROM noise_barrier_factory_images ORDER BY sort_order', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/noise-barrier-factory-images', authMiddleware, (req, res) => {
  const { image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status } = req.body;
  db.run('INSERT INTO noise_barrier_factory_images (image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status) VALUES (?,?,?,?,?,?,?)',
    [image_url||'', alt_en||'', alt_zh||'', alt_vi||'', alt_th||'', sort_order||0, status||'published'],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ id: this.lastID, message: 'Factory image created' }); });
});

app.put('/api/admin/noise-barrier-factory-images/:id', authMiddleware, (req, res) => {
  const { image_url, alt_en, alt_zh, alt_vi, alt_th, sort_order, status } = req.body;
  db.run('UPDATE noise_barrier_factory_images SET image_url=?, alt_en=?, alt_zh=?, alt_vi=?, alt_th=?, sort_order=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
    [image_url||'', alt_en||'', alt_zh||'', alt_vi||'', alt_th||'', sort_order||0, status||'published', req.params.id],
    function(err) { if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Factory image updated' }); });
});

app.delete('/api/admin/noise-barrier-factory-images/:id', authMiddleware, (req, res) => {
  db.run('DELETE FROM noise_barrier_factory_images WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message }); res.json({ message: 'Factory image deleted' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Angu Admin API running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  db.close(() => process.exit(0));
});
