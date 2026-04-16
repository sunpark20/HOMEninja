export type Platform = "ios" | "android" | "web" | "macos" | "windows";

export type RingStyle = {
  color: string;
  opacity: number;
  tilt: number; // rotateX 각도 (deg)
  width: number; // 행성 대비 비율 (1.4 = 140%)
};

export type PlanetStyle = {
  colors: string[];
  size: number;
  position: { x: string; y: string };
  parallaxSpeed: number;
  shadowColor: string;
  ring?: RingStyle; // 고리
};

export type DownloadLink = {
  platform: Platform;
  url: string | null;
  label: string;
};

export type AppMeta = {
  minOS?: string;
  lastUpdated?: string;
  version?: string;
};

export type AppData = {
  id: string;
  name: string;
  description: string;
  meta?: AppMeta;
  screenshots: string[];
  downloads: DownloadLink[];
  planet: PlanetStyle;
};
