import Link from 'next/link';

export default async function ServicePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  const services = locale === 'zh' ? [
    {icon: '📐', title: '定制生产', desc: '完整的OEM/ODM能力。根据您的规格定制尺寸、材质、网孔大小、表面处理和包装。'},
    {icon: '🚢', title: '全球运输', desc: '完整的出口物流：海运（拼箱/整箱）、空运、快递。提供大多数国家的门到门配送。'},
    {icon: '📋', title: '单证支持', desc: '完整的出口单证：商业发票、装箱单、提单、原产地证、质检报告。'},
    {icon: '🎨', title: 'Logo与包装定制', desc: '500件以上订单提供定制Logo印刷、彩盒包装和品牌单证。'},
    {icon: '💬', title: '24/7销售支持', desc: '销售团队通过WhatsApp、邮件和微信提供实时沟通，贯穿整个项目周期。'},
    {icon: '🔍', title: '第三方检验', desc: '发货前可进行SGS、BV或CCIC检验。所有订单均可提供工厂视频检验。'},
  ] : [
    {icon: '📐', title: 'Custom Manufacturing', desc: 'Full OEM/ODM capabilities. Custom dimensions, materials, mesh sizes, surface treatments, and packaging per your specifications.'},
    {icon: '🚢', title: 'Global Shipping', desc: 'Complete export logistics: sea freight (LCL/FCL), air freight, express courier. Door-to-door delivery to most countries.'},
    {icon: '📋', title: 'Documentation Support', desc: 'Full export documentation: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Quality Inspection Reports.'},
    {icon: '🎨', title: 'Logo & Packaging Customization', desc: 'Custom logo printing, color box packaging, and branded documentation for orders above 500 units.'},
    {icon: '💬', title: '24/7 Sales Support', desc: 'Sales team available via WhatsApp, Email, and WeChat for real-time communication throughout your project lifecycle.'},
    {icon: '🔍', title: 'Third-Party Inspection', desc: 'SGS, BV, or CCIC inspections prior to shipment. Factory video inspection available for all orders.'},
  ];

  const processSteps = locale === 'zh' ? [
    {step: '01', title: '收到询盘', desc: '您向我们发送需求——产品类型、规格、数量、交货时间。', icon: '📨'},
    {step: '02', title: '报价', desc: '我们在24小时内提供详细报价，含FOB/CIF价格选项。', icon: '💰'},
    {step: '03', title: '样品（可选）', desc: '符合条件的客户可免费获取样品。批量下单前确认质量。', icon: '📦'},
    {step: '04', title: '生产', desc: '订单进入生产。制造过程中分享进度照片和质检报告。', icon: '🏭'},
    {step: '05', title: '质量检验', desc: '最终检验，如需第三方检测。提供质检报告供确认。', icon: '✅'},
    {step: '06', title: '发货', desc: '打包、装柜、发运。提供追踪信息。可提供门到门配送。', icon: '🚢'},
  ] : [
    {step: '01', title: 'Inquiry Received', desc: 'You send us your requirements — product type, specs, quantity, delivery time.', icon: '📨'},
    {step: '02', title: 'Quotation', desc: 'We provide a detailed quotation within 24 hours with FOB/CIF pricing options.', icon: '💰'},
    {step: '03', title: 'Sample (Optional)', desc: 'Free samples available for qualified customers. You verify quality before bulk order.', icon: '📦'},
    {step: '04', title: 'Production', desc: 'Order enters production. We share progress photos and QC reports during manufacturing.', icon: '🏭'},
    {step: '05', title: 'Quality Check', desc: 'Final inspection, third-party testing if requested. Quality report provided for approval.', icon: '✅'},
    {step: '06', title: 'Shipping', desc: 'Packed, loaded, and shipped. Tracking info provided. Door-to-door delivery available.', icon: '🚢'},
  ];

  const faqs = locale === 'zh' ? [
    {q: '最小起订量（MOQ）是多少？', a: '不同产品MOQ不同。石笼网箱通常50件起订，防护网从100平方米起订。新客户可协商灵活安排。'},
    {q: '典型交货期是多久？', a: '标准产品：7-15天。定制/OEM订单：15-30天，视复杂程度和数量而定。加急订单可协商额外费用。'},
    {q: '你们提供免费样品吗？', a: '是的，大多数产品提供免费样品。客户承担运费。首次批量下单后可退还样品费。'},
    {q: '你们接受哪些付款方式？', a: '我们接受T/T（30%定金，70%发货前）、大额订单（2万美元以上）即期信用证、小额西联汇款，以及样品费PayPal。'},
    {q: '你们能做定制尺寸和规格吗？', a: '当然！我们的优势就是定制生产。提供图纸或规格，我们的工程团队将制定最佳方案。'},
  ] : [
    {q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by product. For gabion boxes, MOQ is typically 50 pieces. For protection nets, it starts from 100 m². We can discuss flexible arrangements for new clients.'},
    {q: 'What is the typical lead time?', a: 'Standard products: 7-15 days. Custom/OEM orders: 15-30 days depending on complexity and quantity. Rush orders can be accommodated with an additional fee.'},
    {q: 'Do you provide free samples?', a: 'Yes, we offer free samples for most products. The client covers the shipping cost. Sample cost is refundable upon placing the first bulk order.'},
    {q: 'What payment terms do you accept?', a: 'We accept T/T (30% deposit, 70% before shipping), L/C at sight for large orders (above $20,000), Western Union for small amounts, and PayPal for sample fees.'},
    {q: 'Can you do custom sizes and specifications?', a: 'Absolutely! Our strength is custom manufacturing. Provide us with your drawings or specifications, and our engineering team will work out the best solution.'},
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{locale === 'zh' ? '我们的服务' : 'Our Services'}</h1>
          <nav className="text-sm text-blue-200">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{locale === 'zh' ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{locale === 'zh' ? '服务' : 'Services'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '我们提供什么' : 'What We Offer'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-blue-200 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '合作流程' : 'How It Works'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
            <p className="text-slate-500 max-w-xl mx-auto">{locale === 'zh' ? '从询盘到交付——我们简化的流程确保顺畅合作。' : 'From inquiry to delivery — our streamlined process ensures smooth collaboration.'}</p>
          </div>
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-[calc(8.33%+1.5rem)] right-[calc(8.33%+1.5rem)] h-0.5 bg-blue-200" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20 mb-4 ring-4 ring-white relative z-10">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-blue-600 mb-1">STEP {step.step}</span>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OEM/ODM Section */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">OEM / ODM</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '定制生产解决方案' : 'Custom Manufacturing Solutions'}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {locale === 'zh' ? '我们理解每个项目都是独特的。因此，我们提供全面的OEM和ODM服务，根据您的确切需求量身定制。' : "We understand that every project is unique. That's why we offer comprehensive OEM and ODM services tailored to your exact requirements."}
                </p>
                <ul className="space-y-3">
                  {(locale === 'zh' ? [
                    '丝径定制：2.0mm至4.5mm',
                    '网孔尺寸定制',
                    '多种表面处理：镀锌、PVC包塑、高尔凡',
                    '任意尺寸定制',
                    '私人标签和品牌包装',
                    '工程图纸和技术支持',
                  ] : [
                    'Custom wire diameter from 2.0mm to 4.5mm',
                    'Custom mesh aperture sizes',
                    'Various surface treatments: galvanized, PVC coated, Galfan',
                    'Custom dimensions up to any size',
                    'Private labeling and branded packaging',
                    'Engineering drawings and technical support',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900">{locale === 'zh' ? 'OEM流程' : 'OEM Process'}</h3>
                {(locale === 'zh' ? ['1. 发送规格/图纸', '2. 工程师评估可行性', '3. 48小时内免费报价', '4. 样品生产（如需要）', '5. 确认后批量生产', '6. 质检与发货'] : ['1. Send us your specifications/drawings', '2. Our engineers evaluate feasibility', '3. Free quote within 48 hours', '4. Sample production (if needed)', '5. Mass production after approval', '6. Quality inspection & shipping']).map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-slate-600">{step.replace(/^[0-9]+\. /, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{locale === 'zh' ? '常见问题' : 'Frequently Asked Questions'}</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-slate-900 hover:bg-slate-50 transition-colors list-none">
                  <span>{faq.q}</span>
                  <svg className={`w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/service/faq`}>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                {locale === 'zh' ? '查看全部常见问题 →' : 'View All FAQ →'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
