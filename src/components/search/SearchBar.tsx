import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";
import { CloseIcon, SearchIcon } from "../common/icons";
import { useSearchHistory } from "../../hooks/useSearchHistory";

const Root = styled.div.attrs({ className: "search-bar" })`
  display: flex;
  align-items: center;
  gap: var(--space-4);

  ${media.mobile} {
    gap: var(--space-2);
  }
`;

const SearchWrapper = styled.div.attrs({
  className: "search-bar__wrapper",
  hasHistory: false,
})`
  position: relative;
  flex: 1;
  max-width: 480px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--color-bg-input);
  border-radius: var(--radius-search-bar);

  .search-bar__history {
    display: none;
  }

  &:focus,
  &:hover {
    .search-bar__history {
      display: block !important;
    }
  }
`;

const SearchHistoryContainer = styled.div.attrs({
  className: "search-bar__history",
})`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: -20px;
  padding-top: 20px;
  padding-bottom: var(--space-4);
  background: var(--color-bg-input);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  z-index: 10;

  > div {
    position: relative;
  }
`;

const SearchHistoryItem = styled.div.attrs({
  className: "search-bar__history-item",
})`
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
  padding-left: 51px;
  padding-right: 25px;
  color: var(--color-text-placeholder);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;

  &:hover {
    background: var(--color-bg-input-hover);
  }
`;

const InputWrapper = styled.div.attrs({
  className: "search-bar__input-wrapper",
})`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 var(--space-5);
  z-index: 11;

  ${media.mobile} {
    height: 44px;
    padding: 0 var(--space-4);
  }
`;

const IconSlot = styled.span.attrs({ className: "search-bar__icon" })`
  display: flex;
  color: var(--color-text-primary);
  margin-right: var(--space-2);
`;

const ClostIconSlot = styled.span.attrs({
  className: "search-bar__close-icon",
})`
  cursor: pointer;
  position: absolute;
  top: var(--space-3);
  right: 25px;
`;

const Input = styled.input.attrs({
  className: "search-bar__input",
  type: "text",
})`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-placeholder);
    font-weight: var(--font-weight-medium);
  }

  ${media.mobile} {
    font-size: var(--font-size-base);
  }
`;

const DetailButton = styled.button.attrs({
  className: "search-bar__detail-btn",
  type: "button",
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
  setSumbittedQuery: (value: string) => void;
  onDetailClick?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  setSumbittedQuery,
  onDetailClick,
  placeholder = "검색어를 입력하세요",
}) => {
  const [local, setLocal] = useState(value);

  const { deleteKeyword, addKeyword, history } = useSearchHistory();

  React.useEffect(() => {
    setLocal(value);
  }, [value]);

  const onSubmit = () => {
    const trimmed = local.trim();
    if (trimmed) {
      setSumbittedQuery(trimmed);
      addKeyword(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Root role="search">
      <SearchWrapper>
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
        {history.length > 0 && (
          <SearchHistoryContainer>
            {history.map((keyword, idx) => (
              <div key={idx}>
                {/* // <SearchHistoryWrapper> */}
                <SearchHistoryItem
                  onClick={() => {
                    setLocal(keyword);
                    onSubmit();
                  }}
                >
                  {keyword}
                </SearchHistoryItem>
                <ClostIconSlot>
                  <CloseIcon
                    size={24}
                    onClick={() => {
                      deleteKeyword(keyword);
                    }}
                    aria-label={`검색어 "${keyword}" 삭제`}
                  />
                </ClostIconSlot>
              </div>
            ))}
          </SearchHistoryContainer>
        )}
      </SearchWrapper>
      <DetailButton onClick={onDetailClick}>상세검색</DetailButton>
    </Root>
  );
};

export default SearchBar;
