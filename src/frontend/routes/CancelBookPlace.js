import React from 'react';
import axios from 'axios';

class CancelBookPlace extends React.Component
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
    axios.post(`/api/book/${params.id}/cancel`)
      .then(result => result.data)
      .then(({ ok, error }) => {
        this.setState({
          loading: false,
          result: ok,
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

  _renderResult() {
    const { loading, result, error } = this.state;
    let message = 'Cancelling Booking. Please wait...';
    if (!loading) {
      if (result) {
        return (
          <h4 className="message-info">Booking cancelled successfully!</h4>
        )
      } else {
        return (
          <h4 className="message-error">Error Cancelling Booking! {error}</h4>
        )
      }
    }

    return (<h4 className="message-info">{message}</h4>)
  }

  render() {
    return (
      <div>
        {this._renderResult()}
      </div>
    )
  }
}
export default CancelBookPlace;