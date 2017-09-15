require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const User = require('./models/user.js');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth.js');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (!err) done(null, user);
    else done(err, null);
  });
});

app.get('/', (req, res) => { res.render('index', { title: "Tracker App"})});
app.get('/account', ensureAuthenticated, function (req, res) {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);  
    } else {
      res.render('account', { user: user, title: "Tracker - Account" });
    }
  });
});

app.get('/auth/github',
  passport.authenticate('github'),
  function (req, res) { });
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/account');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

auth(app,db);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
