export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  productCategory?: string;
  productSlug?: string;
  quantity?: string;
  application?: string;
  budget?: string;
  message: string;
  locale: string;
  utmSource?: string;
  utmCampaign?: string;
}

export interface Inquiry extends InquiryFormData {
  id: string;
  status: 'pending' | 'processing' | 'replied' | 'closed';
  createdAt: string;
}
