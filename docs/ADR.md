# Architecture Decision Records

## 철학
MVP 속도 최우선. 외부 의존성 최소화. CSS + Canvas로 해결 가능한 건 라이브러리를 쓰지 않는다. 작동하는 최소 구현을 선택한다.

---

### ADR-001: Next.js 15 App Router
**결정**: Next.js 15 (App Router) + TypeScript를 프레임워크로 선택
**이유**:
- Vercel 무료 플랜과 원클릭 배포 통합
- App Router의 Server Components로 JS 번들 최소화
- next/image 이미지 최적화 내장
- next/font 폰트 self-hosting 내장
- SSG(Static Site Generation)로 완전 정적 사이트 생성 가능
- 메타데이터 API로 SEO/OG 태그 선언적 관리

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| Astro | 더 가벼운 번들, 정적 사이트 특화 | Vercel 통합이 Next.js만큼 매끄럽지 않음. React 생태계 활용도 낮음 |
| 순수 HTML/CSS/JS | 빌드 단계 없음, 가장 가벼움 | 이미지 최적화, 컴포넌트 재사용, 폰트 관리를 직접 해야 함. 유지보수 불리 |
| Vite + React | 빠른 HMR | SSG 설정 추가 필요. 메타데이터/이미지 최적화 직접 구현 |

**트레이드오프**: 2~3페이지 정적 사이트에 Next.js는 과할 수 있음. 하지만 Vercel 배포 편의성 + 이미지/폰트 최적화 내장이 그 비용을 상쇄.

---

### ADR-002: CSS gradient 행성 (이미지 파일 대신)
**결정**: 행성 그래픽을 radial-gradient + box-shadow로 CSS만으로 생성
**이유**:
- 외부 이미지 의존 없음 → 로딩 속도 최고, 네트워크 요청 0
- CSS 변수로 색상/크기 변경 가능 → 앱별 행성 커스터마이징 용이
- 벡터 기반이므로 어떤 해상도에서도 선명
- 파일 크기 0 (CSS는 이미 로딩됨)

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| NASA 공개 이미지 | 사실적 | 파일 크기 큼 (수백 KB~MB). 라이선스 확인 필요. 해상도별 대응 필요 |
| SVG 행성 | 벡터, 선명 | 복잡한 gradient/glow 표현이 CSS보다 어려움 |
| Canvas로 행성 그리기 | 동적 효과 가능 | 이미 별 배경에 Canvas 사용 중. 행성까지 Canvas면 복잡도 증가 |
| Three.js 3D 구체 | 가장 사실적, 자전 가능 | 번들 크기 100KB+. 저사양 모바일에서 성능 문제. 과잉 |

**트레이드오프**: 사진처럼 사실적인 행성은 불가. 하지만 잘 만든 CSS gradient 행성은 추상적이면서 세련되고, 포트폴리오 톤에 더 적합.

**구현 레시피** (행성 1개 기준):
```css
.planet {
  width: 60vh;
  height: 60vh;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at 30% 30%,     /* 광원 위치 (좌상단) */
    색상1 0%,                /* 밝은 면 */
    색상2 40%,               /* 중간 톤 */
    색상3 70%,               /* 어두운 면 */
    색상4 100%               /* 그림자 */
  );
  box-shadow:
    inset -20px -20px 60px rgba(0,0,0,0.6),  /* 내부 음영 (구체감) */
    0 0 80px 20px rgba(색상2, 0.15);          /* 외부 glow (대기) */
}
```

---

