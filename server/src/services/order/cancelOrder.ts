import Order from '@models/order';

const cancelOrder = async (userId: string, orderId: string) => {
  try {
    await Order.findOneAndDelete({ _id: orderId, user: userId });
    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default cancelOrder;
