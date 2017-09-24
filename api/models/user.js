const mongoose = require('mongoose');
const logger = require('tracer').console();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  oauthID: String,
  username: String,
  name: String,
  photo: String,
  email: String,
  created_on: Date,
  provider: String,
  last_login: Date,
  login_count: Number,
  foodtypes: [{ type: Schema.Types.ObjectId, ref: 'Foodtype' }],
});

UserSchema.methods.incrementLoginCount = function () {
  this.last_login = new Date();
  this.login_count = this.login_count + 1;
  logger.log(`New login count ${this.login_count}`);
  logger.log(`Last login ${this.last_login}`);
  return this;
};

module.exports = mongoose.model('User', UserSchema);
