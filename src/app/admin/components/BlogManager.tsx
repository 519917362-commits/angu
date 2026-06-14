'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { T } from '@/lib/admin-i18n';

interface BlogPost {
  id: number;
  slug: string;
  category_slug: string;
  title: string;
  abstract: string;
  content: string;
  cover_image: string;
  status: string;
  publish_time: string;
  locale: string;
  category_name?: string;
}

interface Props {
  token: string;
}

const localeLabels: Record<string, string> = {
  en: 'EN', zh: '中文', ar: 'عربي', ja: '日本語',
  ko: '한국어', id: 'Bahasa', vi: 'Tiếng Việt',
  es: 'Español', fr: 'Français', de: 'Deutsch',
  pt: 'Português', th: 'ไทย',
};

const statusConfig: Record<string, { label: string; cls: string }> = {
  published: { label: '已发布', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  draft:     { label: '草稿', cls: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function BlogManager({ token }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog-posts?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{T.blog.title}</h2>
          <p className="text-slate-500 text-sm mt-0.5">共 {posts.length} 篇</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium shadow-sm"
        >
          + {T.blog.add}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">{T.empty.loading}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-8"></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{T.blog.title_label}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-32">{T.blog.category}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-24">{T.blog.date}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-36">{T.blog.status}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map(post => {
                const sc = statusConfig[post.status] || { label: post.status, cls: 'bg-slate-100 text-slate-600' };
                const isOpen = expandedId === post.id;
                return (
                  <>
                    <tr key={post.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => setExpandedId(isOpen ? null : post.id)}
                          className="text-slate-400 hover:text-blue-600 text-xs transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-blue-100">
                          {isOpen ? '▲' : '▼'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800 text-sm">{post.title}</div>
                        <div className="text-slate-400 text-xs font-mono mt-0.5">/{post.slug}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{post.category_name || post.category_slug || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {post.publish_time ? new Date(post.publish_time).toLocaleDateString('zh-CN') : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${sc.cls}`}>{sc.label}</span>
                        <div className="mt-1">
                          <span className="inline-flex px-1.5 py-0.5 text-xs rounded border border-slate-200 text-slate-500 font-mono">
                            {localeLabels[post.locale] || post.locale}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => router.push(`/admin/blogs/${post.id}`)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">{T.actions.edit}</button>
                          <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700 text-sm">{T.actions.delete}</button>
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr key={`${post.id}-detail`} className="bg-blue-50/20">
                        <td colSpan={6} className="px-6 py-4">
                          {post.abstract && (
                            <div className="mb-2 text-sm"><span className="text-slate-500 font-medium">{T.blog.excerpt}:</span> <span className="text-slate-700">{post.abstract}</span></div>
                          )}
                          {post.cover_image && (
                            <div className="mb-2 text-sm"><span className="text-slate-500 font-medium">{T.blog.coverImage}:</span>
                              <img src={post.cover_image} className="h-16 object-cover rounded border mt-1 inline-block ml-2"
                                onError={e => (e.currentTarget.style.display = 'none')} />
                            </div>
                          )}
                          {post.content && (
                            <div className="text-sm"><span className="text-slate-500 font-medium">{T.blog.content}:</span>
                              <span className="text-slate-600 ml-1">{post.content.replace(/<[^>]+>/g, '').slice(0, 200)}...</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="text-center py-14"><div className="text-4xl mb-2">📝</div><p className="text-slate-500 text-sm">{T.blog.noPosts}</p></div>
          )}
        </div>
      )}
    </div>
  );
}
