import { Resolvers } from '@type/api';

import createDriver from '@services/user/createDriver';

const resolvers: Resolvers = {
  Mutation: {
    signupDriver: async (_, { name, email, password, phone, driver }) => {
      const { result, error } = await createDriver({ name, email, password, phone, driver });
      if (result === 'fail') {
        return { result, error };
      }
      return { result: 'success' };
    },
  },
};

export default resolvers;
