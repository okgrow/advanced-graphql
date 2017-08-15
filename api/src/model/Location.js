import NodeGeocoder from 'node-geocoder';

const { GOOGLE_API_KEY } = process.env;

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: GOOGLE_API_KEY,
});

// basic loader making network request & returning a Promise
const loader = {
  load: name => geocoder.geocode(name),
};

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
