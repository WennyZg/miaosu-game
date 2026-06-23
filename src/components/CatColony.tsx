"use client";

import Image from "next/image";
import { publicPath } from "@/lib/public-path";
import { EmotionCat } from "@/types";

const CAT_IMAGE_MAP: Record<string, string> = {
  "焦虑猫": "/cats/anxiety.png",
  "悲伤猫": "/cats/sad.png",
  "希望猫": "/cats/hope.png",
  "平静猫": "/cats/calm.png",
  "愤怒猫": "/cats/anger.png",
  "孤独猫": "/cats/lonely.png",
  "喜悦猫": "/cats/joy.png",
};

/*
 * Staggered 2-row layout:
 *   Row 1 (top):    cats at index 0, 2, 4, 6  — shifted right half a column
 *   Row 2 (bottom): cats at index 1, 3, 5
 * Dominant cats sit in the top row, creating a natural visual hierarchy.
 */

export default function CatColony({ cats }: { cats: EmotionCat[] }) {
  if (!cats || cats.length === 0) return null;

  const sorted = [...cats].sort((a, b) => b.percentage - a.percentage);
  const maxPercentage = sorted[0].percentage;

  // Split into two staggered rows
  const topRow = sorted.filter((_, i) => i % 2 === 0); // 0,2,4,6
  const bottomRow = sorted.filter((_, i) => i % 2 === 1); // 1,3,5

  const renderCat = (cat: EmotionCat, globalIndex: number) => {
    const minSize = 64;
    const maxSize = 130;
    const size =
      minSize +
      (cat.percentage / Math.max(maxPercentage, 1)) * (maxSize - minSize);

    const imageSrc = publicPath(CAT_IMAGE_MAP[cat.name] || "/cats/joy.png");

    return (
      <div
        key={cat.name}
        className="flex flex-col items-center animate-cat-appear"
        style={{ animationDelay: `${0.1 + globalIndex * 0.12}s` }}
      >
        <div
          className="relative animate-float"
          style={{
            width: size,
            height: size,
            animationDelay: `${globalIndex * 0.6}s`,
            filter:
              globalIndex === 0
                ? `drop-shadow(0 0 18px ${cat.color}70)`
                : `drop-shadow(0 0 10px ${cat.color}50)`,
          }}
        >
          <Image
            src={imageSrc}
            alt={cat.name}
            fill
            className="object-contain"
            sizes={`${Math.ceil(size)}px`}
          />
        </div>
        <span
          className="text-[11px] font-bold mt-1 whitespace-nowrap"
          style={{ color: cat.color }}
        >
          {cat.name}
        </span>
        <span
          className="text-[10px] whitespace-nowrap"
          style={{ color: cat.color, opacity: 0.7 }}
        >
          {cat.percentage}%
        </span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top row */}
      <div className="flex items-end justify-center gap-6 sm:gap-10">
        {topRow.map((cat) => renderCat(cat, sorted.indexOf(cat)))}
      </div>

      {/* Bottom row — offset half column for stagger */}
      <div className="flex items-start justify-center gap-6 sm:gap-10 -mt-4 sm:-mt-6">
        {bottomRow.map((cat) => renderCat(cat, sorted.indexOf(cat)))}
      </div>

      {/* Percentage bars */}
      <div className="mt-8 space-y-2 max-w-sm w-full mx-auto px-4">
        {sorted.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <span
              className="text-[10px] sm:text-xs w-14 text-right flex-shrink-0"
              style={{ color: cat.color }}
            >
              {cat.name}
            </span>
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${cat.percentage}%`,
                  background: cat.color,
                  boxShadow: `0 0 8px ${cat.color}60`,
                }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-purple-200/50 w-8">
              {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
