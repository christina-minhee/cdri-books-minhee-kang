# cdri-books-minhee-kang

A React + TypeScript + React Query web application that reproduces the **CERTICOS BOOKS** Figma design. Users can search books through the Kakao Books API, expand each result for detail, and bookmark books they like.

## Tech Stack

- **React 18** + **TypeScript** (Create React App)
- **styled-components** with CSS variables for theming
- **@tanstack/react-query** for server state
- **react-router-dom** for routing
- **axios** for HTTP
- **Kakao Books Search API** as data source

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Get a Kakao REST API key

1. Go to https://developers.kakao.com/ and sign in.
2. Create an application.
3. Copy the **REST API 키** from the app summary page.

### 3. Configure environment

```bash
cp .env
```

Then edit `.env`:

```
REACT_APP_KAKAO_REST_API_KEY=your_actual_key_here
```

### 4. Run

```bash
npm start
```

Open http://localhost:3000.

## Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm start`     | Run dev server on port 3000         |
| `npm run build` | Build production bundle to `/build` |
| `npm test`      | Run tests                           |

## Project Structure

```
src/
├── api/           # Kakao Books API client
├── components/
│   ├── common/    # Icons
│   ├── layout/    # Header, Layout
│   └── search/    # SearchBar, BookList, BookItem, ResultCount
├── hooks/         # useBookSearch (react-query), useLikedBooks (localStorage)
├── pages/         # SearchPage, LikedPage
├── styles/        # GlobalStyle (design tokens as CSS vars), breakpoints
├── types/         # Book types
├── utils/         # Price formatter
├── App.tsx        # Router + QueryClient root
└── index.tsx      # Entry
```

## Design Tokens

All design tokens (colors, font sizes, spacing, radius, shadow) live in `src/styles/GlobalStyle.ts` as CSS variables on `:root`. Change a value there and it propagates everywhere.

## Responsive Breakpoints

| Breakpoint | Max width | Handled via              |
| ---------- | --------- | ------------------------ |
| Desktop    | default   | base styles              |
| Tablet     | 1024px    | `${media.tablet}` helper |
| Mobile     | 768px     | `${media.mobile}` helper |

## Naming Convention

BEM class names are applied on every styled component via `.attrs({ className: ... })`, so the rendered HTML is auditable with block/element/modifier classes (e.g. `book-item__buy-btn`, `book-item--expanded`).
