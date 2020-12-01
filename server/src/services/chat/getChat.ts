import OrderModel from '@models/order';

const getChatList = async (orderId: string) => {
  try {
    const chats = await OrderModel.findById(orderId, 'chat');

    return { result: 'success', chats: chats?.get('chat') };
  } catch (err) {
    return { result: 'fail', chats: null, error: err.message };
  }
};

export default getChatList;
