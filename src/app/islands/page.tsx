import Link from "next/link";
import { islands } from "@/data/islands";
import IslandNode from "@/components/IslandNode";

export default function IslandsPage() {
  const wealth = islands.find((i) => i.id === "wealth")!;
  const love = islands.find((i) => i.id === "love")!;
  const work = islands.find((i) => i.id === "work")!;
  const friends = islands.find((i) => i.id === "friends")!;
  const future = islands.find((i) => i.id === "future")!;

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-6 animate-fade-slide-in">
      {/* Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4">
        <Link
          href="/"
          className="text-purple-300/70 hover:text-purple-200 transition-colors text-sm flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.5 13l-5-5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          返回
        </Link>
        <h2 className="text-lg sm:text-xl text-purple-200/80 tracking-wider">
          选择你的探索之岛
        </h2>
        <div className="w-12" />
      </div>

      {/* Desktop layout: matches reference image */}
      <div className="hidden md:flex flex-1 items-center justify-center w-full max-w-5xl">
        <div className="relative w-full" style={{ height: "600px" }}>
          {/* Top row: Work (left) + Future (right) */}
          <div className="absolute" style={{ left: "18%", top: "0%" }}>
            <IslandNode island={work} delay={0} />
          </div>
          <div className="absolute" style={{ right: "15%", top: "0%" }}>
            <IslandNode island={future} delay={0.8} />
          </div>

          {/* Middle row: Wealth (left) + Love (center) + Friends (right) */}
          <div className="absolute" style={{ left: "2%", top: "42%" }}>
            <IslandNode island={wealth} delay={0.4} />
          </div>
          <div className="absolute" style={{ left: "50%", top: "48%", transform: "translateX(-50%)" }}>
            <IslandNode island={love} delay={1.2} />
          </div>
          <div className="absolute" style={{ right: "2%", top: "38%" }}>
            <IslandNode island={friends} delay={1.6} />
          </div>
        </div>
      </div>

      {/* Mobile layout: 2-column grid with love centered */}
      <div className="md:hidden flex flex-col items-center gap-6 mt-4">
        {/* Top row: Work + Future */}
        <div className="flex gap-4 justify-center">
          <IslandNode island={work} delay={0} />
          <IslandNode island={future} delay={0.4} />
        </div>
        {/* Middle row: Wealth + Friends */}
        <div className="flex gap-4 justify-center">
          <IslandNode island={wealth} delay={0.8} />
          <IslandNode island={friends} delay={1.2} />
        </div>
        {/* Bottom: Love centered */}
        <div className="flex justify-center">
          <IslandNode island={love} delay={1.6} />
        </div>
      </div>

      {/* Bottom hint */}
      <p className="mt-6 mb-4 text-sm text-purple-300/40 tracking-wider">
        点击小岛，开启你的卡牌之旅
      </p>
    </main>
  );
}
