import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle Admin UI routes (/admin, /admin/products, etc.)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    const session = token ? await verifyAdminToken(token) : null;

    // If already logged in and visiting login page, redirect to dashboard
    if (pathname === '/admin/login') {
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // If not authenticated, redirect to login page with callback URL
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (token) {
        response.cookies.delete('admin_token');
      }
      return response;
    }
  }

  // 2. Protect Admin API routes (/api/admin/*) except login & logout
  if (
    pathname.startsWith('/api/admin') &&
    pathname !== '/api/admin/login' &&
    pathname !== '/api/admin/logout'
  ) {
    const token = request.cookies.get('admin_token')?.value;
    const session = token ? await verifyAdminToken(token) : null;

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
