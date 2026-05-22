import Link from 'next/link';
import {notFound} from 'next/navigation';

// Blog post data (in production, this would come from CMS/database)
const blogPosts: Record<string, {
  title: string;
  date: string;
  image: string;
  category: string;
  content: string;
}> = {
  'how-to-choose-right-gabion-box-size': {
    title: 'How to Choose the Right Gabion Box Size for Your Project',
    date: '2025-12-15',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
    category: 'Guide',
    content: `
## Why Gabion Box Size Matters

Choosing the correct gabion box size is critical for structural integrity, cost efficiency, and project longevity. This guide covers everything you need to make an informed decision.

## Standard Gabion Box Sizes

The most commonly used gabion box dimensions are:

| Size (m) | Typical Use | Fill Material |
|----------|-------------|---------------|
| 2×1×1 | Retaining walls, erosion control | Rock 100-200mm |
| 1.5×1×1 | Garden walls, landscaping | Rock 75-150mm |
| 2×1×0.5 | Low walls, decorative | Rock 75-125mm |
| 3×1×1 | Large retaining structures | Rock 150-250mm |
| 4×1×1 | Marine/coastal applications | Heavy rock 200-300mm |

## Key Selection Factors

### 1. Load Requirements
Higher loads require larger boxes with thicker wire (4.0–4.5mm diameter). For highway and railway projects, we recommend a minimum of 2×1×1m with 4.5mm wire.

### 2. Site Conditions
- **Sloped terrain**: Use deeper boxes (1.5m or 2m length) for better interlocking
- **Limited space**: Narrower boxes (0.5m or 1m width) may be necessary
- **Soft soil**: Larger base area distributes load more effectively

### 3. Aesthetic Considerations
For visible applications like garden walls, smaller boxes (1×1×0.5m to 1.5×1×1m) provide a more refined appearance.

### 4. Budget Constraints
Standard sizes (2×1×1m) offer the best value — they're produced in volume and cost 15-20% less than custom sizes.

## When to Go Custom

Custom sizes are recommended when:
- Your engineering design specifies exact dimensions
- You need non-standard heights for stepped structures
- Space constraints prevent standard sizing
- The application requires specific hydraulic characteristics

Our custom manufacturing lead time is 15-25 days for custom-sized gabions.

## Conclusion

When in doubt, consult with our engineering team. We provide free technical support including size recommendations, structural calculations, and installation guidance for all qualified inquiries.
    `,
  },
};

// Default content for posts not yet written
const defaultContent = `
## Article Content

This article provides detailed technical information about this topic. Full content will be available soon.

In the meantime, feel free to contact us for detailed specifications, technical drawings, or consultation on your project.

## Need More Information?

Our engineering team can provide:
- Custom calculations and designs
- Installation guidelines
- Technical drawings (CAD/DXF)
- On-site consultation

**Contact us today for a free consultation!**
`;

export async function generateStaticParams() {
  const slugs = Object.keys(blogPosts);
  const params: {locale: string; slug: string}[] = [];
  const locales = ['en', 'zh', 'ar', 'ja', 'ko', 'id', 'vi', 'es', 'fr', 'de', 'pt', 'th'];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({locale, slug});
    }
  }
  return params;
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}): Promise<import('next').Metadata> {
  const {slug} = await params;
  const post = blogPosts[slug];
  return {
    title: post?.title || 'Blog Post' + ' | Paiqi Wire Mesh',
    description: post?.content.slice(0, 160) || 'Industry insights on gabion construction and rockfall protection.',
  };
}

export default async function BlogPostPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const post = blogPosts[slug];

  if (!post) notFound();

  // Simple markdown-like rendering (line breaks → paragraphs, ## → h2)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold text-slate-900 mt-10 mb-4">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('|')) {
        return <pre key={i} className="bg-slate-50 rounded-lg p-4 my-3 text-sm overflow-x-auto whitespace-pre-wrap font-mono text-slate-700">{trimmed}</pre>;
      }
      if (trimmed.startsWith('- **')) {
        return (
          <li key={i} className="text-slate-600 ml-6 mb-1">
            <strong>{trimmed.split('**')[1]}</strong>
            {trimmed.split('**')[2]?.replace(': ', ': ')}
          </li>
        );
      }
      if (trimmed.startsWith('- ')) {
        return <li key={i} className="text-slate-600 ml-6 mb-1">{trimmed.replace('- ', '')}</li>;
      }
      if (trimmed.match(/^\d+\./)) {
        return <li key={i} className="text-slate-600 ml-6 mb-1 list-decimal"><strong>{trimmed.split('.')[1]}</strong>{trimmed.substring(trimmed.indexOf('.') + 1)}</li>;
      }
      return <p key={i} className="text-slate-600 leading-relaxed mb-3">{trimmed}</p>;
    }).filter(Boolean);
  };

  const relatedPosts = Object.entries(blogPosts)
    .filter(([s]) => s !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-blue-900 text-white py-16">
        <div className="absolute inset-0 opacity-20">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white truncate">{post.title}</span>
          </nav>
          <span className="inline-block bg-blue-500 text-xs font-bold px-3 py-1 rounded-full mb-4">{post.category}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
          <time className="text-blue-200">{post.date}</time>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 prose-custom">
          {renderContent(post.content || defaultContent)}

          {/* Share & CTA */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-500">
                Have questions about this topic?
              </div>
              <Link href={`/${locale}/contact`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all">
                  Ask Our Experts
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(([s, r]) => (
                <Link key={s} href={`/${locale}/blog/${s}`}>
                  <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100">
                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-blue-600">{r.category}</span>
                      <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm">{r.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
