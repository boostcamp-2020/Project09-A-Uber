import React, { FC } from 'react';
import { Space, Avatar, Tag } from 'antd';

import styled from '@theme/styled';

interface Props {
  writer?: string;
  content?: string;
  type: string;
  avartar: string;
  preWriter?: string;
}

interface Type {
  type: string;
  writer: string | undefined;
  preWriter: string | undefined;
}

const StyledChatLogWrapper = styled.div<Type>`
  display: flex;
  flex-direction: ${({ type, writer }) => type === writer && 'row-reverse'};
  padding: 0.3rem 0.5rem;
`;

const avartarMapper = (avartar: string): string => {
  return avartar === 'user' ? 'D' : 'U';
};

const ChatLog: FC<Props> = ({ content, writer, type, avartar, preWriter }) => {
  return (
    <StyledChatLogWrapper type={type} writer={writer} preWriter={preWriter}>
      <Space>
        {type !== writer && preWriter !== writer && <Avatar>{avartarMapper(avartar)}</Avatar>}
        <Tag>{content}</Tag>
      </Space>
    </StyledChatLogWrapper>
  );
};

export default ChatLog;
