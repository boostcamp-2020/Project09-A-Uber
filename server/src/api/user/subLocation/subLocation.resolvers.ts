/* eslint-disable eqeqeq */
import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';
import { DIRVER_UPADTE } from '@api/user/updateLocation/updateLocation.resolvers';

const resolvers: Resolvers = {
  Subscription: {
    subLocation: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(DIRVER_UPADTE),
        (payload, variables) => {
          return payload.subLocation.orderId == variables.orderId;
        },
      ),
    },
  },
};

export default resolvers;
