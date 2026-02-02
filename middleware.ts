import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// match all locales in your lingo.json
const locales = ["en", "es", "de", "fr", "ja", "zh", "hi"];

export default function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = "en";
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and API routes
    "/((?!_next|api).*)",
  ],
};
