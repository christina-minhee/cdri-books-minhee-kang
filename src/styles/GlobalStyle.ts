import { createGlobalStyle } from "styled-components";

/**
 * Global styles + design tokens as CSS :root variables.
 * Extracted from Figma: CERTICOS BOOKS — 도서 검색 결과 화면.
 */
const GlobalStyle = createGlobalStyle`
  :root {
    /* ============ Colors ============ */
    --color-primary: #4880EE;
    --color-primary-hover: #3A6BCC;
    --color-primary-light: #DAE2F8;

    --color-text-primary: #353C49;
    --color-text-secondary: #6D7582;
    --color-text-tertiary: #8D94A0;
    --color-text-placeholder: #8D94A0;

    --color-accent-red: #E84118;

    --color-bg-page: #FFFFFF;
    --color-bg-subtle: #F2F4F6;
    --color-bg-input: #F2F4F6;
    --color-bg-button-secondary: #F2F4F6;
    --color-bg-input-hover: #dadcde;


    --color-border: #D2D6DA;
    --color-border-light: #E4E7EA;
    --color-divider: #D2D6DA;

    --color-white: #FFFFFF;

    /* ============ Typography ============ */
    --font-family-base: 'Noto Sans KR', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, sans-serif;

    --font-size-xs: 10px;
    --font-size-sm: 12px;
    --font-size-base: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-2xl: 22px;
    --font-size-3xl: 24px;

    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    --line-height-tight: 1.2;
    --line-height-normal: 1.45;
    --line-height-relaxed: 1.6;

    /* ============ Spacing ============ */
    --space-0: 0;
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-7: 32px;
    --space-8: 40px;
    --space-9: 48px;
    --space-10: 64px;
    --space-11: 80px;

    /* ============ Radius ============ */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-search-bar: 100px;
    --radius-pill: 999px;

    /* ============ Shadow ============ */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);

    /* ============ Layout ============ */
    --layout-max-width: 960px;
    --header-height: 80px;

    /* ============ Breakpoints (reference) ============ */
    --bp-tablet: 1024px;
    --bp-mobile: 768px;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    background-color: var(--color-bg-page);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: var(--line-height-normal);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  input {
    font-family: inherit;
    outline: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
