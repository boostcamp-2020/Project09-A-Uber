import { useSubscription } from '@apollo/react-hooks';
import { message } from 'antd';

import { SUB_CHAT } from '@queries/chat';
import { SubChat } from '@/types/api';

const useChatNotifycation = (id: string) => {
  const subscriptionResult = useSubscription<SubChat>(SUB_CHAT, {
    variables: { chatId: id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data?.subChat.chat) {
        message.info(subscriptionData.data.subChat.chat.content, 1);
      }
    },
  });

  return subscriptionResult;
};

export default useChatNotifycation;
