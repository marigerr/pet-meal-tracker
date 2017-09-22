import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Home from './Home.jsx';
import Meals from './Meals.jsx';
import Stats from './Stats.jsx';
import Track from './Track.jsx';
import Addfood from './Addfood.jsx';
import Account from './Account.jsx';
import Github from './Github.jsx';
import '../css/layout.css';

const App = () => (

  <Router>
    <div>
      <nav role="navigation" aria-label="main navigation" className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/track" className="navbar-item">Track</Link>
          <Link to="/meals" className="navbar-item">Meals</Link>
          <Link to="/stats" className="navbar-item">Stats</Link>
          <Link to="/addfood" className="navbar-item">Add Food</Link>
          <Link to="/account" className="navbar-item">Account</Link>
          <a href="/api/auth" className="navbar-item">Login</a>
          <button className="button navbar-burger"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/track" component={Track} />
        <Route path="/meals" component={Meals} />
        <Route path="/stats" component={Stats} />
        <Route path="/addfood" component={Addfood} />
        <Route path="/account" component={Account} />
        {/* <Route path="/auth/github" component={Github} /> */}
      </main>
    </div>
  </Router>
);

export default App;
