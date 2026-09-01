'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';

export const dynamic = 'force-dynamic';

interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_zh: string;
}

interface SpecRow { key: string; value: string; }

interface Props {
  params: Promise<{ id: string }>;
}

const fieldCls = 'w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all';
const labelCls = 'block text-sm font-medium mb-1 text-gray-600';

const SECTION_KEYS = ['basic','name','desc','price','images','specs','apps','seo','status'] as const;
const SECTION_LABELS: Record<string, string> = {
  basic: 'Basic', name: 'Name', desc: 'Description', price: 'Price',
  images: 'Images', specs: 'Specs', apps: 'Applications', seo: 'SEO', status: 'Status',
};

export default function ProductEditPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [token, setToken] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Structured editors
  const [specsEn, setSpecsEn] = useState<SpecRow[]>([]);
  const [specsZh, setSpecsZh] = useState<SpecRow[]>([]);
  const [specsVi, setSpecsVi] = useState<SpecRow[]>([]);
  const [specsTh, setSpecsTh] = useState<SpecRow[]>([]);
  const [appsEn, setAppsEn] = useState<string[]>([]);
  const [appsZh, setAppsZh] = useState<string[]>([]);
  const [appsVi, setAppsVi] = useState<string[]>([]);
  const [appsTh, setAppsTh] = useState<string[]>([]);

  // Accordion: Basic / Name / Description open by default
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['basic', 'name', 'desc'])
  );

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section); else next.add(section);
      return next;
    });
  };

  const isOpen = (section: string) => openSections.has(section);

  const scrollToSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        // Already open — just scroll
        const el = document.getElementById(`section-${section}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return prev;
      }
      next.add(section);
      // Open then scroll (rAF ensures DOM update)
      requestAnimationFrame(() => {
        const el = document.getElementById(`section-${section}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return next;
    });
  };

  const [form, setForm] = useState({
    slug: '',
    category_slug: '',
    name_en: '', name_zh: '', name_vi: '', name_th: '',
    short_description_en: '', short_description_zh: '', short_description_vi: '', short_description_th: '',
    description_en: '', description_zh: '', description_vi: '', description_th: '',
    price: '', unit: 'USD', moq: '', sort_weight: '0',
    status: 'draft', is_featured: false,
    seo_title_en: '', seo_title_zh: '', seo_title_vi: '', seo_title_th: '',
    seo_keywords_en: '', seo_keywords_zh: '', seo_keywords_vi: '', seo_keywords_th: '',
    seo_description_en: '', seo_description_zh: '', seo_description_vi: '', seo_description_th: '',
  });

  // ── Auth ──
  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (!stored) { router.push('/admin'); return; }
    setToken(stored);
  }, [router]);

  // ── Load categories ──
  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/product-categories', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, [token]);

  // ── Load product (edit mode) ──
  useEffect(() => {
    if (!token || isNew) { setLoading(false); return; }

    fetch(`/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      const p = data.product ?? data;
      if (!p || !p.id) { setLoading(false); return; }

      let imgsArr: string[] = [];
      try { imgsArr = JSON.parse(p.images || '[]'); } catch { /* keep [] */ }
      setImageList(imgsArr);

      // Parse specs JSON → key-value rows
      const parseSpecs = (raw: string): SpecRow[] => {
        try {
          const obj = JSON.parse(raw);
          return Object.entries(obj).map(([k, v]) => ({ key: k, value: String(v) }));
        } catch { return []; }
      };
      setSpecsEn(parseSpecs(p.specifications_en || '{}'));
      setSpecsZh(parseSpecs(p.specifications_zh || '{}'));
      setSpecsVi(parseSpecs(p.specifications_vi || '{}'));
      setSpecsTh(parseSpecs(p.specifications_th || '{}'));

      // Parse apps JSON → string[ ]
      const parseApps = (raw: string): string[] => {
        try { return JSON.parse(raw); } catch { return []; }
      };
      setAppsEn(parseApps(p.applications_en || '[]'));
      setAppsZh(parseApps(p.applications_zh || '[]'));
      setAppsVi(parseApps(p.applications_vi || '[]'));
      setAppsTh(parseApps(p.applications_th || '[]'));

      setForm({
        slug: p.slug || '',
        category_slug: p.category_slug || '',
        name_en: p.name_en || '', name_zh: p.name_zh || '', name_vi: p.name_vi || '', name_th: p.name_th || '',
        short_description_en: p.short_description_en || '', short_description_zh: p.short_description_zh || '', short_description_vi: p.short_description_vi || '', short_description_th: p.short_description_th || '',
        description_en: p.description_en || '', description_zh: p.description_zh || '', description_vi: p.description_vi || '', description_th: p.description_th || '',
        price: p.price?.toString() || '', unit: p.unit || 'USD',
        moq: p.moq?.toString() || '', sort_weight: p.sort_weight?.toString() || '0',
        status: p.status || 'draft', is_featured: !!p.is_featured,
        seo_title_en: p.seo_title_en || '', seo_title_zh: p.seo_title_zh || '', seo_title_vi: p.seo_title_vi || '', seo_title_th: p.seo_title_th || '',
        seo_keywords_en: p.seo_keywords_en || '', seo_keywords_zh: p.seo_keywords_zh || '', seo_keywords_vi: p.seo_keywords_vi || '', seo_keywords_th: p.seo_keywords_th || '',
        seo_description_en: p.seo_description_en || '', seo_description_zh: p.seo_description_zh || '', seo_description_vi: p.seo_description_vi || '', seo_description_th: p.seo_description_th || '',
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token, id, isNew]);

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const specsToObj = (rows: SpecRow[]): Record<string, string> => {
      const obj: Record<string, string> = {};
      rows.forEach(r => { if (r.key.trim()) obj[r.key.trim()] = r.value; });
      return obj;
    };

    const payload = {
      slug: form.slug,
      category_slug: form.category_slug,
      name_en: form.name_en, name_zh: form.name_zh, name_vi: form.name_vi, name_th: form.name_th,
      short_description_en: form.short_description_en, short_description_zh: form.short_description_zh, short_description_vi: form.short_description_vi, short_description_th: form.short_description_th,
      description_en: form.description_en, description_zh: form.description_zh, description_vi: form.description_vi, description_th: form.description_th,
      price: parseFloat(form.price) || 0, unit: form.unit,
      moq: parseInt(form.moq) || 0, sort_weight: parseInt(form.sort_weight) || 0,
      status: form.status, is_featured: form.is_featured,
      images: imageList,
      specifications_en: specsToObj(specsEn), specifications_zh: specsToObj(specsZh), specifications_vi: specsToObj(specsVi), specifications_th: specsToObj(specsTh),
      applications_en: appsEn.filter(Boolean), applications_zh: appsZh.filter(Boolean), applications_vi: appsVi.filter(Boolean), applications_th: appsTh.filter(Boolean),
      seo_title_en: form.seo_title_en, seo_title_zh: form.seo_title_zh, seo_title_vi: form.seo_title_vi, seo_title_th: form.seo_title_th,
      seo_keywords_en: form.seo_keywords_en, seo_keywords_zh: form.seo_keywords_zh, seo_keywords_vi: form.seo_keywords_vi, seo_keywords_th: form.seo_keywords_th,
      seo_description_en: form.seo_description_en, seo_description_zh: form.seo_description_zh, seo_description_vi: form.seo_description_vi, seo_description_th: form.seo_description_th,
    };

    const url = isNew ? '/api/admin/products' : `/api/admin/products/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push('/admin?tab=products');
      } else {
        const err = await res.json();
        setError(err.error || 'Save failed');
        setSaving(false);
      }
    } catch {
      setError('Network error');
      setSaving(false);
    }
  };

  // ── Specs helpers ──
  const addSpecRow = (lang: 'en' | 'zh' | 'vi' | 'th', initKey = '') => {
    const setter = lang === 'en' ? setSpecsEn : lang === 'zh' ? setSpecsZh : lang === 'vi' ? setSpecsVi : setSpecsTh;
    setter(prev => [...prev, { key: initKey, value: '' }]);
  };
  const removeSpecRow = (lang: 'en' | 'zh' | 'vi' | 'th', idx: number) => {
    const setter = lang === 'en' ? setSpecsEn : lang === 'zh' ? setSpecsZh : lang === 'vi' ? setSpecsVi : setSpecsTh;
    setter(prev => prev.filter((_, i) => i !== idx));
  };
  const updateSpecRow = (lang: 'en' | 'zh' | 'vi' | 'th', idx: number, field: 'key' | 'value', val: string) => {
    const setter = lang === 'en' ? setSpecsEn : lang === 'zh' ? setSpecsZh : lang === 'vi' ? setSpecsVi : setSpecsTh;
    setter(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  // ── Apps helpers ──
  const addAppRow = (lang: 'en' | 'zh' | 'vi' | 'th') => {
    const setter = lang === 'en' ? setAppsEn : lang === 'zh' ? setAppsZh : lang === 'vi' ? setAppsVi : setAppsTh;
    setter(prev => [...prev, '']);
  };
  const removeAppRow = (lang: 'en' | 'zh' | 'vi' | 'th', idx: number) => {
    const setter = lang === 'en' ? setAppsEn : lang === 'zh' ? setAppsZh : lang === 'vi' ? setAppsVi : setAppsTh;
    setter(prev => prev.filter((_, i) => i !== idx));
  };
  const updateAppRow = (lang: 'en' | 'zh' | 'vi' | 'th', idx: number, val: string) => {
    const setter = lang === 'en' ? setAppsEn : lang === 'zh' ? setAppsZh : lang === 'vi' ? setAppsVi : setAppsTh;
    setter(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  // ── Section header ──
  const SectionHeader = ({ id, title, badge }: { id: string; title: string; badge?: string }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-3 px-5 bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors text-left select-none"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        {badge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
            {badge}
          </span>
        )}
      </div>
      <svg
        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen(id) ? 'rotate-180' : ''}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  // ── Quad-lingual inputs ──
  const QiInput = ({ enVal, zhVal, viVal, thVal, onEn, onZh, onVi, onTh, required, placeholder }: {
    enVal: string; zhVal: string; viVal: string; thVal: string;
    onEn: (v: string) => void; onZh: (v: string) => void; onVi: (v: string) => void; onTh: (v: string) => void;
    required?: boolean; placeholder?: string;
  }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: 'EN', val: enVal, on: onEn },
         { label: 'ZH', val: zhVal, on: onZh },
         { label: 'VI', val: viVal, on: onVi },
         { label: 'TH', val: thVal, on: onTh },
      ].map(({ label, val, on }) => (
        <div key={label}>
          <label className="text-[11px] font-medium text-gray-400 mb-1 block">{label}</label>
          <input value={val} onChange={e => on(e.target.value)} className={fieldCls}
            required={required} placeholder={placeholder ? `${placeholder} (${label})` : undefined} />
        </div>
      ))}
    </div>
  );

  const QiTextarea = ({ enVal, zhVal, viVal, thVal, onEn, onZh, onVi, onTh, rows = 5, required }: {
    enVal: string; zhVal: string; viVal: string; thVal: string;
    onEn: (v: string) => void; onZh: (v: string) => void; onVi: (v: string) => void; onTh: (v: string) => void;
    rows?: number; required?: boolean;
  }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: 'EN', val: enVal, on: onEn },
         { label: 'ZH', val: zhVal, on: onZh },
         { label: 'VI', val: viVal, on: onVi },
         { label: 'TH', val: thVal, on: onTh },
      ].map(({ label, val, on }) => (
        <div key={label}>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[11px] font-medium text-gray-400">{label}</label>
            <span className="text-[10px] text-gray-300 tabular-nums">{val.length} chars</span>
          </div>
          <textarea value={val} onChange={e => on(e.target.value)} className={fieldCls}
            rows={rows} required={required} />
        </div>
      ))}
    </div>
  );

  // ── Specs key-value editor ──
  const SpecsEditor = ({ rows, onAdd, onRemove, onUpdate }: {
    rows: SpecRow[];
    onAdd: (initKey?: string) => void; onRemove: (idx: number) => void;
    onUpdate: (idx: number, field: 'key' | 'value', val: string) => void;
  }) => (
    <div>
      {/* Table header */}
      {rows.length > 0 && (
        <div className="flex gap-2 mb-1.5 px-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex-[1]">Parameter</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider flex-[2]">Value</span>
          <span className="w-5" />
        </div>
      )}

      {/* Rows */}
      <div className="space-y-1.5">
        {rows.length === 0 && (
          <p className="text-xs text-gray-400 italic py-2">No specs yet — click &ldquo;+ Add&rdquo; below.</p>
        )}
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-start group">
            <input
              value={row.key}
              onChange={e => onUpdate(i, 'key', e.target.value)}
              className={`${fieldCls} flex-[1] bg-gray-50 font-medium text-sm`}
              placeholder="Parameter name"
            />
            <input
              value={row.value}
              onChange={e => onUpdate(i, 'value', e.target.value)}
              className={`${fieldCls} flex-[2]`}
              placeholder="Parameter value"
            />
            <button
              type="button" onClick={() => onRemove(i)}
              className="w-5 h-5 flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-red-500 text-xs leading-none mt-1.5 opacity-0 group-hover:opacity-100 transition-all"
              title="Delete row"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add button + quick presets */}
      <div className="flex items-center gap-3 mt-2.5">
        <button type="button" onClick={() => onAdd()}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
          <span className="text-base leading-none">+</span> Add
        </button>
        <div className="h-3 w-px bg-gray-200" />
        {[
          { k: 'Material', v: '' },
          { k: 'Wire Diameter', v: '' },
          { k: 'Mesh Size', v: '' },
          { k: 'Surface Treatment', v: '' },
          { k: 'Standard', v: '' },
        ].map(p => (
          <button
            key={p.k}
            type="button"
            disabled={rows.some(r => r.key === p.k)}
            onClick={() => onAdd(p.k)}
            className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
              rows.some(r => r.key === p.k)
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            + {p.k}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Apps list editor ──
  const AppsEditor = ({ rows, onAdd, onRemove, onUpdate }: {
    rows: string[];
    onAdd: () => void; onRemove: (idx: number) => void;
    onUpdate: (idx: number, val: string) => void;
  }) => (
    <div className="space-y-2">
      {rows.length === 0 && (
        <p className="text-xs text-gray-400 italic py-2">No applications yet — click &ldquo;+ Add&rdquo; to add.</p>
      )}
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2 items-start group">
          <span className="text-xs text-gray-400 mt-2 w-5 text-right font-mono">{i + 1}</span>
          <input
            value={row}
            onChange={e => onUpdate(i, e.target.value)}
            className={`${fieldCls} flex-1`}
            placeholder="Application scenario"
          />
          <button
            type="button" onClick={() => onRemove(i)}
            className="text-gray-300 hover:text-red-500 text-lg leading-none mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={onAdd}
        className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1 inline-flex items-center gap-1">
        <span className="text-base leading-none">+</span> Add application
      </button>
    </div>
  );

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );

  // ── Render ──
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin?tab=products')}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {isNew ? '新建产品 New Product' : `编辑 Edit: ${form.name_en || form.name_zh || `#${id}`}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-600 text-sm">⚠ {error}</span>}
          <button
            type="button"
            onClick={() => router.push('/admin?tab=products')}
            className="px-4 py-2 text-sm rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          >
            取消 Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {saving ? '保存中 Saving...' : (isNew ? '创建 Create' : '更新 Update')}
          </button>
        </div>
      </div>

      {/* ── Quick nav pills ── */}
      <div className="bg-white border-b px-6 py-2.5 flex items-center gap-1.5 overflow-x-auto">
        {SECTION_KEYS.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => scrollToSection(s)}
            className={`text-[11px] px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors ${
              isOpen(s)
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      {/* ── Form body ── */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-5xl mx-auto w-full p-6 space-y-3" id="product-form">
        {/* 1. Basic Info */}
        <div id="section-basic" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="basic" title="基本信息 Basic Information" badge={form.category_slug || undefined} />
          {isOpen('basic') && (
            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Slug <span className="text-red-400">*</span></label>
                <input
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  className={fieldCls} required disabled={!isNew}
                  placeholder="product-slug"
                />
                {!isNew && <p className="text-[10px] text-gray-400 mt-1">Slug cannot be changed after creation.</p>}
              </div>
              <div>
                <label className={labelCls}>Category <span className="text-red-400">*</span></label>
                <select
                  value={form.category_slug}
                  onChange={e => setForm({ ...form, category_slug: e.target.value })}
                  className={fieldCls} required
                >
                  <option value="">— Select —</option>
                  {categories.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name_en} / {c.name_zh}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 2. Product Name */}
        <div id="section-name" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="name" title="产品名称 Product Name" badge="required" />
          {isOpen('name') && (
            <div className="p-5">
              <QiInput
                enVal={form.name_en} zhVal={form.name_zh} viVal={form.name_vi} thVal={form.name_th}
                onEn={v => setForm({ ...form, name_en: v })}
                onZh={v => setForm({ ...form, name_zh: v })}
                onVi={v => setForm({ ...form, name_vi: v })}
                onTh={v => setForm({ ...form, name_th: v })}
                required placeholder="Product Name"
              />
            </div>
          )}
        </div>

        {/* 3. Description */}
        <div id="section-desc" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="desc" title="产品描述 Product Description" />
          {isOpen('desc') && (
            <div className="p-5 space-y-5">
              <div>
                <label className={labelCls}>Short Description 简短描述</label>
                <QiInput
                  enVal={form.short_description_en} zhVal={form.short_description_zh}
                  viVal={form.short_description_vi} thVal={form.short_description_th}
                  onEn={v => setForm({ ...form, short_description_en: v })}
                  onZh={v => setForm({ ...form, short_description_zh: v })}
                  onVi={v => setForm({ ...form, short_description_vi: v })}
                  onTh={v => setForm({ ...form, short_description_th: v })}
                />
              </div>
              <div>
                <label className={labelCls}>Full Description 完整描述</label>
                <QiTextarea
                  enVal={form.description_en} zhVal={form.description_zh}
                  viVal={form.description_vi} thVal={form.description_th}
                  onEn={v => setForm({ ...form, description_en: v })}
                  onZh={v => setForm({ ...form, description_zh: v })}
                  onVi={v => setForm({ ...form, description_vi: v })}
                  onTh={v => setForm({ ...form, description_th: v })}
                  rows={18}
                />
              </div>
            </div>
          )}
        </div>

        {/* 4. Price & Trade */}
        <div id="section-price" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="price" title="价格与交易 Price &amp; Trade" />
          {isOpen('price') && (
            <div className="p-5 grid grid-cols-4 gap-4">
              <div>
                <label className={labelCls}>Price (FOB)</label>
                <input type="number" step="0.01" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className={fieldCls} placeholder="0.00" />
              </div>
              <div>
                <label className={labelCls}>Unit</label>
                <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}
                  className={fieldCls}>
                  {['USD','EUR','CNY','㎡','㎡/set','roll','set','meter','ton'].map(u =>
                    <option key={u} value={u}>{u}</option>
                  )}
                </select>
              </div>
              <div>
                <label className={labelCls}>MOQ</label>
                <input type="number" value={form.moq}
                  onChange={e => setForm({ ...form, moq: e.target.value })}
                  className={fieldCls} placeholder="100" />
              </div>
              <div>
                <label className={labelCls}>Sort Weight</label>
                <input type="number" value={form.sort_weight}
                  onChange={e => setForm({ ...form, sort_weight: e.target.value })}
                  className={fieldCls} placeholder="0" />
              </div>
            </div>
          )}
        </div>

        {/* 5. Images */}
        <div id="section-images" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="images" title={`图片 Images (${imageList.length}/10)`} />
          {isOpen('images') && (
            <div className="p-5">
              <ImageUploader value={imageList} onChange={setImageList} token={token} max={10} />
            </div>
          )}
        </div>

        {/* 6. Specifications (key-value) */}
        <div id="section-specs" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="specs" title={`规格参数 Specifications (${specsEn.length + specsZh.length + specsVi.length + specsTh.length} keys)`} />
          {isOpen('specs') && (
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇬🇧 EN Specifications
                </label>
                <SpecsEditor
                  rows={specsEn}
                  onAdd={(k) => addSpecRow('en', k)}
                  onRemove={i => removeSpecRow('en', i)}
                  onUpdate={(i, f, v) => updateSpecRow('en', i, f, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇨🇳 ZH Specifications
                </label>
                <SpecsEditor
                  rows={specsZh}
                  onAdd={(k) => addSpecRow('zh', k)}
                  onRemove={i => removeSpecRow('zh', i)}
                  onUpdate={(i, f, v) => updateSpecRow('zh', i, f, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇻🇳 VI Specifications
                </label>
                <SpecsEditor
                  rows={specsVi}
                  onAdd={(k) => addSpecRow('vi', k)}
                  onRemove={i => removeSpecRow('vi', i)}
                  onUpdate={(i, f, v) => updateSpecRow('vi', i, f, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇹🇭 TH Specifications
                </label>
                <SpecsEditor
                  rows={specsTh}
                  onAdd={(k) => addSpecRow('th', k)}
                  onRemove={i => removeSpecRow('th', i)}
                  onUpdate={(i, f, v) => updateSpecRow('th', i, f, v)}
                />
              </div>
            </div>
          )}
        </div>

        {/* 7. Applications (list) */}
        <div id="section-apps" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="apps" title={`应用场景 Applications (${appsEn.length + appsZh.length + appsVi.length + appsTh.length} items)`} />
          {isOpen('apps') && (
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇬🇧 EN Applications
                </label>
                <AppsEditor
                  rows={appsEn}
                  onAdd={() => addAppRow('en')}
                  onRemove={i => removeAppRow('en', i)}
                  onUpdate={(i, v) => updateAppRow('en', i, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇨🇳 ZH Applications
                </label>
                <AppsEditor
                  rows={appsZh}
                  onAdd={() => addAppRow('zh')}
                  onRemove={i => removeAppRow('zh', i)}
                  onUpdate={(i, v) => updateAppRow('zh', i, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇻🇳 VI Applications
                </label>
                <AppsEditor
                  rows={appsVi}
                  onAdd={() => addAppRow('vi')}
                  onRemove={i => removeAppRow('vi', i)}
                  onUpdate={(i, v) => updateAppRow('vi', i, v)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  🇹🇭 TH Applications
                </label>
                <AppsEditor
                  rows={appsTh}
                  onAdd={() => addAppRow('th')}
                  onRemove={i => removeAppRow('th', i)}
                  onUpdate={(i, v) => updateAppRow('th', i, v)}
                />
              </div>
            </div>
          )}
        </div>

        {/* 8. SEO */}
        <div id="section-seo" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="seo" title="搜索引擎优化 SEO" />
          {isOpen('seo') && (
            <div className="p-5 space-y-4">
              <div>
                <label className={labelCls}>Title 标题</label>
                <QiInput
                  enVal={form.seo_title_en} zhVal={form.seo_title_zh}
                  viVal={form.seo_title_vi} thVal={form.seo_title_th}
                  onEn={v => setForm({ ...form, seo_title_en: v })}
                  onZh={v => setForm({ ...form, seo_title_zh: v })}
                  onVi={v => setForm({ ...form, seo_title_vi: v })}
                  onTh={v => setForm({ ...form, seo_title_th: v })}
                />
              </div>
              <div>
                <label className={labelCls}>Keywords 关键词</label>
                <QiInput
                  enVal={form.seo_keywords_en} zhVal={form.seo_keywords_zh}
                  viVal={form.seo_keywords_vi} thVal={form.seo_keywords_th}
                  onEn={v => setForm({ ...form, seo_keywords_en: v })}
                  onZh={v => setForm({ ...form, seo_keywords_zh: v })}
                  onVi={v => setForm({ ...form, seo_keywords_vi: v })}
                  onTh={v => setForm({ ...form, seo_keywords_th: v })}
                />
              </div>
              <div>
                <label className={labelCls}>Description 描述</label>
                <QiTextarea
                  enVal={form.seo_description_en} zhVal={form.seo_description_zh}
                  viVal={form.seo_description_vi} thVal={form.seo_description_th}
                  onEn={v => setForm({ ...form, seo_description_en: v })}
                  onZh={v => setForm({ ...form, seo_description_zh: v })}
                  onVi={v => setForm({ ...form, seo_description_vi: v })}
                  onTh={v => setForm({ ...form, seo_description_th: v })}
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* 9. Status */}
        <div id="section-status" className="bg-white rounded-lg shadow-sm border scroll-mt-32">
          <SectionHeader id="status" title="发布状态 Status" />
          {isOpen('status') && (
            <div className="p-5 flex items-center gap-8">
              <div>
                <label className={labelCls}>Visibility</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className={fieldCls}
                >
                  <option value="draft">Draft 草稿</option>
                  <option value="published">Published 已发布</option>
                </select>
              </div>
              <label className="flex items-center gap-2 pt-5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm font-medium">Featured 精选推荐</span>
              </label>
            </div>
          )}
        </div>

        {/* spacer for sticky bottom bar */}
        <div className="h-20" />
      </form>

      {/* ── Sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-6 py-3.5 flex items-center justify-between z-40">
        <div className="text-xs text-gray-400 truncate max-w-[50%]">
          {form.name_en && <span>{form.name_en}</span>}
          {form.name_en && form.name_zh && <span className="mx-1.5 text-gray-300">|</span>}
          {form.name_zh && <span>{form.name_zh}</span>}
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-600 text-sm mr-2">⚠ {error}</span>}
          <button
            type="button"
            onClick={() => router.push('/admin?tab=products')}
            className="px-5 py-2 text-sm rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          >
            取消 Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm"
          >
            {saving ? '保存中 Saving...' : (isNew ? '创建 Create' : '更新 Update')}
          </button>
        </div>
      </div>
    </div>
  );
}
