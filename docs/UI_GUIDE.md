# 홈 UI 가이드

calebporzio.com/projects 구성을 따른 텍스트 목록 홈이다.

## 구조

1. 헤더: 왼쪽 큰 파란 사이트명, 오른쪽 아이콘 두 개(문제 신고 깃발, 언어 전환 지구본), 아래 가로선
2. 본문(최대 640px 가운데): 페이지 제목 없이 `h2` Mac / iPhone → 굵은 파란 링크 이름만 있는 점 목록
3. 후원 현황: Fairy / Buy me a coffee 링크 점 목록, 내역이 있으면 총액과 이력
4. 사용 내역: 항목 점 목록(영수증 링크), 남은 금액
5. 푸터 없음. 앱 설명과 앱별 신고·개인정보·지원 링크는 홈에 두지 않는다.

## 실측 수치 (calebporzio.com/projects)

| 요소 | 값 |
| --- | --- |
| 본문 | 16px/1.4 system-ui, 글자 ≈#363636 |
| 헤더 | flex space-between, padding .5rem 2rem, 아래 1px 선, 브랜드 2.2em/600 |
| 메뉴 | 16px/400, 구분자 `&nbsp;&nbsp;•&nbsp;&nbsp;` |
| 본문 컬럼 | 헤더 아래 2rem, max-width 640px, padding 2rem |
| h1 / h2 | 2.2em(mt 0) / 1.5em(mt .83em), mb 12px, 600 |
| ul / li | margin 1em 0, padding-left 40px / margin 1rem 0, line-height 1.7 |
| 링크 | ≈#0076d1, strong(600) 안, hover 밑줄 |
| ≤599px | 헤더 세로 쌓기, padding-bottom 1em |

## 토큰

배경 `oklch(0.995 0 0)`, 글자 `oklch(0.37 0 0)`, 제목 `oklch(0.1 0 0)`, 링크 `oklch(0.57 0.17 250)`, 보조 `oklch(0.5 0 0)`. 스타일은 `app/globals.css`의 `.h-*`.

## 상태

- released: 이름이 첫 다운로드 링크
- unreleased: 링크 없이 회색 이름 + `곧 만나요`
- retired: 목록에서 제외
- 후원·사용 데이터가 비어 있으면 빈 상태 한 줄. 후원 URL이 `null`이면 안내 문구.

## 반응형

640px 이하에서 헤더 여백과 글자를 줄이고 메뉴는 줄바꿈한다. 가로 스크롤 없음.
