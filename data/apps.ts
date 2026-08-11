import type { DownloadLink, Platform } from "@/types/app";
import { generatedApps } from "./apps.generated";

export type AppStatus = "released" | "unreleased" | "retired";

export type AppRegistryEntry = {
  id: string;
  displayName: string;
  displayNameKo: string;
  taglineKo: string;
  platforms: Platform[];
  minOS: string;
  version: string;
  status: AppStatus;
  updatedAt: string | null;
  downloads: DownloadLink[];
  web: {
    privacy: string | null;
    support: string | null;
  };
  reporting: {
    template: string;
    locales: string[];
    url: string;
  };
};

export const apps = generatedApps;
export const appsByID = new Map(apps.map((app) => [app.id, app]));

export function appByID(id: string): AppRegistryEntry {
  const app = appsByID.get(id);
  if (!app) throw new Error(`Unknown public app id: ${id}`);
  return app;
}
