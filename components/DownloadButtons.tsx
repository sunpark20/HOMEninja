"use client";

import { useEffect, useState } from "react";
import type { DownloadLink, Platform } from "@/types/app";

type DetectedPlatform = "ios" | "android" | "macos" | "windows" | "unknown";

function detectPlatform(): DetectedPlatform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  if (/Macintosh|Mac OS X/.test(ua)) return "macos";
  if (/Windows/.test(ua)) return "windows";
  return "unknown";
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "ios") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (platform === "android") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24C14.86 8.32 13.47 8 12 8s-2.86.32-4.47.91L5.65 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
      </svg>
    );
  }
  if (platform === "macos") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (platform === "windows") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3 12V6.75l6-1.32v6.48L3 12zm6.98.09l.02 6.63-6.98-1.01V12.1l6.96-.01zM10 5.15L21 3v8.95l-11 .04V5.15zm0 13.72l11 1.59V12.01l-11-.04v6.9z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-5 h-5"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

export default function DownloadButtons({
  downloads,
}: {
  downloads: DownloadLink[];
}) {
  const [platform, setPlatform] = useState<DetectedPlatform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const sorted = [...downloads].sort((a, b) => {
    if (a.platform === platform) return -1;
    if (b.platform === platform) return 1;
    return 0;
  });

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {sorted.map((dl) => {
        const isPrimary = platform !== "unknown" && dl.platform === platform;

        if (!dl.url) {
          return (
            <span
              key={dl.platform}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm opacity-40 cursor-default"
              style={{
                border: "1px solid oklch(0.3 0.01 260)",
                color: "oklch(0.55 0.01 260)",
              }}
            >
              <PlatformIcon platform={dl.platform} />
              준비 중
            </span>
          );
        }

        return (
          <a
            key={dl.platform}
            href={dl.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm transition-all duration-300 ${
              isPrimary
                ? "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                : "border border-white/10 text-white/70 hover:text-white hover:border-white/20"
            }`}
          >
            <PlatformIcon platform={dl.platform} />
            {dl.label}
          </a>
        );
      })}
    </div>
  );
}
