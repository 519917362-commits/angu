import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    // Forward to backend
    const body = await request.json();
    const backendRes = await fetch('http://localhost:3001/api/inquiry', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {error: data.error || 'Failed to submit inquiry.'},
        {status: backendRes.status}
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Inquiry Proxy Error]', error);
    return NextResponse.json(
      {error: 'Unable to reach backend. Please try again later.'},
      {status: 503}
    );
  }
}
