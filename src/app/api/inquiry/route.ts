import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name, email, phone, company, country, quantity, message, productSlug, categorySlug, locale} = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({error: 'Name, email, and message are required.'}, {status: 400});
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({error: 'Invalid email address.'}, {status: 400});
    }

    const inquiry = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      country: country || '',
      quantity: quantity || '',
      message,
      productSlug: productSlug || '',
      categorySlug: categorySlug || '',
      locale: locale || 'en',
      createdAt: new Date().toISOString(),
      inquiryNo: `INQ-${Date.now()}`,
    };

    // Log the inquiry (in production, save to database)
    console.log('[New Inquiry]', JSON.stringify(inquiry, null, 2));

    // TODO: Save to Supabase
    // TODO: Send email notification via Resend

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully.',
      inquiryNo: inquiry.inquiryNo,
    });
  } catch (error) {
    console.error('[Inquiry Error]', error);
    return NextResponse.json({error: 'Internal server error.'}, {status: 500});
  }
}
