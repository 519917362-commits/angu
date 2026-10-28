/**
 * ms / ar 试水语种 —— 内容覆盖层
 *
 * 背景：数据库里所有内容表（products / product_categories / application_scenarios /
 * why_choose_us / noise_barrier_projects / about_certifications / banners / site_config）
 * 只有 en / zh / vi / th 四套字段，没有 ms / ar 列。试水语种不打算为此改表结构
 * （要动 migration + 后台表单 + 36 条产品数据），所以用这一层静态覆盖。
 *
 * 规则：
 * 1. 只覆盖 ms / ar 实际渲染的两页：/{locale} 与 /{locale}/noise-barrier。
 * 2. 键一律用「英文原文」或 slug，不用顺序下标 —— 后台调整排序时不会错位；
 *    英文原文被改过则自动回落英文，不会崩。
 * 3. 正式转全量语种时，把这里的内容迁进数据库字段，然后删掉本文件。
 */

/** 首页 FAQ：覆盖 HomeFaqLd 与页面 FAQ 区块 */
export const HOME_FAQ_PARTIAL: Record<string, {q: string; a: string}[]> = {
  ms: [
    {
      q: 'Apakah produk yang dikeluarkan oleh Angu Wire Mesh?',
      a: 'Angu Wire Mesh mengeluarkan 9 kategori produk: kotak gabion, jaringan perlindungan batu jatuh, pagar rantai, jaringan dawai terkimpal, penghadang bunyi, dawai berduri/pisau, penghadang letupan, jaringan tali keluli tahan karat dan penghadang orang ramai. Semua produk bertauliah ISO 9001 dan boleh disesuaikan mengikut spesifikasi.',
    },
    {
      q: 'Di manakah lokasi Angu Wire Mesh?',
      a: 'Angu Wire Mesh beribu pejabat di Kaunti Anping, Wilayah Hebei, China — pusat jaringan dawai dunia. Kilang kami kira-kira 300 km dari Pelabuhan Tianjin, memudahkan penghantaran eksport.',
    },
    {
      q: 'Adakah Angu Wire Mesh bertauliah?',
      a: 'Ya. Pengurusan kualiti ISO 9001:2015, pensijilan produk CE untuk jaringan batu jatuh (ETAG 027) serta kelulusan teknikal Eropah. Pemeriksaan pihak ketiga SGS dan Bureau Veritas (BV) tersedia.',
    },
    {
      q: 'Apakah kuantiti pesanan minimum (MOQ)?',
      a: 'MOQ serendah 50 m² untuk pesanan percubaan. Pesanan pukal dialu-alukan dengan diskaun berperingkat. Sampel tersedia atas permintaan.',
    },
    {
      q: 'Berapa cepat penghantaran dan perkapalan?',
      a: 'Pengeluaran standard mengambil masa 15–25 hari. FOB Tianjin atau CIF ke pelabuhan anda. Pengangkutan laut ke pelabuhan utama dunia (kira-kira 15–40 hari bergantung destinasi). Pesanan segera boleh dirunding.',
    },
    {
      q: 'Adakah Angu menyokong penyesuaian OEM/ODM?',
      a: 'Ya. Kami menerima OEM/ODM berdasarkan lukisan dan sampel dengan dimensi, diameter dawai, salutan (PVC, tergalvani, Galfan) dan pembungkusan tersuai. Setiap pesanan mempunyai pengurus projek khusus.',
    },
  ],
  ar: [
    {
      q: 'ما المنتجات التي تصنّعها Angu Wire Mesh؟',
      a: 'تصنّع Angu Wire Mesh تسع فئات من المنتجات: صناديق الجابيون، شبكات الحماية من سقوط الصخور، سياجات السلسلة، الشبكات المعدنية الملحومة، الحواجز الصوتية، الأسلاك الشائكة والموسوية، حواجز الانفجار، شبكات الحبال الفولاذية المقاومة للصدأ، وحواجز تنظيم الحشود. جميع المنتجات معتمدة ISO 9001 وقابلة للتخصيص حسب المواصفات.',
    },
    {
      q: 'أين يقع مقر Angu Wire Mesh؟',
      a: 'يقع مقر Angu Wire Mesh في محافظة أنبينغ بمقاطعة خبي في الصين — عاصمة شبكات الأسلاك عالميًا. يبعد مصنعنا نحو 300 كم عن ميناء تيانجين، ما يسرّع الشحن التصديري.',
    },
    {
      q: 'هل Angu Wire Mesh معتمدة؟',
      a: 'نعم. إدارة الجودة ISO 9001:2015، وشهادة منتج CE لشبكات الحماية من سقوط الصخور (ETAG 027) مع الموافقة الفنية الأوروبية. يتوفر فحص طرف ثالث من SGS وBureau Veritas (BV).',
    },
    {
      q: 'ما الحد الأدنى للطلب (MOQ)؟',
      a: 'يبدأ الحد الأدنى من 50 م² للطلبات التجريبية. نرحّب بالطلبات الكبيرة مع خصومات حسب الكمية. تتوفر عينات عند الطلب.',
    },
    {
      q: 'ما سرعة الإنتاج والشحن؟',
      a: 'يستغرق الإنتاج القياسي 15–25 يومًا. FOB تيانجين أو CIF إلى ميناءكم. الشحن البحري إلى الموانئ الرئيسية عالميًا (نحو 15–40 يومًا حسب الوجهة). الطلبات العاجلة قابلة للتفاوض.',
    },
    {
      q: 'هل تدعم Angu التخصيص OEM/ODM؟',
      a: 'نعم. نقبل OEM/ODM وفق الرسومات والعينات مع أبعاد وأقطار أسلاك وطلاءات (PVC، مجلفن، جالفان) وتغليف مخصص. لكل طلب مدير مشروع مخصص.',
    },
  ],
};

