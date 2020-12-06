import Order from '@models/order';

const startDriving = async (orderId: string) => {
  try {
    await Order.findByIdAndUpdate(orderId, {
      status: 'startedDrive',
      startedAt: new Date(),
    });

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default startDriving;
