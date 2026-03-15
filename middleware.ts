import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BRAIN_API_KEY = process.env.BRAIN_API_KEY;

function hasBearerKey(req: NextRequest): boolean {
  if (!BRAIN_API_KEY) return false;
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const [scheme, token] = auth.split(" ");
  return scheme?.toLowerCase() === "bearer" && token === BRAIN_API_KEY;
}

function hasSessionToken(req: NextRequest): boolean {
  return !!(
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/explorer" || pathname.startsWith("/explorer/")) {
    return NextResponse.redirect(new URL("/live", req.url));
  }

  // Auth API routes — NextAuth handles its own security
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Brain events POST/GET — Molly pushes with API key
  if (pathname === "/api/brain-events") {
    if (hasBearerKey(req)) return NextResponse.next();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Command log — POST from VM scripts (API key), GET from UI (session)
  if (pathname === "/api/commands/log") {
    if (req.method === "POST" && hasBearerKey(req)) return NextResponse.next();
    if (req.method === "GET" && hasSessionToken(req)) return NextResponse.next();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Commands — POST from UI (session), GET from watcher/Molly (API key)
  if (pathname === "/api/commands" || pathname === "/api/commands/pending") {
    if (req.method === "GET" && hasBearerKey(req)) return NextResponse.next();
    if (req.method === "POST" && hasSessionToken(req)) return NextResponse.next();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // VM status — POST from watcher (API key), GET from UI (session)
  if (pathname === "/api/vm-status") {
    if (req.method === "POST" && hasBearerKey(req)) return NextResponse.next();
    if (req.method === "GET" && hasSessionToken(req)) return NextResponse.next();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // SSE stream, WebSocket, models, assets — require valid session
  if (
    pathname === "/api/brain-events/stream" ||
    pathname === "/api/ws" ||
    pathname.startsWith("/api/models/") ||
    pathname.startsWith("/api/assets/")
  ) {
    if (hasSessionToken(req)) return NextResponse.next();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Public pages — only login and root
  const publicRoutes = ["/", "/login"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isLoggedIn = hasSessionToken(req);

  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/") && isLoggedIn) {
    return NextResponse.redirect(new URL("/live", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
