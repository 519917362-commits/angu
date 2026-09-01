export interface WhyChooseItem {
  icon: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
}

export const whyChooseUs: WhyChooseItem[] = [
  {
    icon: 'Factory',
    titles: {
      en: 'Factory Strength',
      zh: '工厂实力',
    },
    descriptions: {
      en: '15+ years in Anping, China\'s Wire Mesh Capital. 5,000+ tons annual output, 50+ skilled workers.',
      zh: '中国丝网之都安平，15年专注制造。年产5,000+吨，50+技术工人。',
    },
  },
  {
    icon: 'ShieldCheck',
    titles: {
      en: 'ISO 9001 & CE Certified',
      zh: 'ISO 9001 & CE 认证',
    },
    descriptions: {
      en: 'ISO 9001:2015 certified manufacturing with strict QC at every stage. Pre-shipment inspection for every order.',
      zh: 'ISO 9001:2015 认证制造，全流程质检，每单出货前必检。',
    },
  },
  {
    icon: 'Wrench',
    titles: {
      en: 'Full Customization',
      zh: '全定制生产',
    },
    descriptions: {
      en: 'Custom dimensions, wire diameters, coatings available. OEM/ODM supported with technical drawings.',
      zh: '尺寸、丝径、涂层全可定制。支持来图来样 OEM/ODM 加工。',
    },
  },
  {
    icon: 'Ship',
    titles: {
      en: 'Global Shipping',
      zh: '全球物流',
    },
    descriptions: {
      en: 'FCL or LCL via Tianjin Port. DHL/FedEx air freight for urgent orders. Exported to 30+ countries.',
      zh: '整柜/拼箱天津港出发，急单可走空运。已出口 30+ 国家。',
    },
  },
  {
    icon: 'Dollar',
    titles: {
      en: 'Factory-Direct Pricing',
      zh: '工厂直供价格',
    },
    descriptions: {
      en: 'No middlemen. Buy direct from the manufacturer, save 15%-30% vs. trading companies.',
      zh: '无中间商加价，工厂直供比贸易商低 15%-30%。',
    },
  },
  {
    icon: 'Package',
    titles: {
      en: 'Low MOQ for Trial Orders',
      zh: '低起订量试单',
    },
    descriptions: {
      en: 'Start with as little as 50 m². We support trial orders so you can test quality before bulk purchase.',
      zh: '最低 50 平米即可起订。支持试单验货，满意后再大批量采购。',
    },
  },
];
