import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchBooks } from '../api/books';
import type { SearchParams } from '../types/book';

export const useBookSearch = (params: SearchParams) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: () => searchBooks(params),
    enabled: params.query.trim().length > 0,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
