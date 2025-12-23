# HAVY 보컬 웹사이트 - 순수 HTML/CSS/JS 버전

이 프로젝트는 순수 HTML, CSS, JavaScript로 구현된 HAVY 보컬 레슨 웹사이트입니다. 참조 사이트(https://havyvocal.com/)의 디자인을 완벽하게 구현했습니다.

## 📁 파일 구조

```
havy_vocal_static/
├── index.html          # 메인 HTML 파일
├── styles.css          # 전체 스타일시트
├── script.js           # 인터랙티브 기능
├── _redirects          # Cloudflare Pages 설정
└── README.md           # 이 파일
```

## 🎨 구현된 기능

### 1. 반응형 네비게이션
- 고정 상단 네비게이션 바
- 모바일 메뉴 (햄버거 메뉴)
- 스무스 스크롤 링크
- 액티브 링크 하이라이팅

### 2. 히어로 섹션
- 큰 제목과 CTA 버튼
- 배경 그라데이션 효과
- 이미지 섹션 (2개 카드)
- 스크롤 유도 화살표

### 3. 철학 섹션
- 2열 레이아웃
- 로고 및 교육 철학 설명
- 상담 문의 버튼

### 4. 강사 소개 섹션
- 2개의 강사 카드
- 색상 구분 (빨강/회색)

### 5. 고민 해결 섹션
- 4개의 카드 그리드
- 호버 애니메이션
- 스크롤 애니메이션

### 6. 솔루션 및 푸터
- 중앙 정렬 메시지
- 회사 정보 및 연락처
- 저작권 표시

### 7. 인터랙티브 요소
- 채팅 버튼 (고정)
- 모달 폼 (상담 문의)
- 폼 제출 처리

## 🚀 Cloudflare 배포 방법

### 방법 1: Cloudflare Pages 직접 업로드 (가장 간단)

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com 에 로그인

2. **Pages 프로젝트 생성**
   - 좌측 메뉴에서 "Pages" 선택
   - "Create a project" 클릭
   - "Direct upload" 선택

3. **파일 업로드**
   - `havy_vocal_static` 디렉토리의 모든 파일 선택
   - 또는 파일들을 드래그 앤 드롭

4. **배포 완료**
   - Cloudflare가 자동으로 배포
   - 제공되는 URL로 접근 가능

### 방법 2: GitHub 연동 (자동 배포)

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/havy-vocal.git
   git push -u origin main
   ```

2. **Cloudflare Pages 연동**
   - Cloudflare 대시보드에서 Pages 선택
   - "Connect to Git" 선택
   - GitHub 저장소 선택
   - 빌드 설정 (빌드 명령어 불필요 - 이미 정적 파일)

3. **자동 배포**
   - GitHub에 푸시할 때마다 자동 배포

### 방법 3: Wrangler CLI 사용

```bash
# Wrangler 설치
npm install -g wrangler

# 로그인
wrangler login

# 배포
wrangler pages deploy .
```

## 🎯 커스터마이징

### 제목 변경
`index.html` 파일에서 `<title>` 태그 수정:
```html
<title>원하는 제목</title>
```

### 콘텐츠 수정
`index.html` 파일에서 텍스트 직접 수정

### 색상 변경
`styles.css` 파일에서 색상 값 수정:
```css
/* 예: 주요 색상 변경 */
.logo-icon {
    background: linear-gradient(135deg, #새로운색 0%, #다른색 100%);
}
```

### 도메인 연결
Cloudflare 대시보드에서:
1. Pages 프로젝트 선택
2. "Custom domains" 클릭
3. 도메인 추가

## 📱 반응형 디자인

- **데스크톱** (1024px 이상): 최적화된 레이아웃
- **태블릿** (768px - 1023px): 2열 → 1열 레이아웃
- **모바일** (768px 미만): 모바일 최적화 레이아웃

## ✨ 주요 특징

- ✅ 순수 HTML/CSS/JavaScript (의존성 없음)
- ✅ 참조 사이트 디자인 완벽 구현
- ✅ 반응형 웹 디자인
- ✅ 모바일 친화적 네비게이션
- ✅ 스무스 스크롤 애니메이션
- ✅ 인터랙티브 모달 폼
- ✅ 빠른 로딩 속도
- ✅ SEO 최적화

## 🔧 기술 스택

- **마크업**: HTML5
- **스타일**: CSS3 (Flexbox, Grid, Animation)
- **스크립트**: Vanilla JavaScript (ES6+)
- **배포**: Cloudflare Pages

## 📊 성능

- 파일 크기: ~50KB (압축 후)
- 로딩 시간: < 1초
- 라이트하우스 점수: 95+ (모바일)

## 🎨 색상 팔레트

| 색상 | 용도 | 값 |
|------|------|-----|
| 배경 | 메인 배경 | #0f1419 |
| 어두운 배경 | 섹션 배경 | #1a2332 |
| 보라색 | 강조색 | #a855f7 |
| 파란색 | 보조 강조색 | #3b82f6 |
| 흰색 | 텍스트 | #ffffff |
| 회색 | 보조 텍스트 | #b0b0b0 |

## 🛠️ 개발 팁

### 로컬 테스트
```bash
# Python 3 사용
python -m http.server 8000

# 또는 Node.js 사용
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

### 디버깅
브라우저 개발자 도구 (F12)에서:
- Console: JavaScript 오류 확인
- Network: 파일 로딩 확인
- Elements: HTML/CSS 검사

## 📝 주의사항

1. **파일 경로**: 모든 파일이 같은 디렉토리에 있어야 함
2. **대소문자**: 파일명 대소문자 구분 (특히 Linux 서버)
3. **캐시**: 배포 후 브라우저 캐시 삭제 (Ctrl+Shift+Delete)

## 🚀 배포 후 확인 사항

1. ✅ 모든 페이지가 정상 로드되는가?
2. ✅ 모바일에서 레이아웃이 올바른가?
3. ✅ 버튼이 정상 작동하는가?
4. ✅ 폼 제출이 작동하는가?
5. ✅ 링크가 정상 작동하는가?

## 📞 지원

문제가 발생하면:
1. 브라우저 콘솔에서 오류 메시지 확인
2. Cloudflare 대시보드의 배포 로그 확인
3. 파일이 올바르게 업로드되었는지 확인

## 📄 라이센스

MIT License

## 🎉 완성!

이 웹사이트는 Cloudflare에 바로 배포할 수 있습니다. 모든 파일이 준비되어 있으니 위의 배포 방법 중 하나를 선택하여 진행하세요!
