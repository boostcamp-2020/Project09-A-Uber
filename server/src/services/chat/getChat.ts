import OrderModel from '@models/order';

const getChatList = async (orderId: string) => {
  try {
    const chat = await OrderModel.findById(orderId, 'chat');

    return { result: 'success', chat: chat?.get('chat') };
  } catch (err) {
    return { result: 'fail', chat: null, error: err.message };
  }
};

export default getChatList;
