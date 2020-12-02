import { Order as OrderType } from '@type/api';
import Order from '@models/order';
import { Message } from '@util/server-message';

const getOrderById = async (orderId: string) => {
  try {
    const order = (await Order.findById(orderId)) as OrderType | null;

    if (!order) {
      return { result: 'fail', order: null, error: Message.OrderNotFound };
    }
    return { result: 'success', order };
  } catch (err) {
    return { result: 'fail', order: null, error: err.message };
  }
};

export default getOrderById;
