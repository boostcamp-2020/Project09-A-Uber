import React, { FC, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import HeaderWithBack from '@components/HeaderWithBack';
import ChatLog from '@components/ChatLog';
import ChatInput from '@components/ChatInput';
import styled from '@theme/styled';
import { useCustomQuery } from '@hooks/useApollo';
import { GET_USER_INFO } from '@queries/user.queries';
import { CREATE_CHAT, GET_CHAT } from '@queries/chat.queries';
import { GetUserInfo, GetChat, GetUserInfo_getUserInfo_user as User } from '@/types/api';

interface ChatID {
  chatId: string;
}

const StyledChatRoom = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledChatMain = styled.div`
  flex-grow: 1;
  overflow: scroll;
`;

const ChatRoom: FC = () => {
  const history = useHistory();
  const { chatId } = useParams<ChatID>();
  const { data: userInfo } = useCustomQuery<GetUserInfo>(GET_USER_INFO);
  const { _id: userId } = userInfo?.getUserInfo.user as User;
  const { data: chatData } = useCustomQuery<GetChat>(GET_CHAT, { variables: { chatId } });
  const chatList = chatData?.getChat.chat;

  const onClickBackButton = () => {
    history.push('/signin');
  };

  return (
    <StyledChatRoom>
      <HeaderWithBack onClick={onClickBackButton} className="green-header" />
      {/* <StyledChatMain>
        {Chat.map((item) => (
          <ChatLog key={`chat_${item.id}`} {...item}></ChatLog>
        ))}
      </StyledChatMain> */}
      <ChatInput></ChatInput>
    </StyledChatRoom>
  );
};

export default ChatRoom;
