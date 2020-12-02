import React, { FC, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import HeaderWithBack from '@components/HeaderWithBack';
import ChatLog from '@components/ChatLog';
import ChatInput from '@components/ChatInput';
import styled from '@theme/styled';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import { GET_USER_INFO } from '@queries/user.queries';
import { CREATE_CHAT, GET_CHAT, SUB_CHAT } from '@queries/chat.queries';
import {
  GetUserInfo,
  GetChat,
  GetUserInfo_getUserInfo_user as User,
  GetChat_getChat_chats as ChatType,
  SubChat,
} from '@/types/api';
import useChange from '@/hooks/useChange';

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
  const chatRef = useRef<HTMLDivElement>(null);
  const { chatId } = useParams<ChatID>();
  const { data: userInfo } = useCustomQuery<GetUserInfo>(GET_USER_INFO);
  const { _id: userId } = userInfo?.getUserInfo.user as User;
  const { data: chatData, subscribeToMore } = useCustomQuery<GetChat>(GET_CHAT, {
    variables: { chatId },
  });
  const [CreateChat] = useCustomMutation(CREATE_CHAT);
  const [chatContent, setChatContent, onChangeChatContent] = useChange('');
  const chatList = chatData?.getChat.chats;

  const onClickBackButton = () => {
    history.goBack();
  };

  const onClickSubmitButton = () => {
    CreateChat({
      variables: { chatId, writer: userId, createdAt: '2020-12-01', content: chatContent },
    });
    setChatContent('');
  };

  useEffect(() => {
    subscribeToMore({
      document: SUB_CHAT,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { subChat } = (subscriptionData.data as unknown) as SubChat;
        const newChat = subChat.chat as ChatType;

        return { ...prev, getChat: { ...prev.getChat, chats: [...prev.getChat.chats, newChat] } };
      },
    });
  }, []);

  useEffect(() => {
    chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
  }, [chatList]);

  return (
    <StyledChatRoom>
      <HeaderWithBack onClick={onClickBackButton} className="green-header" />
      <StyledChatMain ref={chatRef}>
        {chatList &&
          chatList?.length !== 0 &&
          chatList.map((item) => (
            <ChatLog key={`chat_${item?.createdAt}`} {...item} type={userId}></ChatLog>
          ))}
      </StyledChatMain>
      <ChatInput
        chatContent={chatContent}
        onChangeChatContent={onChangeChatContent}
        onClickSubmitButton={onClickSubmitButton}
      ></ChatInput>
    </StyledChatRoom>
  );
};

export default ChatRoom;
