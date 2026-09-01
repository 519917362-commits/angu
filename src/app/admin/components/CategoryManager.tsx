'use client';

import { useState, useEffect, useRef } from 'react';

interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_zh: string;
  name_vi: string;
  name_th: string;
  thumbnail: string | null;
  sort_weight: number;
  status: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  published: { label: '已发布', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft:     { label: '草稿', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white';
const labelCls = 'block text-sm font-medium text-slate-700 mb-1';

export default function CategoryManager({ token, onLogout }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ slug: '', name_en: '', name_zh: '', name_vi: '', name_th: '', thumbnail: '', sort_weight: '0', status: 'published' });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchCategories(); }, [token]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/product-categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch {
      console.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.status === 401) { onLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        const url = data.url || `/uploads/${file.name}`;
        setForm(prev => ({ ...prev, thumbnail: url }));
        setMsg('✅ 图片上传成功');
        setTimeout(() => setMsg(''), 3000);
      } else {
        setMsg('❌ 上传失败');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { setMsg('❌ 网络错误'); setTimeout(() => setMsg(''), 3000); }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      slug: form.slug,
      name_en: form.name_en,
      name_zh: form.name_zh,
      name_vi: form.name_vi,
      name_th: form.name_th,
      thumbnail: form.thumbnail || null,
      sort_weight: parseInt(form.sort_weight) || 0,
      status: form.status,
    };
    const url = editing ? `/api/admin/product-categories/${editing.id}` : '/api/admin/product-categories';
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg('保存成功');
        setShowForm(false);
        setEditing(null);
        setForm({ slug: '', name_en: '', name_zh: '', name_vi: '', name_th: '', thumbnail: '', sort_weight: '0', status: 'published' });
        fetchCategories();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { console.error('Save failed'); }
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      slug: cat.slug,
      name_en: cat.name_en,
      name_zh: cat.name_zh,
      name_vi: cat.name_vi || '',
      name_th: cat.name_th || '',
      thumbnail: cat.thumbnail || '',
      sort_weight: cat.sort_weight?.toString() || '0',
      status: cat.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除此分类？ Confirm delete this category?')) return;
    await fetch(`/api/admin/product-categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">产品分类</h2>
          <p className="text-xs text-slate-400 mt-0.5">Product Categories · 共 {categories.length} 个</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ slug: '', name_en: '', name_zh: '', name_vi: '', name_th: '', thumbnail: '', sort_weight: '0', status: 'published' }); setShowForm(true); }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
        >
          <span>+</span> 新增分类
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-2.5">{msg}</div>}

      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">{editing ? '编辑分类 Edit Category' : '新增分类 New Category'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>标识 Slug</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="e.g. wire-mesh" required disabled={!!editing} />
            </div>
            <div>
              <label className={labelCls}>排序权重 Sort</label>
              <input type="number" value={form.sort_weight} onChange={e => setForm({ ...form, sort_weight: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>英文名称 Name EN</label>
              <input value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} className={inputCls} placeholder="e.g. Wire Mesh" required />
            </div>
            <div>
              <label className={labelCls}>中文名称 Name ZH</label>
              <input value={form.name_zh} onChange={e => setForm({ ...form, name_zh: e.target.value })} className={inputCls} placeholder="e.g. 丝网类" required />
            </div>
            <div>
              <label className={labelCls}>越南语名称 Name VI</label>
              <input value={form.name_vi} onChange={e => setForm({ ...form, name_vi: e.target.value })} className={inputCls} placeholder="vd: Lưới Thép" />
            </div>
            <div>
              <label className={labelCls}>泰语名称 Name TH</label>
              <input value={form.name_th} onChange={e => setForm({ ...form, name_th: e.target.value })} className={inputCls} placeholder="เช่น ลวดตาข่าย" />
            </div>
            <div>
              <label className={labelCls}>状态 Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                <option value="published">已发布 Published</option>
                <option value="draft">草稿 Draft</option>
              </select>
            </div>
            {/* Thumbnail upload */}
            <div>
              <label className={labelCls}>分类图片 Thumbnail</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {form.thumbnail ? (
                    <img src={form.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-300 text-xl">🖼</span>
                  )}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    value={form.thumbnail}
                    onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                    className={inputCls}
                    placeholder="/uploads/cat-wire-mesh.jpg"
                  />
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleThumbnailUpload(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 flex-shrink-0"
                  >
                    {uploading ? '⏳' : '📤'} {uploading ? '上传中' : '上传'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-end gap-3">
              <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">保存</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg hover:bg-slate-200 text-sm">取消</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {[
                    { label: '图片', subLabel: 'IMG', w: 'w-16' },
                    { label: '名称', subLabel: 'NAME', w: 'min-w-[200px] w-[35%]' },
                    { label: '标识', subLabel: 'SLUG', w: 'w-40' },
                    { label: '排序', subLabel: 'SORT', w: 'w-16 whitespace-nowrap' },
                    { label: '状态', subLabel: 'STATUS', w: 'w-24 whitespace-nowrap' },
                    { label: '操作', subLabel: 'ACTIONS', w: 'w-24 whitespace-nowrap' },
                  ].map(h => (
                    <th key={h.label + h.subLabel} className={`px-3 py-3 text-left ${h.w}`}>
                      <div className="text-xs font-semibold text-slate-700">{h.label}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide">{h.subLabel}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map(cat => {
                  const sc = statusConfig[cat.status] || { label: cat.status, cls: 'bg-slate-100 text-slate-600' };
                  return (
                    <tr key={cat.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-3 py-3">
                        <div className="w-12 h-9 rounded border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                          {cat.thumbnail ? (
                            <img src={cat.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-slate-800 text-sm truncate">{cat.name_en}</div>
                        <div className="text-slate-500 text-sm mt-0.5 truncate">{cat.name_zh}</div>
                        <div className="text-slate-400 text-xs mt-0.5 truncate">{(cat as any).name_vi || '—'} · {(cat as any).name_th || '—'}</div>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-500 font-mono truncate">/{cat.slug}</td>
                      <td className="px-3 py-3 text-sm text-slate-500 font-mono">{cat.sort_weight}</td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${sc.cls}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleEdit(cat)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="编辑"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                          <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="删除"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {categories.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📂</div><p className="text-slate-500 text-sm">暂无分类</p></div>
          )}
        </div>
      )}
    </div>
  );
}
