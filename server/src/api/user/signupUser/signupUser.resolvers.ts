import { Resolvers } from '@type/api';

import createUser from '@services/user/createUser';

const resolvers: Resolvers = {
  Mutation: {
    signupUser: async (_, { name, email, password, phone, payment }) => {
      const { result, error } = await createUser({ name, email, password, phone, payment });

      if (result === 'fail') {
        return { result, error };
      }

      return { result };
    },
  },
};

export default resolvers;
