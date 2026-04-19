export type AppContent = {
  name: string | null;
  description: string | null;
  entries: string[];
};

import tmtData from "./tmt.json";

export const tmt: Record<string, AppContent> = tmtData;
