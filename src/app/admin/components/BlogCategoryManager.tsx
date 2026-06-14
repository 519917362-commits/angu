'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/admin-i18n';

interface Category {
  id: number;
  slug: string;
  name: string;
  sort_weight: number;
  status: string;
  locale: string;
}

interface Props {
  token: string;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  published: { label: '已发布', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft:     { label: '草稿', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function BlogCategoryManager({ token }: Props) {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' });
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchCats(); }, []);

  const fetchCats = async () => {
    try {
      const res = await fetch('/api/admin/blog-categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.categories) setCats(data.categories);
      else if (Array.isArray(data)) setCats(data);
    } catch { console.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sort_weight: parseInt(form.sort_weight) || 0 };
    const url = editing ? `/api/admin/blog-categories/${editing.id}` : '/api/admin/blog-categories';
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg(T.blogCats.saveSuccess);
        setShowForm(false);
        setEditing(null);
        setForm({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' });
        fetchCats();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { console.error('Save failed'); }
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ slug: cat.slug, name: cat.name, sort_weight: cat.sort_weight?.toString() || '0', status: cat.status, locale: cat.locale });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除？ Confirm delete?')) return;
    await fetch(`/api/admin/blog-categories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchCats();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.blogCats.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {cats.length} 个</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' }); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm">
          + {T.blogCats.add}
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-2.5">{msg}</div>}

      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">{editing ? '编辑分类 Edit Category' : '新增分类 New Category'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required disabled={!!editing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sort</label>
              <input type="number" value={form.sort_weight} onChange={e => setForm({ ...form, sort_weight: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="published">已发布 Published</option>
                <option value="draft">草稿 Draft</option>
              </select>
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">{T.actions.save}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg hover:bg-slate-200 text-sm">{T.actions.cancel}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-40">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">Sort</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cats.map(cat => {
                const sc = statusConfig[cat.status] || { label: cat.status, cls: 'bg-slate-100 text-slate-600' };
                return (
                  <tr key={cat.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800">{cat.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 font-mono">/{cat.slug}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 font-mono">{cat.sort_weight}</td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${sc.cls}`}>{sc.label}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">{T.actions.edit}</button>
                        <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 text-sm">{T.actions.delete}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {cats.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📁</div><p className="text-slate-500 text-sm">暂无分类 No categories</p></div>
          )}
        </div>
      )}
    </div>
  );
}
