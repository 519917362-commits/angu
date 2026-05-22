const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost', 'https://paiqi-wiremesh.com'],
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));

// Initialize SQLite database
const db = new sqlite3.Database('./inquiries.db', (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to SQLite database');
    initDatabase();
  }
});

function initDatabase() {
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
  `, (err) => {
    if (err) console.error('Table creation failed:', err);
    else console.log('Inquiries table ready');
  });
}

// Email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit inquiry
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, company, country, quantity, message, productSlug, categorySlug, locale } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const inquiryNo = `INQ-${Date.now()}`;
    const inquiryData = {
      inquiryNo,
      name,
      email,
      phone: phone || '',
      company: company || '',
      country: country || '',
      quantity: quantity || '',
      message,
      productSlug: productSlug || '',
      categorySlug: categorySlug || '',
      locale: locale || 'en'
    };

    // Save to database
    db.run(
      `INSERT INTO inquiries (inquiry_no, name, email, phone, company, country, quantity, message, product_slug, category_slug, locale)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [inquiryNo, name, email, inquiryData.phone, inquiryData.company, inquiryData.country, 
       inquiryData.quantity, message, inquiryData.productSlug, inquiryData.categorySlug, inquiryData.locale],
      async function(err) {
        if (err) {
          console.error('Database insert failed:', err);
          return res.status(500).json({ error: 'Failed to save inquiry.' });
        }

        console.log('[New Inquiry]', JSON.stringify(inquiryData, null, 2));

        // Send email notification (non-blocking)
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
                <p><strong>Phone:</strong> ${inquiryData.phone || 'N/A'}</p>
                <p><strong>Company:</strong> ${inquiryData.company || 'N/A'}</p>
                <p><strong>Country:</strong> ${inquiryData.country || 'N/A'}</p>
                <p><strong>Quantity:</strong> ${inquiryData.quantity || 'N/A'}</p>
                <p><strong>Product:</strong> ${inquiryData.productSlug || 'N/A'}</p>
                <p><strong>Locale:</strong> ${inquiryData.locale}</p>
                <hr/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br/>')}</p>
                <hr/>
                <p><small>Received at: ${new Date().toISOString()}</small></p>
              `
            });
            console.log('[Email] Notification sent for', inquiryNo);
          } catch (emailErr) {
            console.error('[Email] Failed to send:', emailErr);
          }
        }

        res.json({
          success: true,
          message: 'Inquiry submitted successfully.',
          inquiryNo: inquiryNo
        });
      }
    );
  } catch (error) {
    console.error('[Inquiry Error]', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get inquiries (admin endpoint)
app.get('/api/inquiries', (req, res) => {
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
    if (err) {
      console.error('Query failed:', err);
      return res.status(500).json({ error: 'Failed to fetch inquiries.' });
    }
    res.json({ inquiries: rows, count: rows.length });
  });
});

// Update inquiry status
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required.' });
  }

  db.run(
    'UPDATE inquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        console.error('Update failed:', err);
        return res.status(500).json({ error: 'Failed to update inquiry.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }
      res.json({ success: true, message: 'Inquiry updated.' });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Paiqi Inquiry API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing database...');
  db.close(() => {
    process.exit(0);
  });
});
