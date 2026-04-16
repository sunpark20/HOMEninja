import Image from "next/image";
import type { AppData } from "@/types/app";
import DownloadButtons from "./DownloadButtons";

export default function AppCard({ app }: { app: AppData }) {
  return (
    <div className="max-w-lg">
      <h2
        className="text-3xl sm:text-4xl font-semibold tracking-tight"
        style={{ color: "oklch(0.95 0.005 260)" }}
      >
        {app.name}
      </h2>
      <p
        className="mt-3 text-lg"
        style={{ color: "oklch(0.75 0.01 260)" }}
      >
        {app.description}
      </p>
      {app.meta && (
        <div
          className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs"
          style={{ color: "oklch(0.45 0.01 260)" }}
        >
          {app.meta.minOS && <span>{app.meta.minOS}</span>}
          {app.meta.lastUpdated && <span>{app.meta.lastUpdated} 업데이트</span>}
          {app.meta.version && <span>v{app.meta.version}</span>}
        </div>
      )}
      {app.screenshots.length > 0 && (
        <div className="mt-6 flex gap-4 overflow-x-auto">
          {app.screenshots.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`${app.name} 스크린샷 ${i + 1}`}
              width={300}
              height={256}
              className="rounded-lg max-h-64 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      )}
      <DownloadButtons downloads={app.downloads} />
    </div>
  );
}
