'use client';

import {use, useState, FormEvent} from 'react';
import {MessageCircle, Mail, Phone, MapPin, Loader2} from 'lucide-react';
import {useSiteConfig, cfgVal} from '@/lib/hooks';
import { tLabel } from '@/lib/i18n';

export default function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = use(params);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', country: '', message: '',
    product_interest: '', website: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const siteConfig = useSiteConfig();
  const phone = cfgVal(siteConfig, 'phone', locale, '+86 188 0318 9797');
  const email = cfgVal(siteConfig, 'email', locale, 'anguwiremesh@gmail.com');
  const whatsapp = cfgVal(siteConfig, 'whatsapp', locale, '+86 188 0318 9797');
  const address = cfgVal(siteConfig, 'address', locale, tLabel('中国河北省衡水市安平县', 'Anping County, Hengshui, Hebei, China', locale));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot: if filled, silently reject
    if (formData.website) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const {website, ...inquiryData} = formData;
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...inquiryData,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (tLabel('提交失败，请稍后重试。', 'Submission failed. Please try again.', locale)));
      }

      setSubmittedData(formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : (tLabel('网络错误，请检查连接。', 'Network error. Please check your connection.', locale)));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-slate-900 mb-6">{tLabel('联系方式', 'Get In Touch', locale)}</h2>
            <div className="space-y-5">
              {[
                {icon: Phone, label: tLabel('电话 / WhatsApp', 'Phone / WhatsApp', locale), value: phone, href: `tel:${phone.replace(/[^0-9+]/g, '')}`},
                {icon: Mail, label: tLabel('邮箱', 'Email', locale), value: email, href: `mailto:${email}`},
                {icon: MapPin, label: tLabel('工厂地址', 'Factory Address', locale), value: address, href: null},
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-900 hover:text-blue-600 transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm text-slate-900">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {tLabel('WhatsApp咨询', 'Chat on WhatsApp', locale)}
          </a>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">{tLabel('工作时间', 'Business Hours', locale)}</h3>
            <p className="text-sm text-slate-600">{tLabel('周一至周五：上午8:30 – 下午6:00（UTC+8）', 'Mon–Fri: 8:30 AM – 6:00 PM (UTC+8)', locale)}</p>
            <p className="text-sm text-slate-600">{tLabel('周六：上午9:00 – 下午1:00', 'Sat: 9:00 AM – 1:00 PM', locale)}</p>
            <p className="text-sm text-red-500 mt-2">{tLabel('周日：休息', 'Sun: Closed', locale)}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{tLabel('给我们留言', 'Send Us a Message', locale)}</h2>
            <p className="text-slate-500 text-sm mb-8">{tLabel('我们通常在24小时内回复。', 'We typically respond within 24 hours.', locale)}</p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4" aria-hidden="true">✅</div>
                <p className="text-lg font-semibold text-slate-900 mb-2">{tLabel('消息已发送！', 'Message Sent!', locale)}</p>
                <p className="text-slate-500 mb-6">{tLabel('我们将在24小时内回复您。', 'We will get back to you within 24 hours.', locale)}</p>
                {submittedData && (
                  <div className="max-w-md mx-auto text-left bg-slate-50 rounded-xl p-5 border border-slate-200 mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">{tLabel('您提交的信息：', 'Your Submission:', locale)}</h4>
                    <dl className="space-y-1.5 text-sm">
                      <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('姓名', 'Name', locale)}</dt><dd className="text-slate-700">{submittedData.name}</dd></div>
                      <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('邮箱', 'Email', locale)}</dt><dd className="text-slate-700">{submittedData.email}</dd></div>
                      {submittedData.phone && <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('电话', 'Phone', locale)}</dt><dd className="text-slate-700">{submittedData.phone}</dd></div>}
                      {submittedData.company && <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('公司', 'Company', locale)}</dt><dd className="text-slate-700">{submittedData.company}</dd></div>}
                      {submittedData.country && <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('国家', 'Country', locale)}</dt><dd className="text-slate-700">{submittedData.country}</dd></div>}
                      {submittedData.product_interest && <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('产品', 'Product', locale)}</dt><dd className="text-slate-700">{submittedData.product_interest}</dd></div>}
                      <div className="flex gap-2"><dt className="text-slate-400 w-20 flex-shrink-0">{tLabel('留言', 'Message', locale)}</dt><dd className="text-slate-700 line-clamp-3">{submittedData.message}</dd></div>
                    </dl>
                  </div>
                )}
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({name: '', email: '', phone: '', company: '', country: '', message: '', product_interest: '', website: ''});
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {tLabel('发送另一条消息', 'Send Another Message', locale)}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {tLabel('您的姓名', 'Your Name', locale)} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={tLabel('张三', 'John Smith', locale)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {tLabel('邮箱', 'Email', locale)} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={120}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={tLabel('zhangsan@company.com', 'john@company.com', locale)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{tLabel('电话 / WhatsApp', 'Phone / WhatsApp', locale)}</label>
                    <input
                      type="tel"
                      maxLength={30}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={tLabel('+86 138 1234 5678', '+1 234 567 8900', locale)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{tLabel('国家', 'Country', locale)}</label>
                    <input
                      type="text"
                      maxLength={60}
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={tLabel('中国', 'United States', locale)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{tLabel('公司名称', 'Company Name', locale)}</label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={tLabel('某某建设有限公司', 'ABC Construction Ltd.', locale)}
                  />
                </div>

                {/* Product Interest Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{tLabel('感兴趣的产品', 'Product Interest', locale)}</label>
                  <select
                    value={formData.product_interest}
                    onChange={(e) => setFormData({...formData, product_interest: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="">{tLabel('请选择产品类别（可选）', 'Select a product category (optional)', locale)}</option>
                    <optgroup label={tLabel('石笼网系列', 'Gabion Series', locale)}>
                      <option value="Gabion Box">{tLabel('石笼网箱', 'Gabion Box', locale)}</option>
                      <option value="Reno Mattress">{tLabel('雷诺护垫', 'Reno Mattress', locale)}</option>
                      <option value="Welded Gabion">{tLabel('焊接石笼网', 'Welded Gabion', locale)}</option>
                    </optgroup>
                    <optgroup label={tLabel('防护网系列', 'Protection Net Series', locale)}>
                      <option value="Rockfall Net">{tLabel('边坡防护网', 'Rockfall Protection Net', locale)}</option>
                      <option value="Stainless Steel Rope Net">{tLabel('不锈钢绳网', 'Stainless Steel Rope Net', locale)}</option>
                    </optgroup>
                    <optgroup label={tLabel('护栏网系列', 'Fence Series', locale)}>
                      <option value="Chain Link Fence">{tLabel('勾花网围栏', 'Chain Link Fence', locale)}</option>
                      <option value="Wire Mesh Fence">{tLabel('护栏网', 'Wire Mesh Fence', locale)}</option>
                      <option value="Double Wire Fence">{tLabel('双边丝护栏网', 'Double Wire Fence', locale)}</option>
                    </optgroup>
                    <optgroup label={tLabel('其他产品', 'Other Products', locale)}>
                      <option value="Barbed Wire">{tLabel('刺绳', 'Barbed Wire', locale)}</option>
                      <option value="Noise Barrier">{tLabel('声屏障', 'Noise Barrier', locale)}</option>
                      <option value="Other">{tLabel('其他/多个产品', 'Other / Multiple', locale)}</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {tLabel('留言', 'Message', locale)} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    maxLength={2000}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder={tLabel('请描述您的项目、所需产品、规格、数量以及任何问题...', 'Please describe your project, required products, specifications, quantity, and any questions you have...', locale)}
                  />
                </div>

                {/* Honeypot field — hidden from humans, bots fill it */}
                <div className="hidden" aria-hidden="true">
                  <label>Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {tLabel('发送中...', 'Sending...', locale)}
                    </>
                  ) : (
                    tLabel('发送消息', 'Send Message', locale)
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
