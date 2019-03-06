# Limehome test app

### Before Run checklist
- Have docker installed, or node >= v10 locally
- Get a Google Places API key (Get a free one [here](https://developers.google.com/places/web-service/get-api-key))
- Create a `.env` file copying the contents of `.env.example` and replace the `GOOGLE_PLACES_API_KEY` with your own key

## To make it work
#### Using Docker:

- Run `docker-compose -f docker/docker-compose.yml up -d`
- Navigate in your browser to [localhost:3000](http://localhost:3000)

#### Using Node:
__BEFORE ALL:__ 
You need to have `mongodb` running locally (either on your machine or in a docker container) 
and set the `MONGO_DB_CONNECTION` value accordingly. 

Now follow run this commands:
- `npm install`
- `npm run app`
- Navigate in your browser to [localhost:3000](http://localhost:3000)

### API Endpoints
- GET `/api/places`: List of Hotels the user can book
- POST `/api/book/:id`: Books a room in an hotel
- POST `/api/book/:id/cancel`: Cancels a booking
- GET `/api/bookings`: List of rooms booked by the current user

### Tests
To run the tests, just run `npm run test`