import React, { FC } from 'react';
import { Layout, Space } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import styled from '@theme/styled';

const { Header } = Layout;

interface Props {
  onClick: () => void;
  className?: string;
}

const StyledHeaderWithBack = styled(Header)`
  background-color: ${({ className, theme }) =>
    className === 'green-header' ? theme.PRIMARY : theme.LIGHT};

  & svg {
    color: ${({ className, theme }) =>
      className === 'green-header' ? theme.LIGHT : theme.PRIMARY};
  }
`;

const HeaderWithBack: FC<Props> = ({ onClick, className = 'white-header' }) => (
  <StyledHeaderWithBack className={className} hasSider>
    <Space align="center">
      <LeftOutlined onClick={onClick} />
    </Space>
  </StyledHeaderWithBack>
);

export default HeaderWithBack;
