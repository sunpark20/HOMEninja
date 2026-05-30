"use client";

import { useState, useCallback, useEffect } from "react";
import type {
  Galaxy as GalaxyType,
  AsteroidObject,
  EditableAppObject,
} from "@/types/galaxy";
import type { AppContent } from "@/data/tmt";
import StarfieldV2 from "./StarfieldV2";
import DustLayer from "./DustLayer";
import Hyperspace from "./Hyperspace";
import GalaxyNav from "./GalaxyNav";
import AsteroidModal from "./AsteroidModal";
import AdminEditModal from "./AdminEditModal";
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
  const [editApp, setEditApp] = useState<EditableAppObject | null>(null);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const [contentOverrides, setContentOverrides] = useState<
    Record<string, AppContent>
  >({});
  const [earthOpen, setEarthOpen] = useState(false);

  const handleSaved = useCallback(
    (appId: string, data: AppContent) => {
      setContentOverrides((prev) => ({ ...prev, [appId]: data }));
    },
    [],
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const galaxyIdx = galaxies.findIndex((g) =>
        g.objects.some((o) => o.id === hash),
      );
      if (galaxyIdx >= 0 && galaxyIdx !== 0) {
        setCurrent(galaxyIdx);
        setDisplayed(galaxyIdx);
        setPendingScrollId(hash);
      } else {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
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

  useEffect(() => {
    if (!pendingScrollId) return;
    const containsTarget = galaxies[displayed]?.objects.some(
      (o) => o.id === pendingScrollId,
    );
    if (!containsTarget) return;

    const id = pendingScrollId;
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setPendingScrollId(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [displayed, galaxies, pendingScrollId]);

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

  useEffect(() => {
    const handler = (e: Event) => {
      const targetId = (e as CustomEvent).detail as string;
      const galaxyIdx = galaxies.findIndex((g) =>
        g.objects.some((o) => o.id === targetId),
      );
      if (galaxyIdx < 0) return;

      if (galaxyIdx === displayed) {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setPendingScrollId(targetId);
        goTo(galaxyIdx);
      }
    };
    window.addEventListener("navigate-to-app", handler);
    return () => window.removeEventListener("navigate-to-app", handler);
  }, [galaxies, displayed, goTo]);

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
      <Comets active={galaxy.kind !== "blackholes"} />

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
          onOpenApp={setEditApp}
          contentOverrides={contentOverrides}
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
      <AdminEditModal
        obj={editApp}
        onClose={() => setEditApp(null)}
        onSaved={handleSaved}
      />
      <EarthZoom open={earthOpen} onClose={() => setEarthOpen(false)} />
    </>
  );
}
