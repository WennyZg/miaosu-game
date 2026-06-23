"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SentimentResult } from "@/types";
import { loadResult } from "@/hooks/useResultStore";
import NebulaTransition from "@/components/NebulaTransition";
import CatColony from "@/components/CatColony";

export default function ResultScene() {
  const router = useRouter();
  const [data, setData] = useState<SentimentResult | null>(null);
  const [phase, setPhase] = useState<"nebula" | "revealing" | "complete">(
    "nebula"
  );

  useEffect(() => {
    const result = loadResult();
    if (!result) {
      router.replace("/");
      return;
    }
    setData(result);
  }, [router]);

  const handleNebulaComplete = useCallback(() => {
    setPhase("revealing");
    // Transition to complete after cats finish entering
    setTimeout(() => setPhase("complete"), 1500);
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* Nebula overlay */}
      {phase === "nebula" && (
        <NebulaTransition onComplete={handleNebulaComplete} />
      )}

      {/* Content - visible during revealing and complete phases */}
      {phase !== "nebula" && (
        <div className="w-full max-w-3xl flex flex-col items-center animate-fade-slide-in">
          {/* Page title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wider drop-shadow-[0_2px_10px_rgba(139,92,246,0.4)]">
            你的情绪群落
          </h1>
          <p className="text-purple-300/50 text-sm mb-8 tracking-wider">
            每一只小猫，都是你情绪的一部分
          </p>

          {/* Cat Colony */}
          <CatColony cats={data.cats} />

          {/* Summary report */}
          {phase === "complete" && (
            <div className="w-full max-w-lg mt-10 animate-fade-slide-in">
              <div
                className="rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
                style={{
                  background: "rgba(15, 20, 50, 0.7)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.1)",
                }}
              >
                <p className="text-purple-200/50 text-xs tracking-wider mb-3">
                  情绪解读
                </p>
                <p className="text-purple-100/85 text-sm leading-relaxed whitespace-pre-line">
                  {data.summary}
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-col items-center gap-4 mt-8 mb-6">
                <Link
                  href="/healing"
                  className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wider text-white transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,85,247,0.7), rgba(236,72,153,0.6))",
                    boxShadow:
                      "0 0 25px rgba(168,85,247,0.35), 0 0 50px rgba(236,72,153,0.15)",
                  }}
                >
                  获取治愈
                </Link>
                <div className="flex gap-4">
                  <Link
                    href="/islands"
                    className="px-6 py-3 rounded-full text-sm font-bold tracking-wider text-purple-200/70 border border-purple-400/30 hover:border-purple-400/60 transition-all hover:scale-105"
                  >
                    再来一次
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-full text-sm font-bold tracking-wider text-purple-200/70 border border-purple-400/30 hover:border-purple-400/60 transition-all hover:scale-105"
                  >
                    回到首页
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
