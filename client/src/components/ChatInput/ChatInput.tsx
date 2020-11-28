import React, { FC } from 'react';

import Input from '@components/Input';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';
import useChange from '@hooks/useChange';

const StyledChatInput = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  padding: 0.5rem;

  & > div {
    width: 80%;
    margin-right: 0.5rem;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  }

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 2.1rem;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  }
`;

const ChatInput: FC = () => {
  const [chatContent, , onChangeChatContent] = useChange('');

  return (
    <>
      <StyledChatInput>
        <Input
          type="text"
          placeholder="채팅을 입력해 주세요."
          value={chatContent}
          onChange={onChangeChatContent}
        ></Input>
        <Button type="primary">전송</Button>
      </StyledChatInput>
    </>
  );
};

export default ChatInput;
