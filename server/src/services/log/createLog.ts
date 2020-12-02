import Order from '@models/order';
import Log from '@models/log';
import { Message } from '@util/server-message';

interface CreateLogProps {
  orderId: string;
  paymentAmount: number;
}

const createLog = async ({ orderId, paymentAmount }: CreateLogProps) => {
  try {
    const order = await Order.findById({ _id: orderId });

    if (!order) return { result: 'fail', error: Message.OrderNotFound };

    const createdLog = await Log.create({
      order: orderId,
      user: order.get('user'),
      driver: order.get('driver'),
      origin: order.get('startingPoint'),
      destination: order.get('destination'),
      paymentAmount,
    });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default createLog;
