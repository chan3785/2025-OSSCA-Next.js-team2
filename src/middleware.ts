import { NextRequest, NextResponse } from 'next/server';

// 인증이 필요 없는 경로 목록
const PUBLIC_PATHS = ['/login', '/register', '/api'];

/**
 * 인증 미들웨어: (main) 경로 접근 시 쿠키의 'token' 존재 여부로 인증 체크
 * 인증이 없으면 /login으로 리다이렉트
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // public 경로는 인증 체크 제외
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // (main) 경로만 보호
  if (pathname.startsWith('/')) {
    const token = request.cookies.get('token');
    if (!token) {
      // 인증 없으면 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 그 외는 통과
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/(main)/:path*', // (main) 이하 모든 경로에 적용
  ],
}; 