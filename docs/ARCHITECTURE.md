# 아키텍처

```
app/[locale]/[[...slug]]/page.tsx   # "/" → Home, 나머지는 법적 페이지
app/[locale]/layout.tsx             # html lang, 메타데이터
app/globals.css                     # 토큰, 법적/about 규칙, 홈 .h-* 규칙
components/
├── Home.tsx                        # Server: 헤더·앱·후원·사용 조립
├── AppList.tsx                     # Server: Mac/iPhone 이름 목록
├── SupportSection.tsx              # Server: SupportSection, SpendSection
└── LocalizedLegalPage.tsx          # 법적 페이지
data/
├── apps.generated.ts               # sync-apps.mjs 산출물(직접 편집 금지)
├── apps.ts                         # 레지스트리 조회 계층
└── support.ts                      # 후원·사용 내역, 후원 링크
i18n/                               # ko/en 사전 (HomeDictionary)
```

## 데이터 흐름

```
0.shipping/*/shipping.yml → scripts/sync-apps.mjs → data/apps.generated.ts
                                                        └─ data/apps.ts → Home → AppList
data/support.ts → SupportSection / SpendSection
```

공개 정보는 빌드 시 정적 HTML로 포함된다. 클라이언트 상태는 없다.
