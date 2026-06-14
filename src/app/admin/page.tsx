'use client';

import { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import LoginPage from './components/LoginPage';
import InquiryManager from './components/InquiryManager';
import ProductManager from './components/ProductManager';
import CategoryManager from './components/CategoryManager';
import BlogManager from './components/BlogManager';
import BlogCategoryManager from './components/BlogCategoryManager';
import LogViewer from './components/LogViewer';
import AdminUserManager from './components/AdminUserManager';
import { T, TabKey } from '@/lib/admin-i18n';

type Tab = TabKey;

export default function AdminPage() {
  const [token, setToken] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>('products');

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
      {activeTab === 'inquiries' && <InquiryManager token={token} />}
      {activeTab === 'products' && <ProductManager token={token} />}
      {activeTab === 'categories' && <CategoryManager token={token} />}
      {activeTab === 'blogs' && <BlogManager token={token} />}
      {activeTab === 'blog-categories' && <BlogCategoryManager token={token} />}
      {activeTab === 'logs' && <LogViewer token={token} />}
      {activeTab === 'users' && <AdminUserManager token={token} />}
    </AdminLayout>
  );
}