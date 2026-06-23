export interface Card {
  id: string;
  image: string;
}

export interface IslandColor {
  primary: string;
  gradient: string;
  glow: string;
  border: string;
}

export interface Island {
  id: string;
  name: string;
  icon: string;
  color: IslandColor;
  description: string;
  cards: Card[];
}

export interface EmotionCat {
  name: string;
  percentage: number;
  color: string;
  description?: string;
}

export interface SentimentResult {
  summary: string;
  cats: EmotionCat[];
}
