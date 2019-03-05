import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, name }) => (
  <li key={id}>
    <Link to={`/book/${id}`} title={`Click to book a place in ${name}`}>{name}</Link>
  </li>
);