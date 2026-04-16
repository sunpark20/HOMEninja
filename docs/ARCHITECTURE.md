# 아키텍처

## 디렉토리 구조
```
homepage/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 메타, Starfield)
│   ├── page.tsx                # 메인 페이지 (섹션 조합)
│   ├── globals.css             # Tailwind + 행성/별 커스텀 CSS
│   ├── not-found.tsx           # 커스텀 404 페이지
│   ├── privacy/
│   │   └── page.tsx            # 개인정보처리방침 페이지
│   ├── sitemap.ts              # sitemap.xml 자동 생성
│   ├── robots.ts               # robots.txt 자동 생성
│   ├── icon.tsx                # favicon 동적 생성 (또는 favicon.ico)
│   └── apple-icon.tsx          # Apple Touch Icon (180×180)
├── components/
│   ├── Starfield.tsx           # Canvas 별 배경 (client)
│   ├── Planet.tsx              # CSS 행성 그래픽 (client, 패럴랙스)
│   ├── AppSection.tsx          # 행성 + 앱 카드 조합 섹션
│   ├── AppCard.tsx             # 앱 소개 카드 (server)
│   ├── DownloadButtons.tsx     # 플랫폼별 다운로드 버튼 그룹 (client, 플랫폼 감지)
│   ├── Hero.tsx                # 히어로 섹션 (앱 바로가기 포함)
│   ├── ScrollIndicator.tsx     # 스크롤 유도 화살표 (client)
│   └── Footer.tsx              # 푸터 (개인정보처리방침 링크 포함)
├── data/
│   └── apps.ts                 # 앱 정보 정적 배열
├── types/
│   └── app.ts                  # AppData 타입 정의
├── public/
│   ├── screenshots/            # 앱 스크린샷 (WebP)
│   ├── badges/                 # App Store, Google Play 공식 SVG 배지
│   │   ├── app-store.svg
│   │   └── google-play.svg
│   └── og-image.png            # OG 프리뷰 이미지 (1200×630)
├── package.json
├── next.config.ts
├── postcss.config.mjs            # Tailwind v4 (CSS-first, ADR-015)
├── .eslintrc.json
└── tsconfig.json
```

## 컴포넌트 상세

### layout.tsx (Server Component)
```
역할: HTML 뼈대, 폰트 로딩, 메타데이터, 전역 스타일
Props: children
렌더링:
  <html lang="ko">
    <body className={fontClasses}>
      <Starfield />          ← fixed position, z-index: 0
      <main>
        {children}           ← z-index: 1
      </main>
    </body>
  </html>

메타데이터:
  - title, description
  - og:title, og:description, og:image, og:url
  - twitter:card, twitter:title, twitter:description, twitter:image
  - viewport, themeColor
```

### page.tsx (Server Component)
```
역할: 섹션 조합
데이터: data/apps.ts에서 import
렌더링:
  <Hero />
  {apps.map(app => <AppSection key={app.id} app={app} />)}
  <Footer />

앱이 0개일 때: <EmptyState /> 렌더링 ("곧 새로운 앱이 도착합니다")
```

