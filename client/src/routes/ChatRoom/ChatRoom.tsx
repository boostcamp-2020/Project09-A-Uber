/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';

import HeaderWithBack from '@components/HeaderWithBack';
import ChatLog from '@components/ChatLog';
import ChatInput from '@components/ChatInput';
import styled from '@theme/styled';
import { useCustomQuery, useCustomMutation } from '@hooks/useApollo';
import { CREATE_CHAT, GET_CHAT, SUB_CHAT } from '@/queries/chat';
import { GetChat, GetChat_getChat_chats as ChatType } from '@/types/api';
import useChange from '@/hooks/useChange';
import { InitialState, User } from '@reducers/.';

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
  const chatRef = useRef<HTMLDivElement>(null);
  const { _id: userId, type } = useSelector((state: InitialState) => state?.user || ({} as User));
  const [chatContent, setChatContent, onChangeChatContent] = useChange('');
  const [chats, setChats] = useState<(ChatType | null)[]>([]);
  const [CreateChat] = useCustomMutation(CREATE_CHAT);

  useSubscription(SUB_CHAT, {
    variables: {
      chatId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      const { chat } = subscriptionData.data.subChat;
      setChats([...chats, chat]);
    },
  });

  useCustomQuery<GetChat>(GET_CHAT, {
    variables: { chatId },
    onCompleted: (data) => {
      if (data.getChat.result === 'success') {
        setChats(data.getChat.chats);
      }
    },
  });

  const onClickBackButton = useCallback(() => {
    history.goBack();
  }, []);

  const onClickSubmitButton = () => {
    CreateChat({
      variables: { chatId, content: chatContent },
    });
    setChatContent('');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatContent.length > 0) {
      CreateChat({
        variables: { chatId, content: chatContent },
      });
      setChatContent('');
    }
  };

  useEffect(() => {
    chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
  }, [chats]);

  return (
    <StyledChatRoom>
      <HeaderWithBack onClick={onClickBackButton} className="green-header" />
      <StyledChatMain ref={chatRef}>
        {chats &&
          chats?.length !== 0 &&
          chats.map((item, index) => (
            <ChatLog
              key={index}
              content={item?.content}
              writer={item?.writer}
              type={userId}
              avartar={type}
              preWriter={chats[index - 1]?.writer}
            />
          ))}
      </StyledChatMain>
      <ChatInput
        chatContent={chatContent}
        onChangeChatContent={onChangeChatContent}
        onClickSubmitButton={onClickSubmitButton}
        onSubmit={onSubmit}
      />
    </StyledChatRoom>
  );
};

export default ChatRoom;
