import { InitOrder, User as UserType } from '@type/api';
import Order from '@models/order';
import User from '@models/user';
import { Message } from '@util/server-message';

interface Payload {
  user?: string;
  driver?: string;
}

const getUserWithOrder = async (userId: string, userType: string) => {
  try {
    const user = (await User.findById({ _id: userId })) as UserType | null;

    if (!user) {
      return { result: 'fail', user: null, error: Message.NotSignedUpUser };
    }

    const payload: Payload = {};

    if (userType === 'user') {
      payload.user = userId;
    }
    if (userType === 'driver') {
      payload.driver = userId;
    }

    const [order] =
      (((await Order.find(payload)
        .or([{ status: 'waiting' }, { status: 'approval' }, { status: 'startedDrive' }])
        .sort({ createdAt: -1 })
        .limit(1)) as unknown) as [InitOrder]) || null;

    return { result: 'success', user, order };
  } catch (err) {
    return { result: 'fail', order: null, error: err.message };
  }
};

export default getUserWithOrder;
