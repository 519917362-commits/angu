import Link from 'next/link';

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  const posts = isZh ? [
    {
      id: 1,
      slug: 'how-to-choose-right-gabion-box-size',
      title: '如何为您的项目选择合适的石笼网箱尺寸',
      excerpt: '根据荷载要求、现场条件和预算考虑选择石笼尺寸的完整指南。了解标准尺寸和何时需要定制。',
      date: '2025-12-15',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      category: '指南',
    },
    {
      id: 2,
      slug: 'rockfall-protection-net-vs-retaining-walls',
      title: '落石防护网与传统挡土墙：成本对比',
      excerpt: '比较现代落石网系统与传统混凝土挡土结构的成本、安装时间和有效性。包含真实项目数据。',
      date: '2025-11-28',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      category: '对比',
    },
    {
      id: 3,
      slug: 'gabion-construction-best-practices-coastal-projects',
      title: '海岸与海洋工程石笼施工最佳实践',
      excerpt: '海洋环境石笼安装技术指南，涵盖材料选择（高尔凡 vs PVC）、防腐保护、排水设计和案例研究。',
      date: '2025-10-10',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      category: '技术',
    },
    {
      id: 4,
      slug: 'understanding-etag-027-rockfall-certification',
      title: '了解ETAG 027：欧洲落石防护系统技术认证',
      excerpt: 'ETAG 027认证对您的项目意味着什么，测试要求，能量吸收等级（MEL/SEL），以及如何在招标中指定认证系统。',
      date: '2025-09-22',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800',
      category: '认证',
    },
    {
      id: 5,
      slug: 'pvc-coated-vs-galvanized-gabion-comparison',
      title: 'PVC包塑 vs 热镀锌石笼：如何选择？',
      excerpt: '表面处理选项的详细比较，包括使用寿命预期、成本差异、颜色选项和每种类型的最佳使用场景。',
      date: '2025-08-15',
      image: 'https://images.unsplash.com/photo-1565514020176-6c22d0e0739c?w=800',
      category: '产品指南',
    },
    {
      id: 6,
      slug: 'reno-mattress-river-bank-protection-complete-guide',
      title: '雷诺护垫河道防护：完整安装指南',
      excerpt: '雷诺护垫安装分步指南，包括基础准备、护垫放置、填充程序、绑扎模式和质量控制检查点。',
      date: '2025-07-08',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      category: '指南',
    },
  ] : [
    {
      id: 1,
      slug: 'how-to-choose-right-gabion-box-size',
      title: 'How to Choose the Right Gabion Box Size for Your Project',
      excerpt: 'A comprehensive guide to selecting gabion dimensions based on load requirements, site conditions, and budget considerations. Learn about standard sizes and when to go custom.',
      date: '2025-12-15',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      category: 'Guide',
    },
    {
      id: 2,
      slug: 'rockfall-protection-net-vs-retaining-walls',
      title: 'Rockfall Protection Net vs. Traditional Retaining Walls: A Cost Comparison',
      excerpt: 'Comparing cost, installation time, and effectiveness of modern rockfall net systems against conventional concrete retaining structures. Real project data included.',
      date: '2025-11-28',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      category: 'Comparison',
    },
    {
      id: 3,
      slug: 'gabion-construction-best-practices-coastal-projects',
      title: 'Gabion Construction Best Practices for Coastal & Marine Projects',
      excerpt: 'Technical guidelines for gabion installation in marine environments, covering material selection (Galfan vs PVC), corrosion protection, drainage design, and case studies.',
      date: '2025-10-10',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      category: 'Technical',
    },
    {
      id: 4,
      slug: 'understanding-etag-027-rockfall-certification',
      title: 'Understanding ETAG 027: European Technical Approval for Rockfall Systems',
      excerpt: 'What ETAG 027 certification means for your project, testing requirements, energy absorption classes (MEL/SEL), and how to specify certified systems in tenders.',
      date: '2025-09-22',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=800',
      category: 'Certification',
    },
    {
      id: 5,
      slug: 'pvc-coated-vs-galvanized-gabion-comparison',
      title: 'PVC Coated vs. Hot-Dip Galvanized Gabions: Which Should You Choose?',
      excerpt: 'Detailed comparison of surface treatment options including service life expectancy, cost difference, color options, and best-use scenarios for each type.',
      date: '2025-08-15',
      image: 'https://images.unsplash.com/photo-1565514020176-6c22d0e0739c?w=800',
      category: 'Product Guide',
    },
    {
      id: 6,
      slug: 'reno-mattress-river-bank-protection-complete-guide',
      title: 'Reno Mattress for River Bank Protection: Complete Installation Guide',
      excerpt: 'Step-by-step guide to Reno mattress installation including foundation preparation, mattress placement, filling procedures, lacing patterns, and quality control checkpoints.',
      date: '2025-07-08',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      category: 'Guide',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{isZh ? '行业博客' : 'Industry Blog'}</h1>
          <p className="text-blue-200 text-lg max-w-2xl">{isZh ? '石笼施工、落石防护、金属丝网应用和行业趋势的专业见解。' : 'Expert insights on gabion construction, rockfall protection, wire mesh applications, and industry trends.'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Featured Post */}
        {posts[0] && (
          <Link href={`/${locale}/blog/${posts[0].slug}`} className="group block mb-12">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-slate-100">
                  <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">{isZh ? '精选' : 'Featured'}</span>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">{posts[0].title}</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <time>{posts[0].date}</time>
                    <span>•</span>
                    <span>{posts[0].category}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">{isZh ? '阅读更多 →' : 'Read More →'}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-medium text-blue-600 mb-2">{post.category}</span>
                  <h2 className="font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-50">
                    <time>{post.date}</time>
                    <span>→</span>
                    <span className="text-blue-600 font-medium">{isZh ? '阅读文章' : 'Read Article'}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{isZh ? '保持更新' : 'Stay Updated'}</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">{isZh ? '订阅获取石笼施工、产品更新和行业新闻的最新文章。' : 'Subscribe to get the latest articles on gabion construction, product updates, and industry news.'}</p>
          <div className="flex justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={isZh ? 'your@email.com' : 'your@email.com'}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap">
              {isZh ? '订阅' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
