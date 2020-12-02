import React, { FC, ChangeEvent } from 'react';

import Input from '@components/Input';
import { Button } from 'antd-mobile';
import styled from '@theme/styled';

interface Props {
  chatContent: string;
  onClickSubmitButton: () => void;
  onChangeChatContent: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const StyledChatInput = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  padding: 1.5rem;

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

const ChatInput: FC<Props> = ({
  chatContent,
  onClickSubmitButton,
  onChangeChatContent,
  onKeyPressEnter,
}) => {
  return (
    <StyledChatInput>
      <Input
        type="text"
        placeholder="채팅을 입력해 주세요."
        value={chatContent}
        onChange={onChangeChatContent}
        onKeyPress={onKeyPressEnter}
      ></Input>
      <Button type="primary" onClick={onClickSubmitButton}>
        전송
      </Button>
    </StyledChatInput>
  );
};

export default ChatInput;
