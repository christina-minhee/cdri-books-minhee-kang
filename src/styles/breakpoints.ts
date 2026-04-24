/**
 * Responsive breakpoints.
 * Desktop = default, Tablet = max-width 1024px, Mobile = max-width 768px
 */
export const breakpoints = {
  tablet: '1024px',
  mobile: '768px',
} as const;

export const media = {
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
} as const;