### Starfield.tsx (Client Component)
```
역할: Canvas에 별 파티클 렌더링 + 반짝임 + 패럴랙스
위치: fixed, top: 0, left: 0, 뷰포트 전체, z-index: 0
접근성: aria-hidden="true" (순수 장식)

상태:
  - stars: Star[] — 초기화 시 랜덤 생성
  - scrollY: number — 스크롤 위치 (패럴랙스 계산용)

Star 타입:
  { x: number, y: number, radius: number, opacity: number,
    twinkleSpeed: number, twinklePhase: number }

초기화 (useEffect, 마운트 1회):
  1. Canvas 크기 = window.innerWidth × window.innerHeight × devicePixelRatio
  2. 별 개수 = Math.floor((width × height) / 5000)
     - 최소 100개, 최대 400개
  3. 각 별: 랜덤 x, y, radius(0.5~2px), opacity(0.3~1.0),
     twinkleSpeed(0.001~0.005), twinklePhase(0~2π)

렌더 루프 (requestAnimationFrame):
  1. Canvas 전체 클리어
  2. 각 별에 대해:
     a. opacity = baseOpacity + sin(time × twinkleSpeed + phase) × 0.3
     b. y 보정 = star.y - scrollY × 0.1 (패럴랙스)
     c. y가 화면 밖이면 반대편으로 순환 (% pageHeight)
     d. arc로 원 그리기, fillStyle에 opacity 반영

리사이즈 처리:
  - window resize 이벤트 → Canvas 크기 재설정 + 별 재생성
  - debounce 250ms로 과도한 호출 방지

스크롤 처리:
  - scroll 이벤트 → scrollY 업데이트
  - passive: true로 스크롤 성능 보장
  - requestAnimationFrame 내에서 읽으므로 별도 throttle 불필요

prefers-reduced-motion:
  - matchMedia('(prefers-reduced-motion: reduce)') 감지
  - true일 때: 반짝임 정지 (opacity 고정), 패럴랙스 비활성화 (scrollY 무시)
  - 렌더 루프는 유지하되 static 프레임 1회만 그리고 정지

클린업 (useEffect return):
  - requestAnimationFrame 취소 (cancelAnimationFrame)
  - scroll 이벤트 리스너 제거
  - resize 이벤트 리스너 제거

에러 처리:
  - Canvas API 미지원 브라우저: Canvas 렌더링 스킵, 빈 div만 표시
  - getContext('2d') 반환값 null 체크
```

### Planet.tsx (Client Component)
```
역할: CSS gradient 행성을 렌더링하고 패럴랙스 적용
Props:
  - colors: string[] — gradient 색상 배열 (3~4색)
  - size: number — 행성 크기 (vh 단위)
  - position: { x: string, y: string } — CSS 위치 (%, vw 등)
  - parallaxSpeed: number — 패럴랙스 강도 (0.1~0.5)

렌더링:
  <div> 요소에 아래 CSS 적용:
    - width/height: size (vh)
    - border-radius: 50%
    - background: radial-gradient(ellipse, ...colors)
    - box-shadow: 내부 그림자 (행성 음영) + 외부 glow (대기 표현)
    - position: absolute
    - left/top: position 값
    - will-change: transform (패럴랙스 최적화)
    - pointer-events: none (클릭 불가, 순수 장식)
    - aria-hidden: true

패럴랙스:
  - 자신의 섹션이 뷰포트에 들어왔을 때만 계산
  - IntersectionObserver로 가시성 감지
  - 가시 상태일 때: scrollY × parallaxSpeed로 translateY 적용
  - transform 속성만 변경 (layout thrashing 방지)

prefers-reduced-motion:
  - 패럴랙스 비활성화, 고정 위치

반응형:
  - 모바일: size × 0.6 적용 (행성 축소)
  - 태블릿: size × 0.8
  - 데스크탑: size × 1.0
  - CSS clamp() 또는 미디어 쿼리로 처리
```

### AppSection.tsx (Server Component)
```
역할: 하나의 앱 섹션 = 행성 배경 + 앱 카드
Props: app: AppData

렌더링:
  <section id={app.id} className="relative min-h-screen">
    <Planet ...app.planet />          ← 배경 행성 (absolute)
    <div className="relative z-10">   ← 콘텐츠 (행성 위)
      <AppCard app={app} />
    </div>
  </section>
```

### AppCard.tsx (Server Component)
```
역할: 앱 정보 + 스크린샷 + 다운로드 버튼
Props: app: AppData

렌더링:
  앱 이름 (h2)
  한 줄 설명 (p)
  스크린샷 (next/image, 있을 때만)
  다운로드 버튼들 (DownloadButton × N)

스크린샷 없을 때:
  이미지 영역 생략, 텍스트 + 버튼만 표시
```

