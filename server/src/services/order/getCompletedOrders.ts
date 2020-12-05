import Order from '@models/order';
import { Order as OrderType } from '@type/api';
import { loginType, LoginType } from '@models/user';

interface GetCompletedOrdersProps {
  userId: string;
  userType?: LoginType;
}

interface Query {
  user?: string;
  driver?: string;
  status: string;
}

const getCompletedOrders = async ({ userId, userType }: GetCompletedOrdersProps) => {
  try {
    const query: Query = {
      status: 'close',
    };

    if (userType === loginType.user) query.user = userId;
    else if (userType === loginType.driver) query.driver = userId;

    const completedOrders = ((await Order.find(query)) as unknown) as OrderType[];

    return { result: 'success', completedOrders };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default getCompletedOrders;
