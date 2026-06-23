"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Island } from "@/types";
import FlipCard, { SentimentPanel } from "@/components/FlipCard";

export default function IslandCardClient({ island }: { island: Island }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-8 animate-fade-slide-in">
      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <Link
          href="/islands"
          className="text-purple-300/70 hover:text-purple-200 transition-colors text-sm flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M10.5 13l-5-5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          返回
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{island.icon}</span>
          <h2
            className="text-xl sm:text-2xl font-bold tracking-wider"
            style={{ color: island.color.primary }}
          >
            {island.name}之岛
          </h2>
        </div>
        <div className="w-12" />
      </div>

      <p className="text-purple-200/60 text-sm mb-8 tracking-wider">
        {island.description}
      </p>

      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        {island.cards.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            color={island.color}
            onSelect={setSelectedCard}
          />
        ))}
      </div>

      <SentimentPanel selectedCard={selectedCard} color={island.color} />

      {!selectedCard && (
        <p className="mt-10 mb-4 text-sm text-purple-300/40 tracking-wider">
          点击卡牌，看看它唤起了你怎样的情绪
        </p>
      )}
    </main>
  );
}
