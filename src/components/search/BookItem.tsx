import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import type { KakaoBook } from '../../types/book';
import { formatPrice } from '../../utils/format';
import { ChevronDownIcon, ChevronUpIcon, HeartIcon } from '../common/icons';
import { useLikedBooks } from '../../hooks/useLikedBooks';

const Item = styled.li.attrs({ className: 'book-item' })`
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-5) var(--space-2);

  &--expanded {
    padding: var(--space-6) var(--space-2);
  }
`;

/* ---------- Collapsed row ---------- */
const Row = styled.div.attrs({ className: 'book-item__row' })`
  display: grid;
  grid-template-columns: 64px 1fr auto auto auto;
  align-items: center;
  gap: var(--space-5);

  ${media.tablet} {
    grid-template-columns: 56px 1fr auto auto auto;
    gap: var(--space-4);
  }

  ${media.mobile} {
    grid-template-columns: 56px 1fr;
    grid-template-areas:
      'cover info'
      'price price'
      'actions actions';
    row-gap: var(--space-3);
  }
`;

const ThumbWrap = styled.div.attrs({ className: 'book-item__thumb' })`
  position: relative;
  width: 48px;
  height: 68px;
  overflow: hidden;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-sm);

  ${media.mobile} {
    grid-area: cover;
  }
`;

const ThumbImg = styled.img.attrs({ className: 'book-item__thumb-img' })`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartBtn = styled.button.attrs({
  className: 'book-item__heart-btn',
  type: 'button',
})`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Info = styled.div.attrs({ className: 'book-item__info' })`
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  min-width: 0;

  ${media.mobile} {
    grid-area: info;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }
`;

const Title = styled.h3.attrs({ className: 'book-item__title' })`
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;

  ${media.tablet} {
    max-width: 260px;
  }

  ${media.mobile} {
    max-width: 100%;
    white-space: normal;
  }
`;

const Authors = styled.span.attrs({ className: 'book-item__authors' })`
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-regular);
`;

const Price = styled.span.attrs({ className: 'book-item__price' })`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  white-space: nowrap;

  ${media.mobile} {
    grid-area: price;
  }
`;

const Actions = styled.div.attrs({ className: 'book-item__actions' })`
  display: flex;
  gap: var(--space-2);

  ${media.mobile} {
    grid-area: actions;
    justify-content: flex-end;
  }
`;

const BuyButton = styled.button.attrs({
  className: 'book-item__buy-btn',
  type: 'button',
})`
  height: 36px;
  padding: 0 var(--space-4);
  min-width: 108px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-primary-hover);
  }
`;

const DetailToggle = styled.button.attrs({
  className: 'book-item__detail-toggle',
  type: 'button',
})`
  height: 36px;
  padding: 0 var(--space-3) 0 var(--space-4);
  min-width: 108px;
  background: var(--color-bg-button-secondary);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);

  &:hover {
    background: var(--color-border-light);
  }
`;

/* ---------- Expanded row ---------- */
const ExpandedWrap = styled.div.attrs({ className: 'book-item__expanded' })`
  display: grid;
  grid-template-columns: 220px 1fr 260px;
  gap: var(--space-7);
  align-items: start;

  ${media.tablet} {
    grid-template-columns: 180px 1fr 220px;
    gap: var(--space-5);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`;

const ExpandedLeft = styled.div.attrs({ className: 'book-item__expanded-left' })`
  position: relative;
  width: 220px;
  aspect-ratio: 5 / 7;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-sm);
  overflow: hidden;

  ${media.tablet} {
    width: 180px;
  }

  ${media.mobile} {
    width: 140px;
    margin: 0 auto;
  }
`;