### ADR-003: Canvas 별 배경 (CSS/DOM 대신)
**결정**: HTML Canvas 2D로 별 배경을 렌더링
**이유**:
- 수백 개의 별을 개별 DOM 요소로 만들면 layout/paint 비용이 큼
- Canvas는 1개의 DOM 요소로 수백 개 점을 효율적으로 그림
- requestAnimationFrame으로 반짝임 애니메이션이 부드러움
- 별 개수를 디바이스 성능에 따라 동적 조절 가능

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| CSS 별 (box-shadow 다중) | JS 불필요 | 반짝임 애니메이션이 별마다 다른 타이밍이면 수백 개 keyframe 필요. 패럴랙스 불가 |
| CSS 별 (::before/::after + background-image) | 가벼움 | 별 개수 제한. 동적 조절 불가 |
| SVG 별 | 선언적, 접근성 | DOM 요소 수백 개 → 성능 저하 |
| WebGL | GPU 가속, 대량 파티클 | 이 규모에서 과잉. 호환성 걱정 |
| 라이브러리 (tsParticles 등) | 쉬운 설정 | 외부 의존성 추가. 번들 크기 증가. 커스터마이징 제한 |

**트레이드오프**:
- Canvas는 접근성(a11y) 면에서 콘텐츠 역할 불가 → aria-hidden="true" 필수
- JS 비활성화 시 별 미표시 → 하지만 콘텐츠에는 영향 없음 (순수 장식)
- Canvas 2D 컨텍스트를 얻지 못하는 극히 드문 환경 → 빈 div fallback

---

### ADR-004: 정적 데이터 파일 (CMS/DB 대신)
**결정**: 앱 정보를 `data/apps.ts` TypeScript 파일에 하드코딩
**이유**:
- 앱이 2~3개뿐이고 변경 빈도가 매우 낮음 (수개월에 1회)
- 타입 안전성: TypeScript로 앱 데이터 구조를 강제
- 빌드 시 검증: 잘못된 데이터는 빌드 에러로 잡힘
- 인프라 비용 0: DB/CMS 서버 불필요
- 배포 파이프라인: 코드 수정 → git push → Vercel 자동 배포 (1분 내)

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| Headless CMS (Contentful, Sanity) | 비개발자 수정 가능, UI 제공 | 앱 2개에 CMS는 과잉. 무료 플랜 제한. API 호출 latency |
| JSON 파일 | 타입 없이 가벼움 | TypeScript 타입 체크 불가. import 시 타입 단언 필요 |
| Markdown + frontmatter | 긴 설명에 적합 | 앱 소개가 한 줄이므로 Markdown 파싱 과잉 |
| Notion API | Notion에서 편집 | API 호출 필요. Rate limit. Notion 종속 |

**트레이드오프**: 비개발자가 앱 정보를 수정하기 어려움. 하지만 본인이 개발자이므로 문제 없음.

**확장 대응**: 앱 추가 시 `data/apps.ts` 배열에 객체 1개 추가 + 스크린샷 파일 추가만으로 완료. 코드 변경 범위가 1 파일.

---

### ADR-005: Tailwind CSS v4
**결정**: 스타일링에 Tailwind CSS v4 사용
**이유**:
- 유틸리티 퍼스트로 빠른 프로토타이핑
- Next.js 15와 공식 통합 (create-next-app 기본 옵션)
- 반응형 디자인 유틸리티 내장 (sm:, md:, lg:)
- 다크 모드 지원 내장 (이 프로젝트는 다크 고정이지만)
- 빌드 시 사용하지 않는 클래스 자동 제거 → CSS 크기 최소화

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| CSS Modules | 스코프 격리, 순수 CSS | 유틸리티 클래스 없이 반응형/다크모드 직접 작성 필요 |
| styled-components | JS에서 동적 스타일 | SSR 설정 복잡. 런타임 CSS-in-JS는 성능 비용 |
| vanilla CSS | 의존성 0 | 클래스 네이밍, 반응형 미디어쿼리 직접 관리 번거로움 |

**트레이드오프**: HTML 마크업이 길어질 수 있음. 하지만 별도 CSS 파일 관리가 불필요하고, 행성/별 같은 복잡한 CSS는 globals.css에 커스텀 클래스로 분리.

---

