'use client';

import { useState } from 'react';
import PageTextManager, { type PageTab } from './PageTextManager';
import BannerManager from './BannerManager';
import SceneManager from './SceneManager';

const HOME_TABS: PageTab[] = [
  {
    id: 'header',
    label: '头部 Hero',
    fields: [
      { key: 'hero_badge_en', label: '信任徽章 Badge', hint: 'Header 顶部小标签' },
      { key: 'hero_title_prefix_en', label: '主标题 H1', hint: 'Hero 核心标题' },
      { key: 'hero_subtitle_en', label: '副标题 Subtitle', hint: 'H1 下方描述' },
      { key: 'hero_cta_en', label: 'CTA 按钮文字', hint: '主按钮文案' },
    ],
  },
  {
    id: 'company',
    label: '公司介绍 Company',
    fields: [
      { key: 'home_company_title', label: '公司概况标题', hint: 'H2 标题' },
      { key: 'home_company_desc1', label: '公司简介 段落1', rows: 3 },
      { key: 'home_company_desc2', label: '公司简介 段落2', rows: 3 },
      { key: 'home_about_image', label: '右侧图片 Image', type: 'image', hint: 'Who We Are 区右侧配图 — 建议 800×600 工厂/车间实拍' },
    ],
  },
  {
    id: 'sections',
    label: '区块标题 Sections',
    fields: [
      { key: 'home_featured_title', label: '精选产品标题' },
      { key: 'home_featured_desc', label: '精选产品描述' },
      { key: 'home_categories_title', label: '产品分类标题' },
      { key: 'home_categories_desc', label: '产品分类描述' },
      { key: 'home_why_us_title', label: 'Why Choose Us 标题' },
      { key: 'home_applications_title', label: '应用领域标题' },
      { key: 'home_applications_desc', label: '应用领域描述' },
    ],
  },
  {
    id: 'cta_faq',
    label: 'CTA & FAQ',
    fields: [
      { key: 'home_faq_title', label: 'FAQ 标题' },
      { key: 'home_faq_desc', label: 'FAQ 描述' },
      { key: 'home_cta_title', label: '行动号召标题' },
      { key: 'home_cta_desc', label: '行动号召描述', rows: 2 },
      { key: 'home_cta_button', label: '行动号召按钮文案' },
      { key: 'home_crosslinks_title', label: '交叉内链标题' },
    ],
  },
  {
    id: 'stats',
    label: '统计数据 Stats',
    fields: [
      { key: 'stats_years', label: '成立年份 Years' },
      { key: 'stats_products', label: '产品数量 Products' },
      { key: 'stats_countries', label: '出口国家 Countries' },
      { key: 'stats_inspection', label: '质检率 Inspection' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO & AI 语料',
    fields: [
      { key: 'seo.home.title_en', label: 'SEO 标题 Title' },
      { key: 'seo.home.description_en', label: 'SEO 描述 Description', rows: 2 },
      { key: 'seo.home.keywords_en', label: 'SEO 关键词 Keywords' },
      { key: 'home_seo_intro', label: 'SEO 简介段落', rows: 4, hint: 'AI爬虫语料，不在页面上显示' },
    ],
  },
];

type SubTab = 'text' | 'banners' | 'scenes';

interface Props { token: string; onLogout: () => void; }

export default function HomepageManager({ token, onLogout }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('text');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">首页配置 Homepage</h1>
          <p className="text-sm text-slate-400 mt-0.5">管理首页 Hero、公司介绍、Banner、应用场景和 SEO</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200 pb-0">
        {[
          { id: 'text' as SubTab, label: '文案配置 Text' },
          { id: 'banners' as SubTab, label: 'Banner 管理 Banners' },
          { id: 'scenes' as SubTab, label: '应用场景 Scenes' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              subTab === t.id
                ? 'bg-white text-blue-600 border border-b-0 border-slate-200 -mb-px'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'text' && <PageTextManager pagePrefix="home" title="" subtitle="" tabs={HOME_TABS} token={token} onLogout={onLogout} hideHeader />}
      {subTab === 'banners' && <BannerManager token={token} onLogout={onLogout} />}
      {subTab === 'scenes' && <SceneManager token={token} onLogout={onLogout} />}
    </div>
  );
}
