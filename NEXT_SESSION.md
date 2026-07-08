# 다음 세션 핸드오프

> 작성: 2026-04-24
> 이 문서 하나만으로 새 세션이 컨텍스트 없이 이어받을 수 있게 작성됨.

## TL;DR — 새 세션에서 바로 할 일

`/impeccable teach`를 실행해서 디자인 컨텍스트(`.impeccable.md`)를 설정한다. 현재 impeccable 스킬이 설치돼 있지만 `.impeccable.md`가 없어서, craft/extract 모드를 쓸 때마다 매번 컨텍스트 질문을 받게 된다.

## 프로젝트 현재 상태

- 경로: `/Users/sunguk/0.code/0.shipping/HOMEninja`
- 브랜치: `main` (origin/main 대비 4 커밋 ahead, 아직 push 안 됨)
- 최신 커밋: `d499a8d refactor: 인라인 oklch 색상을 CSS 변수로 추출`
- 빌드: lint + build 통과 (테스트는 `echo 'No tests yet'`)
- `package-lock.json` 변경 커밋 안 됨 (npm install로 node_modules 재생성 시 발생)

## 이번 세션 성과

| 항목 | 내용 |
|---|---|
| 미사용 디렉토리 삭제 | `phases/` (빈 JSON), `scripts/` (execute.py harness 도구 + 테스트) 제거. 981줄 삭제. `.vercelignore`에서도 해당 항목 정리 |
| impeccable 스킬 정리 | `SKILL.md`의 `<post-update-cleanup>` 일회성 섹션 제거 (deprecated 파일 없음 확인 완료) |
| 색상 토큰 시스템 도입 | `globals.css`에 10개 시맨틱 CSS 변수(`--c-title`, `--c-heading`, `--c-body` 등) 정의. 6개 파일(layout, not-found, privacy 3페이지, TmtSection, AdminEditModal)에서 40+ 인라인 oklch를 `var()` 참조로 교체 |
| privacy 페이�� 정리 | section 5 "앱별 추가사항"의 불필요한 wrapper `<div>` 제거 |
| `/simplify` 스킬 적용 | 3-agent 병렬 리뷰(코드 재사용, 품질, 효율성) 실행 → 색상 중복과 불필요 JSX 발견 및 수정 |

## 미완료 TODO (우선순위 순)

1. **`/impeccable teach` 실행** ⭐⭐⭐ | 0.5시간
   - 파일: `.impeccable.md` (새로 생성됨)
   - 왜: impeccable 스킬이 디자인 작업 전에 매번 사용자에게 브랜드/대상/톤 질문�� 해야 한다. teach를 한 번 실행하면 이후 모든 디자인 작업에서 자동으로 참조됨.

2. **남은 UI 컴포넌트에 CSS 변수 확장 적용** ⭐⭐ | 1~2시간
   - 파일: `components/HeroV2.tsx`, `components/GalaxyNav.tsx`, `components/GalaxyIntro.tsx`, `components/ObjectContentCard.tsx`, `components/AsteroidModal.tsx`, `components/DownloadButtons.tsx`
   - 왜: 이 컴포넌트들도 `oklch(0.95 0.005 260)` 등 시맨틱 토큰과 동일한 값을 인라인으로 사용 중. 장식용 컴포넌트(Earth, Planet, Asteroid 등)는 고유 색이라 제외 대상.

3. **로컬 커밋 4개 push** ⭐⭐
   - 왜: 이번 세션 작업물이 origin에 반영 안 됨. 사용자 확인 후 push 필요.

## 주요 파일 맵

```
app/globals.css          ← 색상 CSS 변수 정의 (:root)
app/layout.tsx           ← 전역 레이아웃, --c-heading/--c-dim 사용
app/privacy/page.tsx     ← 메인 개인정보처리방침 (section 5 "앱별 추가사항" 포함)
app/privacy/callninja/   ← CallNinja 개인정보처리방침
app/privacy/spamcall070/ ← SpamCall070 개인정보처리방침
.claude/skills/impeccable/SKILL.md ← impeccable 스킬 (cleanup 섹션 제거됨)
```
