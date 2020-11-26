import React, { FC } from 'react';
import useToggle from '@hooks/useToggle';

import styled from '@theme/styled';
import MenuSVG from '@images/menuSVG.tsx';

interface Props {
  className?: string;
}

const StyledHeaderWithMenu = styled.header<{ isMenuOpen: boolean }>`
  display: flex;
  height: 3rem;
  width: 100%;
  background-color: ${({ className, theme }) =>
    className === 'green-header' ? theme.PRIMARY : '#ffffff'};

  & button {
    background: none;
    border: none;
    padding: 0;
  }

  & svg {
    width: 1.5rem;
    fill: #ffffff;
    margin-left: 1.5rem;
  }

  & menu {
    position: absolute;
    top: 3rem;
    left: 0;
    visibility: ${(props) => (props.isMenuOpen ? 'visible' : 'hidden')};
    width: ${(props) => (props.isMenuOpen ? '100%' : '0')};
    height: calc(100vh - 3rem);
    z-index: 1;
    padding: 1rem 1rem;
    background-color: #ffffff;
    border-right: 1px solid ${({ theme }) => theme.PRIMARY};
    transition: 0.5s;
  }
`;

const HeaderWithMenu: FC<Props> = ({ className = 'white-header' }) => {
  const [menu, toggleMenu] = useToggle(false);

  return (
    <StyledHeaderWithMenu className={className} isMenuOpen={menu}>
      <button type="button" onClick={toggleMenu}>
        <MenuSVG />
      </button>
      <menu>
        <ul>
          <li>마이페이지</li>
        </ul>
      </menu>
    </StyledHeaderWithMenu>
  );
};

export default HeaderWithMenu;
