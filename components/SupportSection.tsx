import { donations, formatKRW, sumKRW } from "@/data/support";
import type { HomeDictionary } from "@/i18n";

// 후원하기 서랍 안에서만 보이는 후원 현황. 메인 화면에는 두지 않는다.
export function SupportStatus({ dictionary, tabIndex }: { dictionary: HomeDictionary; tabIndex?: number }) {
  const t = dictionary.support;
  const history = [...donations].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section aria-label={t.title} className="h-status">
      <p className="h-drawer-label">{t.title}</p>
      {history.length === 0 ? (
        <p className="h-desc" tabIndex={tabIndex}>{t.empty}</p>
      ) : (
        <>
          <p className="h-desc">{t.total}: <strong>{formatKRW(sumKRW(donations))}</strong> · {t.countLine.replace("{count}", String(donations.length))}</p>
          <ul>
            {history.map((item) => (
              <li key={`${item.date}-${item.name}-${item.amountKRW}`}>
                <strong>{item.name}</strong> <span className="h-desc">· {item.date} · {item.via} · {formatKRW(item.amountKRW)}{item.message && ` · “${item.message}”`}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
