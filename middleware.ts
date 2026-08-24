import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import hideMe from "./hideMe.json";

const SESSION_COOKIE = "kwizkit.session";

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (pathname === "/auth") {
    url.search = "";
  }
  return NextResponse.redirect(url);
}

function hasSessionCookie(request: NextRequest) {
  return request.cookies.has(SESSION_COOKIE);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isHidden = hideMe.hiddenRoutes.some(
    (hiddenRoute) =>
      pathname === hiddenRoute || pathname.startsWith(`${hiddenRoute}/`)
  );

  if (isHidden) {
    return redirectTo(request, "/dashboard");
  }

  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAuth = pathname === "/auth" || pathname.startsWith("/auth/");

  if (!isDashboard && !isAuth) {
    return NextResponse.next();
  }

  const signedIn = hasSessionCookie(request);

  if (isDashboard) {
    if (!signedIn) return redirectTo(request, "/auth");
    return NextResponse.next();
  }

  if (signedIn) {
    return redirectTo(request, "/dashboard");
  }

  if (pathname !== "/auth") {
    return redirectTo(request, "/auth");
  }

  return NextResponse.next();
}

export const proxy = middleware;

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/:path*", "/auth", "/auth/:path*"],
};
