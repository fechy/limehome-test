import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cookies from "js-cookie";

import PlaceList from './routes/PlaceList';
import BookPlace from './routes/BookPlace';
import CancelBookPlace from './routes/CancelBookPlace';
import Bookings from './routes/Bookings';

import './styles/app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      checkInterval: null
    };

    this._checkUserIdCookie = this._checkUserIdCookie.bind(this);
  }

  _checkUserIdCookie() {
    if (!this.state.userId) {
      const userId = Cookies.get('limehome:user_id');
      if (!userId) {
        return;
      }

      if (this.state.checkInterval) {
        clearInterval(this.state.checkInterval);
      }

      this.setState({
        userId,
        checkInterval: null
      });
    }
  }

  componentWillMount() {
    this._checkUserIdCookie();
  }

  componentDidMount() {
    if (!this.state.userId) {
      const checkInterval = setInterval(this._checkUserIdCookie, 1000);
      this.setState({ checkInterval });
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="navigation">
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/bookings'}>Bookings</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={PlaceList}/>
          <Route path="/bookings" exact component={Bookings}/>
          <Route path="/book/:id" exact component={BookPlace}/>
          <Route path="/book/:id/cancel" exact component={CancelBookPlace}/>
          <footer>
            <hr/>
            Connected user id: {this.state.userId}
          </footer>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('root')
);