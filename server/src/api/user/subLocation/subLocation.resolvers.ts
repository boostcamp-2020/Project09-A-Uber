/* eslint-disable eqeqeq */
import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';
import { UPDATE_DRIVER_LOCATION } from '@api/user/updateDriverLocation/updateDriverLocation.resolvers';

const resolvers: Resolvers = {
  Subscription: {
    subLocation: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(UPDATE_DRIVER_LOCATION),
        (payload, variables) => {
          return payload.subLocation.orderId == variables.orderId;
        },
      ),
    },
  },
};

export default resolvers;
