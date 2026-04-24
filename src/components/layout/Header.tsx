import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

const HeaderRoot = styled.header.attrs({ className: 'header' })`
  height: var(--header-height);
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${media.mobile} {
    height: 60px;
  }
`;

const HeaderInner = styled.div.attrs({ className: 'header__inner' })`
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--space-7);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  ${media.mobile} {
    padding: 0 var(--space-4);
    grid-template-columns: auto 1fr;
    gap: var(--space-4);
  }
`;

const Logo = styled.h1.attrs({ className: 'header__logo' })`
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  justify-self: start;

  ${media.mobile} {
    font-size: var(--font-size-md);
  }
`;

const Nav = styled.nav.attrs({ className: 'header__nav' })`
  display: flex;
  align-items: center;
  gap: var(--space-9);
  justify-self: center;

  ${media.mobile} {
    gap: var(--space-5);
    justify-self: end;
  }
`;

const NavItem = styled(NavLink).attrs({ className: 'header__nav-item' })`
  position: relative;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  padding: var(--space-2) 0;
  transition: color 0.15s ease;

  &.active {
    color: var(--color-primary);
  }

  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: var(--color-primary);
  }

  &:hover {
    color: var(--color-primary);
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderRoot>
      <HeaderInner>
        <Logo>CERTICOS BOOKS</Logo>
        <Nav>
          <NavItem
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            도서 검색
          </NavItem>
          <NavItem
            to="/liked"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            내가 찜한 책
          </NavItem>
        </Nav>
        <div aria-hidden />
      </HeaderInner>
    </HeaderRoot>
  );
};

export default Header;
