'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/admin-i18n';

interface Log {
  id: number;
  user_id: number | null;
  username: string | null;
  action: string;
  entity_type: string;
  entity_id: number | null;
  details: string | null;
  created_at: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

const actionConfig: Record<string, { label: string; cls: string }> = {
  create: { label: '创建', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  update: { label: '更新', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
  delete: { label: '删除', cls: 'bg-red-50 text-red-700 border border-red-200' },
  login:  { label: '登录', cls: 'bg-purple-50 text-purple-700 border border-purple-200' },
};

export default function LogViewer({ token, onLogout }: Props) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLogs(); }, [token]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/logs?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (Array.isArray(data)) setLogs(data);
    } catch { console.error('Failed to load logs'); }
    finally { setLoading(false); }
  };

  const formatDetails = (details: string | null) => {
    if (!details) return '-';
    try {
      const parsed = JSON.parse(details);
      return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(', ');
    } catch {
      return details;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.logs.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {logs.length} 条</p>
        </div>
        <button onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 text-sm shadow-sm">
          🔄 刷新 Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.logs.time}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-24">{T.logs.operator}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">{T.logs.action}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.logs.target}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => {
                const ac = actionConfig[log.action] || { label: log.action, cls: 'bg-slate-100 text-slate-600 border border-slate-200' };
                return (
                  <tr key={log.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap font-mono text-xs">
                      {new Date(log.created_at).toLocaleString('zh-CN')}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{log.username || <span className="text-slate-400">System</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${ac.cls}`}>{ac.label}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="font-medium text-slate-800">{log.entity_type}</span>
                      {log.entity_id && <span className="text-slate-400 ml-1 text-xs">#{log.entity_id}</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate font-mono text-xs"
                      title={formatDetails(log.details)}>
                      {formatDetails(log.details)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {logs.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📋</div><p className="text-slate-500 text-sm">{T.logs.noLogs}</p></div>
          )}
        </div>
      )}
    </div>
  );
}
