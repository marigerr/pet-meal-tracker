import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import './index.html';
import './favicon.ico';

const AppClient = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<AppClient />, document.getElementById('root'));
