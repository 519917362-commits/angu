'use client';

import PageTextManager, { type PageTab } from './PageTextManager';

const TABS: PageTab[] = [
  {
    id: 'header',
    label: '页面头部 Header',
    fields: [
      { key: 'contact_header_title', label: '页面主标题 H1' },
      { key: 'contact_header_subtitle', label: '页面副标题', rows: 2 },
      { key: 'contact_header_breadcrumb', label: '面包屑文字' },
    ],
  },
  {
    id: 'contact_info',
    label: '联系信息 Contact Info',
    fields: [
      { key: 'phone', label: '电话 Phone' },
      { key: 'email', label: '邮箱 Email' },
      { key: 'address', label: '地址 Address', rows: 2 },
      { key: 'whatsapp', label: 'WhatsApp' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.contact.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.contact.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.contact.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'contact_seo_intro', label: 'SEO 简介段落（公司介绍）', rows: 4, hint: 'AI爬虫语料' },
    ],
  },
];

interface Props { token: string; onLogout: () => void; }

export default function ContactPageManager({ token, onLogout }: Props) {
  return <PageTextManager pagePrefix="contact" title="联系页配置 Contact Page" subtitle="管理联系页头部、联系方式和SEO信息" tabs={TABS} token={token} onLogout={onLogout} />;
}
