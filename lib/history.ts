import { HistoryItem } from '@/types';

const HISTORY_KEY = 'todaymeal-history';
const MAX_HISTORY = 30;

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistory(item: Omit<HistoryItem, 'id' | 'date'>): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  const updated = [newItem, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getRecentFoodIds(days = 1): string[] {
  const history = getHistory();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return history
    .filter((item) => new Date(item.date).getTime() > cutoff)
    .map((item) => item.foodId);
}
