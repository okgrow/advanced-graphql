import NodeGeocoder from 'node-geocoder';
import Dataloader from 'dataloader';

const { GOOGLE_API_KEY } = process.env;

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: GOOGLE_API_KEY,
});

// smarter loader!
const loader = new Dataloader(names => {
  // uncomment to debug
  // console.log('running the loader with', names.length, 'names');
  return Promise.all(names.map(name => geocoder.geocode(name)));
});

export default class Location {
  async get(name) {
    if (!name) {
      return;
    }

    try {
      const [location] = await loader.load(name);

      return {
        ...location,
        id: `${location.latitude}:${location.longitude}`,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
