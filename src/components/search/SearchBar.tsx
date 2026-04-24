import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import { SearchIcon } from '../common/icons';

const Root = styled.div.attrs({ className: 'search-bar' })`
  display: flex;
  align-items: center;
  gap: var(--space-4);

  ${media.mobile} {
    gap: var(--space-2);
  }
`;

const InputWrapper = styled.div.attrs({ className: 'search-bar__input-wrapper' })`
  position: relative;
  flex: 1;
  max-width: 480px;
  display: flex;
  align-items: center;
  height: 50px;
  background: var(--color-bg-input);
  border-radius: var(--radius-pill);
  padding: 0 var(--space-5);

  ${media.mobile} {
    height: 44px;
    padding: 0 var(--space-4);
  }
`;

const IconSlot = styled.span.attrs({ className: 'search-bar__icon' })`
  display: flex;
  color: var(--color-text-primary);
  margin-right: var(--space-2);
`;

const Input = styled.input.attrs({
  className: 'search-bar__input',
  type: 'text',
})`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-placeholder);
    font-weight: var(--font-weight-regular);
  }

  ${media.mobile} {
    font-size: var(--font-size-base);
  }
`;

const DetailButton = styled.button.attrs({
  className: 'search-bar__detail-btn',
  type: 'button',
})`
  height: 36px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-bg-subtle);
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onDetailClick?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onDetailClick,
  placeholder = '검색어를 입력하세요',
}) => {
  const [local, setLocal] = useState(value);

  React.useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(local.trim());
    }
  };

  return (
    <Root role="search">
      <InputWrapper>
        <IconSlot aria-hidden>
          <SearchIcon size={18} />
        </IconSlot>
        <Input
          placeholder={placeholder}
          value={local}
          onChange={(e) => {
            setLocal(e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          aria-label="도서 검색어"
        />
      </InputWrapper>
      <DetailButton onClick={onDetailClick}>상세검색</DetailButton>
    </Root>
  );
};

export default SearchBar;
