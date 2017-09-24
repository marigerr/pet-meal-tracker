import React from 'react';
import axios from 'axios';

export default class Addfood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      volume: '',
      packageDailyEquivalent: '',
      foodTable: [],
    };
    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTable(array) {
    const newRow = array.map(food =>
      <tr key={food._id}>
        <td>{food.brand}</td>
        <td>{food.volume}</td>
        <td>{food.packageDailyEquivalent}</td>
        <td>
          <button id={food._id} className='button is-danger is-small' onClick={this.deleteFood.bind(this)}>Delete</button>
          {/* <button id={food._id} data-brand={food.brand} data-amount={food.packageportion} className='button is-warning is-small' onClick={this.showEditModal.bind(this)}>Edit</button> */}
        </td>
      </tr>);
    const currentTableBody = this.state.foodTable;
    console.log(currentTableBody);
    const foodTable = currentTableBody.concat(newRow);
    console.log(foodTable);
    this.setState({
      foodTable,
      brand: '',
      volume: '',
      packageDailyEquivalent: '',
    });
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/track').then((result) => {
      if (result.data.message === 'unauthorized') {
        console.log('you need to log in');
        window.location.href = 'http://localhost:3000/api/auth';
      } else {
        this.updateTable(result.data);
      }
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/addfood', {
      brand: this.state.brand,
      volume: this.state.volume,
      packageDailyEquivalent: this.state.packageDailyEquivalent,
    })
      .then((response) => {
        const newFoodArray = [];
        newFoodArray.push(response.data.food);
        this.updateTable(newFoodArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteFood(event) {
    console.log(event.target.id);
    axios.delete('http://localhost:3000/api/addfood', {
      data: { _id: event.target.id },
    }).then((result) => {
      console.log(result.data);
      const foodTable = this.state.foodTable.filter(row => row.key !== result.data.foodId);
      this.setState({
        foodTable,
      });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Add New Food </h1>
        <div className="column is-half">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label id="brand" className="label">Name/Brand/Flavor</label>
              <div className="control">
                <input type="text" name="brand" value={this.state.brand} className="input" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label id="volume" className="label">Volume in grams</label>
              <div className="control">
                <input type="text" name="volume" value={this.state.volume} className="input" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label id="packageDailyEquivalent" className="label">Package portion of daily requirements</label>
              <div className="control">
                <input type="text" name="packageDailyEquivalent" value={this.state.packageDailyEquivalent} className="input" onChange={this.handleChange} />
              </div>
            </div>
            <input type="submit" value="Submit" className="button is-success" />
          </form>
        </div>

        {this.state.foodTable &&
          <div>
            <h2 className='title'>Food</h2>
            <table className="table is-striped is-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Volume</th>
                  <th>% of Daily Requirement</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>{this.state.foodTable}</tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}
