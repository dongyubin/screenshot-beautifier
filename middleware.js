import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { locales } from "./lib/i18n";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  
  // 获取请求的 URL 对象以编辑它
  const { pathname } = req.nextUrl;

  // 检查路径是否包含支持的语言前缀
  const isExit = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!isExit) {
    // 如果没有匹配到支持的语言前缀，重定向到根路径
    req.nextUrl.pathname = `/`;
    return Response.redirect(req.nextUrl);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };

export const config = {
  matcher: [
    // 确保中间件仅对相关路径被调用
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};