/** 首页「为什么选择安固」6 张卡：键 = why_choose_us.title_en */
export const WHY_CHOOSE_PARTIAL: Record<string, Record<string, {title: string; desc: string}>> = {
  ms: {
    'Factory Strength': {
      title: 'Kekuatan Kilang',
      desc: 'Pembuatan di Anping, ibu kota jaringan dawai China, sejak 2014. Pengeluaran 5,000 tan setahun.',
    },
    'ISO 9001:2015 Certified': {
      title: 'Bertauliah ISO 9001:2015',
      desc: 'Pembuatan bertauliah ISO 9001:2015 dengan kawalan kualiti ketat pada setiap peringkat. Pemeriksaan sebelum penghantaran untuk setiap pesanan.',
    },
    'Full Customization': {
      title: 'Penyesuaian Penuh',
      desc: 'Dimensi, diameter dawai dan salutan tersuai tersedia. OEM/ODM disokong dengan lukisan teknikal.',
    },
    'Global Shipping': {
      title: 'Penghantaran Global',
      desc: 'FCL atau LCL melalui Pelabuhan Tianjin. Pengangkutan udara DHL/FedEx untuk pesanan segera. Dieksport ke 30+ negara.',
    },
    'Factory-Direct Pricing': {
      title: 'Harga Terus Kilang',
      desc: 'Tanpa orang tengah. Beli terus daripada pengeluar, jimat 15%–30% berbanding syarikat perdagangan.',
    },
    'Low MOQ for Trial Orders': {
      title: 'MOQ Rendah untuk Pesanan Percubaan',
      desc: 'Mulakan dengan hanya 50 m². Kami menyokong pesanan percubaan supaya anda boleh menguji kualiti sebelum pembelian pukal.',
    },
  },
  ar: {
    'Factory Strength': {
      title: 'قوة المصنع',
      desc: 'التصنيع في أنبينغ، عاصمة شبكات الأسلاك في الصين، منذ 2014. طاقة إنتاج 5,000 طن سنويًا.',
    },
    'ISO 9001:2015 Certified': {
      title: 'معتمد ISO 9001:2015',
      desc: 'تصنيع معتمد ISO 9001:2015 مع رقابة جودة صارمة في كل مرحلة. فحص قبل الشحن لكل طلب.',
    },
    'Full Customization': {
      title: 'تخصيص كامل',
      desc: 'أبعاد وأقطار أسلاك وطلاءات مخصصة متاحة. دعم OEM/ODM مع الرسومات الفنية.',
    },
    'Global Shipping': {
      title: 'شحن عالمي',
      desc: 'حاويات كاملة أو جزئية عبر ميناء تيانجين. شحن جوي DHL/FedEx للطلبات العاجلة. تصدير إلى 30+ دولة.',
    },
    'Factory-Direct Pricing': {
      title: 'أسعار مباشرة من المصنع',
      desc: 'بدون وسطاء. اشترِ مباشرة من المصنّع ووفّر 15%–30% مقارنة بشركات التجارة.',
    },
    'Low MOQ for Trial Orders': {
      title: 'حد أدنى منخفض للطلبات التجريبية',
      desc: 'ابدأ من 50 م² فقط. ندعم الطلبات التجريبية لاختبار الجودة قبل الشراء بالكميات.',
    },
  },
};

