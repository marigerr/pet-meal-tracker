require('dotenv').config();
const logger = require('tracer').console();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('./models/user.js');

module.exports = function (app, db) {

  passport.serializeUser((user, done) => {
    logger.log('user serialized');
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    logger.log('deserializing user');
    User.findById(id, (err, user) => {
      if (!err) done(null, user);
      else done(err, null);
    });
  });

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function (err, user) {
        if (err) {
          logger.log(err);  
        }
        if (!err && user !== null) {
          user.incrementLoginCount();
          user.last_login = new Date()
        } else {
          user = new User({
            oauthID: profile.id,
            username: profile.username,
            name: profile.displayName || 'No public name',
            photo: profile.photos[0].value || '',
            email: profile.email || 'No public email',
            provider: profile.provider || '',
            created_on: new Date(),
            last_login: new Date(),
            login_count: 1
          });
        }
        user.save(function (err) {
          if (err) {
            logger.log(err);  
          } else {
            logger.log(user);
            done(null, user);
          }
        });
      });
    }
  ));
}
