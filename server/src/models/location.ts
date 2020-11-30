import { Schema } from 'mongoose';

export interface Location {
  coordinates: number[];
}

const locationSchema = new Schema(
  {
    address: String,
    coordinates: [Number],
  },
  { _id: false },
);

export default locationSchema;
