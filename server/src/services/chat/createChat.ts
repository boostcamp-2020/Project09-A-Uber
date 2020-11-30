import OrderModel from '@models/order';

interface Props {
  chatId: string;
  content: string;
  writer: string;
  createdAt: string;
}

const insertChat = async ({ writer, createdAt, chatId, content }: Props) => {
  try {
    await OrderModel.updateOne(
      { _id: chatId },
      { $push: { chat: { writer, content, createdAt } } },
    );

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default insertChat;
