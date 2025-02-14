import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { isValidPassword } from "./lib/utils/is-valid-password";
// import { rateLimiter } from "./services/updtash";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  // Check if the request is for /dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const isAuthenticated = await isAuth(req);
    if (!isAuthenticated) {
      // const ip = req.headers.get("x-forwarded-for");
      // if (!ip) {
      //   return new NextResponse("Unauthorized", {
      //     status: 401,
      //     headers: { "WWW-Authenticate": "Basic" },
      //   });
      // }

      // const { success } = await rateLimiter(3, "1 m").limit(ip);

      // if (!success) {
      //   return new NextResponse("Too many requests", {
      //     status: 429,
      //     headers: { "WWW-Authenticate": "Basic" },
      //   });
      // }
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
  matcher: ["/", "/(pl|en|ru)/:path*", "/dashboard/:path*"],
};

async function isAuth(req: NextRequest): Promise<boolean> {
  const authHeader =
    req.headers.get("Authorization") ?? req.headers.get("authorization");

  if (!authHeader) return false;

  const [username, password] = Buffer.from(
    authHeader.split(" ")[1] ?? "",
    "base64",
  )
    .toString()
    .split(":");

  if (!username || !password) return false;

  return (
    username === env.ADMIN_USERNAME &&
    (await isValidPassword(password, env.ADMIN_HASHED_PASSWORD))
  );
}
