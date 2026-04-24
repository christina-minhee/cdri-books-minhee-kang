import React from 'react';
import styled from 'styled-components';

const Root = styled.p.attrs({ className: 'result-count' })`
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-regular);
`;

const Label = styled.span.attrs({ className: 'result-count__label' })`
  margin-right: var(--space-4);
`;

const TotalLabel = styled.span.attrs({ className: 'result-count__total-label' })`
  margin-right: var(--space-2);
  color: var(--color-text-primary);
`;

const Number = styled.strong.attrs({ className: 'result-count__number' })`
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
`;

interface ResultCountProps {
  total: number;
}

const ResultCount: React.FC<ResultCountProps> = ({ total }) => (
  <Root>
    <Label>도서 검색 결과</Label>
    <TotalLabel>총</TotalLabel>
    <Number>{total.toLocaleString('ko-KR')}</Number>건
  </Root>
);

export default ResultCount;
