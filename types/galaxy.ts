import type { PlanetStyle, DownloadLink, AppMeta } from "./app";

export type GradientConfig = {
  color: string;
  x: string;
  y: string;
  size: number;
};

export type GalaxyBackground = {
  gradients: GradientConfig[];
  starDensity: number;
  gasBands?: boolean;
  dust?: boolean;
};

export type PlanetObject = {
  id: string;
  name: string;
  description: string;
  meta?: AppMeta;
  downloads: DownloadLink[];
  planet: PlanetStyle;
  comingSoon?: boolean;
};

export type AsteroidObject = {
  id: string;
  name: string;
  hint: string;
  size: number;
  position: { x: string; y: string };
  rotate: number;
  tilt: number;
};

export type NebulaObject = {
  id: string;
  name: string;
  hint: string;
  size: number;
  position: { x: string; y: string };
  hue: number;
};

export type GalaxyKind = "planets" | "asteroids" | "nebula";

export type Galaxy = {
  id: string;
  name: string;
  nameKo: string;
  subtitle: string;
  kind: GalaxyKind;
  accent: string;
  bg: GalaxyBackground;
  objects: (PlanetObject | AsteroidObject | NebulaObject)[];
};