const ExpandedImg = styled.img.attrs({
  className: 'book-item__expanded-img',
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ExpandedCenter = styled.div.attrs({
  className: 'book-item__expanded-center',
})`
  min-width: 0;
`;

const ExpandedTitleRow = styled.div.attrs({
  className: 'book-item__expanded-title-row',
})`
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
`;

const ExpandedTitle = styled.h3.attrs({
  className: 'book-item__expanded-title',
})`
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const SectionLabel = styled.h4.attrs({
  className: 'book-item__section-label',
})`
  margin: 0 0 var(--space-3) 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const Description = styled.p.attrs({
  className: 'book-item__description',
})`
  margin: 0;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  white-space: pre-wrap;
`;

const ExpandedRight = styled.div.attrs({
  className: 'book-item__expanded-right',
})`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-5);
`;

const ExpandedToggleWrap = styled.div.attrs({
  className: 'book-item__expanded-toggle-wrap',
})`
  display: flex;
  justify-content: flex-end;
`;

const PriceBlock = styled.div.attrs({ className: 'book-item__price-block' })`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  align-items: flex-end;
`;

const PriceRow = styled.div.attrs({ className: 'book-item__price-row' })`
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
`;

const PriceTag = styled.span.attrs({ className: 'book-item__price-tag' })`
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
`;

const PriceOriginal = styled.span.attrs({
  className: 'book-item__price-original',
})`
  font-size: var(--font-size-md);
  color: var(--color-text-tertiary);
  text-decoration: line-through;
`;

const PriceDiscount = styled.span.attrs({
  className: 'book-item__price-discount',
})`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const FullBuyButton = styled(BuyButton).attrs({
  className: 'book-item__buy-btn book-item__buy-btn--full',
})`
  width: 100%;
  height: 44px;
  font-size: var(--font-size-md);
`;

interface BookItemProps {
  book: KakaoBook;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const { isLiked, toggleLike } = useLikedBooks();
  const liked = isLiked(book.isbn);

  const authorLabel = book.authors.join(', ');
  const hasDiscount =
    book.sale_price > 0 && book.sale_price < book.price && book.price > 0;

  if (!expanded) {
    return (
      <Item>
        <Row>
          <ThumbWrap>
            {book.thumbnail ? (
              <ThumbImg src={book.thumbnail} alt={book.title} />
            ) : null}
            <HeartBtn
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(book);
              }}
              aria-label={liked ? '찜 해제' : '찜하기'}
              aria-pressed={liked}
            >
              <HeartIcon size={16} filled={liked} />
            </HeartBtn>
          </ThumbWrap>

          <Info>
            <Title title={book.title}>{book.title}</Title>
            <Authors>{authorLabel}</Authors>
          </Info>

          <Price>{formatPrice(book.price)}원</Price>

          <Actions>
            <BuyButton
              onClick={() => window.open(book.url, '_blank', 'noopener,noreferrer')}
            >
              구매하기
            </BuyButton>
            <DetailToggle
              onClick={() => setExpanded(true)}
              aria-expanded={false}
            >
              상세보기
              <ChevronDownIcon size={14} />
            </DetailToggle>
          </Actions>
        </Row>
      </Item>
    );
  }

  return (
    <Item className="book-item book-item--expanded">
      <ExpandedWrap>
        <ExpandedLeft>
          {book.thumbnail ? (
            <ExpandedImg src={book.thumbnail} alt={book.title} />
          ) : null}
          <HeartBtn
            onClick={() => toggleLike(book)}
            aria-label={liked ? '찜 해제' : '찜하기'}
            aria-pressed={liked}
            style={{ top: 8, right: 8 }}
          >
            <HeartIcon size={22} filled={liked} />
          </HeartBtn>
        </ExpandedLeft>

        <ExpandedCenter>
          <ExpandedTitleRow>
            <ExpandedTitle>{book.title}</ExpandedTitle>
            <Authors>{authorLabel}</Authors>
          </ExpandedTitleRow>
          <SectionLabel>책 소개</SectionLabel>
          <Description>
            {book.contents ? book.contents : '책 소개가 제공되지 않습니다.'}
          </Description>
        </ExpandedCenter>

        <ExpandedRight>
          <ExpandedToggleWrap>
            <DetailToggle
              onClick={() => setExpanded(false)}
              aria-expanded={true}
            >
              상세보기
              <ChevronUpIcon size={14} />
            </DetailToggle>
          </ExpandedToggleWrap>

          <PriceBlock>
            {hasDiscount ? (
              <>
                <PriceRow>
                  <PriceTag>원가</PriceTag>
                  <PriceOriginal>{formatPrice(book.price)}원</PriceOriginal>
                </PriceRow>
                <PriceRow>
                  <PriceTag>할인가</PriceTag>
                  <PriceDiscount>
                    {formatPrice(book.sale_price)}원
                  </PriceDiscount>
                </PriceRow>
              </>
            ) : (
              <PriceRow>
                <PriceTag>판매가</PriceTag>
                <PriceDiscount>{formatPrice(book.price)}원</PriceDiscount>
              </PriceRow>
            )}
          </PriceBlock>

          <FullBuyButton
            onClick={() => window.open(book.url, '_blank', 'noopener,noreferrer')}
          >
            구매하기
          </FullBuyButton>
        </ExpandedRight>
      </ExpandedWrap>
    </Item>
  );
};

export default BookItem;
