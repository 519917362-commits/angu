'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import WhyChooseUsManager from './WhyChooseUsManager';

// ── Types ──
interface TimelineItem {
  id: number; year: number; emoji: string;
  title_en: string; title_zh: string; title_vi: string; title_th: string;
  desc_en: string; desc_zh: string; desc_vi: string; desc_th: string;
  sort_order: number; status: string;
}

interface TeamMember {
  id: number; avatar: string;
  name_en: string; name_zh: string; name_vi: string; name_th: string;
  title_en: string; title_zh: string; title_vi: string; title_th: string;
  market_en: string; market_zh: string; market_vi: string; market_th: string;
  countries_en: string; countries_zh: string; countries_vi: string; countries_th: string;
  phone: string; whatsapp: string; email: string; facebook: string;
  desc_en: string; desc_zh: string; desc_vi: string; desc_th: string;
  sort_order: number; status: string;
}

interface FactoryImage {
  id: number; image_url: string;
  alt_en: string; alt_zh: string; alt_vi: string; alt_th: string;
  sort_order: number; status: string;
}

interface Certification {
  id: number; icon: string;
  name_en: string; name_zh: string; name_vi: string; name_th: string;
  desc_en: string; desc_zh: string; desc_vi: string; desc_th: string;
  sort_order: number; status: string;
}

interface Props { token: string; onLogout: () => void; }

type Tab = 'why-choose-us' | 'timeline' | 'team' | 'factory' | 'certifications' | 'seo' | 'hero-image';

const subTabs: { id: Tab; label: string }[] = [
  { id: 'why-choose-us', label: '信任体系 Why Us' },
  { id: 'timeline', label: '发展历程 Timeline' },
  { id: 'team', label: '业务团队 Team' },
  { id: 'factory', label: '工厂图片 Factory' },
  { id: 'certifications', label: '认证资质 Certs' },
  { id: 'hero-image', label: '公司主图 Hero' },
  { id: 'seo', label: 'SEO & 文案 Copy' },
];

// ── Main Component ──
export default function AboutPageManager({ token, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('why-choose-us');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">关于页面配置 About Page</h1>
          <p className="text-sm text-slate-400 mt-0.5">管理关于页面的所有内容，包括发展历程、团队、工厂图片、认证和 SEO</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200 pb-0">
        {subTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === t.id
                ? 'bg-white text-blue-600 border border-b-0 border-slate-200 -mb-px'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'why-choose-us' && <WhyChooseUsManager token={token} onLogout={onLogout} />}
      {activeTab === 'timeline' && <TimelineSection token={token} onLogout={onLogout} />}
      {activeTab === 'team' && <TeamSection token={token} onLogout={onLogout} />}
      {activeTab === 'factory' && <FactorySection token={token} onLogout={onLogout} />}
      {activeTab === 'certifications' && <CertSection token={token} onLogout={onLogout} />}
      {activeTab === 'hero-image' && <HeroImageSection token={token} onLogout={onLogout} />}
      {activeTab === 'seo' && <SeoSection token={token} onLogout={onLogout} />}
    </div>
  );
}

// ── Shared API helper ──
function useFetch<T>(token: string, url: string, onLogout: () => void): [T[], () => void] {
  const [data, setData] = useState<T[]>([]);
  const fetchData = useCallback(() => {
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.status === 401) { onLogout(); return []; } return res.json(); })
      .then(setData).catch(() => {});
  }, [token, url, onLogout]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return [data, fetchData];
}

// ── Generic list card ──
function ListCard({ children, onEdit, onDelete }: { children: React.ReactNode; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-200 transition-colors">
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex gap-2 shrink-0">
        <button onClick={onEdit} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">编辑</button>
        <button onClick={onDelete} className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100">删除</button>
      </div>
    </div>
  );
}

