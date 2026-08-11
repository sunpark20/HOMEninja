# 아키텍처

## 디렉토리 구조
```
homepage/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 메타, 헤더)
│   ├── page.tsx                # 메인 페이지 (GalaxyExplorer 진입점)
│   ├── globals.css             # Tailwind + 커스텀 keyframes
│   ├── not-found.tsx           # 커스텀 404 페이지
│   ├── privacy/
│   │   ├── page.tsx            # 통합 개인정보처리방침
│   │   ├── callninja/page.tsx  # CallNinja 개인정보처리방침
│   │   └── spamcall070/page.tsx # SpamCall070 개인정보처리방침
│   ├── sitemap.ts              # sitemap.xml 자동 생성
│   ├── robots.ts               # robots.txt 자동 생성
│   └── api/tmt/route.ts        # 관리자용 TMT 편집 API (GitHub contents API)
├── components/
│   ├── GalaxyExplorer.tsx      # 최상위 클라이언트 컴포넌트 (은하 전환 오케스트레이터)
│   ├── HeroV2.tsx              # 히어로 섹션 (타이틀 + Earth 버튼)
│   ├── StarfieldV2.tsx         # Canvas 별 배경 (tint, gasBands, dustHaze)
│   ├── DustLayer.tsx           # 부유 먼지 파티클 레이어
│   ├── Hyperspace.tsx          # 은하 전환 시 하이퍼스페이스 이펙트
│   ├── GalaxyNav.tsx           # 하단 은하 네비게이션 (◀ ● ● ● ▶)
│   ├── Planet.tsx              # CSS gradient 행성 (ring, parallax)
│   ├── Asteroid.tsx            # SVG 운석 그래픽
│   ├── AsteroidModal.tsx       # 운석 클릭 시 상세 모달
│   ├── NebulaOrb.tsx           # 성운 오브 그래픽
│   ├── DownloadButtons.tsx     # 플랫폼별 다운로드 버튼 (플랫폼 감지)
│   ├── Earth.tsx               # 파란 지구 버튼 (halo 맥동)
│   ├── EarthZoom.tsx           # 6단계 줌인 오버레이 + 토스 QR 후원 카드
│   ├── LensFlare.tsx           # 랜덤 렌즈플레어 (태양계 전용)
│   ├── Comets.tsx              # 랜덤 유성 (Web Animations API)
│   └── galaxy/                 # 은하 내부 섹션 컴포넌트
│       ├── index.ts            # barrel export
│       ├── Galaxy.tsx          # 은하 종류별 섹션 라우터
│       ├── GalaxyBackground.tsx # 배경 radial gradient 오버레이
│       ├── GalaxyIntro.tsx     # 은하 제목/부제목
│       ├── PlanetSection.tsx   # 행성 + 앱카드 + 다운로드
│       ├── AsteroidSection.tsx # 운석 + 힌트카드
│       ├── NebulaSection.tsx   # 성운 오브 + 힌트카드
│       ├── ObjectContentCard.tsx # 앱/오브젝트 정보 카드
│       ├── CardSide.tsx        # 카드 좌우 배치 유틸
│       └── SectionShell.tsx    # 섹션 공통 쉘 (간격, z-index)
├── data/
│   ├── apps.ts                 # 생성 앱 레지스트리 정규화·조회
│   ├── apps.generated.ts       # shipping.yml에서 생성한 공개 앱 사실
│   └── galaxies.ts             # 은하·오브젝트의 시각 배치와 앱 레지스트리 join
├── scripts/
│   └── sync-apps.mjs           # 로컬 shipping.yml → apps.generated.ts 동기화
├── types/
│   ├── app.ts                  # Platform, PlanetStyle, DownloadLink, AppMeta
│   └── galaxy.ts               # Galaxy, GalaxyKind, GalaxyBackground, *Object 타입
├── public/
│   ├── logo-icon.svg           # 로고 아이콘
│   ├── logo.png                # 로고 이미지
│   └── toss-qr.png             # 토스 후원 QR 코드
└── docs/
    ├── PRD.md                  # 제품 요구사항
    ├── ARCHITECTURE.md         # 이 파일
    ├── ADR.md                  # 아키텍처 결정 기록
    └── UI_GUIDE.md             # UI 디자인 가이드
```

## 핵심 구조: 멀티 은하 시스템

### 은하 종류 (GalaxyKind)
| 종류 | id | 용도 |
|------|-----|------|
| planets | solar-system | 출시된 앱 (행성으로 표현) |
| asteroids | asteroid-field | 개발 중/아이디어 단계 앱 (운석으로 표현) |
| nebula | bright-nebula | 미래 공간 (성운으로 표현) |
| blackholes | event-horizon | 퇴역 앱/잔해 (블랙홀로 표현) |

### 은하별 배경 차별화
| 은하 | starTint | 특수 효과 | gradient 강도 |
|------|----------|-----------|---------------|
| 태양계 | null (백색) | LensFlare (랜덤 빛줄기) | 약함 |
| 운석지대 | 50 (amber) | dustHaze (황야 톤) | 강함 (0.12~0.25) |
| 빛나는 성운 | 280 (보라) | gasBands (가스 밴드) | 강함 (0.10~0.14) |
| 블랙홀 구간 | null | starDensity 0, Comets 비활성 | 최소 |

## 컴포넌트 트리

