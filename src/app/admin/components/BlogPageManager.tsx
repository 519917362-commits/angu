'use client';

import PageTextManager, { type PageTab } from './PageTextManager';

const TABS: PageTab[] = [
  {
    id: 'header',
    label: '页面头部 Header',
    fields: [
      { key: 'blog_header_title', label: '页面主标题 H1' },
      { key: 'blog_header_subtitle', label: '页面副标题', rows: 2 },
      { key: 'blog_header_breadcrumb', label: '面包屑文字' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.blog.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.blog.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.blog.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'blog_seo_intro', label: 'SEO 简介段落', rows: 3, hint: 'AI爬虫语料' },
    ],
  },
];

interface Props { token: string; onLogout: () => void; }

export default function BlogPageManager({ token, onLogout }: Props) {
  return <PageTextManager pagePrefix="blog" title="博客页配置 Blog Page" subtitle="管理博客列表页头部文字和SEO信息" tabs={TABS} token={token} onLogout={onLogout} />;
}
