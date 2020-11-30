import Order from '@models/order';
import getUnassignedOrders from '@services/order/getUnassingedOrders';

const approvalOrder = async (driverId: string, orderId: string) => {
  try {
    await Order.findByIdAndUpdate(orderId, { driver: driverId, status: 'active' });
    const { unassignedOrders } = await getUnassignedOrders(driverId || '');

    return { result: 'success', unassignedOrders };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default approvalOrder;
