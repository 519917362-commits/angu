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

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

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

const db = new sqlite3.Database('./inquiries.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
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
      name TEXT NOT NULL,
      short_description TEXT,
      description TEXT,
      price REAL,
      unit TEXT,
      moq INTEGER,
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      is_featured INTEGER DEFAULT 0,
      images TEXT,
      specifications TEXT,
      applications TEXT,
      seo_title TEXT,
      seo_keywords TEXT,
      seo_description TEXT,
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Product categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS product_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      thumbnail TEXT,
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Blog posts table
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      category_slug TEXT,
      title TEXT NOT NULL,
      abstract TEXT,
      content TEXT,
      cover_image TEXT,
      status TEXT DEFAULT 'draft',
      publish_time DATETIME,
      seo_title TEXT,
      seo_keywords TEXT,
      seo_description TEXT,
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(slug, locale)
    )
  `);

  // Blog categories table
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      sort_weight INTEGER DEFAULT 0,
      status TEXT DEFAULT 'published',
      locale TEXT DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

  // Insert default admin
  const defaultPassword = bcrypt.hashSync('admin123', 10);
  db.run(`
    INSERT OR IGNORE INTO admin_users (username, password_hash)
    VALUES ('admin', ?)
  `, [defaultPassword]);

  // Insert default product categories
  const defaultCategories = [
    ['gabion-mesh', 'Gabion Mesh', 1],
    ['protection-net', 'Protection Net', 2],
    ['hexagonal-mesh', 'Hexagonal Wire Mesh', 3],
    ['chain-link-fence', 'Chain Link Fence', 4]
  ];
  defaultCategories.forEach(([slug, name, sort]) => {
    db.run(`INSERT OR IGNORE INTO product_categories (slug, name, sort_weight, status) VALUES (?, ?, ?, 'published')`, [slug, name, sort]);
  });

  // Insert default blog categories
  const defaultBlogCategories = [
    ['gabion-knowledge', 'Gabion Knowledge'],
    ['project-cases', 'Project Cases'],
    ['industry-news', 'Industry News'],
    ['installation-guide', 'Installation Guide']
  ];
  defaultBlogCategories.forEach(([slug, name]) => {
    db.run(`INSERT OR IGNORE INTO blog_categories (slug, name, status) VALUES (?, ?, 'published')`, [slug, name]);
  });

  console.log('Database tables initialized');
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
  const { locale = 'en', status, category, search, page = 1, limit = 20 } = req.query;
  let sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN product_categories c ON p.category_slug = c.slug WHERE p.locale = ?';
  const params = [locale];

  if (status) {
    sql += ' AND p.status = ?';
    params.push(status);
  }
  if (category) {
    sql += ' AND p.category_slug = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND (p.name LIKE ? OR p.short_description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
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
  const { slug, category_slug, name, short_description, description, price, unit, moq, sort_weight, status, is_featured, images, specifications, applications, seo_title, seo_keywords, seo_description, locale } = req.body;
  
  db.run(
    `INSERT INTO products (slug, category_slug, name, short_description, description, price, unit, moq, sort_weight, status, is_featured, images, specifications, applications, seo_title, seo_keywords, seo_description, locale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [slug, category_slug, name, short_description, description, price, unit, moq, sort_weight || 0, status || 'draft', is_featured ? 1 : 0, JSON.stringify(images), JSON.stringify(specifications), JSON.stringify(applications), seo_title, seo_keywords, seo_description, locale || 'en'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'product', this.lastID, { name, locale });
      res.json({ id: this.lastID, message: 'Product created' });
    }
  );
});

