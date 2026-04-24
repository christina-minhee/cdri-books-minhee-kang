import axios from 'axios';
import type { BookSearchResponse, SearchParams } from '../types/book';

const KAKAO_API_BASE = 'https://dapi.kakao.com';
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY ?? '';

const kakaoClient = axios.create({
  baseURL: KAKAO_API_BASE,
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
});

/**
 * Search books via Kakao Books API.
 * @see https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
 */
export const searchBooks = async ({
  query,
  target,
  page = 1,
  size = 10,
}: SearchParams): Promise<BookSearchResponse> => {
  const { data } = await kakaoClient.get<BookSearchResponse>('/v3/search/book', {
    params: {
      query,
      ...(target ? { target } : {}),
      page,
      size,
      sort: 'accuracy',
    },
  });
  return data;
};