### DownloadButtons.tsx (Client Component — 플랫폼 감지 필요)
```
역할: 앱의 모든 다운로드 버튼을 플랫폼 감지 결과에 따라 렌더링
Props:
  - downloads: DownloadLink[]

상태:
  - detectedPlatform: 'ios' | 'android' | 'unknown' (useEffect에서 감지)

플랫폼 감지 로직 (useEffect, 마운트 1회):
  1. const ua = navigator.userAgent
  2. /iPhone|iPad|iPod/.test(ua) → 'ios'
  3. /Android/.test(ua) → 'android'
  4. 그 외 → 'unknown'

렌더링:
  downloads를 정렬 (detectedPlatform에 해당하는 것을 맨 앞으로)
  각 download에 대해:
    url이 있을 때:
      <a href={url} target="_blank" rel="noopener noreferrer">
        platform === 'ios' → App Store SVG 배지
        platform === 'android' → Google Play SVG 배지
        platform === 'web' → 텍스트 버튼 ("바로 사용하기 →")
      </a>
      강조 스타일: detectedPlatform과 일치하면 primary (밝은 테두리/배경)
      불일치하면 secondary (subtle 스타일)

    url이 null일 때:
      <span className="opacity-40 cursor-default pointer-events-none">
        배지 + "준비 중"
      </span>

하이드레이션 mismatch 방지:
  - 초기 렌더 (SSR + 첫 클라이언트 렌더): detectedPlatform = 'unknown' → 모든 버튼 동등
  - useEffect 후: 감지 결과 반영 → 강조 적용
  - 레이아웃 시프트 없음: 버튼 크기/위치는 동일, opacity/border만 변경
```

### Hero.tsx (Server Component)
```
역할: 첫 화면. 이름 + 소개 + 앱 바로가기 + 스크롤 유도
Props: apps: AppData[] (바로가기 버튼 생성용)
렌더링:
  <section className="min-h-screen flex flex-col items-center justify-center">
    이름/브랜드 (h1)
    한 줄 소개 (p)
    앱 바로가기 버튼 그룹 (nav)
      {apps.map(app =>
        <a href={`#${app.id}`} onClick={smoothScroll}>
          {app.name}
        </a>
      )}
    <ScrollIndicator />
  </section>

바로가기 동작:
  - 클릭 시 해당 섹션으로 smooth scroll
  - history.pushState로 URL 해시 업데이트 (리로드 없이)
  - 키보드 접근 가능 (Tab + Enter)
```

### ScrollIndicator.tsx (Client Component)
```
역할: 아래로 스크롤 유도하는 화살표/텍스트
동작:
  - 스크롤 위치가 100px 이상이면 fade-out (더 이상 필요 없으므로)
  - 부드러운 상하 bounce 애니메이션 (CSS keyframes)

prefers-reduced-motion:
  - bounce 애니메이션 정지, 정적 표시
```

### Footer.tsx (Server Component)
```
역할: 연락처, 링크, 저작권, 개인정보처리방침
렌더링:
  이메일/연락처 링크
  GitHub/SNS 아이콘 링크 (선택)
  <Link href="/privacy">개인정보처리방침</Link>  ← Next.js Link (SPA 내부 이동)
  © 2026 {이름}
```

## 타입 정의

### types/app.ts
```typescript
type Platform = 'ios' | 'android' | 'web'

type PlanetStyle = {
  colors: string[]           // radial-gradient 색상 (3~4개)
  size: number               // vh 단위 크기
  position: { x: string; y: string }  // CSS 위치값
  parallaxSpeed: number      // 0.1~0.5
  shadowColor: string        // 외부 glow 색상
}

type DownloadLink = {
  platform: Platform
  url: string | null         // null이면 "준비 중"
  label: string              // 버튼 텍스트
}

