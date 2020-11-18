import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_HOST } = process.env;

// eslint-disable-next-line no-shadow
const enum message {
  CONNECT_ERROR = 'mongodb connection error',
  CONNECT_SUCCEED = 'mongodb connected',
}

export default () => {
  const connect = () => {
    mongoose
      .connect(DB_HOST!, { useNewUrlParser: true, useUnifiedTopology: true, dbName: DB_NAME })
      .then(() => console.log(message.CONNECT_SUCCEED))
      .catch((err) => console.error(message.CONNECT_ERROR, err));
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
