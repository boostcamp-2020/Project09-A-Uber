import { Schema, model } from 'mongoose';

import paymentSchema from './payment';
import driverSchema from './driver';
import locationSchema from './location';

export const loginType = {
  driver: '드라이버' as const,
  user: '일반 사용자' as const,
};

export type LoginType = typeof loginType[keyof typeof loginType];

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true, enum: [loginType.driver, loginType.user] },
  profile: Schema.Types.String,
  payment: { type: paymentSchema, required: false },
  driver: { type: driverSchema, required: false },
  location: locationSchema,
  refreshToken: Schema.Types.String,
});

export default model('User', userSchema);
