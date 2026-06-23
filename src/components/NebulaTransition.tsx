"use client";

import { useEffect, useState } from "react";

export default function NebulaTransition({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"pulse" | "expand" | "done">("pulse");
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 1.5,
    }))
  );

  useEffect(() => {
    const pulseTimer = setTimeout(() => setPhase("expand"), 1500);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3000);
    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none ${
        phase === "pulse" ? "animate-nebula-pulse" : "animate-nebula-expand"
      }`}
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(88,28,135,0.85) 0%, rgba(15,23,42,0.95) 70%),
          radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(168,85,247,0.35) 0%, transparent 50%),
          radial-gradient(circle at 50% 30%, rgba(236,72,153,0.2) 0%, transparent 40%)
        `,
      }}
    >
      {/* Sparkle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--twinkle-duration": `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Hint text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="text-purple-200/70 text-lg tracking-[0.3em] animate-pulse"
          style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
        >
          星云正在为你解读...
        </p>
      </div>
    </div>
  );
}
