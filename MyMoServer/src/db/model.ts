import { Schema, model } from 'mongoose';
import { Memo } from '../interface/entity';

const schema = new Schema<Memo>(
  {
    _id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isSync: {
      type: Boolean,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default model<Memo>('Memo', schema);
