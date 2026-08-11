import { appByID } from "@/data/apps";
import type { Galaxy, PlanetObject, AsteroidObject } from "@/types/galaxy";

type PublicObjectFields = Pick<
  PlanetObject,
  "id" | "name" | "description" | "meta" | "downloads" | "comingSoon" | "reportUrl"
>;

function publicApp(id: string): PublicObjectFields {
  const app = appByID(id);
  return {
    id: app.id,
    name: app.displayNameKo,
    description: app.taglineKo,
    meta: {
      minOS: app.minOS,
      version: app.version,
      ...(app.updatedAt ? { lastUpdated: app.updatedAt } : {}),
    },
    downloads: app.status === "released" ? app.downloads : [],
    comingSoon: app.status === "unreleased",
    reportUrl: app.reporting.url,
  };
}

function planetApp(
  id: string,
  visual: Pick<PlanetObject, "planet" | "macOnly" | "moons">,
): PlanetObject {
  return { ...publicApp(id), ...visual };
}

function asteroidApp(
  id: string,
  visual: Pick<AsteroidObject, "size" | "position" | "rotate" | "tilt" | "moons">,
): AsteroidObject {
  const app = publicApp(id);
  return { ...app, hint: app.description, ...visual };
}

export const galaxies: Galaxy[] = [
  {
    id: "solar-system",
    name: "Solar System",
    nameKo: "태양계",
    subtitle: "지금 만들어진 앱들",
    kind: "planets",
    accent: "oklch(0.75 0.12 55)",
    bg: {
      gradients: [
        { color: "oklch(0.35 0.15 45 / 0.08)", x: "20%", y: "30%", size: 60 },
        { color: "oklch(0.40 0.12 220 / 0.07)", x: "75%", y: "60%", size: 80 },
      ],
      starDensity: 1.0,
    },
    objects: [
      planetApp("snapcart", {
        planet: {
          colors: [
            "oklch(0.82 0.13 35)",
            "oklch(0.62 0.16 28)",
            "oklch(0.36 0.10 24)",
            "oklch(0.16 0.04 22)",
          ],
          size: 42,
          position: { x: "60%", y: "20%" },
          parallaxSpeed: 0.25,
          shadowColor: "oklch(0.62 0.16 28 / 0.2)",
          ring: { color: "oklch(0.70 0.08 55)", opacity: 0.28, tilt: 70, width: 1.3 },
        },
      }),
      planetApp("memory-palace", {
        planet: {
          colors: [
            "oklch(0.75 0.15 55)",
            "oklch(0.55 0.18 40)",
            "oklch(0.35 0.12 30)",
            "oklch(0.15 0.05 25)",
          ],
          size: 42,
          position: { x: "60%", y: "20%" },
          parallaxSpeed: 0.25,
          shadowColor: "oklch(0.55 0.18 40 / 0.2)",
          ring: { color: "oklch(0.6 0.1 45)", opacity: 0.35, tilt: 75, width: 1.6 },
        },
      }),
      planetApp("yt-bulk-downloader", {
        planet: {
          colors: [
            "oklch(0.72 0.13 140)",
            "oklch(0.50 0.16 130)",
            "oklch(0.30 0.10 120)",
            "oklch(0.12 0.05 115)",
          ],
          size: 40,
          position: { x: "65%", y: "15%" },
          parallaxSpeed: 0.24,
          shadowColor: "oklch(0.50 0.16 130 / 0.2)",
        },
      }),
      planetApp("spamcall070", {
        moons: [{
          targetId: "callninja",
          kind: "asteroid",
          colors: [
            "oklch(0.55 0.04 60)",
            "oklch(0.38 0.04 55)",
            "oklch(0.28 0.03 50)",
            "oklch(0.18 0.03 50)",
          ],
        }],
        planet: {
          colors: [
            "oklch(0.70 0.14 0)",
            "oklch(0.48 0.16 350)",
            "oklch(0.28 0.10 340)",
            "oklch(0.12 0.05 335)",
          ],
          size: 34,
          position: { x: "20%", y: "30%" },
          parallaxSpeed: 0.2,
          shadowColor: "oklch(0.48 0.16 350 / 0.2)",
        },
      }),
      planetApp("gnomon", {
        moons: [{
          targetId: "centuryiris",
          kind: "planet",
          colors: [
            "oklch(0.86 0.10 95)",
            "oklch(0.64 0.14 170)",
            "oklch(0.38 0.12 215)",
            "oklch(0.16 0.05 235)",
          ],
        }],
        planet: {
          colors: [
            "oklch(0.88 0.16 80)",
            "oklch(0.68 0.18 72)",
            "oklch(0.44 0.14 65)",
            "oklch(0.20 0.06 60)",
          ],
          size: 36,
          position: { x: "38%", y: "18%" },
          parallaxSpeed: 0.21,
          shadowColor: "oklch(0.68 0.18 72 / 0.2)",
        },
      }),
      planetApp("centuryiris", {
        macOnly: true,
        moons: [{
          targetId: "gnomon",
          kind: "planet",
          colors: [
            "oklch(0.88 0.16 80)",
            "oklch(0.68 0.18 72)",
            "oklch(0.44 0.14 65)",
            "oklch(0.16 0.05 235)",
          ],
        }],
        planet: {
          colors: [
            "oklch(0.86 0.10 95)",
            "oklch(0.64 0.14 170)",
            "oklch(0.38 0.12 215)",
            "oklch(0.16 0.05 235)",
          ],
          size: 38,
          position: { x: "58%", y: "22%" },
          parallaxSpeed: 0.22,
          shadowColor: "oklch(0.64 0.14 170 / 0.2)",
          ring: { color: "oklch(0.78 0.08 120)", opacity: 0.24, tilt: 68, width: 1.45 },
        },
      }),
    ],
  },
  {
    id: "asteroid-field",
    name: "Asteroid Field",
    nameKo: "운석 지대",
    subtitle: "떠다니는 돌덩이들 — 클릭하면 안에 뭐가 있을지",
    kind: "asteroids",
    accent: "oklch(0.68 0.08 80)",
    bg: {
      gradients: [
        { color: "oklch(0.20 0.06 55 / 0.25)", x: "50%", y: "50%", size: 140 },
        { color: "oklch(0.28 0.07 50 / 0.14)", x: "30%", y: "30%", size: 80 },
        { color: "oklch(0.22 0.05 40 / 0.12)", x: "75%", y: "65%", size: 70 },
      ],
      starDensity: 0.7,
      dustHaze: true,
      dust: true,
    },
    objects: [
      asteroidApp("callninja", {
        moons: [{
          targetId: "spamcall070",
          kind: "planet",
          colors: [
            "oklch(0.70 0.14 0)",
            "oklch(0.48 0.16 350)",
            "oklch(0.28 0.10 340)",
            "oklch(0.12 0.05 335)",
          ],
        }],
        size: 28,
        position: { x: "55%", y: "25%" },
        rotate: 12,
        tilt: 0.8,
      }),
      asteroidApp("breaklock-timer", {
        size: 22,
        position: { x: "22%", y: "30%" },
        rotate: -18,
        tilt: 1.1,
      }),
      asteroidApp("earth", {
        size: 26,
        position: { x: "64%", y: "16%" },
        rotate: 22,
        tilt: 0.7,
      }),
      asteroidApp("eatwater", {
        size: 24,
        position: { x: "16%", y: "18%" },
        rotate: -11,
        tilt: 1.2,
      }),
      {
        id: "a3",
        name: "북마크 정리기",
        hint: "내가 필요해서 만들어보려고",
        size: 32,
        position: { x: "65%", y: "15%" },
        rotate: 8,
        tilt: 0.6,
      },
      {
        id: "a4",
        name: "작은 게임",
        hint: "잠깐 쉬어가는 프로젝트",
        size: 20,
        position: { x: "18%", y: "35%" },
        rotate: -25,
        tilt: 1.3,
      },
      {
        id: "a5",
        name: "비밀 프로젝트",
        hint: "때가 되면 공개 예정",
        size: 26,
        position: { x: "58%", y: "20%" },
        rotate: 30,
        tilt: 0.9,
      },
    ],
  },
  {
    id: "bright-nebula",
    name: "Bright Nebula",
    nameKo: "빛나는 성운",
    subtitle: "앞으로 행성이 태어날 공간",
    kind: "nebula",
    accent: "oklch(0.75 0.14 280)",
    bg: {
      gradients: [
        { color: "oklch(0.45 0.18 280 / 0.14)", x: "30%", y: "25%", size: 90 },
        { color: "oklch(0.50 0.16 320 / 0.12)", x: "75%", y: "65%", size: 85 },
        { color: "oklch(0.45 0.15 200 / 0.10)", x: "50%", y: "50%", size: 70 },
      ],
      starDensity: 2.2,
      gasBands: true,
    },
    objects: [
      { id: "n1", name: "첫 번째 별빛", hint: "언젠가 행성이 될 가스 덩어리", size: 36, position: { x: "60%", y: "20%" }, hue: 280 },
      { id: "n2", name: "붉은 성간운", hint: "아직 형태를 찾고 있어요", size: 28, position: { x: "20%", y: "30%" }, hue: 320 },
      { id: "n3", name: "푸른 신성", hint: "가장 밝게 빛나는 아이", size: 42, position: { x: "62%", y: "18%" }, hue: 220 },
      { id: "n4", name: "조용한 성단", hint: "아직 어둡지만 곧 깨어날", size: 24, position: { x: "22%", y: "32%" }, hue: 180 },
      { id: "n5", name: "먼 항성", hint: "이 중 몇 개는 여러분 곁에 도착할 것", size: 30, position: { x: "58%", y: "24%" }, hue: 350 },
    ],
  },
  {
    id: "event-horizon",
    name: "Event Horizon",
    nameKo: "블랙홀 구간",
    subtitle: "빛이 돌아오지 않는 퇴역 앱 보관소",
    kind: "blackholes",
    accent: "oklch(0.70 0.03 260)",
    bg: {
      gradients: [{ color: "oklch(0.10 0.02 260 / 0.18)", x: "50%", y: "45%", size: 90 }],
      starDensity: 0,
    },
    objects: [
      {
        id: "jeju-delivery",
        name: "제주택배비지원",
        description: "카메라로 찰칵하면 택배비 신청 완료",
        meta: { lastUpdated: "2026.02" },
        retired: true,
        retiredLabel: "블랙홀에 들어가는중.",
        retiredImage: "/black-hole.svg",
        downloads: [{ platform: "web", url: null, label: "블랙홀에 들어가는중." }],
        size: 36,
        position: { x: "15%", y: "25%" },
        rotate: -12,
        debrisType: "ship",
      },
      { id: "bh-2", name: "끊어진 위성", description: "전송이 끝난 뒤 궤도만 남은 조각", downloads: [], size: 24, position: { x: "58%", y: "22%" }, rotate: 18, debrisType: "satellite" },
      { id: "bh-3", name: "식은 추진체", description: "다시 켜지지 않는 작은 엔진", downloads: [], size: 20, position: { x: "18%", y: "34%" }, rotate: 34, debrisType: "booster" },
      { id: "bh-4", name: "부서진 패널", description: "빛을 반사하지 못하는 낡은 금속판", downloads: [], size: 28, position: { x: "64%", y: "18%" }, rotate: -28, debrisType: "panel" },
      { id: "bh-5", name: "빈 캡슐", description: "기록만 남기고 사라진 실험실", downloads: [], size: 22, position: { x: "20%", y: "30%" }, rotate: 8, debrisType: "capsule" },
    ],
  },
];
