import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ItemsList from '../components/ItemsList';

class Bookings extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      bookings: [],
      user_id: null,
      error: null
    }
  }

  componentDidMount() {
    const userId = Cookies.get('limehome:user_id');
    if (!userId) {
      this.setState({
        loading: false,
        error: 'Invalid user id provided'
      });
      return;
    }

    axios.get(`/api/user/${userId}/bookings`)
      .then(result => result.data)
      .then(({ bookings, error }) => {
        this.setState({
          loading: false,
          bookings,
          error
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        });
      });
  }

  render() {
    const { loading, bookings } = this.state;
    return (
      <div className="bookings-list">
        <h1>List of Bookings</h1>
        {loading && <div className="message-info">Loading...</div>}
        <ItemsList list={bookings} overrideValues={{ booked: true }} />
        {!loading && bookings.length === 0 && <div className="message-info">You have no bookings to show</div>}
      </div>
    )
  }
}
export default Bookings;