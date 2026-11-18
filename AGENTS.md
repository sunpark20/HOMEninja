# AGENTS.md

HOMEninja는 `shipping.yml`에서 공개 앱 정보를 생성하는 Next.js 정적 우선
앱 목록 사이트다. 이 파일은 시작 가드레일만 담고, 세부 결정은 `docs/`를
참조한다.

## 불변 규칙

- Server Component를 사용한다. 현재 홈에는 Client Component가 없다.
- 앱의 사실 데이터는 `/Users/sunguk/0.code/0.shipping/*/shipping.yml`에서
  온다. `data/apps.generated.ts`는 `scripts/sync-apps.mjs`의 산출물이며 직접
  편집하지 않는다.
- 후원·사용 내역은 `data/support.ts`가 유일한 원천이다. 실제 내역이 없으면 빈
  배열로 두고 가짜 금액·이름을 넣지 않는다.
- 공개 사이트에는 이메일 신고 경로를 만들지 않는다. 신고는 레지스트리에서
  파생한 GitHub Issue Form 링크만 사용한다. 법적 페이지에 필요한 연락처만
  privacy/support 문서 안에 예외적으로 둘 수 있다.
- 방문자 정보를 수집하지 않는다. 계정, 서버 전송, localStorage 저장이 없다.
- 운영 API는 없다. 모든 공개 라우트는 정적이다.
- 런타임 CDN, Iconify, jsDelivr, GSAP, 외부 폰트 요청, Three.js를 추가하지 않는다.
  웹폰트 없이 system-ui를 쓴다.
- 색상은 OKLCH 토큰을 사용하고 순수 `#000`/`#fff`를 쓰지 않는다. 모바일을
  먼저 설계하며 가로 스크롤을 만들지 않는다.

## UI 금지사항

`background-clip: text` 그라디언트 텍스트, 1px 초과 좌우 컬러 스트라이프,
`backdrop-filter` 유리 효과, 네온 글로우, 보라·인디고·시안 클리셰 그라디언트,
흐린 배경 오브, 카드 안 카드, 의미 없는 장식 반복을 사용하지 않는다.

모든 앱(미출시 포함)은 처음부터 목록에 보이고 키보드로 접근 가능해야 한다.
모션은 쓰지 않는다. 상세 규칙은
`docs/UI_GUIDE.md`에 기록한다.

## 문서·명령

- 요구사항: `docs/PRD.md`
- 구조와 데이터 흐름: `docs/ARCHITECTURE.md`
- 결정 기록: `docs/ADR.md`
- 시각 가이드: `docs/UI_GUIDE.md`
- `npm run lint`, `npm run build`, `npm run test`를 모두 통과시킨다.
- 커밋이 필요하면 `feat:`, `fix:`, `docs:`, `refactor:` 등 conventional
  commits를 사용한다.
