'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/**
 * 只有站内相对路径（/uploads、/images）才交给 next/image。
 * 后台允许把产品图填成外链，域名不在 next.config 的 remotePatterns 白名单里
 * 会让图片优化器抛错、整页 500，所以外链一律退回原生 <img>。
 */
const isLocalImage = (src: string): boolean => src.startsWith('/');

/**
 * 主图容器的实际渲染宽度，必须和布局一致：
 * - <lg 单栏，图占满视口宽度
 * - ≥lg 是 3 栏里的 2 栏（max-w-7xl = 1280px，扣除间距后约 640px 以内）
 * sizes 写大了浏览器会按声明值挑最大档位，白白多下 2–3 倍像素。
 */
const MAIN_SIZES = '(max-width: 1024px) 100vw, 640px';

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images.length) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center">
          <span className="text-slate-400 text-sm">No image</span>
        </div>
      </div>
    );
  }

  const prev = () => setActiveIndex(i => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setActiveIndex(i => (i < images.length - 1 ? i + 1 : 0));

  return (
    <>
      {/* Main gallery */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Main image */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group">
          {isLocalImage(images[activeIndex]) ? (
            // 这是产品页的 LCP 元素：主图此前是原生 <img> 直连 /uploads/*.png，
            // 800×800 的 PNG 单张 150–340KB，移动端首屏经常几秒还是一片灰。
            // 交给 next/image 后按 sizes 转 WebP，实际下发约 25–50KB。
            <Image
              src={images[activeIndex]}
              alt={`${name} - ${activeIndex + 1}`}
              fill
              sizes={MAIN_SIZES}
              preload
              className="object-cover cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />
          ) : (
            <img
              src={images[activeIndex]}
              alt={`${name} - ${activeIndex + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              fetchPriority="high"
              width={800}
              height={500}
              onClick={() => setLightboxOpen(true)}
            />
          )}
          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Counter badge */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                // 缩略图是装饰性的（主图已有 alt），可访问名称放在按钮上，
                // 否则屏幕阅读器只会念出「按钮」，不知道是第几张图
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === activeIndex ? 'true' : undefined}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? 'border-blue-500 ring-1 ring-blue-200'
                    : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                {isLocalImage(img) ? (
                  <Image
                    src={img}
                    alt=""
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 text-2xl transition-colors"
          >
            ×
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={images[activeIndex]}
            alt={`${name} - ${activeIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
