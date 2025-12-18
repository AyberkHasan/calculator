export type HistoryItem = {
    id: string;
    expr: string;
    result: string;
    at: number;
  };
  
  const KEY = "calculator_history";
  
  export function loadHistory(): HistoryItem[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  
  export function saveHistory(items: HistoryItem[]) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }
  
  export function uid() {
    return Math.random().toString(16).slice(2);
  }
  