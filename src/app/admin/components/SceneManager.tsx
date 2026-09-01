'use client';

import { useState, useEffect } from 'react';

interface Scene {
  id: number;
  icon: string;
  name_en: string; name_zh: string; name_vi: string; name_th: string;
  description_en: string; description_zh: string; description_vi: string; description_th: string;
  category_slugs: string[];
  sort_weight: number;
  status: string;
}

interface Props { token: string; onLogout: () => void; }

const empty: Omit<Scene, 'id'> = {
  icon: '', name_en: '', name_zh: '', name_vi: '', name_th: '', description_en: '', description_zh: '', description_vi: '', description_th: '',
  category_slugs: [], sort_weight: 0, status: 'published',
};

export default function SceneManager({ token, onLogout }: Props) {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [editing, setEditing] = useState<Scene | null>(null);
  const [form, setForm] = useState(empty);
  const [catsInput, setCatsInput] = useState('');

  const fetchScenes = () => {
    fetch('/api/admin/application-scenarios', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.status === 401) { onLogout(); return []; } return res.json(); })
      .then(setScenes).catch(() => {});
  };
  useEffect(() => { fetchScenes(); }, [token, onLogout]);

  const openNew = () => { setEditing(null); setForm({ ...empty }); setCatsInput(''); };
  const openEdit = (s: Scene) => {
    setEditing(s);
    setForm({ icon: s.icon, name_en: s.name_en, name_zh: s.name_zh, name_vi: s.name_vi || '', name_th: s.name_th || '', description_en: s.description_en, description_zh: s.description_zh, description_vi: s.description_vi || '', description_th: s.description_th || '', category_slugs: s.category_slugs, sort_weight: s.sort_weight, status: s.status });
    setCatsInput(s.category_slugs.join(', '));
  };

  const save = async () => {
    const slugs = catsInput.split(',').map(s => s.trim()).filter(Boolean);
    const payload = { ...form, category_slugs: slugs };
    const url = editing ? `/api/admin/application-scenarios/${editing.id}` : '/api/admin/application-scenarios';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); setForm(empty); setCatsInput(''); fetchScenes(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？')) return;
    const res = await fetch(`/api/admin/application-scenarios/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchScenes();
  };

  const isEditing = editing !== null || form.name_en !== '';
  if (!isEditing) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">应用场景 App Scenes</h1>
            <p className="text-sm text-slate-400 mt-0.5">应用场景管理 Application Scenarios</p>
          </div>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="grid gap-4">
          {scenes.map(s => (
            <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              <div className="text-3xl shrink-0">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900">{s.name_en}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.description_en}</div>
              </div>
              <div className="text-xs text-slate-400 shrink-0 max-w-[120px] truncate">{s.category_slugs?.join(', ')}</div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(s)} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">编辑 Edit</button>
                <button onClick={() => del(s.id)} className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100">删除</button>
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
        <h1 className="text-2xl font-bold text-slate-900">{editing ? '编辑' : '新增'} 应用场景</h1>
        <button onClick={() => { setEditing(null); setForm(empty); }} className="text-sm text-slate-500 hover:text-slate-700">← 返回 Back</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">图标 Icon</label><input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">排序 Sort</label><input type="number" value={form.sort_weight} onChange={e => setForm(f => ({ ...f, sort_weight: Number(e.target.value) }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">状态</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"><option value="published">Published</option><option value="draft">Draft</option></select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">名称 EN</label><input value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">名称 ZH</label><input value={form.name_zh} onChange={e => setForm(f => ({ ...f, name_zh: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">名称 VI</label><input value={form.name_vi} onChange={e => setForm(f => ({ ...f, name_vi: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">名称 TH</label><input value={form.name_th} onChange={e => setForm(f => ({ ...f, name_th: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 EN</label><input value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 ZH</label><input value={form.description_zh} onChange={e => setForm(f => ({ ...f, description_zh: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 VI</label><input value={form.description_vi} onChange={e => setForm(f => ({ ...f, description_vi: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
          <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 TH</label><input value={form.description_th} onChange={e => setForm(f => ({ ...f, description_th: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" /></div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">关联分类 Category Slugs (逗号分隔 comma-separated)</label>
          <input value={catsInput} onChange={e => setCatsInput(e.target.value)} placeholder="gabion, slope-protection" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
        </div>
        <button onClick={save} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700">💾 保存 Save</button>
      </div>
    </div>
  );
}
