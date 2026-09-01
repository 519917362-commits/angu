'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/admin-i18n';

interface Product {
  id: number;
  slug: string;
  category_slug: string;
  name_en: string;
  name_zh: string;
  name_vi: string;
  name_th: string;
  short_description_en: string;
  short_description_zh: string;
  short_description_vi: string;
  short_description_th: string;
  description_en: string;
  description_zh: string;
  description_vi: string;
  description_th: string;
  price: number;
  unit: string;
  moq: number;
  sort_weight: number;
  status: string;
  is_featured: number;
  images: string;
  specifications_en: string;
  specifications_zh: string;
  specifications_vi: string;
  specifications_th: string;
  applications_en: string;
  applications_zh: string;
  applications_vi: string;
  applications_th: string;
  seo_title_en: string;
  seo_title_zh: string;
  seo_title_vi: string;
  seo_title_th: string;
  seo_keywords_en: string;
  seo_keywords_zh: string;
  seo_keywords_vi: string;
  seo_keywords_th: string;
  seo_description_en: string;
  seo_description_zh: string;
  seo_description_vi: string;
  seo_description_th: string;
  faq_en: string;
  faq_zh: string;
  faq_vi: string;
  faq_th: string;
  category_name_en?: string;
  category_name_zh?: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  published: { label: '已发布', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft: { label: '草稿', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function ProductManager({ token, onLogout }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => { fetchProducts(); }, [token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products?limit=200', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(T.products.deleteConfirm)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchProducts();
    } catch {
      console.error('Delete failed');
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name_en.toLowerCase().includes(search.toLowerCase()) || p.name_zh.toLowerCase().includes(search.toLowerCase()) || p.name_vi.toLowerCase().includes(search.toLowerCase()) || p.name_th.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableHead = [
    { label: '', subLabel: '', w: 'w-10' },
    { label: '名称', subLabel: 'NAME', w: 'min-w-[320px] w-[35%]' },
    { label: '分类', subLabel: 'CATEGORY', w: 'w-24' },
    { label: '价格', subLabel: 'PRICE', w: 'w-28' },
    { label: '排序权重', subLabel: 'SORT WEIGHT', w: 'w-20' },
    { label: '状态', subLabel: 'STATUS', w: 'w-40' },
    { label: '操作', subLabel: 'ACTIONS', w: 'w-28' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">产品</h2>
          <p className="text-xs text-slate-400 mt-0.5">Products</p>
        </div>
        <button
          onClick={() => router.push('/admin/products/new')}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
        >
          <span>+</span> 新增产品
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder={T.actions.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">{T.status.all}</option>
          <option value="published">{T.status.published}</option>
          <option value="draft">{T.status.draft}</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {tableHead.map(h => (
                    <th key={h.label + h.subLabel} className={`px-5 py-3 text-left whitespace-nowrap ${h.w}`}>
                      <div className="text-xs font-semibold text-slate-700">{h.label}</div>
                      {h.subLabel && <div className="text-[10px] text-slate-400 uppercase tracking-wide">{h.subLabel}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map(p => {
                  const sc = statusConfig[p.status] || { label: p.status, cls: 'bg-slate-100 text-slate-600' };
                  return (
                    <>
                      <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                            className="text-slate-400 hover:text-blue-600 text-xs transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-blue-100"
                          >
                            {expandedId === p.id ? '▲' : '▼'}
                          </button>
                        </td>
                      <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800 text-sm">{p.name_en}</div>
                          <div className="text-slate-500 text-sm mt-0.5">{p.name_zh}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{p.name_vi || '—'} · {p.name_th || '—'}</div>
                          <div className="text-slate-400 text-xs font-mono mt-0.5">/{p.slug}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-sm text-slate-700">{p.category_name_en}</div>
                          <div className="text-xs text-slate-400">{p.category_name_zh}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-slate-800">
                            {p.price > 0 ? `$${p.price}` : '-'}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">/{p.unit}</span>
                          <div className="text-xs text-slate-400 mt-0.5">MOQ: {p.moq || '-'}</div>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-500 font-mono">{p.sort_weight}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${sc.cls}`}>
                              {sc.label}
                            </span>
                            {p.is_featured === 1 && (
                              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
                                ⭐ Hot
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                          <button
                            onClick={() => router.push(`/admin/products/${p.id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="编辑"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="删除"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                        </td>
                      </tr>

                      {/* Expanded detail */}
                      {expandedId === p.id && (
                        <tr key={`${p.id}-detail`} className="bg-blue-50/20">
                          <td colSpan={7} className="px-8 py-5">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                              {p.short_description_en && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.shortDesc} EN:</span>
                                  <p className="text-slate-700 mt-0.5">{p.short_description_en}</p>
                                </div>
                              )}
                              {p.short_description_zh && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.shortDesc} ZH:</span>
                                  <p className="text-slate-700 mt-0.5">{p.short_description_zh}</p>
                                </div>
                              )}
                              {p.specifications_en && p.specifications_en !== '{}' && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.specs} EN:</span>
                                  <code className="block mt-0.5 text-xs bg-white border rounded p-1.5 text-slate-700 overflow-x-auto">
                                    {p.specifications_en}
                                  </code>
                                </div>
                              )}
                              {p.specifications_zh && p.specifications_zh !== '{}' && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.specs} ZH:</span>
                                  <code className="block mt-0.5 text-xs bg-white border rounded p-1.5 text-slate-700 overflow-x-auto">
                                    {p.specifications_zh}
                                  </code>
                                </div>
                              )}
                              {p.applications_en && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.applications} EN:</span>
                                  <p className="text-slate-700 mt-0.5">{p.applications_en}</p>
                                </div>
                              )}
                              {p.applications_zh && (
                                <div>
                                  <span className="text-slate-500 font-medium">{T.products.applications} ZH:</span>
                                  <p className="text-slate-700 mt-0.5">{p.applications_zh}</p>
                                </div>
                              )}
                              {p.images && (
                                <div className="col-span-2">
                                  <span className="text-slate-500 font-medium">{T.products.images}:</span>
                                  <div className="flex gap-2 mt-1 flex-wrap">
                                    {(() => { try { return JSON.parse(p.images); } catch { return []; } })().map((url: string, i: number) => (
                                      <img key={i} src={url} alt="" className="w-16 h-12 object-cover rounded border bg-slate-100" onError={e => (e.currentTarget.style.display = 'none')} />
                                    ))}
                                  </div>
                                </div>
                              )}
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
              <div className="text-4xl mb-2">📦</div>
              <p className="text-slate-500 text-sm">{T.products.noProducts}</p>
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
