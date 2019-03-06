import React from 'react';
import axios from 'axios';

class BookPlace extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: false,
      error: null
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.post(`/api/book/${params.id}`)
      .then(result => result.data)
      .then(({ ok, error }) => this.setState({ loading: false, result: ok, error }))
      .catch(error => this.setState({ loading: false, error }));
  }

  _renderResult() {
    const { loading, result, error } = this.state;
    let message = 'Booking. Please wait...';
    if (!loading) {
      if (result) {
        return 'Booked successfully!';
      } else {
        return `Error Booking! ${error}`;
      }
    }

    return (<h4>{message}</h4>)
  }

  render() {
    return (
      <div>
        {this._renderResult()}
      </div>
    )
  }
}
export default BookPlace;