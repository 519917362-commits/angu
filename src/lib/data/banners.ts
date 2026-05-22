export interface Banner {
  id: string;
  images: Record<string, string>;
  titles: Record<string, string>;
  subtitles: Record<string, string>;
  ctaText: Record<string, string>;
  ctaLink: string;
}

export const banners: Banner[] = [
  {
    id: 'banner-1',
    images: {
      en: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view%20aerial%20photography&image_size=landscape_16_9',
      ar: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      ja: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      ko: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      id: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      vi: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      es: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      fr: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      de: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      pt: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
      th: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
    },
    titles: {
      en: 'Professional Gabion Box & Rockfall Protection Net Manufacturer',
      zh: '专业石笼网箱与防护网制造商',
      ar: 'شركة مصنعة محترفة لصناديق الجابيون وشبكات الحماية من تساقط الصخور',
      ja: '石籠ボックス・落石防護網の専門メーカー',
      ko: '가비언 박스·낙石防護網 전문 제조사',
      id: 'Produsen Kotak Gabion & Jaring Perlindungan Batu Longsor Profesional',
      vi: 'Nhà sản xuất Hộp Gabion & Lưới Bảo Vệ Đá Rơi Chuyên Nghiệp',
      es: 'Fabricante Profesional de Cajas Gabión y Mallas de Protección contra Caída de Rocas',
      fr: 'Fabricant Professionnel de Boîtes Gabions et de Filets de Protection contre les Chutes de Pierres',
      de: 'Professioneller Hersteller von Gabionenkörben und Steinschlagschutznetzen',
      pt: 'Fabricante Profissional de Caixas Gabião e Redes de Proteção contra Queda de Pedras',
      th: 'ผู้ผลิตกล่องหินและตะแกรงป้องกันหินร่วงระดับมืออาชีพ',
    },
    subtitles: {
      en: 'From Anping, China — Trusted by 500+ clients across 30+ countries since 2015',
      zh: '来自中国安平 — 自2015年以来，深受30多个国家500多位客户的信赖',
      ar: 'من أنبينغ، الصين — موثوق بها من قبل أكثر من 500 عميل في أكثر من 30 دولة منذ 2015',
      ja: '中国安平より — 2015年以来30カ国以上の500社以上のクライアントに信頼されています',
      ko: '중국 안핑에서 — 2015년 이후 30개국 500개 이상의 고객이 신뢰',
      id: 'Dari Anping, Tiongkok — Dipercaya oleh 500+ klien di 30+ negara sejak 2015',
      vi: 'Từ Anping, Trung Quốc — Được tin tưởng bởi 500+ khách hàng tại 30+ quốc gia từ năm 2015',
      es: 'Desde Anping, China — Confiado por más de 500 clientes en más de 30 países desde 2015',
      fr: "D'Anping, Chine — Approuvé par plus de 500 clients dans plus de 30 pays depuis 2015",
      de: 'Aus Anping, China — Vertraut von über 500 Kunden in über 30 Ländern seit 2015',
      pt: 'De Anping, China — Confiado por 500+ clientes em mais de 30 países desde 2015',
      th: 'จากอันผิง ประเทศจีน — ไว้วางใจโดยลูกค้ากว่า 500 รายในกว่า 30 ประเทศตั้งแต่ปี 2015',
    },
    ctaText: {
      en: 'Get a Free Quote',
      zh: '免费获取报价',
      ar: 'احصل على عرض سعر مجاني',
      ja: '無料見積もりを依頼',
      ko: '무료 견적 받기',
      id: 'Dapatkan Penawaran Gratis',
      vi: 'Nhận Báo Giá Miễn Phí',
      es: 'Obtener una Cotización Gratis',
      fr: "Obtenir un Devis Gratuit",
      de: 'Kostenloses Angebot anfordern',
      pt: 'Obter Cotação Gratuita',
      th: 'ขอใบเสนอราคาฟรี',
    },
    ctaLink: '/contact',
  },
  {
    id: 'banner-2',
    images: {
      en: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920',
      ja: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920',
    },
    titles: {
      en: 'ISO 9001 Certified — Premium Quality Rockfall Protection Systems',
      ja: 'ISO 9001認証 — 高品質落石防護システム',
    },
    subtitles: {
      en: 'CE certified products with full traceability. Tested to ETAG 027 standards.',
      ja: '完全なトレーサビリティを備えたCE認証製品。ETAG 027規格で試験済み。',
    },
    ctaText: {
      en: 'View Certifications',
      ja: '認証を見る',
    },
    ctaLink: '/about',
  },
  {
    id: 'banner-3',
    images: {
      en: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920',
      ja: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920',
    },
    titles: {
      en: 'Factory Direct Pricing — Low MOQ, Fast Delivery Worldwide',
      ja: '工場直送価格 — 低MOQ、世界中への迅速な配送',
    },
    subtitles: {
      en: 'Minimum order quantity from 50 pieces. Door-to-door shipping available.',
      ja: '最小注文数量50個から。世界中へのドアツードア配送対応。',
    },
    ctaText: {
      en: 'Contact Us',
      ja: 'お問い合わせ',
    },
    ctaLink: '/contact',
  },
];
