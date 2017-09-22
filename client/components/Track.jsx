import React from 'react';
import axios from 'axios';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/track').then((result) => {
      console.log(result.data);
      if (result.data.message === 'unauthorized') {
        console.log('you need to log in');
        window.location.href = 'http://localhost:3000/api/auth';
      } else {
        const foodtypes = result.data.map(type => <option key={type._id} value={type.name}>{type.name}</option>);
        this.setState({
          foodtypes,
          name: result.data[0].name,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    console.log(this.state);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this.state.amount);
    event.preventDefault();
    axios.post('/api/track', {
      name: `${this.state.name}`,
      amount: `${this.state.amount}`,
      openednewpackage: `${this.state.openednewpackage}`,
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        {this.state.foodtypes &&
          <div>
            <h2 className='title'>Track</h2>

            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Select Food Type</label>
                <div className="control">
                  <div className="select">
                    <select name="name" value={this.state.name} onChange={this.handleChange}>
                      {this.state.foodtypes}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Portion</label>
                <div className="control">
                  <div className="select">
                    <select name="amount" value={this.state.amount} onChange={this.handleChange}>
                      <option value="0.25">0.25</option>
                      <option value="0.30">0.30</option>
                      <option value="0.50">0.50</option>
                      <option value="0.75">0.75</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input name="openednewpackage" type="checkbox" value={this.state.openednewpackage} onChange={this.handleChange} /> Opened New Package
                  </label>
                </div>
              </div>

              <input className='button is-success' type="submit" value="Submit" />

            </form >
          </div >
        }
      </div >
    );
  }
}

Track.defaultProps = {
  name: '',
  amount: '0.25',
  foodtypes: '',
  openednewpackage: false,
};
