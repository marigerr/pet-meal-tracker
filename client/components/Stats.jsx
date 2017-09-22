import React from 'react';
import axios from 'axios';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statsTable: '',
    };
  }
  componentDidMount() {
    // axios.get('http://localhost:3000/api/stats').then((result) => {
    //   console.log(result);
    //   if (result.data.message === 'unauthorized') {
    //     console.log('you need to log in');
    //     window.location.href = 'http://localhost:3000/api/auth';
    //   } else {
    //     const statsTable = result.data.map(meal => <tr key={meal._id}><td>{meal.name}</td><td>{meal.packageportion
    //     }</td><td>{new Date(meal.timestamp).toLocaleString()}</td></tr>);
    //     this.setState({
    //       statsTable,
    //     });
    //   }
    // });
  }
  render() {
    return (
      <div>
        <h1>Add Charts</h1>
      </div>
    );
  }
}
