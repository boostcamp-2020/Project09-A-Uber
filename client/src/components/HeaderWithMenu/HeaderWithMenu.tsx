import React, { FC } from 'react';
import { Modal } from 'antd-mobile';
import useToggle from '@hooks/useToggle';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useCustomMutation } from '@hooks/useApollo';
import { LOGOUT } from '@queries/user';
import { Logout } from '@/types/api';
import styled from '@theme/styled';
import { Message } from '@utils/client-message';

interface Props {
  className?: string;
}

interface StyledProps {
  className: string;
  isMenuOpen: boolean;
}

const { Header } = Layout;

const StyledHeaderWithMenu = styled(Header)<StyledProps>`
  background-color: ${({ className, theme }) =>
    className === 'green-header' ? theme.PRIMARY : '#ffffff'};

  & svg {
    fill: #ffffff;
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
  const [logoutMutation] = useCustomMutation<Logout>(LOGOUT, {
    onCompleted: ({ logout }) => {
      if (logout.result === 'success') {
        history.push('/signin');
      }
    },
  });
  const [menu, toggleMenu] = useToggle(false);

  const onClickCompletedOrders = () => {
    history.push('/orderHistory');
  };

  const onClickLogout = () => {
    Modal.alert('로그아웃', Message.LogOutMessage, [
      { text: '취소' },
      { text: '확인', onPress: () => logoutMutation() },
    ]);
  };

  return (
    <StyledHeaderWithMenu className={className} isMenuOpen={menu}>
      <MenuOutlined data-testID="header-menu-toggle" onClick={toggleMenu} />
      <menu data-testID="header-menu">
        <ul>
          <li>
            <button type="button" data-testID="history-button" onClick={onClickCompletedOrders}>
              이용 기록
            </button>
          </li>
          <li>
            <button type="button" onClick={onClickLogout}>
              로그아웃
            </button>
          </li>
        </ul>
      </menu>
    </StyledHeaderWithMenu>
  );
};

export default HeaderWithMenu;
