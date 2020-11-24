import { Schema } from 'mongoose';

const locationSchema = new Schema({ coordinates: [Number] }, { _id: false });

export default locationSchema;
