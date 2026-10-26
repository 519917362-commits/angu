import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const content: Record<string, { title: string; description: string }> = {
    en: {
      title: 'Privacy Policy — Angu Wire Mesh',
      description: 'Angu Wire Mesh privacy policy explains how we collect, use and protect your personal information.',
    },
    zh: {
      title: '隐私政策 — Angu Wire Mesh',
      description: 'Angu Wire Mesh 隐私政策说明我们如何收集、使用和保护您的个人信息。',
    },
    vi: {
      title: 'Chính Sách Bảo Mật — Angu Wire Mesh',
      description: 'Angu Wire Mesh giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.',
    },
    th: {
      title: 'นโยบายความเป็นส่วนตัว — Angu Wire Mesh',
      description: 'Angu Wire Mesh อธิบายวิธีที่เรารวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณ',
    },
  };
  const c = content[locale] || content.en;

  return {
    title: c.title,
    description: c.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://www.angumesh.com/${locale}/privacy`,
      languages: {
        'x-default': 'https://www.angumesh.com/en/privacy',
        en: 'https://www.angumesh.com/en/privacy',
        zh: 'https://www.angumesh.com/zh/privacy',
        vi: 'https://www.angumesh.com/vi/privacy',
        th: 'https://www.angumesh.com/th/privacy',
      },
    },
  };
}

