import { Schema } from 'mongoose';

import carSchema from './car';

const driverSchema = new Schema(
  {
    licenseNumber: { type: String, required: true },
    status: { type: String, enum: ['waiting', 'driving'], required: true },
    car: { type: carSchema, required: true },
  },
  { _id: false },
);

export default driverSchema;
