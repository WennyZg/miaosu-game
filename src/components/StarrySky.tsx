"use client";

import { useState, useEffect } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function StarrySky() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStarKey, setShootingStarKey] = useState(0);
  const [shootingStarPos, setShootingStarPos] = useState({ x: 80, y: 10 });

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    const result: Star[] = [];
    for (let i = 0; i < 70; i++) {
      result.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      });
    }
    setStars(result);
  }, []);

  useEffect(() => {
    const spawnShootingStar = () => {
      setShootingStarPos({
        x: Math.random() * 60 + 30,
        y: Math.random() * 30 + 5,
      });
      setShootingStarKey((k) => k + 1);
    };

    const interval = setInterval(() => {
      spawnShootingStar();
    }, Math.random() * 3000 + 4000);

    const timeout = setTimeout(spawnShootingStar, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 starry-bg overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--twinkle-duration": `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            willChange: "opacity",
          } as React.CSSProperties}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-16 moon animate-moon-glow" />

      {/* Shooting star */}
      <div
        key={shootingStarKey}
        className="shooting-star animate-shooting-star"
        style={{
          left: `${shootingStarPos.x}%`,
          top: `${shootingStarPos.y}%`,
        }}
      />
    </div>
  );
}