/** 9 个应用场景名称：键 = application_scenarios.name_en */
export const APP_SCENE_PARTIAL: Record<string, Record<string, string>> = {
  ms: {
    'Construction & Engineering': 'Pembinaan & Kejuruteraan',
    'Highway & Railway': 'Lebuh Raya & Kereta Api',
    'Mining & Slope Safety': 'Perlombongan & Keselamatan Cerun',
    'Water Conservancy': 'Pemuliharaan Air',
    'Industrial & Factory': 'Perindustrian & Kilang',
    'Perimeter Security': 'Keselamatan Perimeter',
    'Agriculture & Farming': 'Pertanian & Penternakan',
    'Environmental & Ecology': 'Alam Sekitar & Ekologi',
    'Residential & Community': 'Kediaman & Komuniti',
  },
  ar: {
    'Construction & Engineering': 'الإنشاءات والهندسة',
    'Highway & Railway': 'الطرق السريعة والسكك الحديدية',
    'Mining & Slope Safety': 'التعدين وسلامة المنحدرات',
    'Water Conservancy': 'الموارد المائية',
    'Industrial & Factory': 'الصناعة والمصانع',
    'Perimeter Security': 'أمن المحيط',
    'Agriculture & Farming': 'الزراعة والثروة الحيوانية',
    'Environmental & Ecology': 'البيئة والإيكولوجيا',
    'Residential & Community': 'السكن والمجتمع',
  },
};

/** 5 个品类名：键 = product_categories.slug */
export const CATEGORY_NAME_PARTIAL: Record<string, Record<string, string>> = {
  ms: {
    'noise-barrier': 'Penghadang Bunyi',
    'protection-net': 'Jaring Perlindungan',
    'fence': 'Pagar',
    'gabion': 'Gabion',
    'wire-mesh': 'Jaring Dawai',
  },
  ar: {
    'noise-barrier': 'الحواجز الصوتية',
    'protection-net': 'شبكات الحماية',
    'fence': 'السياجات',
    'gabion': 'الجابيون',
    'wire-mesh': 'الشبكات المعدنية',
  },
};

/** 首页品类入口卡的描述：键 = slug */
export const PILLAR_BLURB_PARTIAL: Record<string, Record<string, string>> = {
  ms: {
    'noise-barrier': 'Dinding bunyi untuk lebuh raya, rel, jambatan dan industri — logam, akrilik lutsinar dan tertutup sepenuhnya.',
    'gabion': 'Kotak gabion, tilam Reno dan dinding penahan. Dawai 2.7–4.0 mm, zink 240–275 g/m², jaringan 80×100 mm.',
    'fence': 'Pagar 358 anti-panjat, pagar rantai, pagar sementara dan penghadang orang ramai untuk keselamatan perimeter.',
    'protection-net': 'Jaring tutupan aktif dan penghadang jaring bulat pasif untuk perlindungan batu jatuh dan cerun.',
    'wire-mesh': 'Jaringan terkimpal, heksagon dan beralun serta dawai berduri, dipotong dan dibungkus mengikut spesifikasi anda.',
  },
  ar: {
    'noise-barrier': 'جدران صوتية للطرق السريعة والسكك والجسور والصناعة — معدنية وأكريليك شفاف ومغلقة بالكامل.',
    'gabion': 'صناديق جابيون وحشايا رينو وجدران استنادية. سلك 2.7–4.0 مم، زنك 240–275 غ/م²، شبكة 80×100 مم.',
    'fence': 'سياج 358 مضاد للتسلّق، سياج سلسلة، سياجات مؤقتة وحواجز حشود لأمن المحيط.',
    'protection-net': 'شبكات تغطية نشطة وحواجز شبكية حلقية سلبية للحماية من سقوط الصخور والمنحدرات.',
    'wire-mesh': 'شبكات ملحومة وسداسية ومموّجة إضافة إلى الأسلاك الشائكة، تُقصّ وتُعبّأ حسب مواصفاتكم.',
  },
};

