import User, { LoginType, loginType } from '@models/user';
import { Location } from '@models/location';
import Order from '@models/order';
import { Message } from '@util/server-message';

interface UpdateLocationProps {
  userId?: string;
  userType?: LoginType;
  curLocation: Location;
}

const updateDriverLocation = async ({ userId, userType, curLocation }: UpdateLocationProps) => {
  try {
    if (userType !== loginType.driver) {
      return { result: 'fail', error: Message.NotDriverUser };
    }
    await User.updateOne(
      { _id: userId },
      {
        location: { coordinates: curLocation.coordinates },
      },
    );

    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default updateDriverLocation;
