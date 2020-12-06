import React, { FC } from 'react';
import useToggle from '@hooks/useToggle';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';

import styled from '@theme/styled';
import MenuSVG from '@images/menuSVG.tsx';

interface Props {
  className?: string;
}

interface StyledProps {
  className: string;
  isMenuOpen: boolean;
}

const StyledHeaderWithMenu = styled.header<StyledProps>`
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
    width: ${(props) => (props.isMenuOpen ? '50%' : '0')};
    height: calc(100vh - 3rem);
    z-index: 1;
    padding: 1rem 1rem;
    background-color: #ffffff;
    border-right: 1px solid ${({ theme }) => theme.PRIMARY};
    transition: 0.5s;

    & .am-button {
      position: inherit;
      font-size: 1.2rem;
    }
  }
`;

const HeaderWithMenu: FC<Props> = ({ className = 'white-header' }) => {
  const history = useHistory();
  const [menu, toggleMenu] = useToggle(false);

  const onClickCompletedOrders = () => {
    history.push('/orderHistory');
  };

  return (
    <StyledHeaderWithMenu className={className} isMenuOpen={menu}>
      <button type="button" onClick={toggleMenu}>
        <MenuSVG />
      </button>
      <menu>
        <ul>
          <li>
            <Button onClick={onClickCompletedOrders}>이용 기록</Button>
          </li>
        </ul>
      </menu>
    </StyledHeaderWithMenu>
  );
};

export default HeaderWithMenu;
