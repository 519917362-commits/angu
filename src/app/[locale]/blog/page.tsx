import type {Metadata} from 'next';
import Link from 'next/link';
import {getBlogPosts, getSiteConfig} from '@/lib/api';
import {generatePageMeta} from '@/lib/seo-utils';
import { tLabel } from '@/lib/i18n';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMeta('blog', locale, `/${locale}/blog`);
}

export default async function BlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const posts = await getBlogPosts();
  const siteConfig = await getSiteConfig();
  const config = siteConfig?.config;
  const published = posts.filter(p => p.status === 'published');

  const v = (key: string, fbEn: string, fbZh?: string) => {
    const entry = config?.[key];
    if (!entry) return locale === 'zh' ? (fbZh ?? fbEn) : fbEn;
    return (entry as Record<string, string>)[locale] || entry.en || (locale === 'zh' ? (fbZh ?? fbEn) : fbEn);
  };
  const headerTitle = v('blog_header_title', 'Wire Mesh Industry Blog', '丝网行业博客');
  const headerSubtitle = v('blog_header_subtitle', 'Expert guides, engineering cases, and insights on gabion, protection net, and fencing', '石笼网、防护网和围栏行业指南，工程案例和经验分享');
  const headerBreadcrumb = v('blog_header_breadcrumb', 'Blog', '博客');
  const seoIntro = v('blog_seo_intro',
    `The Angu Wire Mesh Blog is a technical knowledge hub for global engineering contractors, procurement managers, and wire mesh industry professionals. Drawing from 15 years of factory expertise and projects across 30+ countries, we publish expert content on gabion construction, rockfall protection design, fence selection, and industry standards. Our ${published.length} published articles cover everything from product specifications to on-site installation guides — all backed by real-world project experience.`,
    `安固丝网博客是面向全球工程承包商、采购经理和丝网行业从业者的技术内容平台。我们基于15年工厂制造经验和30+国家出口案例，分享石笼网施工、边坡防护设计、围栏选型、行业标准解读等专业内容。${published.length}篇已发布文章涵盖从产品技术参数到实地安装指南的全链路知识。`
  );
  const faqTitle = v('blog_faq_title', 'About the Angu Wire Mesh Blog', '关于安固丝网博客');
  const faqDesc = v('blog_faq_desc', '', ''); // unused currently, reserved
  const crosslinksTitle = v('blog_crosslinks_title', 'Explore More', '浏览更多');

  // ── JSON-LD structured data ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('博客', 'Blog', locale), item: `https://www.angumesh.com/${locale}/blog`},
    ],
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: tLabel('安固丝网行业博客', 'Angu Wire Mesh Industry Blog', locale),
    description: locale === 'zh'
      ? '石笼网施工、边坡防护、丝网选型等专业指南。面向工程师、承包商和采购人员的技术文章与行业最佳实践。'
      : locale === 'vi'
      ? 'Hướng dẫn chuyên gia về thi công rọ đá, bảo vệ sườn dốc, chọn lưới thép và thực tế tốt nhất ngành.'
      : locale === 'th'
      ? 'คู่มือจากผู้เชี่ยวชาญเกี่ยวกับการก่อสร้างเกเบี้ยน การป้องกันหินตก การเลือกตะแกรงลวด และแนวปฏิบัติที่ดีที่สุดในอุตสาหกรรม'
      : 'Expert guides on gabion construction, rockfall protection, wire mesh selection, and industry best practices.',
    url: `https://www.angumesh.com/${locale}/blog`,
    author: {
      '@type': 'Organization',
      name: 'An Gu Wire Mesh Products Co., Ltd.',
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
    blogPost: published.map(post => {
      const title = locale === 'zh' ? post.title_zh : locale === 'vi' ? post.title_vi || post.title_en : locale === 'th' ? post.title_th || post.title_en : post.title_en;
      const abstract = locale === 'zh' ? post.abstract_zh : locale === 'vi' ? post.abstract_vi || post.abstract_en : locale === 'th' ? post.abstract_th || post.abstract_en : post.abstract_en;
      return {
        '@type': 'BlogPosting',
        headline: title,
        description: abstract?.slice(0, 160) || '',
        url: `https://www.angumesh.com/${locale}/blog/${post.slug}`,
        datePublished: post.publish_time || undefined,
        author: {
          '@type': 'Organization',
          name: 'An Gu Wire Mesh Products Co., Ltd.',
        },
        ...(post.cover_image ? {image: post.cover_image} : {}),
      };
    }),
  };

  const faqItems = [
    {
      q: {en: 'What topics does the Angu Wire Mesh blog cover?', zh: '安固丝网博客涵盖哪些主题？', vi: 'Blog của Angu Wire Mesh đề cập những chủ đề nào?', th: 'บล็อกของ Angu Wire Mesh ครอบคลุมหัวข้อใดบ้าง?'},
      a: {en: 'Our blog covers gabion construction guides, rockfall protection engineering, wire mesh product selection, fencing installation best practices, industry standards (ASTM, ISO, EN), and procurement tips for international buyers. New articles are published regularly based on real project experience.', zh: '博客涵盖石笼网施工指南、边坡防护工程、丝网产品选型、围栏安装最佳实践、行业标准（ASTM、ISO、EN）以及国际采购经验。文章基于真实项目经验定期更新。', vi: 'Blog của chúng tôi đề cập hướng dẫn thi công rọ đá, kỹ thuật bảo vệ sườn dốc, lựa chọn sản phẩm lưới thép, thực hành tốt nhất lắp đặt hàng rào, tiêu chuẩn ngành (ASTM, ISO, EN) và mẹo mua sắm cho người mua quốc tế. Bài viết mới được đăng định kỳ dựa trên kinh nghiệm dự án thực tế.', th: 'บล็อกของเราครอบคลุมคู่มือการก่อสร้างเกเบี้ยน วิศวกรรมป้องกันหินตก การเลือกผลิตภัณฑ์ตะแกรงลวด แนวปฏิบัติที่ดีที่สุดในการติดตั้งรั้ว มาตรฐานอุตสาหกรรม (ASTM, ISO, EN) และเคล็ดลับการจัดซื้อสำหรับผู้ซื้อระดับสากล บทความใหม่เผยแพร่เป็นประจำตามประสบการณ์โครงการจริง'},
    },
    {
      q: {en: 'Are the blog articles written by industry experts?', zh: '博客文章是由行业专家撰写的吗？', vi: 'Các bài viết trên blog có được viết bởi chuyên gia ngành không?', th: 'บทความบล็อกเขียนโดยผู้เชี่ยวชาญในอุตสาหกรรมหรือไม่?'},
      a: {en: 'Yes. Articles are authored by our engineering team with 15+ years of wire mesh manufacturing experience, often in collaboration with civil engineers and project managers who have deployed Angu products in real-world infrastructure projects across 30+ countries.', zh: '是的。文章由拥有15年以上丝网制造经验的工程团队撰写，经常与实际部署过安固产品的土木工程师和项目经理合作，项目遍布30多个国家。', vi: 'Có. Bài viết được soạn bởi đội ngũ kỹ thuật của chúng tôi với hơn 15 năm kinh nghiệm sản xuất lưới thép, thường hợp tác với kỹ sư xây dựng và quản lý dự án đã triển khai sản phẩm Angu trong các dự án hạ tầng thực tế tại hơn 30 quốc gia.', th: 'ใช่ บทความเขียนโดยทีมวิศวกรของเราที่มีประสบการณ์ผลิตตะแกรงลวดมากกว่า 15 ปี มักร่วมมือกับวิศวกรโยธาและผู้จัดการโครงการที่ได้ใช้ผลิตภัณฑ์ Angu ในโครงการโครงสร้างพื้นฐานจริงในกว่า 30 ประเทศ'},
    },
    {
      q: {en: 'Can I request a topic for the blog?', zh: '我可以申请博客话题吗？', vi: 'Tôi có thể yêu cầu chủ đề cho blog không?', th: 'ฉันขอหัวข้อสำหรับบล็อกได้หรือไม่?'},
      a: {en: 'Absolutely! We welcome topic suggestions from readers. If you have a specific wire mesh application, engineering challenge, or product comparison you would like us to cover, contact us via the inquiry form. We prioritize topics that help our global customers make informed procurement decisions.', zh: '当然！欢迎读者提出话题建议。如果您有特定的丝网应用、工程难题或产品对比希望我们介绍，请通过询盘表单联系我们。我们会优先安排能帮助全球客户做出明智采购决策的话题。', vi: 'Tất nhiên! Chúng tôi hoan nghênh gợi ý chủ đề từ độc giả. Nếu bạn có ứng dụng lưới thép cụ thể, thách thức kỹ thuật hoặc so sánh sản phẩm muốn chúng tôi đề cập, hãy liên hệ qua biểu mẫu yêu cầu. Chúng tôi ưu tiên các chủ đề giúp khách hàng toàn cầu đưa ra quyết định mua sắm sáng suốt.', th: 'แน่นอน! เรายินดีรับคำแนะนำหัวข้อจากผู้อ่าน หากคุณมีการประยุกต์ใช้ตะแกรงลวด ความท้าทายทางวิศวกรรม หรือการเปรียบเทียบสินค้าที่ต้องการให้เราครอบคลุม โปรดติดต่อผ่านแบบฟอร์มสอบถาม เราให้ความสำคัญกับหัวข้อที่ช่วยให้ลูกค้าทั่วโลกตัดสินใจจัดซื้อได้อย่างชาญฉลาด'},
    },
  ];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tLabel('安固丝网博客文章列表', 'Angu Wire Mesh Blog Posts', locale),
    itemListElement: published.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: locale === 'zh' ? post.title_zh : locale === 'vi' ? (post.title_vi || post.title_en) : locale === 'th' ? (post.title_th || post.title_en) : post.title_en,
      url: `https://www.angumesh.com/${locale}/blog/${post.slug}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: locale === 'zh' ? item.q.zh : locale === 'vi' ? (item.q.vi || item.q.en) : locale === 'th' ? (item.q.th || item.q.en) : item.q.en,
      acceptedAnswer: {'@type': 'Answer', text: locale === 'zh' ? item.a.zh : locale === 'vi' ? (item.a.vi || item.a.en) : locale === 'th' ? (item.a.th || item.a.en) : item.a.en},
    })),
  };

  return (
    <>
      {/* ========== Structured Data ========== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(blogSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(itemListSchema)}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />

      {/* ========== Hero Header (dark gradient) ========== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 50%)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{tLabel('首页', 'Home', locale)}</Link>
              <span>/</span>
              <span className="text-white">{headerBreadcrumb}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {headerTitle}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ========== SEO Intro + Topic Pills ========== */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600">
            <p>{seoIntro}</p>
          </div>

          {/* Topic pills for SEO internal linking */}
          <nav className="flex flex-wrap gap-2 mt-4 pb-4" aria-label={tLabel('博客话题导航', 'Blog topic navigation', locale)}>
            {[
              {href: '?topic=gabion', en: 'Gabion Construction', zh: '石笼网施工', vi: 'Thi công rọ đá', th: 'การก่อสร้างเกเบี้ยน'},
              {href: '?topic=rockfall', en: 'Rockfall Protection', zh: '边坡防护', vi: 'Bảo vệ sườn dốc', th: 'ป้องกันหินตก'},
              {href: '?topic=fencing', en: 'Fencing', zh: '围栏系统', vi: 'Hệ thống hàng rào', th: 'ระบบรั้ว'},
              {href: '?topic=standards', en: 'Industry Standards', zh: '行业标准', vi: 'Tiêu chuẩn ngành', th: 'มาตรฐานอุตสาหกรรม'},
              {href: '?topic=procurement', en: 'Procurement Tips', zh: '采购指南', vi: 'Mẹo mua sắm', th: 'เคล็ดลับการจัดซื้อ'},
              {href: '?topic=quality', en: 'Quality Control', zh: '质量控制', vi: 'Kiểm soát chất lượng', th: 'การควบคุมคุณภาพ'},
            ].map(t => (
              <Link
                key={t.href}
                href={`/${locale}/blog${t.href}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-600 rounded-full text-xs font-medium transition-colors shadow-sm"
              >
                {locale === 'zh' ? t.zh : locale === 'vi' ? (t.vi || t.en) : locale === 'th' ? (t.th || t.en) : t.en}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ========== Blog List ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {published.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-slate-500 text-lg">{tLabel('暂无文章', 'No posts yet', locale)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {published.map((post, i) => {
              const title = locale === 'zh' ? post.title_zh : locale === 'vi' ? post.title_vi || post.title_en : locale === 'th' ? post.title_th || post.title_en : post.title_en;
              const abstract = locale === 'zh' ? post.abstract_zh : locale === 'vi' ? post.abstract_vi || post.abstract_en : locale === 'th' ? post.abstract_th || post.abstract_en : post.abstract_en;
              const publishDate = post.publish_time ? new Date(post.publish_time).toLocaleDateString(tLabel('zh-CN', 'en-US', locale), {year: 'numeric', month: 'long', day: 'numeric'}) : '';
              const coverUrl = post.cover_image || '/images/products/gabion-box.jpg';

              return (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-blue-100"
                >
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    <img
                      src={coverUrl}
                      alt={title}
                      width={400}
                      height={225}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    {publishDate && (
                      <div className="text-xs text-slate-400 mb-3">{publishDate}</div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {abstract}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600">
                      {tLabel('阅读更多', 'Read More', locale)}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ========== GEO FAQ Section ========== */}
      <div className="bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{faqTitle}</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-800 hover:bg-slate-100 transition-colors list-none">
                  <span>{locale === 'zh' ? faq.q.zh : locale === 'vi' ? (faq.q.vi || faq.q.en) : locale === 'th' ? (faq.q.th || faq.q.en) : faq.q.en}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {locale === 'zh' ? faq.a.zh : locale === 'vi' ? (faq.a.vi || faq.a.en) : locale === 'th' ? (faq.a.th || faq.a.en) : faq.a.en}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Cross-links ========== */}
      <nav aria-label={tLabel('页面导航', 'Page navigation', locale)} className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {crosslinksTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/products`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">📦</span> {tLabel('全部产品', 'All Products', locale)}
            </Link>
            <Link href={`/${locale}/solutions`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">🎯</span> {tLabel('行业解决方案', 'Solutions', locale)}
            </Link>
            <Link href={`/${locale}/service`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">🛠️</span> {tLabel('我们的服务', 'Our Services', locale)}
            </Link>
            <Link href={`/${locale}/contact`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">✉️</span> {tLabel('联系我们', 'Contact Us', locale)}
            </Link>
            <Link href={`/${locale}/download`} className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all">
              <span aria-hidden="true">📥</span> {tLabel('下载中心', 'Downloads', locale)}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
