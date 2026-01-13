# WeRuby 홈페이지 리디자인

위루비(WeRuby)의 현대적이고 깔끔한 홈페이지 디자인입니다.

## 🎨 디자인 특징

### 모던한 UI/UX
- **그라디언트 배경**: 보라색-파란색 그라디언트로 현대적이고 테크한 느낌
- **카드 기반 레이아웃**: 깔끔한 카드 디자인으로 정보 구조화
- **부드러운 애니메이션**: 스크롤 애니메이션과 호버 효과
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

### 섹션 구성
1. **Hero Section**: 대형 히어로 배너와 일러스트, CTA 버튼
2. **Vision Section**: 3가지 핵심 비전 카드 (SVG 아이콘)
3. **Solutions Section**: AI 기반 의료 솔루션 3가지 (클릭 가능한 카드)
4. **Technology Section**: 디지털 노마드 기술 소개
5. **Alliance Section**: 우리들병원 파트너십 (SVG 아이콘)
6. **CTA Section**: 행동 유도 섹션
7. **Contact Section**: 문의 양식과 연락처 (SVG 아이콘)
8. **Footer**: 회사 정보 및 링크

### 솔루션 상세 페이지
- **solutions.html**: 9단계 통합 의료 서비스 플로우 상세 설명
  - 각 단계별 맞춤형 SVG 일러스트
  - 3가지 주요 솔루션 상세 정보 및 대형 일러스트
  - 통계 섹션 (9단계, 3,000+ 병원, 85% 시간 단축, 24/7 서비스)

## 🚀 주요 기능

### 인터랙티브 요소
- ✅ 고정 네비게이션 바 (스크롤 시 변화)
- ✅ 햄버거 메뉴 (모바일)
- ✅ 부드러운 스크롤 애니메이션
- ✅ 섹션별 Intersection Observer
- ✅ 호버 효과 및 전환 애니메이션
- ✅ 패럴랙스 효과
- ✅ 폼 검증 및 제출
- ✅ 다크모드 토글
- ✅ 클릭 가능한 솔루션 카드 (상세 페이지 링크)

### 성능 최적화
- ✅ 폰트 비동기 로딩 (font-display: swap)
- ✅ 애니메이션 감소 선호 사용자 지원 (prefers-reduced-motion)
- ✅ 터치 디바이스 최적화 (커서 효과 자동 비활성화)
- ✅ 스크롤 이벤트 스로틀링
- ✅ 개발/프로덕션 모드 분리

### 접근성 (a11y)
- ✅ ARIA 속성 완전 지원
- ✅ 키보드 네비게이션 (Alt+H: 홈, Alt+S: Solutions)
- ✅ 스크린 리더 지원
- ✅ 포커스 관리
- ✅ 에러 메시지 접근성

### 에러 처리
- ✅ localStorage 안전 접근
- ✅ 네트워크 오류 처리
- ✅ 폼 검증 에러 처리
- ✅ 개발 모드에서만 콘솔 로그 출력

### 아이콘 및 일러스트 시스템
- ✅ **Favicon**: WeRuby 브랜드 아이콘 (SVG)
- ✅ **Vision 아이콘**: AI 기반 의료 혁신, 블록체인 보안, 디지털 노마드
- ✅ **Solutions 아이콘**: Medical AI, S/W Platform, Healthcare & NFT
- ✅ **Technology 아이콘**: 병원 건물 SVG 일러스트
- ✅ **Alliance 아이콘**: 파트너십, R&D, 실증 사례
- ✅ **Contact 아이콘**: 이메일, 위치, 건물
- ✅ **9단계 서비스 플로우**: 각 단계별 맞춤형 SVG 일러스트
- ✅ **Hero 일러스트**: 병원 건물과 AI 파티클 애니메이션

### 기술 스택
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript (Vanilla)**: ES6+ 문법 사용
- **Google Fonts**: Noto Sans KR, Inter

## 📱 반응형 브레이크포인트

- **Desktop**: 1200px+
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🎯 디자인 철학

### 색상 팔레트
- **Primary**: #2563eb (파란색)
- **Secondary**: #10b981 (초록색)
- **Dark**: #0f172a (네이비)
- **Light**: #f8fafc (밝은 회색)
- **Gradient**: 보라-파랑 그라디언트

### 타이포그래피
- **한글**: Noto Sans KR
- **영문**: Inter
- **계층 구조**: 명확한 제목-본문 구분

### 간격 및 레이아웃
- **섹션 패딩**: 6rem (96px)
- **카드 간격**: 2rem (32px)
- **최대 너비**: 1200px

## 📂 파일 구조

```
weruby_home/
├── index.html          # 메인 HTML 파일
├── solutions.html      # 솔루션 상세 페이지 (9단계 서비스 플로우)
├── styles.css          # 스타일시트
├── script.js           # JavaScript 인터랙션
├── favicon.svg         # WeRuby 브랜드 아이콘
├── package.json        # npm 스크립트 및 프로젝트 정보
├── start.sh            # macOS/Linux 실행 스크립트
├── start.bat           # Windows 실행 스크립트
└── README.md           # 프로젝트 문서
```

## 🔧 사용 방법

### Localhost에서 실행하기

#### 방법 1: 실행 스크립트 사용 (권장)

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

#### 방법 2: npm 스크립트 사용

```bash
# Python 사용 (기본)
npm start

# Node.js http-server 사용
npm run serve

# 캐시 없이 개발 모드
npm run dev
```

#### 방법 3: 직접 명령어 실행

**Python 3:**
```bash
python3 -m http.server 8000
# 또는
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server -p 8000 -o
```

#### 방법 4: 브라우저에서 직접 열기
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

