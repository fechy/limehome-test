import React from 'react';
import { Link } from 'react-router-dom';

export default ({ place_id, name, booked = false }) => (
  <li key={place_id}>
    <span>{name}</span>&nbsp;
    {!booked && <Link to={`/book/${place_id}`} title={`Click to book a place in ${name}`}><button>BOOK</button></Link>}
    {booked && <Link to={`/book/${place_id}/cancel`} title={`Click to cancel a booking in ${name}`}><button>CANCEL BOOKING</button></Link>}
  </li>
);