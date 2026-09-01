'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import SingleImageUploader from '@/components/admin/SingleImageUploader';
import MarkdownEditor from '@/components/admin/MarkdownEditor';

export const dynamic = 'force-dynamic';

interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_zh: string;
  name_vi?: string;
  name_th?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

const fieldCls = 'w-full border rounded px-3 py-2 text-sm';
const labelCls = 'block text-sm font-medium mb-1';
const sectionCls = 'bg-white rounded-lg shadow p-5';

export default function BlogEditPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [token, setToken] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    slug: '', category_slug: '',
    title_en: '', title_zh: '', title_vi: '', title_th: '',
    abstract_en: '', abstract_zh: '', abstract_vi: '', abstract_th: '',
    content_en: '', content_zh: '', content_vi: '', content_th: '',
    cover_image: '', status: 'draft', publish_time: '',
    seo_title_en: '', seo_title_zh: '', seo_title_vi: '', seo_title_th: '',
    seo_keywords_en: '', seo_keywords_zh: '', seo_keywords_vi: '', seo_keywords_th: '',
    seo_description_en: '', seo_description_zh: '', seo_description_vi: '', seo_description_th: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (!stored) { router.push('/admin'); return; }
    setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/blog-categories', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, [token]);

  useEffect(() => {
    if (!token || isNew) { setLoading(false); return; }
    fetch(`/api/admin/blog-posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      const p = data.post ?? data;
      if (!p || !p.id) { setLoading(false); return; }
      setForm({
        slug: p.slug || '', category_slug: p.category_slug || '',
        title_en: p.title_en || '', title_zh: p.title_zh || '',
        title_vi: p.title_vi || '', title_th: p.title_th || '',
        abstract_en: p.abstract_en || '', abstract_zh: p.abstract_zh || '',
        abstract_vi: p.abstract_vi || '', abstract_th: p.abstract_th || '',
        content_en: p.content_en || '', content_zh: p.content_zh || '',
        content_vi: p.content_vi || '', content_th: p.content_th || '',
        cover_image: p.cover_image || '', status: p.status || 'draft',
        publish_time: p.publish_time ? p.publish_time.slice(0, 16) : '',
        seo_title_en: p.seo_title_en || '', seo_title_zh: p.seo_title_zh || '',
        seo_title_vi: p.seo_title_vi || '', seo_title_th: p.seo_title_th || '',
        seo_keywords_en: p.seo_keywords_en || '', seo_keywords_zh: p.seo_keywords_zh || '',
        seo_keywords_vi: p.seo_keywords_vi || '', seo_keywords_th: p.seo_keywords_th || '',
        seo_description_en: p.seo_description_en || '', seo_description_zh: p.seo_description_zh || '',
        seo_description_vi: p.seo_description_vi || '', seo_description_th: p.seo_description_th || '',
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token, id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      publish_time: form.publish_time ? new Date(form.publish_time).toISOString() : new Date().toISOString(),
    };
    const url = isNew ? '/api/admin/blog-posts' : `/api/admin/blog-posts/${id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) { router.push('/admin?tab=blogs'); }
      else { const err = await res.json(); setError(err.error || 'Save failed'); setSaving(false); }
    } catch { setError('Network error'); setSaving(false); }
  };

  const QuadField = ({ label, enVal, zhVal, viVal, thVal, onEn, onZh, onVi, onTh, multiline, required, placeholderEn, placeholderZh, placeholderVi, placeholderTh }: {
    label: string; enVal: string; zhVal: string; viVal: string; thVal: string;
    onEn: (v: string) => void; onZh: (v: string) => void; onVi: (v: string) => void; onTh: (v: string) => void;
    multiline?: boolean; required?: boolean; placeholderEn?: string; placeholderZh?: string; placeholderVi?: string; placeholderTh?: string;
  }) => (
    <div className="mt-3">
      <div className="text-xs font-medium text-slate-600 mb-2">{label}</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className={labelCls}>EN</label>
          {multiline ? (
            <textarea value={enVal} onChange={e => onEn(e.target.value)} className={fieldCls} rows={3} required={required} placeholder={placeholderEn} />
          ) : (
            <input value={enVal} onChange={e => onEn(e.target.value)} className={fieldCls} required={required} placeholder={placeholderEn} />
          )}
        </div>
        <div>
          <label className={labelCls}>ZH</label>
          {multiline ? (
            <textarea value={zhVal} onChange={e => onZh(e.target.value)} className={fieldCls} rows={3} required={required} placeholder={placeholderZh} />
          ) : (
            <input value={zhVal} onChange={e => onZh(e.target.value)} className={fieldCls} required={required} placeholder={placeholderZh} />
          )}
        </div>
        <div>
          <label className={labelCls}>VI</label>
          {multiline ? (
            <textarea value={viVal} onChange={e => onVi(e.target.value)} className={fieldCls} rows={3} placeholder={placeholderVi} />
          ) : (
            <input value={viVal} onChange={e => onVi(e.target.value)} className={fieldCls} placeholder={placeholderVi} />
          )}
        </div>
        <div>
          <label className={labelCls}>TH</label>
          {multiline ? (
            <textarea value={thVal} onChange={e => onTh(e.target.value)} className={fieldCls} rows={3} placeholder={placeholderTh} />
          ) : (
            <input value={thVal} onChange={e => onTh(e.target.value)} className={fieldCls} placeholder={placeholderTh} />
          )}
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin?tab=blogs')}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {isNew ? '新建博客 New Blog Post' : `编辑 Edit: ${form.title_en || `#${id}`}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-600 text-sm">⚠ {error}</span>}
          <button type="button" onClick={() => router.push('/admin?tab=blogs')}
            className="px-4 py-2 text-sm rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
            取消 Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="px-6 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? '保存中 Saving...' : (isNew ? '创建 Create' : '更新 Update')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 max-w-5xl mx-auto w-full p-6 space-y-5">
        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">基本信息 Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Slug 标识 *</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                className={fieldCls} required disabled={!isNew} />
            </div>
            <div>
              <label className={labelCls}>分类 Category</label>
              <select value={form.category_slug} onChange={e => setForm({ ...form, category_slug: e.target.value })} className={fieldCls}>
                <option value="">None</option>
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name_en} / {c.name_zh}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">标题 Title *</h2>
          <QuadField label="标题 Title" enVal={form.title_en} zhVal={form.title_zh} viVal={form.title_vi} thVal={form.title_th}
            onEn={v => setForm({ ...form, title_en: v })} onZh={v => setForm({ ...form, title_zh: v })} onVi={v => setForm({ ...form, title_vi: v })} onTh={v => setForm({ ...form, title_th: v })} required />
        </div>

        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">摘要 Abstract</h2>
          <QuadField label="摘要 Abstract" enVal={form.abstract_en} zhVal={form.abstract_zh} viVal={form.abstract_vi} thVal={form.abstract_th}
            onEn={v => setForm({ ...form, abstract_en: v })} onZh={v => setForm({ ...form, abstract_zh: v })} onVi={v => setForm({ ...form, abstract_vi: v })} onTh={v => setForm({ ...form, abstract_th: v })} multiline />
        </div>

        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">正文 Content — English</h2>
          <MarkdownEditor
            value={form.content_en}
            onChange={v => setForm({ ...form, content_en: v })}
            label="EN"
            placeholder="Write blog content in English (Markdown supported)..."
          />
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">正文 Content — 中文</h2>
            <MarkdownEditor
              value={form.content_zh}
              onChange={v => setForm({ ...form, content_zh: v })}
              label="ZH"
              placeholder="用中文撰写博客内容（支持 Markdown）..."
            />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">正文 Content — Tiếng Việt</h2>
            <MarkdownEditor
              value={form.content_vi}
              onChange={v => setForm({ ...form, content_vi: v })}
              label="VI"
              placeholder="Viết nội dung blog bằng tiếng Việt (hỗ trợ Markdown)..."
            />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">正文 Content — ภาษาไทย</h2>
            <MarkdownEditor
              value={form.content_th}
              onChange={v => setForm({ ...form, content_th: v })}
              label="TH"
              placeholder="เขียนเนื้อหาบล็อกเป็นภาษาไทย (รองรับ Markdown)..."
            />
          </div>
        </div>

        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-4">封面图片 Cover Image</h2>
          <SingleImageUploader value={form.cover_image} onChange={v => setForm({ ...form, cover_image: v })} token={token} />
        </div>

        <div className={sectionCls}>
          <h2 className="text-sm font-semibold text-gray-700 mb-1">搜索引擎优化 SEO</h2>
          <QuadField label="标题 Title" enVal={form.seo_title_en} zhVal={form.seo_title_zh} viVal={form.seo_title_vi} thVal={form.seo_title_th}
            onEn={v => setForm({ ...form, seo_title_en: v })} onZh={v => setForm({ ...form, seo_title_zh: v })} onVi={v => setForm({ ...form, seo_title_vi: v })} onTh={v => setForm({ ...form, seo_title_th: v })} />
          <QuadField label="关键词 Keywords" enVal={form.seo_keywords_en} zhVal={form.seo_keywords_zh} viVal={form.seo_keywords_vi} thVal={form.seo_keywords_th}
            onEn={v => setForm({ ...form, seo_keywords_en: v })} onZh={v => setForm({ ...form, seo_keywords_zh: v })} onVi={v => setForm({ ...form, seo_keywords_vi: v })} onTh={v => setForm({ ...form, seo_keywords_th: v })} />
          <QuadField label="描述 Description" enVal={form.seo_description_en} zhVal={form.seo_description_zh} viVal={form.seo_description_vi} thVal={form.seo_description_th}
            onEn={v => setForm({ ...form, seo_description_en: v })} onZh={v => setForm({ ...form, seo_description_zh: v })} onVi={v => setForm({ ...form, seo_description_vi: v })} onTh={v => setForm({ ...form, seo_description_th: v })} multiline />
        </div>

        <div className={sectionCls}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>状态 Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={fieldCls}>
                <option value="draft">草稿 Draft</option>
                <option value="published">已发布 Published</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>发布时间 Publish Time</label>
              <input type="datetime-local" value={form.publish_time}
                onChange={e => setForm({ ...form, publish_time: e.target.value })} className={fieldCls} />
            </div>
          </div>
        </div>
        <div className="h-8" />
      </form>
    </div>
  );
}
