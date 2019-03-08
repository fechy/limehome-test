const React = require('react');
const axios = require('axios');

import ItemsList from '../components/ItemsList';

class PlaceList extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: []
    }
  }

  componentDidMount() {
    axios.get('/api/places')
      .then((result) => result.data)
      .then(result => {
        this.setState({ list: result, loading: false });
      });
  }

  render() {
    const { loading, list } = this.state;
    return (
      <div className="place-list">
        <h1>List of Bookable Hotels</h1>
        {loading && <div className="message-info">Loading...</div>}
        <ItemsList list={list} />
      </div>
    );
  }
}

export default PlaceList;