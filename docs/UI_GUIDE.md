# UI 디자인 가이드

## 디자인 원칙
1. "우주를 여행하는 느낌" — 스크롤이 곧 탐험. 행성을 만나며 앱을 발견한다.
2. "3초 안에 파악" — 앱이 뭔지, 어디서 받는지 즉시 알 수 있어야 한다.
3. "모바일에서 먼저" — 게시판 링크 클릭 → 모바일 유저가 대다수. 모바일 경험이 기준.

## AI 슬롭 안티패턴 — 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| backdrop-filter: blur() | glassmorphism은 AI 템플릿의 가장 흔한 징후 |
| gradient-text (background-clip: text + gradient) | AI 슬롭 1위. Impeccable 절대 금지 항목 |
| border-left > 1px 컬러 스트라이프 | AI가 만든 대시보드/카드의 가장 흔한 장식. Impeccable 절대 금지 항목 |
| box-shadow 글로우 애니메이션 | 네온 글로우 = AI 슬롭 |
| 보라/인디고/시안 그라디언트 | "AI = 보라색" 클리셰. 우주 테마라도 피한다 |
| 모든 카드에 동일한 rounded-2xl | 균일한 둥근 모서리는 템플릿 느낌 |
| 배경 gradient orb (blur-3xl 원형) | AI 랜딩 페이지 단골 장식 |
| bounce/elastic 이징 | 촌스럽고 구식. 자연스러운 감속(ease-out-quart) 사용 |
| 카드 안에 카드 중첩 | 시각적 노이즈. 계층 구조 평탄화 |
| 모든 버튼을 primary 스타일 | 계층 구조 없음. ghost/text 버튼 활용 |

## 색상 (OKLCH 기반)
### 배경
| 용도 | 값 |
|------|------|
| 우주 배경 | oklch(0.05 0.01 260) — 거의 검정, 미세한 남색 틴트 |
| 앱 카드 영역 | oklch(0.08 0.01 260) — 배경보다 살짝 밝음 |

### 텍스트
| 용도 | 값 |
|------|------|
| 주 텍스트 | oklch(0.95 0.005 260) — 순백 아닌 약간 따뜻한 백색 |
| 본문 | oklch(0.75 0.01 260) |
| 보조 | oklch(0.55 0.01 260) |

### 행성별 액센트
| 행성 | 색조 | 용도 |
|------|------|------|
| 기억의궁전 | 따뜻한 주황/호박 (hue ~60-80) | 행성 gradient, 다운로드 버튼 hover |
| 제주택배비지원 | 차가운 청록 (hue ~200-220) | 행성 gradient, 다운로드 버튼 hover |
| CallNinja | 녹색/에메랄드 (hue ~155) | 행성 gradient |
| SpamCall070 | 붉은 톤 (hue ~25) | 행성 gradient |

### 은하별 배경 톤
| 은하 | 배경 특성 |
|------|-----------|
| 태양계 | 기본 우주 (남색), 렌즈플레어 |
| 운석 지대 | amber/brown dustHaze, 따뜻한 star tint (hue 50) |
| 빛나는 성운 | 보라 gasBands, 보라 star tint (hue 280) |

#### 행성 1 gradient 값 (따뜻한 가스 행성)
| 역할 | OKLCH 값 |
|------|----------|
| 밝은 면 (광원) | oklch(0.80 0.15 70) |
| 중간 톤 | oklch(0.60 0.14 65) |
| 어두운 면 | oklch(0.35 0.10 60) |
| 그림자 | oklch(0.15 0.05 55) |
| 외부 glow | oklch(0.60 0.14 65 / 0.15) |

#### 행성 2 gradient 값 (차가운 얼음 행성)
| 역할 | OKLCH 값 |
|------|----------|
| 밝은 면 (광원) | oklch(0.78 0.10 210) |
| 중간 톤 | oklch(0.55 0.12 205) |
| 어두운 면 | oklch(0.32 0.08 200) |
| 그림자 | oklch(0.14 0.04 200) |
| 외부 glow | oklch(0.55 0.12 205 / 0.15) |

## 컴포넌트
### 은하 섹션
- PlanetSection: 행성 + ObjectContentCard + DownloadButtons (72vh)
- AsteroidSection: 운석 + ObjectContentCard (62vh, 클릭 시 모달)
- NebulaSection: 성운 오브 + ObjectContentCard (68vh)
- 모든 섹션은 SectionShell로 감싸 negative margin overlap 처리

### 후원 카드 (HousePanel)
- 420px 너비, 우하단 고정
- 토스 QR 240px 세로 중앙 레이아웃
- 어두운 배경 (oklch 0.07), 흰색 QR 영역

### 다운로드 버튼
- 플랫폼 배지 스타일 (App Store / Google Play 공식 배지)
- 텍스트 링크 ("웹에서 바로 사용 →")
- 플랫폼 감지로 관련 버튼 강조

## 레이아웃
- 은하 전환: 하이퍼스페이스 이펙트 (700ms)
- 히어로: 중앙 정렬, 72vh
- 섹션 overlap: 인접 섹션이 -20vh씩 겹침 (z-index 순차 증가)
- 간격: 섹션 간 넉넉한 여백 (우주의 빈 공간 느낌)

## 타이포그래피
| 용도 | 스타일 |
|------|--------|
| 히어로 제목 | 디스플레이 서체, fluid clamp(2rem, 5vw, 4rem), font-weight 700 |
| 앱 이름 | 디스플레이 서체, text-3xl, font-weight 600 |
| 앱 설명 | 본문 서체, text-lg, leading-relaxed |
| 버튼 텍스트 | 본문 서체, text-sm, font-weight 500 |

- 디스플레이: Impeccable 가이드에 따라 선택 (Inter, Roboto 등 금지 목록 제외)
- 본문: 가독성 우선의 서체

## 애니메이션
- 별 반짝임: sin(time) 기반 opacity 변화 (Canvas, rAF)
- 유성: 랜덤 궤적, Web Animations API, 6~24초 간격 스폰
- 렌즈플레어: 랜덤 광원/줄기, 8~22초 간격, 1.2~2.4초 지속 (태양계만)
- 은하 전환: Hyperspace 이펙트 700ms, opacity fade
- 지구 halo: 4s ease-in-out infinite alternate (CSS)
- 후원 카드: panel-rise 420ms cubic-bezier(.2,.8,.2,1)
- 운석 drift: CSS keyframe 개별 궤도
- 성운 float: CSS keyframe 부유
- prefers-reduced-motion: 모든 애니메이션 비활성화

## 반응형
| 뷰포트 | 조정 |
|--------|------|
| 모바일 (~640px) | 행성 크기 축소, 스크린샷 풀 너비, 세로 스택 |
| 태블릿 (641~1024px) | 행성 중간 크기, 스크린샷 + 텍스트 나란히 가능 |
| 데스크탑 (1025px~) | 행성 대형, 콘텐츠 좌측 + 스크린샷 우측 배치 |