### ADR-006: 패럴랙스 구현 (CSS scroll-driven 대신 JS)
**결정**: requestAnimationFrame + scroll 이벤트로 패럴랙스 구현
**이유**:
- CSS scroll-driven animations (scroll-timeline)는 아직 Safari 미지원 (2026년 4월 기준)
- 인앱 브라우저(카카오톡, 네이버)에서의 지원도 불확실
- JS 구현이 모든 타겟 브라우저에서 동작 보장

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| CSS scroll-timeline | GPU 가속, 메인 스레드 비차단 | Safari 미지원. 인앱 브라우저 미지원 가능성 |
| 라이브러리 (Framer Motion, GSAP) | 풍부한 API, 쉬운 사용 | 번들 크기 증가. 이 정도 패럴랙스에 라이브러리는 과잉 |
| Intersection Observer만 사용 | 가벼움 | 부드러운 연속 패럴랙스가 아닌 discrete한 트리거만 가능 |

**트레이드오프**: JS 메인 스레드에서 스크롤 이벤트 처리. 하지만 passive listener + rAF + transform only로 성능 충분.

**향후**: Safari가 scroll-timeline 지원하면 CSS로 마이그레이션 고려 가능.

---

### ADR-007: 외부 링크 처리 (인앱 브라우저 대응)
**결정**: 순수 `<a>` 태그를 우선 사용하고, JavaScript window.open은 쓰지 않음
**이유**:
- 주 유입 경로가 게시판 → 카카오톡/네이버 인앱 브라우저 가능성 높음
- 인앱 브라우저에서 `window.open()`은 팝업 차단될 수 있음
- `<a href="..." target="_blank" rel="noopener noreferrer">`가 가장 안정적
- 인앱 브라우저가 target="_blank"를 무시하는 경우에도, 현재 탭에서 이동하므로 사용자 경험에 문제 없음

**트레이드오프**: JavaScript로 클릭 추적/딜레이를 넣기 어려움. 하지만 MVP에서 애널리틱스는 제외 사항.

---

### ADR-008: SSG (Static Site Generation) 선택
**결정**: next build로 완전 정적 HTML을 생성하여 배포
**이유**:
- 모든 데이터가 빌드 타임에 확정 (API 호출 없음)
- CDN에서 직접 서빙 → TTFB 최소
- 서버 비용 0 (Vercel 무료 플랜의 정적 사이트)
- 서버 장애 위험 0 (서버가 없으므로)

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| SSR (서버 사이드 렌더링) | 요청 시 최신 데이터 | 데이터가 정적이므로 SSR 불필요. Serverless 함수 호출 비용 발생 |
| ISR (Incremental Static Regeneration) | 주기적 갱신 | 갱신할 동적 데이터 없음 |
| CSR (클라이언트 렌더링) | 서버 부하 0 | 초기 빈 화면 (SEO 불리, LCP 저하) |

**구현 상세**:
- `next.config.ts`에 `output: "export"` 설정 → `out/` 디렉토리에 완전 정적 파일 생성
- `output: "export"` 사용 시 `next/image`의 런타임 이미지 최적화가 비활성화됨 → `images: { unoptimized: true }` 설정 필수
- 스크린샷은 사전에 WebP로 최적화하여 `public/screenshots/`에 배치

**트레이드오프**: 데이터 변경 시 재빌드+재배포 필요. 하지만 git push 한 번이면 Vercel이 자동 처리 (1분 내). `next/image` 자동 최적화를 포기하지만, 이미지가 소수이므로 수동 최적화로 충분.

---

### ADR-009: 404 페이지 커스터마이징
**결정**: 우주 테마에 맞는 커스텀 404 페이지 제공
**이유**:
- 싱글 페이지 사이트이므로 `/about`, `/contact` 등 잘못된 URL로 접근 가능
- 기본 Next.js 404는 테마와 어울리지 않음
- 사용자를 홈으로 안내하여 이탈 방지

