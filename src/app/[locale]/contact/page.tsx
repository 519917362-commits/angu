'use client';

import {use, useState} from 'react';
import {MessageCircle, Mail, Phone, MapPin} from 'lucide-react';

function WeChatIcon({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.801 0 8.692-3.287 8.692-7.342 0-4.054-3.891-7.335-8.692-7.335zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.446.592-4.682 1.726-.27.27-.405.62-.405.987 0 .366.135.717.405.988 1.235 1.134 2.885 1.777 4.682 1.725 1.798.053 3.447-.591 4.683-1.726.27-.271.405-.622.405-.988 0-.366-.135-.717-.405-.987-1.236-1.135-2.885-1.778-4.683-1.725zM14.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
    </svg>
  );
}

export default function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = use(params);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', country: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-3">{isZh ? '联系我们' : 'Contact Us'}</h1>
          <p className="text-blue-200">{isZh ? '与我们的团队联系，获取免费咨询和报价。' : 'Get in touch with our team for a free consultation and quotation.'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg text-slate-900 mb-6">{isZh ? '联系方式' : 'Get In Touch'}</h2>
              <div className="space-y-5">
                {[
                  {icon: Phone, label: isZh ? '电话 / WhatsApp' : 'Phone / WhatsApp', value: '+86 138-1234-5678', href: 'tel:+8613812345678'},
                  {icon: WeChatIcon, label: isZh ? '微信' : 'WeChat', value: 'paiqiwiremesh', href: null},
                  {icon: Mail, label: isZh ? '邮箱' : 'Email', value: 'sales@paiqiwiremesh.com', href: 'mailto:sales@paiqiwiremesh.com'},
                  {icon: MapPin, label: isZh ? '工厂地址' : 'Factory Address', value: isZh ? '中国河北省衡水市安平县丝网工业区 053600' : 'Wire Mesh Industrial Zone, Anping County, Hengshui, Hebei, China 053600', href: null},
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
              href="https://wa.me/8613812345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              {isZh ? 'WhatsApp咨询' : 'Chat on WhatsApp'}
            </a>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{isZh ? '工作时间' : 'Business Hours'}</h3>
              <p className="text-sm text-slate-600">{isZh ? '周一至周五：上午8:30 – 下午6:00（UTC+8）' : 'Mon–Fri: 8:30 AM – 6:00 PM (UTC+8)'}</p>
              <p className="text-sm text-slate-600">{isZh ? '周六：上午9:00 – 下午1:00' : 'Sat: 9:00 AM – 1:00 PM'}</p>
              <p className="text-sm text-red-500 mt-2">{isZh ? '周日：休息' : 'Sun: Closed'}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{isZh ? '给我们留言' : 'Send Us a Message'}</h2>
              <p className="text-slate-500 text-sm mb-8">{isZh ? '我们通常在24小时内回复。' : 'We typically respond within 24 hours.'}</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-lg font-semibold text-slate-900 mb-2">{isZh ? '消息已发送！' : 'Message Sent!'}</p>
                  <p className="text-slate-500">{isZh ? '我们将在24小时内回复您。' : 'We will get back to you within 24 hours.'}</p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {isZh ? '您的姓名' : 'Your Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder={isZh ? '张三' : 'John Smith'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {isZh ? '邮箱' : 'Email'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder={isZh ? 'zhangsan@company.com' : 'john@company.com'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{isZh ? '电话 / WhatsApp' : 'Phone / WhatsApp'}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder={isZh ? '+86 138 1234 5678' : '+1 234 567 8900'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{isZh ? '国家' : 'Country'}</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder={isZh ? '中国' : 'United States'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{isZh ? '公司名称' : 'Company Name'}</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder={isZh ? '某某建设有限公司' : 'ABC Construction Ltd.'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {isZh ? '留言' : 'Message'} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder={isZh ? '请描述您的项目、所需产品、规格、数量以及任何问题...' : 'Please describe your project, required products, specifications, quantity, and any questions you have...'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    {isZh ? '发送消息' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
