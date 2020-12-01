import OrderModel from '@models/order';
import getChatList from '@services/chat/getChat';
import { Message } from '@util/server-message';

interface Props {
  chatId: string;
  content: string;
  writer: string;
  createdAt: string;
}

const insertChat = async ({ writer, createdAt, chatId, content }: Props) => {
  try {
    const { ok: isUpdated } = await OrderModel.updateOne(
      { _id: chatId },
      { $push: { chat: { writer, content, createdAt } } },
    );

    if (!isUpdated) {
      return { result: 'fail', chat: null, error: Message.ChatNotCreated };
    }

    // const { chat, result } = await getChatList(chatId);
    const newChat = {
      writer,
      createdAt,
      content,
    };

    return { result: 'success', chat: newChat };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default insertChat;
