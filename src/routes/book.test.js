// Mock mongoose model
const MockModel = require('jest-mongoose-mock');
jest.mock('../models/bookings', () => new MockModel());

const book = require('./book');

describe('Route: /api/book/:id', function () {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('its called', async (done) => {
    const placeId = 'fake-place-id';
    const ctx = {
      places: {
        getPlaceDetails: jest.fn().mockReturnValueOnce({
          data: {
            result:
              {
                name: 'test place',
                formatted_address: 'fake-str 72, 80000 München, Deutscheland'
              },
          },
          status: 200
        })
      },
      response: {
        statusCode: null
      },
      params: {
        id: placeId
      },
      body: null,
      user: {
        id: 123456789
      }
    };

    await book(ctx);

    expect(ctx.places.getPlaceDetails).toBeCalledWith(placeId);
    expect(ctx.body).toEqual('{"ok":true,"booking":null}');
    expect(ctx.response.statusCode).toEqual(200);
    done();
  });

  test('Returns error if Google Places returns <> 200', async (done) => {
    const placeId = 'fake-place-id';
    const ctx = {
      places: {
        getPlaceDetails: jest.fn().mockReturnValueOnce({
          data: { results: {} },
          status: 404
        })
      },
      response: {
        statusCode: null
      },
      params: {
        id: placeId
      },
      body: null,
      user: {
        id: 123456789
      }
    };

    await book(ctx);

    expect(ctx.places.getPlaceDetails).toBeCalledWith(placeId);
    expect(ctx.response.statusCode).toEqual(404);

    done();
  })
});