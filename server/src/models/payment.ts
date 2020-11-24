import { Schema } from 'mongoose';

const paymentSchema = new Schema(
  {
    bank: { type: String, required: true },
    creditNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvc: { type: Number, required: true },
  },
  { _id: false },
);

export default paymentSchema;
