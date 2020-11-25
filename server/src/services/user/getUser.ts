import User from '@models/user';
import { User as UserType } from '@type/api';
import { Message } from '@util/server-message';

interface GetUserResponse {
  user: UserType | null;
  error?: string;
}

const getUser = async (email: string): Promise<GetUserResponse> => {
  try {
    const user = (await User.findOne({ email })) as UserType | null;

    if (!user) {
      return { user: null, error: Message.NotSignedUpUser };
    }
    return { user };
  } catch (err) {
    console.error(err);
    return { user: null, error: err.message };
  }
};

export default getUser;
