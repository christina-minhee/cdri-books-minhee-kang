import React from "react";
import styled from "styled-components";
import type { KakaoBook } from "../../types/book";
import BookItem from "./BookItem";
import iconBook from "../../assets/images/icon_book.png";

const List = styled.ul.attrs({ className: "book-list" })`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EmptyState = styled.div.attrs({ className: "book-list__empty" })`
  padding: var(--space-10) var(--space-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-base);
`;

const IconBook = styled.img`
  width: 80px;
  height: 80px;
`;

interface BookListProps {
  books: KakaoBook[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const BookList: React.FC<BookListProps> = ({
  books,
  isLoading,
  emptyMessage = "검색 결과가 없습니다.",
}) => {
  if (isLoading) {
    return <EmptyState>검색 중...</EmptyState>;
  }

  if (books.length === 0) {
    return (
      <EmptyState>
        <IconBook src={iconBook} alt="empty books" />
        {emptyMessage}
      </EmptyState>
    );
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
