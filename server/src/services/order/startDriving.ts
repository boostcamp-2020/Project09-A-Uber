import Order from '@models/order';

const startDriving = async (orderId: string) => {
  try {
    const result = await Order.findByIdAndUpdate(orderId, { startedAt: new Date() });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default startDriving;
