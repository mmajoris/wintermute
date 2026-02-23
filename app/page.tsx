import Link from "next/link";
import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-[#060609] text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full bg-indigo-500"
            style={{ boxShadow: "0 0 10px #6366f180" }}
          />
          <span className="text-sm font-semibold tracking-widest text-neutral-300">
            WINTERMUTE
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/explorer"
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Explorer
              </Link>
              <Link
                href="/live"
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Live View
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg transition-all"
            >
              Access System
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-neutral-400">System Online</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
              Neural Architecture
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Visualization
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Real-time visualization of cognitive architecture. 
            Explore brain regions, monitor active processes, 
            and observe the mind in motion.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/explorer"
                  className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-all duration-200 flex items-center gap-3"
                >
                  <span>Open Explorer</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/live"
                  className="px-8 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl font-medium transition-all duration-200 flex items-center gap-3"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Live View</span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-all duration-200 flex items-center gap-3"
              >
                <span>Access System</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Feature cards placeholder */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          <FeatureCard
            icon="🧠"
            title="3D Brain Explorer"
            description="Interactive visualization of 60+ brain regions mapped to computational modules"
          />
          <FeatureCard
            icon="⚡"
            title="Live Monitoring"
            description="Real-time activity visualization as cognitive processes execute"
          />
          <FeatureCard
            icon="📊"
            title="System Metrics"
            description="Queue depths, memory operations, emotional state, and budget tracking"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-xs text-neutral-700">
          Wintermute Neural Architecture Visualization System
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}
