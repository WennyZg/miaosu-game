import Link from "next/link";
import Image from "next/image";
import { publicPath } from "@/lib/public-path";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-end min-h-screen px-6 text-center animate-fade-slide-in">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={publicPath("/home-bg.png")}
          alt="喵宿背景"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center pb-20 sm:pb-24">
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-white"
          style={{
            textShadow:
              "0 0 10px rgba(255,255,255,0.6), 0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.3)",
          }}
        >
          喵宿
        </h1>
        <p
          className="text-lg sm:text-xl text-white/90 mb-10 tracking-widest"
          style={{
            textShadow:
              "0 0 8px rgba(255,255,255,0.5), 0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(139,92,246,0.2)",
          }}
        >
          —— 瞄见你的情绪 ——
        </p>

        {/* Start button */}
        <Link
          href="/islands"
          className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xl font-bold tracking-wider animate-pulse-glow hover:scale-105 transition-transform duration-300"
        >
          <span className="relative z-10">开始游戏</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
        </Link>
      </div>

      {/* Bottom decorative text */}
      <p className="relative z-10 pb-6 text-sm text-purple-300/40 tracking-wider">
        轻触星光，探索内心
      </p>
    </main>
  );
}