type AppMeta = {
  minOS?: string             // 최소 지원 OS (예: "iOS 16.0+", "Android 8.0+")
  lastUpdated?: string       // 최종 업데이트 (예: "2026.03")
  version?: string           // 앱 버전 (예: "2.1.0")
}

type AppData = {
  id: string                 // URL-safe identifier, 섹션 id, 앵커 해시
  name: string               // 앱 이름 (최대 20자)
  description: string        // 한 줄 설명 (최대 50자)
  meta?: AppMeta             // 부가 정보 (선택)
  screenshots: string[]      // /screenshots/ 경로 배열 (빈 배열 허용)
  downloads: DownloadLink[]  // 다운로드 링크 배열
  planet: PlanetStyle        // 행성 스타일
}
```

## 데이터 흐름

```
빌드 타임 (next build)
  │
  ├─ data/apps.ts 읽기 (정적 import)
  │
  ├─ page.tsx에서 apps 배열 순회
  │   ├─ 각 app → AppSection 렌더링
  │   │   ├─ Planet (CSS gradient, 클라이언트에서 패럴랙스)
  │   │   └─ AppCard
  │   │       ├─ 앱 정보 (정적 텍스트)
  │   │       ├─ 스크린샷 (next/image, 빌드 시 최적화)
  │   │       └─ DownloadButton (외부 링크, 정적 <a> 태그)
  │   └─ ...
  │
  └─ 정적 HTML + JS 번들 생성
       │
       └─ Vercel에 배포 → CDN에서 서빙

런타임 (브라우저)
  │
  ├─ HTML 즉시 렌더링 (SSG → 빈 화면 없음)
  ├─ JS 하이드레이션
  │   ├─ Starfield: Canvas 초기화 → 별 생성 → 렌더 루프 시작
  │   ├─ Planet: IntersectionObserver 등록 → 패럴랙스 시작
  │   └─ ScrollIndicator: 스크롤 이벤트 리스너 등록
  │
  └─ 사용자 인터랙션
      ├─ 스크롤 → 패럴랙스 업데이트 (rAF)
      └─ 다운로드 버튼 클릭 → 외부 URL 이동 (순수 <a> 태그)
```

## 상태 관리

이 프로젝트에 글로벌 상태 관리 라이브러리는 없다. 모든 상태는 컴포넌트 로컬.

| 컴포넌트 | 상태 | 관리 방식 |
|----------|------|-----------|
| Starfield | stars 배열, scrollY, canvasSize | useRef (렌더 트리거 불필요) |
| Planet | isVisible, translateY | useRef + IntersectionObserver |
| ScrollIndicator | isVisible | useState + scroll 이벤트 |
| DownloadButtons | detectedPlatform | useState + useEffect (마운트 1회) |

useRef를 쓰는 이유: Canvas/transform 업데이트는 React 렌더 사이클 밖에서 rAF로 직접 처리.
useState를 쓰면 매 프레임 리렌더가 발생해 성능 저하.

## 폰트 로딩 전략

```
1. next/font/google로 빌드 타임에 폰트 파일 다운로드 + self-hosting
2. font-display: swap 적용
   - FOUT 허용 (시스템 폰트 → 웹 폰트 전환)
   - FOIT(빈 텍스트) 방지 — 콘텐츠 즉시 가독성 확보
3. 디스플레이 폰트: preload로 히어로 텍스트 빠른 로딩
4. 본문 폰트: 일반 로딩 (스크롤 아래에 있으므로)
```

## 이미지 최적화

```
1. next/image 컴포넌트 사용
   - 자동 WebP 변환
   - srcset으로 디바이스별 최적 크기 서빙
   - lazy loading 기본 (뷰포트 밖 이미지)
   - placeholder="blur" → 로딩 중 블러 처리된 미리보기 표시
2. 스크린샷 원본: public/screenshots/ 에 저장
   - 파일명 규칙: {appId}-{순번}.webp (예: memory-palace-1.webp)
   - 권장 크기: 너비 1200px (next/image가 리사이즈)
