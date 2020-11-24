import { Schema, model } from 'mongoose';

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
  payment: {
    type: {
      bank: { type: String, required: true },
      creditNumber: { type: String, required: true },
      expiryDate: { type: String, required: true },
      cvc: { type: Number, required: true },
    },
    required: false,
  },
  driver: {
    type: {
      licenseNumber: { type: String, required: true },
      status: { type: String, enum: ['waiting', 'driving'], required: true },
      car: {
        type: {
          carNumber: { type: String, required: true },
          carType: { type: String, enum: ['small', 'middle', 'large'], required: true },
        },
        required: true,
      },
    },
    required: false,
  },
  location: {
    coordinates: [Number],
  },
  refreshToken: Schema.Types.String,
});

export default model('User', userSchema);
