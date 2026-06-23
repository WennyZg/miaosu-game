export function publicPath(assetPath: string) {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const runtimeBasePath =
    typeof window !== "undefined" && window.location.pathname.startsWith("/miao-su")
      ? "/miao-su"
      : "";
  const basePath = (configuredBasePath || runtimeBasePath).replace(/\/$/, "");
  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${basePath}${normalizedPath}`;
}
