import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { isAuth } from "@/server/lib/auth";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  // Check if the request is for /dashboard

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const isAuthenticated = await isAuth(req.headers);
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic" },
      });
    }
    return NextResponse.next(); // Allow access if authenticated
  }
  // Otherwise, handle internationalization
  return intlMiddleware(req);
}
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next|.*\\..*).*)", "/dashboard/:path*"],
};
