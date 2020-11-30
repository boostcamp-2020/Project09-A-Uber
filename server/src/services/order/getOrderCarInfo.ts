import Order from '@models/order';

const getOrderCarInfo = async (userId: string, orderId: string) => {
  try {
    const order = await Order.findOne({ _id: orderId, user: userId }, 'driver').populate('driver');
    const carInfo = order?.get('driver.driver.car');

    if (!carInfo) {
      return { result: 'fail' };
    }

    return { result: 'success', carInfo };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default getOrderCarInfo;