```
page.tsx (Server)
└── GalaxyExplorer (Client — 전체 상태 관리)
    ├── StarfieldV2 (Canvas — 별, gasBands, dustHaze)
    ├── DustLayer (부유 먼지)
    ├── LensFlare (태양계 전용 랜덤 빛줄기)
    ├── Comets (랜덤 유성, 블랙홀 구간 비활성)
    ├── HeroV2 (첫 은하에서만)
    │   └── Earth (지구 버튼)
    ├── Galaxy
    │   ├── GalaxyBackground (배경 gradient)
    │   ├── GalaxyIntro (은하 제목)
    │   └── *Section (종류별)
    │       ├── PlanetSection → Planet + ObjectContentCard + DownloadButtons
    │       ├── AsteroidSection → Asteroid + ObjectContentCard
    │       ├── NebulaSection → NebulaOrb + ObjectContentCard
    │       └── BlackHoleSection → BlackHoleVisual + ObjectContentCard
    ├── Hyperspace (전환 이펙트)
    ├── GalaxyNav (은하 네비게이션)
    ├── AsteroidModal (운석 상세)
    ├── AdminEditModal (앱 콘텐츠/TMT 관리자 편집)
    └── EarthZoom (후원 줌인 오버레이)
        └── HousePanel (토스 QR 카드)
```

## 상태 관리

글로벌 상태 라이브러리 없음. 모든 상태는 GalaxyExplorer에서 로컬 관리.

| 상태 | 용도 | 영속 |
|------|------|------|
| current / displayed | 현재/표시 중 은하 인덱스 | localStorage |
| transitioning / direction | 전환 애니메이션 제어 | 없음 |
| asteroid | 열린 운석 모달 데이터 | 없음 |
| editPlanet / contentOverrides | 관리자 편집 모달, 저장 후 즉시 반영할 콘텐츠 오버라이드 | sessionStorage(비밀번호), 메모리 |
| earthOpen | EarthZoom 오버레이 상태 | 없음 |

## 데이터 흐름

```
빌드 타임
  ../../0.shipping/*/shipping.yml → scripts/sync-apps.mjs → data/apps.generated.ts
  → data/apps.ts (공개 앱 레지스트리) → data/galaxies.ts (시각 배치와 join)
  → page.tsx에서 import → GalaxyExplorer에 props 전달
  → 각 Galaxy 컴포넌트가 종류별 섹션 렌더링 → 정적 HTML 생성

런타임
  GalaxyExplorer: 은하 전환 (← → 키 / 네비 버튼)
  ├── StarfieldV2: Canvas 리사이즈 + 별 재생성 + tint/gasBands/dustHaze 전환
  ├── Comets: 랜덤 타이머 → Web Animations API로 유성 스폰
  ├── LensFlare: 랜덤 타이머 → 광원 + 줄기 스폰 (태양계만)
  ├── localStorage: 마지막 은하 인덱스 저장/복원
  └── AdminEditModal: /api/tmt 인증/저장 → GitHub data/tmt.json 갱신 → contentOverrides로 즉시 반영
```

## 앱 레지스트리

`shipping.yml` v2가 앱 이름, 공개 배포 링크, 최소 OS, 상태, 개인정보·지원 URL, GitHub 신고
템플릿의 유일한 원천이다. `scripts/sync-apps.mjs`는 로컬에서만 실행하며 원격 fetch 없이
`data/apps.generated.ts`를 만든다. 생성 산출물에는 bundle ID, 저장소명, 로컬 경로를 넣지 않는다.

`data/apps.ts`는 생성 데이터를 정규화하고, `data/galaxies.ts`는 행성·운석의 색·크기·배치 같은
시각 정보만 가진다. 두 데이터는 공개 `app.id`로 join한다. 앱 상세의 GitHub 신고 링크와
`app/sitemap.ts`의 앱별 개인정보·지원 페이지도 이 레지스트리에서 파생한다.

## 앱 폐지 처리 패턴

서비스가 종료된 앱은 삭제하지 않고 "블랙홀에 들어가는중." 상태로 남긴다. 방문자는 앱 이력을 볼 수 있지만 다운로드/실행 버튼은 누를 수 없어야 한다.

`data/galaxies.ts`의 블랙홀 구간으로 이동하고 다음 값을 유지한다.

```ts
retired: true,
retiredLabel: "블랙홀에 들어가는중.",
retiredImage: "/black-hole.svg",
downloads: [
  {
    platform: "web",
    url: null,
    label: "블랙홀에 들어가는중.",
  },
],
```

렌더링 책임은 공통 컴포넌트에 둔다.

- `ObjectContentCard`: `retired`일 때 블랙홀 이미지, 상태 배지, 앱 이름 삭선을 표시한다.
- `DownloadButtons`: 다운로드 `url`이 `null`이면 `<a>` 대신 클릭 불가능한 `<span>`을 렌더링하고 `label`을 그대로 보여준다.
- `public/black-hole.svg`: 폐지 상태 공통 이미지. 새 폐지 앱도 이 자산을 재사용한다.

## 배포

```
GitHub (sunpark20/HOMEninja) → Vercel 자동 빌드
main push → next build → 정적 페이지는 CDN 서빙, /api/tmt는 Serverless Function
도메인: homeninja.vercel.app
환경 변수: GITHUB_PAT, ADMIN_PASSWORD
```
