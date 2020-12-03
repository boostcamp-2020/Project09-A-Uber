import Order from '@models/order';

const completeOrder = async (orderId: string) => {
  try {
    await Order.findByIdAndUpdate(orderId, {
      status: 'close',
      completedAt: Date.now(),
    });
    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default completeOrder;