**구현**:
- `app/not-found.tsx`
- "우주에서 길을 잃었습니다" 메시지 + 홈으로 돌아가기 링크
- 별 배경은 layout.tsx에 있으므로 자동 적용

**트레이드오프**: 추가 컴포넌트 1개. 하지만 사용자 경험 개선 효과가 큼.

---

### ADR-010: 폰트 로딩 전략
**결정**: next/font/google로 빌드 타임 다운로드 + self-hosting + font-display: swap
**이유**:
- Google Fonts CDN 의존 제거 → 프라이버시 + 성능
- 빌드 시 폰트 파일이 프로젝트에 포함 → CDN 장애 무관
- font-display: swap으로 FOUT(Flash of Unstyled Text) 허용
  - FOIT(Flash of Invisible Text)보다 나음: 콘텐츠가 즉시 보임
  - 모바일 저속 네트워크에서 특히 중요

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| Google Fonts CDN 직접 링크 | 설정 간단 | 외부 CDN 의존. GDPR 이슈 (EU 대상 아니지만). 추가 DNS 조회 |
| 시스템 폰트만 사용 | 로딩 0, 가장 빠름 | "톡톡 튀는" 디자인 요구와 맞지 않음. 개성 부족 |
| 유료 폰트 self-hosting | 더 독특한 서체 | 라이선스 비용. MVP에서 불필요 |

**트레이드오프**: 빌드 결과물 크기가 폰트 파일만큼 증가 (보통 100~300KB). CDN에서 서빙되므로 무시 가능.

---

### ADR-011: 앵커 링크 기반 네비게이션 (라우팅 대신)
**결정**: 각 앱 섹션에 `id`를 부여하고 URL 해시(`#app-id`)로 직접 접근. 별도 라우팅/페이지 분리 없음.
**이유**:
- **핵심 유스케이스 지원**: 게시판에 `mysite.com/#memory-palace` 형태로 특정 앱 링크를 공유 가능
- 앱이 2~3개이므로 개별 페이지로 분리하면 오히려 클릭 한 번이 더 필요해 이탈률 증가
- 싱글 페이지에서 스크롤로 다른 앱도 자연스럽게 발견 가능
- 히어로의 바로가기 버튼으로 원하는 앱으로 즉시 점프 가능

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| 개별 페이지 (`/apps/memory-palace`) | 앱별 고유 OG 이미지 가능. SEO 개별 최적화 | 앱 2개에 페이지 분리는 과잉. 다른 앱 발견이 어려워짐 |
| 탭/아코디언 UI | 한 화면에 모두 표시 | 우주 테마의 스크롤 경험과 맞지 않음. 모바일에서 탭이 작음 |

**트레이드오프**:
- 앵커 해시로는 앱별 OG 이미지를 다르게 설정 불가 (OG 태그는 페이지 단위)
- 앱이 10개 이상으로 늘면 개별 페이지로 마이그레이션 필요
- 현재 2~3개에서는 최적의 UX

---

### ADR-012: 플랫폼 감지 (서버 대신 클라이언트)
**결정**: 클라이언트에서 `navigator.userAgent`로 디바이스 감지, 다운로드 버튼 강조 순서 변경
**이유**:
- SSG 정적 사이트이므로 서버에서 요청별 userAgent를 읽을 수 없음
- 클라이언트 감지는 모든 환경에서 동작 (CDN, 인앱 브라우저 포함)
- 감지 실패해도 문제 없음: 모든 버튼이 보이고, 단지 강조가 없을 뿐

**구현 방식**:
- DownloadButtons 컴포넌트를 Client Component ("use client")로
- useEffect에서 마운트 시 1회 감지
- 초기 렌더 = 모든 버튼 동등 → 감지 후 강조 적용 → 하이드레이션 mismatch 없음
- 버튼을 숨기지 않고, 시각적 강조만 변경 (opacity, border 등)

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| SSR에서 UA 파싱 (middleware) | 서버에서 결정, 깜빡임 없음 | SSG 사이트에서는 middleware가 Serverless 함수 호출 → 비용 발생. 정적 배포 장점 상실 |
| Accept-CH (Client Hints) | 표준화된 방법 | Safari 미지원. 인앱 브라우저 미지원 가능성 |
| 감지 안 함 | 가장 단순 | 모바일에서 iOS 유저에게 Android 버튼이 먼저 보이면 혼란 |

