# 프로젝트: 닌자거북의홈 (HOMEninja)

## 역할

게시판에서 유입된 방문자가 10개 앱을 빠르게 이해하고, 자신의 플랫폼에 맞는
다운로드 링크와 GitHub 신고 링크를 찾는 공개 앱 카탈로그다. 제품 표면은 밝은
낮의 손그림 마을인 「모여봐 앱마을」이다.

## 기술 규칙

- Next.js 15 App Router, TypeScript strict mode, Tailwind CSS v4.
- 공개 라우트는 정적 우선. `/api/tmt`만 관리자 편집을 위한 Serverless API다.
- `0.shipping/*/shipping.yml` → `scripts/sync-apps.mjs` →
  `data/apps.generated.ts`가 유일한 앱 정보 라인이다.
- `data/apps.ts`는 생성 레지스트리의 조회 계층이고,
  `data/village-visuals.ts`는 앱 id로 결합하는 표현 계층이다.
- 새 의존성, 외부 런타임 요청, Three.js, GSAP를 추가하지 않는다.
- 폰트는 `next/font`로 빌드 타임 self-host하고 Fluent Emoji는
  `public/village/`에 포함한다.

## 제품 규칙

- Mac 나무와 iPhone 나무에 앱 잎을 나눠 보여주고, 미출시 앱도 항상 목록에
  표시한다. `나무 흔들기`는 발견을 돕는 보조 동작이지 유일한 탐색 수단이 아니다.
- 제주택배비지원은 다운로드 카드가 아니라 그루터기에서 퇴역 상태로 보여준다.
- 주민 신청은 선택 사항이며 이름·동물·기기만 로컬 저장한다. 이메일 필드와
  이메일 신고 경로는 없다.
- TMT 게시판과 관리자 편집은 마을 게시판에 유지한다.
- 앱 상세 정보는 생성 레지스트리에서만 읽고, 다운로드·신고·privacy·support
  링크를 임의로 복제하지 않는다.
- 법적 페이지에 필요한 연락처를 제외하고 이메일 주소와 `mailto:`를 추가하지
  않는다.

## 디자인 규칙

- sky 팔레트 하나만 사용한다. 색상은 OKLCH 시맨틱 토큰으로 정의한다.
- Jua는 제목, Gothic A1은 본문, 메타는 시스템 모노스페이스를 사용한다.
- 두꺼운 종이 테두리, 하드 섀도, 작은 회전으로 손그림 질감을 만든다.
- 모바일 세로 스택을 기준으로 하고 320px 이상에서 가로 스크롤이 없어야 한다.
- gradient-text, 좌우 컬러 스트라이프, backdrop blur, 네온 글로우, 흐린 orb,
  카드 중첩, 보라/인디고/시안 클리셰를 금지한다.
- 의미 있는 착지 반동과 간판/버튼의 면 채우기만 문서화된 예외로 허용한다.
- `prefers-reduced-motion: reduce`에서도 10개 앱, 다운로드, 신고 링크가
  모두 즉시 보인다.

## 검증

변경 후 다음 세 명령을 실행한다.

```bash
npm run lint
npm run build
npm run test
```

광범위한 UI 변경은 375px, 768px, 1440px에서 렌더와 가로 스크롤을 확인하고,
Playwright 스크린샷을 `output/playwright/` 아래에 저장한다.
