const axios = require('axios');
const cache = require('memory-cache');

const { places } = require('../config');

function objectToArgs(obj) {
  return Object.keys(obj).reduce((params, key) => {
    params.push(`${key}=${obj[key]}`);
    return params;
  }, []).join('&');
}

class GooglePlaces {
  constructor(key, client = axios) {
    this._key = key;
    this._client = client.create({
      baseURL: places.baseURL
    });
  }

  async get(placeName) {
    let results = cache.get(`places-list-${placeName}`);
    if (!results) {
      const args = {
        key: this._key,
        radius: 1000,
        keyword: placeName,
        location: places.hardcoded_user_location
      };

      results = await this._client.get(`nearbysearch/json?${objectToArgs(args)}`);
      cache.put(`places-list-${placeName}`, results);
    }

    return results;
  }

  async getPlaceDetails(id) {
    let results = cache.get(`place-detail-${id}`);
    if (!results) {
      const args = {
        key: this._key,
        placeid: id,
        fields: 'name'
      };

      results = await this._client.get(`details/json?${objectToArgs(args)}`);
      cache.put(`place-detail-${id}`, results);
    }

    return results;
  }
}

module.exports = GooglePlaces;