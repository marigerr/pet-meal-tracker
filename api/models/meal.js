const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  oauthID: String,
  brand: String,
  openednewpackage: Boolean,
  packageportion: Number,
  percentDailyValue: Number,
  timestamp: Date,
});

module.exports = mongoose.model('Meal', MealSchema);
