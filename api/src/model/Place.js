import DataLoader from 'dataloader';
import { ObjectId } from 'mongodb';
import { fromMongo, findByIds } from './utils';

export default class Place {
  constructor(context) {
    this.context = context;
    this.collection = context.db.collection('places');
    this.loader = new DataLoader(ids => findByIds(this.collection, ids));
  }

  findOneById(id) {
    return this.loader.load(id);
  }

  async all({ lastCreatedAt = 0, limit = 100 }) {
    const results = await this.collection
      .find({ createdAt: { $gt: lastCreatedAt } })
      .sort({ createdAt: 1 })
      .limit(limit)
      .toArray();

    return results.map(fromMongo);
  }

  async insert(doc) {
    const docToInsert = {
      ...doc,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const { insertedId } = await this.collection.insertOne(docToInsert);

    return insertedId;
  }

  async updateById(id, doc) {
    const _id = new ObjectId(id);
    const ret = await this.collection.update(
      { _id },
      {
        $set: {
          ...doc,
          updatedAt: Date.now(),
        },
      }
    );
    this.loader.clear(id);

    return ret;
  }

  async removeById(id) {
    const _id = new ObjectId(id);
    const ret = await this.collection.remove({
      _id,
    });
    this.loader.clear(id);

    return ret;
  }
}
