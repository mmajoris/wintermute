import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes - no auth needed
  const publicRoutes = ["/", "/login", "/examples"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // API routes for brain events (uses API key auth, not session)
  if (pathname.startsWith("/api/brain-events") && !pathname.includes("/stream")) {
    return NextResponse.next();
  }

  // Auth API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check for session token
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;

  // Protected routes require login
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login page
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/explorer", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|models|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
