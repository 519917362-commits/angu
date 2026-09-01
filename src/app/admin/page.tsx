'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from './components/AdminLayout';
import LoginPage from './components/LoginPage';
import InquiryManager from './components/InquiryManager';
import ProductManager from './components/ProductManager';
import CategoryManager from './components/CategoryManager';
import BlogManager from './components/BlogManager';
import BlogCategoryManager from './components/BlogCategoryManager';
import AboutPageManager from './components/AboutPageManager';
import HomepageManager from './components/HomepageManager';
import ProductsPageManager from './components/ProductsPageManager';
import BlogPageManager from './components/BlogPageManager';
import ServicePageManager from './components/ServicePageManager';
import ContactPageManager from './components/ContactPageManager';
import SolutionsPageManager from './components/SolutionsPageManager';
import NoiseBarrierManager from './components/NoiseBarrierManager';
import SiteGeneralManager from './components/SiteGeneralManager';
import LogViewer from './components/LogViewer';
import AdminUserManager from './components/AdminUserManager';
import { T, TabKey } from '@/lib/admin-i18n';

type Tab = TabKey;

function AdminPageInner() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams?.get('tab') as Tab | null;
  const [token, setToken] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>(tabFromUrl || 'products');

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'inquiries' && <InquiryManager token={token} onLogout={handleLogout} />}
      {activeTab === 'products' && <ProductManager token={token} onLogout={handleLogout} />}
      {activeTab === 'categories' && <CategoryManager token={token} onLogout={handleLogout} />}
      {activeTab === 'blogs' && <BlogManager token={token} onLogout={handleLogout} />}
      {activeTab === 'blog-categories' && <BlogCategoryManager token={token} onLogout={handleLogout} />}
      {activeTab === 'about' && <AboutPageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'homepage' && <HomepageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'products-page' && <ProductsPageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'blog-page' && <BlogPageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'service-page' && <ServicePageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'contact-page' && <ContactPageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'solutions-page' && <SolutionsPageManager token={token} onLogout={handleLogout} />}
      {activeTab === 'noise-barrier' && <NoiseBarrierManager token={token} onLogout={handleLogout} />}
      {activeTab === 'site-general' && <SiteGeneralManager token={token} onLogout={handleLogout} />}
      {activeTab === 'logs' && <LogViewer token={token} onLogout={handleLogout} />}
      {activeTab === 'users' && <AdminUserManager token={token} onLogout={handleLogout} />}
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <AdminPageInner />
    </Suspense>
  );
}