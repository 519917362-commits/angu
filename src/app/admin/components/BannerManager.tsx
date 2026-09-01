'use client';

import { useState, useEffect, useRef } from 'react';

interface Banner {
  id: number;
  sort_weight: number;
  image_en: string; image_zh: string; image_vi: string; image_th: string;
  title_en: string; title_zh: string; title_vi: string; title_th: string;
  subtitle_en: string; subtitle_zh: string; subtitle_vi: string; subtitle_th: string;
  cta_text_en: string; cta_text_zh: string; cta_text_vi: string; cta_text_th: string;
  cta_link: string;
  status: string;
}

interface Props { token: string; onLogout: () => void; }

const empty: Omit<Banner, 'id'> = {
  sort_weight: 0, image_en: '', image_zh: '', image_vi: '', image_th: '',
  title_en: '', title_zh: '', title_vi: '', title_th: '', subtitle_en: '', subtitle_zh: '', subtitle_vi: '', subtitle_th: '',
  cta_text_en: '', cta_text_zh: '', cta_text_vi: '', cta_text_th: '', cta_link: '', status: 'draft',
};

export default function BannerManager({ token, onLogout }: Props) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty);

  const fetchBanners = () => {
    fetch('/api/admin/banners', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.status === 401) { onLogout(); return []; } return res.json(); })
      .then(setBanners).catch(() => {});
  };

  useEffect(() => { fetchBanners(); }, [token, onLogout]);

  const openNew = () => { setEditing(null); setForm({ ...empty }); };
  const openEdit = (b: Banner) => { setEditing(b); setForm({ sort_weight: b.sort_weight, image_en: b.image_en, image_zh: b.image_zh, image_vi: b.image_vi || '', image_th: b.image_th || '', title_en: b.title_en, title_zh: b.title_zh, title_vi: b.title_vi || '', title_th: b.title_th || '', subtitle_en: b.subtitle_en, subtitle_zh: b.subtitle_zh, subtitle_vi: b.subtitle_vi || '', subtitle_th: b.subtitle_th || '', cta_text_en: b.cta_text_en, cta_text_zh: b.cta_text_zh, cta_text_vi: b.cta_text_vi || '', cta_text_th: b.cta_text_th || '', cta_link: b.cta_link, status: b.status }); };

  const save = async () => {
    const url = editing ? `/api/admin/banners/${editing.id}` : '/api/admin/banners';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); fetchBanners(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？ Confirm delete?')) return;
    const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchBanners();
  };

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res.status === 401) { onLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setForm(f => ({ ...f, image_en: data.url, image_zh: data.url, image_vi: data.url, image_th: data.url }));
      }
    } catch {}
    setUploading(false);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const isEditing = editing !== null || form.title_en !== '';
  if (!isEditing) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Banner 管理</h1>
            <p className="text-sm text-slate-400 mt-0.5">Hero Banner Management</p>
          </div>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="grid gap-4">
          {banners.map(b => (
            <div key={b.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-20 h-14 bg-slate-100 rounded overflow-hidden shrink-0">
                {b.image_en && <img src={b.image_en} className="w-full h-full object-cover" alt="" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900 truncate">{b.title_en}</div>
                <div className="text-xs text-slate-400 mt-0.5">排序 {b.sort_weight} | {b.status}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(b)} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">编辑 Edit</button>
                <button onClick={() => del(b.id)} className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100">删除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{editing ? '编辑 Banner' : '新增 Banner'}</h1>
        <button onClick={() => { setEditing(null); setForm(empty); }} className="text-sm text-slate-500 hover:text-slate-700">← 返回 Back</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">排序 Sort</label>
            <input type="number" value={form.sort_weight} onChange={e => setForm(f => ({ ...f, sort_weight: Number(e.target.value) }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">状态 Status</label>
            <select value={form.status} onChange={set('status')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">CTA 链接 Link</label>
            <input type="text" value={form.cta_link} onChange={set('cta_link')} placeholder="/contact" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">图片 Image (中英共用)</label>
          {form.image_en && (
            <div className="mb-2 w-full max-w-md h-48 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <img src={form.image_en} className="w-full h-full object-cover" alt="" />
            </div>
          )}
          <div className="flex gap-2">
            <input type="text" value={form.image_en} onChange={e => setForm(f => ({ ...f, image_en: e.target.value, image_zh: e.target.value, image_vi: e.target.value, image_th: e.target.value }))} placeholder="/images/banners/banner1.jpg" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
            <label className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${uploading ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
              {uploading ? '⏳' : '📁'}
              <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">标题 EN Title EN</label>
            <input type="text" value={form.title_en} onChange={set('title_en')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">标题 ZH Title ZH</label>
            <input type="text" value={form.title_zh} onChange={set('title_zh')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">标题 VI Title VI</label>
            <input type="text" value={form.title_vi} onChange={set('title_vi')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">标题 TH Title TH</label>
            <input type="text" value={form.title_th} onChange={set('title_th')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">副标题 EN Subtitle EN</label>
            <input type="text" value={form.subtitle_en} onChange={set('subtitle_en')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">副标题 ZH Subtitle ZH</label>
            <input type="text" value={form.subtitle_zh} onChange={set('subtitle_zh')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">副标题 VI Subtitle VI</label>
            <input type="text" value={form.subtitle_vi} onChange={set('subtitle_vi')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">副标题 TH Subtitle TH</label>
            <input type="text" value={form.subtitle_th} onChange={set('subtitle_th')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">CTA 文字 EN</label>
            <input type="text" value={form.cta_text_en} onChange={set('cta_text_en')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">CTA 文字 ZH</label>
            <input type="text" value={form.cta_text_zh} onChange={set('cta_text_zh')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">CTA 文字 VI</label>
            <input type="text" value={form.cta_text_vi} onChange={set('cta_text_vi')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">CTA 文字 TH</label>
            <input type="text" value={form.cta_text_th} onChange={set('cta_text_th')} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <button onClick={save} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700">💾 保存 Save</button>
      </div>
    </div>
  );
}
