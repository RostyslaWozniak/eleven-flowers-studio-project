import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./auth/current-user";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  // Check if the request is for /dashboard

  if (req.nextUrl.pathname.startsWith("/sign-in")) {
    const isAuthenticated = await getCurrentUser();
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const isAuthenticated = await getCurrentUser();
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next(); // Allow access if authenticated
  }
  if (req.nextUrl.pathname.startsWith("/sign-in")) return NextResponse.next();
  // Otherwise, handle internationalization
  return intlMiddleware(req);
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next|.*\\..*).*)", "/dashboard/:path*"],
};
