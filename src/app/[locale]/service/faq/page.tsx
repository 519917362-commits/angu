import Link from 'next/link';

export default async function FAQPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  const faqs = isZh ? [
    {q: '最小起订量（MOQ）是多少？', a: '不同产品类型MOQ不同。石笼网箱通常50件起订，落石防护网从100平方米起订。六角网和勾花网围栏首次订单可低至1卷。我们对新客户灵活处理，可协商试订单。'},
    {q: '生产交货期是多久？', a: '标准产品（现货或常规规格）：7-15个工作日。定制/OEM订单：15-30个工作日，视复杂程度和数量而定。加急订单可额外收取10-20%费用。我们总是在报价中提供准确的交货期。'},
    {q: '你们提供免费样品吗？多久能收到？', a: '是的！我们大多数产品提供免费样品。客户承担快递运费（通常DHL/FedEx/UPS $30-80）。样品配送约5-10天。首次批量下单后样品费用全额退还。'},
    {q: '你们接受哪些付款方式？', a: '我们提供灵活的付款选择：\n• T/T（电汇）：30%定金，70%发货前——最常见\n• 即期信用证：订单金额超过$20,000\n• 西联汇款/PayPal：小额和样品费\n• 阿里巴巴信保：可提供额外保障'},
    {q: '你们能做定制尺寸和规格吗？', a: '当然！定制生产是我们的核心优势。我们的工程团队可以根据您的技术图纸或规格工作。我们支持定制丝径（2.0mm–4.5mm）、网孔尺寸、尺寸、表面处理（镀锌、PVC包塑、高尔凡）和包装。只需发送您的要求。'},
    {q: '你们的产品有哪些认证？', a: '我们公司通过ISO 9001:2015认证。落石防护网通过CE认证并符合ETAG 027欧洲标准测试。石笼网箱符合ASTM A975/A975M标准。我们可以根据要求提供SGS、BV或CCIC第三方检验报告。'},
    {q: '你们如何进行质量控制？', a: '质量是我们的首要任务。每批产品都经过：\n1. 原材料检验（丝径、抗拉强度）\n2. 编织/焊接/包装过程中的过程质量控制\n3. 成品尺寸检查\n4. 表面处理验证（锌层重量测试）\n5. 装船前最终检验，附照片和报告\n我们所有发货的缺陷率保持在<1%。'},
    {q: '你们提供哪些运输方式？可以门到门配送吗？', a: '是的，我们处理完整的出口物流：\n• 海运：FOB、CIF、CFR——天津/新港\n• 空运：北京首都机场（紧急小订单）\n• 快递：DHL、FedEx、UPS（样品）\n• 门到门配送：通过我们的货运代理合作伙伴可配送至大多数国家\n运输时间：海运15-35天，空运5-10天。'},
    {q: '你们参加展会吗？可以参观工厂吗？', a: '是的！我们定期参加广交会、迪拜Big 5、美国CONEXPO和德国BAUMA等主要国际展会。热烈欢迎您参观工厂——我们位于安平县，距石家庄机场2.5小时或北京3小时。我们可以安排机场接送和酒店预订。'},
    {q: '你们的产品服务于哪些行业？', a: '我们的产品服务于广泛的行业：\n• 土木工程：挡土墙、侵蚀控制、渠道衬砌\n• 交通运输：公路和铁路边坡防护、桥梁防护\n• 矿业：落石屏障、尾矿坝加固\n• 水利工程：河岸防护、大坝建设\n• 军事与安全：屏障系统、周边围栏\n• 园林景观：花园墙、装饰性石笼结构\n• 海岸与海洋：防波堤、海岸线防护'},
    {q: '可以获取价格表或目录吗？', a: '可以！您可以从我们的下载页面获取最新产品目录，或直接联系我们，我们将在24小时内通过邮件发送。由于价格因规格、数量和当前材料成本而异，我们建议申请定制报价以获取准确价格。'},
    {q: '你们的销售团队会说哪些语言？', a: '我们的国际销售团队英语流利。我们还有可以用中文、阿拉伯语、西班牙语、俄语和法语沟通的员工。对于其他语言，我们使用专业翻译服务以确保沟通清晰。WhatsApp和邮件是我们的主要沟通渠道，24/7可用。'},
  ] : [
    {q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ varies by product type. For gabion boxes, the typical MOQ is 50 pieces. For rockfall protection nets, it starts from 100 m². For hexagonal wire mesh and chain link fence, MOQ can be as low as 1 roll for first-time orders. We are flexible with new clients and can discuss trial orders.'},
    {q: 'What is your production lead time?', a: 'Standard products (in-stock or common specifications): 7-15 working days. Custom/OEM orders: 15-30 working days depending on complexity and quantity. Rush orders can be expedited with an additional 10-20% surcharge. We always provide accurate lead time in our quotation.'},
    {q: 'Do you provide free samples? How long does it take to get them?', a: 'Yes! We provide free samples for most of our product range. The client covers the courier shipping cost (usually $30-80 via DHL/FedEx/UPS). Sample delivery takes about 5-10 days. The sample cost is fully refundable when you place your first bulk order.'},
    {q: 'What payment terms do you accept?', a: 'We offer flexible payment options:\n• T/T (Telegraphic Transfer): 30% deposit, 70% before shipment — most common\n• L/C at sight: For orders above $20,000\n• Western Union / PayPal: For small amounts and sample fees\n• Alibaba Trade Assurance: Available for added security'},
    {q: 'Can you manufacture custom sizes and specifications?', a: 'Absolutely! Custom manufacturing is our core strength. Our engineering team can work with your technical drawings or specifications. We support custom wire diameter (2.0mm–4.5mm), mesh aperture sizes, dimensions, surface treatments (galvanized, PVC coated, Galfan), and packaging. Just send us your requirements.'},
    {q: 'What certifications do your products have?', a: 'Our company is ISO 9001:2015 certified. Our rockfall protection nets are CE certified and tested to ETAG 027 European standards. Gabion boxes comply with ASTM A975/A975M standards. We can provide SGS, BV, or CCIC third-party inspection reports upon request.'},
    {q: 'How do you handle quality control?', a: 'Quality is our top priority. Every batch goes through:\n1. Raw material inspection (wire diameter, tensile strength)\n2. In-process QC during weaving/welding/packing\n3. Dimensional checks on finished products\n4. Surface treatment verification (zinc coating weight test)\n5. Final pre-shipment inspection with photos and reports\nWe maintain a <1% defect rate across all shipments.'},
    {q: 'What shipping options do you provide? Can you arrange door-to-door delivery?', a: 'Yes, we handle complete export logistics:\n• Sea freight: FOB, CIF, CFR — Tianjin/Xingang Port\n• Air freight: Beijing Capital Airport (for urgent small orders)\n• Express courier: DHL, FedEx, UPS for samples\n• Door-to-door delivery: Available to most countries via our freight forwarder partners\nShipping time varies: 15-35 days by sea, 5-10 days by air.'},
    {q: 'Do you attend trade shows? Can I visit your factory?', a: 'Yes! We regularly participate in major international trade shows including Canton Fair, The Big 5 (Dubai), CONEXPO (USA), and BAUMA (Germany). Factory visits are warmly welcome — we&apos;re located in Anping County, just 2.5 hours from Shijiazhuang Airport or 3 hours from Beijing. We can arrange airport pickup and hotel booking.'},
    {q: 'What industries do your products serve?', a: 'Our products serve a wide range of industries:\n• Civil Engineering: Retaining walls, erosion control, channel lining\n• Transportation: Highway & railway slope protection, bridge protection\n• Mining: Rockfall barriers, tailings dam reinforcement\n• Water Conservancy: River bank protection, dam construction\n• Military & Security: Barrier systems, perimeter fencing\n• Landscaping: Garden walls, decorative gabion structures\n• Coastal & Marine: Breakwaters, shoreline protection'},
    {q: 'Can I get a price list or catalog?', a: 'Yes! You can download our latest product catalog from our Download page, or contact us directly and we\'ll email it within 24 hours. Since prices vary based on specifications, quantity, and current material costs, we recommend requesting a customized quotation for accurate pricing.'},
    {q: 'What languages does your sales team speak?', a: 'Our international sales team speaks English fluently. We also have staff who can communicate in Chinese, Arabic, Spanish, Russian, and French. For other languages, we use professional translation services to ensure clear communication. WhatsApp and Email are our primary communication channels, available 24/7.'},
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{isZh ? '常见问题' : 'Frequently Asked Questions'}</h1>
          <p className="text-blue-200 text-lg max-w-2xl">{isZh ? '查找关于我们产品、订购流程、运输等常见问题的答案。' : 'Find answers to common questions about our products, ordering process, shipping, and more.'}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {(isZh ? ['订购', '付款', '运输', '定制产品', '质量', '公司'] : ['Ordering', 'Payment', 'Shipping', 'Custom Products', 'Quality', 'Company']).map((tag) => (
            <span key={tag} className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-sm font-medium hover:border-blue-300 hover:text-blue-600 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition-colors list-none">
                <span className="pr-4">{faq.q}</span>
                <svg className={`w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4 whitespace-pre-line">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{isZh ? '还有问题？' : 'Still Have Questions?'}</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">{isZh ? '我们的团队随时准备提供帮助。联系我们，我们将在24小时内回复。' : 'Our team is ready to help. Get in touch and we&apos;ll respond within 24 hours.'}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg">
                {isZh ? '联系我们' : 'Contact Us'}
              </button>
            </Link>
            <a href="https://wa.me/8613812345678" target="_blank" rel="noopener noreferrer">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
                💬 WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
