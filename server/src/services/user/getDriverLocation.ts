import Order from '@models/order';

const getDriverLocation = async (orderId: string) => {
  try {
    const order = await Order.findOne({ _id: orderId }).populate('driver');
    const LocationCoordinates = order?.get('driver.location.coordinates');

    if (!order) {
      return { result: 'fail' };
    }

    const driverLocation = {
      lat: LocationCoordinates[0],
      lng: LocationCoordinates[1],
    };

    return { result: 'success', driverLocation };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default getDriverLocation;
