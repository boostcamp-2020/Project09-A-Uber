import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Drawer, Button, Modal } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useCustomMutation } from '@hooks/useApollo';
import { LOGOUT } from '@queries/user';
import { Logout } from '@/types/api';
import styled from '@theme/styled';
import { Message } from '@utils/client-message';
import useModal from '@hooks/useModal';

interface Props {
  className?: string;
}

interface StyledProps {
  className: string;
}

const { Header } = Layout;
const { confirm } = Modal;

const StyledHeaderWithMenu = styled(Header)<StyledProps>`
  background-color: ${({ className, theme }) =>
    className === 'green-header' ? theme.PRIMARY : '#ffffff'};

  & svg {
    fill: #ffffff;
  }
`;

const HeaderWithMenu: FC<Props> = ({ className = 'white-header' }) => {
  const history = useHistory();
  const [visible, onOpen, onClose] = useModal();
  const [logoutMutation] = useCustomMutation<Logout>(LOGOUT, {
    onCompleted: ({ logout }) => {
      if (logout.result === 'success') {
        history.push('/signin');
      }
    },
  });

  const onClickCompletedOrders = () => {
    history.push('/orderHistory');
  };

  const onClickLogout = () => {
    confirm({
      title: '로그아웃',
      content: Message.LogOutMessage,
      onOk() {
        logoutMutation();
      },
      okText: '확인',
      cancelText: '취소',
    });
  };

  return (
    <StyledHeaderWithMenu className={className}>
      <MenuOutlined data-testID="header-menu-toggle" onClick={onOpen} />
      <Drawer
        data-testID="header-menu"
        closable={false}
        onClose={onClose}
        visible={visible}
        placement="left"
      >
        <Button type="link" data-testID="history-button" onClick={onClickCompletedOrders}>
          이용 기록
        </Button>
        <br />
        <Button type="link" data-testID="logout-button" onClick={onClickLogout}>
          로그아웃
        </Button>
      </Drawer>
    </StyledHeaderWithMenu>
  );
};

export default HeaderWithMenu;
