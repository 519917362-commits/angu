'use client';

import { useState, useEffect } from 'react';
import type { SiteConfig } from '@/lib/api';
import type { Category } from '@/types/product';

// Cached fetch helpers for client components
let cachedCategories: Category[] | null = null;

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  useEffect(() => {
    fetch('/api/site-config')
      .then(r => r.json())
      .then((d: SiteConfig) => { setConfig(d); })
      .catch(() => {});
  }, []);
  return config;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(cachedCategories || []);
  useEffect(() => {
    if (cachedCategories) return;
    fetch('/api/catalog')
      .then(r => r.json())
      .then(d => { cachedCategories = d.categories || []; setCategories([...d.categories || []]); })
      .catch(() => {});
  }, []);
  return categories;
}

// Helper: get localized value from site config
export function cfgVal(config: SiteConfig | null, key: string, locale: string, fallback = ''): string {
  return (config?.config?.[key] as Record<string, string> | undefined)?.[locale]
    || config?.config?.[key]?.en
    || fallback;
}
