# 카카오 책 검색

카카오 도서 검색 API를 활용한 도서 검색 웹 애플리케이션입니다. CERTICOS BOOKS Figma 디자인을 기반으로 구현하였으며, 도서 검색·상세 검색·찜하기·검색 기록 기능을 제공합니다.

---

## 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| UI | React 18, TypeScript, styled-components |
| 서버 상태 | @tanstack/react-query v5 |
| 라우팅 | react-router-dom v6 |
| HTTP | axios |
| 데이터 소스 | Kakao Books Search API |

---

## 실행 방법 및 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. Kakao REST API 키 발급

1. [카카오 개발자](https://developers.kakao.com/)에 접속하여 로그인합니다.
2. 애플리케이션을 생성합니다.
3. 앱 요약 정보 페이지에서 **REST API 키**를 복사합니다.

### 3. 환경 변수 설정

프로젝트 루트의 `.env` 파일에 API 키를 입력합니다.

```
REACT_APP_KAKAO_REST_API_KEY=발급받은_키_입력
```

### 4. 개발 서버 실행

```bash
npm start
```

브라우저에서 http://localhost:3000 으로 접속합니다.

---

## 폴더 구조 및 주요 코드 설명

```
src/
├── api/
│   └── books.ts                    # Kakao Books API 클라이언트 (axios 인스턴스)
├── components/
│   ├── common/
│   │   ├── icons.tsx               # SVG 아이콘 컴포넌트
│   │   └── Pagination.tsx          # 공통 페이지네이션
│   ├── layout/
│   │   ├── Header.tsx              # 상단 내비게이션 (도서검색 / 내가 찜한 책)
│   │   └── Layout.tsx              # 페이지 래퍼
│   └── search/
│       ├── SearchBar.tsx           # 검색창 + 검색 기록 드롭다운
│       ├── AdvancedSearchModal.tsx # 상세 검색 팝업 (제목/저자/출판사 필터)
│       ├── BookList.tsx            # 도서 목록 / 빈 상태
│       ├── BookItem.tsx            # 도서 카드 (펼치기/접기, 찜하기)
│       └── ResultCount.tsx         # 검색 결과 건수
├── hooks/
│   ├── useBookSearch.ts            # React Query 기반 도서 검색
│   ├── useLikedBooks.ts            # 찜하기 상태 관리 (localStorage + 탭 간 동기화)
│   └── useSearchHistory.ts         # 검색 기록 관리 (localStorage)
├── pages/
│   ├── SearchPage.tsx              # 도서 검색 페이지
│   └── LikedPage.tsx               # 내가 찜한 책 페이지
├── styles/
│   ├── GlobalStyle.ts              # CSS 변수 디자인 토큰 (색상, 폰트, 간격 등)
│   └── breakpoints.ts              # 반응형 미디어 쿼리 헬퍼
├── types/
│   └── book.ts                     # KakaoBook, SearchParams 등 공통 타입
└── utils/
    └── format.ts                   # 가격 포맷 유틸
```

### 주요 코드

**`useBookSearch`** — React Query로 도서 검색 요청을 관리합니다. `keepPreviousData` 옵션으로 페이지 전환 시 이전 결과가 유지되어 깜빡임 없이 페이지네이션이 동작합니다.

**`useLikedBooks`** — 찜한 책 목록을 localStorage에 저장합니다. 같은 탭 내 여러 컴포넌트 간에는 모듈 레벨 변수(`sharedBooks`)와 CustomEvent로 상태를 동기화하고, 다른 탭에서의 변경은 `StorageEvent`로 감지합니다.

**`useSearchHistory`** — 최근 검색어를 최대 8개까지 localStorage에 저장합니다. 검색창에 포커스/호버 시 드롭다운으로 노출됩니다.

---

## 라이브러리 선택 이유

**styled-components**
컴포넌트 단위로 스타일을 관리하여 전역 클래스 충돌을 방지합니다. `.attrs()`를 통해 BEM 클래스명을 함께 부여함으로써 렌더링된 HTML이 블록/요소/수정자 클래스로 감사 가능한 상태를 유지합니다.

**@tanstack/react-query**
API 호출 결과의 캐싱, 로딩/에러 상태 관리, `staleTime` 설정으로 불필요한 재요청을 줄입니다. `keepPreviousData`를 사용하면 페이지 변경 시 빈 화면 없이 부드러운 전환이 가능합니다.

**axios**
`axios.create()`로 베이스 URL과 Authorization 헤더를 인스턴스에 고정하여, API 호출 시 반복 코드를 제거했습니다.

---

## 강조하고 싶은 기능

### 상세 검색 (Advanced Search)
검색창 옆 **상세검색** 버튼을 누르면 팝업이 열립니다. 제목·저자명·출판사 중 검색 대상을 선택하여 정밀한 검색이 가능합니다. `Escape` 키 또는 바깥 영역 클릭으로 닫힙니다.

### 검색 기록
검색어 제출 시 최근 8개의 키워드가 localStorage에 저장됩니다. 검색창에 호버하면 드롭다운으로 표시되며, 개별 삭제가 가능합니다.

### 찜하기 탭 간 실시간 동기화
`useLikedBooks`는 같은 탭의 여러 인스턴스가 CustomEvent로 상태를 공유하고, 다른 탭에서의 변경은 `StorageEvent`로 감지하여 새로고침 없이 동기화됩니다.

### 반응형 레이아웃
`breakpoints.ts`의 `media.tablet` / `media.mobile` 헬퍼로 1024px · 768px 기준 반응형 스타일을 적용했습니다.

### CSS 변수 기반 디자인 토큰
색상, 폰트, 간격, 반경, 그림자를 `GlobalStyle.ts`의 `:root` CSS 변수로 중앙 관리합니다. 토큰 하나를 변경하면 전체 UI에 즉시 반영됩니다.
