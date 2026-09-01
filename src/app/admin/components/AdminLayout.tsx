'use client';

import Link from 'next/link';
import { T, TabKey } from '@/lib/admin-i18n';

type Tab = TabKey;

interface Props {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onLogout: () => void;
}

const tabs: { id: Tab; icon: string; section?: string }[] = [
  { id: 'inquiries', icon: '💬', section: 'data' },
  { id: 'products', icon: '📦', section: 'data' },
  { id: 'categories', icon: '📂', section: 'data' },
  { id: 'blogs', icon: '📝', section: 'data' },
  { id: 'blog-categories', icon: '📁', section: 'data' },
  { id: 'homepage', icon: '🏠', section: 'pages' },
  { id: 'products-page', icon: '🏷️', section: 'pages' },
  { id: 'service-page', icon: '🔧', section: 'pages' },
  { id: 'solutions-page', icon: '💡', section: 'pages' },
  { id: 'noise-barrier', icon: '🔇', section: 'pages' },
  { id: 'blog-page', icon: '✍️', section: 'pages' },
  { id: 'contact-page', icon: '📞', section: 'pages' },
  { id: 'about', icon: '🏢', section: 'pages' },
  { id: 'site-general', icon: '⚙️', section: 'system' },
  { id: 'logs', icon: '📋', section: 'system' },
  { id: 'users', icon: '👤', section: 'system' },
];

export default function AdminLayout({ children, activeTab, onTabChange, onLogout }: Props) {
  const renderTab = (tab: { id: Tab; icon: string }) => {
    const isActive = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <span className="text-base">{tab.icon}</span>
        <span className={isActive ? 'text-white font-medium' : 'text-slate-300'}>
          {T.nav[tab.id]}
        </span>
      </button>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 flex flex-col shrink-0 h-screen overflow-y-auto admin-sidebar-scroll">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">Angu</div>
              <div className="text-slate-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto admin-sidebar-scroll">
          {/* Data Management */}
          <div>
            <div className="px-3 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">数据 Data</div>
            <div className="space-y-0.5">
              {tabs.filter(t => t.section === 'data').map(renderTab)}
            </div>
          </div>

          {/* Page Config */}
          <div>
            <div className="px-3 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">页面配置 Pages</div>
            <div className="space-y-0.5">
              {tabs.filter(t => t.section === 'pages').map(renderTab)}
            </div>
          </div>

          {/* System */}
          <div>
            <div className="px-3 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">系统 System</div>
            <div className="space-y-0.5">
              {tabs.filter(t => t.section === 'system').map(renderTab)}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-700/50 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm transition-colors"
          >
            <span>🌐</span>
            <span>{T.nav.backToSite}</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg text-sm transition-colors"
          >
            <span>🚪</span>
            <span>{T.nav.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto admin-scrollbar">
        {children}
      </main>
    </div>
  );
}
