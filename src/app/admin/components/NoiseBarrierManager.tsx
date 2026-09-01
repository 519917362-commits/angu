'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──
interface Project {
  id: number;
  image_url: string;
  title_en: string; title_zh: string; title_vi: string; title_th: string;
  location_en: string; location_zh: string; location_vi: string; location_th: string;
  spec_en: string; spec_zh: string; spec_vi: string; spec_th: string;
  sort_order: number; status: string;
}

interface FactoryImage {
  id: number; image_url: string;
  alt_en: string; alt_zh: string; alt_vi: string; alt_th: string;
  sort_order: number; status: string;
}

interface Props { token: string; onLogout: () => void; }

type Tab = 'projects' | 'factory-images' | 'hero-image' | 'seo';

const API = process.env.NEXT_PUBLIC_API_BASE || '';
const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
  { code: 'vi', label: 'VI' },
  { code: 'th', label: 'TH' },
];

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-slate-500 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function ImageUrlField({ label, value, onChange, token }: { label: string; value: string; onChange: (v: string) => void; token: string }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch { /* ignore */ }
    setUploading(false);
  };

  return (
    <div>
      <label className="text-xs text-slate-500 mb-1 block">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /images/..."
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />
        <label className={`px-3 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap ${uploading ? 'bg-slate-300' : 'bg-slate-100 hover:bg-slate-200'}`}>
          {uploading ? '...' : '📤 Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
        </label>
      </div>
      {value && <img src={value} alt="" className="mt-2 w-20 h-20 object-cover rounded-lg border border-slate-200" />}
    </div>
  );
}

const emptyProject: Omit<Project, 'id'> = {
  image_url: '', title_en: '', title_zh: '', title_vi: '', title_th: '',
  location_en: '', location_zh: '', location_vi: '', location_th: '',
  spec_en: '', spec_zh: '', spec_vi: '', spec_th: '',
  sort_order: 0, status: 'published',
};

const emptyFactory: Omit<FactoryImage, 'id'> = {
  image_url: '', alt_en: '', alt_zh: '', alt_vi: '', alt_th: '',
  sort_order: 0, status: 'published',
};

