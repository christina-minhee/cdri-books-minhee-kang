import React from "react";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Nav = styled.nav.attrs({ className: "pagination" })`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-7);

  ${media.mobile} {
    gap: 2px;
  }
`;

const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-weight: ${({ $active }) =>
    $active ? "var(--font-weight-bold)" : "var(--font-weight-regular)"};
  color: ${({ $active }) =>
    $active ? "var(--color-white)" : "var(--color-text-secondary)"};
  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "transparent"};
  transition: background 0.15s, color 0.15s;

  &:hover:not(:disabled) {
    background: ${({ $active }) =>
      $active ? "var(--color-primary-hover)" : "var(--color-bg-subtle)"};
    color: ${({ $active }) =>
      $active ? "var(--color-white)" : "var(--color-text-primary)"};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  ${media.mobile} {
    min-width: 32px;
    height: 32px;
    font-size: var(--font-size-sm);
  }
`;

const Ellipsis = styled.span`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-base);
  user-select: none;
`;

function buildPageWindows(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  const rangeStart = Math.max(2, current - 2);
  const rangeEnd = Math.min(total - 1, current + 2);

  if (rangeStart > 2) pages.push("…");
  for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p);
  if (rangeEnd < total - 1) pages.push("…");

  pages.push(total);
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = buildPageWindows(currentPage, totalPages);

  return (
    <Nav aria-label="페이지 탐색">
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        ‹
      </PageButton>

      {pages.map((p, i) =>
        p === "…" ? (
          <Ellipsis key={`ellipsis-${i}`}>…</Ellipsis>
        ) : (
          <PageButton
            key={p}
            $active={p === currentPage}
            onClick={() => onPageChange(p)}
            aria-label={`${p}페이지`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        ›
      </PageButton>
    </Nav>
  );
};

export default Pagination;
