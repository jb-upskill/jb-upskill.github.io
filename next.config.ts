import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  output: "export",
 
  // Removed: rewrites() proxying PostHog ingestion — rewrites() isn't
  // supported in static export either (it needs a live server). Point
  // posthog-js directly at PostHog's cloud ingestion host instead:
  //   posthog.init(key, { api_host: "https://us.i.posthog.com" })
  // (or "https://us-assets.i.posthog.com" for the static asset host, per
  // the posthog-js docs). Some events may get dropped by ad blockers
  // without the proxy — acceptable for this prototype.
 
  images: {
    unoptimized: true, // next/image's default loader doesn't work in static export
  },
 
  skipTrailingSlashRedirect: true,
};
 
export default nextConfig;
 