**트레이드오프**: 클라이언트 감지 → 최초 렌더 시 잠깐 모든 버튼 동등 → useEffect 후 강조 적용. 이 "깜빡임"은 opacity/border 변화뿐이라 거의 인지 불가.

---

### ADR-013: App Store / Google Play 공식 배지 사용
**결정**: Apple과 Google의 공식 스토어 배지 SVG를 사용. 자체 디자인 버튼을 만들지 않음.
**이유**:
- **Apple 가이드라인**: App Store 링크에는 공식 "Download on the App Store" 배지를 사용해야 함. 자체 디자인 금지.
- **Google 가이드라인**: Play Store 링크에는 공식 "Get it on Google Play" 배지 사용 권장.
- 사용자가 공식 배지를 보면 신뢰감 → 다운로드 전환율 향상
- SVG로 프로젝트에 포함 → 외부 CDN 불필요, 네트워크 요청 0

**구현**:
- `public/badges/app-store.svg`, `public/badges/google-play.svg`
- 두 배지의 높이를 동일하게 맞춤 (40px 권장)
- 다크 배경에 맞는 배지 색상 버전 사용

**트레이드오프**: 배지 디자인을 커스터마이징할 수 없음 (브랜딩 자유도 제한). 하지만 스토어 정책 준수가 우선.

---

### ADR-014: 개인정보처리방침 페이지
**결정**: `/privacy` 경로에 별도 페이지로 개인정보처리방침 제공
**이유**:
- **App Store / Play Store 필수 사항**: 앱 등록 시 개인정보처리방침 URL 제출 필수
- 홈페이지에 `/privacy` 페이지를 두면 스토어 심사에 활용 가능
- 외부 서비스(Notion 페이지 등)에 의존하지 않고 자체 호스팅

**대안 검토**:
| 대안 | 장점 | 탈락 이유 |
|------|------|-----------|
| Notion 페이지 링크 | 수정 쉬움, 즉시 반영 | 외부 서비스 의존. Notion 장애 시 접근 불가. 비전문적 인상 |
| 메인 페이지 내 섹션 | 별도 페이지 불필요 | 메인 페이지가 길어짐. 우주 테마 흐름 깨짐 |
| 외부 개인정보 생성 서비스 | 법률 문구 자동 생성 | 외부 의존. 디자인 불일치 |

**트레이드오프**: 법률 문구를 직접 작성해야 함. 하지만 인디 앱 수준에서는 간결한 방침으로 충분.

---

### ADR-015: Tailwind v4 CSS-first 설정
**결정**: `tailwind.config.ts` 대신 `globals.css`의 `@theme` 디렉티브로 Tailwind 커스터마이징
**이유**:
- Tailwind CSS v4는 CSS-first 설정 방식으로 전환됨
- `tailwind.config.ts` 파일이 아닌 CSS 내 `@theme` 블록에서 색상, 폰트, 간격 등을 정의
- PostCSS 플러그인으로 통합: `postcss.config.mjs`에서 `@tailwindcss/postcss` 사용
- 프로젝트의 OKLCH 커스텀 색상을 `@theme`에서 직접 정의 가능

**구현**:
- `postcss.config.mjs`: `@tailwindcss/postcss` 플러그인 등록
- `app/globals.css`: `@import "tailwindcss"` + `@theme` 블록에 커스텀 토큰 정의

**트레이드오프**: v3 문서/예시가 더 많아 참고 자료가 제한적. 하지만 v4가 공식 최신 버전이고 CSS-in-CSS 방식이 더 직관적.

