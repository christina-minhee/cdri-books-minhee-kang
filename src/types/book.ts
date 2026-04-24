/**
 * Kakao Books API response types.
 * Reference: https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
 */
export interface KakaoBook {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface KakaoMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface BookSearchResponse {
  meta: KakaoMeta;
  documents: KakaoBook[];
}

export type SearchTarget = 'title' | 'person' | 'publisher';

export interface SearchParams {
  query: string;
  target?: SearchTarget;
  page?: number;
  size?: number;
}
