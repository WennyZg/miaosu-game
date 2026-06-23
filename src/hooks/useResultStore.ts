import { SentimentResult } from "@/types";

const STORAGE_KEY = "miao-su-emotion-result";

export function saveResult(data: SentimentResult): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadResult(): SentimentResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SentimentResult;
  } catch {
    return null;
  }
}

export function clearResult(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
