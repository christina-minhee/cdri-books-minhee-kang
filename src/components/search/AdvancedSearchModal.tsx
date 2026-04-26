import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { SearchTarget } from "../../types/book";
import { ChevronDownIcon, CloseIcon } from "../common/icons";

const Panel = styled.div`
  position: absolute;
  left: -144px;
  top: 50px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  width: 360px;
  max-width: calc(100vw - var(--space-7));
  padding: 36px var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  animation-timing-function: ease-out;
  animation-duration: 300ms;

  &:hover {
    color: var(--color-text-primary);
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const InputRow = styled.div`
  display: flex;
  gap: var(--space-2);
  height: 36px;
`;

const Filter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-1) 0 var(--space-2);
  width: 100px;
  border: none;
  border-bottom: 1px solid var(--color-divider);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
  cursor: pointer;

  &:focus {
    border-color: var(--color-primary);
    background: var(--color-white);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 78px;
  background: var(--color-white);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100px;
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  cursor: pointer;

  &:hover {
    background: var(--color-bg-subtle);
  }
`;

const Input = styled.input`
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid var(--color-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  flex: 1;

  &::placeholder {
    color: var(--color-text-placeholder);
  }
`;

const SearchButton = styled.button`
  height: 36px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  width: 100%;
  transition: background 0.3s ease;
  // animation-timing-function: ease-out;
  // animation-duration: 300ms;

  &:hover {
    background: var(--color-primary-hover);
  }
`;

type TargetOption = { label: string; value: SearchTarget | undefined };

const TARGET_OPTIONS: TargetOption[] = [
  { label: "제목", value: "title" },
  { label: "저자명", value: "person" },
  { label: "출판사", value: "publisher" },
];

interface AdvancedSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (query: string, target: SearchTarget | undefined) => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<TargetOption>(TARGET_OPTIONS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSubmit(trimmed, target.value);
    setDropdownOpen(false);
    onClose();
  };

  return (
    <Panel
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="adv-search-title"
    >
      <CloseButton onClick={onClose} aria-label="닫기">
        <CloseIcon size={20} />
      </CloseButton>

      <Field>
        <InputRow>
          <Filter aria-label="검색 대상">
            {target.label}
            <ChevronDownIcon
              size={20}
              style={{ stroke: "#B1B8C0" }}
              onClick={() => setDropdownOpen((o) => !o)}
            />
          </Filter>
          {dropdownOpen && (
            <Dropdown>
              {TARGET_OPTIONS.filter((t) => t.label !== target.label).map(
                (opt, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      setTarget(opt);
                      setDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </DropdownItem>
                ),
              )}
            </Dropdown>
          )}
          <Input
            id="adv-search-query"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="검색어를 입력"
          />
        </InputRow>
      </Field>
      <SearchButton onClick={handleSubmit}>검색하기</SearchButton>
    </Panel>
  );
};

export default AdvancedSearchModal;
