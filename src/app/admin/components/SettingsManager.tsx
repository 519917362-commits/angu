'use client';

import { useState, useEffect } from 'react';

interface ConfigRow {
  key: string;
  value_en: string;
  value_zh: string;
  value_vi: string;
  value_th: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

// Group config keys for better UX
const GROUPS: { label: string; keys: string[] }[] = [
  {
    label: '公司信息 Company Info',
    keys: ['company_name_en', 'company_tagline', 'logo_url', 'company_short_intro_en'],
  },
  {
    label: '关于我们 About Us',
    keys: ['company_desc_en', 'company_desc2_en', 'about_title_en', 'about_label_en', 'about_location_badge_en'],
  },
  {
    label: '联系方式 Contact',
    keys: ['phone', 'email', 'address', 'whatsapp', 'zalo', 'line_id', 'facebook'],
  },
  {
    label: '首页 Hero',
    keys: ['hero_badge_en', 'hero_title_prefix_en', 'hero_subtitle_en', 'hero_cta_en'],
  },
  {
    label: '统计数据 Stats',
    keys: ['stats_years', 'stats_products', 'stats_countries', 'stats_inspection'],
  },
  {
    label: '其他 Other',
    keys: ['copyright'],
  },
  {
    label: 'SEO 元数据 SEO Meta',
    keys: [
      'seo.home.title_en', 'seo.home.description_en', 'seo.home.keywords_en',
      'seo.about.title_en', 'seo.about.description_en', 'seo.about.keywords_en',
      'seo.products.title_en', 'seo.products.description_en', 'seo.products.keywords_en',
      'seo.blog.title_en', 'seo.blog.description_en', 'seo.blog.keywords_en',
      'seo.solutions.title_en', 'seo.solutions.description_en', 'seo.solutions.keywords_en',
      'seo.service.title_en', 'seo.service.description_en', 'seo.service.keywords_en',
      'seo.faq.title_en', 'seo.faq.description_en', 'seo.faq.keywords_en',
      'seo.contact.title_en', 'seo.contact.description_en', 'seo.contact.keywords_en',
      'seo.download.title_en', 'seo.download.description_en', 'seo.download.keywords_en',
    ],
  },
];

// Human-readable labels for config keys
const LABELS: Record<string, string> = {
  company_name_en: '公司名称 Company Name',
  company_tagline: '公司口号 Tagline',
  logo_url: 'Logo 图片路径 Logo URL',
  company_short_intro_en: '公司简介 Company Intro',
  company_desc_en: '关于我们 About Us',
  company_desc2_en: '认证资质 Certifications',
  about_title_en: '关于页标题 About Title',
  about_label_en: '关于页标签 About Label',
  about_location_badge_en: '产地 Badge',
  phone: '电话 Phone',
  email: '邮箱 Email',
  address: '地址 Address',
  whatsapp: 'WhatsApp 号码',
  zalo: 'Zalo 号 / 链接',
  line_id: 'LINE ID',
  facebook: 'Facebook 链接',
  stats_years: '年份 Stats Years',
  stats_products: '产品数 Stats Products',
  stats_countries: '国家数 Stats Countries',
  stats_inspection: '质检率 Stats Inspection',
  copyright: '版权 Copyright',
  seo_default_image: 'SEO 默认图片 Default OG Image',
  hero_badge_en: 'Hero 徽章 Badge',
  hero_title_prefix_en: 'Hero 标题 Title',
  hero_subtitle_en: 'Hero 副标题 Subtitle',
  hero_cta_en: 'Hero CTA 按钮',
  // SEO labels — 每个 key 同时存 EN+ZH 两个值，单个标签即可
  'seo.home.title_en': '首页 Title / 标题', 'seo.home.description_en': '首页 Description / 描述', 'seo.home.keywords_en': '首页 Keywords / 关键词',
  'seo.about.title_en': '关于页 Title / 标题', 'seo.about.description_en': '关于页 Description / 描述', 'seo.about.keywords_en': '关于页 Keywords / 关键词',
  'seo.products.title_en': '产品页 Title / 标题', 'seo.products.description_en': '产品页 Description / 描述', 'seo.products.keywords_en': '产品页 Keywords / 关键词',
  'seo.blog.title_en': '博客页 Title / 标题', 'seo.blog.description_en': '博客页 Description / 描述', 'seo.blog.keywords_en': '博客页 Keywords / 关键词',
  'seo.solutions.title_en': '方案页 Title / 标题', 'seo.solutions.description_en': '方案页 Description / 描述', 'seo.solutions.keywords_en': '方案页 Keywords / 关键词',
  'seo.service.title_en': '服务页 Title / 标题', 'seo.service.description_en': '服务页 Description / 描述', 'seo.service.keywords_en': '服务页 Keywords / 关键词',
  'seo.faq.title_en': 'FAQ页 Title / 标题', 'seo.faq.description_en': 'FAQ页 Description / 描述', 'seo.faq.keywords_en': 'FAQ页 Keywords / 关键词',
  'seo.contact.title_en': '联系页 Title / 标题', 'seo.contact.description_en': '联系页 Description / 描述', 'seo.contact.keywords_en': '联系页 Keywords / 关键词',
  'seo.download.title_en': '下载页 Title / 标题', 'seo.download.description_en': '下载页 Description / 描述', 'seo.download.keywords_en': '下载页 Keywords / 关键词',
};

export default function SettingsManager({ token, onLogout }: Props) {
  const [rows, setRows] = useState<ConfigRow[]>([]);
  const [edits, setEdits] = useState<Record<string, { en: string; zh: string; vi: string; th: string }>>({});
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/site-config', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (res.status === 401) { onLogout(); return []; } return res.json(); })
      .then(data => {
        if (Array.isArray(data)) {
          setRows(data);
          const init: Record<string, { en: string; zh: string; vi: string; th: string }> = {};
          data.forEach((r: ConfigRow) => { init[r.key] = { en: r.value_en, zh: r.value_zh, vi: r.value_vi, th: r.value_th }; });
          setEdits(init);
        }
      })
      .catch(() => {});
  }, [token, onLogout]);

  const handleLogoUpload = async (file: File) => {
    setLogoUploading(true);
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
        // Update both en and zh to the same URL
        setEdits(prev => ({ ...prev, logo_url: { en: url, zh: url, vi: url, th: url } }));
        // Save immediately
        const saveRes = await fetch('/api/admin/site-config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ logo_url: { en: url, zh: url, vi: url, th: url } }),
        });
        if (saveRes.status === 401) { onLogout(); return; }
        setMsg('✅ Logo 上传成功 Uploaded');
      } else {
        setMsg('❌ 上传失败 Upload failed');
      }
    } catch { setMsg('❌ 网络错误 Network error'); }
    setLogoUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: Record<string, { en: string; zh: string; vi: string; th: string }> = {};
      Object.entries(edits).forEach(([key, val]) => {
        const original = rows.find(r => r.key === key);
        if (!original || original.value_en !== val.en || original.value_zh !== val.zh || original.value_vi !== val.vi || original.value_th !== val.th) {
          body[key] = val;
        }
      });
      if (Object.keys(body).length === 0) { setMsg('无变更 No changes'); setSaving(false); return; }
      const res = await fetch('/api/admin/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.status === 401) { onLogout(); return; }
      if (res.ok) setMsg('✅ 保存成功 Saved');
      else setMsg('❌ 保存失败 Failed');
    } catch { setMsg('❌ 网络错误 Network error'); }
    setSaving(false);
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">站点设置 Settings</h1>
          <p className="text-sm text-slate-400 mt-0.5">管理站点全局配置 / Manage site configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {saving ? '保存中... Saving...' : '💾 保存 Save'}
        </button>
      </div>
      {msg && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{msg}</div>}

      {/* Logo Upload */}
      <div className="mb-8 p-4 bg-white border border-slate-200 rounded-lg">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">站点 Logo</h2>
        <div className="flex items-center gap-6">
          {/* Preview */}
          <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
            {edits.logo_url?.en ? (
              <img src={edits.logo_url.en} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <span className="text-slate-400 text-xs">No Logo</span>
            )}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer">
              {logoUploading ? '上传中... Uploading...' : '📁 上传 Logo Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }}
                disabled={logoUploading}
              />
            </label>
            <p className="text-xs text-slate-400 mt-1.5">建议尺寸 200×60px，PNG/SVG 透明底 / Recommended: 200×60px, PNG/SVG with transparency</p>
          </div>
        </div>
      </div>

      {GROUPS.map(group => {
        const groupKeys = group.keys.filter(k => rows.some(r => r.key === k));
        if (groupKeys.length === 0) return null;
        return (
          <div key={group.label} className="mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{group.label}</h2>
            <div className="space-y-3">
              {groupKeys.map(key => (
                <div key={key} className="bg-white border border-slate-200 rounded-lg p-4">
                  <label className="block text-xs font-medium text-slate-500 mb-2">{LABELS[key] || key}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-slate-400 mb-1 block">English</span>
                      <input
                        type="text"
                        value={edits[key]?.en || ''}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: { ...prev[key], en: e.target.value } }))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 mb-1 block">中文</span>
                      <input
                        type="text"
                        value={edits[key]?.zh || ''}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: { ...prev[key], zh: e.target.value } }))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <span className="text-xs text-slate-400 mb-1 block">Tiếng Việt</span>
                      <input
                        type="text"
                        value={edits[key]?.vi || ''}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: { ...prev[key], vi: e.target.value } }))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 mb-1 block">ภาษาไทย</span>
                      <input
                        type="text"
                        value={edits[key]?.th || ''}
                        onChange={e => setEdits(prev => ({ ...prev, [key]: { ...prev[key], th: e.target.value } }))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
