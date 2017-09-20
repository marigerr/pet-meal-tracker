import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import '../favicon.ico';

const App = () => (

  <Router>
    <div>
      <nav role="navigation" aria-label="main navigation" className="navbar">
        <div className="navbar-brand">
          <Link to="/home" className="navbar-item">Home</Link>
          <Link to="/track" className="navbar-item">Track</Link>
          <Link to="/stats" className="navbar-item">Stats</Link>
          <Link to="/addfood" className="navbar-item">Add Food</Link>
          <Link to="/account" className="navbar-item">Account</Link>
          <Link to="/auth/github" className="navbar-item">Login via Github</Link>
          <button className="button navbar-burger"><span></span><span></span><span></span></button>
        </div>
      </nav>

      <Route exact path="/home" component={Home} />
      <Route path="/track" component={Track} />
      <Route path="/stats" component={Stats} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Hoasfasdfme</h2>
  </div>
);

const Track = () => (
  <div>
    <h2>Track</h2>
  </div>
);

const Stats = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
