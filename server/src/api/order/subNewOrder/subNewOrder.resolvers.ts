import { Resolvers } from '@type/api';
import { withFilter } from 'apollo-server-express';
import { CREATE_NEW_ORDER } from '@api/order/createOrder/createOrder.resolvers';
import { calcLocationDistance } from '@util/calcLocationDistance';
import { ORDER } from '@util/enums';

const resolvers: Resolvers = {
  Subscription: {
    subNewOrder: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(CREATE_NEW_ORDER),
        (payload, variables) => {
          const { coordinates } = payload.subNewOrder.newOrder.startingPoint;
          const newOrderStartingPoint = {
            lat: coordinates[0],
            lng: coordinates[1],
          };
          const driverLocation = variables;
          return (
            calcLocationDistance(newOrderStartingPoint, driverLocation) <= ORDER.POSSIBLE_DISTANCE
          );
        },
      ),
    },
  },
};

export default resolvers;
