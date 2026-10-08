import { NextRequest, NextResponse } from "next/server";

const legacyLocaleLessRoute = /^\/(about|privacy|support|terms)(?:\/.*)?\/?$/;
const directBookRoute = /^\/(?:privacy|support)\/book\/?$/;

function localeForRequest(request: NextRequest) {
  return request.headers.get("x-vercel-ip-country")?.toUpperCase() === "KR" ? "ko" : "en";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (request.nextUrl.hostname.toLowerCase() === "www.ninjaturtle.win") {
    const url = request.nextUrl.clone();
    url.hostname = "ninjaturtle.win";
    return NextResponse.redirect(url, 308);
  }
  if ((pathname === "/" || legacyLocaleLessRoute.test(pathname)) && !directBookRoute.test(pathname)) {
    const locale = localeForRequest(request);
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname.replace(/\/$/, "")}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\..*).*)"],
};