app.put('/api/admin/products/:id', authMiddleware, (req, res) => {
  const { category_slug, name, short_description, description, price, unit, moq, sort_weight, status, is_featured, images, specifications, applications, seo_title, seo_keywords, seo_description } = req.body;
  
  db.run(
    `UPDATE products SET category_slug = ?, name = ?, short_description = ?, description = ?, price = ?, unit = ?, moq = ?, sort_weight = ?, status = ?, is_featured = ?, images = ?, specifications = ?, applications = ?, seo_title = ?, seo_keywords = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [category_slug, name, short_description, description, price, unit, moq, sort_weight, status, is_featured ? 1 : 0, JSON.stringify(images), JSON.stringify(specifications), JSON.stringify(applications), seo_title, seo_keywords, seo_description, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'product', req.params.id, { name });
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
  const { locale = 'en' } = req.query;
  db.all('SELECT * FROM product_categories WHERE locale = ? ORDER BY sort_weight', [locale], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/product-categories', authMiddleware, (req, res) => {
  const { slug, name, thumbnail, sort_weight, status, locale } = req.body;
  db.run(
    'INSERT INTO product_categories (slug, name, thumbnail, sort_weight, status, locale) VALUES (?, ?, ?, ?, ?, ?)',
    [slug, name, thumbnail, sort_weight || 0, status || 'published', locale || 'en'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'product_category', this.lastID, { name, slug });
      res.json({ id: this.lastID, message: 'Category created' });
    }
  );
});

app.put('/api/admin/product-categories/:id', authMiddleware, (req, res) => {
  const { name, thumbnail, sort_weight, status } = req.body;
  db.run(
    'UPDATE product_categories SET name = ?, thumbnail = ?, sort_weight = ?, status = ? WHERE id = ?',
    [name, thumbnail, sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'product_category', req.params.id, { name });
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
  const { locale = 'en', status, category, search, page = 1, limit = 20 } = req.query;
  let sql = 'SELECT b.*, c.name as category_name FROM blog_posts b LEFT JOIN blog_categories c ON b.category_slug = c.slug WHERE b.locale = ?';
  const params = [locale];

  if (status) {
    sql += ' AND b.status = ?';
    params.push(status);
  }
  if (category) {
    sql += ' AND b.category_slug = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND (b.title LIKE ? OR b.abstract LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
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
  const { slug, category_slug, title, abstract, content, cover_image, status, publish_time, seo_title, seo_keywords, seo_description, locale } = req.body;
  
  db.run(
    `INSERT INTO blog_posts (slug, category_slug, title, abstract, content, cover_image, status, publish_time, seo_title, seo_keywords, seo_description, locale)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [slug, category_slug, title, abstract, content, cover_image, status || 'draft', publish_time || new Date().toISOString(), seo_title, seo_keywords, seo_description, locale || 'en'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'blog', this.lastID, { title, locale });
      res.json({ id: this.lastID, message: 'Blog post created' });
    }
  );
});

app.put('/api/admin/blog-posts/:id', authMiddleware, (req, res) => {
  const { category_slug, title, abstract, content, cover_image, status, publish_time, seo_title, seo_keywords, seo_description } = req.body;
  
  db.run(
    `UPDATE blog_posts SET category_slug = ?, title = ?, abstract = ?, content = ?, cover_image = ?, status = ?, publish_time = ?, seo_title = ?, seo_keywords = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [category_slug, title, abstract, content, cover_image, status, publish_time, seo_title, seo_keywords, seo_description, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'blog', req.params.id, { title });
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
  const { locale = 'en' } = req.query;
  db.all('SELECT * FROM blog_categories WHERE locale = ? ORDER BY sort_weight', [locale], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/admin/blog-categories', authMiddleware, (req, res) => {
  const { slug, name, sort_weight, status, locale } = req.body;
  db.run(
    'INSERT INTO blog_categories (slug, name, sort_weight, status, locale) VALUES (?, ?, ?, ?, ?)',
    [slug, name, sort_weight || 0, status || 'published', locale || 'en'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'create', 'blog_category', this.lastID, { name, slug });
      res.json({ id: this.lastID, message: 'Blog category created' });
    }
  );
});

app.put('/api/admin/blog-categories/:id', authMiddleware, (req, res) => {
  const { name, sort_weight, status } = req.body;
  db.run(
    'UPDATE blog_categories SET name = ?, sort_weight = ?, status = ? WHERE id = ?',
    [name, sort_weight || 0, status || 'published', req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      logOperation(req.user.userId, 'update', 'blog_category', req.params.id, { name });
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

app.get('/api/products', (req, res) => {
  const { locale = 'en', category, featured } = req.query;
  let sql = 'SELECT * FROM products WHERE locale = ? AND status = "published"';
  const params = [locale];

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
  const { locale = 'en' } = req.query;
  db.get('SELECT * FROM products WHERE slug = ? AND locale = ?', [req.params.slug, locale], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

app.get('/api/blog-posts', (req, res) => {
  const { locale = 'en', category, page = 1, limit = 10 } = req.query;
  let sql = 'SELECT * FROM blog_posts WHERE locale = ? AND status = "published"';
  const params = [locale];

  if (category) {
    sql += ' AND category_slug = ?';
    params.push(category);
  }

  sql += ' ORDER BY publish_time DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ posts: rows });
  });
});

app.get('/api/blog-posts/:slug', (req, res) => {
  const { locale = 'en' } = req.query;
  db.get('SELECT * FROM blog_posts WHERE slug = ? AND locale = ?', [req.params.slug, locale], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Post not found' });
    res.json(row);
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

// Start server
app.listen(PORT, () => {
  console.log(`Angu Admin API running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  db.close(() => process.exit(0));
});
