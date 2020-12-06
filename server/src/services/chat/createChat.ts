import OrderModel from '@models/order';
import { Message } from '@util/server-message';

interface Props {
  chatId: string;
  content: string;
  writer: string;
}

const insertChat = async ({ writer, chatId, content }: Props) => {
  try {
    const { ok: isUpdated } = await OrderModel.updateOne(
      { _id: chatId },
      { $push: { chat: { writer, content } } },
    );

    if (!isUpdated) {
      return { result: 'fail', chat: null, error: Message.ChatNotCreated };
    }

    const newChat = {
      writer,
      content,
    };

    return { result: 'success', chat: newChat };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default insertChat;
