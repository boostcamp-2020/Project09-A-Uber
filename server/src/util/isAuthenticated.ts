import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import passport from 'passport';

const JWT_HEADER = process.env.JWT_HEADER as string;

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async function (...args) {
      const [, , { req, res }] = args;
      if (!req.headers.authorization) {
        const cookie = req.cookies[JWT_HEADER];
        req.headers.authorization = cookie && `Bearer ${cookie}`;
      }

      await new Promise((resFn) => {
        passport.authenticate('jwt', (error, payload, { message } = {}) => {
          if (error || !payload) return res.status(401).send({ data: { result: 'fail', message } });
          req.user = payload?.get('_id');
          resFn();
        })(req, res);
      });

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
