# 아키텍처

## 디렉터리 구조

```text
app/
├── page.tsx                         # VillageExplorer 진입점
├── layout.tsx                       # self-host 폰트·메타·전역 CSS
├── globals.css                      # sky 토큰·마을 씬·반응형 스타일
├── privacy/                         # 통합·앱별 개인정보 페이지
├── support/                         # 앱별 지원 페이지
├── sitemap.ts                       # 레지스트리 기반 사이트맵
└── api/tmt/route.ts                 # 유일한 운영 API
components/
├── VillageExplorer.tsx              # 앱 숲·집·우편함·게시판 상태
├── VillageAdminEditModal.tsx        # 기존 TMT 인증/PUT UI
└── VillageIcon.tsx                  # 필요한 인라인 SVG 아이콘
data/
├── apps.generated.ts                # shipping.yml 생성 산출물
├── apps.ts                          # 레지스트리 조회 계층
├── village-visuals.ts               # id별 나무·잎·색 표현 데이터
├── tmt.ts / tmt.json                # 게시판 콘텐츠
scripts/sync-apps.mjs                # 로컬 source-of-truth 동기화
public/village/                      # self-hosted Fluent Emoji SVG
types/app.ts                         # Platform·DownloadLink
tests/                               # registry와 정적 계약 테스트
```

## 단일 데이터 라인

```text
0.shipping/*/shipping.yml
        │
        ├── errorreport/scripts/generate.py
        │       └── Issue Form 10개·apps.json·라벨 목록
        │
        └── HOMEninja/scripts/sync-apps.mjs
                └── data/apps.generated.ts
                        ├── data/apps.ts → VillageExplorer
                        └── app/sitemap.ts
```

생성 파일에는 공개 이름, 플랫폼, OS, 버전, 공개 다운로드·웹·신고 URL만
들어간다. 비공개 저장소명과 로컬 경로는 넣지 않는다. 표현 데이터는
`village-visuals.ts`에서 앱 id로 결합한다.

## 렌더링과 상태

`app/page.tsx`는 Server Component이며 `VillageExplorer`만 Client Component다.
클라이언트가 담당하는 것은 다음으로 한정된다.

- 잎 선택, 낙하/복원, 상세 모달
- 주민 localStorage 복원과 입주 모달
- 우편함 열림 상태
- TMT 관리자 모달 및 저장 후 메모리 오버라이드

공개 앱 정보는 빌드 시 정적으로 HTML에 포함된다. 주민 데이터는 서버로 보내지
않고, 관리자 비밀번호는 `sessionStorage`에서 API 요청에만 사용한다.

## 상호작용 흐름

```text
초기 렌더
  ├─ Mac 나무: 4잎
  ├─ iPhone 나무: 6잎 (미출시 포함)
  └─ localStorage 주민 복원

나무 흔들기
  └─ 첫 released 미낙하 잎 선택 → 짧은 shake → 지면 슬롯

잎 클릭
  └─ 레지스트리 상세 → 다운로드 / GitHub 신고 / privacy / support

입주하기
  └─ name·animal·device → localStorage → 집 상태 + 선물 잎

게시판 관리자 편집
  └─ /api/tmt 인증 → GitHub contents API → 로컬 override 즉시 반영
```

## 링크와 사이트맵

`app/sitemap.ts`는 앱 레지스트리의 `web.privacy`와 `web.support` 중 사이트
기준 URL로 시작하는 항목만 dedupe하여 추가한다. 외부 Notion·앱 문서 링크는
앱 상세에 표시되지만 홈 사이트맵에는 넣지 않는다.

## 접근성·성능

잎과 CTA는 실제 버튼/링크, 모달은 dialog semantics와 Escape 닫기를 사용한다.
모션이 꺼져도 앱 잎을 숨기지 않는다. 자산은 로컬 SVG이며 런타임 CDN 요청은
없다. 공개 라우트는 SSG, API만 동적이다.
