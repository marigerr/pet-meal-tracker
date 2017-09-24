import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Meals from './Meals.jsx';
import Stats from './Stats.jsx';
import Track from './Track.jsx';
import Addfood from './Addfood.jsx';
import Account from './Account.jsx';
import Github from './Github.jsx';
import '../css/layout.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarMenuClassNames: 'navbar-menu',
      navbarBurgerClassNames: 'button navbar-burger',
    };
  }

  openNavbarMenu(event) {
    console.log(event.target.className);
    console.log(event.target.className.search('is-active'));
    console.log(event.target.className.search('is-active') === -1);
    if (event.target.className.search('is-active') === -1) {
      this.setState({
        navbarMenuClassNames: 'navbar-menu is-active',
        navbarBurgerClassNames: 'button navbar-burger is-active',
      });
    } else {
      this.setState({
        navbarMenuClassNames: 'navbar-menu',
        navbarBurgerClassNames: 'button navbar-burger',
      });
    }
  }

  closeNavBar() {
    if (this.state.navbarBurgerClassNames.search('is-active') !== -1) {
      this.setState({
        navbarMenuClassNames: 'navbar-menu',
        navbarBurgerClassNames: 'button navbar-burger',
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="is-fullheight">
          <nav role="navigation" aria-label="main navigation" className="navbar">
            <div className="navbar-brand">
              <button className={this.state.navbarBurgerClassNames} onClick={this.openNavbarMenu.bind(this)}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={this.state.navbarMenuClassNames} onClick={this.closeNavBar.bind(this)}>
              <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/track" className="navbar-item">Track</Link>
                <Link to="/meals" className="navbar-item">Meals</Link>
                <Link to="/stats" className="navbar-item">Stats</Link>
                <Link to="/addfood" className="navbar-item">Add Food</Link>
              </div>
              <div className="navbar-end">
                <Link to="/account" className="navbar-item">Account</Link>
                <a href="/api/auth" className="navbar-item">Login</a>
              </div>
            </div>
          </nav>
          <section className="section">
            <Route exact path="/" component={Home} />
            <Route path="/track" component={Track} />
            <Route path="/meals" component={Meals} />
            <Route path="/stats" component={Stats} />
            <Route path="/addfood" component={Addfood} />
            <Route path="/account" component={Account} />
          </section>
        </div>
      </Router>
    );
  }
}
