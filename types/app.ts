export type Platform = "ios" | "android" | "web" | "macos" | "windows";

export type DownloadLink = {
  platform: Platform;
  url: string | null;
  label: string;
};
