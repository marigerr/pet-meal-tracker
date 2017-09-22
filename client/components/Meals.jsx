import React from 'react';
import axios from 'axios';
import Track from './Track.jsx';

export default class Meals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealList: '',
      modalClassNames: 'modal',
      editName: '',
      editAmount: '',
      editId: '',
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/meals').then((result) => {
      console.log(result);
      if (result.data.message === 'unauthorized') {
        console.log('you need to log in');
        window.location.href = 'http://localhost:3000/api/auth';
      } else {
        const mealList = result.data.map(meal =>
          <tr key={meal._id}>
            <td>{meal.name}</td>
            <td>{meal.packageportion}</td>
            <td>{new Date(meal.timestamp).toLocaleString()}</td>
            <td>
              <button id={meal._id} className='button is-danger is-small' onClick={this.deleteMeal.bind(this)}>Delete</button>
              <button id={meal._id} data-name={meal.name} data-amount={meal.packageportion} className='button is-warning is-small' onClick={this.showEditModal.bind(this)}>Edit</button>
            </td>
          </tr>);
        this.setState({
          mealList,
        });
      }
    });
  }

  deleteMeal(event) {
    console.log(event.target.id);
    axios.delete('http://localhost:3000/api/meals', {
      data: { _id: event.target.id },
    }).then((result) => {
      console.log(result.data.mealId);
      console.log(this.state.mealList);
      const newMealList = this.state.mealList.filter(row => row.key !== result.data.mealId);
      this.setState({
        mealList: newMealList,
      });
    });
  }

  showEditModal(event) {
    console.log(event.target.id);
    console.log(event.target.dataset.name);
    this.setState({
      modalClassNames: 'modal is-active',
      editName: event.target.dataset.name,
      editAmount: event.target.dataset.amount,
      editId: event.target.id,
    }, () => {
      console.log(this.state);
    });
  }

  closeEditModal() {
    this.setState({
      modalClassNames: 'modal',
    });
  }

  // editMeal(event) {
  // console.log(event.target.id);
  // axios.put('http://localhost:3000/api/meals', {
  //   data: { _id: event.target.id },
  // }).then((result) => {
  //   console.log(result.data.mealId);
  //   console.log(this.state.mealList);
  //   const newMealList = this.state.mealList.filter(row => row.key !== result.data.mealId);
  //   this.setState({
  //     mealList: newMealList,
  //   });
  // });
  // }

  render() {
    return (
      <div>
        <div className={this.state.modalClassNames}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Meal</p>
              <button className="delete" aria-label="close" onClick={this.closeEditModal.bind(this)}></button>
            </header>
            <section className="modal-card-body">
              <Track
                name={this.state.editName}
                amount={this.state.editAmount}
                id={this.state.editId}
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Cancel</button>
            </footer>
          </div>
        </div>


        {this.state.mealList &&
          <div>
            <h2 className='title'>Meals</h2>
            <table className="table is-striped is-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Portion</th>
                  <th>Time</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>{this.state.mealList}</tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}
