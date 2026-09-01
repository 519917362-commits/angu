import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getBlogPost, getBlogPosts} from '@/lib/api';
import { tLabel } from '@/lib/i18n';
import {generatePageMeta} from '@/lib/seo-utils';
import {renderMarkdown} from '@/lib/markdown';

interface Props {
  params: Promise<{locale: string; slug: string}>;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getBlogPost(slug);
  if (!post) return {title: tLabel('文章未找到', 'Post Not Found', locale)};
  const title = locale === 'zh' ? post.title_zh : locale === 'vi' ? (post.title_vi || post.title_en) : locale === 'th' ? (post.title_th || post.title_en) : post.title_en;
  const abstract = locale === 'zh' ? post.abstract_zh : locale === 'vi' ? (post.abstract_vi || post.abstract_en) : locale === 'th' ? (post.abstract_th || post.abstract_en) : post.abstract_en;
  const description = abstract
    ?.replace(/[#*`\[\]\|\-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 160) || 'Industry insights on wire mesh, gabion construction, and rockfall protection.';
  const seoTitle = locale === 'zh' ? post.seo_title_zh : locale === 'vi' ? (post.seo_title_vi || post.seo_title_en) : locale === 'th' ? (post.seo_title_th || post.seo_title_en) : post.seo_title_en;
  return generatePageMeta('blog', locale, `/${locale}/blog/${slug}`, {
    title: `${seoTitle || title || 'Blog Post'} | Angu Wire Mesh`,
    description,
    image: post.cover_image || undefined,
  });
}

export default async function BlogDetailPage({params}: Props) {
  const {locale, slug} = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

const title = locale === 'zh' ? post.title_zh : locale === 'vi' ? (post.title_vi || post.title_en) : locale === 'th' ? (post.title_th || post.title_en) : post.title_en;
const content = locale === 'zh' ? post.content_zh : locale === 'vi' ? (post.content_vi || post.content_en) : locale === 'th' ? (post.content_th || post.content_en) : post.content_en;
const abstract = locale === 'zh' ? post.abstract_zh : locale === 'vi' ? (post.abstract_vi || post.abstract_en) : locale === 'th' ? (post.abstract_th || post.abstract_en) : post.abstract_en;
  const publishDate = post.publish_time
    ? new Date(post.publish_time).toLocaleDateString(tLabel('zh-CN', 'en-US', locale), {year: 'numeric', month: 'long', day: 'numeric'})
    : '';
  const seoTitle = locale === 'zh' ? post.seo_title_zh : locale === 'vi' ? (post.seo_title_vi || post.seo_title_en) : locale === 'th' ? (post.seo_title_th || post.seo_title_en) : post.seo_title_en;
const seoDesc = locale === 'zh' ? post.seo_description_zh : locale === 'vi' ? (post.seo_description_vi || post.seo_description_en) : locale === 'th' ? (post.seo_description_th || post.seo_description_en) : post.seo_description_en;
const keywords = locale === 'zh' ? post.seo_keywords_zh : locale === 'vi' ? (post.seo_keywords_vi || post.seo_keywords_en) : locale === 'th' ? (post.seo_keywords_th || post.seo_keywords_en) : post.seo_keywords_en;
  const canonicalUrl = `https://www.angumesh.com/${locale}/blog/${slug}`;

  // 阅读时间估算（中英文均按字符数粗估）
  const contentText = content || '';
  const readingMinutes = Math.max(1, Math.ceil(contentText.length / (locale === 'zh' ? 400 : 800)));

  // 相关文章（同语言、排除当前、最多 3 篇）
  const allPosts = await getBlogPosts();
  const related = allPosts.filter(p => p.id !== post.id && p.status === 'published').slice(0, 3);

  // ── JSON-LD Structured Data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('博客', 'Blog', locale), item: `https://www.angumesh.com/${locale}/blog`},
      {'@type': 'ListItem', position: 3, name: title, item: canonicalUrl},
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle || title,
    description: seoDesc || abstract?.slice(0, 160) || '',
    url: canonicalUrl,
    datePublished: post.publish_time || undefined,
    dateModified: (post as any).updated_at || post.publish_time || undefined,
    ...(post.cover_image ? {image: post.cover_image} : {}),
    author: {
      '@type': 'Organization',
      name: 'Angu Wire Mesh',
      url: 'https://www.angumesh.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.angumesh.com/images/logo.png',
      },
    },
    ...(keywords ? {keywords: keywords} : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <>
      {/* ========== Structured Data ========== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}} />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="text-sm text-slate-500 flex items-center gap-2">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {tLabel('首页', 'Home', locale)}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/blog`} className="hover:text-blue-600 transition-colors">
                {tLabel('博客', 'Blog', locale)}
              </Link>
              <span>/</span>
              <span className="text-slate-900 truncate max-w-sm">{title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="mb-10">
            {publishDate && (
              <div className="text-sm text-slate-400 mb-4 flex items-center gap-3">
                <time dateTime={post.publish_time || undefined}>{publishDate}</time>
                <span aria-hidden="true">·</span>
                <span>{locale === 'zh' ? `${readingMinutes} 分钟阅读` : locale === 'vi' ? `${readingMinutes} phút đọc` : locale === 'th' ? `${readingMinutes} นาทีอ่าน` : `${readingMinutes} min read`}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              {title}
            </h1>
            {seoDesc && (
              <p className="text-lg text-slate-500 leading-relaxed">{seoDesc}</p>
            )}
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-[21/9] bg-slate-100 rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img
                src={post.cover_image}
                alt={title}
                width={840}
                height={360}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10">
            <div className="prose prose-slate max-w-none">
              {renderMarkdown(content)}
            </div>
          </div>

          {/* Tags */}
          {keywords && (
            <div className="mt-8 flex flex-wrap gap-2">
              {keywords.split(',').map((kw, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                  {kw.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{tLabel('相关文章', 'Related Posts', locale)}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(rp => {
                  const rTitle = locale === 'zh' ? rp.title_zh : locale === 'vi' ? (rp.title_vi || rp.title_en) : locale === 'th' ? (rp.title_th || rp.title_en) : rp.title_en;
                  const rCover = rp.cover_image || '/images/products/gabion-box.jpg';
                  return (
                    <Link key={rp.id} href={`/${locale}/blog/${rp.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={rCover} alt={rTitle} width={300} height={169} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 line-clamp-2">{rTitle}</h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {tLabel('返回博客列表', 'Back to Blog', locale)}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
