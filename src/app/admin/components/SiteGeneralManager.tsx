'use client';

import { useState, useEffect, useCallback } from 'react';

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

const FIELDS: { key: string; label: string; hint?: string }[] = [
  { key: 'company_name_en', label: '公司名称 Company Name' },
  { key: 'company_tagline', label: '公司口号 Tagline' },
  { key: 'logo_url', label: 'Logo URL' },
  { key: 'copyright', label: '版权 Copyright' },
  { key: 'phone', label: '电话 Phone' },
  { key: 'email', label: '邮箱 Email' },
  { key: 'address', label: '地址 Address' },
  { key: 'whatsapp', label: 'WhatsApp 号码' },
  { key: 'zalo', label: 'Zalo 号 / 链接' },
  { key: 'line_id', label: 'LINE ID' },
  { key: 'facebook', label: 'Facebook 链接' },
  { key: 'smtp_host', label: 'SMTP 主机 Host' },
  { key: 'smtp_port', label: 'SMTP 端口 Port' },
  { key: 'smtp_user', label: 'SMTP 账号 User' },
  { key: 'smtp_pass', label: 'SMTP 密码 Password' },
  { key: 'smtp_from', label: '发件人 From' },
];

const QR_KEYS: { key: string; label: string; color: string }[] = [
  { key: 'qr_whatsapp', label: 'WhatsApp', color: '#25D366' },
  { key: 'qr_zalo', label: 'Zalo', color: '#0068FF' },
  { key: 'qr_line', label: 'LINE', color: '#06C755' },
  { key: 'qr_facebook', label: 'Facebook', color: '#1877F2' },
];

export default function SiteGeneralManager({ token, onLogout }: Props) {
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
        setEdits(prev => ({ ...prev, logo_url: { en: url, zh: url, vi: url, th: url } }));
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

  const handleOrupLoad = useCallback(async (qrKey: string, file: File) => {
    setMsg('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.status === 401) { onLogout(); return; }
      if (res.ok) {
        const data = await res.json();
        const url = data.url || `/uploads/${file.name}`;
        // QR is language-independent — same image for all 4 locales
        setEdits(prev => ({ ...prev, [qrKey]: { en: url, zh: url, vi: url, th: url } }));
        const saveRes = await fetch('/api/admin/site-config', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ [qrKey]: { en: url, zh: url, vi: url, th: url } }),
        });
        if (saveRes.status === 401) { onLogout(); return; }
        setMsg(`✅ ${qrKey} 上传成功`);
      } else {
        setMsg('❌ 上传失败 Upload failed');
      }
    } catch { setMsg('❌ 网络错误 Network error'); }
  }, [token, onLogout]);

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
          <h1 className="text-2xl font-bold text-slate-900">站点综合 Site General</h1>
          <p className="text-sm text-slate-400 mt-0.5">公司基础信息、Logo、版权、SMTP / Company info, Logo, copyright, SMTP</p>
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

      {/* QR Code Uploads — single image shared across all languages */}
      <div className="mb-8 p-4 bg-white border border-slate-200 rounded-lg">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">社媒二维码 Social QR Codes</h2>
        <p className="text-xs text-slate-400 mb-4">上传本地二维码图片，四语共用同一张图 / Upload from local, same image for all languages</p>
        <div className="grid grid-cols-4 gap-4">
          {QR_KEYS.map(qr => {
            const edit = edits[qr.key];
            const url = edit?.en || '';
            return (
              <div key={qr.key} className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                  {url ? (
                    <img src={url} alt={qr.label} className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-3xl" style={{ color: qr.color }}>▣</span>
                      <span className="text-xs text-slate-300">无图片 No image</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium" style={{ color: qr.color }}>{qr.label}</span>
                {url && (
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="w-full px-2 py-1 text-xs text-slate-400 bg-white border border-slate-100 rounded text-center"
                  />
                )}
                <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md font-medium text-xs hover:bg-blue-700 transition-colors cursor-pointer mt-auto">
                  📁 上传 Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleOrupLoad(qr.key, f); }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Config Fields */}
      <div className="space-y-4">
        {FIELDS.map(f => {
          const edit = edits[f.key];
          if (!edit) return null;
          return (
            <div key={f.key} className="bg-white border border-slate-200 rounded-lg p-4">
              <label className="block text-xs font-medium text-slate-500 mb-2">
                {f.label}
                {f.hint && <span className="text-slate-300 ml-2">— {f.hint}</span>}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-400 mb-1 block">English</span>
                  <input
                    type="text"
                    value={edit.en || ''}
                    onChange={e => setEdits(prev => ({ ...prev, [f.key]: { ...prev[f.key], en: e.target.value } }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400 mb-1 block">中文</span>
                  <input
                    type="text"
                    value={edit.zh || ''}
                    onChange={e => setEdits(prev => ({ ...prev, [f.key]: { ...prev[f.key], zh: e.target.value } }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <span className="text-xs text-slate-400 mb-1 block">Tiếng Việt</span>
                  <input
                    type="text"
                    value={edit.vi || ''}
                    onChange={e => setEdits(prev => ({ ...prev, [f.key]: { ...prev[f.key], vi: e.target.value } }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400 mb-1 block">ภาษาไทย</span>
                  <input
                    type="text"
                    value={edit.th || ''}
                    onChange={e => setEdits(prev => ({ ...prev, [f.key]: { ...prev[f.key], th: e.target.value } }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
