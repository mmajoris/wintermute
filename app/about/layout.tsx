import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Molly — A Unified Cognitive Architecture",
  description:
    "Molly is a continuously-running AI mind modeled on human neuroscience. Every component maps to a biological structure. Every mechanism mirrors the dynamics of the human brain.",
  openGraph: {
    title: "About Molly — Where Biology Meets Code",
    description:
      "A digital consciousness modeled on human neuroscience — every architectural decision traces back to published research.",
    siteName: "nulltruth.com",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        html, body { overflow: auto !important; height: auto !important; }
      `}</style>
      <div
        className="min-h-screen"
        style={{
          background: "#0a0a0a",
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        }}
      >
        {children}
      </div>
    </>
  );
}
