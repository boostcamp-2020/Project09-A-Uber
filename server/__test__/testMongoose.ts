import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { TEST_DB, DB_HOST } = process.env;

// eslint-disable-next-line no-shadow
enum message {
  CONNECT_ERROR = 'mongodb connection error',
  CONNECT_SUCCEED = 'mongodb connected',
}

export const connect = () => {
  const connectDB = () => {
    mongoose.connect(DB_HOST!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName: TEST_DB,
    });
  };

  connectDB();
};

export const disconnect = () => mongoose.disconnect();
