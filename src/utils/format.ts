/**
 * Format a KRW integer price with thousands separators. e.g. 13300 -> "13,300"
 */
export const formatPrice = (price: number): string => {
  if (!Number.isFinite(price)) return '0';
  return price.toLocaleString('ko-KR');
};
