import React from 'react';
import { Link } from 'react-router-dom';

const ActionButton = ({ id, name, booked }) => {
  let url = `/book/${id}`;
  let tooltip = `Click to book a place in ${name}`;
  let buttonMsg = 'BOOK';
  if (booked) {
    url += `/cancel`;
    tooltip = `Click to cancel a booking in ${name}`;
    buttonMsg = 'CANCEL BOOKING';
  }

  return (
    <Link to={url} title={tooltip}>
      <button className="action-button">{buttonMsg}</button>
    </Link>
  );
};

export default ({ property_id, property_name, booked = false }) => (
  <li id={`item-${property_id}`} className="item">
    <span className="property-name">{property_name}</span>&nbsp;
    <ActionButton id={property_id} booked={booked} name={property_name} />
  </li>
);