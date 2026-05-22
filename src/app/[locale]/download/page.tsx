import Link from 'next/link';
import {Download} from 'lucide-react';

export default async function DownloadPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  const downloads = isZh ? [
    {
      title: '2025年产品目录',
      desc: '所有石笼网、防护网和金属丝网产品的完整目录，包含规格和价格范围。',
      size: '12.4 MB',
      format: 'PDF',
      icon: '📖',
      category: '目录',
    },
    {
      title: '石笼网箱规格表',
      desc: '所有标准和定制石笼网箱尺寸、材质和涂层选项的详细技术规格。',
      size: '2.1 MB',
      format: 'PDF',
      icon: '📋',
      category: '规格',
    },
    {
      title: '落石防护网技术手册',
      desc: '涵盖主动/被动防护系统设计指南、安装程序、荷载测试数据的工程手册。',
      size: '8.7 MB',
      format: 'PDF',
      icon: '🔧',
      category: '技术',
    },
    {
      title: '雷诺护垫安装指南',
      desc: '河岸防护和侵蚀控制应用的分步安装指南，含图解。',
      size: '3.5 MB',
      format: 'PDF',
      icon: '🏗️',
      category: '指南',
    },
    {
      title: '公司简介与证书',
      desc: '公司介绍、工厂照片、ISO/CE证书和客户参考列表。',
      size: '5.2 MB',
      format: 'PDF',
      icon: '🏢',
      category: '公司',
    },
    {
      title: '勾花网围栏价格表',
      desc: '包含不同高度、网孔尺寸和涂层的勾花网围栏最新价格表。',
      size: '1.8 MB',
      format: 'XLSX',
      icon: '💰',
      category: '价格',
    },
    {
      title: 'PVC包塑石笼色卡',
      desc: 'PVC包塑石笼产品的可选颜色及RAL色码。',
      size: '0.9 MB',
      format: 'PDF',
      icon: '🎨',
      category: '规格',
    },
    {
      title: '质检报告模板',
      desc: '展示我们质检流程和测试标准的质检报告样本。',
      size: '1.2 MB',
      format: 'PDF',
      icon: '✅',
      category: '质量',
    },
  ] : [
    {
      title: 'Product Catalog 2025',
      desc: 'Complete catalog of all our gabion, protection net, and wire mesh products with specifications and pricing ranges.',
      size: '12.4 MB',
      format: 'PDF',
      icon: '📖',
      category: 'Catalogs',
    },
    {
      title: 'Gabion Box Specification Sheet',
      desc: 'Detailed technical specifications for all standard and custom gabion box sizes, materials, and coating options.',
      size: '2.1 MB',
      format: 'PDF',
      icon: '📋',
      category: 'Specifications',
    },
    {
      title: 'Rockfall Protection Net Technical Manual',
      desc: 'Engineering manual covering design guidelines, installation procedures, load testing data for active/passive systems.',
      size: '8.7 MB',
      format: 'PDF',
      icon: '🔧',
      category: 'Technical',
    },
    {
      title: 'Reno Mattress Installation Guide',
      desc: 'Step-by-step installation guide with diagrams for river bank protection and erosion control applications.',
      size: '3.5 MB',
      format: 'PDF',
      icon: '🏗️',
      category: 'Guides',
    },
    {
      title: 'Company Profile & Certificates',
      desc: 'Company introduction, factory photos, ISO/CE certificates, and client reference list.',
      size: '5.2 MB',
      format: 'PDF',
      icon: '🏢',
      category: 'Company',
    },
    {
      title: 'Chain Link Fence Price List',
      desc: 'Current price list for chain link fence products including different heights, mesh sizes, and coatings.',
      size: '1.8 MB',
      format: 'XLSX',
      icon: '💰',
      category: 'Pricing',
    },
    {
      title: 'PVC Coated Gabion Color Chart',
      desc: 'Available color options for PVC coated gabion products with RAL color codes.',
      size: '0.9 MB',
      format: 'PDF',
      icon: '🎨',
      category: 'Specifications',
    },
    {
      title: 'Quality Inspection Report Template',
      desc: 'Sample quality inspection report showing our QC process and testing standards.',
      size: '1.2 MB',
      format: 'PDF',
      icon: '✅',
      category: 'Quality',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{isZh ? '下载与资源' : 'Downloads & Resources'}</h1>
          <nav className="text-sm text-blue-200">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{isZh ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isZh ? '下载' : 'Downloads'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Notice Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">{isZh ? '找不到需要的文档？' : 'Need a document not listed here?'}</h3>
            <p className="text-sm text-blue-700">{isZh ? '联系我们，我们将在24小时内发送任何产品信息、技术图纸或证书。' : 'Contact us and we&apos;ll send you any product information, technical drawings, or certificates within 24 hours.'}</p>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group flex items-start gap-5">
              <div className="w-14 h-14 bg-slate-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded flex-shrink-0">{item.format}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.size}</span>
                  <button className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    <Download className="w-4 h-4" /> {isZh ? '下载' : 'Download'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-white rounded-xl p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{isZh ? '找不到需要的内容？' : 'Can&apos;t Find What You Need?'}</h2>
          <p className="text-slate-500 mb-6 max-w-lg mx-auto">{isZh ? '申请定制文档、CAD图纸或针对您项目的技术规格。' : 'Request custom documents, CAD drawings, or technical specifications tailored to your project.'}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all">
                {isZh ? '申请文档' : 'Request Documents'}
              </button>
            </Link>
            <a href="https://wa.me/8613812345678" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2">
                💬 WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
