import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import HeaderWithBack from '@components/HeaderWithBack';
import ChatLog from '@components/ChatLog';
import ChatInput from '@components/ChatInput';
import styled from '@theme/styled';

const Chat = [
  {
    id: 0,
    createdAt: '2020-11-28 18:46:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '안녕하세요. 빨리 가겠습니다. 좀만 기다려 주세요~',
    type: 'driver',
  },
  {
    id: 1,
    createdAt: '2020-11-28 18:47:23',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네네 천천히 오세요 ㅎㅎ',
    type: 'me',
  },
  {
    id: 2,
    createdAt: '2020-11-28 18:48:28',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '거의 다 도착했습니다. 탑승 준비해주세요!',
    type: 'driver',
  },
  {
    id: 3,
    createdAt: '2020-11-28 18:49:40',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네 지금 출발지 앞에서 기다리고 있어요!',
    type: 'me',
  },
  {
    id: 4,
    createdAt: '2020-11-28 18:51:40',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '도착했습니다! 어디신가요?',
    type: 'driver',
  },
  {
    id: 5,
    createdAt: '2020-11-28 18:52:20',
    writer: '5fbc9eacadc14b373c78f376',
    content: '아 저기 보이네요! 이제 갈게요',
    type: 'me',
  },
  {
    id: 6,
    createdAt: '2020-11-28 18:53:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '네 알겠습니다~ 안전하게 모실게요',
    type: 'driver',
  },
  {
    id: 0,
    createdAt: '2020-11-28 18:46:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '안녕하세요. 빨리 가겠습니다. 좀만 기다려 주세요~',
    type: 'driver',
  },
  {
    id: 1,
    createdAt: '2020-11-28 18:47:23',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네네 천천히 오세요 ㅎㅎ',
    type: 'me',
  },
  {
    id: 2,
    createdAt: '2020-11-28 18:48:28',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '거의 다 도착했습니다. 탑승 준비해주세요!',
    type: 'driver',
  },
  {
    id: 3,
    createdAt: '2020-11-28 18:49:40',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네 지금 출발지 앞에서 기다리고 있어요!',
    type: 'me',
  },
  {
    id: 4,
    createdAt: '2020-11-28 18:51:40',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '도착했습니다! 어디신가요?',
    type: 'driver',
  },
  {
    id: 5,
    createdAt: '2020-11-28 18:52:20',
    writer: '5fbc9eacadc14b373c78f376',
    content: '아 저기 보이네요! 이제 갈게요',
    type: 'me',
  },
  {
    id: 6,
    createdAt: '2020-11-28 18:53:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '네 알겠습니다~ 안전하게 모실게요',
    type: 'driver',
  },
  {
    id: 0,
    createdAt: '2020-11-28 18:46:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '안녕하세요. 빨리 가겠습니다. 좀만 기다려 주세요~',
    type: 'driver',
  },
  {
    id: 1,
    createdAt: '2020-11-28 18:47:23',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네네 천천히 오세요 ㅎㅎ',
    type: 'me',
  },
  {
    id: 2,
    createdAt: '2020-11-28 18:48:28',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '거의 다 도착했습니다. 탑승 준비해주세요!',
    type: 'driver',
  },
  {
    id: 3,
    createdAt: '2020-11-28 18:49:40',
    writer: '5fbc9eacadc14b373c78f376',
    content: '네 지금 출발지 앞에서 기다리고 있어요!',
    type: 'me',
  },
  {
    id: 4,
    createdAt: '2020-11-28 18:51:40',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '도착했습니다! 어디신가요?',
    type: 'driver',
  },
  {
    id: 5,
    createdAt: '2020-11-28 18:52:20',
    writer: '5fbc9eacadc14b373c78f376',
    content: '아 저기 보이네요! 이제 갈게요',
    type: 'me',
  },
  {
    id: 6,
    createdAt: '2020-11-28 18:53:00',
    writer: '5fc21d7f189d411e6cb67e10',
    content: '네 알겠습니다~ 안전하게 모실게요',
    type: 'driver',
  },
];

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
  const onClickBackButton = () => {
    history.push('/signin');
  };

  return (
    <StyledChatRoom>
      <HeaderWithBack onClick={onClickBackButton} className="green-header" />
      <StyledChatMain>
        {Chat.map((item) => (
          <ChatLog key={`chat_${item.id}`} {...item}></ChatLog>
        ))}
      </StyledChatMain>
      <ChatInput></ChatInput>
    </StyledChatRoom>
  );
};

export default ChatRoom;
