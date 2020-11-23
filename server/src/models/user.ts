import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
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
