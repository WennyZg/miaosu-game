"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmotionCat } from "@/types";
import { loadResult } from "@/hooks/useResultStore";
import { CAT_IMAGE_MAP, HEALING_DATA } from "@/lib/healing-data";
import { publicPath } from "@/lib/public-path";

export default function HealingScene() {
  const router = useRouter();
  const [cat, setCat] = useState<EmotionCat | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const result = loadResult();
    if (!result || !result.cats.length) {
      router.replace("/");
      return;
    }
    // Find dominant cat
    const dominant = [...result.cats].sort(
      (a, b) => b.percentage - a.percentage
    )[0];
    setCat(dominant);

    // Staggered reveal
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 900);
    const t3 = setTimeout(() => setStage(3), 1800);
    const t4 = setTimeout(() => setStage(4), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [router]);

  if (!cat) return null;

  const data = HEALING_DATA[cat.name];
  const imageSrc = publicPath(CAT_IMAGE_MAP[cat.name] || "/cats/joy.png");

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16">
      {/* Cat image */}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div
          className="relative w-44 h-44 sm:w-56 sm:h-56 animate-float"
          style={{
            filter: `drop-shadow(0 0 25px ${cat.color}60) drop-shadow(0 0 50px ${cat.color}30)`,
          }}
        >
          <Image
            src={imageSrc}
            alt={cat.name}
            fill
            className="object-contain"
            sizes="224px"
            priority
          />
        </div>
      </div>

      {/* Cat name title */}
      <div
        className="mt-6 text-center transition-all duration-600 ease-out"
        style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-wider"
          style={{
            color: cat.color,
            textShadow: `0 0 20px ${cat.color}50`,
          }}
        >
          {cat.name}陪伴着你
        </h1>
        <p className="text-purple-300/50 text-sm mt-2 tracking-wider">
          占据了你 {cat.percentage}% 的情绪空间
        </p>
      </div>

      {/* Healing words */}
      <div
        className="w-full max-w-lg mt-8 transition-all duration-700 ease-out"
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div
          className="rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
          style={{
            background: "rgba(15, 20, 50, 0.7)",
            border: `1px solid ${cat.color}25`,
            boxShadow: `0 0 30px ${cat.color}10`,
          }}
        >
          <p
            className="text-xs tracking-wider mb-3"
            style={{ color: cat.color, opacity: 0.6 }}
          >
            治愈话语
          </p>
          <p className="text-purple-100/85 text-sm sm:text-base leading-relaxed">
            {data.healing}
          </p>
        </div>
      </div>

      {/* Suggestion */}
      <div
        className="w-full max-w-lg mt-5 transition-all duration-700 ease-out"
        style={{
          opacity: stage >= 4 ? 1 : 0,
          transform: stage >= 4 ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div
          className="rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
          style={{
            background: "rgba(15, 20, 50, 0.5)",
            border: `1px solid ${cat.color}20`,
          }}
        >
          <p
            className="text-xs tracking-wider mb-3"
            style={{ color: cat.color, opacity: 0.6 }}
          >
            试试看
          </p>
          <p className="text-purple-100/80 text-sm leading-relaxed">
            {data.suggestion}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center mt-10 mb-6">
          <Link
            href="/islands"
            className="px-6 py-3 rounded-full text-sm font-bold tracking-wider text-white transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${cat.color}99, ${cat.color}66)`,
              boxShadow: `0 0 20px ${cat.color}30`,
            }}
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
  );
}
