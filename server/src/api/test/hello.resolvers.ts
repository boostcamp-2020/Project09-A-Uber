const resolvers = {
  Query: {
    hello: () => {
      return { result: 'hello graphql', error: 'test error' };
    },
  },
};

export default resolvers;
