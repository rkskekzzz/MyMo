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
  isUploaded!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static generate() {
    return {
      _id: new Realm.BSON.ObjectId().toHexString(),
      title: '',
      content: '',
      isUploaded: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static schema = {
    name: 'Memo',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      content: 'string',
      isUploaded: { type: 'bool', default: false },
      createdAt: 'date',
      updatedAt: 'date'
    }
  };
}