const pageContent: Record<string, { heading: string; updated: string; sections: { h4: string; body: string }[] }> = {
  en: {
    heading: 'Privacy Policy',
    updated: 'Last updated: October 2026',
    sections: [
      { h4: '1. Information We Collect', body: 'When you submit an inquiry or quote request on our website, we collect: your name, email address, phone number, company name, and the content of your message. This information is voluntarily provided by you.' },
      { h4: '2. How We Use Your Information', body: 'We use your information solely to: (a) respond to your inquiries and provide product quotes; (b) communicate with you about our products and services; (c) process orders and transactions; (d) improve our customer service experience. We do not sell or rent your personal information to third parties.' },
      { h4: '3. Data Protection', body: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your inquiry data is stored securely and only accessible to authorized sales staff at Anping County Angu Metal Wire Mesh Products Co., Ltd.' },
      { h4: '4. Cookies', body: 'Our website uses cookies to keep the site working and to measure traffic. The analytics cookies we set are _ga and _ga_<container-id>, which distinguish unique browsers and are kept for up to 2 years. We advertise on Google, and when you arrive through a Google ad we store the click identifier (gclid) together with campaign parameters in your browser local storage for up to 90 days, so we can tell which campaigns produce genuine inquiries. We do not run cross-site profiling cookies and we never sell your data. You can delete or block cookies at any time in your browser settings; the site will keep working, though some preferences may not be remembered.' },
      { h4: '5. Third-Party Services', body: 'We use Google Analytics 4 to understand how visitors use this site — pages viewed, country, device type and referring source. We also advertise through Google Ads; Google may set cookies to measure ad performance and to avoid showing you the same ad repeatedly. Analytics data is collected through the cookies described above, and IP addresses are not used to identify you. To opt out of personalised advertising, visit adssettings.google.com; to opt out of analytics, block or delete the _ga cookies in your browser settings or browse in private mode. For more details, see Google\'s privacy policy at policies.google.com/privacy.' },
      { h4: '6. Data Retention', body: 'We retain your inquiry data for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable laws. You may request deletion of your personal data at any time by contacting us.' },
      { h4: '7. Your Rights', body: 'You have the right to: (a) access the personal data we hold about you; (b) request correction of inaccurate data; (c) request deletion of your data; (d) object to processing of your data; (e) request data portability. To exercise any of these rights, contact us at annie@angumesh.com.' },
      { h4: '8. Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at: Email: annie@angumesh.com; Phone: +86 188 0318 9797; Address: 1,000 m Northwest of Houzhaotuan Village, Nanwangzhuang Town, Anping County, Hengshui, Hebei 053600, China. Company: Anping County Angu Metal Wire Mesh Products Co., Ltd.' },
    ],
  },
  zh: {
    heading: '隐私政策',
    updated: '最后更新:2026 年 10 月',
    sections: [
      { h4: '1. 信息收集', body: '当您在我们的网站上提交咨询或报价请求时，我们会收集：您的姓名、电子邮件地址、电话号码、公司名称以及留言内容。这些信息由您自愿提供。' },
      { h4: '2. 信息使用', body: '我们仅将您的信息用于：(a) 回复您的咨询并提供产品报价；(b) 与您沟通产品和服务；(c) 处理订单和交易；(d) 改善客户服务体验。我们不会向第三方出售或出租您的个人信息。' },
      { h4: '3. 数据保护', body: '我们采取适当的技术和管理措施来保护您的个人数据，防止未经授权的访问、篡改、泄露或销毁。您的咨询数据安全存储，仅安平县安固金属丝网制品有限公司的授权销售人员可访问。' },
      { h4: '4. Cookie', body: '我们的网站使用 Cookie 来保证站点正常运行并统计访问情况。我们设置的统计类 Cookie 为 _ga 与 _ga_<容器ID>，用于区分不同浏览器，最长保留 2 年。我们会在 Google 投放搜索广告；当您通过 Google 广告进入本站时，我们会把点击标识（gclid）及广告系列参数存入您的浏览器本地存储，最长保留 90 天，用于判断哪些广告系列带来了真实询盘。我们不做跨站画像，也绝不出售您的数据。您可以随时在浏览器设置中删除或屏蔽 Cookie，站点仍可正常访问，仅部分偏好设置不会被记住。' },
      { h4: '5. 第三方服务', body: '我们使用 Google Analytics 4 了解访客如何使用本站——浏览了哪些页面、来自哪个国家、使用什么设备、从哪个来源进入。我们同时通过 Google Ads 投放搜索广告，Google 可能设置 Cookie 以衡量广告效果并避免向您重复展示同一广告。统计数据通过上述 Cookie 收集，不会用 IP 地址识别您的身份。如需关闭个性化广告，可访问 adssettings.google.com；如需拒绝统计，可在浏览器设置中屏蔽或删除 _ga Cookie，或使用无痕模式浏览。详情参见 Google 隐私政策：policies.google.com/privacy。' },
      { h4: '6. 数据保留', body: '我们会在实现收集目的所需的时间内保留您的咨询数据，或根据适用法律要求保留。您可以随时联系我们请求删除您的个人数据。' },
      { h4: '7. 您的权利', body: '您有权：(a) 访问我们持有的您的个人数据；(b) 要求更正不准确的数据；(c) 要求删除数据；(d) 反对数据处理；(e) 要求数据可携带。行使上述权利，请联系 annie@angumesh.com。' },
      { h4: '8. 联系我们', body: '如对本隐私政策有任何疑问，请联系我们：邮箱：annie@angumesh.com；电话：+86 188 0318 9797；地址：中国河北省衡水市安平县南王庄镇后赵疃村西北1000米处。公司：安平县安固金属丝网制品有限公司。' },
    ],
  },
  vi: {
    heading: 'Chính Sách Bảo Mật',
    updated: 'Cập nhật lần cuối: tháng 10 năm 2026',
    sections: [
      { h4: '1. Thông Tin Chúng Tôi Thu Thập', body: 'Khi bạn gửi yêu cầu báo giá hoặc tin nhắn trên website, chúng tôi thu thập: tên, địa chỉ email, số điện thoại, tên công ty và nội dung tin nhắn của bạn. Thông tin này do bạn tự nguyện cung cấp.' },
      { h4: '2. Cách Chúng Tôi Sử Dụng Thông Tin', body: 'Chúng tôi chỉ sử dụng thông tin của bạn để: (a) phản hồi yêu cầu và cung cấp báo giá; (b) liên lạc về sản phẩm và dịch vụ; (c) xử lý đơn hàng và giao dịch; (d) cải thiện trải nghiệm dịch vụ khách hàng. Chúng tôi không bán hoặc cho thuê thông tin cá nhân cho bên thứ ba.' },
      { h4: '3. Bảo Vệ Dữ Liệu', body: 'Chúng tôi áp dụng biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân chống truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy. Dữ liệu yêu cầu được lưu trữ an toàn và chỉ nhân viên bán hàng được ủy quyền tại Anping County Angu Metal Wire Mesh Products Co., Ltd. mới có quyền truy cập.' },
      { h4: '4. Cookie', body: 'Trang web của chúng tôi dùng cookie để đảm bảo site hoạt động và đo lường lưu lượng truy cập. Cookie phân tích chúng tôi đặt là _ga và _ga_<container-id>, dùng để phân biệt các trình duyệt và được lưu tối đa 2 năm. Chúng tôi có chạy quảng cáo trên Google; khi bạn đến từ một quảng cáo Google, chúng tôi lưu mã nhận diện lượt nhấp (gclid) cùng các tham số chiến dịch trong bộ nhớ cục bộ của trình duyệt tối đa 90 ngày, nhằm biết chiến dịch nào mang lại yêu cầu báo giá thực sự. Chúng tôi không tạo hồ sơ xuyên trang và không bán dữ liệu của bạn. Bạn có thể xóa hoặc chặn cookie trong cài đặt trình duyệt bất kỳ lúc nào; trang vẫn hoạt động, chỉ một số tùy chọn sẽ không được ghi nhớ.' },
      { h4: '5. Dịch Vụ Bên Thứ Ba', body: 'Chúng tôi dùng Google Analytics 4 để hiểu cách khách truy cập sử dụng trang — trang nào được xem, quốc gia, loại thiết bị và nguồn giới thiệu. Chúng tôi cũng quảng cáo qua Google Ads; Google có thể đặt cookie để đo hiệu quả quảng cáo và tránh hiển thị lặp lại cùng một quảng cáo. Dữ liệu phân tích được thu thập qua cookie nêu trên; địa chỉ IP không được dùng để nhận diện bạn. Để tắt quảng cáo cá nhân hóa, truy cập adssettings.google.com; để từ chối phân tích, hãy chặn hoặc xóa cookie _ga trong cài đặt trình duyệt hoặc dùng chế độ ẩn danh. Xem chính sách quyền riêng tư của Google tại policies.google.com/privacy.' },
      { h4: '6. Lưu Trữ Dữ Liệu', body: 'Chúng tôi lưu trữ dữ liệu yêu cầu trong thời gian cần thiết để thực hiện mục đích thu thập, hoặc theo yêu cầu của luật pháp. Bạn có thể yêu cầu xóa dữ liệu cá nhân bất kỳ lúc nào bằng cách liên hệ với chúng tôi.' },
      { h4: '7. Quyền Của Bạn', body: 'Bạn có quyền: (a) truy cập dữ liệu cá nhân chúng tôi nắm giữ; (b) yêu cầu chỉnh sửa dữ liệu không chính xác; (c) yêu cầu xóa dữ liệu; (d) phản đối xử lý dữ liệu; (e) yêu cầu khả năng di chuyển dữ liệu. Để thực hiện quyền này, liên hệ annie@angumesh.com.' },
      { h4: '8. Liên Hệ', body: 'Nếu có thắc mắc về Chính Sách Bảo Mật này, vui lòng liên hệ: Email: annie@angumesh.com; Điện thoại: +86 188 0318 9797; Địa chỉ: Anping County, Hebei Province, China. Công ty: Anping County Angu Metal Wire Mesh Products Co., Ltd.' },
    ],
  },
  th: {
    heading: 'นโยบายความเป็นส่วนตัว',
    updated: 'อัปเดตล่าสุด: ตุลาคม 2026',
    sections: [
      { h4: '1. ข้อมูลที่เรารวบรวม', body: 'เมื่อคุณส่งคำถามหรือขอใบเสนอราคาบนเว็บไซต์ เรารวบรวม: ชื่อ, อีเมล, เบอร์โทรศัพท์, ชื่อบริษัท และเนื้อหาข้อความของคุณ ข้อมูลนี้คุณให้โดยสมัครใจ' },
      { h4: '2. วิธีที่เราใช้ข้อมูล', body: 'เราใช้ข้อมูลของคุณเพื่อ: (a) ตอบคำถามและเสนอราคาสินค้า; (b) ติดต่อคุณเกี่ยวกับผลิตภัณฑ์และบริการ; (c) ดำเนินการคำสั่งซื้อและธุรกรรม; (d) ปรับปรุงประสบการณ์การบริการลูกค้า เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลแก่บุคคลที่สาม' },
      { h4: '3. การปกป้องข้อมูล', body: 'เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลจากการเข้าถึงโดยไม่ได้รับอนุญาต การเปลี่ยนแปลง การเปิดเผย หรือการทำลาย ข้อมูลคำถามของคุณถูกจัดเก็บอย่างปลอดภัยและเข้าถึงได้เฉพาะพนักงานขายที่ได้รับอนุญาตของ Anping County Angu Metal Wire Mesh Products Co., Ltd.' },
      { h4: '4. คุกกี้', body: 'เว็บไซต์ของเราใช้คุกกี้เพื่อให้เว็บทำงานและวัดปริมาณการเข้าชม คุกกี้เพื่อการวิเคราะห์ที่เราตั้งคือ _ga และ _ga_<container-id> ใช้แยกแยะเบราว์เซอร์แต่ละเครื่อง เก็บไว้ไม่เกิน 2 ปี เราลงโฆษณาบน Google และเมื่อคุณเข้าถึงจากโฆษณา Google เราจะบันทึกรหัสการคลิก (gclid) พร้อมพารามิเตอร์แคมเปญไว้ในหน่วยความจำภายในเบราว์เซอร์ไม่เกิน 90 วัน เพื่อทราบว่าแคมเปญใดสร้างคำขอใบเสนอราคาจริง เราไม่สร้างโปรไฟล์ข้ามเว็บไซต์และไม่ขายข้อมูลของคุณ คุณสามารถลบหรือบล็อกคุกกี้ได้ในการตั้งค่าเบราว์เซอร์ตลอดเวลา เว็บยังใช้งานได้ เพียงการตั้งค่าบางอย่างอาจไม่ถูกจดจำ' },
      { h4: '5. บริการของบุคคลที่สาม', body: 'เราใช้ Google Analytics 4 เพื่อเข้าใจว่าผู้เยี่ยมชมใช้เว็บอย่างไร — หน้าใดถูกเปิด ประเทศ ประเภทอุปกรณ์ และแหล่งที่มา เรายังลงโฆษณาผ่าน Google Ads ซึ่ง Google อาจตั้งคุกกี้เพื่อวัดประสิทธิภาพโฆษณาและหลีกเลี่ยงการแสดงโฆษณาเดิมซ้ำ ข้อมูลวิเคราะห์เก็บผ่านคุกกี้ข้างต้น เราไม่ใช้ที่อยู่ IP เพื่อระบุตัวตนของคุณ หากต้องการปิดโฆษณาเฉพาะบุคคล กรุณาไปที่ adssettings.google.com หากต้องการปฏิเสธการวิเคราะห์ กรุณาบล็อกหรือลบคุกกี้ _ga ในการตั้งค่าเบราว์เซอร์ หรือใช้โหมดไม่ระบุตัวตน ดูรายละเอียดที่ policies.google.com/privacy' },
      { h4: '6. การเก็บรักษาข้อมูล', body: 'เราเก็บรักษาข้อมูลคำถามของคุณตามระยะเวลาที่จำเป็นเพื่อบรรลุวัตถุประสงค์ในการรวบรวม หรือตามที่กฎหมายกำหนด คุณสามารถขอให้ลบข้อมูลส่วนบุคคลของคุณได้ตลอดเวลาโดยติดต่อเรา' },
      { h4: '7. สิทธิของคุณ', body: 'คุณมีสิทธิ์: (a) เข้าถึงข้อมูลส่วนบุคคลที่เราเก็บไว้; (b) ขอแก้ไขข้อมูลที่ไม่ถูกต้อง; (c) ขอลบข้อมูล; (d) คัดค้านการประมวลผลข้อมูล; (e) ขอความสามารถในการพกพาข้อมูล เพื่อใช้สิทธิ์เหล่านี้ ติดต่อ annie@angumesh.com' },
      { h4: '8. ติดต่อเรา', body: 'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้กรุณาติดต่อ: อีเมล: annie@angumesh.com; โทรศัพท์: +86 188 0318 9797; ที่อยู่: Anping County, Hebei Province, China. บริษัท: Anping County Angu Metal Wire Mesh Products Co., Ltd.' },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = pageContent[locale] || pageContent.en;

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{c.heading}</h1>
        <p className="text-sm text-slate-500 mb-8">{c.updated}</p>

        {c.sections.map((section, i) => (
          <div key={i} className="mb-8">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">{section.h4}</h4>
            <p className="text-slate-600 leading-relaxed">{section.body}</p>
          </div>
        ))}

        <p className="text-xs text-slate-400 mt-12 border-t border-slate-100 pt-8">
          &copy; {new Date().getFullYear()} Anping County Angu Metal Wire Mesh Products Co., Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
