'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import SingleImageUploader from '@/components/admin/SingleImageUploader';

export const dynamic = 'force-dynamic';

interface Category {
  id: number;
  slug: string;
  name: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

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
    slug: '',
    category_slug: '',
    title: '',
    abstract: '',
    content: '',
    cover_image: '',
    status: 'draft',
    publish_time: '',
    locale: 'en',
    seo_title: '',
    seo_keywords: '',
    seo_description: '',
  });

  // Auth check
  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (!stored) { router.push('/admin'); return; }
    setToken(stored);
  }, []);

  // Load categories
  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/blog-categories?locale=en', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, [token]);

  // Load post data when editing
  useEffect(() => {
    if (!token || isNew) { setLoading(false); return; }

    fetch(`/api/admin/blog-posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()).then(data => {
      if (data.post) {
        const p = data.post;
        setForm({
          slug: p.slug || '',
          category_slug: p.category_slug || '',
          title: p.title || '',
          abstract: p.abstract || '',
          content: p.content || '',
          cover_image: p.cover_image || '',
          status: p.status || 'draft',
          publish_time: p.publish_time ? p.publish_time.slice(0, 16) : '',
          locale: p.locale || 'en',
          seo_title: p.seo_title || '',
          seo_keywords: p.seo_keywords || '',
          seo_description: p.seo_description || '',
        });
      }
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
      if (res.ok) {
        router.push('/admin?tab=blogs');
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
          <button onClick={() => router.push('/admin?tab=blogs')}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {isNew ? 'New Blog Post' : `Edit: ${form.title || `#${id}`}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-600 text-sm">⚠ {error}</span>}
          <button type="button" onClick={() => router.push('/admin?tab=blogs')}
            className="px-4 py-2 text-sm rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="px-6 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : (isNew ? 'Create' : 'Update')}
          </button>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-5">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Post Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" required disabled={!isNew} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={form.category_slug}
                onChange={e => setForm({ ...form, category_slug: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                <option value="">None</option>
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select value={form.locale}
                onChange={e => setForm({ ...form, locale: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                {Object.entries(localeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm" required />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Abstract / Excerpt</label>
            <textarea value={form.abstract} rows={3}
              onChange={e => setForm({ ...form, abstract: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Content (HTML or Markdown)</h2>
          <textarea value={form.content} rows={16}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded px-3 py-2 text-sm font-mono"
            placeholder="<p>Your blog content here...</p>" />
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Cover Image</h2>
          <SingleImageUploader value={form.cover_image} onChange={v => setForm({ ...form, cover_image: v })} token={token} />
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">SEO</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">SEO Title</label>
              <input value={form.seo_title}
                onChange={e => setForm({ ...form, seo_title: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SEO Keywords</label>
              <input value={form.seo_keywords}
                onChange={e => setForm({ ...form, seo_keywords: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">SEO Description</label>
              <textarea value={form.seo_description} rows={2}
                onChange={e => setForm({ ...form, seo_description: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publish Time</label>
              <input type="datetime-local" value={form.publish_time}
                onChange={e => setForm({ ...form, publish_time: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="h-8" />
      </form>
    </div>
  );
}