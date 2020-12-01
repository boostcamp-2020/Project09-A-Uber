import Order from '@models/order';
import { Order as OrderType } from '@type/api';

const getActiveDriverOrder = async (driverId: string) => {
  try {
    const order = (await Order.findOne({
      driver: driverId,
      status: 'active',
    })) as OrderType | null;
    return { inquiryResult: 'success', order };
  } catch (err) {
    return { inquiryResult: 'fail', inquiryError: err.message };
  }
};

export default getActiveDriverOrder;
