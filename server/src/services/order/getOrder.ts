import { Order as OrderType } from '@type/api';
import Order from '@models/order';
import { Message } from '@util/server-message';
import { loginType, LoginType } from '@models/user';

interface GetOrderProps {
  orderId: string;
  userId: string;
  userType?: LoginType;
}

interface Query {
  _id: string;
  user?: string;
  driver?: string;
  status: string;
}

const getOrder = async ({ orderId, userId, userType }: GetOrderProps) => {
  try {
    let order;
    if (userType === loginType.user) {
      order = (await Order.findOne({
        _id: orderId,
        status: 'active',
        user: userId,
      })) as OrderType | null;
    } else if (userType === loginType.driver) {
      order = (await Order.findOne({
        _id: orderId,
        status: 'active',
        driver: userId,
      })) as OrderType | null;
    }

    if (!order) {
      return { result: 'fail', order: null, error: Message.OrderNotFound };
    }
    return { result: 'success', order };
  } catch (err) {
    return { result: 'fail', order: null, error: err.message };
  }
};

export default getOrder;
