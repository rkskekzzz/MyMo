import { createRealmContext } from '@realm/react';
// Define your object model
class Memo extends Realm.Object<Memo> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  static schema = {
    name: 'Memo',
    properties: {
      _id: 'objectId',
      parent_id: 'objectId',
      content: 'string',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Memo],
};

export default createRealmContext(realmConfig);
