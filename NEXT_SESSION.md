# 다음 세션 핸드오프

> 갱신: 2026-08-12

## 현재 상태

HOMEninja는 `/Users/sunguk/0.code/1. myapp/HOMEninja`에 있다. 홈페이지는
`VillageExplorer` 기반 「모여봐 앱마을」로 전환되었고, Mac/iPhone 나무에
앱 10개가 모두 표시된다. 주민 신청은 이름·동물·기기만 localStorage에 저장하고,
TMT는 마을 게시판에서 기존 `/api/tmt`로 편집한다.

## 단일 원천

`/Users/sunguk/0.code/0.shipping/*/shipping.yml` →
`scripts/sync-apps.mjs` → `data/apps.generated.ts` → `data/apps.ts`다.
표현 데이터는 `data/village-visuals.ts`에만 둔다. Gnomon에는
`/privacy/gnomon`과 `/support/gnomon`을 추가해 10개 앱 모두 법적/지원 URL을
갖는다. errorreport의 `apps.json`도 같은 shipping에서 재생성한다.

## 검증 명령

```bash
npm run lint
npm run build
npm run test
node scripts/sync-apps.mjs --check
```

Playwright 스크린샷은 `output/playwright/`에 있으며 375px, 768px, 1440px에서
가로 스크롤이 없고 앱 잎 10개가 보이는 것을 확인했다. 런타임 네트워크에는
Iconify/jsDelivr/Google Fonts/GSAP 요청이 없다.

## 남은 감사

- report-kit와 10개 앱의 기존 P5 빌드 증적을 최종 보고에 합친다.
- 전 저장소 이메일 검색에서 법적 privacy/support 문서 외 결과가 없는지 다시
  확인한다. Earth는 리모트가 없는 로컬 보존 대상이며 push하지 않는다.
- App Store 제출·GitHub Release 공개는 사용자 명시 없이는 하지 않는다.
- MCP 원본 `.dc.html`은 인증되지 않아 내려받지 못했고,
  `docs/design/appvillage-v5.md`를 구현 참조로 사용했다.
