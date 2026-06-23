import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-white">迷路的小猫</h1>
      <p className="mt-3 text-sm text-purple-200/70">
        这片星空里暂时没有你要找的页面。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-purple-300/30 px-6 py-3 text-sm font-bold text-purple-100 transition hover:border-purple-200/60"
      >
        回到首页
      </Link>
    </main>
  );
}
