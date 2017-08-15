import { ObjectId } from 'mongodb';

export const fromMongo = item => ({
  ...item,
  id: item._id.toString(),
});

export const findByIds = async (collection, ids) => {
  try {
    const _ids = ids.map(id => new ObjectId(id));

    // uncomment to show how it works
    console.log('// running findByIds', collection.namespace, ids);

    // get all unique results in one query
    const docs = await collection.find({ _id: { $in: _ids } }).toArray();

    // make a normalized object to map ids to db results
    const idsMap = docs
      .map(fromMongo)
      .reduce((map, doc) => ({ ...map, [doc.id]: doc }), {});

    // return results for each id in the order provided
    return ids.map(id => idsMap[id]);
  } catch (e) {
    console.error(e);
    throw new Error('Something bad happened with the Mongo loader');
  }
};

export const seedDb = async ({
  db,
  pubsub,
  Place: PlaceModel,
  User: UserModel,
  reset,
}) => {
  const Place = new PlaceModel({ db, pubsub });
  const User = new UserModel({ db, pubsub });

  if (reset) {
    await Place.collection.remove({});
    await User.collection.remove({});
  }

  const places = await Place.all({});

  if (places.length) {
    console.log('Database has entries.');
    return;
  }

  const userSeed = { username: 'John Doe' };

  const placeSeeds = [
    { address: 'San Francisco', visited: true },
    { address: 'Toronto', visited: true },
    { address: 'Grand Canyon', visited: false },
  ];

  const _id = await User.insert(userSeed);

  for (const seed of placeSeeds) {
    await Place.insert({ ...seed, userId: _id.toString() });
  }

  console.log('Database seeded!');
};
