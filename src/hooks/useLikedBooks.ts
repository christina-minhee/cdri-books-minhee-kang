import { useCallback, useEffect, useState } from 'react';
import type { KakaoBook } from '../types/book';

const STORAGE_KEY = 'cdri.likedBooks';

const readFromStorage = (): KakaoBook[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KakaoBook[]) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (books: KakaoBook[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    /* ignore quota / access errors */
  }
};

/**
 * Manages user's wishlist (내가 찜한 책) via localStorage.
 * Book identity keyed by ISBN.
 */
export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useState<KakaoBook[]>(readFromStorage);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setLikedBooks(readFromStorage());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isLiked = useCallback(
    (isbn: string) => likedBooks.some((b) => b.isbn === isbn),
    [likedBooks]
  );

  const toggleLike = useCallback((book: KakaoBook) => {
    setLikedBooks((prev) => {
      const exists = prev.some((b) => b.isbn === book.isbn);
      const next = exists
        ? prev.filter((b) => b.isbn !== book.isbn)
        : [book, ...prev];
      writeToStorage(next);
      return next;
    });
  }, []);

  return { likedBooks, isLiked, toggleLike };
};
