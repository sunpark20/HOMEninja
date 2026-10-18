export type Platform = "ios" | "android" | "web" | "macos" | "windows";

export type DownloadLink = {
  platform: Platform;
  distribution: "store" | "direct" | "web";
  url: string | null;
  label: string;
};
