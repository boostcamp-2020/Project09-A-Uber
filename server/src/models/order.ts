import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, required: true },
  driver: Schema.Types.ObjectId,
  payment: {
    type: {
      bank: { type: String, required: true },
      creditNumber: { type: String, required: true },
      expiryDate: { type: String, required: true },
      cvc: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
    required: false,
  },
  startingPoint: {
    type: {
      coordinates: [Number],
    },
    required: true,
  },
  destination: {
    type: {
      coordinates: [Number],
    },
    required: true,
  },
  status: { type: String, enum: ['close', 'active'], required: true },
  chat: [
    {
      createdAt: { type: Date, default: Date.now },
      writer: { type: Schema.Types.ObjectId, required: true },
      content: { type: String, required: true },
    },
  ],
  startedAt: Schema.Types.Date,
  completedAt: Schema.Types.Date,
});

export default model('Order', orderSchema);
