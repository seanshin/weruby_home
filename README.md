# WeRuby 홈페이지 리디자인

위루비(WeRuby)의 현대적이고 깔끔한 홈페이지 디자인입니다.

## 🎨 디자인 특징

### 모던한 UI/UX
- **그라디언트 배경**: 보라색-파란색 그라디언트로 현대적이고 테크한 느낌
- **카드 기반 레이아웃**: 깔끔한 카드 디자인으로 정보 구조화
- **부드러운 애니메이션**: 스크롤 애니메이션과 호버 효과
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

### 섹션 구성
1. **Hero Section**: 대형 히어로 배너와 CTA 버튼
2. **Vision Section**: 3가지 핵심 비전 카드
3. **Solutions Section**: AI 기반 의료 솔루션 3가지
4. **Technology Section**: 디지털 노마드 기술 소개
5. **Alliance Section**: 우리들병원 파트너십
6. **CTA Section**: 행동 유도 섹션
7. **Contact Section**: 문의 양식과 연락처
8. **Footer**: 회사 정보 및 링크

## 🚀 주요 기능

### 인터랙티브 요소
- ✅ 고정 네비게이션 바 (스크롤 시 변화)
- ✅ 햄버거 메뉴 (모바일)
- ✅ 부드러운 스크롤 애니메이션
- ✅ 섹션별 Intersection Observer
- ✅ 호버 효과 및 전환 애니메이션
- ✅ 패럴랙스 효과
- ✅ 폼 검증 및 제출

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
webapp/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 인터랙션
└── README.md       # 프로젝트 문서
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
- **http://localhost:8000**

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

### 원본 대비 개선점
1. **현대적인 디자인**: 플랫하고 미니멀한 디자인
2. **더 나은 가독성**: 명확한 타이포그래피와 간격
3. **향상된 UX**: 부드러운 애니메이션과 인터랙션
4. **모바일 최적화**: 완벽한 반응형 레이아웃
5. **성능 최적화**: 최소한의 의존성, 빠른 로딩

### 애니메이션 효과
- Fade-in 애니메이션
- 스크롤 기반 요소 등장
- 호버 시 카드 상승 효과
- 패럴랙스 스크롤링
- 스크롤 인디케이터

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
`index.html`에서 텍스트와 이미지 경로 수정

### 애니메이션 조정
`script.js`에서 타이밍과 효과 조정

## 📧 연락처

- **이메일**: career@weruby.co.kr
- **웹사이트**: www.weruby.co.kr

## 📄 라이선스

© 2024 WeRuby Co., Ltd. All rights reserved.

---

**Made with ❤️ for WeRuby**
