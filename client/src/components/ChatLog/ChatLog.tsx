import React, { FC } from 'react';
import { Avatar } from 'antd';

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
  align-items: center;
  padding: 0.5rem;

  & .chat-content {
    padding: 0.6rem 1rem;
    background-color: ${({ theme, type, writer }) =>
      type === writer ? theme.PRIMARY : theme.BORDER};
    color: ${({ theme }) => theme.LIGHT};
    border-radius: 0.4rem;
    margin-left: ${({ writer, preWriter }) => writer === preWriter && '2.1rem'};
  }
`;

const avartarMapper = (avartar: string): string => {
  return avartar === 'user' ? 'D' : 'U';
};

const ChatLog: FC<Props> = ({ content, writer, type, avartar, preWriter }) => {
  return (
    <StyledChatLogWrapper type={type} writer={writer} preWriter={preWriter}>
      {type !== writer && preWriter !== writer && <Avatar>{avartarMapper(avartar)}</Avatar>}
      <span className="chat-content">{content}</span>
    </StyledChatLogWrapper>
  );
};

export default ChatLog;
