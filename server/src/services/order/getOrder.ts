import { Order as OrderType } from '@type/api';
import Order from '@models/order';
import { Message } from '@util/server-message';

interface GetOrderProps {
  orderId: string;
  driverId: string;
}

const getOrder = async ({ orderId, driverId }: GetOrderProps) => {
  try {
    const order = (await Order.findOne({ _id: orderId, driver: driverId })) as OrderType | null;

    if (!order) {
      return { result: 'fail', order: null, error: Message.OrderNotFound };
    }
    return { result: 'success', order };
  } catch (err) {
    return { result: 'fail', order: null, error: err.message };
  }
};

export default getOrder;
