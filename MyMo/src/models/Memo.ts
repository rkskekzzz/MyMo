import Realm from 'realm';
export class Task extends Realm.Object {
  _id!: string;
  content!: string;
  isComplete!: boolean; // isSynced
  createdAt!: Date;
  updatedAt!: Date;

  static generate(content: string) {
    return {
      _id: new Realm.BSON.ObjectId().toHexString(),
      content,
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      content: 'string',
      isComplete: { type: 'bool', default: false },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
