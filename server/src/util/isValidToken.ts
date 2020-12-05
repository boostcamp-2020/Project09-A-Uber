import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import getUser from '@services/user/getUser';
import { Message } from '@util/server-message';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const isVaildToken = async (accessToken: string): Promise<boolean> => {
  try {
    const verifiedToken = jwt.verify(accessToken, JWT_SECRET_KEY) as { id: string };
    const { user, error } = await getUser(verifiedToken?.id);

    if (!user || error) {
      return false;
    }

    return true;
  } catch {
    throw new ApolloError(Message.InvalidToken, '401');
  }
};

export default isVaildToken;
