# 다음 세션 핸드오프

> 갱신: 2026-11-15

## 현재 상태

홈은 Claude Design 시안(`Homepage.dc.html`)대로 단순화된 앱 목록이다
(`components/Home.tsx`). 마을 기능·TMT·`/api/tmt`는 제거되었다. 후원·사용 내역은
`data/support.ts`가 비어 있어 빈 상태 문구만 보인다.

## 남은 일

- `data/support.ts`의 `supportLinks`(Fairy, Buy me a coffee URL)와 실제 내역을 채운다.
- `0.shipping/todayopen/shipping.yml`의 `app.status`가 sync 검증을 통과하지 못해
  `node scripts/sync-apps.mjs --check`와 `tests/sideload-links.test.mjs` 3건이 실패한다
  (이번 변경과 무관한 기존 문제).
- Apple Watch 필터는 레지스트리에 watch 정보가 없어 넣지 않았다.
- 375/768/1440px 시각 확인은 아직 하지 않았다.

## 검증 명령

```bash
npm run lint
npm run build
npm run test
```
