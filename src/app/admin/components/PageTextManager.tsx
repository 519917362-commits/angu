'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──
export interface TextField {
  key: string;
  label: string;
  hint?: string;
  rows?: number; // 1=inline input, >1=textarea
  type?: 'text' | 'image'; // default: text
}

export interface PageTab {
  id: string;
  label: string;
  fields: TextField[];
}

interface Props {
  pagePrefix: string;   // e.g. "home", "products", "blog"
  title: string;
  subtitle: string;
  tabs: PageTab[];
  token: string;
  onLogout: () => void;
  hideHeader?: boolean; // when nested inside another manager
}

export default function PageTextManager({ pagePrefix, title, subtitle, tabs, token, onLogout, hideHeader }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'content');
  const [config, setConfig] = useState<Record<string, { en: string; zh: string; vi: string; th: string }>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchConfig = useCallback(() => {
    fetch('/api/admin/site-config', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.status === 401) { onLogout(); return []; } return res.json(); })
      .then(data => {
        if (Array.isArray(data)) {
          const map: Record<string, { en: string; zh: string; vi: string; th: string }> = {};
          data.forEach((r: { key: string; value_en: string; value_zh: string; value_vi: string; value_th: string }) => {
            map[r.key] = { en: r.value_en || '', zh: r.value_zh || '', vi: r.value_vi || '', th: r.value_th || '' };
          });
          setConfig(map);
        }
      })
      .catch(() => {});
  }, [token, onLogout]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const update = (key: string, field: 'en' | 'zh' | 'vi' | 'th', value: string) => {
    setConfig(prev => ({ ...prev, [key]: { ...(prev[key] || { en: '', zh: '', vi: '', th: '' }), [field]: value } }));
  };

  const saveAll = async () => {
    setSaving(true);
    // Collect only keys that match the page prefix (or seo.*)
    const allFieldKeys = new Set<string>();
    tabs.forEach(tab => tab.fields.forEach(f => allFieldKeys.add(f.key)));

    const body: Record<string, { en: string; zh: string; vi: string; th: string }> = {};
    allFieldKeys.forEach(key => {
      if (config[key]) {
        body[key] = { en: config[key].en, zh: config[key].zh, vi: config[key].vi, th: config[key].th };
      }
    });

    const res = await fetch('/api/admin/site-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (res.status === 401) { onLogout(); setSaving(false); return; }
    setSaving(false);
    if (res.ok) { setMsg('✅ 保存成功 Saved'); fetchConfig(); }
    else { setMsg('❌ 保存失败 Failed'); }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="max-w-4xl">
      {!hideHeader && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
          </div>
          <button onClick={saveAll} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {saving ? '保存中... Saving...' : '💾 保存全部 Save All'}
          </button>
        </div>
      )}
      {hideHeader && (
        <div className="flex justify-end mb-6">
          <button onClick={saveAll} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {saving ? '保存中... Saving...' : '💾 保存全部 Save All'}
          </button>
        </div>
      )}

      {msg && <div className={`mb-4 p-3 rounded-lg text-sm ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</div>}

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {tabs.map(t => (
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

      {/* Active tab content */}
      {tabs.filter(t => t.id === activeTab).map(tab => (
        <div key={tab.id} className="space-y-4">
          {tab.fields.map(field => {
            const val = config[field.key] || { en: '', zh: '', vi: '', th: '' };
            const isImage = field.type === 'image';
            return (
              <div key={field.key} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{field.key}</span>
                  <span className="text-sm font-medium text-slate-800">{field.label}</span>
                  {field.hint && <span className="text-xs text-slate-400">{field.hint}</span>}
                </div>
                {isImage ? (
                  <>
                    {/* Upload + URL */}
                    <div className="flex gap-3 mb-3">
                      <label className="cursor-pointer px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        📤 上传 Upload
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append('image', file);
                          const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
                          if (res.status === 401) { onLogout(); return; }
                          const data = await res.json();
                          if (data.url) { update(field.key, 'en', data.url); update(field.key, 'zh', data.url); update(field.key, 'vi', data.url); update(field.key, 'th', data.url); }
                        }} />
                      </label>
                      <span className="text-xs text-slate-400 self-center">or paste URL below</span>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">图片 URL</label>
                      <input type="text" value={val.en} onChange={e => { update(field.key, 'en', e.target.value); update(field.key, 'zh', e.target.value); update(field.key, 'vi', e.target.value); update(field.key, 'th', e.target.value); }} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono" placeholder="/images/about/factory.jpg" />
                      {val.en && <img src={val.en} className="mt-2 max-w-md h-48 object-cover rounded-lg border" alt="Preview" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                    </div>
                  </>
                ) : (
                <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">English</label>
                    {field.rows && field.rows > 1 ? (
                      <textarea
                        rows={field.rows}
                        value={val.en}
                        onChange={e => update(field.key, 'en', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val.en}
                        onChange={e => update(field.key, 'en', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">中文</label>
                    {field.rows && field.rows > 1 ? (
                      <textarea
                        rows={field.rows}
                        value={val.zh}
                        onChange={e => update(field.key, 'zh', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val.zh}
                        onChange={e => update(field.key, 'zh', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tiếng Việt</label>
                    {field.rows && field.rows > 1 ? (
                      <textarea
                        rows={field.rows}
                        value={val.vi}
                        onChange={e => update(field.key, 'vi', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val.vi}
                        onChange={e => update(field.key, 'vi', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">ภาษาไทย</label>
                    {field.rows && field.rows > 1 ? (
                      <textarea
                        rows={field.rows}
                        value={val.th}
                        onChange={e => update(field.key, 'th', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val.th}
                        onChange={e => update(field.key, 'th', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    )}
                  </div>
                </div>
                </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
