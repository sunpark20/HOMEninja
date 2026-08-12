import type { AppStatus } from "./apps";

export type VillageTree = "mac" | "iphone";
export type LeafTone =
  | "apricot"
  | "honey"
  | "sage"
  | "berry"
  | "blue"
  | "rose"
  | "lavender"
  | "coral"
  | "teal";

export type VillageAppVisual = {
  tree: VillageTree;
  label: string;
  tone: LeafTone;
  tilt: number;
};

export type V5AppLayout = {
  tree: VillageTree;
  x: number;
  y: number;
  swayDuration: string;
  swayDelay: string;
  landingX: number;
  landingY: number;
  shortCopy: string;
};

/** Factual app fields stay in data/apps.generated.ts; this file is presentation-only. */
export const villageAppVisuals: Record<string, VillageAppVisual> = {
  "breaklock-timer": { tree: "mac", label: "BL", tone: "sage", tilt: -2 },
  callninja: { tree: "iphone", label: "CN", tone: "blue", tilt: 2 },
  centuryiris: { tree: "mac", label: "CI", tone: "apricot", tilt: -1 },
  earth: { tree: "iphone", label: "EA", tone: "teal", tilt: 2 },
  eatwater: { tree: "iphone", label: "WB", tone: "teal", tilt: -2 },
  gnomon: { tree: "mac", label: "GN", tone: "honey", tilt: 1 },
  "memory-palace": { tree: "iphone", label: "MP", tone: "lavender", tilt: -1 },
  snapcart: { tree: "iphone", label: "CK", tone: "rose", tilt: 2 },
  spamcall070: { tree: "iphone", label: "07", tone: "coral", tilt: -2 },
  "yt-bulk-downloader": { tree: "mac", label: "YT", tone: "berry", tilt: 1 },
};

/** Coordinates and copy translated from the supplied 앱마을 대문 v5 canvas. */
const v5AppLayoutEntries: Array<[string, V5AppLayout]> = [
  ["centuryiris", { tree: "mac", x: 96, y: 104, swayDuration: "5.2s", swayDelay: "-0.2s", landingX: 0, landingY: 470, shortCopy: "외장 모니터 밝기 자동 조절" }],
  ["gnomon", { tree: "mac", x: 238, y: 88, swayDuration: "4.6s", swayDelay: "-1.4s", landingX: 180, landingY: 470, shortCopy: "Century Iris의 형제 앱" }],
  ["breaklock-timer", { tree: "mac", x: 80, y: 232, swayDuration: "5.6s", swayDelay: "-2.6s", landingX: 60, landingY: 615, shortCopy: "쉬는 시간에 화면을 잠그는 타이머" }],
  ["yt-bulk-downloader", { tree: "mac", x: 228, y: 220, swayDuration: "4.9s", swayDelay: "-3.3s", landingX: 225, landingY: 615, shortCopy: "유튜브 다운로드" }],
  ["spamcall070", { tree: "iphone", x: 92, y: 100, swayDuration: "5.1s", swayDelay: "-0.6s", landingX: 80, landingY: 516, shortCopy: "스팸 전화 차단" }],
  ["callninja", { tree: "iphone", x: 236, y: 78, swayDuration: "4.4s", swayDelay: "-1.9s", landingX: 230, landingY: 516, shortCopy: "070의 형제 앱" }],
  ["snapcart", { tree: "iphone", x: 380, y: 104, swayDuration: "5.4s", swayDelay: "-3.1s", landingX: 380, landingY: 516, shortCopy: "장값 계산기" }],
  ["memory-palace", { tree: "iphone", x: 84, y: 238, swayDuration: "4.7s", swayDelay: "-2.2s", landingX: 150, landingY: 636, shortCopy: "장소기억법을 배우는 뇌모닉 앱" }],
  ["eatwater", { tree: "iphone", x: 236, y: 224, swayDuration: "6s", swayDelay: "-1.1s", landingX: 300, landingY: 636, shortCopy: "곧 출시" }],
  ["earth", { tree: "iphone", x: 382, y: 244, swayDuration: "5.8s", swayDelay: "-4.2s", landingX: 450, landingY: 636, shortCopy: "곧 출시" }],
];

export const v5AppLayouts = Object.fromEntries(v5AppLayoutEntries) as Record<string, V5AppLayout>;

export const retiredVillageApp = {
  id: "jeju-delivery",
  name: "제주택배비지원",
  description: "이제는 그루터기에서 조용히 쉬고 있어요.",
  status: "retired" as AppStatus,
};

export const residentAnimals = [
  { id: "owl", label: "부엉이", asset: "/village/owl.svg" },
  { id: "hedgehog", label: "고슴도치", asset: "/village/hedgehog.svg" },
  { id: "leopard", label: "표범", asset: "/village/leopard.svg" },
  { id: "rabbit", label: "토끼", asset: "/village/rabbit.svg" },
  { id: "sloth", label: "나무늘보", asset: "/village/sloth.svg" },
  { id: "monkey", label: "원숭이", asset: "/village/monkey.svg" },
  { id: "eagle", label: "독수리", asset: "/village/eagle.svg" },
  { id: "dove", label: "비둘기", asset: "/village/dove.svg" },
] as const;

export type ResidentAnimal = (typeof residentAnimals)[number]["id"];
