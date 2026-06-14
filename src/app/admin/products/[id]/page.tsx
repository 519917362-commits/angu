'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';

export const dynamic = 'force-dynamic';

interface Category {
  id: number;
  slug: string;
  name: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

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

  const [form, setForm] = useState({
    slug: '',
    category_slug: '',
    name: '',
    short_description: '',
    description: '',
    price: '',
    unit: 'USD',
    moq: '',
    sort_weight: '0',
    status: 'draft',
    is_featured: false,
    specifications: '',
    applications: '',
    seo_title: '',
    seo_keywords: '',
    seo_description: '',
    locale: 'en',
  });

  // Auth check
  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (!stored) { router.push('/admin'); return; }
    setToken(stored);
  }, []);

  // Load categories once token is ready
  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/product-categories?locale=en', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, [token]);

  // Load product data when editing
  useEffect(() => {
    if (!token || isNew) { setLoading(false); return; }

    fetch(`/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      const p = data.product ?? data;
      if (!p || !p.id) { setLoading(false); return; }
      let appsStr = '', imgsArr: string[] = [];
      try { appsStr = JSON.parse(p.applications || '[]').join('\n'); } catch {}
      try { imgsArr = JSON.parse(p.images || '[]'); } catch {}
      setImageList(imgsArr);
      // Format specifications as pretty JSON for editing, fallback to empty object
      let specsStr = '{}';
      try { specsStr = JSON.stringify(JSON.parse(p.specifications || '{}'), null, 2); } catch {}

      setForm({
        slug: p.slug || '',
        category_slug: p.category_slug || '',
        name: p.name || '',
        short_description: p.short_description || '',
        description: p.description || '',
        price: p.price?.toString() || '',
        unit: p.unit || 'USD',
        moq: p.moq?.toString() || '',
        sort_weight: p.sort_weight?.toString() || '0',
        status: p.status || 'draft',
        is_featured: !!p.is_featured,
        specifications: specsStr,
        applications: appsStr,
        seo_title: p.seo_title || '',
        seo_keywords: p.seo_keywords || '',
        seo_description: p.seo_description || '',
        locale: p.locale || 'en',
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token, id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    let specifications = {};
    let applications: string[] = [];

    try { specifications = form.specifications.trim() ? JSON.parse(form.specifications) : {}; }
    catch { setError('Specifications must be valid JSON'); setSaving(false); return; }
    try { if (form.applications.trim()) applications = form.applications.split('\n').map(s => s.trim()).filter(Boolean); } catch {}

    const payload = {
      slug: form.slug,
      category_slug: form.category_slug,
      name: form.name,
      short_description: form.short_description,
      description: form.description,
      price: parseFloat(form.price) || 0,
      unit: form.unit,
      moq: parseInt(form.moq) || 0,
      sort_weight: parseInt(form.sort_weight) || 0,
      status: form.status,
      is_featured: form.is_featured,
      images: imageList,
      specifications,
      applications,
      seo_title: form.seo_title,
      seo_keywords: form.seo_keywords,
      seo_description: form.seo_description,
      locale: form.locale,
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

  const localeLabels: Record<string, string> = {
    en: 'EN', zh: '中文', ar: 'عربي', ja: '日本語',
    ko: '한국어', id: 'Bahasa', vi: 'Tiếng Việt',
    es: 'Español', fr: 'Français', de: 'Deutsch',
    pt: 'Português', th: 'ไทย',
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin?tab=products')}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {isNew ? '新建产品 New Product' : `编辑 Edit: ${form.name || `#${id}`}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-600 text-sm">⚠ {error}</span>}
          <button type="button" onClick={() => router.push('/admin?tab=products')}
            className="px-4 py-2 text-sm rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
            取消 Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="px-6 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? '保存中 Saving...' : (isNew ? '创建 Create' : '更新 Update')}
          </button>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-5">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">基本信息 Basic Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug 标识 *</label>
              <input value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" required disabled={!isNew} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">分类 Category *</label>
              <select value={form.category_slug}
                onChange={e => setForm({ ...form, category_slug: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" required>
                <option value="">Select...</option>
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">语言 Language</label>
              <select value={form.locale}
                onChange={e => setForm({ ...form, locale: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                {Object.entries(localeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">产品名称 Product Name *</label>
            <input value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm" required />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">简短描述 Short Description</label>
            <input value={form.short_description}
              onChange={e => setForm({ ...form, short_description: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">完整描述 Full Description</label>
            <textarea value={form.description} rows={3}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">价格与交易 Price &amp; Trade</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">价格 Price (FOB)</label>
              <input type="number" step="0.01" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">单位 Unit</label>
              <select value={form.unit}
                onChange={e => setForm({ ...form, unit: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                {['USD','EUR','CNY','㎡','㎡/set','roll','set','meter','ton'].map(u =>
                  <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">最小起订量 MOQ</label>
              <input type="number" value={form.moq}
                onChange={e => setForm({ ...form, moq: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">排序权重 Sort Weight</label>
              <input type="number" value={form.sort_weight}
                onChange={e => setForm({ ...form, sort_weight: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">图片 Images</h2>
          <ImageUploader value={imageList} onChange={setImageList} token={token} max={10} />
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">规格参数 Specifications (JSON)</h2>
          <textarea value={form.specifications} rows={4}
            onChange={e => setForm({ ...form, specifications: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm font-mono"
            placeholder={'{"material": "Galvanized Steel", "wireDiameter": "2.7mm"}'} />
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">应用场景 Applications</h2>
          <textarea value={form.applications} rows={4}
            onChange={e => setForm({ ...form, applications: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="River bank protection" />
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">搜索引擎优化 SEO</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">SEO 标题 Title</label>
              <input value={form.seo_title}
                onChange={e => setForm({ ...form, seo_title: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SEO 关键词 Keywords</label>
              <input value={form.seo_keywords}
                onChange={e => setForm({ ...form, seo_keywords: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">SEO 描述 Description</label>
              <textarea value={form.seo_description} rows={2}
                onChange={e => setForm({ ...form, seo_description: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">状态 Status</label>
              <select value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                <option value="draft">草稿 Draft</option>
                <option value="published">已发布 Published</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="featured-check" checked={form.is_featured}
                onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4" />
              <label htmlFor="featured-check" className="text-sm font-medium">推荐 Featured (Hot)</label>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </form>
    </div>
  );
}