import { Island } from "@/types";

export const islands: Island[] = [
  {
    id: "wealth",
    name: "财富",
    icon: "💰",
    color: {
      primary: "#f59e0b",
      gradient: "from-amber-400 to-yellow-600",
      glow: "rgba(245, 158, 11, 0.4)",
      border: "border-amber-400/50",
    },
    description: "探索你与财富的关系",
    cards: [
      { id: "w1", image: "/cards/7.jpg" },
      { id: "w2", image: "/cards/16.jpg" },
      { id: "w3", image: "/cards/24.jpg" },
      { id: "w4", image: "/cards/34.jpg" },
    ],
  },
  {
    id: "love",
    name: "感情",
    icon: "💕",
    color: {
      primary: "#f43f5e",
      gradient: "from-rose-400 to-pink-600",
      glow: "rgba(244, 63, 94, 0.4)",
      border: "border-rose-400/50",
    },
    description: "倾听心灵深处的声音",
    cards: [
      { id: "l1", image: "/cards/12.jpg" },
      { id: "l2", image: "/cards/31.jpg" },
      { id: "l3", image: "/cards/58.jpg" },
      { id: "l4", image: "/cards/67.jpg" },
    ],
  },
  {
    id: "work",
    name: "工作",
    icon: "💼",
    color: {
      primary: "#06b6d4",
      gradient: "from-cyan-400 to-blue-600",
      glow: "rgba(6, 182, 212, 0.4)",
      border: "border-cyan-400/50",
    },
    description: "发现你的职业能量",
    cards: [
      { id: "k1", image: "/cards/2.jpg" },
      { id: "k2", image: "/cards/33.jpg" },
      { id: "k3", image: "/cards/56.jpg" },
      { id: "k4", image: "/cards/71.jpg" },
    ],
  },
  {
    id: "friends",
    name: "朋友",
    icon: "🤝",
    color: {
      primary: "#10b981",
      gradient: "from-emerald-400 to-teal-600",
      glow: "rgba(16, 185, 129, 0.4)",
      border: "border-emerald-400/50",
    },
    description: "感受友谊的温度",
    cards: [
      { id: "f1", image: "/cards/14.jpg" },
      { id: "f2", image: "/cards/27.jpg" },
      { id: "f3", image: "/cards/75.jpg" },
      { id: "f4", image: "/cards/76.jpg" },
    ],
  },
  {
    id: "future",
    name: "未来",
    icon: "🔮",
    color: {
      primary: "#8b5cf6",
      gradient: "from-violet-400 to-purple-600",
      glow: "rgba(139, 92, 246, 0.4)",
      border: "border-violet-400/50",
    },
    description: "窥见未知的可能性",
    cards: [
      { id: "u1", image: "/cards/4.jpg" },
      { id: "u2", image: "/cards/10.jpg" },
      { id: "u3", image: "/cards/23.jpg" },
      { id: "u4", image: "/cards/63.jpg" },
    ],
  },
];
