import type { AppMeta } from "@/types/app";

type Props = {
  title: string;
  description: string;
  meta?: AppMeta;
  comingSoon?: boolean;
  macOnly?: boolean;
  children?: React.ReactNode;
};

export default function ObjectContentCard({
  title,
  description,
  meta,
  comingSoon,
  macOnly,
  children,
}: Props) {
  return (
    <div className="max-w-[480px]">
      {macOnly && (
        <div
          className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-[11px] tracking-[0.08em] uppercase font-[family-name:var(--font-body)]"
          style={{
            background: "oklch(0.25 0.04 220 / 0.5)",
            border: "1px solid oklch(0.45 0.06 220 / 0.4)",
            color: "oklch(0.72 0.06 220)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          macOS only
        </div>
      )}
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
