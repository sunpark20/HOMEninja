# 프로젝트: 닌자거북의홈 (HOMEninja)

## 기술 스택
- Next.js 15 (App Router, SSG)
- TypeScript strict mode
- Tailwind CSS v4
- Vercel 배포 (무료)

## 아키텍처 규칙
- CRITICAL: 순수 정적 사이트. API 라우트 사용하지 않는다. 앱 데이터는 `data/apps.ts`에 하드코딩.
- CRITICAL: 외부 라이브러리 최소화. 우주 배경(별, 행성)은 CSS + Canvas로만 구현. Three.js 등 3D 라이브러리 금지.
- CRITICAL: Impeccable 스킬(`.claude/skills/impeccable/`)의 디자인 가이드라인을 따른다. 특히 절대 금지 항목(gradient-text, border-left 스트라이프) 위반 금지.
- Server Components 기본. Canvas/스크롤 이벤트가 필요한 곳만 Client Component ("use client").
- 컴포넌트는 `components/`, 타입은 컴포넌트와 함께 또는 `types/`, 앱 데이터는 `data/`에 배치.

## 디자인 규칙
- 다크 모드 고정 (우주 테마)
- 색상은 OKLCH 사용. 순수 #000, #fff 금지.
- 모바일 퍼스트. 게시판에서 유입되는 모바일 사용자가 주 대상.
- 디자인 상세는 `docs/UI_GUIDE.md` 참조.

## 디자인 금지사항 (AI 슬롭 방지)
- CRITICAL: gradient-text (background-clip: text + gradient 배경) 금지. 텍스트는 단색만 사용.
- CRITICAL: border-left/right > 1px 컬러 스트라이프 금지. 카드, 리스트, 콜아웃, 알림 모두 해당.
- CRITICAL: backdrop-filter: blur() (glassmorphism) 금지.
- CRITICAL: box-shadow 글로우 애니메이션 (네온 이펙트) 금지.
- CRITICAL: 보라/인디고/시안 그라디언트 금지. 우주 테마여도 AI 클리셰 색상은 피한다.
- CRITICAL: 배경 gradient orb (blur-3xl 원형 장식) 금지.
- CRITICAL: bounce/elastic 이징 금지. ease-out-quart 이상의 자연스러운 감속 사용.
- 전체 목록: `docs/UI_GUIDE.md`의 "AI 슬롭 안티패턴" 표 참조.

## 개발 프로세스
- 커밋 메시지는 conventional commits 형식을 따를 것 (feat:, fix:, docs:, refactor:)

## 빌드 & 검증
- Stop hook이 매 작업 종료 시 `npm run lint && npm run build && npm run test`를 자동 실행한다.
- 이 세 명령이 모두 통과해야 작업이 완료된 것으로 간주한다.

## 명령어
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (SSG)
npm run lint     # ESLint
npm run start    # 프로덕션 서버 로컬 테스트

## 참조 문서
- `docs/PRD.md` — 제품 요구사항
- `docs/ARCHITECTURE.md` — 아키텍처 및 디렉토리 구조
- `docs/ADR.md` — 아키텍처 결정 기록
- `docs/UI_GUIDE.md` — UI 디자인 가이드 (색상, 타이포, 컴포넌트, 애니메이션)
