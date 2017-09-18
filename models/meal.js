const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  oauthID: String,
  name: String,
  // quantity: String,
  packageportion: Number,
  timestamp: Date
});

module.exports = mongoose.model('Meal', MealSchema);