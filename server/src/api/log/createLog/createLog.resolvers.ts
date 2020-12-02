import { Resolvers } from '@type/api';
import createLog from '@services/log/createLog';

const resolvers: Resolvers = {
  Mutation: {
    createLog: async (_, { orderId, paymentAmount }) => {
      const { result, error } = await createLog({
        orderId,
        paymentAmount,
      });

      if (result === 'fail') return { result: 'fail', error };

      return { result: 'success' };
    },
  },
};

export default resolvers;
