"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/explorer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid credentials");
        setLoading(false);
      } else if (result?.ok) {
        window.location.href = callbackUrl;
      }
    } catch {
      setError("An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-neutral-500 uppercase tracking-wider mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          placeholder="admin@wintermute.local"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs text-neutral-500 uppercase tracking-wider mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          placeholder="••••••••••••"
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Authenticating...
          </>
        ) : (
          "Access System"
        )}
      </button>
    </form>
  );
}

function LoginFormFallback() {
  return (
    <div className="space-y-5">
      <div className="h-[72px] bg-white/[0.02] rounded-xl animate-pulse" />
      <div className="h-[72px] bg-white/[0.02] rounded-xl animate-pulse" />
      <div className="h-[48px] bg-indigo-600/50 rounded-xl animate-pulse" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#060609] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-3xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full bg-indigo-500"
                style={{ boxShadow: "0 0 12px #6366f180" }}
              />
              <h1 className="text-2xl font-bold text-white tracking-wide">
                WINTERMUTE
              </h1>
            </div>
            <p className="text-sm text-neutral-500">
              Neural Architecture Visualization
            </p>
          </div>

          {/* Login Form */}
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>

          {/* Security notice */}
          <div className="mt-6 pt-6 border-t border-white/[0.04]">
            <p className="text-[10px] text-neutral-600 text-center">
              This system is restricted. Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
