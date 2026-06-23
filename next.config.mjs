/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? "/miao-su" : "");

const nextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages && basePath ? basePath : undefined,
  assetPrefix: isGithubPages && basePath ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