/** 声屏障页 6 个案例：键 = noise_barrier_projects.title_en */
export const PROJECT_PARTIAL: Record<string, Record<string, {title: string; location: string; spec: string}>> = {
  ms: {
    'Highway Noise Barrier – Chongqing': {
      title: 'Penghadang Bunyi Lebuh Raya – Chongqing',
      location: 'Chongqing, China',
      spec: 'Keluli berlubang 3.0m + bulu mineral, STC 32 · NRC 0.85',
    },
    'Viaduct Noise Barrier – Changsha': {
      title: 'Penghadang Bunyi Jejambat – Changsha',
      location: 'Changsha, Hunan, China',
      spec: 'Akrilik lutsinar + rangka aluminium, STC 30–33',
    },
    'Highway Noise Barrier – Inner Mongolia': {
      title: 'Penghadang Bunyi Lebuh Raya – Mongolia Dalam',
      location: 'Mongolia Dalam, China',
      spec: 'Keluli tergalvani 2.5m, sesuai iklim sejuk, STC 32 · NRC 0.85',
    },
    'Bridge Noise Barrier – Linfen': {
      title: 'Penghadang Bunyi Jambatan – Linfen',
      location: 'Linfen, Shanxi, China',
      spec: 'Panel akustik komposit 4.0m, dioptimumkan beban angin, STC 34 · NRC 0.85',
    },
    'Airport Expressway Noise Barrier – Guangdong': {
      title: 'Penghadang Bunyi Lebuh Raya Lapangan Terbang – Guangdong',
      location: 'Guangdong, China',
      spec: 'Panel akustik aluminium 3.0m, anti-karat pesisir, STC 32 · NRC 0.85',
    },
    'Highway Noise Barrier – Jiangsu': {
      title: 'Penghadang Bunyi Lebuh Raya – Jiangsu',
      location: 'Jiangsu, China',
      spec: 'Gabungan keluli 3.0m + panel lutsinar, STC 32 / 30',
    },
  },
  ar: {
    'Highway Noise Barrier – Chongqing': {
      title: 'حاجز صوتي للطرق السريعة – تشونغتشينغ',
      location: 'تشونغتشينغ، الصين',
      spec: 'فولاذ مثقّب 3.0 م + صوف معدني، STC 32 · NRC 0.85',
    },
    'Viaduct Noise Barrier – Changsha': {
      title: 'حاجز صوتي لجسر علوي – تشانغشا',
      location: 'تشانغشا، هونان، الصين',
      spec: 'أكريليك شفاف + إطار ألومنيوم، STC 30–33',
    },
    'Highway Noise Barrier – Inner Mongolia': {
      title: 'حاجز صوتي للطرق السريعة – منغوليا الداخلية',
      location: 'منغوليا الداخلية، الصين',
      spec: 'فولاذ مجلفن 2.5 م، مناسب للمناخ البارد، STC 32 · NRC 0.85',
    },
    'Bridge Noise Barrier – Linfen': {
      title: 'حاجز صوتي لجسر – لينفن',
      location: 'لينفن، شانشي، الصين',
      spec: 'لوح صوتي مركّب 4.0 م، مُحسَّن لأحمال الرياح، STC 34 · NRC 0.85',
    },
    'Airport Expressway Noise Barrier – Guangdong': {
      title: 'حاجز صوتي لطريق المطار السريع – قوانغدونغ',
      location: 'قوانغدونغ، الصين',
      spec: 'لوح صوتي ألومنيوم 3.0 م، مقاوم للتآكل الساحلي، STC 32 · NRC 0.85',
    },
    'Highway Noise Barrier – Jiangsu': {
      title: 'حاجز صوتي للطرق السريعة – جيانغسو',
      location: 'جيانغسو، الصين',
      spec: 'مزيج فولاذ 3.0 م + لوح شفاف، STC 32 / 30',
    },
  },
};

