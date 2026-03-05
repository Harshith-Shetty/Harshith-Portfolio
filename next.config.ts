import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile aws-amplify and related packages for Next.js App Router SSR
  transpilePackages: ["aws-amplify", "@aws-amplify/ui-react"],
};

export default nextConfig;
