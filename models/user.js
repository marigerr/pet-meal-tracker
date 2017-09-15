const mongoose = require('mongoose');

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
});

UserSchema.methods.incrementLoginCount = function() {
  this.last_login = new Date();
  this.login_count = this.login_count + 1; 
  console.log('New login count ' + this.login_count);
  console.log('Last login ' + this.last_login);
  return this;
};

module.exports = mongoose.model('User', UserSchema);
