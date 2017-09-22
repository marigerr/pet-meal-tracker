import React from 'react';
import axios from 'axios';


export default class Github extends React.Component {
  githubLogin() {
    axios.get('http://localhost:3000/api/auth/github').then((result) => {
      console.log(result.message);
    });
  }


  render() {
    return (
      <div>
        <h2 className='title'>Github Login</h2>
        <a className="button" onClick={this.githubLogin.bind(this)}>Login</a>
      </div>
    );
  }
}
