import { Schema } from 'mongoose';

const carSchema = new Schema(
  {
    carNumber: { type: String, required: true },
    carType: { type: String, enum: ['small', 'middle', 'large'], required: true },
  },
  { _id: false },
);

export default carSchema;
