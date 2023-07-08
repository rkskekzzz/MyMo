import { Schema, model } from 'mongoose';
import { Note } from '../interface/entity';

const schema = new Schema<Note>(
  {
    _id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    syncedAt: {
      type: Date,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true, versionKey: false }
);

export default model<Note>('Note', schema);
