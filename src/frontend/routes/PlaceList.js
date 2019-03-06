const React = require('react');
const axios = require('axios');

import Item from '../components/Item';

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
      .then(result => this.setState({ list: result, loading: false }));
  }

  render() {
    return (
      <div className="place-list">
        <h1>List of Bookable Hotels</h1>
        {this.state.loading && <div>Loading</div>}
        <ul>
          {this.state.list.map((row) => <Item key={row.place_id} {...row} />)}
        </ul>
      </div>
    );
  }
}

export default PlaceList;