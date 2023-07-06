// import { createRealmContext } from '@realm/react';
// // Define your object model
// export class Memo extends Realm.Object<Memo> {
//   _id!: Realm.BSON.ObjectId;
//   name!: string;
//   static schema = {
//     name: 'Memo',
//     properties: {
//       _id: 'objectId',
//       content: 'string',
//       update_at: 'string',
//       parent_update_at: 'string',
//     },
//     primaryKey: '_id',
//   };
// }

// const realmConfig: Realm.Configuration = {
//   schema: [Memo],
// };

// export default createRealmContext(realmConfig);
import 'react-native-get-random-values';
import Realm, { BSON } from 'realm';
export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;

  static generate(description: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false },
      createdAt: 'date',
    },
  };
}
