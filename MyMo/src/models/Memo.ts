import Realm from 'realm';
export class Memo extends Realm.Object {
  _id!: string;
  title!: string;
  content!: string;
  isSync!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static generate() {
    return {
      _id: new Realm.BSON.ObjectId().toHexString(),
      title: '',
      content: '',
      isSync: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Memo',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      content: 'string',
      isSync: { type: 'bool', default: false },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
