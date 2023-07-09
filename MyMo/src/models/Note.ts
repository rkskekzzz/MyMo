import Realm from 'realm';

export type CreateNoteDTO = Pick<
  Note,
  '_id' | 'title' | 'content' | 'updatedAt' | 'createdAt' | 'deletedAt'
>;
export type UpdateNoteDTO = Pick<Note, '_id' | 'title' | 'content' | 'updatedAt' | 'deletedAt'>;
export type DeleteNoteDto = Pick<Note, '_id' | 'deletedAt'>;

export class Note extends Realm.Object {
  _id!: string;
  title!: string;
  content!: string;
  syncedAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  static generate() {
    return {
      _id: new Realm.BSON.ObjectId().toHexString(),
      title: '',
      content: '',
      syncedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };
  }

  static schema = {
    name: 'Note',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      content: 'string',
      syncedAt: { type: 'date', optional: true },
      createdAt: 'date',
      updatedAt: 'date',
      deletedAt: { type: 'date', optional: true }
    }
  };
}
