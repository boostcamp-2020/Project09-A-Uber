import { Schema } from 'mongoose';

const chatSchema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    writer: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);

export default chatSchema;
