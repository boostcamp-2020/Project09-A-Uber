import React, { FC, ChangeEvent } from 'react';
import { Space, Input, Button } from 'antd';

import styled from '@theme/styled';

interface Props {
  chatContent: string;
  onClickSubmitButton: () => void;
  onChangeChatContent: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledChatInput = styled.form`
  padding: 0.8rem;
`;

const ChatInput: FC<Props> = ({
  chatContent,
  onClickSubmitButton,
  onChangeChatContent,
  onSubmit,
}) => {
  return (
    <StyledChatInput onSubmit={onSubmit}>
      <Space>
        <Input
          type="text"
          placeholder="채팅을 입력해 주세요."
          value={chatContent}
          onChange={onChangeChatContent}
        />
        <Button type="primary" disabled={!chatContent} onClick={onClickSubmitButton}>
          전송
        </Button>
      </Space>
    </StyledChatInput>
  );
};

export default ChatInput;
