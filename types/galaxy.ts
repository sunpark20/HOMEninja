import type { PlanetStyle, DownloadLink, AppMeta, MoonLink } from "./app";

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
  dustHaze?: boolean;
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
  retired?: boolean;
  retiredLabel?: string;
  retiredImage?: string;
  macOnly?: boolean;
  bgrawUrl?: string;
  moons?: MoonLink[];
};

export type AsteroidObject = {
  id: string;
  name: string;
  hint: string;
  description?: string;
  meta?: AppMeta;
  downloads?: DownloadLink[];
  bgrawUrl?: string;
  moons?: MoonLink[];
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

export type BlackHoleObject = {
  id: string;
  name: string;
  description: string;
  meta?: AppMeta;
  downloads: DownloadLink[];
  size: number;
  position: { x: string; y: string };
  rotate: number;
  debrisType?: "satellite" | "booster" | "panel" | "ship" | "capsule";
  retired?: boolean;
  retiredLabel?: string;
  retiredImage?: string;
  bgrawUrl?: string;
  moons?: MoonLink[];
};

export type EditableAppObject = {
  id: string;
  name: string;
  description: string;
};

export type AppObject = PlanetObject | AsteroidObject | BlackHoleObject;

export type GalaxyKind = "planets" | "asteroids" | "nebula" | "blackholes";

export type Galaxy = {
  id: string;
  name: string;
  nameKo: string;
  subtitle: string;
  kind: GalaxyKind;
  accent: string;
  bg: GalaxyBackground;
  objects: (PlanetObject | AsteroidObject | NebulaObject | BlackHoleObject)[];
};
