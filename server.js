require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const User = require('./models/user.js');
const Meal = require('./models/meal.js');
const Foodtype = require('./models/foodtype.js');
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
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 2592000000 } }));
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

app.get('/', (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    User.findById(req.session.passport.user, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render('index', { isAuthenticated: true, title: "Tracker App" })
      }
    });
  } else {
    res.render('index', { isAuthenticated: false, title: "Tracker App" })
  }
});

app.get('/auth/github',
  passport.authenticate('github'),
  (req, res) => { });
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/track');
  });

app.get('/account', ensureAuthenticated, (req, res) => {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('account', { user: user, isAuthenticated: true, title: "Account" });
    }
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/track', ensureAuthenticated, (req, res) => {
  User.findOne({ _id: req.session.passport.user })
    .populate( 'foodtypes')
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render('track', { isAuthenticated: true, user: user, title: "Tracker" });
      }
    });
});

app.post('/track', ensureAuthenticated, (req, res) => {
  // const amount = JSON.parse(req.body.amount);

  User.findOne({ _id: req.session.passport.user })
  .populate( 'foodtypes')
  .exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      meal = new Meal({
        name: req.body.name,
        packageportion: req.body.amount,
        // quantity: amount.quantity,
        // daily: amount.daily,
        oauthID: user.oauthID,
        timestamp: new Date()
      });
      meal.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.render('track', { isAuthenticated: true, user: user, title: "Tracker" });
        }
      });
    }
  });
});

app.get('/stats', ensureAuthenticated, (req, res) => {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Meal.find({
        oauthID: user.oauthID
      })
        .sort({ timestamp: 'asc' })
        .exec((err, meals) => {
          res.render('stats', { isAuthenticated: true, title: "Tracker-Stats", meals: meals });
        })
    }
  });
});

app.get('/addfood', ensureAuthenticated, (req, res) => {
  res.render('addfood', { isAuthenticated: true, title: "Tracker-Add Food" });
});

app.post('/addfood', ensureAuthenticated, (req, res) => {

  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      food = new Foodtype({
        _id: new mongoose.Types.ObjectId(),
        oauthID: user.oauthID,
        name: req.body.name,
        volume: req.body.volume,
        packageDailyEquivalent: req.body.packageDailyEquivalent,
      });
      user.foodtypes.push(food);
      user.save((err) => {
        console.log(err)
      })
      food.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.render('addfood', { isAuthenticated: true, title: "Tracker-Add Food" });
        }
      });
    }
  });
});

auth(app, db);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
