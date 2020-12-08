/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '../src/models/user';
import Order from '../src/models/order';

import { orders } from './orders.seeder.json';
import { users } from './users.seeder.json';

dotenv.config();

const { TEST_DB, DB_HOST } = process.env;

// eslint-disable-next-line no-shadow
enum message {
  CONNECT_ERROR = '✖ mongodb connection error',
  CONNECT_SUCCEED = '✔ mongodb connected',
  RESET_DB_SUCCEED = '✔ Reset Test DB',
  RESET_DB_FAILURE = '✖ Not Reset Test DB',
  INSERT_USERS_SUCCEED = '✔ User Seeder Success',
  INSERT_USERS_FAILURE = '✖ User Seeder Failure',
  INSERT_ORDERS_SUCCEED = '✔ Order Seeder Success',
  INSERT_ORDERS_FAILURE = '✖ Order Seeder Failure',
}

(() => {
  mongoose
    .connect(DB_HOST!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName: TEST_DB!,
    })
    .then(async () => {
      // db reset
      await mongoose.connection.db
        .dropDatabase()
        .then(() => console.log(message.RESET_DB_SUCCEED))
        .catch((err) => console.log(err, message.RESET_DB_FAILURE));

      // insert data
      await User.insertMany(users)
        .then(() => console.log(message.INSERT_USERS_SUCCEED))
        .catch(() => console.log(message.INSERT_USERS_FAILURE));
      await Order.insertMany(orders)
        .then(() => console.log(message.INSERT_ORDERS_SUCCEED))
        .catch(() => console.log(message.INSERT_ORDERS_FAILURE));
    })
    .catch((err) => console.error(message.CONNECT_ERROR, err))
    .finally(() => {
      mongoose.disconnect();
    });
})();
