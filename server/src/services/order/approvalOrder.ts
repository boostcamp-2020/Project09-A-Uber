import Order from '@models/order';

const approvalOrder = async (driverId: string, orderId: string) => {
  try {
    await Order.findByIdAndUpdate(orderId, { driver: driverId });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default approvalOrder;
