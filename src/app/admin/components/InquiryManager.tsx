'use client';

import { useState, useEffect } from 'react';
import { T } from '@/lib/admin-i18n';

interface Inquiry {
  id: number;
  inquiry_no: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  quantity: string;
  message: string;
  product_slug: string;
  status: string;
  created_at: string;
  /** 以下为广告归因字段，后端 SELECT * 直接返回；老记录为空 */
  locale?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

/**
 * 线索来源判定。
 * 顺序很重要：gclid 只由 Google Ads 点击产生，优先级最高；
 * 其次是带 utm 的投放；再次是自然搜索引荐；最后是直接访问。
 * 没有这一段，投放后只能靠 sqlite 命令行分辨哪条询盘是花钱买来的。
 */
function sourceOf(i: Inquiry): { label: string; cls: string; title: string } {
  if (i.gclid || i.gbraid || i.wbraid) {
    return { label: 'Google Ads', cls: 'bg-blue-50 text-blue-700 border border-blue-200', title: i.gclid ? `gclid: ${i.gclid}` : '点击标识已采集' };
  }
  if (i.utm_source) {
    return { label: i.utm_source.slice(0, 16), cls: 'bg-violet-50 text-violet-700 border border-violet-200', title: [i.utm_source, i.utm_medium, i.utm_campaign].filter(Boolean).join(' / ') };
  }
  if (i.referrer && /google\./i.test(i.referrer)) {
    return { label: 'Google 自然', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', title: i.referrer };
  }
  if (i.referrer) {
    return { label: '外部引荐', cls: 'bg-amber-50 text-amber-700 border border-amber-200', title: i.referrer };
  }
  return { label: '直接访问', cls: 'bg-slate-100 text-slate-600 border border-slate-200', title: '' };
}

interface Props {
  token: string;
  onLogout: () => void;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  new:      { label: '新询盘', cls: 'bg-blue-50 text-blue-700 border border-blue-200' },
  processing: { label: '处理中', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
  completed:  { label: '已完成', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  cancelled:  { label: '已取消', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

const tableHead = [
  { label: 'No.', key: 'no' },
  { label: T.inquiries.name, key: 'name' },
  { label: T.inquiries.product, key: 'product' },
  { label: T.inquiries.message, key: 'message' },
  { label: T.inquiries.status, key: 'status' },
  { label: T.inquiries.date, key: 'date' },
  { label: T.inquiries.status, key: 'action' },
];

export default function InquiryManager({ token, onLogout }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [adsOnly, setAdsOnly] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => { fetchInquiries(); }, [token]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch {
      console.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchInquiries();
    } catch {
      console.error('Update failed');
    }
  };

  const filtered = (statusFilter === 'all' ? inquiries : inquiries.filter(i => i.status === statusFilter))
    .filter(i => (adsOnly ? Boolean(i.gclid || i.wbraid || i.gbraid || i.utm_source) : true));

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.inquiries.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {filtered.length} 条</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 text-sm shadow-sm"
        >
          🔄 刷新 Refresh
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {['all', 'new', 'processing', 'completed', 'cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              statusFilter === s
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s === 'all' ? T.status.all : (statusConfig[s]?.label || s)}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button
          onClick={() => setAdsOnly(v => !v)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            adsOnly
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="只显示带 gclid 或 utm 的线索（投放带来的）"
        >
          只看投放线索
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">No.</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-32">Product</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">Source</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-28">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-24">Date</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((inquiry) => {
                  const sc = statusConfig[inquiry.status] || { label: inquiry.status, cls: 'bg-slate-100 text-slate-600' };
                  const isOpen = expanded === inquiry.id;
                  return (
                    <>
                      <tr key={inquiry.id} className="hover:bg-blue-50/20 transition-colors">
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setExpanded(isOpen ? null : inquiry.id)}
                            className="text-slate-400 hover:text-blue-600 text-xs transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-blue-100"
                          >
                            {isOpen ? '▲' : '▼'}
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800 text-sm">{inquiry.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{inquiry.email}</div>
                          {inquiry.company && (
                            <div className="text-slate-400 text-xs">{inquiry.company}{inquiry.country ? ` · ${inquiry.country}` : ''}</div>
                          )}
                          {inquiry.phone && (
                            <div className="text-slate-400 text-xs">{inquiry.phone}</div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-600 font-mono">{inquiry.product_slug || '-'}</span>
                        </td>
                        <td className="px-5 py-4">
                          {(() => {
                            const src = sourceOf(inquiry);
                            return (
                              <>
                                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${src.cls}`} title={src.title}>
                                  {src.label}
                                </span>
                                {inquiry.locale && (
                                  <div className="text-[11px] text-slate-400 mt-1 uppercase">{inquiry.locale}</div>
                                )}
                              </>
                            );
                          })()}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${sc.cls}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {new Date(inquiry.created_at).toLocaleDateString('zh-CN')}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={inquiry.status}
                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="new">🆕 新询盘</option>
                            <option value="processing">⏳ 处理中</option>
                            <option value="completed">✅ 已完成</option>
                            <option value="cancelled">❌ 已取消</option>
                          </select>
                        </td>
                      </tr>

                      {isOpen && (
                        <tr key={`${inquiry.id}-detail`} className="bg-blue-50/20">
                          <td colSpan={7} className="px-8 py-5">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500 font-medium">{T.inquiries.quantity}:</span>
                                <p className="text-slate-700 mt-0.5">{inquiry.quantity || '-'}</p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-slate-500 font-medium">{T.inquiries.message}:</span>
                                <p className="text-slate-700 mt-0.5">{inquiry.message || '-'}</p>
                              </div>
                            </div>

                            {/* 归因明细：投放后复盘全靠这一块，没有就只能去翻数据库 */}
                            <div className="mt-4 pt-3 border-t border-blue-100 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                              <div>
                                <span className="text-slate-400">落地页</span>
                                <p className="text-slate-700 font-mono break-all mt-0.5">{inquiry.landing_page || '-'}</p>
                              </div>
                              <div>
                                <span className="text-slate-400">UTM</span>
                                <p className="text-slate-700 font-mono break-all mt-0.5">
                                  {[inquiry.utm_source, inquiry.utm_medium, inquiry.utm_campaign].filter(Boolean).join(' / ') || '-'}
                                </p>
                              </div>
                              <div>
                                <span className="text-slate-400">来源页 / Referrer</span>
                                <p className="text-slate-700 font-mono break-all mt-0.5">{inquiry.referrer || '-'}</p>
                              </div>
                              <div>
                                <span className="text-slate-400">gclid</span>
                                <p className="text-slate-700 font-mono break-all mt-0.5">
                                  {inquiry.gclid || inquiry.wbraid || inquiry.gbraid || '-'}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-14">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-slate-500 text-sm">{T.inquiries.noInquiries}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="text-sm text-slate-500">
                共 {filtered.length} 条，第 {currentPage}/{totalPages} 页
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm rounded ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
