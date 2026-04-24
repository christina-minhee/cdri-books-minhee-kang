import React from 'react';
import styled from 'styled-components';
import type { KakaoBook } from '../../types/book';
import BookItem from './BookItem';

const List = styled.ul.attrs({ className: 'book-list' })`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EmptyState = styled.div.attrs({ className: 'book-list__empty' })`
  padding: var(--space-10) var(--space-4);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-base);
`;

interface BookListProps {
  books: KakaoBook[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const BookList: React.FC<BookListProps> = ({
  books,
  isLoading,
  emptyMessage = '검색 결과가 없습니다.',
}) => {
  if (isLoading) {
    return <EmptyState>검색 중...</EmptyState>;
  }

  if (books.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <List>
      {books.map((book) => (
        <BookItem key={`${book.isbn}-${book.title}`} book={book} />
      ))}
    </List>
  );
};

export default BookList;
