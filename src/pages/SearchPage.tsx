import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import SearchBar from "../components/search/SearchBar";
import ResultCount from "../components/search/ResultCount";
import BookList from "../components/search/BookList";
import Pagination from "../components/common/Pagination";
import { useBookSearch } from "../hooks/useBookSearch";
import type { SearchTarget } from "../types/book";

const PageTitle = styled.h2.attrs({ className: "search-page__title" })`
  margin: 0 0 var(--space-5) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);

  ${media.mobile} {
    font-size: var(--font-size-md);
  }
`;

const Toolbar = styled.section.attrs({ className: "search-page__toolbar" })`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
`;

const PAGE_SIZE = 10;

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [target, setTarget] = useState<SearchTarget | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const { data, isLoading, isError } = useBookSearch({
    query: submittedQuery,
    target,
    page,
    size: PAGE_SIZE,
  });

  const total = data?.meta.total_count ?? 0;
  const pageableCount = data?.meta.pageable_count ?? 0;
  const totalPages = Math.ceil(pageableCount / PAGE_SIZE);
  const books = data?.documents ?? [];

  const handleQuerySubmit = (q: string) => {
    setSubmittedQuery(q);
    setTarget(undefined);
    setPage(1);
  };

  const handleAdvancedSubmit = (q: string, t: SearchTarget | undefined) => {
    setQuery(q);
    setSubmittedQuery(q);
    setTarget(t);
    setPage(1);
  };

  return (
    <section
      className="search-page"
      onClick={() => advancedOpen && setAdvancedOpen(false)}
    >
      <PageTitle>도서 검색</PageTitle>

      <Toolbar>
        <SearchBar
          value={query}
          onChange={setQuery}
          setSumbittedQuery={handleQuerySubmit}
          setAdvancedOpen={setAdvancedOpen}
          advancedOpen={advancedOpen}
          handleAdvancedSubmit={handleAdvancedSubmit}
        />
        <ResultCount total={submittedQuery ? total : 0} />
      </Toolbar>

      {isError ? (
        <p role="alert" style={{ color: "var(--color-accent-red)" }}>
          검색 중 오류가 발생했습니다. API 키를 확인해 주세요.
        </p>
      ) : (
        <BookList
          books={books}
          isLoading={isLoading && Boolean(submittedQuery)}
          emptyMessage={
            submittedQuery ? "검색 결과가 없습니다." : "검색어를 입력해 주세요."
          }
        />
      )}

      {submittedQuery && !isError && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

export default SearchPage;
