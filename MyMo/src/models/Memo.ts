import Realm from 'realm';

export interface CreateMemoDTO {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateMemoDTO {
  _id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export class Memo extends Realm.Object {
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
    name: 'Memo',
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
