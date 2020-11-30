import User from '@models/user';
import { Location } from '@models/location';

interface UpdateLocationProps {
  userId?: string;
  curLocation: Location;
}

const updateDriverLocation = async ({ userId, curLocation }: UpdateLocationProps) => {
  try {
    await User.updateOne(
      { _id: userId },
      {
        location: curLocation,
      },
    );
    return { result: 'success' };
  } catch (err) {
    return { result: 'fail', error: err.message };
  }
};

export default updateDriverLocation;
