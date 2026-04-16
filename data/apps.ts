import { AppData } from "@/types/app";

export const apps: AppData[] = [
  {
    id: "memory-palace",
    name: "기억의궁전",
    description: "장소기억법 배우기",
    meta: {
      minOS: "iOS 16.0+ / Android 8.0+",
      lastUpdated: "2026.03",
    },
    screenshots: [],
    downloads: [
      {
        platform: "ios",
        url: "https://apps.apple.com/us/app/%EA%B8%B0%EC%96%B5%EC%9D%98%EA%B6%81%EC%A0%84-%EB%87%8C%EB%AA%A8%EB%8B%89/id6758509388",
        label: "App Store",
      },
      {
        platform: "android",
        url: "https://play.google.com/store/apps/details?id=hungry.ex_frag&hl=ko",
        label: "Google Play",
      },
    ],
    planet: {
      colors: [
        "oklch(0.75 0.15 55)",
        "oklch(0.55 0.18 40)",
        "oklch(0.35 0.12 30)",
        "oklch(0.15 0.05 25)",
      ],
      size: 55,
      position: { x: "60%", y: "20%" },
      parallaxSpeed: 0.3,
      shadowColor: "oklch(0.55 0.18 40 / 0.2)",

      ring: {
        color: "oklch(0.6 0.1 45)",
        opacity: 0.35,
        tilt: 75,
        width: 1.6,
      },
    },
  },
  {
    id: "jeju-delivery",
    name: "제주택배비지원",
    description: "카메라로 찰칵하면 택배비 신청 완료",
    meta: {
      lastUpdated: "2026.02",
    },
    screenshots: [],
    downloads: [
      {
        platform: "web",
        url: "https://jeju.ninjaturtle.win/login",
        label: "바로 사용하기",
      },
    ],
    planet: {
      colors: [
        "oklch(0.70 0.12 220)",
        "oklch(0.50 0.15 210)",
        "oklch(0.30 0.10 200)",
        "oklch(0.12 0.05 195)",
      ],
      size: 45,
      position: { x: "15%", y: "25%" },
      parallaxSpeed: 0.25,
      shadowColor: "oklch(0.50 0.15 210 / 0.2)",

    },
  },
  {
    id: "yt-bulk-downloader",
    name: "YtBulkDownloader",
    description: "유튜브 채널 동영상 한번에 다운로더",
    meta: {
      minOS: "macOS 12+ / Windows 10+",
    },
    screenshots: [],
    downloads: [
      { platform: "macos", url: "https://github.com/sunpark20/YT-Chita/releases", label: "macOS 다운로드" },
      { platform: "windows", url: "https://github.com/sunpark20/YT-Chita/releases", label: "Windows 다운로드" },
    ],
    planet: {
      colors: [
        "oklch(0.72 0.13 140)",
        "oklch(0.50 0.16 130)",
        "oklch(0.30 0.10 120)",
        "oklch(0.12 0.05 115)",
      ],
      size: 50,
      position: { x: "65%", y: "15%" },
      parallaxSpeed: 0.28,
      shadowColor: "oklch(0.50 0.16 130 / 0.2)",

    },
  },
  {
    id: "spamcall070",
    name: "SpamCall070",
    description: "070 스팸 전화 차단",
    meta: {
      minOS: "iOS 16.0+",
    },
    screenshots: [],
    downloads: [
      { platform: "ios", url: null, label: "App Store" },
    ],
    planet: {
      colors: [
        "oklch(0.70 0.14 0)",
        "oklch(0.48 0.16 350)",
        "oklch(0.28 0.10 340)",
        "oklch(0.12 0.05 335)",
      ],
      size: 42,
      position: { x: "20%", y: "30%" },
      parallaxSpeed: 0.22,
      shadowColor: "oklch(0.48 0.16 350 / 0.2)",
    },
  },
];
