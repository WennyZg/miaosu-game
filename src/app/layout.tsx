import type { Metadata } from "next";
import "./globals.css";
import StarrySky from "@/components/StarrySky";

export const metadata: Metadata = {
  title: "喵宿——瞄见你的情绪",
  description: "一场关于情绪的卡牌探索之旅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased" style={{ fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif" }}>
        <StarrySky />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
