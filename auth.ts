import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const ALLOWED_EMAIL = process.env.AUTH_ALLOWED_EMAIL;
// Workaround: Next.js dotenv-expand interprets $ as variable expansion
// So we store the hash as base64 and decode it here
const PASSWORD_HASH_B64 = process.env.AUTH_PASSWORD_HASH_B64;
const PASSWORD_HASH = PASSWORD_HASH_B64 
  ? Buffer.from(PASSWORD_HASH_B64, 'base64').toString('utf-8')
  : undefined;
const ALLOWED_IPS = process.env.AUTH_ALLOWED_IPS?.split(",").map((ip) => ip.trim()) ?? [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        if (ALLOWED_EMAIL && email !== ALLOWED_EMAIL) {
          console.warn(`[auth] Rejected login attempt for: ${email}`);
          return null;
        }

        if (!PASSWORD_HASH) {
          console.error("[auth] AUTH_PASSWORD_HASH not configured");
          return null;
        }

        const isValid = await compare(password, PASSWORD_HASH);
        if (!isValid) {
          console.warn(`[auth] Invalid password for: ${email}`);
          return null;
        }

        // IP check (if configured)
        if (ALLOWED_IPS.length > 0) {
          const forwarded = request?.headers?.get?.("x-forwarded-for");
          const realIp = request?.headers?.get?.("x-real-ip");
          const clientIp = forwarded?.split(",")[0]?.trim() || realIp || "unknown";

          if (!ALLOWED_IPS.includes(clientIp) && clientIp !== "unknown") {
            console.warn(`[auth] IP not in allowlist: ${clientIp}`);
            // Don't block, just log - IP detection can be unreliable
          }
        }

        return {
          id: "1",
          email: email,
          name: "Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute =
        request.nextUrl.pathname.startsWith("/explorer") ||
        request.nextUrl.pathname.startsWith("/live") ||
        request.nextUrl.pathname.startsWith("/api/brain-events/stream");

      if (isOnProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  trustHost: true,
});
