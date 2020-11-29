import { Order as OrderType } from '@type/api';
import Order from '@models/order';
import User from '@models/user';

const EARTH_RADIUS = 6378.1; // 지구 반지름
const SEARCHING_KM = 10; // 검색 범위 (KM)

const getUnassinedOrders = async (driverId: string) => {
  try {
    const driver = await User.findById(driverId, 'location');
    const centerPoint = driver?.get('location.coordinates') || [0, 0];
    const unassignedOrders = ((await await await Order.find({
      status: 'waiting',
    })
      .where('startingPoint.coordinates')
      .within()
      .circle({
        center: centerPoint,
        radius: SEARCHING_KM / EARTH_RADIUS,
        spherical: true,
      })) as unknown) as OrderType[];

    return { result: 'success', unassignedOrders };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default getUnassinedOrders;
