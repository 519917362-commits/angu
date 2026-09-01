// Proxy (formerly middleware) — disabled, routing handled by [locale] dynamic segment
// Root redirect is handled by src/app/page.tsx (client-side)
// File renamed in Next.js 16: middleware.ts → proxy.ts

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
