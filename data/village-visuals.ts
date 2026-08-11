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
