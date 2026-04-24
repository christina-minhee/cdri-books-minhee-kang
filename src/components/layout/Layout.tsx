import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';
import Header from './Header';

const Main = styled.main.attrs({ className: 'layout__main' })`
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--space-10) var(--space-6) var(--space-11);

  ${media.tablet} {
    padding: var(--space-8) var(--space-5) var(--space-10);
  }

  ${media.mobile} {
    padding: var(--space-6) var(--space-4) var(--space-9);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
  </>
);

export default Layout;
