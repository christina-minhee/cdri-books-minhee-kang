import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../styles/breakpoints';
import BookList from '../components/search/BookList';
import ResultCount from '../components/search/ResultCount';
import Pagination from '../components/common/Pagination';
import { useLikedBooks } from '../hooks/useLikedBooks';

const PageTitle = styled.h2.attrs({ className: 'liked-page__title' })`
  margin: 0 0 var(--space-5) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);

  ${media.mobile} {
    font-size: var(--font-size-md);
  }
`;

const ResultWrap = styled.div`
  margin-bottom: var(--space-5);
`;

const PAGE_SIZE = 10;

const LikedPage: React.FC = () => {
  const { likedBooks } = useLikedBooks();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(likedBooks.length / PAGE_SIZE);
  const pagedBooks = likedBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="liked-page">
      <PageTitle>내가 찜한 책</PageTitle>
      <ResultWrap>
        <ResultCount total={likedBooks.length} />
      </ResultWrap>
      <BookList
        books={pagedBooks}
        emptyMessage="찜한 책이 없습니다."
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default LikedPage;
