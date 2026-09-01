'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: number;
  slug: string;
  category_slug: string;
  title_en: string;
  title_zh: string;
  title_vi: string;
  title_th: string;
  abstract_en: string;
  abstract_zh: string;
  abstract_vi: string;
  abstract_th: string;
  content_en: string;
  content_zh: string;
  content_vi: string;
  content_th: string;
  cover_image: string;
  status: string;
  publish_time: string;
  category_name_en?: string;
  category_name_zh?: string;
  category_name_vi?: string;
  category_name_th?: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  published: { label: '已发布', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft: { label: '草稿', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function BlogManager({ token, onLogout }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => { fetchPosts(); }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog-posts?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch {
      console.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除此文章？ Confirm delete this post?')) return;
    await fetch(`/api/admin/blog-posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">博客</h2>
          <p className="text-xs text-slate-400 mt-0.5">Blog Posts · 共 {posts.length} 篇</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm"
        >
          + 新增博客
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-10 px-4 py-3">
                    <div className="text-xs font-semibold text-slate-700">#</div>
                  </th>
                  <th className="px-5 py-3 text-left">
                    <div className="text-xs font-semibold text-slate-700">标题</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">TITLE</div>
                  </th>
                  <th className="w-40 px-5 py-3 text-left">
                    <div className="text-xs font-semibold text-slate-700">分类</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">CATEGORY</div>
                  </th>
                  <th className="w-28 px-5 py-3 text-left whitespace-nowrap">
                    <div className="text-xs font-semibold text-slate-700">发布时间</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">DATE</div>
                  </th>
                  <th className="w-28 px-5 py-3 text-left">
                    <div className="text-xs font-semibold text-slate-700">状态</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">STATUS</div>
                  </th>
                  <th className="w-28 px-5 py-3 text-left">
                    <div className="text-xs font-semibold text-slate-700">操作</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide">ACTIONS</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map(post => {
                  const sc = statusConfig[post.status] || { label: post.status, cls: 'bg-slate-100 text-slate-600' };
                  const isOpen = expandedId === post.id;
                  return (
                    <>
                      <tr key={post.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3">
                          <button onClick={() => setExpandedId(isOpen ? null : post.id)}
                            className="text-slate-400 hover:text-blue-600 text-xs transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-blue-100">
                            {isOpen ? '▲' : '▼'}
                          </button>
                        </td>
                        <td className="px-5 py-3">
                          <div className="font-semibold text-slate-800 text-sm truncate">{post.title_en}</div>
                          <div className="text-slate-500 text-sm mt-0.5 truncate">{post.title_zh}</div>
                          <div className="text-slate-400 text-xs font-mono mt-0.5 truncate">/{post.slug}</div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-sm text-slate-700">{post.category_name_en || '-'}</div>
                          <div className="text-xs text-slate-400">{post.category_name_zh || ''}</div>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-500 whitespace-nowrap">
                          {post.publish_time ? new Date(post.publish_time).toLocaleDateString('zh-CN') : '-'}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${sc.cls}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button onClick={() => router.push(`/admin/blogs/${post.id}`)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="编辑"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                            <button onClick={() => handleDelete(post.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="删除"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr key={`${post.id}-detail`} className="bg-blue-50/20">
                          <td colSpan={6} className="px-8 py-5">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                              <div>
                                <span className="text-slate-500 font-medium">摘要 EN:</span>
                                <p className="text-slate-700 mt-0.5">{post.abstract_en || '-'}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">摘要 ZH:</span>
                                <p className="text-slate-700 mt-0.5">{post.abstract_zh || '-'}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">摘要 VI:</span>
                                <p className="text-slate-700 mt-0.5">{post.abstract_vi || '-'}</p>
                              </div>
                              <div>
                                <span className="text-slate-500 font-medium">摘要 TH:</span>
                                <p className="text-slate-700 mt-0.5">{post.abstract_th || '-'}</p>
                              </div>
                              {post.cover_image && (
                                <div className="col-span-2">
                                  <span className="text-slate-500 font-medium">封面:</span>
                                  <img src={post.cover_image} className="h-16 object-cover rounded border mt-1"
                                    onError={e => (e.currentTarget.style.display = 'none')} />
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
          {posts.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📝</div><p className="text-slate-500 text-sm">暂无博客文章</p></div>
          )}
        </div>
      )}
    </div>
  );
}