---

### ADR-016: Web Manifest 없이 기본 favicon만 제공
**결정**: PWA manifest를 생성하지 않음. favicon과 Apple Touch Icon만 제공.
**이유**:
- 이 사이트는 PWA가 아님 — 오프라인 지원, 설치 프롬프트 불필요
- manifest.json을 넣으면 일부 브라우저가 "설치" 프롬프트를 표시할 수 있음 → 혼란
- favicon + Apple Touch Icon만으로 브라우저 탭/북마크 아이콘 충분

**트레이드오프**: 모바일 홈 화면 추가 시 이름/아이콘이 최적화되지 않을 수 있음. 하지만 홈 화면 추가 사용자는 극소수.

---

### ADR-017: 멀티 은하 시스템 (v2)
**결정**: 단일 스크롤 페이지 → 3개 은하(태양계/운석지대/성운) 전환 구조로 변경
**이유**:
- 앱이 4개로 늘고 개발 중/아이디어 단계 앱도 표현해야 함
- 출시 앱(행성), 개발 중(운석), 미래(성운)를 시각적으로 분리
- 은하 전환이 "우주 탐험" 컨셉에 더 부합

**구현**:
- GalaxyExplorer가 전체 상태 관리 (현재 은하, 전환 애니메이션)
- 방향키(← →) + 하단 네비게이션으로 전환
- 하이퍼스페이스 이펙트로 전환 연출
- 마지막 방문 은하를 localStorage에 저장

**트레이드오프**: 앵커 링크로 특정 앱에 직접 접근하는 기능 상실. 하지만 앱이 소수이므로 전환 비용이 낮음.

---

### ADR-018: 은하별 배경 차별화
**결정**: 각 은하에 고유한 시각적 분위기 부여 (tint, haze, bands)
**이유**:
- 은하 전환 시 "다른 공간에 왔다"는 느낌을 즉시 전달
- 성운: 보라 tint + 가스 밴드, 운석지대: amber tint + 황야 dustHaze, 태양계: 기본 + 렌즈플레어

**구현**:
- StarfieldV2에 `tint`, `gasBands`, `dustHaze` prop 추가
- tint: 30% 확률로 별에 색조 적용
- gasBands/dustHaze: Canvas에 linear gradient 오버레이
- 은하 데이터(galaxies.ts)에 배경 설정 포함

---

### ADR-019: 렌즈플레어 / 유성 랜덤화
**결정**: CSS 고정 애니메이션 → JS 기반 완전 랜덤으로 전환
**이유**:
- CSS 고정 경로는 반복 시청 시 부자연스러움
- 매번 다른 위치, 각도, 속도, 개수로 자연스러운 우주 느낌

**구현**:
- Comets: Web Animations API로 랜덤 궤적 (방향, 속도, 꼬리 길이)
- LensFlare: 랜덤 광원 위치, 줄기 2~5개, 각도/길이/두께 모두 랜덤
- 두 컴포넌트 모두 prefers-reduced-motion 지원

---

### ADR-020: 토스 QR 후원 (EarthZoom)
**결정**: 지구 버튼 → 6단계 줌인 → 토스 QR 후원 카드
**이유**:
- 후원 기능을 재미있는 인터랙션으로 제공 (지구→우리집 줌인)
- 토스 QR 하나로 단순화 (Buy me a coffee 등 불필요)
- SVG 지도로 줌인 구현 (viewBox 전환) — 외부 지도 라이브러리 불필요

**구현**:
- Earth.tsx: 히어로 타이틀 상단에 작은 파란 지구 (halo 맥동)
- EarthZoom.tsx: ZOOM_STAGES 6단계, SVG viewBox 전환으로 줌인 시뮬레이션
- HousePanel: 마지막 단계에 토스 QR 240px + 안내 텍스트
- ESC, 닫기 버튼, 방향키, progress dots 지원
