import { Schema, model } from 'mongoose';

import locationSchema from './location';

const logSchema = new Schema({
  id: Schema.Types.ObjectId,
  order: { type: Schema.Types.ObjectId, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  driver: { type: Schema.Types.ObjectId, required: true },
  origin: { type: locationSchema, required: true },
  destination: { type: locationSchema, required: true },
  paymentAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default model('Log', logSchema);
