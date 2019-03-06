// Mock mongoose model
const MockModel = require('jest-mongoose-mock');
jest.mock('../models/bookings', () => new MockModel());

const route = require('./places');

describe('Route: /api/places', function () {

  test('its called', async (done) => {
    const ctx = {
      places: {
        get: jest.fn().mockReturnValueOnce({
          data: { results: [] },
          status: 200
        })
      },
      response: {
        statusCode: null
      },
      body: null
    };

    await route(ctx);

    expect(ctx.places.get).toBeCalledWith('hotel');
    expect(ctx.body).toEqual("[]");
    expect(ctx.response.statusCode).toEqual(200);
    done();
  });

  test('Returns error if Google Places returns <> 200', async (done) => {
    const ctx = {
      places: {
        get: jest.fn().mockReturnValueOnce({
          data: { results: [] },
          status: 404
        })
      },
      response: {
        statusCode: null
      },
      body: null
    };

    await route(ctx);

    expect(ctx.places.get).toBeCalledWith('hotel');
    expect(ctx.response.statusCode).toEqual(404);

    done();
  })
});