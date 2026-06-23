import type { SentimentResult } from "@/types";

type EmotionKey =
  | "anxiety"
  | "sadness"
  | "hope"
  | "calm"
  | "anger"
  | "lonely"
  | "joy";

type EmotionCat = {
  key: EmotionKey;
  name: string;
  color: string;
  description: string;
};

const EMOTION_CATS: EmotionCat[] = [
  {
    key: "anxiety",
    name: "焦虑猫",
    color: "#f97316",
    description: "耳朵后压，尾巴快速摆动，身体微微蜷缩",
  },
  {
    key: "sadness",
    name: "悲伤猫",
    color: "#3b82f6",
    description: "耳朵下垂，尾巴无力拖地，眼睛湿润",
  },
  {
    key: "hope",
    name: "希望猫",
    color: "#fbbf24",
    description: "耳朵竖立向前，尾巴竖直，眼睛发亮",
  },
  {
    key: "calm",
    name: "平静猫",
    color: "#a78bfa",
    description: "身体放松，眼睛微眯，发出呼噜声",
  },
  {
    key: "anger",
    name: "愤怒猫",
    color: "#ef4444",
    description: "背部微弓，毛发轻轻炸开，瞳孔缩小",
  },
  {
    key: "lonely",
    name: "孤独猫",
    color: "#6b7280",
    description: "蜷缩成一小团，远离其他小猫",
  },
  {
    key: "joy",
    name: "喜悦猫",
    color: "#10b981",
    description: "身体舒展，尾巴上翘，眼睛弯成月牙",
  },
];

const KEYWORDS: Record<EmotionKey, string[]> = {
  anxiety: [
    "担心",
    "焦虑",
    "紧张",
    "不安",
    "压力",
    "害怕",
    "恐惧",
    "忐忑",
    "慌",
    "怕",
    "烦躁",
    "不确定",
    "迷茫",
    "惶恐",
  ],
  sadness: [
    "难过",
    "悲伤",
    "伤心",
    "哭",
    "失落",
    "遗憾",
    "心痛",
    "委屈",
    "忧伤",
    "沮丧",
    "低落",
    "痛苦",
    "想念",
    "怀念",
  ],
  hope: [
    "希望",
    "期待",
    "盼望",
    "未来",
    "光明",
    "梦想",
    "向往",
    "憧憬",
    "勇敢",
    "追求",
    "相信",
    "坚持",
    "力量",
    "前方",
  ],
  calm: [
    "平静",
    "安宁",
    "舒服",
    "放松",
    "安心",
    "从容",
    "淡然",
    "宁静",
    "祥和",
    "满足",
    "自在",
    "惬意",
    "温和",
    "轻松",
  ],
  anger: [
    "愤怒",
    "生气",
    "不满",
    "恨",
    "讨厌",
    "烦",
    "气愤",
    "愤恨",
    "不公",
    "挫折",
    "郁闷",
    "厌恶",
    "崩溃",
  ],
  lonely: [
    "孤独",
    "寂寞",
    "一个人",
    "独自",
    "疏远",
    "隔阂",
    "冷清",
    "无人",
    "空虚",
    "落寞",
    "形单影只",
  ],
  joy: [
    "开心",
    "快乐",
    "高兴",
    "幸福",
    "喜悦",
    "欢喜",
    "愉快",
    "满足",
    "美好",
    "温暖",
    "感动",
    "欣慰",
    "感恩",
    "甜蜜",
    "欢乐",
    "兴奋",
    "笑",
    "跳舞",
    "拥抱",
  ],
};

const INTRO: Record<EmotionKey, string> = {
  anxiety:
    "你的内心正被一些不确定感轻轻包围，像一只耳朵后压、尾巴快速摆动的小猫。它不是来吓你的，而是在提醒你：你正在认真对待眼前的事情。",
  sadness:
    "你的文字里流动着柔软的悲伤，像一只安静坐在角落的小猫。也许有些感受还没有被好好接住，所以它们选择用这种方式出现。",
  hope:
    "你的心里有一束亮光，像一只竖起耳朵望向远方的小猫。即使周围还有雾气，你依然能看见值得期待的方向。",
  calm:
    "你的内心此刻像一只慢慢呼噜的小猫，安稳、从容，也愿意和当下好好相处。这份平静是一种很珍贵的力量。",
  anger:
    "你的情绪里有一团火，像一只弓起背脊、认真保护自己的小猫。它背后往往藏着对边界、尊重或公平的需要。",
  lonely:
    "你的文字里有一份安静的距离感，像一只蜷在角落、渴望被理解的小猫。孤独不说明你不够好，它只说明你正在需要连接。",
  joy:
    "你的心里洋溢着明亮的快乐，像一只尾巴上翘、眼睛弯成月牙的小猫。这份愉悦正在温柔地点亮你看见的世界。",
};

