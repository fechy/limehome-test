import React from 'react';
import Item from './Item';

const ItemsList = ({ list, overrideValues = {}}) => (
  <ul className="itemsList">
    {list.map((row) => <Item key={row.property_id} {...overrideValues} {...row} />)}
  </ul>
);

export default ItemsList;