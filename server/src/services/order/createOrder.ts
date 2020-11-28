import User from '@models/user';
import Order from '@models/order';
import { Location } from '@models/location';

interface CreateOrderProps {
  user: string;
  startingPoint: Location;
  destination: Location;
}

const createOrder = async ({ user, startingPoint, destination }: CreateOrderProps) => {
  try {
    const userPayment = await User.findById(user, 'payment');
    if (!userPayment) {
      return { result: 'fail', error: 'bad id' };
    }
    const createdOrder = await Order.create({
      user,
      startingPoint,
      destination,
      payment: userPayment.get('payment'),
      status: 'active',
    });
    return { result: 'success', orderId: createdOrder.get('_id') };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default createOrder;
