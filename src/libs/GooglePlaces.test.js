const { places } = require('../config');
const GooglePlaces = require('./GooglePlaces');

const fakePlace = {
  geometry: {},
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png',
  id: '2c2959d74db1a7c3aea423308d205fd6746a8f67',
  name: 'Hotel Wallis',
  photos: [],
  place_id: 'ChIJ6a-klfd1nkcR-Pqcj5eZ_24',
  plus_code: {},
  rating: 3.9,
  reference: 'ChIJ6a-klfd1nkcR-Pqcj5eZ_24',
  scope: 'GOOGLE',
  types: [],
  user_ratings_total: 242,
  vicinity: 'Schwanthalerstraße 8, München'
};

describe('GooglePlaces', function () {

  test('Adds the correct base url', (done) => {
    const fetch = {
      create: jest.fn()
    };

    new GooglePlaces('', fetch);
    expect(fetch.create).toBeCalledWith({
      baseURL: places.baseURL
    });
    done();
  });

  test('GET places API returns proper results', async (done) => {
    const fetch = {
      create: jest.fn(() => fetch),
      get: jest.fn(() => ({
        data: {
          results: [fakePlace],
          status: 200
        }
      })),
    };

    const testKey = 'some-test-api-key';

    const client = new GooglePlaces(testKey, fetch);
    const keyword = 'hotels';
    const result = await client.get(keyword);


    const url = `nearbysearch/json?key=${testKey}&radius=1000&keyword=${keyword}&location=${places.hardcoded_user_location}`;
    expect(fetch.get).toBeCalledWith(url);
    expect(Object.keys(result.data)).toEqual(
      expect.arrayContaining([ 'results', 'status' ]),
    );
    done();
  });
});