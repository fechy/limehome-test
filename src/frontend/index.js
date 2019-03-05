import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PlaceList from './routes/PlaceList';
import BookPlace from './routes/BookPlace';

const App = () => (
  <Router>
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={PlaceList} />
      <Route path="/book/:id" component={BookPlace} />
    </div>
  </Router>
);

ReactDOM.render(<App />,
  document.getElementById('root')
);