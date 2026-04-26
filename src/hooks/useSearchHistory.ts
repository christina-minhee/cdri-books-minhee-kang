import { useEffect, useState } from "react";
import type { SearchKeyword } from "../types/book";

const STORAGE_KEY = "cdri.SearchHistory";

const readFromStorage = (): SearchKeyword[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SearchKeyword[]) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (keywords: SearchKeyword[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  } catch {
    /* ignore quota / access errors */
  }
};

/**
 * Manages search history via localStorage.
 * History is a list of search keywords, ordered from most recent to oldest.
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchKeyword[]>(readFromStorage);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setHistory(readFromStorage());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addKeyword = (keyword: SearchKeyword) => {
    setHistory((prev) => {
      const next = [keyword, ...prev.filter((k) => k !== keyword)].slice(0, 8);
      console.log("Adding keyword to history:", keyword, "Next history:", next);
      writeToStorage(next);
      return next;
    });
  };

  const deleteKeyword = (keyword: SearchKeyword) => {
    setHistory((prev) => {
      const next = prev.filter((k) => k !== keyword);
      console.log(
        "Deleting keyword from history:",
        keyword,
        "Next history:",
        next,
      );
      writeToStorage(next);
      return next;
    });
  };

  const clearHistory = () => {
    writeToStorage([]);
    setHistory([]);
  };

  return { history, addKeyword, clearHistory, deleteKeyword };
};