/** 认证卡：键 = about_certifications.name_en（声屏障页由后端兜底数据提供） */
export const CERT_PARTIAL: Record<string, Record<string, {name: string; desc: string}>> = {
  ms: {
    'ISO 9001:2015': {name: 'ISO 9001:2015', desc: 'Sistem Pengurusan Kualiti'},
    'SGS / BV Testing': {name: 'Ujian SGS / BV', desc: 'Pemeriksaan Pihak Ketiga Tersedia'},
    'Acoustic Lab Tested': {name: 'Diuji Makmal Akustik', desc: 'STC 32–34 dB / NRC 0.85'},
    'Salt Spray >2000h': {name: 'Semburan Garam >2000j', desc: 'Ketahanan Galvani Hot-Dip'},
  },
  ar: {
    'ISO 9001:2015': {name: 'ISO 9001:2015', desc: 'نظام إدارة الجودة'},
    'SGS / BV Testing': {name: 'اختبار SGS / BV', desc: 'فحص طرف ثالث متاح'},
    'Acoustic Lab Tested': {name: 'مُختبر في مختبر صوتي', desc: 'STC 32–34 dB / NRC 0.85'},
    'Salt Spray >2000h': {name: 'رشّ ملحي >2000 ساعة', desc: 'متانة الجلفنة بالغمس الساخن'},
  },
};

/** 首页 banner 主按钮：banners 表只有 en/zh/vi/th */
export const BANNER_CTA_PARTIAL: Record<string, string> = {
  ms: 'Dapatkan Sebut Harga Percuma',
  ar: 'اطلب عرض سعر مجاني',
};

