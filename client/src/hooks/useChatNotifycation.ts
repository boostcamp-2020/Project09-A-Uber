import { useSubscription } from '@apollo/react-hooks';
import { message } from 'antd';

import { SUB_CHAT } from '@queries/chat';
import { SubChat } from '@/types/api';

const CHAT_DURATION = 1;
const CHAT_MAX_COUNT = 5;

const useChatNotifycation = (id: string) => {
  const subscriptionResult = useSubscription<SubChat>(SUB_CHAT, {
    variables: { chatId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.subChat.chat) {
        message.config({
          duration: CHAT_DURATION,
          maxCount: CHAT_MAX_COUNT,
        });
        message.info(subscriptionData.data.subChat.chat.content, CHAT_DURATION);
      }
    },
  });

  return subscriptionResult;
};

export default useChatNotifycation;
