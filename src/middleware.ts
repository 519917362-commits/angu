// Middleware disabled for static export
// All routing is handled by the [locale] dynamic segment
// Root redirect is handled by src/app/page.tsx (client-side)

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
