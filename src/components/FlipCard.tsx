"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, IslandColor } from "@/types";
import { analyzeText } from "@/lib/analyze";
import { publicPath } from "@/lib/public-path";
import { saveResult } from "@/hooks/useResultStore";

export default function FlipCard({
  card,
  color,
  onSelect,
}: {
  card: Card;
  color: IslandColor;
  onSelect: (card: Card) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-perspective w-full cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      onClick={() => {
        if (!flipped) {
          setFlipped(true);
          onSelect(card);
        }
      }}
    >
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div
          className="card-face card-back overflow-hidden"
          style={{
            border: `2px solid ${color.primary}40`,
            boxShadow: `0 0 15px ${color.glow}`,
          }}
        >
          <Image
            src={publicPath("/cards/back.png")}
            alt="卡牌背面"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          />
        </div>

        <div
          className="card-face card-front overflow-hidden"
          style={{
            border: `2px solid ${color.primary}60`,
            boxShadow: `0 0 20px ${color.glow}`,
          }}
        >
          <Image
            src={publicPath(card.image)}
            alt="卡牌"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          />
        </div>
      </div>
    </div>
  );
}

export function SentimentPanel({
  selectedCard,
  color,
}: {
  selectedCard: Card | null;
  color: IslandColor;
}) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");

    try {
      const data = analyzeText(text);
      saveResult(data);
      router.push("/result");
    } catch (err) {
      console.error("Local emotion analysis failed:", err);
      setError("情绪分析暂时失败，请重新试一次");
      setLoading(false);
    }
  };

  if (!selectedCard) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-8 animate-fade-slide-in">
      <div
        className="rounded-2xl p-5 sm:p-6 backdrop-blur-sm"
        style={{
          background: "rgba(15, 20, 50, 0.7)",
          border: `1px solid ${color.primary}30`,
          boxShadow: `0 0 30px ${color.glow}`,
        }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 relative"
            style={{ border: `2px solid ${color.primary}50` }}
          >
            <Image
              src={publicPath(selectedCard.image)}
              alt="选中的卡牌"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <p className="text-purple-200/70 text-sm mb-1">你选中了这张卡牌</p>
            <p className="text-purple-100/90 text-sm">
              请描述你看到这张图片时的感受，或者你联想到的故事...
            </p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="写下你的感受..."
          maxLength={200}
          className="w-full h-28 rounded-xl px-4 py-3 text-sm text-white/90 placeholder-purple-300/30 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border"
          style={{
            background: "rgba(20, 25, 60, 0.8)",
            borderColor: `${color.primary}30`,
          }}
        />
        <div className="flex items-center justify-between mt-2 mb-4">
          <span className="text-xs text-purple-300/40">{text.length}/200</span>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="w-full py-3 rounded-xl text-white font-bold tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${color.primary}, ${color.primary}cc)`,
            boxShadow: text.trim() ? `0 0 20px ${color.glow}` : "none",
          }}
        >
          {loading ? "分析中..." : "分析我的情绪"}
        </button>

        {error && (
          <p className="mt-3 text-red-400/80 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
