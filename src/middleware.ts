// Middleware disabled for static export
// All routing is handled by the [locale] dynamic segment

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  // For static export, we don't need locale redirection
  // The [locale] segment handles all routing
  return NextResponse.next();
}

export const config = {
  matcher: []
};
