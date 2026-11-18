# 프로젝트: 닌자거북의홈 (HOMEninja)

## 역할

게시판에서 유입된 방문자가 앱을 빠르게 이해하고, 자신의 플랫폼에 맞는 다운로드
링크와 GitHub 신고 링크를 찾는 공개 앱 카탈로그다. 제품 표면은 calebporzio.com/projects처럼 헤더와 단일 컬럼 점 목록(앱 → 후원 현황 → 사용 내역)이다.

## 기술 규칙

- Next.js 15 App Router, TypeScript strict mode, Tailwind CSS v4.
- 모든 공개 라우트는 정적. 운영 API는 없다.
- `0.shipping/*/shipping.yml` → `scripts/sync-apps.mjs` →
  `data/apps.generated.ts`가 유일한 앱 정보 라인이고, `data/apps.ts`는 그 조회
  계층이다. 후원·사용 내역은 `data/support.ts`.
- 새 의존성, 외부 런타임 요청, Three.js, GSAP를 추가하지 않는다.
- 웹폰트 없이 system-ui를 쓴다(calebporzio.com/projects와 동일).

## 제품 규칙

- Mac / iPhone 그룹으로 앱을 나눠 보여주고 미출시 앱도 항상 표시한다(`곧 만나요`).
  퇴역(retired) 앱은 목록에서 제외한다.
- 앱 정보는 생성 레지스트리에서만 읽고, 다운로드 링크를 임의로 복제하지 않는다.
  홈에는 앱 이름만 두고 설명·앱별 신고/privacy/support 링크는 두지 않는다.
- 후원 내역이 비어 있으면 빈 상태 문구만 보여준다. 가짜 데이터를 넣지 않는다.
- 법적 페이지에 필요한 연락처를 제외하고 이메일 주소와 `mailto:`를 추가하지
  않는다.

## 디자인 규칙

- 흰 배경(`oklch(0.995 0 0)`), 파란 굵은 링크, 최대 폭 640px 단일 컬럼. 수치는 Water.css 실측값(`docs/UI_GUIDE.md`).
- 홈 스타일은 `app/globals.css`의 `.h-*` 클래스. 법적·about 페이지 규칙은 그대로 둔다.
- 모바일 세로 스택 기준, 320px 이상에서 가로 스크롤이 없어야 한다.
- gradient-text, 좌우 컬러 스트라이프, backdrop blur, 네온 글로우, 흐린 orb,
  카드 중첩, 보라/인디고/시안 클리셰를 금지한다.

## 검증

변경 후 다음 세 명령을 실행한다.

```bash
npm run lint
npm run build
npm run test
```

광범위한 UI 변경은 375px, 768px, 1440px에서 렌더와 가로 스크롤을 확인한다.