// ── Form row helper ──
function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ═══════════════ TIMELINE SECTION ═══════════════
function TimelineSection({ token, onLogout }: Props) {
  const [items, fetchItems] = useFetch<TimelineItem>(token, '/api/admin/about-timeline', onLogout);
  const [form, setForm] = useState<Partial<TimelineItem>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const isEditing = editing !== null || Object.keys(form).length > 0;

  const openNew = () => { setEditing(null); setForm({ year: 2025, emoji: '📌', sort_order: 0, status: 'published' }); };
  const openEdit = (item: TimelineItem) => { setEditing(item.id); setForm(item); };

  const save = async () => {
    const url = editing ? `/api/admin/about-timeline/${editing}` : '/api/admin/about-timeline';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); setForm({}); fetchItems(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？')) return;
    const res = await fetch(`/api/admin/about-timeline/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchItems();
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">共 {items.length} 个里程碑</p>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <ListCard key={item.id} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.year}</span>
                <span className="font-medium text-slate-800">{item.title_en}</span>
                <span className="text-slate-400 text-sm">{item.title_zh}</span>
                <span className="text-slate-400 text-sm">{item.title_vi}</span>
                <span className="text-slate-400 text-sm">{item.title_th}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    );
  }

  return <EditForm title={editing ? '编辑里程碑' : '新增里程碑'} onCancel={() => { setEditing(null); setForm({}); }} onSave={save}>
    <div className="grid grid-cols-3 gap-3">
      <Input label="年份 Year" type="number" value={form.year} onChange={v => setForm(f => ({ ...f, year: Number(v) }))} />
      <Input label="Emoji" value={form.emoji} onChange={v => setForm(f => ({ ...f, emoji: v }))} />
      <Input label="排序 Sort" type="number" value={form.sort_order} onChange={v => setForm(f => ({ ...f, sort_order: Number(v) }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="标题 EN" value={form.title_en} onChange={v => setForm(f => ({ ...f, title_en: v }))} />
      <Input label="标题 ZH" value={form.title_zh} onChange={v => setForm(f => ({ ...f, title_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="标题 VI" value={form.title_vi} onChange={v => setForm(f => ({ ...f, title_vi: v }))} />
      <Input label="标题 TH" value={form.title_th} onChange={v => setForm(f => ({ ...f, title_th: v }))} />
    </div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 EN Desc EN</label><textarea value={form.desc_en} onChange={e => setForm(f => ({ ...f, desc_en: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={3} placeholder="Description in English" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 ZH Desc ZH</label><textarea value={form.desc_zh} onChange={e => setForm(f => ({ ...f, desc_zh: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={3} placeholder="中文描述" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 VI Desc VI</label><textarea value={form.desc_vi} onChange={e => setForm(f => ({ ...f, desc_vi: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={3} placeholder="Mô tả bằng tiếng Việt" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">描述 TH Desc TH</label><textarea value={form.desc_th} onChange={e => setForm(f => ({ ...f, desc_th: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={3} placeholder="คำอธิบายเป็นภาษาไทย" /></div>
  </EditForm>;
}

// ═══════════════ TEAM SECTION ═══════════════
function TeamSection({ token, onLogout }: Props) {
  const [items, fetchItems] = useFetch<TeamMember>(token, '/api/admin/about-team', onLogout);
  const [form, setForm] = useState<Partial<TeamMember>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const isEditing = editing !== null || Object.keys(form).length > 0;

  const openNew = () => { setEditing(null); setForm({ sort_order: 0, status: 'published' }); };
  const openEdit = (item: TeamMember) => { setEditing(item.id); setForm(item); };

  const save = async () => {
    const url = editing ? `/api/admin/about-team/${editing}` : '/api/admin/about-team';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); setForm({}); fetchItems(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？')) return;
    const res = await fetch(`/api/admin/about-team/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchItems();
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">共 {items.length} 位团队成员</p>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <ListCard key={item.id} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  {item.avatar && !item.avatar.startsWith('/uploads/') && !item.avatar.startsWith('http') ? (
                    <span className="w-full h-full flex items-center justify-center text-xl">{item.avatar}</span>
                  ) : item.avatar ? (
                    <img src={item.avatar} alt={item.name_en} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-slate-300">👤</span>
                  )}
                </div>
                <div>
                  <span className="font-medium text-slate-800">{item.name_en}</span>
                  <span className="text-slate-400 text-sm ml-2">{item.name_zh}</span>
                  <span className="text-slate-400 text-sm ml-2">{item.name_vi}</span>
                  <span className="text-slate-400 text-sm ml-2">{item.name_th}</span>
                </div>
                <span className="text-blue-600 text-sm">{item.title_en}</span>
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{item.market_en}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    );
  }

  return <EditForm title={editing ? '编辑团队成员' : '新增团队成员'} onCancel={() => { setEditing(null); setForm({}); }} onSave={save}>
    <div className="grid grid-cols-2 gap-3">
      <ImageUpload label="头像 Avatar" value={form.avatar} onChange={v => setForm(f => ({ ...f, avatar: v }))} token={token} onLogout={onLogout} />
      <div className="space-y-3">
        <Input label="排序 Sort" type="number" value={form.sort_order} onChange={v => setForm(f => ({ ...f, sort_order: Number(v) }))} />
        <Input label="电话 Phone" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
        <Input label="WhatsApp" value={form.whatsapp} onChange={v => setForm(f => ({ ...f, whatsapp: v }))} />
        <Input label="邮箱 Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
        <Input label="Facebook 主页" value={form.facebook} onChange={v => setForm(f => ({ ...f, facebook: v }))} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="姓名 EN" value={form.name_en} onChange={v => setForm(f => ({ ...f, name_en: v }))} />
      <Input label="姓名 ZH" value={form.name_zh} onChange={v => setForm(f => ({ ...f, name_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="姓名 VI" value={form.name_vi} onChange={v => setForm(f => ({ ...f, name_vi: v }))} />
      <Input label="姓名 TH" value={form.name_th} onChange={v => setForm(f => ({ ...f, name_th: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="职位 EN" value={form.title_en} onChange={v => setForm(f => ({ ...f, title_en: v }))} />
      <Input label="职位 ZH" value={form.title_zh} onChange={v => setForm(f => ({ ...f, title_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="职位 VI" value={form.title_vi} onChange={v => setForm(f => ({ ...f, title_vi: v }))} />
      <Input label="职位 TH" value={form.title_th} onChange={v => setForm(f => ({ ...f, title_th: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="市场 Market EN" value={form.market_en} onChange={v => setForm(f => ({ ...f, market_en: v }))} />
      <Input label="市场 Market ZH" value={form.market_zh} onChange={v => setForm(f => ({ ...f, market_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="市场 Market VI" value={form.market_vi} onChange={v => setForm(f => ({ ...f, market_vi: v }))} />
      <Input label="市场 Market TH" value={form.market_th} onChange={v => setForm(f => ({ ...f, market_th: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="覆盖国家 Countries EN" value={form.countries_en} onChange={v => setForm(f => ({ ...f, countries_en: v }))} />
      <Input label="覆盖国家 Countries ZH" value={form.countries_zh} onChange={v => setForm(f => ({ ...f, countries_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="覆盖国家 Countries VI" value={form.countries_vi} onChange={v => setForm(f => ({ ...f, countries_vi: v }))} />
      <Input label="覆盖国家 Countries TH" value={form.countries_th} onChange={v => setForm(f => ({ ...f, countries_th: v }))} />
    </div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">简介 Desc EN</label><textarea value={form.desc_en} onChange={e => setForm(f => ({ ...f, desc_en: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={2} placeholder="Team member description in English" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">简介 Desc ZH</label><textarea value={form.desc_zh} onChange={e => setForm(f => ({ ...f, desc_zh: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={2} placeholder="成员中文简介" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">简介 Desc VI</label><textarea value={form.desc_vi} onChange={e => setForm(f => ({ ...f, desc_vi: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={2} placeholder="Mô tả thành viên bằng tiếng Việt" /></div>
    <div><label className="block text-xs font-medium text-slate-500 mb-1">简介 Desc TH</label><textarea value={form.desc_th} onChange={e => setForm(f => ({ ...f, desc_th: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" rows={2} placeholder="คำอธิบายสมาชิกเป็นภาษาไทย" /></div>
  </EditForm>;
}

// ═══════════════ FACTORY IMAGES SECTION ═══════════════
function FactorySection({ token, onLogout }: Props) {
  const [items, fetchItems] = useFetch<FactoryImage>(token, '/api/admin/about-factory-images', onLogout);
  const [form, setForm] = useState<Partial<FactoryImage>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const isEditing = editing !== null || Object.keys(form).length > 0;

  const openNew = () => { setEditing(null); setForm({ sort_order: 0, status: 'published' }); };
  const openEdit = (item: FactoryImage) => { setEditing(item.id); setForm(item); };

  const save = async () => {
    const url = editing ? `/api/admin/about-factory-images/${editing}` : '/api/admin/about-factory-images';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); setForm({}); fetchItems(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？')) return;
    const res = await fetch(`/api/admin/about-factory-images/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchItems();
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">共 {items.length} 张工厂图片</p>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <ListCard key={item.id} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}>
              <div className="flex items-center gap-3">
                <img src={item.image_url} alt={item.alt_en} className="w-16 h-10 object-cover rounded" />
                <div>
                  <div className="text-sm font-medium text-slate-800 truncate max-w-lg">{item.alt_en}</div>
                  <div className="text-xs text-slate-400">{item.alt_zh}</div>
                  <div className="text-xs text-slate-400">{item.alt_vi}</div>
                  <div className="text-xs text-slate-400">{item.alt_th}</div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    );
  }

  return <EditForm title={editing ? '编辑工厂图片' : '新增工厂图片'} onCancel={() => { setEditing(null); setForm({}); }} onSave={save}>
    <ImageUpload label="工厂图片 Factory Image" value={form.image_url} onChange={v => setForm(f => ({ ...f, image_url: v }))} token={token} onLogout={onLogout} />
    <div className="grid grid-cols-2 gap-3">
      <Input label="Alt 文本 EN" value={form.alt_en} onChange={v => setForm(f => ({ ...f, alt_en: v }))} />
      <Input label="Alt 文本 ZH" value={form.alt_zh} onChange={v => setForm(f => ({ ...f, alt_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="Alt 文本 VI" value={form.alt_vi} onChange={v => setForm(f => ({ ...f, alt_vi: v }))} />
      <Input label="Alt 文本 TH" value={form.alt_th} onChange={v => setForm(f => ({ ...f, alt_th: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="排序 Sort" type="number" value={form.sort_order} onChange={v => setForm(f => ({ ...f, sort_order: Number(v) }))} />
      <div><label className="block text-xs font-medium text-slate-500 mb-1">状态</label><select value={form.status || 'published'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"><option value="published">Published</option><option value="draft">Draft</option></select></div>
    </div>
  </EditForm>;
}

// ═══════════════ CERTIFICATIONS SECTION ═══════════════
function CertSection({ token, onLogout }: Props) {
  const [items, fetchItems] = useFetch<Certification>(token, '/api/admin/about-certifications', onLogout);
  const [form, setForm] = useState<Partial<Certification>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const isEditing = editing !== null || Object.keys(form).length > 0;

  const openNew = () => { setEditing(null); setForm({ sort_order: 0, status: 'published' }); };
  const openEdit = (item: Certification) => { setEditing(item.id); setForm(item); };

  const save = async () => {
    const url = editing ? `/api/admin/about-certifications/${editing}` : '/api/admin/about-certifications';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) { setEditing(null); setForm({}); fetchItems(); }
  };

  const del = async (id: number) => {
    if (!confirm('确认删除？')) return;
    const res = await fetch(`/api/admin/about-certifications/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { onLogout(); return; }
    if (res.ok) fetchItems();
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">共 {items.length} 项认证</p>
          <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ 新增 Add</button>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <ListCard key={item.id} onEdit={() => openEdit(item)} onDelete={() => del(item.id)}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-slate-800">{item.name_en}</span>
                <span className="text-slate-400 text-sm">{item.desc_en}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    );
  }

  return <EditForm title={editing ? '编辑认证' : '新增认证'} onCancel={() => { setEditing(null); setForm({}); }} onSave={save}>
    <div className="grid grid-cols-3 gap-3">
      <Input label="图标 Icon" value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} />
      <Input label="排序 Sort" type="number" value={form.sort_order} onChange={v => setForm(f => ({ ...f, sort_order: Number(v) }))} />
      <div><label className="block text-xs font-medium text-slate-500 mb-1">状态</label><select value={form.status || 'published'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"><option value="published">Published</option><option value="draft">Draft</option></select></div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="名称 EN" value={form.name_en} onChange={v => setForm(f => ({ ...f, name_en: v }))} />
      <Input label="名称 ZH" value={form.name_zh} onChange={v => setForm(f => ({ ...f, name_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="名称 VI" value={form.name_vi} onChange={v => setForm(f => ({ ...f, name_vi: v }))} />
      <Input label="名称 TH" value={form.name_th} onChange={v => setForm(f => ({ ...f, name_th: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="描述 EN" value={form.desc_en} onChange={v => setForm(f => ({ ...f, desc_en: v }))} />
      <Input label="描述 ZH" value={form.desc_zh} onChange={v => setForm(f => ({ ...f, desc_zh: v }))} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Input label="描述 VI" value={form.desc_vi} onChange={v => setForm(f => ({ ...f, desc_vi: v }))} />
      <Input label="描述 TH" value={form.desc_th} onChange={v => setForm(f => ({ ...f, desc_th: v }))} />
    </div>
  </EditForm>;
}

// ═══════════════ SEO SECTION ═══════════════
function SeoSection({ token, onLogout }: Props) {
  const [config, setConfig] = useState<Record<string, { key: string; value_en: string; value_zh: string; value_vi: string; value_th: string }>>({});
  const [saving, setSaving] = useState(false);

  const fetchConfig = useCallback(() => {
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        const map: Record<string, { key: string; value_en: string; value_zh: string; value_vi: string; value_th: string }> = {};
        const configObj = data.config || {};
        Object.entries(configObj).forEach(([k, v]: [string, any]) => {
          if (k.startsWith('about_')) map[k] = { key: k, value_en: v.en || '', value_zh: v.zh || '', value_vi: v.vi || '', value_th: v.th || '' };
        });
        setConfig(map);
      }).catch(() => {});
  }, [token, onLogout]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const update = async (key: string, field: 'value_en' | 'value_zh' | 'value_vi' | 'value_th', val: string) => {
    setConfig(prev => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  };

  const saveAll = async () => {
    setSaving(true);
    const body: Record<string, { en: string; zh: string; vi: string; th: string }> = {};
    Object.values(config).forEach(r => { body[r.key] = { en: r.value_en, zh: r.value_zh, vi: r.value_vi, th: r.value_th }; });
    const res = await fetch('/api/admin/site-config', {
      method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (res.status === 401) { onLogout(); setSaving(false); return; }
    setSaving(false);
    if (res.ok) fetchConfig();
  };

  const fields: [string, string, string][] = [
    ['about_seo_title_en', 'SEO 标题 Title', '浏览器 tab 标题 Browser tab title'],
    ['about_seo_desc_en', 'SEO 描述 Description', '搜索结果摘要 Search result snippet'],
    ['about_seo_keywords_en', 'SEO 关键词 Keywords', '逗号分隔 Comma-separated'],
    ['about_header_title_en', '页面主标题 Header Title', 'H1 标题 H1 heading'],
    ['about_header_subtitle_en', '页面副标题 Header Subtitle', 'H1 下方副标题 Below H1'],
    ['about_section_label_en', '区块标签 Section Label', '"关于我们" / "About Us"'],
    ['about_overview_title_en', '公司概况标题 Overview Title', '概况区域标题 Overview section heading'],
    ['about_overview_p1_en', '公司简介段落1 Overview P1', '第一段文字 First paragraph'],
    ['about_overview_p2_en', '公司简介段落2 Overview P2', '第二段文字 Second paragraph'],
    ['about_timeline_title_en', '发展历程标题 Timeline Title', '"发展历程" / "Our Journey"'],
    ['about_team_title_en', '团队标题 Team Title', '"业务团队" / "Sales Team"'],
    ['about_team_subtitle_en', '团队副标题 Team Subtitle', '团队区域描述 Team description'],
    ['about_factory_title_en', '工厂标题 Factory Title', '"我们的工厂" / "Our Factory"'],
    ['about_factory_subtitle_en', '工厂副标题 Factory Subtitle', '工厂区域描述 Factory description'],
    ['about_cert_title_en', '认证标题 Cert Title', '"认证与质量保证" / "Certifications"'],
    ['about_why_us_title_en', 'Why Us 标题', '"为什么选择安固？" / "Why Choose Angu?"'],
    ['about_stats_label_en', '统计标签 Stats Label', '"全球客户" / "Global Clients"'],
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">{fields.length} 个可编辑字段</p>
        <button onClick={saveAll} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
          {saving ? '保存中...' : '💾 保存全部 Save All'}
        </button>
      </div>
      <div className="space-y-4">
        {fields.map(([key, label, hint]) => {
          const item = config[key];
          return item ? (
            <div key={key} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{key}</span>
                <span className="text-sm font-medium text-slate-800">{label}</span>
                <span className="text-xs text-slate-400">{hint}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">English</label>
                  <textarea
                    rows={key.includes('p1') || key.includes('p2') ? 3 : 1}
                    value={item.value_en}
                    onChange={e => update(key, 'value_en', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">中文</label>
                  <textarea
                    rows={key.includes('p1') || key.includes('p2') ? 3 : 1}
                    value={item.value_zh}
                    onChange={e => update(key, 'value_zh', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tiếng Việt</label>
                  <textarea
                    rows={key.includes('p1') || key.includes('p2') ? 3 : 1}
                    value={item.value_vi}
                    onChange={e => update(key, 'value_vi', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">ภาษาไทย</label>
                  <textarea
                    rows={key.includes('p1') || key.includes('p2') ? 3 : 1}
                    value={item.value_th}
                    onChange={e => update(key, 'value_th', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                  />
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

// ═══════════════ HERO IMAGE SECTION ═══════════════
function HeroImageSection({ token, onLogout }: Props) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const fetchImage = useCallback(() => {
    setLoading(true);
    fetch('/api/site-config')
      .then(res => res.json())
      .then(data => {
        const url = data.config?.about_company_image?.en || '';
        setImageUrl(url);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchImage(); }, [fetchImage]);

  const save = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    const body = { about_company_image: { en: imageUrl, zh: imageUrl } };
    try {
      const res = await fetch('/api/admin/site-config', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.status === 401) { onLogout(); setSaving(false); return; }
      if (!res.ok) {
        const err = await res.text();
        setError(`保存失败: ${err}`);
        setSaving(false);
        return;
      }
      setSuccess(true);
      fetchImage();
    } catch (e: any) {
      setError(`网络错误: ${e.message}`);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-400">加载中...</div>;

  return (
    <div className="max-w-2xl">
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">公司介绍主图 Company Hero Image</h3>
          <p className="text-sm text-slate-500">显示在关于页面公司介绍区域右侧的图片</p>
        </div>

        <ImageUpload label="主图 Hero Image" value={imageUrl} onChange={setImageUrl} token={token} onLogout={onLogout} />

        {imageUrl && (
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 mb-2">当前图片 Current:</p>
            <img src={imageUrl} alt="Company hero" className="w-full max-w-md rounded-lg shadow-sm" />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
            ✅ 保存成功！
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving ? '保存中...' : '💾 保存 Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ SHARED COMPONENTS ═══════════════
function EditForm({ title, children, onCancel, onSave }: { title: string; children: React.ReactNode; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-3xl space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <button onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-700">← 返回 Back</button>
      </div>
      {children}
      <button onClick={onSave} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700">💾 保存 Save</button>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder }: { label: string; value?: string | number; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
    </div>
  );
}

// ── Image Uploader (reusable) ──
function ImageUpload({ label, value, onChange, token, onLogout }: { label: string; value?: string; onChange: (url: string) => void; token: string; onLogout: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  const upload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res.status === 401) { onLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        setPreview(data.url);
        onChange(data.url);
      }
    } catch {}
    setUploading(false);
  };

  const isEmoji = preview && !preview.startsWith('/uploads/') && !preview.startsWith('http');

  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <div className="flex items-start gap-3">
        <div
          className={`w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-blue-400 transition-colors ${uploading ? 'opacity-50' : ''}`}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <svg className="w-6 h-6 text-slate-400 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          ) : preview ? (
            isEmoji ? (
              <span className="text-3xl">{preview}</span>
            ) : (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            )
          ) : (
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }} />
          <button type="button" onClick={() => fileRef.current?.click()} className="px-3 py-1.5 text-xs bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200">
            📁 选择图片 Choose Image
          </button>
          <p className="text-xs text-slate-400">拖拽或点击上传 (drag or click to upload)</p>
          {preview && (
            <input value={preview} onChange={e => { setPreview(e.target.value); onChange(e.target.value); }} placeholder="或粘贴图片 URL" className="w-full px-2 py-1 text-xs border border-slate-200 rounded" />
          )}
        </div>
      </div>
    </div>
  );
}