3. OG 이미지: 1200×630px, public/og-image.png
```

## Canvas 성능 관리

```
문제: Canvas 렌더 루프가 탭 비활성화 시에도 돌면 배터리/CPU 낭비
대응:
  1. document.hidden 체크 → 탭 비활성화 시 rAF 정지
  2. visibilitychange 이벤트로 탭 복귀 시 rAF 재개
  3. 별 업데이트는 단순 연산 (sin, arc)이므로 CPU 부하 미미
  4. devicePixelRatio > 2인 경우 Canvas 크기를 2배로 제한 (4K 대응)

메모리:
  - Canvas 1개, ImageData 미사용, 별 배열만 메모리 점유
  - 별 400개 × 6 필드 × 8바이트 ≈ 19KB → 무시 가능
```

## 에러 바운더리

```
이 프로젝트는 정적 사이트로 런타임 에러 발생 가능성이 극히 낮다.
그러나 Client Component에서 예외가 발생해도 콘텐츠가 보여야 하므로:

1. Starfield에서 Canvas 초기화 실패 → 빈 div 표시, 콘텐츠 정상 표시
2. Planet 패럴랙스 실패 → 행성 고정 위치 표시 (CSS만으로 렌더링은 됨)
3. DownloadButtons 플랫폼 감지 실패 → 모든 버튼 동등 표시 (기본값)
4. ScrollIndicator 스크롤 이벤트 실패 → 화살표 항상 표시 (사라지지 않을 뿐)
5. app/not-found.tsx → 존재하지 않는 경로 접근 시 404 페이지
   "우주에서 길을 잃었습니다" + 홈으로 돌아가기 링크
6. /privacy 접근 → 정상 페이지 (별 배경은 layout에서 자동 적용)

핵심 원칙: 장식(별, 패럴랙스, 플랫폼 감지)이 실패해도
           콘텐츠(앱 이름, 설명, 다운로드 링크)는 항상 접근 가능해야 한다.
```

## 앵커 네비게이션

```
URL 해시 처리:

1. 페이지 최초 로드 시 URL에 해시가 있으면 (예: #memory-palace):
   - 브라우저가 자동으로 해당 id 요소로 점프
   - JS 하이드레이션 후 추가 동작 없음
   - 패럴랙스/별은 현재 스크롤 위치 기준으로 정상 계산

2. 히어로 바로가기 버튼 클릭 시:
   - e.preventDefault()로 기본 점프 방지
   - document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
   - history.pushState(null, '', `#${id}`)로 URL 업데이트

3. 브라우저 뒤로가기:
   - popstate 이벤트 감지 → 해시 변경에 따라 스크롤
   - 히어로 바로가기 버튼은 <a href="#id">이므로 접근성 양호
```

## 배포

```
1. GitHub 레포지토리 → Vercel 프로젝트 연결
2. main 브랜치 push → 자동 빌드 + 배포
3. 빌드 명령: next build
4. 출력: .next/ (Vercel이 자동 처리)
5. 도메인: Vercel 기본 도메인 (*.vercel.app) 또는 커스텀 도메인
6. 환경 변수: 없음 (모든 데이터가 코드에 포함)
```

## SEO 인프라

### sitemap.ts
```typescript
// app/sitemap.ts
export default function sitemap() {
  const baseUrl = 'https://your-domain.vercel.app' // 배포 후 확정
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
```

### robots.ts
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://your-domain.vercel.app/sitemap.xml',
  }
}
```

### 메타데이터 (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: '{이름} — 앱 포트폴리오',
  description: '기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.',
  metadataBase: new URL('https://your-domain.vercel.app'),
  openGraph: {
    title: '{이름} — 앱 포트폴리오',
    description: '기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '{이름} — 앱 포트폴리오',
    description: '기억의궁전, 제주택배비지원 등 유용한 앱을 만듭니다.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
}
```
