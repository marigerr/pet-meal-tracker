// In progress code for adding edit functionality to mealtable


/* <button id={meal._id} data-name={meal.name} data-amount={meal.packageportion} className='button is-warning is-small' onClick={this.showEditModal.bind(this)}>Edit</button>  */


// showEditModal(event) {
//   console.log(event.target.id);
//   console.log(event.target.dataset.name);
//   this.setState({
//     modalClassNames: 'modal is-active',
//     editName: event.target.dataset.name,
//     editAmount: event.target.dataset.amount,
//     editId: event.target.id,
//   }, () => {
//     console.log(this.state);
//   });
// }

// closeEditModal() {
//   this.setState({
//     modalClassNames: 'modal',
//   });
// }

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

/*
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
*/ 
