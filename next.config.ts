import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "r3f-forcegraph", "three-forcegraph"],
};

export default nextConfig;
