'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/admin-i18n';

interface Category {
  id: number;
  slug: string;
  name: string;
  thumbnail: string | null;
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

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white';
const labelCls = 'block text-sm font-medium text-slate-700 mb-1';

export default function CategoryManager({ token }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' });
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/product-categories?locale=en', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch {
      console.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sort_weight: parseInt(form.sort_weight) || 0 };
    const url = editing ? `/api/admin/product-categories/${editing.id}` : '/api/admin/product-categories';
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg(T.categories.saveSuccess);
        setShowForm(false);
        setEditing(null);
        setForm({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' });
        fetchCategories();
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
    if (!confirm(T.categories.deleteConfirm)) return;
    await fetch(`/api/admin/product-categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.categories.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {categories.length} 个</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ slug: '', name: '', sort_weight: '0', status: 'published', locale: 'en' }); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm"
        >
          + {T.categories.add}
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-2.5">{msg}</div>}

      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">{editing ? '编辑分类 Edit Category' : '新增分类 New Category'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{T.categories.slug}</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="e.g. wire-mesh" required disabled={!!editing} />
            </div>
            <div>
              <label className={labelCls}>{T.categories.name}</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>{T.categories.sortWeight}</label>
              <input type="number" value={form.sort_weight} onChange={e => setForm({ ...form, sort_weight: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{T.categories.status}</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                <option value="published">{T.status.published}</option>
                <option value="draft">{T.status.draft}</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.categories.name}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-40">{T.categories.slug}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">{T.categories.sortWeight}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">{T.categories.status}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map(cat => {
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
          {categories.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📂</div><p className="text-slate-500 text-sm">{T.categories.noCategories}</p></div>
          )}
        </div>
      )}
    </div>
  );
}
