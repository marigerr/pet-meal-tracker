import React from 'react';
import axios from 'axios';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    const currentUTCDate = new Date();
    currentUTCDate.setHours(currentUTCDate.getHours() - (currentUTCDate.getTimezoneOffset() / 60));
    const localDateTime = currentUTCDate.toISOString().slice(0, -8);

    this.state = {
      id: '',
      brandId: '',
      brand: '',
      amount: '0.25',
      openednewpackage: false,
      percentDailyValue: 0,
      timestamp: localDateTime,
      foodtypes: [],
      foodtypesOptions: '',
    };
    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = 'Tracker - track';
    axios.get('http://localhost:3000/api/track').then((result) => {
      console.log(result.data);
      if (result.data.message === 'unauthorized') {
        console.log('you need to log in');
        window.location.href = 'http://localhost:3000/api/auth';
      } else {
        this.setState({
          foodtypes: result.data,
        });
        const foodtypesOptions = result.data.map(type => <option key={type._id} value={type._id}>{type.brand}</option>);
        this.setState({
          foodtypesOptions,
          brandId: result.data[0]._id,
        });
      }
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps);
  //   console.log(this.state);
  // }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(event.target.name);
    console.log(event.target.value);
    console.log(event.target);
    this.setState({
      [name]: value,
      // id: value,
    }, () => console.log(this.state));
  }

  handleSubmit(event) {
    event.preventDefault();
    const timezoneOffset = new Date().getTimezoneOffset() / 60;
    const timestampLocalDateTime = new Date(this.state.timestamp);

    console.log(this.state.foodtypes);
    const foodtypesArr = this.state.foodtypes;
    const selectedFoodtype = foodtypesArr.find(food => food._id === this.state.brandId);
    console.log(selectedFoodtype);
    axios.post('/api/track', {
      brand: selectedFoodtype.brand,
      amount: this.state.amount,
      percentDailyValue: this.state.amount * selectedFoodtype.packageDailyEquivalent,
      openednewpackage: this.state.openednewpackage,
      timestamp: timestampLocalDateTime,
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
        {this.state.foodtypesOptions &&
          <div>
            <h2 className='title'>Track</h2>

            <form onSubmit={this.handleSubmit}>
              {/* <input type="text" name="id" value={this.state.id} className="input is-hidden" onChange={this.handleChange} />
              <input type="text" name="packageDailyEquivalent" value={this.state.packageDailyEquivalent} className="input is-hidden" onChange={this.handleChange} /> */}
              <div className="field">
                <label className="label">Select Food Type</label>
                <div className="control">
                  <div className="select">
                    <select name="brandId" value={this.state.brandId} onChange={this.handleChange}>
                      {this.state.foodtypesOptions}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Package Portion</label>
                <div className="control">
                  <div className="select">
                    <select name="amount" value={this.state.amount} onChange={this.handleChange}>
                      <option value="0.10">.10</option>
                      <option value="0.20">.20</option>
                      <option value="0.25">.25</option>
                      <option value="0.30">.30</option>
                      <option value="0.40">.40</option>
                      <option value="0.50">.50</option>
                      <option value="0.60">.60</option>
                      <option value="0.70">.70</option>
                      <option value="0.75">.75</option>
                      <option value="0.80">.80</option>
                      <option value="0.90">.90</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Time</label>
                <div className="control">
                  <input type="datetime-local" value={this.state.timestamp} name="timestamp" onChange={this.handleChange} />
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

            <p className='has-text-success'>Meal Successfully added!</p>

          </div >
        }
      </div >
    );
  }
}

// Track.defaultProps = {
//   name: '',
//   amount: '0.25',
//   foodtypes: '',
//   openednewpackage: false,
//   // timestamp: new Date().toISOString().slice(0, -1),
//   timestamp: new Date(new Date().toLocaleString()).toISOString().slice(0, -1),
// };
