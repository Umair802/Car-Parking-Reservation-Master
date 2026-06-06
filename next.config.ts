import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["mongoose", "jsonwebtoken", "bcryptjs"],
};

export default nextConfig;