const SUGGESTIONS: Record<EmotionKey, string> = {
  anxiety:
    "可以试着把让你担心的事情写下来，再在旁边写一个“我现在能做的小步骤”。当焦虑被具体化，它通常会变得没那么庞大。",
  sadness:
    "允许自己慢一点。听一首柔软的歌，喝一点温水，或者给自己留出几分钟什么都不做，悲伤会在被允许之后慢慢流动。",
  hope:
    "把你期待的事情写成一个很小的目标，然后迈出第一步。希望最适合被轻轻照料，它会在行动里长大。",
  calm:
    "好好享受这份平静。可以读几页喜欢的书，或者只是坐一会儿，让身体记住这种安稳的感觉。",
  anger:
    "愤怒需要一个安全出口。写下来、走一走、做几次深呼吸，先让身体降温，再决定要不要表达和如何表达。",
  lonely:
    "可以给一个信任的人发一句简单的问候。哪怕只是很小的连接，也能让心里的房间亮一点。",
  joy:
    "把今天让你开心的画面记下来。未来某个低落的时刻，它会成为你送给自己的温暖礼物。",
};

function scoreText(text: string): Record<EmotionKey, number> {
  const scores: Record<EmotionKey, number> = {
    anxiety: 8,
    sadness: 7,
    hope: 9,
    calm: 12,
    anger: 5,
    lonely: 6,
    joy: 10,
  };

  for (const cat of EMOTION_CATS) {
    for (const keyword of KEYWORDS[cat.key]) {
      if (text.includes(keyword)) {
        scores[cat.key] += keyword.length >= 2 ? 24 : 14;
      }
    }
  }

  if (/[!！]{1,}/.test(text)) {
    scores.joy += 4;
    scores.anger += 3;
  }

  if (/[?？]{1,}/.test(text)) {
    scores.anxiety += 6;
    scores.hope += 2;
  }

  if (text.length <= 10) {
    scores.calm += 4;
  }

  return scores;
}

function normalizeScores(scores: Record<EmotionKey, number>) {
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const percentages = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [
      key,
      Math.max(1, Math.round((value / total) * 100)),
    ]),
  ) as Record<EmotionKey, number>;

  const sum = Object.values(percentages).reduce((a, b) => a + b, 0);
  if (sum !== 100) {
    const dominantKey = Object.entries(percentages).sort(
      (a, b) => b[1] - a[1],
    )[0][0] as EmotionKey;
    percentages[dominantKey] += 100 - sum;
  }

  return EMOTION_CATS.map((cat) => ({
    name: cat.name,
    percentage: percentages[cat.key],
    color: cat.color,
    description: cat.description,
    key: cat.key,
  })).sort((a, b) => b.percentage - a.percentage);
}

function generateReport(
  text: string,
  cats: Array<{
    name: string;
    percentage: number;
    key: EmotionKey;
  }>,
) {
  const dominant = cats[0];
  const secondary = cats[1];
  const positive = cats
    .filter((cat) => ["joy", "hope", "calm"].includes(cat.key))
    .reduce((sum, cat) => sum + cat.percentage, 0);

  let report = INTRO[dominant.key];

  report += `\n\n在你的情绪群落里，${dominant.name.replace("猫", "")}占据了最明显的位置（${dominant.percentage}%）`;
  if (secondary && secondary.percentage >= 10) {
    report += `，旁边还站着${secondary.name.replace("猫", "")}（${secondary.percentage}%）`;
  }
  report += "。这些情绪并不是彼此冲突的，它们更像一群性格不同的小猫，一起把你此刻的心情拼成完整的图景。";

  report += "\n\n";
  if (positive >= 65) {
    report +=
      "整体来看，你的情绪能量偏明亮，内心有比较充足的积极力量。即使偶尔有细小的不安，也没有盖过那份温暖和流动感。";
  } else if (positive >= 45) {
    report +=
      "整体来看，你的情绪处在一种光影交织的状态：既有积极的部分，也有需要被看见的柔软角落。这种真实感本身就很珍贵。";
  } else {
    report +=
      "整体来看，你现在可能承受着一些偏沉的感受。请记得，情绪出现不是为了否定你，而是在提醒你照顾某个被忽略的需要。";
  }

  report += `\n\n${SUGGESTIONS[dominant.key]}`;

  if (text.length > 0) {
    report += "\n\n谢谢你把这段感受交给小猫们。被表达出来的心情，已经开始被温柔地照看了。";
  }

  return report;
}

export function analyzeText(text: string): SentimentResult {
  const userText = text.trim().slice(0, 200);
  const cats = normalizeScores(scoreText(userText));
  const summary = generateReport(userText, cats);

  return {
    summary,
    cats: cats.map((cat) => ({
      name: cat.name,
      percentage: cat.percentage,
      color: cat.color,
      description: cat.description,
    })),
  };
}
