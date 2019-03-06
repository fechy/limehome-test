import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PlaceList from './routes/PlaceList';
import BookPlace from './routes/BookPlace';
import CancelBookPlace from './routes/CancelBookPlace';
import Bookings from './routes/Bookings';

const App = () => (
  <Router>
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/bookings'}>Bookings</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={PlaceList} />
      <Route path="/bookings" exact component={Bookings} />
      <Route path="/book/:id" exact component={BookPlace} />
      <Route path="/book/:id/cancel" exact component={CancelBookPlace} />
    </div>
  </Router>
);

ReactDOM.render(<App />,
  document.getElementById('root')
);