/** 首页精选 / 声屏障页推荐产品：键 = products.slug */
export const PRODUCT_PARTIAL: Record<string, Record<string, {name: string; desc: string}>> = {
  ms: {
    'highway-noise-barrier-3m': {
      name: 'Penghadang Bunyi Lebuh Raya 3.0m Panel Keluli Penyerap Bunyi',
      desc: 'Penghadang bunyi lebuh raya 3.0m, dinilai STC 32–34 dB / NRC 0.85 untuk perlindungan kawasan kediaman. Panel keluli berlubang dengan teras bulu mineral; penarafan STC/NRC adalah nilai makmal, prestasi di tapak bergantung pada ketinggian dan susun atur penghadang.',
    },
    'bridge-noise-barrier': {
      name: 'Penghadang Bunyi Jambatan & Jejambat Panel Akustik Lutsinar',
      desc: 'Penghadang bunyi lutsinar untuk jambatan dan jejambat, menggabungkan pengurangan bunyi dengan ketelusan visual untuk keperluan estetika bandar. Rangka aluminium ringan dengan kaca tempered atau panel polikarbonat; dioptimumkan untuk beban angin.',
    },
    'rail-transit-noise-barrier': {
      name: 'Penghadang Bunyi Transit Rel Panel Akustik MRT & LRT',
      desc: 'Penghadang akustik untuk sistem MRT dan LRT, direka untuk pengecilan bunyi kereta api frekuensi rendah. Menahan denyutan tekanan aerodinamik daripada kereta api yang lalu serta mematuhi piawaian akustik khusus rel.',
    },
    'metal-upright-noise-barrier': {
      name: 'Penghadang Bunyi Tegak Logam Dinding Bunyi Menegak',
      desc: 'Penghadang bunyi tegak logam, jenis dinding bunyi paling ekonomik. Panel keluli tergalvani dengan teras bulu mineral, kehilangan sisipan 10–20 dB(A) untuk jalan raya, rel dan tapak industri.',
    },
    'metal-bent-curved-noise-barrier': {
      name: 'Penghadang Bunyi Melengkung Logam Panel Akustik Arka',
      desc: 'Penghadang bunyi logam melengkung dengan hujung atas melengkung ke dalam untuk pembelauan bunyi yang lebih baik. Reka bentuk arka estetik, kehilangan sisipan 15–25 dB(A) untuk lebuh raya dan jalan bertingkat.',
    },
    'transparent-acrylic-glass-noise-barrier': {
      name: 'Penghadang Bunyi Akrilik & Kaca Lutsinar Panel PC',
      desc: 'Penghadang bunyi akrilik/kaca lutsinar untuk penglihatan maksimum dengan perlindungan akustik. Polikarbonat atau kaca tempered, STC 30–33, untuk jambatan, jalan bandar dan kawasan pemandangan.',
    },
  },
  ar: {
    'highway-noise-barrier-3m': {
      name: 'حاجز صوتي للطرق السريعة 3.0 م بألواح فولاذية ماصّة للصوت',
      desc: 'حاجز صوتي للطرق السريعة بارتفاع 3.0 م، بتصنيف STC 32–34 dB / NRC 0.85 لحماية الأحياء السكنية. لوح فولاذي مثقّب بنواة من الصوف المعدني؛ تصنيفات STC/NRC معملية، والأداء الموقعي يعتمد على ارتفاع الحاجز وتخطيطه.',
    },
    'bridge-noise-barrier': {
      name: 'حاجز صوتي للجسور والجسور العلوية بألواح شفافة',
      desc: 'حاجز صوتي شفاف للجسور والجسور العلوية، يجمع بين خفض الضوضاء والشفافية البصرية لمتطلبات المشهد الحضري. إطار ألومنيوم خفيف مع زجاج مقسّى أو ألواح بولي كربونات؛ مُحسَّن لأحمال الرياح.',
    },
    'rail-transit-noise-barrier': {
      name: 'حاجز صوتي للسكك الحديدية والمترو بألواح عازلة',
      desc: 'حاجز صوتي لأنظمة المترو والسكك الخفيفة، مصمّم لتخفيف ضوضاء القطارات منخفضة التردد. يتحمّل نبضات الضغط الهوائي من القطارات المارّة، ومتوافق مع المعايير الصوتية الخاصة بالسكك.',
    },
    'metal-upright-noise-barrier': {
      name: 'حاجز صوتي معدني عمودي بألواح جدار صوتي رأسية',
      desc: 'حاجز صوتي معدني عمودي، وهو النوع الأكثر اقتصادية من جدران الصوت. لوح فولاذي مجلفن بنواة صوف معدني، بخسارة إدخال 10–20 dB(A) للطرق والسكك والمواقع الصناعية.',
    },
    'metal-bent-curved-noise-barrier': {
      name: 'حاجز صوتي معدني منحنٍ بألواح صوتية قوسية',
      desc: 'حاجز صوتي معدني منحنٍ بحافة علوية منحنية للداخل لتحسين انعراج الصوت. تصميم قوسي جمالي، بخسارة إدخال 15–25 dB(A) للطرق السريعة والطرق المرتفعة.',
    },
    'transparent-acrylic-glass-noise-barrier': {
      name: 'حاجز صوتي شفاف من الأكريليك والزجاج بألواح PC',
      desc: 'حاجز صوتي شفاف من الأكريليك أو الزجاج لأقصى رؤية مع حماية صوتية. بولي كربونات أو زجاج مقسّى، STC 30–33، للجسور والطرق الحضرية والمناطق ذات المناظر.',
    },
  },
};

/** 该语种是否为「试水语种」（决定要不要套覆盖层） */
export function hasPartialContent(locale: string): boolean {
  return locale === 'ms' || locale === 'ar';
}