> ⚠️ **주의**: 브라우저에서 직접 파일을 열면 일부 기능(CORS, 모듈 등)이 제대로 작동하지 않을 수 있습니다. 가능하면 HTTP 서버를 사용하는 것을 권장합니다.

### 서버 접속

서버가 시작되면 브라우저에서 다음 주소로 접속하세요:
- **메인 페이지**: http://localhost:8000
- **솔루션 페이지**: http://localhost:8000/solutions.html

서버를 중지하려면 터미널에서 `Ctrl+C`를 누르세요.

## 🌐 배포 방법

### GitHub Pages로 배포
1. GitHub 저장소의 Settings > Pages로 이동
2. Source를 "Deploy from a branch" 선택
3. Branch를 "main"과 "/ (root)" 선택
4. Save 클릭
5. 몇 분 후 `https://yourusername.github.io/weruby_home` 에서 확인

### Cloudflare Pages로 배포
1. [Cloudflare Pages](https://pages.cloudflare.com/)에 로그인
2. "Create a project" 클릭
3. GitHub 저장소 연결
4. Build settings:
   - Framework preset: None
   - Build command: (비워두기)
   - Build output directory: /
5. "Save and Deploy" 클릭
6. 배포 완료 후 제공된 URL로 접속

### Vercel로 배포
1. [Vercel](https://vercel.com/)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 import
4. 설정 그대로 "Deploy" 클릭
5. 배포 완료 후 제공된 URL로 접속

### Netlify로 배포
1. [Netlify](https://www.netlify.com/)에 로그인
2. "Add new site" > "Import an existing project"
3. GitHub 저장소 연결
4. Build settings 그대로 두고 "Deploy" 클릭
5. 배포 완료 후 제공된 URL로 접속

## ✨ 주요 개선 사항

### 최신 업데이트 (2024)
1. **솔루션 상세 페이지 추가**: 9단계 통합 의료 서비스 플로우 상세 설명
2. **일러스트 시스템 구축**: 모든 이모지를 전문적인 SVG 아이콘으로 교체
3. **Hero 섹션 일러스트**: 병원 건물과 AI 파티클 애니메이션 추가
4. **로컬 개발 환경**: 실행 스크립트 및 npm 스크립트 추가
5. **브랜드 아이덴티티**: WeRuby 브랜드 아이콘 (favicon) 추가

### 원본 대비 개선점
1. **현대적인 디자인**: 플랫하고 미니멀한 디자인
2. **더 나은 가독성**: 명확한 타이포그래피와 간격
3. **향상된 UX**: 부드러운 애니메이션과 인터랙션
4. **모바일 최적화**: 완벽한 반응형 레이아웃
5. **성능 최적화**: 최소한의 의존성, 빠른 로딩
6. **시각적 품질**: 전문적인 SVG 일러스트 시스템
7. **사용자 경험**: 클릭 가능한 솔루션 카드 및 상세 페이지

### 애니메이션 효과
- Fade-in 애니메이션
- 스크롤 기반 요소 등장
- 호버 시 카드 상승 효과
- 패럴랙스 스크롤링
- 스크롤 인디케이터
- Hero 섹션 파티클 애니메이션
- 아이콘 호버 회전 효과
- 부드러운 페이지 전환

### SVG 일러스트 시스템
- 모든 아이콘을 SVG로 구현 (확장성 및 성능 최적화)
- WeRuby 브랜드 컬러 적용 (파란색-초록색 그라디언트)
- 반응형 크기 조정
- 다크모드 지원
- 접근성 향상 (스크린 리더 지원)

## 🎨 커스터마이징

### 색상 변경
`styles.css`의 `:root` 변수를 수정:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    /* ... */
}
```

### 콘텐츠 수정
- `index.html`: 메인 페이지 텍스트와 이미지 경로 수정
- `solutions.html`: 솔루션 상세 페이지 내용 수정

### 아이콘 및 일러스트 수정
- `favicon.svg`: 브랜드 아이콘 수정
- 각 HTML 파일의 인라인 SVG: 아이콘 및 일러스트 수정
- `styles.css`: 아이콘 스타일 및 애니메이션 조정

### 애니메이션 조정
`script.js`에서 타이밍과 효과 조정

## 🔗 페이지 링크

- **메인 페이지**: `index.html`
- **솔루션 상세 페이지**: `solutions.html`
  - 9단계 통합 의료 서비스 플로우
  - Medical AI 상세 정보
  - S/W Platform 상세 정보
  - Healthcare & NFT 상세 정보

## 📧 연락처

- **이메일**: career@weruby.co.kr
- **웹사이트**: www.weruby.co.kr

## 📄 라이선스

© 2024 WeRuby Co., Ltd. All rights reserved.

## 📊 프로젝트 통계

- **총 페이지**: 2개 (index.html, solutions.html)
- **SVG 아이콘**: 20+ 개
- **일러스트**: 15+ 개
- **반응형 브레이크포인트**: 3개
- **애니메이션 효과**: 10+ 개

## 🎯 주요 기능 요약

### 메인 페이지 (index.html)
- Hero 섹션 (일러스트 포함)
- Vision 섹션 (3가지 비전)
- Solutions 섹션 (3가지 솔루션, 클릭 가능)
- Technology 섹션
- Alliance 섹션
- Contact 섹션

### 솔루션 페이지 (solutions.html)
- 9단계 통합 의료 서비스 플로우
  - 사용자 요청 → AI 분석 → 맞춤형 추천 → 자동 예약 → 진료 전 준비
  - 진료 진행 → 진료 후 처리 → 보험 자동 처리 → 건강상태 모니터링
- 3가지 주요 솔루션 상세 정보
  - Medical AI
  - S/W Platform
  - Healthcare & NFT
- 통계 섹션

---

**Made with ❤️ for WeRuby**
