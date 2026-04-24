import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/breakpoints';
import BookList from '../components/search/BookList';
import ResultCount from '../components/search/ResultCount';
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

const LikedPage: React.FC = () => {
  const { likedBooks } = useLikedBooks();

  return (
    <section className="liked-page">
      <PageTitle>내가 찜한 책</PageTitle>
      <ResultWrap>
        <ResultCount total={likedBooks.length} />
      </ResultWrap>
      <BookList
        books={likedBooks}
        emptyMessage="찜한 책이 없습니다."
      />
    </section>
  );
};

export default LikedPage;
