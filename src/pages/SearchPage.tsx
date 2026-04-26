import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../styles/breakpoints";
import SearchBar from "../components/search/SearchBar";
import ResultCount from "../components/search/ResultCount";
import BookList from "../components/search/BookList";
import { useBookSearch } from "../hooks/useBookSearch";

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

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isLoading, isError } = useBookSearch({
    query: submittedQuery,
    page: 1,
    size: 10,
  });

  const total = data?.meta.total_count ?? 0;
  const books = data?.documents ?? [];

  return (
    <section className="search-page">
      <PageTitle>도서 검색</PageTitle>

      <Toolbar>
        <SearchBar
          value={query}
          onChange={setQuery}
          setSumbittedQuery={setSubmittedQuery}
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
    </section>
  );
};

export default SearchPage;
