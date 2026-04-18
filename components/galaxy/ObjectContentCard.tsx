import type { AppMeta } from "@/types/app";

type Props = {
  title: string;
  description: string;
  meta?: AppMeta;
  comingSoon?: boolean;
  children?: React.ReactNode;
};

export default function ObjectContentCard({
  title,
  description,
  meta,
  comingSoon,
  children,
}: Props) {
  return (
    <div className="max-w-[480px]">
      {comingSoon && (
        <div
          className="inline-block mb-3 px-2.5 py-1 rounded-full text-[11px] tracking-[0.1em] uppercase font-[family-name:var(--font-body)]"
          style={{
            background: "oklch(1 0 0 / 0.06)",
            border: "1px solid oklch(1 0 0 / 0.12)",
            color: "oklch(0.65 0.01 260)",
          }}
        >
          Coming soon
        </div>
      )}
      <h2
        className="m-0 font-[family-name:var(--font-display)] font-semibold tracking-tight"
        style={{
          color: "oklch(0.95 0.005 260)",
          fontSize: "clamp(1.6rem, 3.6vw, 2.1rem)",
        }}
      >
        {title}
      </h2>
      <p
        className="mt-3 text-[17px] leading-relaxed"
        style={{ color: "oklch(0.75 0.01 260)" }}
      >
        {description}
      </p>
      {meta && (
        <div
          className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs"
          style={{ color: "oklch(0.45 0.01 260)" }}
        >
          {meta.minOS && <span>{meta.minOS}</span>}
          {meta.lastUpdated && <span>{meta.lastUpdated} 업데이트</span>}
        </div>
      )}
      {children}
    </div>
  );
}
