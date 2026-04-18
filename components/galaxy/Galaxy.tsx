"use client";

import type {
  Galaxy as GalaxyType,
  PlanetObject,
  AsteroidObject,
  NebulaObject,
} from "@/types/galaxy";
import GalaxyBackground from "./GalaxyBackground";
import GalaxyIntro from "./GalaxyIntro";
import PlanetSection from "./PlanetSection";
import AsteroidSection from "./AsteroidSection";
import NebulaSection from "./NebulaSection";

type Props = {
  galaxy: GalaxyType;
  overlap: number;
  onOpenAsteroid: (obj: AsteroidObject) => void;
};

export default function Galaxy({ galaxy, overlap, onOpenAsteroid }: Props) {
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
        return null;
      })}
      <div style={{ height: "20vh" }} />
    </div>
  );
}
