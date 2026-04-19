"use client";

import { useState, useCallback, useEffect } from "react";
import type { Galaxy as GalaxyType, AsteroidObject } from "@/types/galaxy";
import StarfieldV2 from "./StarfieldV2";
import DustLayer from "./DustLayer";
import Hyperspace from "./Hyperspace";
import GalaxyNav from "./GalaxyNav";
import AsteroidModal from "./AsteroidModal";
import HeroV2 from "./HeroV2";
import EarthZoom from "./EarthZoom";
import LensFlare from "./LensFlare";
import Comets from "./Comets";
import { Galaxy } from "./galaxy";

const TRANSITION_MS = 700;

export default function GalaxyExplorer({
  galaxies,
}: {
  galaxies: GalaxyType[];
}) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [direction, setDirection] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [asteroid, setAsteroid] = useState<AsteroidObject | null>(null);
  const [earthOpen, setEarthOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const galaxyIdx = galaxies.findIndex((g) =>
        g.objects.some((o) => o.id === hash),
      );
      if (galaxyIdx >= 0 && galaxyIdx !== 0) {
        setCurrent(galaxyIdx);
        setDisplayed(galaxyIdx);
      }
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    try {
      const saved = Number(localStorage.getItem("ninjaturtle.galaxy") || 0);
      if (saved > 0 && saved < galaxies.length) {
        setCurrent(saved);
        setDisplayed(saved);
      }
    } catch {
      /* noop */
    }
  }, [galaxies]);

  const goTo = useCallback(
    (next: number) => {
      if (transitioning) return;
      if (next < 0 || next >= galaxies.length) return;
      if (next === current) return;

      const dir = next > current ? 1 : -1;
      setDirection(dir);
      setTransitioning(true);
      setCurrent(next);

      const swapAt = Math.max(200, TRANSITION_MS * 0.35);
      setTimeout(() => {
        setDisplayed(next);
        window.scrollTo({ top: 0, behavior: "auto" });
        try {
          localStorage.setItem("ninjaturtle.galaxy", String(next));
        } catch {
          /* noop */
        }
      }, swapAt);

      setTimeout(() => setTransitioning(false), TRANSITION_MS);
    },
    [current, transitioning, galaxies.length],
  );

  const galaxy = galaxies[displayed];
  const starTint =
    galaxy.kind === "nebula"
      ? 280
      : galaxy.kind === "asteroids"
        ? 50
        : null;

  return (
    <>
      <StarfieldV2
        density={galaxy.bg.starDensity}
        tint={starTint}
        gasBands={!!galaxy.bg.gasBands}
        dustHaze={!!galaxy.bg.dustHaze}
        galaxyId={galaxy.id}
      />
      <DustLayer active={!!galaxy.bg.dust} />
      <LensFlare active={galaxy.kind === "planets"} />
      <Comets />

      <div
        className="relative"
        style={{
          zIndex: 10,
          opacity: transitioning ? 0.25 : 1,
          transition: `opacity ${TRANSITION_MS * 0.5}ms ease`,
        }}
      >
        {displayed === 0 && (
          <HeroV2 onEarthClick={() => setEarthOpen(true)} />
        )}
        <Galaxy
          galaxy={galaxy}
          overlap={20}
          onOpenAsteroid={setAsteroid}
        />
        <div style={{ padding: "60px 0 120px" }} />
      </div>

      <Hyperspace active={transitioning} direction={direction} />
      <GalaxyNav
        galaxies={galaxies}
        current={current}
        onGo={goTo}
        disabled={transitioning}
      />
      <AsteroidModal
        obj={asteroid}
        onClose={() => setAsteroid(null)}
      />
      <EarthZoom open={earthOpen} onClose={() => setEarthOpen(false)} />
    </>
  );
}