export default function NoiseBarrierManager({ token, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [factoryImages, setFactoryImages] = useState<FactoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingFactory, setEditingFactory] = useState<FactoryImage | null>(null);
  const [saving, setSaving] = useState(false);
  const [heroImage, setHeroImage] = useState<Record<string, string>>({ en: '', zh: '', vi: '', th: '' });
  const [heroSaving, setHeroSaving] = useState(false);
  const [seo, setSeo] = useState<{ title: Record<string, string>; description: Record<string, string>; keywords: Record<string, string> }>({
    title: { en: '', zh: '', vi: '', th: '' },
    description: { en: '', zh: '', vi: '', th: '' },
    keywords: { en: '', zh: '', vi: '', th: '' },
  });
  const [seoSaving, setSeoSaving] = useState(false);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, fRes] = await Promise.all([
        fetch(`${API}/api/admin/noise-barrier-projects`, { headers }),
        fetch(`${API}/api/admin/noise-barrier-factory-images`, { headers }),
      ]);
      if (pRes.ok) setProjects(await pRes.json());
      if (fRes.ok) setFactoryImages(await fRes.json());
      // Fetch hero image from site_config
      try {
        const sRes = await fetch(`${API}/api/site-config`);
        if (sRes.ok) {
          const sData = await sRes.json();
          const hero = sData?.config?.noise_hero_image;
          if (hero) setHeroImage({ en: hero.en || '', zh: hero.zh || '', vi: hero.vi || '', th: hero.th || '' });
          const st = sData?.config?.noise_barrier_seo_title;
          const sd = sData?.config?.noise_barrier_seo_description;
          const sk = sData?.config?.noise_barrier_seo_keywords;
          if (st) setSeo(prev => ({ ...prev, title: { en: st.en || '', zh: st.zh || '', vi: st.vi || '', th: st.th || '' } }));
          if (sd) setSeo(prev => ({ ...prev, description: { en: sd.en || '', zh: sd.zh || '', vi: sd.vi || '', th: sd.th || '' } }));
          if (sk) setSeo(prev => ({ ...prev, keywords: { en: sk.en || '', zh: sk.zh || '', vi: sk.vi || '', th: sk.th || '' } }));
        }
      } catch { /* ignore */ }
    } catch { /* ignore */ }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Project CRUD ──
  async function saveProject() {
    if (!editingProject) return;
    setSaving(true);
    try {
      const isEdit = editingProject.id;
      const url = isEdit
        ? `${API}/api/admin/noise-barrier-projects/${editingProject.id}`
        : `${API}/api/admin/noise-barrier-projects`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(editingProject) });
      if (res.ok) { setEditingProject(null); fetchData(); }
    } catch { /* ignore */ }
    setSaving(false);
  }

  async function deleteProject(id: number) {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`${API}/api/admin/noise-barrier-projects/${id}`, { method: 'DELETE', headers });
      fetchData();
    } catch { /* ignore */ }
  }

  // ── Factory Image CRUD ──
  async function saveFactory() {
    if (!editingFactory) return;
    setSaving(true);
    try {
      const isEdit = editingFactory.id;
      const url = isEdit
        ? `${API}/api/admin/noise-barrier-factory-images/${editingFactory.id}`
        : `${API}/api/admin/noise-barrier-factory-images`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(editingFactory) });
      if (res.ok) { setEditingFactory(null); fetchData(); }
    } catch { /* ignore */ }
    setSaving(false);
  }

  async function deleteFactory(id: number) {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`${API}/api/admin/noise-barrier-factory-images/${id}`, { method: 'DELETE', headers });
      fetchData();
    } catch { /* ignore */ }
  }

  // ── Hero Image Save (site_config: noise_hero_image) ──
  async function saveHeroImage() {
    setHeroSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/site-config`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ noise_hero_image: heroImage }),
      });
      if (res.ok) alert('Hero image saved');
    } catch { /* ignore */ }
    setHeroSaving(false);
  }

  // ── SEO Save (site_config: noise_barrier_seo_*) ──
  async function saveSeo() {
    setSeoSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/site-config`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          noise_barrier_seo_title: seo.title,
          noise_barrier_seo_description: seo.description,
          noise_barrier_seo_keywords: seo.keywords,
        }),
      });
      if (res.ok) alert('SEO saved');
    } catch { /* ignore */ }
    setSeoSaving(false);
  }

  if (loading) return <div className="p-8 text-slate-400">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">🔇 噪声屏障落地页</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'projects' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >工程案例 ({projects.length})</button>
          <button
            onClick={() => setTab('factory-images')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'factory-images' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >工厂图片 ({factoryImages.length})</button>
          <button
            onClick={() => setTab('hero-image')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'hero-image' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >Hero 主图</button>
          <button
            onClick={() => setTab('seo')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'seo' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >SEO 配置</button>
        </div>
      </div>

      {/* ── Projects Tab ── */}
      {tab === 'projects' && (
        <div>
          {!editingProject ? (
            <>
              <button
                onClick={() => setEditingProject({ ...emptyProject } as Project)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >+ 添加案例</button>
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map(p => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                    {p.image_url && <img src={p.image_url} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-800 truncate">{p.title_en || p.title_zh}</div>
                      <div className="text-xs text-slate-400 truncate">{p.location_en}</div>
                      <div className="text-xs text-blue-600 truncate">{p.spec_en}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => setEditingProject(p)} className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">编辑</button>
                        <button onClick={() => deleteProject(p.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded">删除</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">{editingProject.id ? '编辑案例' : '新增案例'}</h2>
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <ImageUrlField label="案例图片" value={editingProject.image_url} token={token}
                onChange={(v) => setEditingProject({ ...editingProject, image_url: v })} />

              <div className="grid grid-cols-4 gap-3">
                {LANGS.map(l => (
                  <Field key={l.code} label={`标题 (${l.label})`}
                    value={(editingProject as any)[`title_${l.code}`]}
                    onChange={(v) => setEditingProject({ ...editingProject, [`title_${l.code}`]: v })} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {LANGS.map(l => (
                  <Field key={l.code} label={`地点 (${l.label})`}
                    value={(editingProject as any)[`location_${l.code}`]}
                    onChange={(v) => setEditingProject({ ...editingProject, [`location_${l.code}`]: v })} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {LANGS.map(l => (
                  <Field key={l.code} label={`规格 (${l.label})`}
                    value={(editingProject as any)[`spec_${l.code}`]}
                    onChange={(v) => setEditingProject({ ...editingProject, [`spec_${l.code}`]: v })} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="排序" value={String(editingProject.sort_order)}
                  onChange={(v) => setEditingProject({ ...editingProject, sort_order: parseInt(v) || 0 })} />
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">状态</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={saveProject} disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Factory Images Tab ── */}
      {tab === 'factory-images' && (
        <div>
          {!editingFactory ? (
            <>
              <button
                onClick={() => setEditingFactory({ ...emptyFactory } as FactoryImage)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >+ 添加图片</button>
              <div className="grid sm:grid-cols-3 gap-4">
                {factoryImages.map(f => (
                  <div key={f.id} className="bg-white border border-slate-200 rounded-xl p-3">
                    {f.image_url && <img src={f.image_url} alt="" className="w-full aspect-[4/3] object-cover rounded-lg mb-2" />}
                    <div className="text-sm font-medium text-slate-800 truncate">{f.alt_en || 'No alt'}</div>
                    <div className="text-xs text-slate-400">Sort: {f.sort_order}</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setEditingFactory(f)} className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">编辑</button>
                      <button onClick={() => deleteFactory(f.id)} className="text-xs px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded">删除</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">{editingFactory.id ? '编辑图片' : '新增图片'}</h2>
                <button onClick={() => setEditingFactory(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <ImageUrlField label="工厂图片" value={editingFactory.image_url} token={token}
                onChange={(v) => setEditingFactory({ ...editingFactory, image_url: v })} />

              <div className="grid grid-cols-4 gap-3">
                {LANGS.map(l => (
                  <Field key={l.code} label={`Alt 文案 (${l.label})`}
                    value={(editingFactory as any)[`alt_${l.code}`]}
                    onChange={(v) => setEditingFactory({ ...editingFactory, [`alt_${l.code}`]: v })} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="排序" value={String(editingFactory.sort_order)}
                  onChange={(v) => setEditingFactory({ ...editingFactory, sort_order: parseInt(v) || 0 })} />
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">状态</label>
                  <select
                    value={editingFactory.status}
                    onChange={(e) => setEditingFactory({ ...editingFactory, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={saveFactory} disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditingFactory(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Hero Image Tab ── */}
      {tab === 'hero-image' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Hero 区块产品主图</h2>
          <p className="text-xs text-slate-400">配置落地页 Hero 右侧展示的产品图片，可为不同语言设置不同图片。留空则使用默认图 `/images/products/highway-noise-barrier.jpg`。</p>

          <div className="space-y-4">
            {LANGS.map(l => (
              <div key={l.code}>
                <ImageUrlField label={`Hero 图片 (${l.label})`}
                   value={heroImage[l.code] || ''}
                   token={token}
                   onChange={(v) => setHeroImage({ ...heroImage, [l.code]: v })}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={saveHeroImage} disabled={heroSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300">
              {heroSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* ── SEO Tab ── */}
      {tab === 'seo' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">落地页 SEO 配置</h2>
          <p className="text-xs text-slate-400">配置声屏障落地页四语的 title / description / keywords。留空则使用内置默认文案。</p>

          {(['title', 'description', 'keywords'] as const).map(field => (
            <div key={field} className="space-y-2">
              <div className="text-sm font-medium text-slate-700">
                {field === 'title' ? 'SEO 标题 Title' : field === 'description' ? 'SEO 描述 Description' : 'SEO 关键词 Keywords'}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {LANGS.map(l => (
                  <div key={l.code}>
                    <label className="text-xs text-slate-500 mb-1 block">{l.label}</label>
                    {field === 'description' ? (
                      <textarea
                        value={seo[field][l.code] || ''}
                        onChange={(e) => setSeo({ ...seo, [field]: { ...seo[field], [l.code]: e.target.value } })}
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={seo[field][l.code] || ''}
                        onChange={(e) => setSeo({ ...seo, [field]: { ...seo[field], [l.code]: e.target.value } })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <button onClick={saveSeo} disabled={seoSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300">
              {seoSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
