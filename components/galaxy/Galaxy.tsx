"use client";

import type {
  Galaxy as GalaxyType,
  PlanetObject,
  AsteroidObject,
  NebulaObject,
  BlackHoleObject,
  EditableAppObject,
} from "@/types/galaxy";
import type { AppContent } from "@/data/tmt";
import GalaxyBackground from "./GalaxyBackground";
import GalaxyIntro from "./GalaxyIntro";
import PlanetSection from "./PlanetSection";
import AsteroidSection from "./AsteroidSection";
import NebulaSection from "./NebulaSection";
import BlackHoleSection from "./BlackHoleSection";

type Props = {
  galaxy: GalaxyType;
  overlap: number;
  onOpenAsteroid: (obj: AsteroidObject) => void;
  onOpenApp?: (obj: EditableAppObject) => void;
  contentOverrides?: Record<string, AppContent>;
};

export default function Galaxy({
  galaxy,
  overlap,
  onOpenAsteroid,
  onOpenApp,
  contentOverrides,
}: Props) {
  return (
    <div className="relative">
      <GalaxyBackground bg={galaxy.bg} />
      <GalaxyIntro galaxy={galaxy} />
      {galaxy.objects.map((obj, i) => {
        if (galaxy.kind === "planets") {
          return (
            <PlanetSection
              key={obj.id}
              obj={obj as PlanetObject}
              index={i}
              overlap={overlap}
              onPlanetClick={onOpenApp}
              contentOverrides={contentOverrides}
            />
          );
        }
        if (galaxy.kind === "asteroids") {
          return (
            <AsteroidSection
              key={obj.id}
              obj={obj as AsteroidObject}
              index={i}
              overlap={overlap}
              onOpen={onOpenAsteroid}
            />
          );
        }
        if (galaxy.kind === "nebula") {
          return (
            <NebulaSection
              key={obj.id}
              obj={obj as NebulaObject}
              index={i}
              overlap={overlap}
            />
          );
        }
        if (galaxy.kind === "blackholes") {
          return (
            <BlackHoleSection
              key={obj.id}
              obj={obj as BlackHoleObject}
              index={i}
              overlap={overlap}
              onOpenApp={onOpenApp}
              contentOverrides={contentOverrides}
            />
          );
        }
        return null;
      })}
      <div style={{ height: "20vh" }} />
    </div>
  );
}
