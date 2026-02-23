import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Wintermute — Neural Architecture Visualization",
  description:
    "Real-time visualization of cognitive architecture. Explore brain regions, monitor active processes, and observe the mind in motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
