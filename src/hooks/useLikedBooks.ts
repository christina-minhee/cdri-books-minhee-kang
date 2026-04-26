import { useCallback, useEffect, useState } from "react";
import type { KakaoBook } from "../types/book";

const STORAGE_KEY = "cdri.likedBooks";
const SYNC_EVENT = "cdri:likedBooks:sync";

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

// Single source of truth shared across all hook instances in the same tab
let sharedBooks: KakaoBook[] = readFromStorage();

const commitBooks = (next: KakaoBook[]) => {
  sharedBooks = next;
  writeToStorage(next);
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
};

/**
 * Manages user's wishlist (내가 찜한 책) via localStorage.
 * Book identity keyed by ISBN.
 */
export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useState<KakaoBook[]>(() => sharedBooks);

  useEffect(() => {
    // Sync when another instance in the same tab commits a change
    const handleSync = () => setLikedBooks([...sharedBooks]);
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  useEffect(() => {
    // Sync when another tab commits a change
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        sharedBooks = readFromStorage();
        setLikedBooks([...sharedBooks]);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isLiked = useCallback(
    (isbn: string) => likedBooks.some((b) => b.isbn === isbn),
    [likedBooks],
  );

  const toggleLike = useCallback((book: KakaoBook) => {
    const exists = sharedBooks.some((b) => b.isbn === book.isbn);
    const next = exists
      ? sharedBooks.filter((b) => b.isbn !== book.isbn)
      : [book, ...sharedBooks];
    commitBooks(next);
  }, []);

  return { likedBooks, isLiked, toggleLike };
};
