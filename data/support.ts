// 후원·사용 내역의 단일 원천. 실제 내역이 생기면 이 파일에만 추가한다.
// 금액은 원화 정수. 해외(Coffee) 후원은 usd에 달러 금액을 함께 적는다.

export type Donation = {
  date: string; // YYYY-MM-DD
  name: string;
  via: "Fairy" | "Coffee";
  amountKRW: number;
  usd?: number;
  message?: string;
};

export type LedgerEntry = {
  date: string; // YYYY-MM-DD
  item: string;
  category: string;
  amountKRW: number;
  receiptUrl?: string;
};

export const donations: Donation[] = [];
export const ledger: LedgerEntry[] = [];

// 후원 페이지 URL. 비어 있으면 서랍에서 해당 버튼을 숨긴다.
export const supportLinks: { fairy: string | null; coffee: string | null } = {
  fairy: null,
  coffee: null,
};

export function sumKRW(items: { amountKRW: number }[]) {
  return items.reduce((total, item) => total + item.amountKRW, 0);
}

export function formatKRW(value: number) {
  return `₩${Math.round(value).toLocaleString("ko-KR")}`;
}

export function monthlyTotals(items: Donation[]) {
  const months = new Map<string, { fairy: number; coffee: number }>();
  for (const item of items) {
    const key = item.date.slice(0, 7);
    const row = months.get(key) ?? { fairy: 0, coffee: 0 };
    if (item.via === "Fairy") row.fairy += item.amountKRW;
    else row.coffee += item.amountKRW;
    months.set(key, row);
  }
  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, row]) => ({ month, ...row }));
}

export function categoryTotals(items: LedgerEntry[]) {
  const totals = new Map<string, number>();
  for (const item of items) totals.set(item.category, (totals.get(item.category) ?? 0) + item.amountKRW);
  return [...totals.entries()].map(([name, amountKRW]) => ({ name, amountKRW }));
}
