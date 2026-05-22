import Link from 'next/link';

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const timeline = locale === 'zh' ? [
    {year: '2015', title: '公司成立', desc: '河北派琦丝网制品有限公司在中国丝网之都安平成立。'},
    {year: '2017', title: 'ISO 9001认证', desc: '获得ISO 9001:2015质量管理体系认证，产能翻倍。'},
    {year: '2019', title: '全球拓展', desc: '产品出口至20多个国家，防护网产品获得CE和ETAG 027认证。'},
    {year: '2021', title: '新厂建成', desc: '扩建至15,000平方米生产基地，拥有6条自动化石笼网生产线。'},
    {year: '2023', title: '30+国家', desc: '出口覆盖扩展至30多个国家，年产量达到50,000多个石笼网单元。'},
    {year: '2025', title: '数字化转型', desc: '上线全球电商平台，部署24/7在线询盘系统。'},
  ] : [
    {year: '2015', title: 'Company Founded', desc: 'Hebei Paiqi Wire Mesh Products Co., Ltd. established in Anping, the Wire Mesh Capital of China.'},
    {year: '2017', title: 'ISO 9001 Certified', desc: 'Obtained ISO 9001:2015 quality management system certification. Production capacity doubled.'},
    {year: '2019', title: 'Global Expansion', desc: 'Products exported to 20+ countries. CE and ETAG 027 certifications for rockfall protection products.'},
    {year: '2021', title: 'New Factory Built', desc: 'Expanded to 15,000 m² production facility with 6 automated gabion production lines.'},
    {year: '2023', title: '30+ Countries', desc: 'Export coverage expanded to 30+ countries. Annual output reached 50,000+ gabion units.'},
    {year: '2025', title: 'Digital Transformation', desc: 'Launched global e-commerce platform. 24/7 online inquiry system deployed.'},
  ];

  const factoryImages = [
    {src: 'https://images.unsplash.com/photo-1565514020176-6c22d0e0739c?w=600&h=400&fit=crop', alt: 'Gabion Production Line'},
    {src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', alt: 'Wire Mesh Weaving Workshop'},
    {src: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=600&h=400&fit=crop', alt: 'Quality Inspection Lab'},
    {src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', alt: 'Warehouse & Shipping Area'},
  ];

  const team = [
    {name: 'Zhang Wei', role: 'General Manager', bio: '15+ years in wire mesh manufacturing industry. Oversees strategic planning and operations.'},
    {name: 'Li Ming', role: 'Technical Director', bio: 'Expert in gabion engineering and rockfall protection systems. Leads R&D team.'},
    {name: 'Wang Fang', role: 'Export Manager', bio: '10+ years international trade experience. Manages global client relationships.'},
    {name: 'Chen Hao', role: 'QC Manager', bio: 'ISO 9001 lead auditor. Ensures every product meets international standards.'},
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'}} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{locale === 'zh' ? '关于派琦丝网' : 'About Paiqi Wire Mesh'}</h1>
          <nav className="text-sm text-blue-200">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{locale === 'zh' ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{locale === 'zh' ? '关于我们' : 'About Us'}</span>
          </nav>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{locale === 'zh' ? '专业石笼网与防护网制造商' : 'Professional Gabion & Protection Net Manufacturer'}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {locale === 'zh' ? '河北派琦丝网制品有限公司是一家专业制造商和出口商，专注于石笼网箱、PVC包塑石笼、雷诺护垫、主动/被动落石防护网、六角网和勾花网围栏产品。' : 'Hebei Paiqi Wire Mesh Products Co., Ltd. is a professional manufacturer and exporter specializing in gabion boxes, PVC coated gabion, Reno mattress, active/passive rockfall protection nets, hexagonal wire mesh, and chain link fence products.'}
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              {locale === 'zh' ? '公司成立于2015年，位于河北省衡水市安平县——全球闻名的"中国丝网之都"。我们已发展成为行业内最受信赖的供应商之一，客户遍布30多个国家。' : 'Established in 2015 and located in Anping County, Hengshui City, Hebei Province — known globally as the "Wire Mesh Capital of China" — we have grown to become one of the most trusted suppliers in the industry with clients across 30+ countries.'}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {locale === 'zh' ? '我们15,000平方米的生产基地拥有6条自动化石笼网生产线、4条防护网生产线和专用质量检测实验室。凭借200多名熟练工人和20多名工程师的技术团队，我们以具有竞争力的工厂直销价格提供稳定的品质。' : 'Our 15,000 m² production facility houses 6 automated gabion production lines, 4 protection net production lines, and a dedicated quality inspection laboratory. With over 200 skilled workers and a technical team of 20+ engineers, we deliver consistent quality at competitive factory-direct prices.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {icon: '🏭', value: '15,000m²', label: locale === 'zh' ? '工厂面积' : 'Factory Area'},
              {icon: '👷', value: '200+', label: locale === 'zh' ? '熟练工人' : 'Skilled Workers'},
              {icon: '🔧', value: '10', label: locale === 'zh' ? '生产线' : 'Production Lines'},
              {icon: '🌍', value: '30+', label: locale === 'zh' ? '出口国家' : 'Export Countries'},
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm text-center border border-slate-100">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '发展历程' : 'Our Journey'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-0.5" />
            {timeline.map((item, i) => (
              <div key={item.year} className={`relative flex items-start mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1.5 mt-2 z-10 ring-4 ring-white" />
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="inline-block bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-2">{item.year}</span>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Images */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '我们的工厂' : 'Our Factory'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
            <p className="text-slate-500 max-w-xl mx-auto">{locale === 'zh' ? '参观我们的生产车间、质检实验室和仓库。' : 'A tour of our production facilities, quality control lab, and warehouse.'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {factoryImages.map((img) => (
              <div key={img.alt} className="group relative overflow-hidden rounded-xl aspect-[3/2]">
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white font-medium text-sm">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '我们的团队' : 'Our Team'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio.replace('15+', '11+')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '认证与质量保证' : 'Certifications & Quality Assurance'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {name: 'ISO 9001:2015', desc: 'Quality Management System', icon: '📋'},
              {name: 'CE Certified', desc: 'European Conformity for Rockfall Nets', icon: '🇪🇺'},
              {name: 'ETAG 027', desc: 'European Technical Approval for Rockfall Systems', icon: '✅'},
              {name: 'SGS / BV', desc: 'Third-Party Inspection Available', icon: '🔬'},
            ].map((cert) => (
              <div key={cert.name} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center hover:border-blue-200 transition-colors">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{cert.name}</h3>
                <p className="text-xs text-slate-500">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{locale === 'zh' ? '为什么选择派琦？' : 'Why Choose Paiqi?'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(locale === 'zh' ? [
              '工厂直销价格——无中间商加价',
              '可定制尺寸、材质和规格',
              '大多数产品最低50件起订',
              '完整单证：CI、PL、CO、BL、质检报告',
              '24/7销售支持：WhatsApp、邮件、微信',
              '可提供SGS/BV第三方检验',
              '快速交期：标准订单7-15天',
              '灵活付款方式：T/T、L/C、西联汇款',
            ] : [
              'Factory direct pricing — no middleman markup',
              'Custom sizes, materials, and specifications available',
              'Low MOQ from 50 pieces for most products',
              'Complete documentation: CI, PL, CO, BL, Quality Report',
              '24/7 sales support via WhatsApp, Email, and WeChat',
              'SGS/BV third-party inspection available',
              'Fast lead time: 7-15 days for standard orders',
              'Flexible payment terms: T/T, L/C, Western Union',
            ]).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-300 mt-0.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
