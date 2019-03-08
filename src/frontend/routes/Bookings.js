import React from 'react';
import axios from 'axios';

import Item from '../components/Item';

class Bookings extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bookings: [],
      error: null
    }
  }

  componentDidMount() {
    axios.get(`/api/bookings`)
      .then(result => result.data)
      .then(({ bookings, error }) => this.setState({ loading: false, bookings, error }))
      .catch(error => this.setState({ loading: false, error }));
  }

  render() {
    return (
      <div className="place-list">
        <h1>List of Bookings</h1>
        {this.state.loading && <div>Loading</div>}
        <ul>
          {this.state.bookings.map((row) => <Item key={row.property_id} booked={true} {...row} />)}
          {!this.state.loading &&
            this.state.bookings.length === 0 && <li>You have no bookings to show</li>
          }
        </ul>
      </div>
    )
  }
}
export default Bookings;