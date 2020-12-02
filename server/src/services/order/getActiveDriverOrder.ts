import Order from '@models/order';
import { Order as OrderType } from '@type/api';

const getActiveDriverOrder = async (driverId: string) => {
  try {
    const order = (await Order.findOne({
      driver: driverId,
      status: 'active',
    })) as OrderType | null;
    return { result: 'success', order };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default getActiveDriverOrder;
