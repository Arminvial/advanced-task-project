// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url)) // یا هر صفحه داشبورد
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      تمام مسیرهایی که می‌خوای با middleware بررسی بشن رو اینجا بنویس.
      مثلاً همه‌ی مسیرهای داشبورد:
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
